(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('uuid'), require('ngx-cookie-service'), require('@angular/common/http'), require('@angular/router'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@codaglobal/ng-s3-analytics', ['exports', '@angular/core', 'uuid', 'ngx-cookie-service', '@angular/common/http', '@angular/router', 'rxjs', '@angular/common'], factory) :
    (factory((global.codaglobal = global.codaglobal || {}, global.codaglobal['ng-s3-analytics'] = {}),global.ng.core,null,null,global.ng.common.http,global.ng.router,global.rxjs,global.ng.common));
}(this, (function (exports,i0,uuid,i1,i2,i1$1,rxjs,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgS3AnalyticsService = /** @class */ (function () {
        function NgS3AnalyticsService() {
        }
        NgS3AnalyticsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        NgS3AnalyticsService.ctorParameters = function () { return []; };
        /** @nocollapse */ NgS3AnalyticsService.ngInjectableDef = i0.defineInjectable({ factory: function NgS3AnalyticsService_Factory() { return new NgS3AnalyticsService(); }, token: NgS3AnalyticsService, providedIn: "root" });
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
            { type: i0.Component, args: [{
                        selector: 'lib-ng-s3-analytics',
                        template: "\n    <p>\n      ng-s3-analytics works!\n    </p>\n  ",
                        styles: []
                    },] },
        ];
        NgS3AnalyticsComponent.ctorParameters = function () { return []; };
        return NgS3AnalyticsComponent;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

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
                    this.sessionId = uuid.v4();
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
                return data.map(( /**
                 * @param {?} object
                 * @return {?}
                 */function (object) {
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
                var headers = new i2.HttpHeaders({ 'Content-Type': 'application/json' });
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
                this.httpService.put(url, data, { headers: headers }).subscribe(( /**
                 * @param {?} res
                 * @return {?}
                 */function (res) { }), ( /**
                 * @param {?} err
                 * @return {?}
                 */function (err) {
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
                var headers = new i2.HttpHeaders({ 'Content-Type': 'text/html' });
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
                var headers = new i2.HttpHeaders({ 'Content-Type': 'application/json' });
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
                if (userData === void 0) {
                    userData = {};
                }
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
                    utmParams.map(( /**
                     * @param {?} param
                     * @return {?}
                     */function (param) {
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
                this.httpService.get(this.constants.DEMOGRAPHIC_API_URL).subscribe(( /**
                 * @param {?} res
                 * @return {?}
                 */function (res) {
                    _this.demographicInfo = res;
                    _this.cookieService.set(_this.constants.DEMOGRAPHIC_INFO, JSON.stringify(res), new Date(new Date().getTime() + (1000 * 60 * 60 * 24)));
                }));
            };
        AnalyticsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        AnalyticsService.ctorParameters = function () {
            return [
                { type: i1.CookieService },
                { type: i2.HttpClient }
            ];
        };
        /** @nocollapse */ AnalyticsService.ngInjectableDef = i0.defineInjectable({ factory: function AnalyticsService_Factory() { return new AnalyticsService(i0.inject(i1.CookieService), i0.inject(i2.HttpClient)); }, token: AnalyticsService, providedIn: "root" });
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
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return))
                                _a.call(_b);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
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
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return))
                            _a.call(_c);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
                }
                this.eventCollector.clear();
                try {
                    for (var _e = __values(this.keys), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var key = _f.value;
                        this.eventCollector.set(key, []);
                    }
                }
                catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return))
                            _b.call(_e);
                    }
                    finally {
                        if (e_3)
                            throw e_3.error;
                    }
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        DataStorageService.ctorParameters = function () {
            return [
                { type: AnalyticsService },
                { type: i2.HttpClient }
            ];
        };
        /** @nocollapse */ DataStorageService.ngInjectableDef = i0.defineInjectable({ factory: function DataStorageService_Factory() { return new DataStorageService(i0.inject(AnalyticsService), i0.inject(i2.HttpClient)); }, token: DataStorageService, providedIn: "root" });
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
                setTimeout(( /**
                 * @return {?}
                 */function () {
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
            { type: i0.Directive, args: [{
                        // tslint:disable-next-line: directive-selector
                        selector: '[track-btn]'
                    },] },
        ];
        ButtonDirective.ctorParameters = function () {
            return [
                { type: DataStorageService },
                { type: AnalyticsService }
            ];
        };
        ButtonDirective.propDecorators = {
            data: [{ type: i0.Input, args: ['track-btn',] }],
            onClick: [{ type: i0.HostListener, args: ['click', ['$event'],] }]
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
                setTimeout(( /**
                 * @return {?}
                 */function () {
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
            { type: i0.Directive, args: [{
                        // tslint:disable-next-line: directive-selector
                        selector: '[track-scroll]'
                    },] },
        ];
        ScrollDirective.ctorParameters = function () {
            return [
                { type: AnalyticsService },
                { type: DataStorageService }
            ];
        };
        ScrollDirective.propDecorators = {
            data: [{ type: i0.Input, args: ['track-scroll',] }],
            onScrollEvent: [{ type: i0.HostListener, args: ['window:scroll', ['$event'],] }]
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
                setTimeout(( /**
                 * @return {?}
                 */function () {
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
            { type: i0.Directive, args: [{
                        // tslint:disable-next-line: directive-selector
                        selector: '[track-buttonHover]'
                    },] },
        ];
        ButtonHoverDirective.ctorParameters = function () {
            return [
                { type: DataStorageService },
                { type: AnalyticsService }
            ];
        };
        ButtonHoverDirective.propDecorators = {
            data: [{ type: i0.Input, args: ['track-buttonHover',] }],
            onMouseOver: [{ type: i0.HostListener, args: ['mouseover', ['$event'],] }]
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */ EnvironmentService.ngInjectableDef = i0.defineInjectable({ factory: function EnvironmentService_Factory() { return new EnvironmentService(); }, token: EnvironmentService, providedIn: "root" });
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
                this.routes.events.subscribe(( /**
                 * @param {?} event
                 * @return {?}
                 */function (event) {
                    /** Triggered when NavigationEnd event occurs */
                    if (event instanceof i1$1.NavigationEnd) {
                        if (_this.navigateOn !== event.url) {
                            _this.analyticsPushData(event);
                            _this.navigateOn = event.url;
                        }
                    }
                    else if (event instanceof i1$1.NavigationError) {
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
                setTimeout(( /**
                 * @return {?}
                 */function () {
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
                var interval = setInterval(( /**
                 * @return {?}
                 */function () {
                    if (document.readyState === 'complete') {
                        clearInterval(interval);
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        RouterService.ctorParameters = function () {
            return [
                { type: i1$1.Router },
                { type: AnalyticsService },
                { type: DataStorageService }
            ];
        };
        /** @nocollapse */ RouterService.ngInjectableDef = i0.defineInjectable({ factory: function RouterService_Factory() { return new RouterService(i0.inject(i1$1.Router), i0.inject(AnalyticsService), i0.inject(DataStorageService)); }, token: RouterService, providedIn: "root" });
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
                rxjs.fromEvent(window, 'mousemove')
                    .subscribe(( /**
             * @param {?} e
             * @return {?}
             */function (e) {
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        PointerService.ctorParameters = function () {
            return [
                { type: DataStorageService },
                { type: AnalyticsService }
            ];
        };
        PointerService.propDecorators = {
            data: [{ type: i0.Input, args: ['track-pointer',] }]
        };
        /** @nocollapse */ PointerService.ngInjectableDef = i0.defineInjectable({ factory: function PointerService_Factory() { return new PointerService(i0.inject(DataStorageService), i0.inject(AnalyticsService)); }, token: PointerService, providedIn: "root" });
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
                if (window.console && console.error) {
                    /** @type {?} */
                    var consoleErrorFnObject_1 = console.error;
                    /** @type {?} */
                    var _self_1 = this;
                    console.error = ( /**
                     * @param {...?} error
                     * @return {?}
                     */function () {
                        var error = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            error[_i] = arguments[_i];
                        }
                        /** @type {?} */
                        var processedError = error.map(( /**
                         * @param {?} e
                         * @return {?}
                         */function (e) {
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
                        analyticsService.publishConsoleErrors(analyticsBean);
                        consoleErrorFnObject_1.call(console, error);
                    });
                }
            };
        GlobalErrorHandler.decorators = [
            { type: i0.Injectable },
        ];
        GlobalErrorHandler.ctorParameters = function () {
            return [
                { type: i0.Injector }
            ];
        };
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
                var dynamicId = "key_stroke_element_" + uuid.v4();
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
            { type: i0.Directive, args: [{ selector: '[track-keyStroke]' },] },
        ];
        KeyStrokeDirective.ctorParameters = function () {
            return [
                { type: DataStorageService },
                { type: AnalyticsService },
                { type: i0.ElementRef },
                { type: i0.Renderer2 }
            ];
        };
        KeyStrokeDirective.propDecorators = {
            onKeyStroke: [{ type: i0.HostListener, args: ['keypress', ['$event'],] }]
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
            window.addEventListener('beforeunload', ( /**
             * @param {?} e
             * @return {?}
             */function (e) {
                _this.dataStorage.pushDataArrayToS3();
            }));
            rxjs.interval(1000 * 2).subscribe(( /**
             * @param {?} x
             * @return {?}
             */function (x) {
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
                if (isPageLoadingToBeDetected === void 0) {
                    isPageLoadingToBeDetected = false;
                }
                this.environmentService.setConfigurationToEnvironment(configuration, isPageLoadingToBeDetected);
                // Assigning the configuration to environment variables
            };
        NgS3AnalyticsModule.environmentService = new EnvironmentService();
        NgS3AnalyticsModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            i2.HttpClientModule
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
                            i1.CookieService,
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
        NgS3AnalyticsModule.ctorParameters = function () {
            return [
                { type: RouterService },
                { type: DataStorageService },
                { type: PointerService },
                { type: GlobalErrorHandler }
            ];
        };
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

    exports.NgS3AnalyticsService = NgS3AnalyticsService;
    exports.NgS3AnalyticsComponent = NgS3AnalyticsComponent;
    exports.NgS3AnalyticsModule = NgS3AnalyticsModule;
    exports.EnvironmentService = EnvironmentService;
    exports.DataStorageService = DataStorageService;
    exports.ɵd = ButtonHoverDirective;
    exports.ɵa = ButtonDirective;
    exports.ɵe = KeyStrokeDirective;
    exports.ɵc = ScrollDirective;
    exports.ɵb = AnalyticsService;
    exports.ɵg = GlobalErrorHandler;
    exports.ɵf = PointerService;
    exports.ɵh = RouterService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kYWdsb2JhbC1uZy1zMy1hbmFseXRpY3MudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL25nLXMzLWFuYWx5dGljcy5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL25nLXMzLWFuYWx5dGljcy5jb21wb25lbnQudHMiLG51bGwsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi90eXBlcy9ldmVudC50eXBlcy50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL2RpcmVjdGl2ZXMvYnV0dG9uL2J1dHRvbi5kaXJlY3RpdmUudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9kaXJlY3RpdmVzL2J1dHRvbi1ob3Zlci9idXR0b24taG92ZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL3BvaW50ZXIvcG9pbnRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2Vycm9yLWhhbmRsZXIvZXJyb3JIYW5kbGVyLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvZGlyZWN0aXZlcy9rZXktc3Ryb2tlL2tleS1zdHJva2UuZGlyZWN0aXZlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL25nLXMzLWFuYWx5dGljcy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ1MzQW5hbHl0aWNzU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1uZy1zMy1hbmFseXRpY3MnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgbmctczMtYW5hbHl0aWNzIHdvcmtzIVxuICAgIDwvcD5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1MzQW5hbHl0aWNzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsImV4cG9ydCBsZXQgZW52aXJvbm1lbnQgPSB7XG4gICAgZGF0YUNvbGxlY3Rpb25BcGk6ICdodHRwczovLzF4Z2Y1YTJicTIuZXhlY3V0ZS1hcGkuYXAtc291dGgtMS5hbWF6b25hd3MuY29tL2Rldi8nLFxuICAgIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ6IHRydWUsXG4gICAgcmVzdHJpY3RJUFJhbmdlOiAnJ1xufTtcblxuXG4iLCJleHBvcnQgZW51bSBFdmVudExhYmVscyB7XG4gICAgUEFHRV9MT0FEID0gJ1BBR0VfTE9BRCcsXG4gICAgTU9VU0VfSE9WRVIgPSAnTU9VU0VfSE9WRVInLFxuICAgIEJVVFRPTl9DTElDSyA9ICdCVVRUT05fQ0xJQ0snLFxuICAgIE1PVVNFX01PVkUgPSAnTU9VU0VfTU9WRScsXG4gICAgU0NST0xMID0gJ1NDUk9MTCcsXG4gICAgQ09OU09MRV9FUlJPUiA9ICdDT05TT0xFX0VSUk9SJyxcbiAgICBLRVlfU1RST0tFID0gJ0tFWV9TVFJPS0UnXG59XG5cbmV4cG9ydCBlbnVtIENvbnN0YW50cyB7XG4gICAgREVNT0dSQVBISUNfSU5GTyA9ICdkZW1vZ3JhcGhpYy1pbmZvJyxcbiAgICBTRVNTSU9OX0lEID0gJ25nUzNBbmFseXRpY3NTZXNzaW9uSWQnLFxuICAgIERFTU9HUkFQSElDX0FQSV9VUkwgPSAnaHR0cHM6Ly9pcGFwaS5jby9qc29uLydcbn1cblxuXG5leHBvcnQgY2xhc3MgS2V5U3Ryb2tlRXZlbnRUeXBlIHtcbiAgICBrZXk6IHN0cmluZzsgLy8gcHJlc3NlZCBLZXlcbiAgICBrZXlDb2RlOiBzdHJpbmc7IC8vIHByZXNzZWQgS2V5IENvZGVcbiAgICBlbGVtZW50SWQ6IHN0cmluZzsgLy8gSWQgb2YgZWxlbWVudFxuICAgIGlzRm9ybTogYm9vbGVhbjsgLy8gaXMgaXQgYSBmb3JtXG4gICAgZm9ybTogc3RyaW5nO1xuICAgIHRhZ05hbWU6IHN0cmluZzsgLy8gdGFnTmFtZSBvZiBlbGVtZW50XG4gICAgaHRtbEVsZW1lbnRUeXBlOiBzdHJpbmc7IC8vIHR5cGUgb2YgZWxlbWVudFxuICAgIHZhbHVlOiBzdHJpbmc7IC8vIHByZXZpb3VzIHZhbHVlIG9mIHRoZSBlbGVtZW50XG4gICAgY29kZTogc3RyaW5nOyAvLyBQcmVzc2VkIGtleSBsYWJlbFxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgKiBhcyB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiwgUGVyZm9ybWFuY2VCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJ25neC1jb29raWUtc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzLCBLZXlTdHJva2VFdmVudFR5cGUsIENvbnN0YW50cyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbi8qKlxuICogQW5hbHl0aWNzIFNlcnZpY2VcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQW5hbHl0aWNzU2VydmljZSB7XG5cbiAgLyoqIFNlc3Npb25JZCBvZiBwbHVnaW4gKi9cbiAgc2Vzc2lvbklkOiBzdHJpbmc7XG4gIC8qKiBEZW1vZ3JhcGhpYyBpbmZvICovXG4gIGRlbW9ncmFwaGljSW5mbzogYW55ID0ge307XG4gIC8qKiBFdmVudCBsYWJlbCBjb25zdGFudHMgKi9cbiAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgLyoqIENvbnN0YW50cyAqL1xuICBjb25zdGFudHMgPSBDb25zdGFudHM7XG5cbiAgLyoqXG4gICAqIEFuYWx5dGljcyBTZXJ2aWNlIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBjb29raWVTZXJ2aWNlXG4gICAqIEBwYXJhbSBodHRwU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlLFxuICAgIHByaXZhdGUgaHR0cFNlcnZpY2U6IEh0dHBDbGllbnQpIHtcbiAgICBpZiAoIXRoaXMuY29va2llU2VydmljZS5jaGVjayh0aGlzLmNvbnN0YW50cy5ERU1PR1JBUEhJQ19JTkZPKSkge1xuICAgICAgdGhpcy5nZXRJcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlbW9ncmFwaGljSW5mbyA9IEpTT04ucGFyc2UodGhpcy5jb29raWVTZXJ2aWNlLmdldCh0aGlzLmNvbnN0YW50cy5ERU1PR1JBUEhJQ19JTkZPKSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U2Vzc2lvbklkKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tpbmcgd2hldGhlciBzZXNzaW9uSWQgcHJlc2VudCBpbiBjb29raWUgb3Igbm90XG4gICAqIGlmIG5vIHNlc3Npb24gaWQgY29va2llIHByZXNlbnQsIGFkZGluZyBuZXcgc2Vzc2lvbiBpZCBvdGhlcndpc2UgcmV1c2luZyB0aGUgc2Vzc2lvbiBpZCB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRTZXNzaW9uSWQoKTogdm9pZCB7XG4gICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0odGhpcy5jb25zdGFudHMuU0VTU0lPTl9JRCkpIHtcbiAgICAgIHRoaXMuc2Vzc2lvbklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmNvbnN0YW50cy5TRVNTSU9OX0lEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXNzaW9uSWQgPSB1dWlkLnY0KCk7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHRoaXMuY29uc3RhbnRzLlNFU1NJT05fSUQsIHRoaXMuc2Vzc2lvbklkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tpbmcgdGhlIElQIHJhbmdlIHRvIGJlIHJlc3RyaWN0XG4gICAqIEBwYXJhbSBkYXRhIC0gZGF0YSB0byBiZSBwdXNoZWRcbiAgICovXG4gIHB1YmxpYyBwdXNoRGF0YShkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jaGVja0lwUmFuZ2UoKSkge1xuICAgICAgdGhpcy5wdWJsaXNoVE9BdXRoUzMoZGF0YSk7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogSVAgcmFuZ2UgcmVzdHJpY3Rpb24gYWRkZWRcbiAgICogQHJlc3RyaWN0SVBSYW5nZSBpcyBhIHJlZ2V4XG4gICAqIGlmIEByZXN0cmljdElQUmFuZ2UgaXMgbWF0Y2ggd2l0aCBjdXJyZW50IElQLFxuICAgKiB0aGUgYW5hbHl0aWNzIGRhdGEgd2lsbCBiZSByZXN0cmljdGVkXG4gICAqL1xuICBwcml2YXRlIGNoZWNrSXBSYW5nZSgpOiBib29sZWFuIHtcbiAgICBjb25zdCBpcFJhbmdlID0gZW52aXJvbm1lbnQucmVzdHJpY3RJUFJhbmdlO1xuICAgIGlmIChpcFJhbmdlICYmIHRoaXMuZGVtb2dyYXBoaWNJbmZvLmlwKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZW1vZ3JhcGhpY0luZm8uaXAubWF0Y2goaXBSYW5nZSkgPyBmYWxzZSA6IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0aW5nIEpTT04gQXJyYXkgdG8gc3RyaW5nXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqL1xuICBwcml2YXRlIHByb2Nlc3NGb3JBdGhlbmEoZGF0YTogQXJyYXk8QW5hbHl0aWNzQmVhbj4pOiBzdHJpbmcge1xuICAgIHJldHVybiBkYXRhLm1hcCgob2JqZWN0OiBhbnkpID0+IHtcbiAgICAgIG9iamVjdFsnc2Vzc2lvbklkJ10gPSB0aGlzLnNlc3Npb25JZDtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmplY3QpO1xuICAgIH0pLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgLyoqXG4gICAgKiBQcmVwYXJpbmcgZGF0YSB0byBiZSBwdXNoZWQgdG8gRGF0YVN0b3JhZ2VcbiAgICAqIEBwYXJhbSBkYXRhICBkYXRhIHRvIGJlIHB1c2hlZFxuICAgICovXG4gIHByaXZhdGUgcHVibGlzaFRPQXV0aFMzKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gYCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19XyR7dGhpcy5zZXNzaW9uSWR9XyR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfS5qc29uYDtcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICB0aGlzLnB1c2hEYXRhVG9TMyhmaWxlbmFtZSwgdGhpcy5wcm9jZXNzRm9yQXRoZW5hKGRhdGEuZXZlbnRWYWx1ZXMpLCBoZWFkZXJzKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgZGF0YSB0byBjb3JyZXNwb25kaW5nIGJ1Y2tldCB1c2luZyBkYXRhIGNvbGxlY3Rpb24gYXBpXG4gICAqIEBwYXJhbSBwYXRoIC0gc2VydmljZSBwYXRoXG4gICAqIEBwYXJhbSBkYXRhIC0gZGF0YSB0byBiZSBwdXNoZWRcbiAgICovXG4gIHByaXZhdGUgcHVzaERhdGFUb1MzKHBhdGg6IHN0cmluZywgZGF0YTogYW55LCBoZWFkZXJzOiBIdHRwSGVhZGVycyk6IHZvaWQge1xuICAgIGNvbnN0IHVybCA9IGAke2Vudmlyb25tZW50LmRhdGFDb2xsZWN0aW9uQXBpfSR7cGF0aH1gO1xuXG4gICAgdGhpcy5odHRwU2VydmljZS5wdXQodXJsLCBkYXRhLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSkuc3Vic2NyaWJlKHJlcyA9PiB7IH0sIGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgdGhlIGNhcHR1cmVkIEhUTUwgdG8gdGhlIGRhdGEgY29sbGVjdGlvblxuICAgKiBAcGFyYW0gaHRtbFRlbXBsYXRlIC0gRE9NIENvbnRlbnRcbiAgICogQHBhcmFtIHNjcmVlbnNob3ROYW1lIC0gZmlsZW5hbWUgdG8gYmUgc2F2ZWRcbiAgICovXG4gIHB1YmxpYyBzYXZlU2NyZWVuc2hvdHNJblMzKGh0bWxUZW1wbGF0ZTogc3RyaW5nLCBzY3JlZW5zaG90TmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBgYXNzZXRzLyR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19LyR7dGhpcy5zZXNzaW9uSWR9LyR7c2NyZWVuc2hvdE5hbWV9Lmh0bWxgO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ3RleHQvaHRtbCcgfSk7XG4gICAgdGhpcy5wdXNoRGF0YVRvUzMoZmlsZW5hbWUsIGh0bWxUZW1wbGF0ZSwgaGVhZGVycyk7XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBjb25zb2xlIGVycm9ycyB0byBTMyBidWNrZXRcbiAgICogQHBhcmFtIGRhdGEgXG4gICAqL1xuICBwdWJsaWMgcHVibGlzaENvbnNvbGVFcnJvcnMoZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICBkYXRhWydzZXNzaW9uSWQnXSA9IHRoaXMuc2Vzc2lvbklkO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gYCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19XyR7dGhpcy5zZXNzaW9uSWR9X2NvbnNvbGVfZXJyb3JzXyR7bmV3IERhdGUoKS5nZXRUaW1lKCl9Lmpzb25gO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgIHRoaXMucHVzaERhdGFUb1MzKGZpbGVuYW1lLCBkYXRhLCBoZWFkZXJzKTtcbiAgfVxuXG5cblxuICAvKipcbiAgICogU2V0dGluZyBhbmFseXRpY3Mgb2JqZWN0IHRvIGJlIHNhdmVkIGluIFMzIGJ1Y2tldFxuICAgKiBAcGFyYW0gdXNlckRhdGEgLSBEYXRhIHRyYW5zZmVycmVkIHRvIEV2ZW50IERpcmVjdGl2ZVxuICAgKiBAcGFyYW0gZXZlbnREZXRhaWxzIC0gUG9zaXRpb24gb2YgZXZlbnRzXG4gICAqIEBwYXJhbSBldmVudE5hbWUgIC0gVHlwZSBvZiBldmVudFxuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgIC0gZmlsZSBuYW1lIG9mIHNhdmVkIHNjcmVlbnNob3QgaWYgdGhlIGV2ZW50IGlzIFBhZ2VMb2FkZWRcbiAgICovXG4gIHB1YmxpYyBzZXRBbmFseXRpY3NEYXRhKFxuICAgIHVzZXJEYXRhOiBhbnkgPSB7fSxcbiAgICBldmVudERldGFpbHM6IGFueSxcbiAgICBldmVudE5hbWU6IHN0cmluZyxcbiAgICBzY3JlZW5zaG90TmFtZTogc3RyaW5nLFxuICAgIG9wdGlvbmFsPzoge1xuICAgICAgZXZlbnRDb21wb25lbnQ/OiBzdHJpbmcsXG4gICAgICBrZXlTdHJva2VEYXRhPzogS2V5U3Ryb2tlRXZlbnRUeXBlLFxuICAgICAgY29uc29sZUVycm9ycz86IHN0cmluZ1xuICAgIH0pOiBBbmFseXRpY3NCZWFuIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID0ge1xuICAgICAgZXZlbnRMYWJlbDogZXZlbnROYW1lLFxuICAgICAgZXZlbnRDb21wb25lbnQ6IG9wdGlvbmFsICYmIG9wdGlvbmFsLmV2ZW50Q29tcG9uZW50ID8gb3B0aW9uYWwuZXZlbnRDb21wb25lbnQgOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJz8nKVswXSxcbiAgICAgIGJyb3dzZXI6IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgZnVsbFVSTDogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICBvcmlnaW46IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgICByZXNvbHV0aW9uOiBgJHt3aW5kb3cuaW5uZXJXaWR0aH14JHt3aW5kb3cuaW5uZXJIZWlnaHR9YCxcbiAgICAgIHhDb29yZDogdGhpcy5nZXRFdmVudERldGFpbHMoZXZlbnREZXRhaWxzWydjbGllbnRYJ10pLFxuICAgICAgeUNvb3JkOiB0aGlzLmdldEV2ZW50RGV0YWlscyhldmVudERldGFpbHNbJ2NsaWVudFknXSksXG4gICAgICBwYWdlWENvb3JkOiB3aW5kb3cucGFnZVhPZmZzZXQudG9TdHJpbmcoKSB8fCAnMCcsXG4gICAgICBwYWdlWUNvb3JkOiB3aW5kb3cucGFnZVlPZmZzZXQudG9TdHJpbmcoKSB8fCAnMCcsXG4gICAgICBldmVudFRpbWU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIHNjcmVlbnNob3Q6IHNjcmVlbnNob3ROYW1lLFxuICAgICAgYWRkaXRpb25hbEluZm86IHVzZXJEYXRhLFxuICAgICAgZXJyb3JzOiAob3B0aW9uYWwgJiYgb3B0aW9uYWwuY29uc29sZUVycm9ycykgPyBvcHRpb25hbC5jb25zb2xlRXJyb3JzIDogJycsXG4gICAgICB1dG06IHRoaXMuZ2V0VVRNUGFyYW1ldGVycyh3aW5kb3cubG9jYXRpb24uaHJlZiksXG4gICAgICBkZW1vZ3JhcGhpY0luZm86IHRoaXMuZGVtb2dyYXBoaWNJbmZvLFxuICAgICAga2V5U3Ryb2tlRGF0YTogKG9wdGlvbmFsICYmIG9wdGlvbmFsLmtleVN0cm9rZURhdGEpID8gb3B0aW9uYWwua2V5U3Ryb2tlRGF0YSA6IHRoaXMuZ2V0RW1wdHlLZXlTdHJva2VEYXRhKCksXG4gICAgICBodG1sRWxlbWVudDogdGhpcy5nZXRIdG1sRWxlbWVudChldmVudERldGFpbHNbJ3RhcmdldCddKSxcbiAgICAgIHBlcmZvcm1hbmNlOiB0aGlzLmdldFBlcmZvcm1hbmNlRGV0YWlscygpLFxuICAgIH07XG4gICAgcmV0dXJuIGFuYWx5dGljc0JlYW47XG4gIH1cblxuICAvKipcbiAgICogRXZlbnQgZGV0YWlsc1xuICAgKiBAcGFyYW0gdmFsdWUgXG4gICAqL1xuICBwcml2YXRlIGdldEV2ZW50RGV0YWlscyh2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlLnRvU3RyaW5nKCkgOiAnMCc7XG4gIH1cblxuICAvKipcbiAgICogR2V0IEhUTUwgQ29udGVudFxuICAgKiBAcGFyYW0gdGFyZ2V0RWxlbWVudCAtIHRhcmdldCBlbGVtZW50XG4gICAqL1xuICBwcml2YXRlIGdldEh0bWxFbGVtZW50KHRhcmdldEVsZW1lbnQ6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRhcmdldEVsZW1lbnQgIT09IHVuZGVmaW5lZCA/IHRhcmdldEVsZW1lbnRbJ2lubmVySFRNTCddIDogJyc7XG4gIH1cblxuXG4gIHByaXZhdGUgZ2V0RW1wdHlLZXlTdHJva2VEYXRhKCk6IEtleVN0cm9rZUV2ZW50VHlwZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGtleTogJycsXG4gICAgICBrZXlDb2RlOiAnJyxcbiAgICAgIGNvZGU6ICcnLFxuICAgICAgZWxlbWVudElkOiAnJyxcbiAgICAgIGZvcm06ICcnLFxuICAgICAgaHRtbEVsZW1lbnRUeXBlOiAnJyxcbiAgICAgIGlzRm9ybTogZmFsc2UsXG4gICAgICB0YWdOYW1lOiAnJyxcbiAgICAgIHZhbHVlOiAnJ1xuICAgIH07XG4gIH1cblxuXG4gIC8qKlxuICAgKiBQZXJmb3JtYW5jZSBkZXRhaWxzXG4gICAqL1xuICBwcml2YXRlIGdldFBlcmZvcm1hbmNlRGV0YWlscygpOiBQZXJmb3JtYW5jZUJlYW4ge1xuICAgIGNvbnN0IHBlcmZvcm1hbmNlID0gd2luZG93LnBlcmZvcm1hbmNlO1xuICAgIHJldHVybiB7XG4gICAgICBuYXZpZ2F0aW9uOiBwZXJmb3JtYW5jZS5uYXZpZ2F0aW9uLFxuICAgICAgdGltZU9yaWdpbjogcGVyZm9ybWFuY2UudGltZU9yaWdpbixcbiAgICAgIHRpbWluZzogcGVyZm9ybWFuY2UudGltaW5nXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZW1vcnkgdXNhZ2Ugb2YgdGhlIGFwcGxpY2F0aW9uIGlzIHByb3ZpZGVkIGJ5IEdvb2dsZSBDaHJvbWVcbiAgICogQHBhcmFtIHVzZXJBZ2VudCAtIFVzZXIgYWdlbnQgdG8gY2hlY2sgdGhlIGJyb3dzZXJcbiAgICovXG4gIHByaXZhdGUgZ2VNZW1vcnlVc2FnZUluZm8odXNlckFnZW50OiBhbnkpIHtcbiAgICBjb25zdCBpc0Nocm9tZSA9IHVzZXJBZ2VudC5zcGxpdCgnY2hyb21lJykubGVuZ3RoID4gMTtcbiAgICBjb25zdCBtZW1vcnkgPSBpc0Nocm9tZSA/IHdpbmRvdy5wZXJmb3JtYW5jZVsnbWVtb3J5J10gOiAnJztcbiAgICByZXR1cm4gbWVtb3J5O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHRpbmcgVVRNIFBhcmFtZXRlcnMgYnkgcHJvY2Vzc2luZyBjdXJyZW50IHBhZ2VVUkxcbiAgICogQHBhcmFtIHVybCAtIFBhZ2UgVVJMXG4gICAqL1xuICBwcml2YXRlIGdldFVUTVBhcmFtZXRlcnModXJsOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IHV0bU9iamVjdCA9IHt9O1xuICAgIGlmICh1cmwuaW5jbHVkZXMoJ3V0bScpKSB7XG4gICAgICBjb25zdCB1dG1QYXJhbXMgPSB1cmwuc3BsaXQoJz8nKVsxXS5zcGxpdCgnJicpO1xuICAgICAgdXRtUGFyYW1zLm1hcChwYXJhbSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHBhcmFtLnNwbGl0KCc9Jyk7XG4gICAgICAgIHV0bU9iamVjdFtwYXJhbXNbMF1dID0gcGFyYW1zWzFdO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB1dG1PYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHVzZXIgZGVtb2dyYXBoaWMgaW5mb3JtYXRpb24gaW4gY29va2llc1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRJcCgpOiB2b2lkIHtcbiAgICB0aGlzLmh0dHBTZXJ2aWNlLmdldCh0aGlzLmNvbnN0YW50cy5ERU1PR1JBUEhJQ19BUElfVVJMKS5zdWJzY3JpYmUoXG4gICAgICAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5kZW1vZ3JhcGhpY0luZm8gPSByZXM7XG4gICAgICAgIHRoaXMuY29va2llU2VydmljZS5zZXQoXG4gICAgICAgICAgdGhpcy5jb25zdGFudHMuREVNT0dSQVBISUNfSU5GTywgSlNPTi5zdHJpbmdpZnkocmVzKSxcbiAgICAgICAgICBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArICgxMDAwICogNjAgKiA2MCAqIDI0KSkpO1xuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERhdGFTdG9yYWdlU2VydmljZSB7XG5cbiAgYWxsRGF0YUFuYWx5dGljc0FycmF5OiBBcnJheTxhbnk+ID0gW107XG4gIGFsbERhdGFBbmFseXRpY3M6IHtcbiAgICBwYWdlVXJsOiBzdHJpbmcsXG4gICAgZXZlbnRWYWx1ZXM6IEFycmF5PGFueT5cbiAgfTtcbiAgcHJldmlvdXNVcmw6IHN0cmluZztcbiAga2V5czogQXJyYXk8YW55PiA9IFtdO1xuICBldmVudENvbGxlY3RvciA9IG5ldyBNYXAoKTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhbmFseXRpY2FsU2VydmljZTogQW5hbHl0aWNzU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cbiAgcHJpdmF0ZSByb3V0ZURldGFpbHM6IGFueSA9IFtdO1xuICBjb3VudCA9IDA7XG4gIHNldFVybEtleShkYXRhOiBzdHJpbmcpIHtcbiAgICBsZXQgZmxhZyA9IDA7XG4gICAgaWYgKHRoaXMucHJldmlvdXNVcmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5ldmVudENvbGxlY3Rvci5zZXQoZGF0YSwgW10pO1xuICAgICAgdGhpcy5wcmV2aW91c1VybCA9IGRhdGEgfHwgJy8nO1xuICAgIH0gZWxzZSBpZiAoIShkYXRhID09PSB0aGlzLnByZXZpb3VzVXJsKSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmtleXMoKSkpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gZGF0YSkge1xuICAgICAgICAgIGZsYWcgPSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZmxhZyA9PT0gMCkge1xuICAgICAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLnNldChkYXRhLCBbXSk7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXZpb3VzVXJsID0gZGF0YTtcbiAgICB9XG4gIH1cbiAgYXBwZW5kVG9BbmFseXRpY3NBcnJheShkYXRhOiBBbmFseXRpY3NCZWFuKSB7XG4gICAgaWYgKHRoaXMucHJldmlvdXNVcmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zZXRVcmxLZXkoZGF0YS5ldmVudENvbXBvbmVudCk7XG4gICAgfVxuICAgIHRoaXMuZXZlbnRDb2xsZWN0b3IuZ2V0KHRoaXMucHJldmlvdXNVcmwpLnB1c2goZGF0YSk7XG4gIH1cblxuICBwdXNoRGF0YUFycmF5VG9TMygpIHtcbiAgICB0aGlzLmNvdW50Kys7XG4gICAgLy8gdGhpcy5hbGxEYXRhQW5hbHl0aWNzTWFwID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShBcnJheS5mcm9tKHRoaXMuZXZlbnRDb2xsZWN0b3Iua2V5cygpKSkpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIEFycmF5LmZyb20odGhpcy5ldmVudENvbGxlY3Rvci5rZXlzKCkpKSB7XG4gICAgICB0aGlzLmFsbERhdGFBbmFseXRpY3MgPSB7XG4gICAgICAgIHBhZ2VVcmw6IGtleSxcbiAgICAgICAgZXZlbnRWYWx1ZXM6IEFycmF5LmZyb20odGhpcy5ldmVudENvbGxlY3Rvci5nZXQoa2V5KS52YWx1ZXMoKSlcbiAgICAgIH07XG4gICAgICB0aGlzLmtleXMucHVzaChrZXkpO1xuICAgICAgaWYgKHRoaXMuYWxsRGF0YUFuYWx5dGljcy5ldmVudFZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuYW5hbHl0aWNhbFNlcnZpY2UucHVzaERhdGEodGhpcy5hbGxEYXRhQW5hbHl0aWNzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5ldmVudENvbGxlY3Rvci5jbGVhcigpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMua2V5cykge1xuICAgICAgdGhpcy5ldmVudENvbGxlY3Rvci5zZXQoa2V5LCBbXSk7XG4gICAgfVxuICB9XG5cbiAgc2V0Um91dGVEZXRhaWxzKHJvdXRlRGV0YWlsczogYW55KSB7XG4gICAgdGhpcy5yb3V0ZURldGFpbHMgPSByb3V0ZURldGFpbHM7XG4gIH1cblxuICBnZXRSb3V0ZURldGFpbHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVEZXRhaWxzO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuXG4vKipcbiAqIEJ1dHRvbiBEaXJlY3RpdmUgdG8gdHJhY2sgY2xpY2sgZXZlbnRcbiAqIFNlbGVjdG9yIGNhbiBiZSBhZGRlZCB0byBhbnkgSFRNTCBFbGVtZW50XG4gKi9cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1t0cmFjay1idG5dJ1xufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25EaXJlY3RpdmUge1xuXG4gIC8vIEdldHMgaW1wb3J0YW50IGRhdGEgYWJvdXQgdGhlIGJ1dHRvbiBleHBsaWNpdGx5IGZyb20gdGhlIGFwcGxpY2F0aW9uXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgndHJhY2stYnRuJykgZGF0YTogYW55ID0ge307XG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIGV2ZW50RGV0YWlsczogYW55O1xuXG4gIC8qKlxuICAgKiBCdXR0b24gVHJhY2tpbmcgLSBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gZGF0YVN0b3JhZ2UgLSBEYXRhU3RvcmFnZVNlcnZpY2VcbiAgICogQHBhcmFtIGFuYWx5dGljc1NlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlKSB7IH1cblxuXG4gIC8qKlxuICAgKiAgTGlzdGVuIHRvIGJ1dHRvbiBjbGljayBhY3Rpb25zXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIG9uQ2xpY2soJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmV2ZW50RGV0YWlscyA9ICRldmVudDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2VuZERhdGEoKTtcbiAgICB9LCAxMCk7XG4gIH1cblxuICAvKiogU2VuZGluZyBkYXRhIG9uIGJ1dHRvbiBjbGljayAqL1xuICBwdWJsaWMgc2VuZERhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIHRoaXMuZXZlbnREZXRhaWxzLCB0aGlzLmV2ZW50TGFiZWxzLkJVVFRPTl9DTElDSywgJycpO1xuICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkNoYW5nZXMsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcblxuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1t0cmFjay1zY3JvbGxdJ1xufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgLy8gR2V0cyBpbXBvcnRhbnQgZGF0YSBhYm91dCB0aGUgY29tcG9uZW50IGV4cGxpY2l0bHkgZnJvbSB0aGUgYXBwbGljYXRpb25cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICAgIEBJbnB1dCgndHJhY2stc2Nyb2xsJykgZGF0YTogYW55ID0ge307XG4gICAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZVxuICAgICkgeyB9XG5cbiAgICAvLyBDYXB0dXJlIHRoZSBjaGFuZ2UgaW4gZGF0YVxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlO1xuICAgIH1cblxuICAgIC8vIFRyaWdnZXJlZCB3aGVuIGFueSBzY3JvbGwgZXZlbnQgb2NjdXJzXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnNjcm9sbCcsIFsnJGV2ZW50J10pIG9uU2Nyb2xsRXZlbnQoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbmREYXRhKCRldmVudCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc2VuZERhdGEoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgICAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgZXZlbnQsIHRoaXMuZXZlbnRMYWJlbHMuU0NST0xMLCAnJyk7XG4gICAgICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbdHJhY2stYnV0dG9uSG92ZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25Ib3ZlckRpcmVjdGl2ZSB7XG4gIC8qKiAqL1xuICBldmVudERldGFpbHM6IGFueTtcbiAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgLy8gR2V0cyBpbXBvcnRhbnQgZGF0YSBhYm91dCB0aGUgYnV0dG9uIGV4cGxpY2l0bHkgZnJvbSB0aGUgYXBwbGljYXRpb25cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCd0cmFjay1idXR0b25Ib3ZlcicpIGRhdGE6IGFueSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlKSB7IH1cblxuICAvLyBMaXN0ZW4gdG8gYnV0dG9uIGhvdmVyIGFjdGlvbnNcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VvdmVyJywgWyckZXZlbnQnXSkgb25Nb3VzZU92ZXIoJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmV2ZW50RGV0YWlscyA9ICRldmVudDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2VuZERhdGEoKTtcbiAgICB9LCAxMCk7XG4gIH1cblxuICAvLyBTZW5kaW5nIGRhdGEgb24gYnV0dG9uIGhvdmVyXG4gIHB1YmxpYyBzZW5kRGF0YSgpOiB2b2lkIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgdGhpcy5ldmVudERldGFpbHMsIHRoaXMuZXZlbnRMYWJlbHMuTU9VU0VfSE9WRVIsICcnKTtcbiAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gIH1cbn1cbiIsIlxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcblxuZXhwb3J0IGNsYXNzIEVudmlyb25tZW50U2VydmljZSB7XG5cblxuICAvLyBTZXR0aW5nIENvbmZpZ3VyYXRpb24gb24gZW52aXJvbm1lbnRcbiAgc2V0Q29uZmlndXJhdGlvblRvRW52aXJvbm1lbnQoY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiwgaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDogYm9vbGVhbikge1xuICAgIGVudmlyb25tZW50LmRhdGFDb2xsZWN0aW9uQXBpID0gY29uZmlndXJhdGlvbi5kYXRhQ29sbGVjdGlvbkFwaTtcbiAgICBlbnZpcm9ubWVudC5pc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkID0gaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDtcbiAgICBlbnZpcm9ubWVudC5yZXN0cmljdElQUmFuZ2UgPSBjb25maWd1cmF0aW9uLnJlc3RyaWN0SVBSYW5nZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kLCBOYXZpZ2F0aW9uRXJyb3IgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuZGVjbGFyZSBsZXQgbmdTM0FuYWx5dGljc0pTOiBhbnk7XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSb3V0ZXJTZXJ2aWNlIHtcbiAgYW5hbHl0aWNzRGF0YTogQW5hbHl0aWNzQmVhbjtcbiAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgbmF2aWdhdGVPbiA9ICcnO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlczogUm91dGVyLCBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSkge1xuXG4gIH1cblxuICAvKipcbiAgICogVHJhY2tpbmcgcm91dGVyIGV2ZW50c1xuICAgKi9cbiAgcHVibGljIHRyYWNrUm91dGVyRXZlbnRzKCk6IHZvaWQge1xuICAgIC8qKiBUcmlnZ2VyZWQgd2hlbiBjdXJyZW50IHBhZ2UgaXMgbG9hZGVkICovXG4gICAgdGhpcy5yb3V0ZXMuZXZlbnRzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIC8qKiBUcmlnZ2VyZWQgd2hlbiBOYXZpZ2F0aW9uRW5kIGV2ZW50IG9jY3VycyAqL1xuICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xuICAgICAgICBpZiAodGhpcy5uYXZpZ2F0ZU9uICE9PSBldmVudC51cmwpIHtcbiAgICAgICAgICB0aGlzLmFuYWx5dGljc1B1c2hEYXRhKGV2ZW50KTtcbiAgICAgICAgICB0aGlzLm5hdmlnYXRlT24gPSBldmVudC51cmw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRXJyb3IpIHtcbiAgICAgICAgLyoqIFRyaWdnZXJlZCB3aGVuIE5hdmlnYXRpb25FcnJvciBldmVudCBvY2N1cnMgKi9cbiAgICAgICAgdGhpcy5hbmFseXRpY3NQdXNoRGF0YShldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBhbmFseXRpY3MgZGF0YVxuICAgKiBAcGFyYW0gZXZlbnQgLSBSb3V0ZXIgRXZlbnRcbiAgICovXG4gIHB1YmxpYyBhbmFseXRpY3NQdXNoRGF0YShldmVudDogYW55KTogdm9pZCB7XG4gICAgY29uc3Qgc2NyZWVuc2hvdE5hbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygpO1xuICAgIHRoaXMuYW5hbHl0aWNzRGF0YSA9IHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHt9LCB7fSwgdGhpcy5ldmVudExhYmVscy5QQUdFX0xPQUQsIGAke3NjcmVlbnNob3ROYW1lfS5odG1sYCxcbiAgICAgIHsgZXZlbnRDb21wb25lbnQ6IGV2ZW50LnVybCB9KTtcbiAgICB0aGlzLndhaXRUaWxsUGFnZUxvYWQoc2NyZWVuc2hvdE5hbWUpO1xuICAgIC8vIERhdGEgaXMgc2VuZCBvbmx5IHdoZW4gdXNlciBjb25maWd1cmUgdGhlIHBhZ2UgbG9hZGluZyB0byBiZSB0cnVlXG4gICAgdGhpcy5kYXRhU3RvcmFnZS5zZXRVcmxLZXkodGhpcy5hbmFseXRpY3NEYXRhLmV2ZW50Q29tcG9uZW50KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheSh0aGlzLmFuYWx5dGljc0RhdGEpO1xuICAgIH0sIDApO1xuICB9XG5cblxuICAvKipcbiAgICogV2FpdGluZyBmb3IgcGFnZSB0byBsb2FkIGNvbXBsZXRlbHlcbiAgICogQHBhcmFtIGV2ZW50IFxuICAgKi9cbiAgd2FpdFRpbGxQYWdlTG9hZChzY3JlZW5zaG90TmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIF9zZWxmLmNhcHR1cmVUZW1wbGF0ZShzY3JlZW5zaG90TmFtZSk7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FwdHVyZSB0ZW1wbGF0ZSBvZiBsb2FkZWQgdmlld1xuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgLSBTY3JlZW5zaG90IGltYWdlXG4gICAqL1xuICBjYXB0dXJlVGVtcGxhdGUoc2NyZWVuc2hvdE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZ1bGxQYWdlSFRNTCA9IG5nUzNBbmFseXRpY3NKUy5jb25zdHJ1Y3RIVE1MUGFnZShcbiAgICAgIHRoaXMucHJvY2Vzc1JlZ2V4T3BlcmF0aW9ucyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuaW5uZXJIVE1MKSxcbiAgICAgIHRoaXMucHJvY2Vzc1JlZ2V4T3BlcmF0aW9ucyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuaW5uZXJIVE1MKVxuICAgICk7XG4gICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNhdmVTY3JlZW5zaG90c0luUzMoZnVsbFBhZ2VIVE1MLCBzY3JlZW5zaG90TmFtZSk7XG4gIH1cblxuXG4gIHByb2Nlc3NSZWdleE9wZXJhdGlvbnModGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbmdTM0FuYWx5dGljc0pTLmRvUmVnZXgodGV4dCwgd2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIElucHV0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUG9pbnRlclNlcnZpY2Uge1xuXG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIGV2ZW50RGV0YWlsczogYW55O1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ3RyYWNrLXBvaW50ZXInKSBkYXRhOiBhbnkgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSkgeyB9XG5cbiAgLyoqXG4gICAqIFRyYWNrIE1vdXNlIE1vdmVtZW50XG4gICAqL1xuICB0cmFja01vdXNlTW92ZUV2ZW50KCkge1xuICAgIGZyb21FdmVudCh3aW5kb3csICdtb3VzZW1vdmUnKVxuICAgICAgLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLmV2ZW50RGV0YWlscyA9IGU7XG4gICAgICAgIHRoaXMuc2VuZERhdGEoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgTW91c2UgTW92ZSBkZXRhaWxzXG4gICAqL1xuICBwdWJsaWMgc2VuZERhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIHRoaXMuZXZlbnREZXRhaWxzLCB0aGlzLmV2ZW50TGFiZWxzLk1PVVNFX01PVkUsICcnKTtcbiAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR2xvYmFsRXJyb3JIYW5kbGVyIHtcbiAgICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgfVxuXG4gICAgdHJhY2tDb25zb2xlRXJyb3JzKCkge1xuXG4gICAgICAgIGNvbnN0IGFuYWx5dGljc1NlcnZpY2UgPSB0aGlzLmluamVjdG9yLmdldChBbmFseXRpY3NTZXJ2aWNlKTtcbiAgICAgICAgaWYgKHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnNvbGVFcnJvckZuT2JqZWN0ID0gY29uc29sZS5lcnJvcjtcbiAgICAgICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IgPSBmdW5jdGlvbiAoLi4uZXJyb3I6IGFueVtdKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkRXJyb3IgPSBlcnJvci5tYXAoZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGUpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxuICAgICAgICAgICAgICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPSBhbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGFcbiAgICAgICAgICAgICAgICAgICAgKCcnLCB7fSwgX3NlbGYuZXZlbnRMYWJlbHMuQ09OU09MRV9FUlJPUiwgJycsIHsgY29uc29sZUVycm9yczogSlNPTi5zdHJpbmdpZnkocHJvY2Vzc2VkRXJyb3IpIH0pO1xuICAgICAgICAgICAgICAgIGFuYWx5dGljc1NlcnZpY2UucHVibGlzaENvbnNvbGVFcnJvcnMoYW5hbHl0aWNzQmVhbik7XG4gICAgICAgICAgICAgICAgY29uc29sZUVycm9yRm5PYmplY3QuY2FsbChjb25zb2xlLCBlcnJvcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgS2V5U3Ryb2tlRXZlbnRUeXBlLCBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgKiBhcyB1dWlkIGZyb20gJ3V1aWQnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3RyYWNrLWtleVN0cm9rZV0nIH0pXG5leHBvcnQgY2xhc3MgS2V5U3Ryb2tlRGlyZWN0aXZlIHtcblxuICAgIC8qKiBFdmVudCBMYWJlbHMgQ29uc3RhbnRzICovXG4gICAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcblxuICAgIC8qKlxuICAgICAqIERlcGVuZGVuY2llc1xuICAgICAqIEBwYXJhbSBkYXRhU3RvcmFnZVxuICAgICAqIEBwYXJhbSBhbmFseXRpY3NTZXJ2aWNlXG4gICAgICogQHBhcmFtIGVsIC0gRWxlbWVudCBSZWZlcmVuY2VcbiAgICAgKiBAcGFyYW0gcmVuZGVyZXIgLSBSZW5kZXJlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGlmIElkIGRvZXNuJ3QgYmVsb25ncyB0byB0aGUgZWxlbWVudCwgd2hpY2ggaXMgYmVpbmcgdHJhY2tlZCxcbiAgICAgICAgICogQWRkaW5nIGEgZHluYW1pYyBJZFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCF0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGR5bmFtaWNJZCA9IGBrZXlfc3Ryb2tlX2VsZW1lbnRfJHt1dWlkLnY0KCl9YDtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2lkJywgZHluYW1pY0lkKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhY2tpbmcgS2V5IHByZXNzIGV2ZW50cyB1c2luZyBob3N0IGxpc3RlbmVyXG4gICAgICogR2VuZXJhdGluZyBhIGRhdGEgYmVhbiBpbiBhIHNwZWNpZmllZCBmb3JtYXRcbiAgICAgKiBAcGFyYW0gJGV2ZW50IC0gS2V5UHJlc3MgRXZlbnRcbiAgICAgKi9cbiAgICBASG9zdExpc3RlbmVyKCdrZXlwcmVzcycsIFsnJGV2ZW50J10pIG9uS2V5U3Ryb2tlKCRldmVudDogYW55KSB7XG4gICAgICAgIGNvbnN0IGtleVN0cm9rZTogS2V5U3Ryb2tlRXZlbnRUeXBlID0gbmV3IEtleVN0cm9rZUV2ZW50VHlwZSgpO1xuXG4gICAgICAgIGtleVN0cm9rZS5lbGVtZW50SWQgPSAkZXZlbnQudGFyZ2V0LmlkO1xuICAgICAgICBrZXlTdHJva2Uua2V5ID0gJGV2ZW50LmtleTtcbiAgICAgICAga2V5U3Ryb2tlLmNvZGUgPSAkZXZlbnQuY29kZTtcbiAgICAgICAga2V5U3Ryb2tlLmtleUNvZGUgPSAkZXZlbnQua2V5Q29kZS50b1N0cmluZygpO1xuICAgICAgICBrZXlTdHJva2UuaXNGb3JtID0gJGV2ZW50LnRhcmdldC5mb3JtICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIGtleVN0cm9rZS5mb3JtID0gJGV2ZW50LnRhcmdldC5mb3JtICE9PSB1bmRlZmluZWQgPyBKU09OLnN0cmluZ2lmeSgkZXZlbnQudGFyZ2V0LmZvcm0uZWxlbWVudHMpIDogJyc7XG4gICAgICAgIGtleVN0cm9rZS50YWdOYW1lID0gJGV2ZW50LnRhcmdldC50YWdOYW1lO1xuICAgICAgICBrZXlTdHJva2UuaHRtbEVsZW1lbnRUeXBlID0gJGV2ZW50LnRhcmdldC50eXBlO1xuICAgICAgICBrZXlTdHJva2UudmFsdWUgPSAkZXZlbnQudGFyZ2V0LnZhbHVlO1xuXG4gICAgICAgIHRoaXMuc2VuZERhdGEoa2V5U3Ryb2tlLCAkZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRpbmcgZGF0YVxuICAgICAqIEBwYXJhbSBrZXlTdHJva2UgLSBDYXB0dXJlZCBLZXlTdHJva2UgZGF0YVxuICAgICAqIEBwYXJhbSBldmVudERldGFpbHMgLSBLZXkgUHJlc3MgZXZlbnQgZGV0YWlsc1xuICAgICAqL1xuICAgIHByaXZhdGUgc2VuZERhdGEoa2V5U3Ryb2tlOiBLZXlTdHJva2VFdmVudFR5cGUsIGV2ZW50RGV0YWlsczogYW55KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEoe30sXG4gICAgICAgICAgICAgICAgZXZlbnREZXRhaWxzLFxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRMYWJlbHMuS0VZX1NUUk9LRSwgJycsXG4gICAgICAgICAgICAgICAgeyBrZXlTdHJva2VEYXRhOiBrZXlTdHJva2UgfSk7XG4gICAgICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgRXJyb3JIYW5kbGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1MzQW5hbHl0aWNzQ29tcG9uZW50IH0gZnJvbSAnLi9uZy1zMy1hbmFseXRpY3MuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24gfSBmcm9tICcuL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEJ1dHRvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9idXR0b24vYnV0dG9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTY3JvbGxEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2Nyb2xsL3Njcm9sbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQnV0dG9uSG92ZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYnV0dG9uLWhvdmVyL2J1dHRvbi1ob3Zlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRW52aXJvbm1lbnRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IFJvdXRlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3JvdXRlci9yb3V0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBpbnRlcnZhbCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vbGliL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBQb2ludGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcG9pbnRlci9wb2ludGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBHbG9iYWxFcnJvckhhbmRsZXIgfSBmcm9tICcuL3NlcnZpY2VzL2Vycm9yLWhhbmRsZXIvZXJyb3JIYW5kbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJ25neC1jb29raWUtc2VydmljZSc7XG5pbXBvcnQgeyBLZXlTdHJva2VEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMva2V5LXN0cm9rZS9rZXktc3Ryb2tlLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOZ1MzQW5hbHl0aWNzQ29tcG9uZW50LFxuICAgIEJ1dHRvbkRpcmVjdGl2ZSxcbiAgICBTY3JvbGxEaXJlY3RpdmUsXG4gICAgQnV0dG9uSG92ZXJEaXJlY3RpdmUsXG4gICAgS2V5U3Ryb2tlRGlyZWN0aXZlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERhdGFTdG9yYWdlU2VydmljZSxcbiAgICBFbnZpcm9ubWVudFNlcnZpY2UsXG4gICAgUG9pbnRlclNlcnZpY2UsXG4gICAgQ29va2llU2VydmljZSxcbiAgICBHbG9iYWxFcnJvckhhbmRsZXJcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5nUzNBbmFseXRpY3NDb21wb25lbnQsXG4gICAgQnV0dG9uRGlyZWN0aXZlLFxuICAgIFNjcm9sbERpcmVjdGl2ZSxcbiAgICBCdXR0b25Ib3ZlckRpcmVjdGl2ZSxcbiAgICBLZXlTdHJva2VEaXJlY3RpdmVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1MzQW5hbHl0aWNzTW9kdWxlIHtcblxuICBwcml2YXRlIHN0YXRpYyBlbnZpcm9ubWVudFNlcnZpY2UgPSBuZXcgRW52aXJvbm1lbnRTZXJ2aWNlKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJTZXJ2aWNlOiBSb3V0ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSxcbiAgICBwcml2YXRlIHBvaW50ZXJTZXJ2aWNlOiBQb2ludGVyU2VydmljZSxcbiAgICBwcml2YXRlIGVycm9yaGFuZGxlcjogR2xvYmFsRXJyb3JIYW5kbGVyKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIChlKSA9PiB7XG4gICAgICB0aGlzLmRhdGFTdG9yYWdlLnB1c2hEYXRhQXJyYXlUb1MzKCk7XG4gICAgfSk7XG4gICAgaW50ZXJ2YWwoMTAwMCAqIDIpLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMuZGF0YVN0b3JhZ2UucHVzaERhdGFBcnJheVRvUzMoKTtcbiAgICB9KTtcbiAgICB0aGlzLnBvaW50ZXJTZXJ2aWNlLnRyYWNrTW91c2VNb3ZlRXZlbnQoKTtcbiAgICB0aGlzLnJvdXRlclNlcnZpY2UudHJhY2tSb3V0ZXJFdmVudHMoKTtcbiAgICB0aGlzLmVycm9yaGFuZGxlci50cmFja0NvbnNvbGVFcnJvcnMoKTtcbiAgfVxuICAvLyBDb25maWd1cmluZyB0aGUgaW5pdGlhbCBzZXR1cCBmb3IgczMgYnVja2V0IGFuZCBwYWdlIGxvYWRpbmdcbiAgc3RhdGljIGZvclJvb3QoY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiwgaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgdGhpcy5lbnZpcm9ubWVudFNlcnZpY2Uuc2V0Q29uZmlndXJhdGlvblRvRW52aXJvbm1lbnQoY29uZmlndXJhdGlvbiwgaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZCk7XG4gICAgLy8gQXNzaWduaW5nIHRoZSBjb25maWd1cmF0aW9uIHRvIGVudmlyb25tZW50IHZhcmlhYmxlc1xuICB9XG5cblxufVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJDb21wb25lbnQiLCJ1dWlkLnY0IiwiSHR0cEhlYWRlcnMiLCJDb29raWVTZXJ2aWNlIiwiSHR0cENsaWVudCIsInRzbGliXzEuX192YWx1ZXMiLCJEaXJlY3RpdmUiLCJJbnB1dCIsIkhvc3RMaXN0ZW5lciIsIk5hdmlnYXRpb25FbmQiLCJOYXZpZ2F0aW9uRXJyb3IiLCJSb3V0ZXIiLCJmcm9tRXZlbnQiLCJJbmplY3RvciIsIkVsZW1lbnRSZWYiLCJSZW5kZXJlcjIiLCJpbnRlcnZhbCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiSHR0cENsaWVudE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBT0U7U0FBaUI7O29CQUxsQkEsYUFBVSxTQUFDO3dCQUNWLFVBQVUsRUFBRSxNQUFNO3FCQUNuQjs7OzttQ0FKRDtLQVFDOzs7Ozs7QUNSRDtRQWFFO1NBQWlCOzs7O1FBRWpCLHlDQUFROzs7WUFBUjthQUNDOztvQkFkRkMsWUFBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxxQkFBcUI7d0JBQy9CLFFBQVEsRUFBRSx1REFJVDt3QkFDRCxNQUFNLEVBQUUsRUFBRTtxQkFDWDs7O1FBUUQsNkJBQUM7S0FBQTs7SUNsQkQ7Ozs7Ozs7Ozs7Ozs7O0FBY0Esc0JBK0Z5QixDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElB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