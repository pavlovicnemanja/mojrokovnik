'use strict';

describe('mojrokovnik', function () {

    xit('should automatically redirect to /dashboard when location hash/fragment is empty', function () {
        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toMatch("/dashboard");
    });

});
