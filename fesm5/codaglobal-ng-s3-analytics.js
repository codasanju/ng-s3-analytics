import { Injectable, Directive, HostListener, Input, ElementRef, Renderer2, Injector, Component, NgModule, defineInjectable, inject } from '@angular/core';
import { v4 } from 'uuid';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { __values } from 'tslib';
import { Router, NavigationEnd, NavigationError } from '@angular/router';
import { fromEvent, interval } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgS3AnalyticsService = /** @class */ (function () {
    function NgS3AnalyticsService() {
    }
    NgS3AnalyticsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    NgS3AnalyticsService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgS3AnalyticsService.ngInjectableDef = defineInjectable({ factory: function NgS3AnalyticsService_Factory() { return new NgS3AnalyticsService(); }, token: NgS3AnalyticsService, providedIn: "root" });
    return NgS3AnalyticsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgS3AnalyticsComponent = /** @class */ (function () {
    function NgS3AnalyticsComponent() {
    }
    /**
     * @return {?}
     */
    NgS3AnalyticsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    NgS3AnalyticsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-ng-s3-analytics',
                    template: "\n    <p>\n      ng-s3-analytics works!\n    </p>\n  ",
                    styles: []
                },] },
    ];
    NgS3AnalyticsComponent.ctorParameters = function () { return []; };
    return NgS3AnalyticsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var environment = {
    dataCollectionApi: 'https://1xgf5a2bq2.execute-api.ap-south-1.amazonaws.com/dev/',
    isPageLoadingToBeDetected: true,
    restrictIPRange: ''
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var EventLabels = {
    PAGE_LOAD: 'PAGE_LOAD',
    MOUSE_HOVER: 'MOUSE_HOVER',
    BUTTON_CLICK: 'BUTTON_CLICK',
    MOUSE_MOVE: 'MOUSE_MOVE',
    SCROLL: 'SCROLL',
    CONSOLE_ERROR: 'CONSOLE_ERROR',
    KEY_STROKE: 'KEY_STROKE',
};
/** @enum {string} */
var Constants = {
    DEMOGRAPHIC_INFO: 'demographic-info',
    SESSION_ID: 'ngS3AnalyticsSessionId',
    DEMOGRAPHIC_API_URL: 'https://ipapi.co/json/',
};
var KeyStrokeEventType = /** @class */ (function () {
    function KeyStrokeEventType() {
    }
    return KeyStrokeEventType;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Analytics Service
 */
var AnalyticsService = /** @class */ (function () {
    /**
     * Analytics Service constructor
     * @param cookieService
     * @param httpService
     */
    function AnalyticsService(cookieService, httpService) {
        this.cookieService = cookieService;
        this.httpService = httpService;
        /** Demographic info */
        this.demographicInfo = {};
        /** Event label constants */
        this.eventLabels = EventLabels;
        /** Constants */
        this.constants = Constants;
        if (!this.cookieService.check(this.constants.DEMOGRAPHIC_INFO)) {
            this.getIp();
        }
        else {
            this.demographicInfo = JSON.parse(this.cookieService.get(this.constants.DEMOGRAPHIC_INFO));
        }
        this.setSessionId();
    }
    /**
     * Checking whether sessionId present in cookie or not
     * if no session id cookie present, adding new session id otherwise reusing the session id value
     */
    /**
     * Checking whether sessionId present in cookie or not
     * if no session id cookie present, adding new session id otherwise reusing the session id value
     * @private
     * @return {?}
     */
    AnalyticsService.prototype.setSessionId = /**
     * Checking whether sessionId present in cookie or not
     * if no session id cookie present, adding new session id otherwise reusing the session id value
     * @private
     * @return {?}
     */
    function () {
        if (sessionStorage.getItem(this.constants.SESSION_ID)) {
            this.sessionId = sessionStorage.getItem(this.constants.SESSION_ID);
        }
        else {
            this.sessionId = v4();
            sessionStorage.setItem(this.constants.SESSION_ID, this.sessionId);
        }
    };
    /**
     * Checking the IP range to be restrict
     * @param data - data to be pushed
     */
    /**
     * Checking the IP range to be restrict
     * @param {?} data - data to be pushed
     * @return {?}
     */
    AnalyticsService.prototype.pushData = /**
     * Checking the IP range to be restrict
     * @param {?} data - data to be pushed
     * @return {?}
     */
    function (data) {
        if (this.checkIpRange()) {
            this.publishTOAuthS3(data);
        }
    };
    /**
     * IP range restriction added
     * @restrictIPRange is a regex
     * if @restrictIPRange is match with current IP,
     * the analytics data will be restricted
     */
    /**
     * IP range restriction added
     * \@restrictIPRange is a regex
     * if \@restrictIPRange is match with current IP,
     * the analytics data will be restricted
     * @private
     * @return {?}
     */
    AnalyticsService.prototype.checkIpRange = /**
     * IP range restriction added
     * \@restrictIPRange is a regex
     * if \@restrictIPRange is match with current IP,
     * the analytics data will be restricted
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var ipRange = environment.restrictIPRange;
        if (ipRange && this.demographicInfo.ip) {
            return this.demographicInfo.ip.match(ipRange) ? false : true;
        }
        else {
            return true;
        }
    };
    /**
     * Converting JSON Array to string
     * @param data
     */
    /**
     * Converting JSON Array to string
     * @private
     * @param {?} data
     * @return {?}
     */
    AnalyticsService.prototype.processForAthena = /**
     * Converting JSON Array to string
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        return data.map((/**
         * @param {?} object
         * @return {?}
         */
        function (object) {
            object['sessionId'] = _this.sessionId;
            return JSON.stringify(object);
        })).join('\n');
    };
    /**
      * Preparing data to be pushed to DataStorage
      * @param data  data to be pushed
      */
    /**
     * Preparing data to be pushed to DataStorage
     * @private
     * @param {?} data  data to be pushed
     * @return {?}
     */
    AnalyticsService.prototype.publishTOAuthS3 = /**
     * Preparing data to be pushed to DataStorage
     * @private
     * @param {?} data  data to be pushed
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var filename = new Date().toISOString().split('T')[0] + "_" + this.sessionId + "_" + new Date().toISOString() + ".json";
        /** @type {?} */
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.pushDataToS3(filename, this.processForAthena(data.eventValues), headers);
    };
    /**
     * Pushing data to corresponding bucket using data collection api
     * @param path - service path
     * @param data - data to be pushed
     */
    /**
     * Pushing data to corresponding bucket using data collection api
     * @private
     * @param {?} path - service path
     * @param {?} data - data to be pushed
     * @param {?} headers
     * @return {?}
     */
    AnalyticsService.prototype.pushDataToS3 = /**
     * Pushing data to corresponding bucket using data collection api
     * @private
     * @param {?} path - service path
     * @param {?} data - data to be pushed
     * @param {?} headers
     * @return {?}
     */
    function (path, data, headers) {
        /** @type {?} */
        var url = "" + environment.dataCollectionApi + path;
        this.httpService.put(url, data, { headers: headers }).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            console.log(err);
        }));
    };
    /**
     * Save the captured HTML to the data collection
     * @param htmlTemplate - DOM Content
     * @param screenshotName - filename to be saved
     */
    /**
     * Save the captured HTML to the data collection
     * @param {?} htmlTemplate - DOM Content
     * @param {?} screenshotName - filename to be saved
     * @return {?}
     */
    AnalyticsService.prototype.saveScreenshotsInS3 = /**
     * Save the captured HTML to the data collection
     * @param {?} htmlTemplate - DOM Content
     * @param {?} screenshotName - filename to be saved
     * @return {?}
     */
    function (htmlTemplate, screenshotName) {
        /** @type {?} */
        var filename = "assets/" + new Date().toISOString().split('T')[0] + "/" + this.sessionId + "/" + screenshotName + ".html";
        /** @type {?} */
        var headers = new HttpHeaders({ 'Content-Type': 'text/html' });
        this.pushDataToS3(filename, htmlTemplate, headers);
    };
    /**
     * Pushing console errors to S3 bucket
     * @param data
     */
    /**
     * Pushing console errors to S3 bucket
     * @param {?} data
     * @return {?}
     */
    AnalyticsService.prototype.publishConsoleErrors = /**
     * Pushing console errors to S3 bucket
     * @param {?} data
     * @return {?}
     */
    function (data) {
        data['sessionId'] = this.sessionId;
        /** @type {?} */
        var filename = new Date().toISOString().split('T')[0] + "_" + this.sessionId + "_console_errors_" + new Date().getTime() + ".json";
        /** @type {?} */
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.pushDataToS3(filename, data, headers);
    };
    /**
     * Setting analytics object to be saved in S3 bucket
     * @param userData - Data transferred to Event Directive
     * @param eventDetails - Position of events
     * @param eventName  - Type of event
     * @param screenshotName  - file name of saved screenshot if the event is PageLoaded
     */
    /**
     * Setting analytics object to be saved in S3 bucket
     * @param {?=} userData - Data transferred to Event Directive
     * @param {?=} eventDetails - Position of events
     * @param {?=} eventName  - Type of event
     * @param {?=} screenshotName  - file name of saved screenshot if the event is PageLoaded
     * @param {?=} optional
     * @return {?}
     */
    AnalyticsService.prototype.setAnalyticsData = /**
     * Setting analytics object to be saved in S3 bucket
     * @param {?=} userData - Data transferred to Event Directive
     * @param {?=} eventDetails - Position of events
     * @param {?=} eventName  - Type of event
     * @param {?=} screenshotName  - file name of saved screenshot if the event is PageLoaded
     * @param {?=} optional
     * @return {?}
     */
    function (userData, eventDetails, eventName, screenshotName, optional) {
        if (userData === void 0) { userData = {}; }
        /** @type {?} */
        var analyticsBean = {
            eventLabel: eventName,
            eventComponent: optional && optional.eventComponent ? optional.eventComponent : window.location.pathname.split('?')[0],
            browser: window.navigator.userAgent,
            fullURL: window.location.href,
            origin: window.location.origin,
            resolution: window.innerWidth + "x" + window.innerHeight,
            xCoord: this.getEventDetails(eventDetails['clientX']),
            yCoord: this.getEventDetails(eventDetails['clientY']),
            pageXCoord: window.pageXOffset.toString() || '0',
            pageYCoord: window.pageYOffset.toString() || '0',
            eventTime: new Date().toISOString(),
            screenshot: screenshotName,
            additionalInfo: userData,
            errors: (optional && optional.consoleErrors) ? optional.consoleErrors : '',
            utm: this.getUTMParameters(window.location.href),
            demographicInfo: this.demographicInfo,
            keyStrokeData: (optional && optional.keyStrokeData) ? optional.keyStrokeData : this.getEmptyKeyStrokeData(),
            htmlElement: this.getHtmlElement(eventDetails['target']),
            performance: this.getPerformanceDetails(),
        };
        return analyticsBean;
    };
    /**
     * Event details
     * @param value
     */
    /**
     * Event details
     * @private
     * @param {?} value
     * @return {?}
     */
    AnalyticsService.prototype.getEventDetails = /**
     * Event details
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value !== undefined ? value.toString() : '0';
    };
    /**
     * Get HTML Content
     * @param targetElement - target element
     */
    /**
     * Get HTML Content
     * @private
     * @param {?} targetElement - target element
     * @return {?}
     */
    AnalyticsService.prototype.getHtmlElement = /**
     * Get HTML Content
     * @private
     * @param {?} targetElement - target element
     * @return {?}
     */
    function (targetElement) {
        return targetElement !== undefined ? targetElement['innerHTML'] : '';
    };
    /**
     * @private
     * @return {?}
     */
    AnalyticsService.prototype.getEmptyKeyStrokeData = /**
     * @private
     * @return {?}
     */
    function () {
        return {
            key: '',
            keyCode: '',
            code: '',
            elementId: '',
            form: '',
            htmlElementType: '',
            isForm: false,
            tagName: '',
            value: ''
        };
    };
    /**
     * Performance details
     */
    /**
     * Performance details
     * @private
     * @return {?}
     */
    AnalyticsService.prototype.getPerformanceDetails = /**
     * Performance details
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var performance = window.performance;
        return {
            navigation: performance.navigation,
            timeOrigin: performance.timeOrigin,
            timing: performance.timing
        };
    };
    /**
     * Memory usage of the application is provided by Google Chrome
     * @param userAgent - User agent to check the browser
     */
    /**
     * Memory usage of the application is provided by Google Chrome
     * @private
     * @param {?} userAgent - User agent to check the browser
     * @return {?}
     */
    AnalyticsService.prototype.geMemoryUsageInfo = /**
     * Memory usage of the application is provided by Google Chrome
     * @private
     * @param {?} userAgent - User agent to check the browser
     * @return {?}
     */
    function (userAgent) {
        /** @type {?} */
        var isChrome = userAgent.split('chrome').length > 1;
        /** @type {?} */
        var memory = isChrome ? window.performance['memory'] : '';
        return memory;
    };
    /**
     * Getting UTM Parameters by processing current pageURL
     * @param url - Page URL
     */
    /**
     * Getting UTM Parameters by processing current pageURL
     * @private
     * @param {?} url - Page URL
     * @return {?}
     */
    AnalyticsService.prototype.getUTMParameters = /**
     * Getting UTM Parameters by processing current pageURL
     * @private
     * @param {?} url - Page URL
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var utmObject = {};
        if (url.includes('utm')) {
            /** @type {?} */
            var utmParams = url.split('?')[1].split('&');
            utmParams.map((/**
             * @param {?} param
             * @return {?}
             */
            function (param) {
                /** @type {?} */
                var params = param.split('=');
                utmObject[params[0]] = params[1];
            }));
        }
        return utmObject;
    };
    /**
     * Set user demographic information in cookies
     */
    /**
     * Set user demographic information in cookies
     * @private
     * @return {?}
     */
    AnalyticsService.prototype.getIp = /**
     * Set user demographic information in cookies
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.httpService.get(this.constants.DEMOGRAPHIC_API_URL).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.demographicInfo = res;
            _this.cookieService.set(_this.constants.DEMOGRAPHIC_INFO, JSON.stringify(res), new Date(new Date().getTime() + (1000 * 60 * 60 * 24)));
        }));
    };
    AnalyticsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    AnalyticsService.ctorParameters = function () { return [
        { type: CookieService },
        { type: HttpClient }
    ]; };
    /** @nocollapse */ AnalyticsService.ngInjectableDef = defineInjectable({ factory: function AnalyticsService_Factory() { return new AnalyticsService(inject(CookieService), inject(HttpClient)); }, token: AnalyticsService, providedIn: "root" });
    return AnalyticsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DataStorageService = /** @class */ (function () {
    function DataStorageService(analyticalService, http) {
        this.analyticalService = analyticalService;
        this.http = http;
        this.allDataAnalyticsArray = [];
        this.keys = [];
        this.eventCollector = new Map();
        this.routeDetails = [];
        this.count = 0;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    DataStorageService.prototype.setUrlKey = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var e_1, _a;
        /** @type {?} */
        var flag = 0;
        if (this.previousUrl === undefined) {
            this.eventCollector.set(data, []);
            this.previousUrl = data || '/';
        }
        else if (!(data === this.previousUrl)) {
            try {
                for (var _b = __values(Array.from(this.eventCollector.keys())), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    if (key === data) {
                        flag = 1;
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (flag === 0) {
                this.eventCollector.set(data, []);
            }
            this.previousUrl = data;
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    DataStorageService.prototype.appendToAnalyticsArray = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (this.previousUrl === undefined) {
            this.setUrlKey(data.eventComponent);
        }
        this.eventCollector.get(this.previousUrl).push(data);
    };
    /**
     * @return {?}
     */
    DataStorageService.prototype.pushDataArrayToS3 = /**
     * @return {?}
     */
    function () {
        var e_2, _a, e_3, _b;
        this.count++;
        try {
            // this.allDataAnalyticsMap = JSON.parse(JSON.stringify(Array.from(this.eventCollector.keys())));
            for (var _c = __values(Array.from(this.eventCollector.keys())), _d = _c.next(); !_d.done; _d = _c.next()) {
                var key = _d.value;
                this.allDataAnalytics = {
                    pageUrl: key,
                    eventValues: Array.from(this.eventCollector.get(key).values())
                };
                this.keys.push(key);
                if (this.allDataAnalytics.eventValues.length > 0) {
                    this.analyticalService.pushData(this.allDataAnalytics);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.eventCollector.clear();
        try {
            for (var _e = __values(this.keys), _f = _e.next(); !_f.done; _f = _e.next()) {
                var key = _f.value;
                this.eventCollector.set(key, []);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    /**
     * @param {?} routeDetails
     * @return {?}
     */
    DataStorageService.prototype.setRouteDetails = /**
     * @param {?} routeDetails
     * @return {?}
     */
    function (routeDetails) {
        this.routeDetails = routeDetails;
    };
    /**
     * @return {?}
     */
    DataStorageService.prototype.getRouteDetails = /**
     * @return {?}
     */
    function () {
        return this.routeDetails;
    };
    DataStorageService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    DataStorageService.ctorParameters = function () { return [
        { type: AnalyticsService },
        { type: HttpClient }
    ]; };
    /** @nocollapse */ DataStorageService.ngInjectableDef = defineInjectable({ factory: function DataStorageService_Factory() { return new DataStorageService(inject(AnalyticsService), inject(HttpClient)); }, token: DataStorageService, providedIn: "root" });
    return DataStorageService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Button Directive to track click event
 * Selector can be added to any HTML Element
 */
var ButtonDirective = /** @class */ (function () {
    /**
     * Button Tracking - Constructor
     * @param dataStorage - DataStorageService
     * @param analyticsService
     */
    function ButtonDirective(dataStorage, analyticsService) {
        this.dataStorage = dataStorage;
        this.analyticsService = analyticsService;
        // Gets important data about the button explicitly from the application
        // tslint:disable-next-line: no-input-rename
        this.data = {};
        this.eventLabels = EventLabels;
    }
    /**
     *  Listen to button click actions
     */
    /**
     *  Listen to button click actions
     * @param {?} $event
     * @return {?}
     */
    ButtonDirective.prototype.onClick = /**
     *  Listen to button click actions
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var _this = this;
        this.eventDetails = $event;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.sendData();
        }), 10);
    };
    /** Sending data on button click */
    /**
     * Sending data on button click
     * @return {?}
     */
    ButtonDirective.prototype.sendData = /**
     * Sending data on button click
     * @return {?}
     */
    function () {
        /** @type {?} */
        var analyticsBean = this.analyticsService.setAnalyticsData(this.data, this.eventDetails, this.eventLabels.BUTTON_CLICK, '');
        this.dataStorage.appendToAnalyticsArray(analyticsBean);
    };
    ButtonDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line: directive-selector
                    selector: '[track-btn]'
                },] },
    ];
    ButtonDirective.ctorParameters = function () { return [
        { type: DataStorageService },
        { type: AnalyticsService }
    ]; };
    ButtonDirective.propDecorators = {
        data: [{ type: Input, args: ['track-btn',] }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return ButtonDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ScrollDirective = /** @class */ (function () {
    function ScrollDirective(analyticsService, dataStorage) {
        this.analyticsService = analyticsService;
        this.dataStorage = dataStorage;
        // Gets important data about the component explicitly from the application
        // tslint:disable-next-line: no-input-rename
        this.data = {};
        this.eventLabels = EventLabels;
    }
    // Capture the change in data
    // Capture the change in data
    /**
     * @param {?} changes
     * @return {?}
     */
    ScrollDirective.prototype.ngOnChanges = 
    // Capture the change in data
    /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.data = changes.data.currentValue;
    };
    // Triggered when any scroll event occurs
    // Triggered when any scroll event occurs
    /**
     * @param {?} $event
     * @return {?}
     */
    ScrollDirective.prototype.onScrollEvent = 
    // Triggered when any scroll event occurs
    /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.sendData($event);
        }), 100);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ScrollDirective.prototype.sendData = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var analyticsBean = this.analyticsService.setAnalyticsData(this.data, event, this.eventLabels.SCROLL, '');
        this.dataStorage.appendToAnalyticsArray(analyticsBean);
    };
    ScrollDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line: directive-selector
                    selector: '[track-scroll]'
                },] },
    ];
    ScrollDirective.ctorParameters = function () { return [
        { type: AnalyticsService },
        { type: DataStorageService }
    ]; };
    ScrollDirective.propDecorators = {
        data: [{ type: Input, args: ['track-scroll',] }],
        onScrollEvent: [{ type: HostListener, args: ['window:scroll', ['$event'],] }]
    };
    return ScrollDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ButtonHoverDirective = /** @class */ (function () {
    function ButtonHoverDirective(dataStorage, analyticsService) {
        this.dataStorage = dataStorage;
        this.analyticsService = analyticsService;
        this.eventLabels = EventLabels;
        // Gets important data about the button explicitly from the application
        // tslint:disable-next-line: no-input-rename
        this.data = {};
    }
    // Listen to button hover actions
    // Listen to button hover actions
    /**
     * @param {?} $event
     * @return {?}
     */
    ButtonHoverDirective.prototype.onMouseOver = 
    // Listen to button hover actions
    /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var _this = this;
        this.eventDetails = $event;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.sendData();
        }), 10);
    };
    // Sending data on button hover
    // Sending data on button hover
    /**
     * @return {?}
     */
    ButtonHoverDirective.prototype.sendData = 
    // Sending data on button hover
    /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var analyticsBean = this.analyticsService.setAnalyticsData(this.data, this.eventDetails, this.eventLabels.MOUSE_HOVER, '');
        this.dataStorage.appendToAnalyticsArray(analyticsBean);
    };
    ButtonHoverDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line: directive-selector
                    selector: '[track-buttonHover]'
                },] },
    ];
    ButtonHoverDirective.ctorParameters = function () { return [
        { type: DataStorageService },
        { type: AnalyticsService }
    ]; };
    ButtonHoverDirective.propDecorators = {
        data: [{ type: Input, args: ['track-buttonHover',] }],
        onMouseOver: [{ type: HostListener, args: ['mouseover', ['$event'],] }]
    };
    return ButtonHoverDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var EnvironmentService = /** @class */ (function () {
    function EnvironmentService() {
    }
    // Setting Configuration on environment
    // Setting Configuration on environment
    /**
     * @param {?} configuration
     * @param {?} isPageLoadingToBeDetected
     * @return {?}
     */
    EnvironmentService.prototype.setConfigurationToEnvironment = 
    // Setting Configuration on environment
    /**
     * @param {?} configuration
     * @param {?} isPageLoadingToBeDetected
     * @return {?}
     */
    function (configuration, isPageLoadingToBeDetected) {
        environment.dataCollectionApi = configuration.dataCollectionApi;
        environment.isPageLoadingToBeDetected = isPageLoadingToBeDetected;
        environment.restrictIPRange = configuration.restrictIPRange;
    };
    EnvironmentService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */ EnvironmentService.ngInjectableDef = defineInjectable({ factory: function EnvironmentService_Factory() { return new EnvironmentService(); }, token: EnvironmentService, providedIn: "root" });
    return EnvironmentService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RouterService = /** @class */ (function () {
    function RouterService(routes, analyticsService, dataStorage) {
        this.routes = routes;
        this.analyticsService = analyticsService;
        this.dataStorage = dataStorage;
        this.eventLabels = EventLabels;
        this.navigateOn = '';
    }
    /**
     * Tracking router events
     */
    /**
     * Tracking router events
     * @return {?}
     */
    RouterService.prototype.trackRouterEvents = /**
     * Tracking router events
     * @return {?}
     */
    function () {
        var _this = this;
        /** Triggered when current page is loaded */
        this.routes.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** Triggered when NavigationEnd event occurs */
            if (event instanceof NavigationEnd) {
                if (_this.navigateOn !== event.url) {
                    _this.analyticsPushData(event);
                    _this.navigateOn = event.url;
                }
            }
            else if (event instanceof NavigationError) {
                /** Triggered when NavigationError event occurs */
                _this.analyticsPushData(event);
            }
        }));
    };
    /**
     * Pushing analytics data
     * @param event - Router Event
     */
    /**
     * Pushing analytics data
     * @param {?} event - Router Event
     * @return {?}
     */
    RouterService.prototype.analyticsPushData = /**
     * Pushing analytics data
     * @param {?} event - Router Event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var screenshotName = new Date().getTime().toString();
        this.analyticsData = this.analyticsService.setAnalyticsData({}, {}, this.eventLabels.PAGE_LOAD, screenshotName + ".html", { eventComponent: event.url });
        this.waitTillPageLoad(screenshotName);
        // Data is send only when user configure the page loading to be true
        this.dataStorage.setUrlKey(this.analyticsData.eventComponent);
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.dataStorage.appendToAnalyticsArray(_this.analyticsData);
        }), 0);
    };
    /**
     * Waiting for page to load completely
     * @param event
     */
    /**
     * Waiting for page to load completely
     * @param {?} screenshotName
     * @return {?}
     */
    RouterService.prototype.waitTillPageLoad = /**
     * Waiting for page to load completely
     * @param {?} screenshotName
     * @return {?}
     */
    function (screenshotName) {
        /** @type {?} */
        var _self = this;
        /** @type {?} */
        var interval$$1 = setInterval((/**
         * @return {?}
         */
        function () {
            if (document.readyState === 'complete') {
                clearInterval(interval$$1);
                _self.captureTemplate(screenshotName);
            }
        }), 1000);
    };
    /**
     * Capture template of loaded view
     * @param screenshotName - Screenshot image
     */
    /**
     * Capture template of loaded view
     * @param {?} screenshotName - Screenshot image
     * @return {?}
     */
    RouterService.prototype.captureTemplate = /**
     * Capture template of loaded view
     * @param {?} screenshotName - Screenshot image
     * @return {?}
     */
    function (screenshotName) {
        /** @type {?} */
        var fullPageHTML = ngS3AnalyticsJS.constructHTMLPage(this.processRegexOperations(document.querySelector('head').innerHTML), this.processRegexOperations(document.querySelector('body').innerHTML));
        this.analyticsService.saveScreenshotsInS3(fullPageHTML, screenshotName);
    };
    /**
     * @param {?} text
     * @return {?}
     */
    RouterService.prototype.processRegexOperations = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        return ngS3AnalyticsJS.doRegex(text, window.location.origin);
    };
    RouterService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    RouterService.ctorParameters = function () { return [
        { type: Router },
        { type: AnalyticsService },
        { type: DataStorageService }
    ]; };
    /** @nocollapse */ RouterService.ngInjectableDef = defineInjectable({ factory: function RouterService_Factory() { return new RouterService(inject(Router), inject(AnalyticsService), inject(DataStorageService)); }, token: RouterService, providedIn: "root" });
    return RouterService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PointerService = /** @class */ (function () {
    function PointerService(dataStorage, analyticsService) {
        this.dataStorage = dataStorage;
        this.analyticsService = analyticsService;
        this.eventLabels = EventLabels;
        // tslint:disable-next-line: no-input-rename
        this.data = {};
    }
    /**
     * Track Mouse Movement
     */
    /**
     * Track Mouse Movement
     * @return {?}
     */
    PointerService.prototype.trackMouseMoveEvent = /**
     * Track Mouse Movement
     * @return {?}
     */
    function () {
        var _this = this;
        fromEvent(window, 'mousemove')
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.eventDetails = e;
            _this.sendData();
        }));
    };
    /**
     * Pushing Mouse Move details
     */
    /**
     * Pushing Mouse Move details
     * @return {?}
     */
    PointerService.prototype.sendData = /**
     * Pushing Mouse Move details
     * @return {?}
     */
    function () {
        /** @type {?} */
        var analyticsBean = this.analyticsService.setAnalyticsData(this.data, this.eventDetails, this.eventLabels.MOUSE_MOVE, '');
        this.dataStorage.appendToAnalyticsArray(analyticsBean);
    };
    PointerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    PointerService.ctorParameters = function () { return [
        { type: DataStorageService },
        { type: AnalyticsService }
    ]; };
    PointerService.propDecorators = {
        data: [{ type: Input, args: ['track-pointer',] }]
    };
    /** @nocollapse */ PointerService.ngInjectableDef = defineInjectable({ factory: function PointerService_Factory() { return new PointerService(inject(DataStorageService), inject(AnalyticsService)); }, token: PointerService, providedIn: "root" });
    return PointerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GlobalErrorHandler = /** @class */ (function () {
    function GlobalErrorHandler(injector) {
        this.injector = injector;
        this.eventLabels = EventLabels;
    }
    /**
     * @return {?}
     */
    GlobalErrorHandler.prototype.trackConsoleErrors = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var analyticsService = this.injector.get(AnalyticsService);
        /** @type {?} */
        var dataStorageService = this.injector.get(DataStorageService);
        if (window.console && console.error) {
            /** @type {?} */
            var consoleErrorFnObject_1 = console.error;
            /** @type {?} */
            var _self_1 = this;
            console.error = (/**
             * @param {...?} error
             * @return {?}
             */
            function () {
                var error = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    error[_i] = arguments[_i];
                }
                /** @type {?} */
                var processedError = error.map((/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) {
                    if (typeof (e) === 'object') {
                        return JSON.stringify(e);
                    }
                    else {
                        return e;
                    }
                }));
                // tslint:disable-next-line: max-line-length
                /** @type {?} */
                var analyticsBean = analyticsService.setAnalyticsData('', {}, _self_1.eventLabels.CONSOLE_ERROR, '', { consoleErrors: JSON.stringify(processedError) });
                dataStorageService.appendToAnalyticsArray(analyticsBean);
                consoleErrorFnObject_1.call(console, error);
            });
        }
    };
    GlobalErrorHandler.decorators = [
        { type: Injectable },
    ];
    GlobalErrorHandler.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    return GlobalErrorHandler;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable-next-line: directive-selector
