<?php

require_once 'controllers/np-connect.php';
require_once 'controllers/np-login.php';
require_once 'controllers/np-sanitize.php';
require_once 'controllers/np-database.php';

secure_session_start();

if (login_check($mysqli) == true) {

    function setCalendar($mysqli) {
        $params = array();
        $getters = sanitize($_GET, $mysqli);

        if (!empty($getters)) {
            $params = $getters;
            $table = "calendar";

            $params['user_id'] = $_SESSION['user_id'];

            setDatabase($table, $params, $mysqli);
        }
    }

    function getCalendar($mysqli) {
        $params = array();
        $getters = sanitize($_GET, $mysqli);

        $sql = "SELECT * FROM calendar";

        if (!empty($getters)) {
            $params = $getters;
        }

        $params['user_id'] = $_SESSION['user_id'];
        $params['calendar_delete'] = 0;

        getDatabase($sql, $params, $mysqli);
    }

    function updateCalendar($mysqli) {
        $params = array();
        $getters = sanitize($_GET, $mysqli);

        if (!empty($getters)) {
            $params = $getters;
            $table = "calendar";
            $identifier = "calendar_id";
            $controller = "user_id = " . $_SESSION['user_id'];

            updateDatabase($table, $identifier, $controller, $params, $mysqli);
        }
    }

    function deleteCalendar($mysqli) {
        $params = array();
        $getters = sanitize($_GET, $mysqli);

        if (!empty($getters)) {
            $flag = 'calendar_delete';
            $table = "calendar";
            $identifier = "calendar_id = " . $getters['calendar_id'];
            $controller = "user_id = " . $_SESSION['user_id'];

            markForDelete($table, $identifier, $controller, $flag, $mysqli);
        }
    }

    $method = sanitize($_SERVER['REQUEST_METHOD'], $mysqli);
    switch ($method) {
        case 'POST' : setCalendar($mysqli);
            break;
        case 'GET' : getCalendar($mysqli);
            break;
        case 'PUT' : updateCalendar($mysqli);
            break;
        case 'DELETE' : deleteCalendar($mysqli);
            break;
    }
} else {
    echo json_encode('You are not authorized to access this page, please login.');
}