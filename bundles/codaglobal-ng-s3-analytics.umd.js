(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('uuid'), require('ngx-cookie-service'), require('@angular/common/http'), require('@angular/router'), require('@angular/platform-browser'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@codaglobal/ng-s3-analytics', ['exports', '@angular/core', 'uuid', 'ngx-cookie-service', '@angular/common/http', '@angular/router', '@angular/platform-browser', 'rxjs', '@angular/common'], factory) :
    (factory((global.codaglobal = global.codaglobal || {}, global.codaglobal['ng-s3-analytics'] = {}),global.ng.core,null,null,global.ng.common.http,global.ng.router,global.ng.platformBrowser,global.rxjs,global.ng.common));
}(this, (function (exports,i0,uuid,i1,i2,i1$1,i4,rxjs,common) { 'use strict';

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
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
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
                    additionalInfo: JSON.stringify(userData),
                    utm: this.getUTMParameters(window.location.href),
                    demographicInfo: this.demographicInfo,
                    keyStrokeData: optional && optional.keyStrokeData,
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
        function RouterService(routes, analyticsService, dataStorage, document) {
            this.routes = routes;
            this.analyticsService = analyticsService;
            this.dataStorage = dataStorage;
            this.document = document;
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
                    if (this.document.readyState === 'complete') {
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
                var fullPageHTML = ngS3AnalyticsJS.constructHTMLPage(this.processRegexOperations(this.document.head.innerHTML), this.processRegexOperations(this.document.body.innerHTML));
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
                { type: DataStorageService },
                { type: undefined, decorators: [{ type: i0.Inject, args: [i4.DOCUMENT,] }] }
            ];
        };
        /** @nocollapse */ RouterService.ngInjectableDef = i0.defineInjectable({ factory: function RouterService_Factory() { return new RouterService(i0.inject(i1$1.Router), i0.inject(AnalyticsService), i0.inject(DataStorageService), i0.inject(i4.DOCUMENT)); }, token: RouterService, providedIn: "root" });
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
            /** @type {?} */
            var analyticsService = this.injector.get(AnalyticsService);
            if (window.console && console.error) {
                /** @type {?} */
                var consoleErrorFnObject_1 = console.error;
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
                    var analyticsBean = analyticsService.setAnalyticsData(processedError, {}, this.eventLabels.CONSOLE_ERROR, '');
                    analyticsService.publishConsoleErrors(analyticsBean);
                    consoleErrorFnObject_1.call(console, error);
                });
            }
        }
        /** Implementing the method */
        /**
         * Implementing the method
         * @param {?} error
         * @return {?}
         */
        GlobalErrorHandler.prototype.handleError = /**
         * Implementing the method
         * @param {?} error
         * @return {?}
         */
            function (error) { };
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
        function NgS3AnalyticsModule(routerService, dataStorage, pointerService) {
            var _this = this;
            this.routerService = routerService;
            this.dataStorage = dataStorage;
            this.pointerService = pointerService;
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
                return {
                    ngModule: NgS3AnalyticsModule,
                    providers: [{ provide: i0.ErrorHandler, useClass: GlobalErrorHandler }]
                };
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
                            i1.CookieService
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
                { type: PointerService }
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
    exports.ɵf = PointerService;
    exports.ɵg = RouterService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kYWdsb2JhbC1uZy1zMy1hbmFseXRpY3MudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL25nLXMzLWFuYWx5dGljcy5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL25nLXMzLWFuYWx5dGljcy5jb21wb25lbnQudHMiLG51bGwsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi90eXBlcy9ldmVudC50eXBlcy50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL2RpcmVjdGl2ZXMvYnV0dG9uL2J1dHRvbi5kaXJlY3RpdmUudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9kaXJlY3RpdmVzL2J1dHRvbi1ob3Zlci9idXR0b24taG92ZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL3BvaW50ZXIvcG9pbnRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2Vycm9yLWhhbmRsZXIvZXJyb3JIYW5kbGVyLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvZGlyZWN0aXZlcy9rZXktc3Ryb2tlL2tleS1zdHJva2UuZGlyZWN0aXZlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL25nLXMzLWFuYWx5dGljcy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ1MzQW5hbHl0aWNzU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1uZy1zMy1hbmFseXRpY3MnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgbmctczMtYW5hbHl0aWNzIHdvcmtzIVxuICAgIDwvcD5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1MzQW5hbHl0aWNzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImV4cG9ydCBsZXQgZW52aXJvbm1lbnQgPSB7XG4gICAgZGF0YUNvbGxlY3Rpb25BcGk6ICdodHRwczovLzF4Z2Y1YTJicTIuZXhlY3V0ZS1hcGkuYXAtc291dGgtMS5hbWF6b25hd3MuY29tL2Rldi8nLFxuICAgIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ6IHRydWUsXG4gICAgcmVzdHJpY3RJUFJhbmdlOiAnJ1xufTtcblxuXG4iLCJleHBvcnQgZW51bSBFdmVudExhYmVscyB7XG4gICAgUEFHRV9MT0FEID0gJ1BBR0VfTE9BRCcsXG4gICAgTU9VU0VfSE9WRVIgPSAnTU9VU0VfSE9WRVInLFxuICAgIEJVVFRPTl9DTElDSyA9ICdCVVRUT05fQ0xJQ0snLFxuICAgIE1PVVNFX01PVkUgPSAnTU9VU0VfTU9WRScsXG4gICAgU0NST0xMID0gJ1NDUk9MTCcsXG4gICAgQ09OU09MRV9FUlJPUiA9ICdDT05TT0xFX0VSUk9SJyxcbiAgICBLRVlfU1RST0tFID0gJ0tFWV9TVFJPS0UnXG59XG5cbmV4cG9ydCBlbnVtIENvbnN0YW50cyB7XG4gICAgREVNT0dSQVBISUNfSU5GTyA9ICdkZW1vZ3JhcGhpYy1pbmZvJyxcbiAgICBTRVNTSU9OX0lEID0gJ25nUzNBbmFseXRpY3NTZXNzaW9uSWQnLFxuICAgIERFTU9HUkFQSElDX0FQSV9VUkwgPSAnaHR0cHM6Ly9pcGFwaS5jby9qc29uLydcbn1cblxuXG5leHBvcnQgY2xhc3MgS2V5U3Ryb2tlRXZlbnRUeXBlIHtcbiAgICBrZXk6IHN0cmluZzsgLy8gcHJlc3NlZCBLZXlcbiAgICBrZXlDb2RlOiBzdHJpbmc7IC8vIHByZXNzZWQgS2V5IENvZGVcbiAgICBlbGVtZW50SWQ6IHN0cmluZzsgLy8gSWQgb2YgZWxlbWVudFxuICAgIGlzRm9ybTogYm9vbGVhbjsgLy8gaXMgaXQgYSBmb3JtXG4gICAgdGFnTmFtZTogc3RyaW5nOyAvLyB0YWdOYW1lIG9mIGVsZW1lbnRcbiAgICBodG1sRWxlbWVudFR5cGU6IHN0cmluZzsgLy8gdHlwZSBvZiBlbGVtZW50XG4gICAgdmFsdWU6IHN0cmluZzsgLy8gcHJldmlvdXMgdmFsdWUgb2YgdGhlIGVsZW1lbnRcbiAgICBjb2RlOiBzdHJpbmc7IC8vIFByZXNzZWQga2V5IGxhYmVsXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50JztcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuLCBQZXJmb3JtYW5jZUJlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMsIEtleVN0cm9rZUV2ZW50VHlwZSwgQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuLyoqXG4gKiBBbmFseXRpY3MgU2VydmljZVxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBbmFseXRpY3NTZXJ2aWNlIHtcblxuICAvKiogU2Vzc2lvbklkIG9mIHBsdWdpbiAqL1xuICBzZXNzaW9uSWQ6IHN0cmluZztcbiAgLyoqIERlbW9ncmFwaGljIGluZm8gKi9cbiAgZGVtb2dyYXBoaWNJbmZvOiBhbnkgPSB7fTtcbiAgLyoqIEV2ZW50IGxhYmVsIGNvbnN0YW50cyAqL1xuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICAvKiogQ29uc3RhbnRzICovXG4gIGNvbnN0YW50cyA9IENvbnN0YW50cztcblxuICAvKipcbiAgICogQW5hbHl0aWNzIFNlcnZpY2UgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGNvb2tpZVNlcnZpY2VcbiAgICogQHBhcmFtIGh0dHBTZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBodHRwU2VydmljZTogSHR0cENsaWVudCkge1xuICAgIGlmICghdGhpcy5jb29raWVTZXJ2aWNlLmNoZWNrKHRoaXMuY29uc3RhbnRzLkRFTU9HUkFQSElDX0lORk8pKSB7XG4gICAgICB0aGlzLmdldElwKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVtb2dyYXBoaWNJbmZvID0gSlNPTi5wYXJzZSh0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0KHRoaXMuY29uc3RhbnRzLkRFTU9HUkFQSElDX0lORk8pKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTZXNzaW9uSWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja2luZyB3aGV0aGVyIHNlc3Npb25JZCBwcmVzZW50IGluIGNvb2tpZSBvciBub3RcbiAgICogaWYgbm8gc2Vzc2lvbiBpZCBjb29raWUgcHJlc2VudCwgYWRkaW5nIG5ldyBzZXNzaW9uIGlkIG90aGVyd2lzZSByZXVzaW5nIHRoZSBzZXNzaW9uIGlkIHZhbHVlXG4gICAqL1xuICBwcml2YXRlIHNldFNlc3Npb25JZCgpOiB2b2lkIHtcbiAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmNvbnN0YW50cy5TRVNTSU9OX0lEKSkge1xuICAgICAgdGhpcy5zZXNzaW9uSWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHRoaXMuY29uc3RhbnRzLlNFU1NJT05fSUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlc3Npb25JZCA9IHV1aWQudjQoKTtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0odGhpcy5jb25zdGFudHMuU0VTU0lPTl9JRCwgdGhpcy5zZXNzaW9uSWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja2luZyB0aGUgSVAgcmFuZ2UgdG8gYmUgcmVzdHJpY3RcbiAgICogQHBhcmFtIGRhdGEgLSBkYXRhIHRvIGJlIHB1c2hlZFxuICAgKi9cbiAgcHVibGljIHB1c2hEYXRhKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNoZWNrSXBSYW5nZSgpKSB7XG4gICAgICB0aGlzLnB1Ymxpc2hUT0F1dGhTMyhkYXRhKTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBJUCByYW5nZSByZXN0cmljdGlvbiBhZGRlZFxuICAgKiBAcmVzdHJpY3RJUFJhbmdlIGlzIGEgcmVnZXhcbiAgICogaWYgQHJlc3RyaWN0SVBSYW5nZSBpcyBtYXRjaCB3aXRoIGN1cnJlbnQgSVAsXG4gICAqIHRoZSBhbmFseXRpY3MgZGF0YSB3aWxsIGJlIHJlc3RyaWN0ZWRcbiAgICovXG4gIHByaXZhdGUgY2hlY2tJcFJhbmdlKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGlwUmFuZ2UgPSBlbnZpcm9ubWVudC5yZXN0cmljdElQUmFuZ2U7XG4gICAgaWYgKGlwUmFuZ2UgJiYgdGhpcy5kZW1vZ3JhcGhpY0luZm8uaXApIHtcbiAgICAgIHJldHVybiB0aGlzLmRlbW9ncmFwaGljSW5mby5pcC5tYXRjaChpcFJhbmdlKSA/IGZhbHNlIDogdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRpbmcgSlNPTiBBcnJheSB0byBzdHJpbmdcbiAgICogQHBhcmFtIGRhdGFcbiAgICovXG4gIHByaXZhdGUgcHJvY2Vzc0ZvckF0aGVuYShkYXRhOiBBcnJheTxBbmFseXRpY3NCZWFuPik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGRhdGEubWFwKChvYmplY3Q6IGFueSkgPT4ge1xuICAgICAgb2JqZWN0WydzZXNzaW9uSWQnXSA9IHRoaXMuc2Vzc2lvbklkO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iamVjdCk7XG4gICAgfSkuam9pbignXFxuJyk7XG4gIH1cblxuICAvKipcbiAgICAqIFByZXBhcmluZyBkYXRhIHRvIGJlIHB1c2hlZCB0byBEYXRhU3RvcmFnZVxuICAgICogQHBhcmFtIGRhdGEgIGRhdGEgdG8gYmUgcHVzaGVkXG4gICAgKi9cbiAgcHJpdmF0ZSBwdWJsaXNoVE9BdXRoUzMoZGF0YTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX1fJHt0aGlzLnNlc3Npb25JZH1fJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9Lmpzb25gO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgIHRoaXMucHVzaERhdGFUb1MzKGZpbGVuYW1lLCB0aGlzLnByb2Nlc3NGb3JBdGhlbmEoZGF0YS5ldmVudFZhbHVlcyksIGhlYWRlcnMpO1xuICB9XG5cblxuICAvKipcbiAgICogUHVzaGluZyBkYXRhIHRvIGNvcnJlc3BvbmRpbmcgYnVja2V0IHVzaW5nIGRhdGEgY29sbGVjdGlvbiBhcGlcbiAgICogQHBhcmFtIHBhdGggLSBzZXJ2aWNlIHBhdGhcbiAgICogQHBhcmFtIGRhdGEgLSBkYXRhIHRvIGJlIHB1c2hlZFxuICAgKi9cbiAgcHJpdmF0ZSBwdXNoRGF0YVRvUzMocGF0aDogc3RyaW5nLCBkYXRhOiBhbnksIGhlYWRlcnM6IEh0dHBIZWFkZXJzKTogdm9pZCB7XG4gICAgY29uc3QgdXJsID0gYCR7ZW52aXJvbm1lbnQuZGF0YUNvbGxlY3Rpb25BcGl9JHtwYXRofWA7XG5cbiAgICB0aGlzLmh0dHBTZXJ2aWNlLnB1dCh1cmwsIGRhdGEsIHsgaGVhZGVyczogaGVhZGVycyB9KS5zdWJzY3JpYmUocmVzID0+IHsgfSwgZXJyID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2F2ZSB0aGUgY2FwdHVyZWQgSFRNTCB0byB0aGUgZGF0YSBjb2xsZWN0aW9uXG4gICAqIEBwYXJhbSBodG1sVGVtcGxhdGUgLSBET00gQ29udGVudFxuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgLSBmaWxlbmFtZSB0byBiZSBzYXZlZFxuICAgKi9cbiAgcHVibGljIHNhdmVTY3JlZW5zaG90c0luUzMoaHRtbFRlbXBsYXRlOiBzdHJpbmcsIHNjcmVlbnNob3ROYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IGBhc3NldHMvJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX0vJHt0aGlzLnNlc3Npb25JZH0vJHtzY3JlZW5zaG90TmFtZX0uaHRtbGA7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAndGV4dC9odG1sJyB9KTtcbiAgICB0aGlzLnB1c2hEYXRhVG9TMyhmaWxlbmFtZSwgaHRtbFRlbXBsYXRlLCBoZWFkZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIGNvbnNvbGUgZXJyb3JzIHRvIFMzIGJ1Y2tldFxuICAgKiBAcGFyYW0gZGF0YSBcbiAgICovXG4gIHB1YmxpYyBwdWJsaXNoQ29uc29sZUVycm9ycyhkYXRhOiBhbnkpOiB2b2lkIHtcblxuICAgIGRhdGFbJ3Nlc3Npb25JZCddID0gdGhpcy5zZXNzaW9uSWQ7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX1fJHt0aGlzLnNlc3Npb25JZH1fY29uc29sZV9lcnJvcnNfJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX0uanNvbmA7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgdGhpcy5wdXNoRGF0YVRvUzMoZmlsZW5hbWUsIGRhdGEsIGhlYWRlcnMpO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKiBTZXR0aW5nIGFuYWx5dGljcyBvYmplY3QgdG8gYmUgc2F2ZWQgaW4gUzMgYnVja2V0XG4gICAqIEBwYXJhbSB1c2VyRGF0YSAtIERhdGEgdHJhbnNmZXJyZWQgdG8gRXZlbnQgRGlyZWN0aXZlXG4gICAqIEBwYXJhbSBldmVudERldGFpbHMgLSBQb3NpdGlvbiBvZiBldmVudHNcbiAgICogQHBhcmFtIGV2ZW50TmFtZSAgLSBUeXBlIG9mIGV2ZW50XG4gICAqIEBwYXJhbSBzY3JlZW5zaG90TmFtZSAgLSBmaWxlIG5hbWUgb2Ygc2F2ZWQgc2NyZWVuc2hvdCBpZiB0aGUgZXZlbnQgaXMgUGFnZUxvYWRlZFxuICAgKi9cbiAgcHVibGljIHNldEFuYWx5dGljc0RhdGEoXG4gICAgdXNlckRhdGE6IGFueSA9IHt9LFxuICAgIGV2ZW50RGV0YWlsczogYW55LFxuICAgIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgIHNjcmVlbnNob3ROYW1lOiBzdHJpbmcsXG4gICAgb3B0aW9uYWw/OiB7XG4gICAgICBldmVudENvbXBvbmVudD86IHN0cmluZyxcbiAgICAgIGtleVN0cm9rZURhdGE/OiBLZXlTdHJva2VFdmVudFR5cGVcbiAgICB9KTogQW5hbHl0aWNzQmVhbiB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9IHtcbiAgICAgIGV2ZW50TGFiZWw6IGV2ZW50TmFtZSxcbiAgICAgIGV2ZW50Q29tcG9uZW50OiBvcHRpb25hbCAmJiBvcHRpb25hbC5ldmVudENvbXBvbmVudCA/IG9wdGlvbmFsLmV2ZW50Q29tcG9uZW50IDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCc/JylbMF0sXG4gICAgICBicm93c2VyOiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgIGZ1bGxVUkw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgb3JpZ2luOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuICAgICAgcmVzb2x1dGlvbjogYCR7d2luZG93LmlubmVyV2lkdGh9eCR7d2luZG93LmlubmVySGVpZ2h0fWAsXG4gICAgICB4Q29vcmQ6IHRoaXMuZ2V0RXZlbnREZXRhaWxzKGV2ZW50RGV0YWlsc1snY2xpZW50WCddKSxcbiAgICAgIHlDb29yZDogdGhpcy5nZXRFdmVudERldGFpbHMoZXZlbnREZXRhaWxzWydjbGllbnRZJ10pLFxuICAgICAgcGFnZVhDb29yZDogd2luZG93LnBhZ2VYT2Zmc2V0LnRvU3RyaW5nKCkgfHwgJzAnLFxuICAgICAgcGFnZVlDb29yZDogd2luZG93LnBhZ2VZT2Zmc2V0LnRvU3RyaW5nKCkgfHwgJzAnLFxuICAgICAgZXZlbnRUaW1lOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICBzY3JlZW5zaG90OiBzY3JlZW5zaG90TmFtZSxcbiAgICAgIGFkZGl0aW9uYWxJbmZvOiBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSksXG4gICAgICB1dG06IHRoaXMuZ2V0VVRNUGFyYW1ldGVycyh3aW5kb3cubG9jYXRpb24uaHJlZiksXG4gICAgICBkZW1vZ3JhcGhpY0luZm86IHRoaXMuZGVtb2dyYXBoaWNJbmZvLFxuICAgICAga2V5U3Ryb2tlRGF0YTogb3B0aW9uYWwgJiYgb3B0aW9uYWwua2V5U3Ryb2tlRGF0YSxcbiAgICAgIGh0bWxFbGVtZW50OiB0aGlzLmdldEh0bWxFbGVtZW50KGV2ZW50RGV0YWlsc1sndGFyZ2V0J10pLFxuICAgICAgcGVyZm9ybWFuY2U6IHRoaXMuZ2V0UGVyZm9ybWFuY2VEZXRhaWxzKCksXG4gICAgfTtcbiAgICByZXR1cm4gYW5hbHl0aWNzQmVhbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBkZXRhaWxzXG4gICAqIEBwYXJhbSB2YWx1ZSBcbiAgICovXG4gIHByaXZhdGUgZ2V0RXZlbnREZXRhaWxzKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUudG9TdHJpbmcoKSA6ICcwJztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgSFRNTCBDb250ZW50XG4gICAqIEBwYXJhbSB0YXJnZXRFbGVtZW50IC0gdGFyZ2V0IGVsZW1lbnRcbiAgICovXG4gIHByaXZhdGUgZ2V0SHRtbEVsZW1lbnQodGFyZ2V0RWxlbWVudDogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGFyZ2V0RWxlbWVudCAhPT0gdW5kZWZpbmVkID8gdGFyZ2V0RWxlbWVudFsnaW5uZXJIVE1MJ10gOiAnJztcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBlcmZvcm1hbmNlIGRldGFpbHNcbiAgICovXG4gIHByaXZhdGUgZ2V0UGVyZm9ybWFuY2VEZXRhaWxzKCk6IFBlcmZvcm1hbmNlQmVhbiB7XG4gICAgY29uc3QgcGVyZm9ybWFuY2UgPSB3aW5kb3cucGVyZm9ybWFuY2U7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hdmlnYXRpb246IHBlcmZvcm1hbmNlLm5hdmlnYXRpb24sXG4gICAgICB0aW1lT3JpZ2luOiBwZXJmb3JtYW5jZS50aW1lT3JpZ2luLFxuICAgICAgdGltaW5nOiBwZXJmb3JtYW5jZS50aW1pbmdcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIE1lbW9yeSB1c2FnZSBvZiB0aGUgYXBwbGljYXRpb24gaXMgcHJvdmlkZWQgYnkgR29vZ2xlIENocm9tZVxuICAgKiBAcGFyYW0gdXNlckFnZW50IC0gVXNlciBhZ2VudCB0byBjaGVjayB0aGUgYnJvd3NlclxuICAgKi9cbiAgcHJpdmF0ZSBnZU1lbW9yeVVzYWdlSW5mbyh1c2VyQWdlbnQ6IGFueSkge1xuICAgIGNvbnN0IGlzQ2hyb21lID0gdXNlckFnZW50LnNwbGl0KCdjaHJvbWUnKS5sZW5ndGggPiAxO1xuICAgIGNvbnN0IG1lbW9yeSA9IGlzQ2hyb21lID8gd2luZG93LnBlcmZvcm1hbmNlWydtZW1vcnknXSA6ICcnO1xuICAgIHJldHVybiBtZW1vcnk7XG4gIH1cblxuICAvKipcbiAgICogR2V0dGluZyBVVE0gUGFyYW1ldGVycyBieSBwcm9jZXNzaW5nIGN1cnJlbnQgcGFnZVVSTFxuICAgKiBAcGFyYW0gdXJsIC0gUGFnZSBVUkxcbiAgICovXG4gIHByaXZhdGUgZ2V0VVRNUGFyYW1ldGVycyh1cmw6IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3QgdXRtT2JqZWN0ID0ge307XG4gICAgaWYgKHVybC5pbmNsdWRlcygndXRtJykpIHtcbiAgICAgIGNvbnN0IHV0bVBhcmFtcyA9IHVybC5zcGxpdCgnPycpWzFdLnNwbGl0KCcmJyk7XG4gICAgICB1dG1QYXJhbXMubWFwKHBhcmFtID0+IHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gcGFyYW0uc3BsaXQoJz0nKTtcbiAgICAgICAgdXRtT2JqZWN0W3BhcmFtc1swXV0gPSBwYXJhbXNbMV07XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHV0bU9iamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdXNlciBkZW1vZ3JhcGhpYyBpbmZvcm1hdGlvbiBpbiBjb29raWVzXG4gICAqL1xuICBwcml2YXRlIGdldElwKCk6IHZvaWQge1xuICAgIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KHRoaXMuY29uc3RhbnRzLkRFTU9HUkFQSElDX0FQSV9VUkwpLnN1YnNjcmliZShcbiAgICAgIChyZXM6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLmRlbW9ncmFwaGljSW5mbyA9IHJlcztcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldChcbiAgICAgICAgICB0aGlzLmNvbnN0YW50cy5ERU1PR1JBUEhJQ19JTkZPLCBKU09OLnN0cmluZ2lmeShyZXMpLFxuICAgICAgICAgIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKDEwMDAgKiA2MCAqIDYwICogMjQpKSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRGF0YVN0b3JhZ2VTZXJ2aWNlIHtcblxuICBhbGxEYXRhQW5hbHl0aWNzQXJyYXk6IEFycmF5PGFueT4gPSBbXTtcbiAgYWxsRGF0YUFuYWx5dGljczoge1xuICAgIHBhZ2VVcmw6IHN0cmluZyxcbiAgICBldmVudFZhbHVlczogQXJyYXk8YW55PlxuICB9O1xuICBwcmV2aW91c1VybDogc3RyaW5nO1xuICBrZXlzOiBBcnJheTxhbnk+ID0gW107XG4gIGV2ZW50Q29sbGVjdG9yID0gbmV3IE1hcCgpO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFuYWx5dGljYWxTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlLCBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHsgfVxuICBwcml2YXRlIHJvdXRlRGV0YWlsczogYW55ID0gW107XG4gIGNvdW50ID0gMDtcbiAgc2V0VXJsS2V5KGRhdGE6IHN0cmluZykge1xuICAgIGxldCBmbGFnID0gMDtcbiAgICBpZiAodGhpcy5wcmV2aW91c1VybCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLnNldChkYXRhLCBbXSk7XG4gICAgICB0aGlzLnByZXZpb3VzVXJsID0gZGF0YSB8fCAnLyc7XG4gICAgfSBlbHNlIGlmICghKGRhdGEgPT09IHRoaXMucHJldmlvdXNVcmwpKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBBcnJheS5mcm9tKHRoaXMuZXZlbnRDb2xsZWN0b3Iua2V5cygpKSkge1xuICAgICAgICBpZiAoa2V5ID09PSBkYXRhKSB7XG4gICAgICAgICAgZmxhZyA9IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmbGFnID09PSAwKSB7XG4gICAgICAgIHRoaXMuZXZlbnRDb2xsZWN0b3Iuc2V0KGRhdGEsIFtdKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJldmlvdXNVcmwgPSBkYXRhO1xuICAgIH1cbiAgfVxuICBhcHBlbmRUb0FuYWx5dGljc0FycmF5KGRhdGE6IEFuYWx5dGljc0JlYW4pIHtcbiAgICBpZiAodGhpcy5wcmV2aW91c1VybCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNldFVybEtleShkYXRhLmV2ZW50Q29tcG9uZW50KTtcbiAgICB9XG4gICAgdGhpcy5ldmVudENvbGxlY3Rvci5nZXQodGhpcy5wcmV2aW91c1VybCkucHVzaChkYXRhKTtcbiAgfVxuXG4gIHB1c2hEYXRhQXJyYXlUb1MzKCkge1xuICAgIHRoaXMuY291bnQrKztcbiAgICAvLyB0aGlzLmFsbERhdGFBbmFseXRpY3NNYXAgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KEFycmF5LmZyb20odGhpcy5ldmVudENvbGxlY3Rvci5rZXlzKCkpKSk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmtleXMoKSkpIHtcbiAgICAgIHRoaXMuYWxsRGF0YUFuYWx5dGljcyA9IHtcbiAgICAgICAgcGFnZVVybDoga2V5LFxuICAgICAgICBldmVudFZhbHVlczogQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmdldChrZXkpLnZhbHVlcygpKVxuICAgICAgfTtcbiAgICAgIHRoaXMua2V5cy5wdXNoKGtleSk7XG4gICAgICBpZiAodGhpcy5hbGxEYXRhQW5hbHl0aWNzLmV2ZW50VmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5hbmFseXRpY2FsU2VydmljZS5wdXNoRGF0YSh0aGlzLmFsbERhdGFBbmFseXRpY3MpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLmNsZWFyKCk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5rZXlzKSB7XG4gICAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLnNldChrZXksIFtdKTtcbiAgICB9XG4gIH1cblxuICBzZXRSb3V0ZURldGFpbHMocm91dGVEZXRhaWxzOiBhbnkpIHtcbiAgICB0aGlzLnJvdXRlRGV0YWlscyA9IHJvdXRlRGV0YWlscztcbiAgfVxuXG4gIGdldFJvdXRlRGV0YWlscygpIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZURldGFpbHM7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5cbi8qKlxuICogQnV0dG9uIERpcmVjdGl2ZSB0byB0cmFjayBjbGljayBldmVudFxuICogU2VsZWN0b3IgY2FuIGJlIGFkZGVkIHRvIGFueSBIVE1MIEVsZW1lbnRcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW3RyYWNrLWJ0bl0nXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkRpcmVjdGl2ZSB7XG5cbiAgLy8gR2V0cyBpbXBvcnRhbnQgZGF0YSBhYm91dCB0aGUgYnV0dG9uIGV4cGxpY2l0bHkgZnJvbSB0aGUgYXBwbGljYXRpb25cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCd0cmFjay1idG4nKSBkYXRhOiBhbnkgPSB7fTtcbiAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgZXZlbnREZXRhaWxzOiBhbnk7XG5cbiAgLyoqXG4gICAqIEJ1dHRvbiBUcmFja2luZyAtIENvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBkYXRhU3RvcmFnZSAtIERhdGFTdG9yYWdlU2VydmljZVxuICAgKiBAcGFyYW0gYW5hbHl0aWNzU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLCBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UpIHsgfVxuXG5cbiAgLyoqXG4gICAqICBMaXN0ZW4gdG8gYnV0dG9uIGNsaWNrIGFjdGlvbnNcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSkgb25DbGljaygkZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuZXZlbnREZXRhaWxzID0gJGV2ZW50O1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZW5kRGF0YSgpO1xuICAgIH0sIDEwKTtcbiAgfVxuXG4gIC8qKiBTZW5kaW5nIGRhdGEgb24gYnV0dG9uIGNsaWNrICovXG4gIHB1YmxpYyBzZW5kRGF0YSgpOiB2b2lkIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgdGhpcy5ldmVudERldGFpbHMsIHRoaXMuZXZlbnRMYWJlbHMuQlVUVE9OX0NMSUNLLCAnJyk7XG4gICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIE9uQ2hhbmdlcywgSG9zdExpc3RlbmVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW3RyYWNrLXNjcm9sbF0nXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICAvLyBHZXRzIGltcG9ydGFudCBkYXRhIGFib3V0IHRoZSBjb21wb25lbnQgZXhwbGljaXRseSBmcm9tIHRoZSBhcHBsaWNhdGlvblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gICAgQElucHV0KCd0cmFjay1zY3JvbGwnKSBkYXRhOiBhbnkgPSB7fTtcbiAgICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIC8vIENhcHR1cmUgdGhlIGNoYW5nZSBpbiBkYXRhXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGNoYW5nZXMuZGF0YS5jdXJyZW50VmFsdWU7XG4gICAgfVxuXG4gICAgLy8gVHJpZ2dlcmVkIHdoZW4gYW55IHNjcm9sbCBldmVudCBvY2N1cnNcbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6c2Nyb2xsJywgWyckZXZlbnQnXSkgb25TY3JvbGxFdmVudCgkZXZlbnQ6IGFueSkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VuZERhdGEoJGV2ZW50KTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBzZW5kRGF0YShldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEodGhpcy5kYXRhLCBldmVudCwgdGhpcy5ldmVudExhYmVscy5TQ1JPTEwsICcnKTtcbiAgICAgICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1t0cmFjay1idXR0b25Ib3Zlcl0nXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkhvdmVyRGlyZWN0aXZlIHtcbiAgLyoqICovXG4gIGV2ZW50RGV0YWlsczogYW55O1xuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICAvLyBHZXRzIGltcG9ydGFudCBkYXRhIGFib3V0IHRoZSBidXR0b24gZXhwbGljaXRseSBmcm9tIHRoZSBhcHBsaWNhdGlvblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ3RyYWNrLWJ1dHRvbkhvdmVyJykgZGF0YTogYW55ID0ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLCBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UpIHsgfVxuXG4gIC8vIExpc3RlbiB0byBidXR0b24gaG92ZXIgYWN0aW9uc1xuICBASG9zdExpc3RlbmVyKCdtb3VzZW92ZXInLCBbJyRldmVudCddKSBvbk1vdXNlT3ZlcigkZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuZXZlbnREZXRhaWxzID0gJGV2ZW50O1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZW5kRGF0YSgpO1xuICAgIH0sIDEwKTtcbiAgfVxuXG4gIC8vIFNlbmRpbmcgZGF0YSBvbiBidXR0b24gaG92ZXJcbiAgcHVibGljIHNlbmREYXRhKCk6IHZvaWQge1xuICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEodGhpcy5kYXRhLCB0aGlzLmV2ZW50RGV0YWlscywgdGhpcy5ldmVudExhYmVscy5NT1VTRV9IT1ZFUiwgJycpO1xuICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgfVxufVxuIiwiXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50JztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuXG5leHBvcnQgY2xhc3MgRW52aXJvbm1lbnRTZXJ2aWNlIHtcblxuXG4gIC8vIFNldHRpbmcgQ29uZmlndXJhdGlvbiBvbiBlbnZpcm9ubWVudFxuICBzZXRDb25maWd1cmF0aW9uVG9FbnZpcm9ubWVudChjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkOiBib29sZWFuKSB7XG4gICAgZW52aXJvbm1lbnQuZGF0YUNvbGxlY3Rpb25BcGkgPSBjb25maWd1cmF0aW9uLmRhdGFDb2xsZWN0aW9uQXBpO1xuICAgIGVudmlyb25tZW50LmlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQgPSBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkO1xuICAgIGVudmlyb25tZW50LnJlc3RyaWN0SVBSYW5nZSA9IGNvbmZpZ3VyYXRpb24ucmVzdHJpY3RJUFJhbmdlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCwgTmF2aWdhdGlvbkVycm9yIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5kZWNsYXJlIGxldCBuZ1MzQW5hbHl0aWNzSlM6IGFueTtcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJvdXRlclNlcnZpY2Uge1xuICBhbmFseXRpY3NEYXRhOiBBbmFseXRpY3NCZWFuO1xuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICBuYXZpZ2F0ZU9uID0gJyc7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVzOiBSb3V0ZXIsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSwgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnkpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFRyYWNraW5nIHJvdXRlciBldmVudHNcbiAgICovXG4gIHB1YmxpYyB0cmFja1JvdXRlckV2ZW50cygpOiB2b2lkIHtcbiAgICAvKiogVHJpZ2dlcmVkIHdoZW4gY3VycmVudCBwYWdlIGlzIGxvYWRlZCAqL1xuICAgIHRoaXMucm91dGVzLmV2ZW50cy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAvKiogVHJpZ2dlcmVkIHdoZW4gTmF2aWdhdGlvbkVuZCBldmVudCBvY2N1cnMgKi9cbiAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgaWYgKHRoaXMubmF2aWdhdGVPbiAhPT0gZXZlbnQudXJsKSB7XG4gICAgICAgICAgdGhpcy5hbmFseXRpY3NQdXNoRGF0YShldmVudCk7XG4gICAgICAgICAgdGhpcy5uYXZpZ2F0ZU9uID0gZXZlbnQudXJsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yKSB7XG4gICAgICAgIC8qKiBUcmlnZ2VyZWQgd2hlbiBOYXZpZ2F0aW9uRXJyb3IgZXZlbnQgb2NjdXJzICovXG4gICAgICAgIHRoaXMuYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgYW5hbHl0aWNzIGRhdGFcbiAgICogQHBhcmFtIGV2ZW50IC0gUm91dGVyIEV2ZW50XG4gICAqL1xuICBwdWJsaWMgYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHNjcmVlbnNob3ROYW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkudG9TdHJpbmcoKTtcbiAgICB0aGlzLmFuYWx5dGljc0RhdGEgPSB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh7fSwge30sIHRoaXMuZXZlbnRMYWJlbHMuUEFHRV9MT0FELCBgJHtzY3JlZW5zaG90TmFtZX0uaHRtbGAsXG4gICAgICB7IGV2ZW50Q29tcG9uZW50OiBldmVudC51cmwgfSk7XG4gICAgdGhpcy53YWl0VGlsbFBhZ2VMb2FkKHNjcmVlbnNob3ROYW1lKTtcbiAgICAvLyBEYXRhIGlzIHNlbmQgb25seSB3aGVuIHVzZXIgY29uZmlndXJlIHRoZSBwYWdlIGxvYWRpbmcgdG8gYmUgdHJ1ZVxuICAgIHRoaXMuZGF0YVN0b3JhZ2Uuc2V0VXJsS2V5KHRoaXMuYW5hbHl0aWNzRGF0YS5ldmVudENvbXBvbmVudCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkodGhpcy5hbmFseXRpY3NEYXRhKTtcbiAgICB9LCAwKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFdhaXRpbmcgZm9yIHBhZ2UgdG8gbG9hZCBjb21wbGV0ZWx5XG4gICAqIEBwYXJhbSBldmVudCBcbiAgICovXG4gIHdhaXRUaWxsUGFnZUxvYWQoc2NyZWVuc2hvdE5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIF9zZWxmLmNhcHR1cmVUZW1wbGF0ZShzY3JlZW5zaG90TmFtZSk7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FwdHVyZSB0ZW1wbGF0ZSBvZiBsb2FkZWQgdmlld1xuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgLSBTY3JlZW5zaG90IGltYWdlXG4gICAqL1xuICBjYXB0dXJlVGVtcGxhdGUoc2NyZWVuc2hvdE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZ1bGxQYWdlSFRNTCA9IG5nUzNBbmFseXRpY3NKUy5jb25zdHJ1Y3RIVE1MUGFnZShcbiAgICAgIHRoaXMucHJvY2Vzc1JlZ2V4T3BlcmF0aW9ucyh0aGlzLmRvY3VtZW50LmhlYWQuaW5uZXJIVE1MKSxcbiAgICAgIHRoaXMucHJvY2Vzc1JlZ2V4T3BlcmF0aW9ucyh0aGlzLmRvY3VtZW50LmJvZHkuaW5uZXJIVE1MKVxuICAgICk7XG4gICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNhdmVTY3JlZW5zaG90c0luUzMoZnVsbFBhZ2VIVE1MLCBzY3JlZW5zaG90TmFtZSk7XG4gIH1cblxuXG4gIHByb2Nlc3NSZWdleE9wZXJhdGlvbnModGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbmdTM0FuYWx5dGljc0pTLmRvUmVnZXgodGV4dCwgd2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIElucHV0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUG9pbnRlclNlcnZpY2Uge1xuXG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIGV2ZW50RGV0YWlsczogYW55O1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ3RyYWNrLXBvaW50ZXInKSBkYXRhOiBhbnkgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSkgeyB9XG5cbiAgLyoqXG4gICAqIFRyYWNrIE1vdXNlIE1vdmVtZW50XG4gICAqL1xuICB0cmFja01vdXNlTW92ZUV2ZW50KCkge1xuICAgIGZyb21FdmVudCh3aW5kb3csICdtb3VzZW1vdmUnKVxuICAgICAgLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLmV2ZW50RGV0YWlscyA9IGU7XG4gICAgICAgIHRoaXMuc2VuZERhdGEoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgTW91c2UgTW92ZSBkZXRhaWxzXG4gICAqL1xuICBwdWJsaWMgc2VuZERhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIHRoaXMuZXZlbnREZXRhaWxzLCB0aGlzLmV2ZW50TGFiZWxzLk1PVVNFX01PVkUsICcnKTtcbiAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR2xvYmFsRXJyb3JIYW5kbGVyIGltcGxlbWVudHMgRXJyb3JIYW5kbGVyIHtcbiAgICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIGNvbnN0IGFuYWx5dGljc1NlcnZpY2UgPSB0aGlzLmluamVjdG9yLmdldChBbmFseXRpY3NTZXJ2aWNlKTtcbiAgICAgICAgaWYgKHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnNvbGVFcnJvckZuT2JqZWN0ID0gY29uc29sZS5lcnJvcjtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IgPSBmdW5jdGlvbiAoLi4uZXJyb3I6IGFueVtdKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkRXJyb3IgPSBlcnJvci5tYXAoZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGUpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxuICAgICAgICAgICAgICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPSBhbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEocHJvY2Vzc2VkRXJyb3IsIHt9LCB0aGlzLmV2ZW50TGFiZWxzLkNPTlNPTEVfRVJST1IsICcnKTtcbiAgICAgICAgICAgICAgICBhbmFseXRpY3NTZXJ2aWNlLnB1Ymxpc2hDb25zb2xlRXJyb3JzKGFuYWx5dGljc0JlYW4pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGVFcnJvckZuT2JqZWN0LmNhbGwoY29uc29sZSwgZXJyb3IpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBJbXBsZW1lbnRpbmcgdGhlIG1ldGhvZCAqL1xuICAgIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpIHsgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgRWxlbWVudFJlZiwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBLZXlTdHJva2VFdmVudFR5cGUsIEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZCc7XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdHJhY2sta2V5U3Ryb2tlXScgfSlcbmV4cG9ydCBjbGFzcyBLZXlTdHJva2VEaXJlY3RpdmUge1xuXG4gICAgLyoqIEV2ZW50IExhYmVscyBDb25zdGFudHMgKi9cbiAgICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuXG4gICAgLyoqXG4gICAgICogRGVwZW5kZW5jaWVzXG4gICAgICogQHBhcmFtIGRhdGFTdG9yYWdlXG4gICAgICogQHBhcmFtIGFuYWx5dGljc1NlcnZpY2VcbiAgICAgKiBAcGFyYW0gZWwgLSBFbGVtZW50IFJlZmVyZW5jZVxuICAgICAqIEBwYXJhbSByZW5kZXJlciAtIFJlbmRlcmVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaWYgSWQgZG9lc24ndCBiZWxvbmdzIHRvIHRoZSBlbGVtZW50LCB3aGljaCBpcyBiZWluZyB0cmFja2VkLFxuICAgICAgICAgKiBBZGRpbmcgYSBkeW5hbWljIElkXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoIXRoaXMuZWwubmF0aXZlRWxlbWVudC5pZCkge1xuICAgICAgICAgICAgY29uc3QgZHluYW1pY0lkID0gYGtleV9zdHJva2VfZWxlbWVudF8ke3V1aWQudjQoKX1gO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaWQnLCBkeW5hbWljSWQpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmFja2luZyBLZXkgcHJlc3MgZXZlbnRzIHVzaW5nIGhvc3QgbGlzdGVuZXJcbiAgICAgKiBHZW5lcmF0aW5nIGEgZGF0YSBiZWFuIGluIGEgc3BlY2lmaWVkIGZvcm1hdFxuICAgICAqIEBwYXJhbSAkZXZlbnQgLSBLZXlQcmVzcyBFdmVudFxuICAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2tleXByZXNzJywgWyckZXZlbnQnXSkgb25LZXlTdHJva2UoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgY29uc3Qga2V5U3Ryb2tlOiBLZXlTdHJva2VFdmVudFR5cGUgPSBuZXcgS2V5U3Ryb2tlRXZlbnRUeXBlKCk7XG5cbiAgICAgICAga2V5U3Ryb2tlLmVsZW1lbnRJZCA9ICRldmVudC50YXJnZXQuaWQ7XG4gICAgICAgIGtleVN0cm9rZS5rZXkgPSAkZXZlbnQua2V5O1xuICAgICAgICBrZXlTdHJva2UuY29kZSA9ICRldmVudC5jb2RlO1xuICAgICAgICBrZXlTdHJva2Uua2V5Q29kZSA9ICRldmVudC5rZXlDb2RlLnRvU3RyaW5nKCk7XG4gICAgICAgIGtleVN0cm9rZS5pc0Zvcm0gPSAkZXZlbnQudGFyZ2V0LmZvcm0gIT09IHVuZGVmaW5lZDtcbiAgICAgICAga2V5U3Ryb2tlLnRhZ05hbWUgPSAkZXZlbnQudGFyZ2V0LnRhZ05hbWU7XG4gICAgICAgIGtleVN0cm9rZS5odG1sRWxlbWVudFR5cGUgPSAkZXZlbnQudGFyZ2V0LnR5cGU7XG4gICAgICAgIGtleVN0cm9rZS52YWx1ZSA9ICRldmVudC50YXJnZXQudmFsdWU7XG5cbiAgICAgICAgdGhpcy5zZW5kRGF0YShrZXlTdHJva2UsICRldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZGluZyBkYXRhXG4gICAgICogQHBhcmFtIGtleVN0cm9rZSAtIENhcHR1cmVkIEtleVN0cm9rZSBkYXRhXG4gICAgICogQHBhcmFtIGV2ZW50RGV0YWlscyAtIEtleSBQcmVzcyBldmVudCBkZXRhaWxzXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZW5kRGF0YShrZXlTdHJva2U6IEtleVN0cm9rZUV2ZW50VHlwZSwgZXZlbnREZXRhaWxzOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICAgICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh7fSxcbiAgICAgICAgICAgICAgICBldmVudERldGFpbHMsXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudExhYmVscy5LRVlfU1RST0tFLCAnJyxcbiAgICAgICAgICAgICAgICB7IGtleVN0cm9rZURhdGE6IGtleVN0cm9rZSB9KTtcbiAgICAgICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBFcnJvckhhbmRsZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUzNBbmFseXRpY3NDb21wb25lbnQgfSBmcm9tICcuL25nLXMzLWFuYWx5dGljcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgQnV0dG9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2J1dHRvbi9idXR0b24uZGlyZWN0aXZlJztcbmltcG9ydCB7IFNjcm9sbERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCdXR0b25Ib3ZlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9idXR0b24taG92ZXIvYnV0dG9uLWhvdmVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBFbnZpcm9ubWVudFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgUm91dGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlJztcbmltcG9ydCB7IGludGVydmFsIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9saWIvc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IFBvaW50ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9wb2ludGVyL3BvaW50ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEdsb2JhbEVycm9ySGFuZGxlciB9IGZyb20gJy4vc2VydmljZXMvZXJyb3ItaGFuZGxlci9lcnJvckhhbmRsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcbmltcG9ydCB7IEtleVN0cm9rZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9rZXktc3Ryb2tlL2tleS1zdHJva2UuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5nUzNBbmFseXRpY3NDb21wb25lbnQsXG4gICAgQnV0dG9uRGlyZWN0aXZlLFxuICAgIFNjcm9sbERpcmVjdGl2ZSxcbiAgICBCdXR0b25Ib3ZlckRpcmVjdGl2ZSxcbiAgICBLZXlTdHJva2VEaXJlY3RpdmVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgIEVudmlyb25tZW50U2VydmljZSxcbiAgICBQb2ludGVyU2VydmljZSxcbiAgICBDb29raWVTZXJ2aWNlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOZ1MzQW5hbHl0aWNzQ29tcG9uZW50LFxuICAgIEJ1dHRvbkRpcmVjdGl2ZSxcbiAgICBTY3JvbGxEaXJlY3RpdmUsXG4gICAgQnV0dG9uSG92ZXJEaXJlY3RpdmUsXG4gICAgS2V5U3Ryb2tlRGlyZWN0aXZlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmdTM0FuYWx5dGljc01vZHVsZSB7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZW52aXJvbm1lbnRTZXJ2aWNlID0gbmV3IEVudmlyb25tZW50U2VydmljZSgpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyU2VydmljZTogUm91dGVyU2VydmljZSwgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLCBwcml2YXRlIHBvaW50ZXJTZXJ2aWNlOiBQb2ludGVyU2VydmljZSkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5kYXRhU3RvcmFnZS5wdXNoRGF0YUFycmF5VG9TMygpO1xuICAgIH0pO1xuICAgIGludGVydmFsKDEwMDAgKiAyKS5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLmRhdGFTdG9yYWdlLnB1c2hEYXRhQXJyYXlUb1MzKCk7XG4gICAgfSk7XG4gICAgdGhpcy5wb2ludGVyU2VydmljZS50cmFja01vdXNlTW92ZUV2ZW50KCk7XG4gICAgdGhpcy5yb3V0ZXJTZXJ2aWNlLnRyYWNrUm91dGVyRXZlbnRzKCk7XG4gIH1cbiAgLy8gQ29uZmlndXJpbmcgdGhlIGluaXRpYWwgc2V0dXAgZm9yIHMzIGJ1Y2tldCBhbmQgcGFnZSBsb2FkaW5nXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24sIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHRoaXMuZW52aXJvbm1lbnRTZXJ2aWNlLnNldENvbmZpZ3VyYXRpb25Ub0Vudmlyb25tZW50KGNvbmZpZ3VyYXRpb24sIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQpO1xuICAgIC8vIEFzc2lnbmluZyB0aGUgY29uZmlndXJhdGlvbiB0byBlbnZpcm9ubWVudCB2YXJpYWJsZXNcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5nUzNBbmFseXRpY3NNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEVycm9ySGFuZGxlciwgdXNlQ2xhc3M6IEdsb2JhbEVycm9ySGFuZGxlciB9XVxuICAgIH07XG4gIH1cblxuXG59XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkNvbXBvbmVudCIsInV1aWQudjQiLCJIdHRwSGVhZGVycyIsIkNvb2tpZVNlcnZpY2UiLCJIdHRwQ2xpZW50IiwidHNsaWJfMS5fX3ZhbHVlcyIsIkRpcmVjdGl2ZSIsIklucHV0IiwiSG9zdExpc3RlbmVyIiwiTmF2aWdhdGlvbkVuZCIsIk5hdmlnYXRpb25FcnJvciIsIlJvdXRlciIsIkluamVjdCIsIkRPQ1VNRU5UIiwiZnJvbUV2ZW50IiwiSW5qZWN0b3IiLCJFbGVtZW50UmVmIiwiUmVuZGVyZXIyIiwiaW50ZXJ2YWwiLCJFcnJvckhhbmRsZXIiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkh0dHBDbGllbnRNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQU9FO1NBQWlCOztvQkFMbEJBLGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7Ozs7bUNBSkQ7S0FRQzs7Ozs7O0FDUkQ7UUFhRTtTQUFpQjs7OztRQUVqQix5Q0FBUTs7O1lBQVI7YUFDQzs7b0JBZEZDLFlBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUscUJBQXFCO3dCQUMvQixRQUFRLEVBQUUsdURBSVQ7d0JBQ0QsTUFBTSxFQUFFLEVBQUU7cUJBQ1g7OztRQVFELDZCQUFDO0tBQUE7O0lDbEJEOzs7Ozs7Ozs7Ozs7OztBQWNBLHNCQThGeUIsQ0FBQztRQUN0QixJQUFJLENBQUMsR0FBRyxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTTtvQkFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQzNDO1NBQ0osQ0FBQztJQUNOLENBQUM7Ozs7Ozs7QUNySEQsUUFBVyxXQUFXLEdBQUc7UUFDckIsaUJBQWlCLEVBQUUsOERBQThEO1FBQ2pGLHlC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