'use strict';

calendarTemplate.$inject = ['api'];
function calendarTemplate(api) {
    return {
        controller: calendarCtrl,
        link: function (scope, element, attr, ctrl) {

            /*
             * Fetch calendar events
             * and initialize calendar
             *
             * @param {Object} events
             * @return {Function} initializeCalendar
             */
            api('calendars').fetch().then(function (events) {
                var filterEvents = [];
                angular.forEach(events, function (item) {
                    filterEvents.push({
                        title: item.calendar_name + ' - ' + item.calendar_comment,
                        start: item.calendar_startDate,
                        end: item.calendar_endDate
                    });
                });

                return initializeCalendar(filterEvents);
            });

            /*
             * Function for creating new event
             *
             * @param {moment} start
             * @param {moment} end
             */
            scope.createEvent = function (event) {
                var eventData = {
                    title: event.calendar_name + ' - ' + event.calendar_comment,
                    start: event.calendar_startDate,
                    end: event.calendar_endDate
                };
                element.fullCalendar('renderEvent', eventData, true);
                element.fullCalendar('unselect');
            };

            /*
             * Function for initializing calendar
             * with events preloaded
             *
             * @param {Object} events
             */
            function initializeCalendar(events) {
                element.fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    height: angular.element('body').height(),
                    firstDay: 1,
                    lang: 'sr',
                    scrollTime: '08:00:00',
                    defaultView: 'agendaWeek',
                    timezone: 'local',
                    selectable: true,
                    editable: true,
                    eventLimit: true,
                    events: events,
                    select: function (startDate, endDate) {
                        scope.showDialog(startDate, endDate);
                    }
                });
            }
            
        }
    };
}


calendarCtrl.$inject = ['$scope', '$q', '$uibModal', 'api'];
function calendarCtrl($scope, $q, $uibModal, api) {

    /*
     * Triggering modal for adding new event to calendar
     *
     * @param {type} startDate
     * @param {type} endDate
     */
    $scope.showDialog = function (startDate, endDate) {
        $scope.calendar = {
            calendar_startDate: startDate._d,
            calendar_endDate: endDate._d
        };

        $scope.timetable = {
            timetable_startTime: startDate._d,
            timetabe_duration: moment(endDate).subtract(moment(startDate))
        };

        $uibModal.open({
            animation: true,
            scope: $scope,
            templateUrl: 'scripts/mojrokovnik-calendar/calendar-dialog.html',
            controller: calendarDialogCtrl
        });

        // Default types for 'type' field
        $scope.types = [
            {value: 1, name: 'Ročište'},
            {value: 2, name: 'Obaveza'}
        ];

        // Return clients list
        var clients = api('clients').fetch();

        // Return cases list
        var cases = api('cases').fetch();

        $q.all([clients, cases]).then(function (values) {
            $scope.clients = values[0];
            $scope.cases = values[1];
        });
    };

    /*
     * Calendar Dialog Controller
     * Controls saving data to database
     */
    function calendarDialogCtrl($uibModalInstance) {
        $scope.save = function (calendar, timetable) {

            var startTime = timetable ? moment(timetable.timetbale_startTime).format('HH:mm:ss') : moment().format('HH:mm:ss'),
                startDate = moment(calendar.calendar_startDate).format('YYYY-MM-DD');

            var endTime = timetable ? moment(timetable.timetable_duration).format('HH:mm:ss') : moment().format('HH:mm:ss'),
                endDate = moment(calendar.calendar_endDate).format('YYYY-MM-DD');

            calendar.calendar_startDate = new Date(startTime + ' ' + startDate);
            calendar.calendar_endDate = new Date(endTime + ' ' + endDate);

            api('calendars').add(calendar).then(function () {
                $scope.createEvent(calendar);
                $uibModalInstance.close();
            });
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };
    }
}



angular.module('mojrokovnik.calendar', ['ngMaterial', 'ui.bootstrap'])
        .controller('calendarCtrl', calendarCtrl)
        .directive('calendarTemplate', calendarTemplate);