var KeyStrokeDirective = /** @class */ (function () {
    /**
     * Dependencies
     * @param dataStorage
     * @param analyticsService
     * @param el - Element Reference
     * @param renderer - Renderer
     */
    function KeyStrokeDirective(dataStorage, analyticsService, el, renderer) {
        this.dataStorage = dataStorage;
        this.analyticsService = analyticsService;
        this.el = el;
        this.renderer = renderer;
        /** Event Labels Constants */
        this.eventLabels = EventLabels;
        /**
         * if Id doesn't belongs to the element, which is being tracked,
         * Adding a dynamic Id
         */
        if (!this.el.nativeElement.id) {
            /** @type {?} */
            var dynamicId = "key_stroke_element_" + v4();
            this.renderer.setAttribute(this.el.nativeElement, 'id', dynamicId);
        }
    }
    /**
     * Tracking Key press events using host listener
     * Generating a data bean in a specified format
     * @param $event - KeyPress Event
     */
    /**
     * Tracking Key press events using host listener
     * Generating a data bean in a specified format
     * @param {?} $event - KeyPress Event
     * @return {?}
     */
    KeyStrokeDirective.prototype.onKeyStroke = /**
     * Tracking Key press events using host listener
     * Generating a data bean in a specified format
     * @param {?} $event - KeyPress Event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var keyStroke = new KeyStrokeEventType();
        keyStroke.elementId = $event.target.id;
        keyStroke.key = $event.key;
        keyStroke.code = $event.code;
        keyStroke.keyCode = $event.keyCode.toString();
        keyStroke.isForm = $event.target.form !== undefined;
        keyStroke.form = $event.target.form !== undefined ? JSON.stringify($event.target.form.elements) : '';
        keyStroke.tagName = $event.target.tagName;
        keyStroke.htmlElementType = $event.target.type;
        keyStroke.value = $event.target.value;
        this.sendData(keyStroke, $event);
    };
    /**
     * Sending data
     * @param keyStroke - Captured KeyStroke data
     * @param eventDetails - Key Press event details
     */
    /**
     * Sending data
     * @private
     * @param {?} keyStroke - Captured KeyStroke data
     * @param {?} eventDetails - Key Press event details
     * @return {?}
     */
    KeyStrokeDirective.prototype.sendData = /**
     * Sending data
     * @private
     * @param {?} keyStroke - Captured KeyStroke data
     * @param {?} eventDetails - Key Press event details
     * @return {?}
     */
    function (keyStroke, eventDetails) {
        /** @type {?} */
        var analyticsBean = this.analyticsService.setAnalyticsData({}, eventDetails, this.eventLabels.KEY_STROKE, '', { keyStrokeData: keyStroke });
        this.dataStorage.appendToAnalyticsArray(analyticsBean);
    };
    KeyStrokeDirective.decorators = [
        { type: Directive, args: [{ selector: '[track-keyStroke]' },] },
    ];
    KeyStrokeDirective.ctorParameters = function () { return [
        { type: DataStorageService },
        { type: AnalyticsService },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    KeyStrokeDirective.propDecorators = {
        onKeyStroke: [{ type: HostListener, args: ['keypress', ['$event'],] }]
    };
    return KeyStrokeDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgS3AnalyticsModule = /** @class */ (function () {
    function NgS3AnalyticsModule(routerService, dataStorage, pointerService, errorhandler) {
        var _this = this;
        this.routerService = routerService;
        this.dataStorage = dataStorage;
        this.pointerService = pointerService;
        this.errorhandler = errorhandler;
        window.addEventListener('beforeunload', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.dataStorage.pushDataArrayToS3();
        }));
        interval(1000 * 2).subscribe((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            _this.dataStorage.pushDataArrayToS3();
        }));
        this.pointerService.trackMouseMoveEvent();
        this.routerService.trackRouterEvents();
        this.errorhandler.trackConsoleErrors();
    }
    // Configuring the initial setup for s3 bucket and page loading
    // Configuring the initial setup for s3 bucket and page loading
    /**
     * @param {?} configuration
     * @param {?=} isPageLoadingToBeDetected
     * @return {?}
     */
    NgS3AnalyticsModule.forRoot = 
    // Configuring the initial setup for s3 bucket and page loading
    /**
     * @param {?} configuration
     * @param {?=} isPageLoadingToBeDetected
     * @return {?}
     */
    function (configuration, isPageLoadingToBeDetected) {
        if (isPageLoadingToBeDetected === void 0) { isPageLoadingToBeDetected = false; }
        this.environmentService.setConfigurationToEnvironment(configuration, isPageLoadingToBeDetected);
        // Assigning the configuration to environment variables
    };
    NgS3AnalyticsModule.environmentService = new EnvironmentService();
    NgS3AnalyticsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        HttpClientModule
                    ],
                    declarations: [
                        NgS3AnalyticsComponent,
                        ButtonDirective,
                        ScrollDirective,
                        ButtonHoverDirective,
                        KeyStrokeDirective
                    ],
                    providers: [
                        DataStorageService,
                        EnvironmentService,
                        PointerService,
                        CookieService,
                        GlobalErrorHandler
                    ],
                    exports: [
                        NgS3AnalyticsComponent,
                        ButtonDirective,
                        ScrollDirective,
                        ButtonHoverDirective,
                        KeyStrokeDirective
                    ]
                },] },
    ];
    NgS3AnalyticsModule.ctorParameters = function () { return [
        { type: RouterService },
        { type: DataStorageService },
        { type: PointerService },
        { type: GlobalErrorHandler }
    ]; };
    return NgS3AnalyticsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgS3AnalyticsService, NgS3AnalyticsComponent, NgS3AnalyticsModule, EnvironmentService, DataStorageService, ButtonHoverDirective as ɵd, ButtonDirective as ɵa, KeyStrokeDirective as ɵe, ScrollDirective as ɵc, AnalyticsService as ɵb, GlobalErrorHandler as ɵg, PointerService as ɵf, RouterService as ɵh };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kYWdsb2JhbC1uZy1zMy1hbmFseXRpY3MuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLmNvbXBvbmVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi90eXBlcy9ldmVudC50eXBlcy50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL2RpcmVjdGl2ZXMvYnV0dG9uL2J1dHRvbi5kaXJlY3RpdmUudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9kaXJlY3RpdmVzL2J1dHRvbi1ob3Zlci9idXR0b24taG92ZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL3BvaW50ZXIvcG9pbnRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2Vycm9yLWhhbmRsZXIvZXJyb3JIYW5kbGVyLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvZGlyZWN0aXZlcy9rZXktc3Ryb2tlL2tleS1zdHJva2UuZGlyZWN0aXZlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL25nLXMzLWFuYWx5dGljcy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ1MzQW5hbHl0aWNzU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1uZy1zMy1hbmFseXRpY3MnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgbmctczMtYW5hbHl0aWNzIHdvcmtzIVxuICAgIDwvcD5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1MzQW5hbHl0aWNzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImV4cG9ydCBsZXQgZW52aXJvbm1lbnQgPSB7XG4gICAgZGF0YUNvbGxlY3Rpb25BcGk6ICdodHRwczovLzF4Z2Y1YTJicTIuZXhlY3V0ZS1hcGkuYXAtc291dGgtMS5hbWF6b25hd3MuY29tL2Rldi8nLFxuICAgIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ6IHRydWUsXG4gICAgcmVzdHJpY3RJUFJhbmdlOiAnJ1xufTtcblxuXG4iLCJleHBvcnQgZW51bSBFdmVudExhYmVscyB7XG4gICAgUEFHRV9MT0FEID0gJ1BBR0VfTE9BRCcsXG4gICAgTU9VU0VfSE9WRVIgPSAnTU9VU0VfSE9WRVInLFxuICAgIEJVVFRPTl9DTElDSyA9ICdCVVRUT05fQ0xJQ0snLFxuICAgIE1PVVNFX01PVkUgPSAnTU9VU0VfTU9WRScsXG4gICAgU0NST0xMID0gJ1NDUk9MTCcsXG4gICAgQ09OU09MRV9FUlJPUiA9ICdDT05TT0xFX0VSUk9SJyxcbiAgICBLRVlfU1RST0tFID0gJ0tFWV9TVFJPS0UnXG59XG5cbmV4cG9ydCBlbnVtIENvbnN0YW50cyB7XG4gICAgREVNT0dSQVBISUNfSU5GTyA9ICdkZW1vZ3JhcGhpYy1pbmZvJyxcbiAgICBTRVNTSU9OX0lEID0gJ25nUzNBbmFseXRpY3NTZXNzaW9uSWQnLFxuICAgIERFTU9HUkFQSElDX0FQSV9VUkwgPSAnaHR0cHM6Ly9pcGFwaS5jby9qc29uLydcbn1cblxuXG5leHBvcnQgY2xhc3MgS2V5U3Ryb2tlRXZlbnRUeXBlIHtcbiAgICBrZXk6IHN0cmluZzsgLy8gcHJlc3NlZCBLZXlcbiAgICBrZXlDb2RlOiBzdHJpbmc7IC8vIHByZXNzZWQgS2V5IENvZGVcbiAgICBlbGVtZW50SWQ6IHN0cmluZzsgLy8gSWQgb2YgZWxlbWVudFxuICAgIGlzRm9ybTogYm9vbGVhbjsgLy8gaXMgaXQgYSBmb3JtXG4gICAgZm9ybTogc3RyaW5nO1xuICAgIHRhZ05hbWU6IHN0cmluZzsgLy8gdGFnTmFtZSBvZiBlbGVtZW50XG4gICAgaHRtbEVsZW1lbnRUeXBlOiBzdHJpbmc7IC8vIHR5cGUgb2YgZWxlbWVudFxuICAgIHZhbHVlOiBzdHJpbmc7IC8vIHByZXZpb3VzIHZhbHVlIG9mIHRoZSBlbGVtZW50XG4gICAgY29kZTogc3RyaW5nOyAvLyBQcmVzc2VkIGtleSBsYWJlbFxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgKiBhcyB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiwgUGVyZm9ybWFuY2VCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJ25neC1jb29raWUtc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzLCBLZXlTdHJva2VFdmVudFR5cGUsIENvbnN0YW50cyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbi8qKlxuICogQW5hbHl0aWNzIFNlcnZpY2VcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQW5hbHl0aWNzU2VydmljZSB7XG5cbiAgLyoqIFNlc3Npb25JZCBvZiBwbHVnaW4gKi9cbiAgc2Vzc2lvbklkOiBzdHJpbmc7XG4gIC8qKiBEZW1vZ3JhcGhpYyBpbmZvICovXG4gIGRlbW9ncmFwaGljSW5mbzogYW55ID0ge307XG4gIC8qKiBFdmVudCBsYWJlbCBjb25zdGFudHMgKi9cbiAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgLyoqIENvbnN0YW50cyAqL1xuICBjb25zdGFudHMgPSBDb25zdGFudHM7XG5cbiAgLyoqXG4gICAqIEFuYWx5dGljcyBTZXJ2aWNlIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBjb29raWVTZXJ2aWNlXG4gICAqIEBwYXJhbSBodHRwU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlLFxuICAgIHByaXZhdGUgaHR0cFNlcnZpY2U6IEh0dHBDbGllbnQpIHtcbiAgICBpZiAoIXRoaXMuY29va2llU2VydmljZS5jaGVjayh0aGlzLmNvbnN0YW50cy5ERU1PR1JBUEhJQ19JTkZPKSkge1xuICAgICAgdGhpcy5nZXRJcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlbW9ncmFwaGljSW5mbyA9IEpTT04ucGFyc2UodGhpcy5jb29raWVTZXJ2aWNlLmdldCh0aGlzLmNvbnN0YW50cy5ERU1PR1JBUEhJQ19JTkZPKSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U2Vzc2lvbklkKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tpbmcgd2hldGhlciBzZXNzaW9uSWQgcHJlc2VudCBpbiBjb29raWUgb3Igbm90XG4gICAqIGlmIG5vIHNlc3Npb24gaWQgY29va2llIHByZXNlbnQsIGFkZGluZyBuZXcgc2Vzc2lvbiBpZCBvdGhlcndpc2UgcmV1c2luZyB0aGUgc2Vzc2lvbiBpZCB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRTZXNzaW9uSWQoKTogdm9pZCB7XG4gICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0odGhpcy5jb25zdGFudHMuU0VTU0lPTl9JRCkpIHtcbiAgICAgIHRoaXMuc2Vzc2lvbklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmNvbnN0YW50cy5TRVNTSU9OX0lEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXNzaW9uSWQgPSB1dWlkLnY0KCk7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHRoaXMuY29uc3RhbnRzLlNFU1NJT05fSUQsIHRoaXMuc2Vzc2lvbklkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tpbmcgdGhlIElQIHJhbmdlIHRvIGJlIHJlc3RyaWN0XG4gICAqIEBwYXJhbSBkYXRhIC0gZGF0YSB0byBiZSBwdXNoZWRcbiAgICovXG4gIHB1YmxpYyBwdXNoRGF0YShkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jaGVja0lwUmFuZ2UoKSkge1xuICAgICAgdGhpcy5wdWJsaXNoVE9BdXRoUzMoZGF0YSk7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogSVAgcmFuZ2UgcmVzdHJpY3Rpb24gYWRkZWRcbiAgICogQHJlc3RyaWN0SVBSYW5nZSBpcyBhIHJlZ2V4XG4gICAqIGlmIEByZXN0cmljdElQUmFuZ2UgaXMgbWF0Y2ggd2l0aCBjdXJyZW50IElQLFxuICAgKiB0aGUgYW5hbHl0aWNzIGRhdGEgd2lsbCBiZSByZXN0cmljdGVkXG4gICAqL1xuICBwcml2YXRlIGNoZWNrSXBSYW5nZSgpOiBib29sZWFuIHtcbiAgICBjb25zdCBpcFJhbmdlID0gZW52aXJvbm1lbnQucmVzdHJpY3RJUFJhbmdlO1xuICAgIGlmIChpcFJhbmdlICYmIHRoaXMuZGVtb2dyYXBoaWNJbmZvLmlwKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZW1vZ3JhcGhpY0luZm8uaXAubWF0Y2goaXBSYW5nZSkgPyBmYWxzZSA6IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0aW5nIEpTT04gQXJyYXkgdG8gc3RyaW5nXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqL1xuICBwcml2YXRlIHByb2Nlc3NGb3JBdGhlbmEoZGF0YTogQXJyYXk8QW5hbHl0aWNzQmVhbj4pOiBzdHJpbmcge1xuICAgIHJldHVybiBkYXRhLm1hcCgob2JqZWN0OiBhbnkpID0+IHtcbiAgICAgIG9iamVjdFsnc2Vzc2lvbklkJ10gPSB0aGlzLnNlc3Npb25JZDtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmplY3QpO1xuICAgIH0pLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgLyoqXG4gICAgKiBQcmVwYXJpbmcgZGF0YSB0byBiZSBwdXNoZWQgdG8gRGF0YVN0b3JhZ2VcbiAgICAqIEBwYXJhbSBkYXRhICBkYXRhIHRvIGJlIHB1c2hlZFxuICAgICovXG4gIHByaXZhdGUgcHVibGlzaFRPQXV0aFMzKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gYCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19XyR7dGhpcy5zZXNzaW9uSWR9XyR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfS5qc29uYDtcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICB0aGlzLnB1c2hEYXRhVG9TMyhmaWxlbmFtZSwgdGhpcy5wcm9jZXNzRm9yQXRoZW5hKGRhdGEuZXZlbnRWYWx1ZXMpLCBoZWFkZXJzKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgZGF0YSB0byBjb3JyZXNwb25kaW5nIGJ1Y2tldCB1c2luZyBkYXRhIGNvbGxlY3Rpb24gYXBpXG4gICAqIEBwYXJhbSBwYXRoIC0gc2VydmljZSBwYXRoXG4gICAqIEBwYXJhbSBkYXRhIC0gZGF0YSB0byBiZSBwdXNoZWRcbiAgICovXG4gIHByaXZhdGUgcHVzaERhdGFUb1MzKHBhdGg6IHN0cmluZywgZGF0YTogYW55LCBoZWFkZXJzOiBIdHRwSGVhZGVycyk6IHZvaWQge1xuICAgIGNvbnN0IHVybCA9IGAke2Vudmlyb25tZW50LmRhdGFDb2xsZWN0aW9uQXBpfSR7cGF0aH1gO1xuXG4gICAgdGhpcy5odHRwU2VydmljZS5wdXQodXJsLCBkYXRhLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSkuc3Vic2NyaWJlKHJlcyA9PiB7IH0sIGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgdGhlIGNhcHR1cmVkIEhUTUwgdG8gdGhlIGRhdGEgY29sbGVjdGlvblxuICAgKiBAcGFyYW0gaHRtbFRlbXBsYXRlIC0gRE9NIENvbnRlbnRcbiAgICogQHBhcmFtIHNjcmVlbnNob3ROYW1lIC0gZmlsZW5hbWUgdG8gYmUgc2F2ZWRcbiAgICovXG4gIHB1YmxpYyBzYXZlU2NyZWVuc2hvdHNJblMzKGh0bWxUZW1wbGF0ZTogc3RyaW5nLCBzY3JlZW5zaG90TmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBgYXNzZXRzLyR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19LyR7dGhpcy5zZXNzaW9uSWR9LyR7c2NyZWVuc2hvdE5hbWV9Lmh0bWxgO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ3RleHQvaHRtbCcgfSk7XG4gICAgdGhpcy5wdXNoRGF0YVRvUzMoZmlsZW5hbWUsIGh0bWxUZW1wbGF0ZSwgaGVhZGVycyk7XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBjb25zb2xlIGVycm9ycyB0byBTMyBidWNrZXRcbiAgICogQHBhcmFtIGRhdGEgXG4gICAqL1xuICBwdWJsaWMgcHVibGlzaENvbnNvbGVFcnJvcnMoZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICBkYXRhWydzZXNzaW9uSWQnXSA9IHRoaXMuc2Vzc2lvbklkO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gYCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19XyR7dGhpcy5zZXNzaW9uSWR9X2NvbnNvbGVfZXJyb3JzXyR7bmV3IERhdGUoKS5nZXRUaW1lKCl9Lmpzb25gO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgIHRoaXMucHVzaERhdGFUb1MzKGZpbGVuYW1lLCBkYXRhLCBoZWFkZXJzKTtcbiAgfVxuXG5cblxuICAvKipcbiAgICogU2V0dGluZyBhbmFseXRpY3Mgb2JqZWN0IHRvIGJlIHNhdmVkIGluIFMzIGJ1Y2tldFxuICAgKiBAcGFyYW0gdXNlckRhdGEgLSBEYXRhIHRyYW5zZmVycmVkIHRvIEV2ZW50IERpcmVjdGl2ZVxuICAgKiBAcGFyYW0gZXZlbnREZXRhaWxzIC0gUG9zaXRpb24gb2YgZXZlbnRzXG4gICAqIEBwYXJhbSBldmVudE5hbWUgIC0gVHlwZSBvZiBldmVudFxuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgIC0gZmlsZSBuYW1lIG9mIHNhdmVkIHNjcmVlbnNob3QgaWYgdGhlIGV2ZW50IGlzIFBhZ2VMb2FkZWRcbiAgICovXG4gIHB1YmxpYyBzZXRBbmFseXRpY3NEYXRhKFxuICAgIHVzZXJEYXRhOiBhbnkgPSB7fSxcbiAgICBldmVudERldGFpbHM6IGFueSxcbiAgICBldmVudE5hbWU6IHN0cmluZyxcbiAgICBzY3JlZW5zaG90TmFtZTogc3RyaW5nLFxuICAgIG9wdGlvbmFsPzoge1xuICAgICAgZXZlbnRDb21wb25lbnQ/OiBzdHJpbmcsXG4gICAgICBrZXlTdHJva2VEYXRhPzogS2V5U3Ryb2tlRXZlbnRUeXBlLFxuICAgICAgY29uc29sZUVycm9ycz86IHN0cmluZ1xuICAgIH0pOiBBbmFseXRpY3NCZWFuIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID0ge1xuICAgICAgZXZlbnRMYWJlbDogZXZlbnROYW1lLFxuICAgICAgZXZlbnRDb21wb25lbnQ6IG9wdGlvbmFsICYmIG9wdGlvbmFsLmV2ZW50Q29tcG9uZW50ID8gb3B0aW9uYWwuZXZlbnRDb21wb25lbnQgOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJz8nKVswXSxcbiAgICAgIGJyb3dzZXI6IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgZnVsbFVSTDogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICBvcmlnaW46IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgICByZXNvbHV0aW9uOiBgJHt3aW5kb3cuaW5uZXJXaWR0aH14JHt3aW5kb3cuaW5uZXJIZWlnaHR9YCxcbiAgICAgIHhDb29yZDogdGhpcy5nZXRFdmVudERldGFpbHMoZXZlbnREZXRhaWxzWydjbGllbnRYJ10pLFxuICAgICAgeUNvb3JkOiB0aGlzLmdldEV2ZW50RGV0YWlscyhldmVudERldGFpbHNbJ2NsaWVudFknXSksXG4gICAgICBwYWdlWENvb3JkOiB3aW5kb3cucGFnZVhPZmZzZXQudG9TdHJpbmcoKSB8fCAnMCcsXG4gICAgICBwYWdlWUNvb3JkOiB3aW5kb3cucGFnZVlPZmZzZXQudG9TdHJpbmcoKSB8fCAnMCcsXG4gICAgICBldmVudFRpbWU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIHNjcmVlbnNob3Q6IHNjcmVlbnNob3ROYW1lLFxuICAgICAgYWRkaXRpb25hbEluZm86IHVzZXJEYXRhLFxuICAgICAgZXJyb3JzOiAob3B0aW9uYWwgJiYgb3B0aW9uYWwuY29uc29sZUVycm9ycykgPyBvcHRpb25hbC5jb25zb2xlRXJyb3JzIDogJycsXG4gICAgICB1dG06IHRoaXMuZ2V0VVRNUGFyYW1ldGVycyh3aW5kb3cubG9jYXRpb24uaHJlZiksXG4gICAgICBkZW1vZ3JhcGhpY0luZm86IHRoaXMuZGVtb2dyYXBoaWNJbmZvLFxuICAgICAga2V5U3Ryb2tlRGF0YTogKG9wdGlvbmFsICYmIG9wdGlvbmFsLmtleVN0cm9rZURhdGEpID8gb3B0aW9uYWwua2V5U3Ryb2tlRGF0YSA6IHRoaXMuZ2V0RW1wdHlLZXlTdHJva2VEYXRhKCksXG4gICAgICBodG1sRWxlbWVudDogdGhpcy5nZXRIdG1sRWxlbWVudChldmVudERldGFpbHNbJ3RhcmdldCddKSxcbiAgICAgIHBlcmZvcm1hbmNlOiB0aGlzLmdldFBlcmZvcm1hbmNlRGV0YWlscygpLFxuICAgIH07XG4gICAgcmV0dXJuIGFuYWx5dGljc0JlYW47XG4gIH1cblxuICAvKipcbiAgICogRXZlbnQgZGV0YWlsc1xuICAgKiBAcGFyYW0gdmFsdWUgXG4gICAqL1xuICBwcml2YXRlIGdldEV2ZW50RGV0YWlscyh2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlLnRvU3RyaW5nKCkgOiAnMCc7XG4gIH1cblxuICAvKipcbiAgICogR2V0IEhUTUwgQ29udGVudFxuICAgKiBAcGFyYW0gdGFyZ2V0RWxlbWVudCAtIHRhcmdldCBlbGVtZW50XG4gICAqL1xuICBwcml2YXRlIGdldEh0bWxFbGVtZW50KHRhcmdldEVsZW1lbnQ6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRhcmdldEVsZW1lbnQgIT09IHVuZGVmaW5lZCA/IHRhcmdldEVsZW1lbnRbJ2lubmVySFRNTCddIDogJyc7XG4gIH1cblxuXG4gIHByaXZhdGUgZ2V0RW1wdHlLZXlTdHJva2VEYXRhKCk6IEtleVN0cm9rZUV2ZW50VHlwZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGtleTogJycsXG4gICAgICBrZXlDb2RlOiAnJyxcbiAgICAgIGNvZGU6ICcnLFxuICAgICAgZWxlbWVudElkOiAnJyxcbiAgICAgIGZvcm06ICcnLFxuICAgICAgaHRtbEVsZW1lbnRUeXBlOiAnJyxcbiAgICAgIGlzRm9ybTogZmFsc2UsXG4gICAgICB0YWdOYW1lOiAnJyxcbiAgICAgIHZhbHVlOiAnJ1xuICAgIH07XG4gIH1cblxuXG4gIC8qKlxuICAgKiBQZXJmb3JtYW5jZSBkZXRhaWxzXG4gICAqL1xuICBwcml2YXRlIGdldFBlcmZvcm1hbmNlRGV0YWlscygpOiBQZXJmb3JtYW5jZUJlYW4ge1xuICAgIGNvbnN0IHBlcmZvcm1hbmNlID0gd2luZG93LnBlcmZvcm1hbmNlO1xuICAgIHJldHVybiB7XG4gICAgICBuYXZpZ2F0aW9uOiBwZXJmb3JtYW5jZS5uYXZpZ2F0aW9uLFxuICAgICAgdGltZU9yaWdpbjogcGVyZm9ybWFuY2UudGltZU9yaWdpbixcbiAgICAgIHRpbWluZzogcGVyZm9ybWFuY2UudGltaW5nXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZW1vcnkgdXNhZ2Ugb2YgdGhlIGFwcGxpY2F0aW9uIGlzIHByb3ZpZGVkIGJ5IEdvb2dsZSBDaHJvbWVcbiAgICogQHBhcmFtIHVzZXJBZ2VudCAtIFVzZXIgYWdlbnQgdG8gY2hlY2sgdGhlIGJyb3dzZXJcbiAgICovXG4gIHByaXZhdGUgZ2VNZW1vcnlVc2FnZUluZm8odXNlckFnZW50OiBhbnkpIHtcbiAgICBjb25zdCBpc0Nocm9tZSA9IHVzZXJBZ2VudC5zcGxpdCgnY2hyb21lJykubGVuZ3RoID4gMTtcbiAgICBjb25zdCBtZW1vcnkgPSBpc0Nocm9tZSA/IHdpbmRvdy5wZXJmb3JtYW5jZVsnbWVtb3J5J10gOiAnJztcbiAgICByZXR1cm4gbWVtb3J5O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHRpbmcgVVRNIFBhcmFtZXRlcnMgYnkgcHJvY2Vzc2luZyBjdXJyZW50IHBhZ2VVUkxcbiAgICogQHBhcmFtIHVybCAtIFBhZ2UgVVJMXG4gICAqL1xuICBwcml2YXRlIGdldFVUTVBhcmFtZXRlcnModXJsOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IHV0bU9iamVjdCA9IHt9O1xuICAgIGlmICh1cmwuaW5jbHVkZXMoJ3V0bScpKSB7XG4gICAgICBjb25zdCB1dG1QYXJhbXMgPSB1cmwuc3BsaXQoJz8nKVsxXS5zcGxpdCgnJicpO1xuICAgICAgdXRtUGFyYW1zLm1hcChwYXJhbSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHBhcmFtLnNwbGl0KCc9Jyk7XG4gICAgICAgIHV0bU9iamVjdFtwYXJhbXNbMF1dID0gcGFyYW1zWzFdO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB1dG1PYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHVzZXIgZGVtb2dyYXBoaWMgaW5mb3JtYXRpb24gaW4gY29va2llc1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRJcCgpOiB2b2lkIHtcbiAgICB0aGlzLmh0dHBTZXJ2aWNlLmdldCh0aGlzLmNvbnN0YW50cy5ERU1PR1JBUEhJQ19BUElfVVJMKS5zdWJzY3JpYmUoXG4gICAgICAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5kZW1vZ3JhcGhpY0luZm8gPSByZXM7XG4gICAgICAgIHRoaXMuY29va2llU2VydmljZS5zZXQoXG4gICAgICAgICAgdGhpcy5jb25zdGFudHMuREVNT0dSQVBISUNfSU5GTywgSlNPTi5zdHJpbmdpZnkocmVzKSxcbiAgICAgICAgICBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArICgxMDAwICogNjAgKiA2MCAqIDI0KSkpO1xuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERhdGFTdG9yYWdlU2VydmljZSB7XG5cbiAgYWxsRGF0YUFuYWx5dGljc0FycmF5OiBBcnJheTxhbnk+ID0gW107XG4gIGFsbERhdGFBbmFseXRpY3M6IHtcbiAgICBwYWdlVXJsOiBzdHJpbmcsXG4gICAgZXZlbnRWYWx1ZXM6IEFycmF5PGFueT5cbiAgfTtcbiAgcHJldmlvdXNVcmw6IHN0cmluZztcbiAga2V5czogQXJyYXk8YW55PiA9IFtdO1xuICBldmVudENvbGxlY3RvciA9IG5ldyBNYXAoKTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhbmFseXRpY2FsU2VydmljZTogQW5hbHl0aWNzU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cbiAgcHJpdmF0ZSByb3V0ZURldGFpbHM6IGFueSA9IFtdO1xuICBjb3VudCA9IDA7XG4gIHNldFVybEtleShkYXRhOiBzdHJpbmcpIHtcbiAgICBsZXQgZmxhZyA9IDA7XG4gICAgaWYgKHRoaXMucHJldmlvdXNVcmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5ldmVudENvbGxlY3Rvci5zZXQoZGF0YSwgW10pO1xuICAgICAgdGhpcy5wcmV2aW91c1VybCA9IGRhdGEgfHwgJy8nO1xuICAgIH0gZWxzZSBpZiAoIShkYXRhID09PSB0aGlzLnByZXZpb3VzVXJsKSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmtleXMoKSkpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gZGF0YSkge1xuICAgICAgICAgIGZsYWcgPSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZmxhZyA9PT0gMCkge1xuICAgICAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLnNldChkYXRhLCBbXSk7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXZpb3VzVXJsID0gZGF0YTtcbiAgICB9XG4gIH1cbiAgYXBwZW5kVG9BbmFseXRpY3NBcnJheShkYXRhOiBBbmFseXRpY3NCZWFuKSB7XG4gICAgaWYgKHRoaXMucHJldmlvdXNVcmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zZXRVcmxLZXkoZGF0YS5ldmVudENvbXBvbmVudCk7XG4gICAgfVxuICAgIHRoaXMuZXZlbnRDb2xsZWN0b3IuZ2V0KHRoaXMucHJldmlvdXNVcmwpLnB1c2goZGF0YSk7XG4gIH1cblxuICBwdXNoRGF0YUFycmF5VG9TMygpIHtcbiAgICB0aGlzLmNvdW50Kys7XG4gICAgLy8gdGhpcy5hbGxEYXRhQW5hbHl0aWNzTWFwID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShBcnJheS5mcm9tKHRoaXMuZXZlbnRDb2xsZWN0b3Iua2V5cygpKSkpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIEFycmF5LmZyb20odGhpcy5ldmVudENvbGxlY3Rvci5rZXlzKCkpKSB7XG4gICAgICB0aGlzLmFsbERhdGFBbmFseXRpY3MgPSB7XG4gICAgICAgIHBhZ2VVcmw6IGtleSxcbiAgICAgICAgZXZlbnRWYWx1ZXM6IEFycmF5LmZyb20odGhpcy5ldmVudENvbGxlY3Rvci5nZXQoa2V5KS52YWx1ZXMoKSlcbiAgICAgIH07XG4gICAgICB0aGlzLmtleXMucHVzaChrZXkpO1xuICAgICAgaWYgKHRoaXMuYWxsRGF0YUFuYWx5dGljcy5ldmVudFZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuYW5hbHl0aWNhbFNlcnZpY2UucHVzaERhdGEodGhpcy5hbGxEYXRhQW5hbHl0aWNzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5ldmVudENvbGxlY3Rvci5jbGVhcigpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMua2V5cykge1xuICAgICAgdGhpcy5ldmVudENvbGxlY3Rvci5zZXQoa2V5LCBbXSk7XG4gICAgfVxuICB9XG5cbiAgc2V0Um91dGVEZXRhaWxzKHJvdXRlRGV0YWlsczogYW55KSB7XG4gICAgdGhpcy5yb3V0ZURldGFpbHMgPSByb3V0ZURldGFpbHM7XG4gIH1cblxuICBnZXRSb3V0ZURldGFpbHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVEZXRhaWxzO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuXG4vKipcbiAqIEJ1dHRvbiBEaXJlY3RpdmUgdG8gdHJhY2sgY2xpY2sgZXZlbnRcbiAqIFNlbGVjdG9yIGNhbiBiZSBhZGRlZCB0byBhbnkgSFRNTCBFbGVtZW50XG4gKi9cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1t0cmFjay1idG5dJ1xufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25EaXJlY3RpdmUge1xuXG4gIC8vIEdldHMgaW1wb3J0YW50IGRhdGEgYWJvdXQgdGhlIGJ1dHRvbiBleHBsaWNpdGx5IGZyb20gdGhlIGFwcGxpY2F0aW9uXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgndHJhY2stYnRuJykgZGF0YTogYW55ID0ge307XG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIGV2ZW50RGV0YWlsczogYW55O1xuXG4gIC8qKlxuICAgKiBCdXR0b24gVHJhY2tpbmcgLSBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gZGF0YVN0b3JhZ2UgLSBEYXRhU3RvcmFnZVNlcnZpY2VcbiAgICogQHBhcmFtIGFuYWx5dGljc1NlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlKSB7IH1cblxuXG4gIC8qKlxuICAgKiAgTGlzdGVuIHRvIGJ1dHRvbiBjbGljayBhY3Rpb25zXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIG9uQ2xpY2soJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmV2ZW50RGV0YWlscyA9ICRldmVudDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2VuZERhdGEoKTtcbiAgICB9LCAxMCk7XG4gIH1cblxuICAvKiogU2VuZGluZyBkYXRhIG9uIGJ1dHRvbiBjbGljayAqL1xuICBwdWJsaWMgc2VuZERhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIHRoaXMuZXZlbnREZXRhaWxzLCB0aGlzLmV2ZW50TGFiZWxzLkJVVFRPTl9DTElDSywgJycpO1xuICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkNoYW5nZXMsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcblxuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1t0cmFjay1zY3JvbGxdJ1xufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgLy8gR2V0cyBpbXBvcnRhbnQgZGF0YSBhYm91dCB0aGUgY29tcG9uZW50IGV4cGxpY2l0bHkgZnJvbSB0aGUgYXBwbGljYXRpb25cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICAgIEBJbnB1dCgndHJhY2stc2Nyb2xsJykgZGF0YTogYW55ID0ge307XG4gICAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZVxuICAgICkgeyB9XG5cbiAgICAvLyBDYXB0dXJlIHRoZSBjaGFuZ2UgaW4gZGF0YVxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlO1xuICAgIH1cblxuICAgIC8vIFRyaWdnZXJlZCB3aGVuIGFueSBzY3JvbGwgZXZlbnQgb2NjdXJzXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnNjcm9sbCcsIFsnJGV2ZW50J10pIG9uU2Nyb2xsRXZlbnQoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbmREYXRhKCRldmVudCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc2VuZERhdGEoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgICAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgZXZlbnQsIHRoaXMuZXZlbnRMYWJlbHMuU0NST0xMLCAnJyk7XG4gICAgICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbdHJhY2stYnV0dG9uSG92ZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25Ib3ZlckRpcmVjdGl2ZSB7XG4gIC8qKiAqL1xuICBldmVudERldGFpbHM6IGFueTtcbiAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgLy8gR2V0cyBpbXBvcnRhbnQgZGF0YSBhYm91dCB0aGUgYnV0dG9uIGV4cGxpY2l0bHkgZnJvbSB0aGUgYXBwbGljYXRpb25cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCd0cmFjay1idXR0b25Ib3ZlcicpIGRhdGE6IGFueSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlKSB7IH1cblxuICAvLyBMaXN0ZW4gdG8gYnV0dG9uIGhvdmVyIGFjdGlvbnNcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VvdmVyJywgWyckZXZlbnQnXSkgb25Nb3VzZU92ZXIoJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmV2ZW50RGV0YWlscyA9ICRldmVudDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2VuZERhdGEoKTtcbiAgICB9LCAxMCk7XG4gIH1cblxuICAvLyBTZW5kaW5nIGRhdGEgb24gYnV0dG9uIGhvdmVyXG4gIHB1YmxpYyBzZW5kRGF0YSgpOiB2b2lkIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgdGhpcy5ldmVudERldGFpbHMsIHRoaXMuZXZlbnRMYWJlbHMuTU9VU0VfSE9WRVIsICcnKTtcbiAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gIH1cbn1cbiIsIlxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcblxuZXhwb3J0IGNsYXNzIEVudmlyb25tZW50U2VydmljZSB7XG5cblxuICAvLyBTZXR0aW5nIENvbmZpZ3VyYXRpb24gb24gZW52aXJvbm1lbnRcbiAgc2V0Q29uZmlndXJhdGlvblRvRW52aXJvbm1lbnQoY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiwgaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDogYm9vbGVhbikge1xuICAgIGVudmlyb25tZW50LmRhdGFDb2xsZWN0aW9uQXBpID0gY29uZmlndXJhdGlvbi5kYXRhQ29sbGVjdGlvbkFwaTtcbiAgICBlbnZpcm9ubWVudC5pc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkID0gaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDtcbiAgICBlbnZpcm9ubWVudC5yZXN0cmljdElQUmFuZ2UgPSBjb25maWd1cmF0aW9uLnJlc3RyaWN0SVBSYW5nZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kLCBOYXZpZ2F0aW9uRXJyb3IgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuZGVjbGFyZSBsZXQgbmdTM0FuYWx5dGljc0pTOiBhbnk7XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSb3V0ZXJTZXJ2aWNlIHtcbiAgYW5hbHl0aWNzRGF0YTogQW5hbHl0aWNzQmVhbjtcbiAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgbmF2aWdhdGVPbiA9ICcnO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlczogUm91dGVyLCBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSkge1xuXG4gIH1cblxuICAvKipcbiAgICogVHJhY2tpbmcgcm91dGVyIGV2ZW50c1xuICAgKi9cbiAgcHVibGljIHRyYWNrUm91dGVyRXZlbnRzKCk6IHZvaWQge1xuICAgIC8qKiBUcmlnZ2VyZWQgd2hlbiBjdXJyZW50IHBhZ2UgaXMgbG9hZGVkICovXG4gICAgdGhpcy5yb3V0ZXMuZXZlbnRzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIC8qKiBUcmlnZ2VyZWQgd2hlbiBOYXZpZ2F0aW9uRW5kIGV2ZW50IG9jY3VycyAqL1xuICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xuICAgICAgICBpZiAodGhpcy5uYXZpZ2F0ZU9uICE9PSBldmVudC51cmwpIHtcbiAgICAgICAgICB0aGlzLmFuYWx5dGljc1B1c2hEYXRhKGV2ZW50KTtcbiAgICAgICAgICB0aGlzLm5hdmlnYXRlT24gPSBldmVudC51cmw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRXJyb3IpIHtcbiAgICAgICAgLyoqIFRyaWdnZXJlZCB3aGVuIE5hdmlnYXRpb25FcnJvciBldmVudCBvY2N1cnMgKi9cbiAgICAgICAgdGhpcy5hbmFseXRpY3NQdXNoRGF0YShldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBhbmFseXRpY3MgZGF0YVxuICAgKiBAcGFyYW0gZXZlbnQgLSBSb3V0ZXIgRXZlbnRcbiAgICovXG4gIHB1YmxpYyBhbmFseXRpY3NQdXNoRGF0YShldmVudDogYW55KTogdm9pZCB7XG4gICAgY29uc3Qgc2NyZWVuc2hvdE5hbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygpO1xuICAgIHRoaXMuYW5hbHl0aWNzRGF0YSA9IHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHt9LCB7fSwgdGhpcy5ldmVudExhYmVscy5QQUdFX0xPQUQsIGAke3NjcmVlbnNob3ROYW1lfS5odG1sYCxcbiAgICAgIHsgZXZlbnRDb21wb25lbnQ6IGV2ZW50LnVybCB9KTtcbiAgICB0aGlzLndhaXRUaWxsUGFnZUxvYWQoc2NyZWVuc2hvdE5hbWUpO1xuICAgIC8vIERhdGEgaXMgc2VuZCBvbmx5IHdoZW4gdXNlciBjb25maWd1cmUgdGhlIHBhZ2UgbG9hZGluZyB0byBiZSB0cnVlXG4gICAgdGhpcy5kYXRhU3RvcmFnZS5zZXRVcmxLZXkodGhpcy5hbmFseXRpY3NEYXRhLmV2ZW50Q29tcG9uZW50KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheSh0aGlzLmFuYWx5dGljc0RhdGEpO1xuICAgIH0sIDApO1xuICB9XG5cblxuICAvKipcbiAgICogV2FpdGluZyBmb3IgcGFnZSB0byBsb2FkIGNvbXBsZXRlbHlcbiAgICogQHBhcmFtIGV2ZW50IFxuICAgKi9cbiAgd2FpdFRpbGxQYWdlTG9hZChzY3JlZW5zaG90TmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIF9zZWxmLmNhcHR1cmVUZW1wbGF0ZShzY3JlZW5zaG90TmFtZSk7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FwdHVyZSB0ZW1wbGF0ZSBvZiBsb2FkZWQgdmlld1xuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgLSBTY3JlZW5zaG90IGltYWdlXG4gICAqL1xuICBjYXB0dXJlVGVtcGxhdGUoc2NyZWVuc2hvdE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZ1bGxQYWdlSFRNTCA9IG5nUzNBbmFseXRpY3NKUy5jb25zdHJ1Y3RIVE1MUGFnZShcbiAgICAgIHRoaXMucHJvY2Vzc1JlZ2V4T3BlcmF0aW9ucyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuaW5uZXJIVE1MKSxcbiAgICAgIHRoaXMucHJvY2Vzc1JlZ2V4T3BlcmF0aW9ucyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuaW5uZXJIVE1MKVxuICAgICk7XG4gICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNhdmVTY3JlZW5zaG90c0luUzMoZnVsbFBhZ2VIVE1MLCBzY3JlZW5zaG90TmFtZSk7XG4gIH1cblxuXG4gIHByb2Nlc3NSZWdleE9wZXJhdGlvbnModGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbmdTM0FuYWx5dGljc0pTLmRvUmVnZXgodGV4dCwgd2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIElucHV0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUG9pbnRlclNlcnZpY2Uge1xuXG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIGV2ZW50RGV0YWlsczogYW55O1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ3RyYWNrLXBvaW50ZXInKSBkYXRhOiBhbnkgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSkgeyB9XG5cbiAgLyoqXG4gICAqIFRyYWNrIE1vdXNlIE1vdmVtZW50XG4gICAqL1xuICB0cmFja01vdXNlTW92ZUV2ZW50KCkge1xuICAgIGZyb21FdmVudCh3aW5kb3csICdtb3VzZW1vdmUnKVxuICAgICAgLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLmV2ZW50RGV0YWlscyA9IGU7XG4gICAgICAgIHRoaXMuc2VuZERhdGEoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgTW91c2UgTW92ZSBkZXRhaWxzXG4gICAqL1xuICBwdWJsaWMgc2VuZERhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIHRoaXMuZXZlbnREZXRhaWxzLCB0aGlzLmV2ZW50TGFiZWxzLk1PVVNFX01PVkUsICcnKTtcbiAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdsb2JhbEVycm9ySGFuZGxlciB7XG4gICAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIH1cblxuICAgIHRyYWNrQ29uc29sZUVycm9ycygpIHtcblxuICAgICAgICBjb25zdCBhbmFseXRpY3NTZXJ2aWNlID0gdGhpcy5pbmplY3Rvci5nZXQoQW5hbHl0aWNzU2VydmljZSk7XG4gICAgICAgIGNvbnN0IGRhdGFTdG9yYWdlU2VydmljZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KERhdGFTdG9yYWdlU2VydmljZSk7XG4gICAgICAgIGlmICh3aW5kb3cuY29uc29sZSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBjb25zb2xlRXJyb3JGbk9iamVjdCA9IGNvbnNvbGUuZXJyb3I7XG4gICAgICAgICAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yID0gZnVuY3Rpb24gKC4uLmVycm9yOiBhbnlbXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZEVycm9yID0gZXJyb3IubWFwKGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChlKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgICAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID0gYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhXG4gICAgICAgICAgICAgICAgICAgICgnJywge30sIF9zZWxmLmV2ZW50TGFiZWxzLkNPTlNPTEVfRVJST1IsICcnLCB7IGNvbnNvbGVFcnJvcnM6IEpTT04uc3RyaW5naWZ5KHByb2Nlc3NlZEVycm9yKSB9KTtcbiAgICAgICAgICAgICAgICBkYXRhU3RvcmFnZVNlcnZpY2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlRXJyb3JGbk9iamVjdC5jYWxsKGNvbnNvbGUsIGVycm9yKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgRWxlbWVudFJlZiwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBLZXlTdHJva2VFdmVudFR5cGUsIEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZCc7XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdHJhY2sta2V5U3Ryb2tlXScgfSlcbmV4cG9ydCBjbGFzcyBLZXlTdHJva2VEaXJlY3RpdmUge1xuXG4gICAgLyoqIEV2ZW50IExhYmVscyBDb25zdGFudHMgKi9cbiAgICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuXG4gICAgLyoqXG4gICAgICogRGVwZW5kZW5jaWVzXG4gICAgICogQHBhcmFtIGRhdGFTdG9yYWdlXG4gICAgICogQHBhcmFtIGFuYWx5dGljc1NlcnZpY2VcbiAgICAgKiBAcGFyYW0gZWwgLSBFbGVtZW50IFJlZmVyZW5jZVxuICAgICAqIEBwYXJhbSByZW5kZXJlciAtIFJlbmRlcmVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaWYgSWQgZG9lc24ndCBiZWxvbmdzIHRvIHRoZSBlbGVtZW50LCB3aGljaCBpcyBiZWluZyB0cmFja2VkLFxuICAgICAgICAgKiBBZGRpbmcgYSBkeW5hbWljIElkXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoIXRoaXMuZWwubmF0aXZlRWxlbWVudC5pZCkge1xuICAgICAgICAgICAgY29uc3QgZHluYW1pY0lkID0gYGtleV9zdHJva2VfZWxlbWVudF8ke3V1aWQudjQoKX1gO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaWQnLCBkeW5hbWljSWQpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmFja2luZyBLZXkgcHJlc3MgZXZlbnRzIHVzaW5nIGhvc3QgbGlzdGVuZXJcbiAgICAgKiBHZW5lcmF0aW5nIGEgZGF0YSBiZWFuIGluIGEgc3BlY2lmaWVkIGZvcm1hdFxuICAgICAqIEBwYXJhbSAkZXZlbnQgLSBLZXlQcmVzcyBFdmVudFxuICAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2tleXByZXNzJywgWyckZXZlbnQnXSkgb25LZXlTdHJva2UoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgY29uc3Qga2V5U3Ryb2tlOiBLZXlTdHJva2VFdmVudFR5cGUgPSBuZXcgS2V5U3Ryb2tlRXZlbnRUeXBlKCk7XG5cbiAgICAgICAga2V5U3Ryb2tlLmVsZW1lbnRJZCA9ICRldmVudC50YXJnZXQuaWQ7XG4gICAgICAgIGtleVN0cm9rZS5rZXkgPSAkZXZlbnQua2V5O1xuICAgICAgICBrZXlTdHJva2UuY29kZSA9ICRldmVudC5jb2RlO1xuICAgICAgICBrZXlTdHJva2Uua2V5Q29kZSA9ICRldmVudC5rZXlDb2RlLnRvU3RyaW5nKCk7XG4gICAgICAgIGtleVN0cm9rZS5pc0Zvcm0gPSAkZXZlbnQudGFyZ2V0LmZvcm0gIT09IHVuZGVmaW5lZDtcbiAgICAgICAga2V5U3Ryb2tlLmZvcm0gPSAkZXZlbnQudGFyZ2V0LmZvcm0gIT09IHVuZGVmaW5lZCA/IEpTT04uc3RyaW5naWZ5KCRldmVudC50YXJnZXQuZm9ybS5lbGVtZW50cykgOiAnJztcbiAgICAgICAga2V5U3Ryb2tlLnRhZ05hbWUgPSAkZXZlbnQudGFyZ2V0LnRhZ05hbWU7XG4gICAgICAgIGtleVN0cm9rZS5odG1sRWxlbWVudFR5cGUgPSAkZXZlbnQudGFyZ2V0LnR5cGU7XG4gICAgICAgIGtleVN0cm9rZS52YWx1ZSA9ICRldmVudC50YXJnZXQudmFsdWU7XG5cbiAgICAgICAgdGhpcy5zZW5kRGF0YShrZXlTdHJva2UsICRldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZGluZyBkYXRhXG4gICAgICogQHBhcmFtIGtleVN0cm9rZSAtIENhcHR1cmVkIEtleVN0cm9rZSBkYXRhXG4gICAgICogQHBhcmFtIGV2ZW50RGV0YWlscyAtIEtleSBQcmVzcyBldmVudCBkZXRhaWxzXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZW5kRGF0YShrZXlTdHJva2U6IEtleVN0cm9rZUV2ZW50VHlwZSwgZXZlbnREZXRhaWxzOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICAgICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh7fSxcbiAgICAgICAgICAgICAgICBldmVudERldGFpbHMsXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudExhYmVscy5LRVlfU1RST0tFLCAnJyxcbiAgICAgICAgICAgICAgICB7IGtleVN0cm9rZURhdGE6IGtleVN0cm9rZSB9KTtcbiAgICAgICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBFcnJvckhhbmRsZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUzNBbmFseXRpY3NDb21wb25lbnQgfSBmcm9tICcuL25nLXMzLWFuYWx5dGljcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgQnV0dG9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2J1dHRvbi9idXR0b24uZGlyZWN0aXZlJztcbmltcG9ydCB7IFNjcm9sbERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCdXR0b25Ib3ZlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9idXR0b24taG92ZXIvYnV0dG9uLWhvdmVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBFbnZpcm9ubWVudFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgUm91dGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlJztcbmltcG9ydCB7IGludGVydmFsIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9saWIvc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IFBvaW50ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9wb2ludGVyL3BvaW50ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEdsb2JhbEVycm9ySGFuZGxlciB9IGZyb20gJy4vc2VydmljZXMvZXJyb3ItaGFuZGxlci9lcnJvckhhbmRsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcbmltcG9ydCB7IEtleVN0cm9rZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9rZXktc3Ryb2tlL2tleS1zdHJva2UuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5nUzNBbmFseXRpY3NDb21wb25lbnQsXG4gICAgQnV0dG9uRGlyZWN0aXZlLFxuICAgIFNjcm9sbERpcmVjdGl2ZSxcbiAgICBCdXR0b25Ib3ZlckRpcmVjdGl2ZSxcbiAgICBLZXlTdHJva2VEaXJlY3RpdmVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgIEVudmlyb25tZW50U2VydmljZSxcbiAgICBQb2ludGVyU2VydmljZSxcbiAgICBDb29raWVTZXJ2aWNlLFxuICAgIEdsb2JhbEVycm9ySGFuZGxlclxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTmdTM0FuYWx5dGljc0NvbXBvbmVudCxcbiAgICBCdXR0b25EaXJlY3RpdmUsXG4gICAgU2Nyb2xsRGlyZWN0aXZlLFxuICAgIEJ1dHRvbkhvdmVyRGlyZWN0aXZlLFxuICAgIEtleVN0cm9rZURpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NNb2R1bGUge1xuXG4gIHByaXZhdGUgc3RhdGljIGVudmlyb25tZW50U2VydmljZSA9IG5ldyBFbnZpcm9ubWVudFNlcnZpY2UoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlclNlcnZpY2U6IFJvdXRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgcG9pbnRlclNlcnZpY2U6IFBvaW50ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgZXJyb3JoYW5kbGVyOiBHbG9iYWxFcnJvckhhbmRsZXIpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKGUpID0+IHtcbiAgICAgIHRoaXMuZGF0YVN0b3JhZ2UucHVzaERhdGFBcnJheVRvUzMoKTtcbiAgICB9KTtcbiAgICBpbnRlcnZhbCgxMDAwICogMikuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5kYXRhU3RvcmFnZS5wdXNoRGF0YUFycmF5VG9TMygpO1xuICAgIH0pO1xuICAgIHRoaXMucG9pbnRlclNlcnZpY2UudHJhY2tNb3VzZU1vdmVFdmVudCgpO1xuICAgIHRoaXMucm91dGVyU2VydmljZS50cmFja1JvdXRlckV2ZW50cygpO1xuICAgIHRoaXMuZXJyb3JoYW5kbGVyLnRyYWNrQ29uc29sZUVycm9ycygpO1xuICB9XG4gIC8vIENvbmZpZ3VyaW5nIHRoZSBpbml0aWFsIHNldHVwIGZvciBzMyBidWNrZXQgYW5kIHBhZ2UgbG9hZGluZ1xuICBzdGF0aWMgZm9yUm9vdChjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICB0aGlzLmVudmlyb25tZW50U2VydmljZS5zZXRDb25maWd1cmF0aW9uVG9FbnZpcm9ubWVudChjb25maWd1cmF0aW9uLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkKTtcbiAgICAvLyBBc3NpZ25pbmcgdGhlIGNvbmZpZ3VyYXRpb24gdG8gZW52aXJvbm1lbnQgdmFyaWFibGVzXG4gIH1cblxuXG59XG4iXSwibmFtZXMiOlsidXVpZC52NCIsInRzbGliXzEuX192YWx1ZXMiLCJpbnRlcnZhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0lBT0U7S0FBaUI7O2dCQUxsQixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7OytCQUpEO0NBUUM7Ozs7OztBQ1JEO0lBYUU7S0FBaUI7Ozs7SUFFakIseUNBQVE7OztJQUFSO0tBQ0M7O2dCQWRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsdURBSVQ7b0JBQ0QsTUFBTSxFQUFFLEVBQUU7aUJBQ1g7OztJQVFELDZCQUFDO0NBQUE7Ozs7Ozs7QUNsQkQsSUFBVyxXQUFXLEdBQUc7SUFDckIsaUJBQWlCLEVBQUUsOERBQThEO0lBQ2pGLHlCQUF5QixFQUFFLElBQUk7SUFDL0IsZUFBZSxFQUFFLEVBQUU7Q0FDdEI7Ozs7Ozs7O0lDSEcsV0FBWSxXQUFXO0lBQ3ZCLGFBQWMsYUFBYTtJQUMzQixjQUFlLGNBQWM7SUFDN0IsWUFBYSxZQUFZO0lBQ3pCLFFBQVMsUUFB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