(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('aws-sdk'), require('uuid'), require('ngx-cookie-service'), require('@angular/common/http'), require('moment'), require('@angular/router'), require('@angular/platform-browser'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-s3-analytics', ['exports', '@angular/core', 'aws-sdk', 'uuid', 'ngx-cookie-service', '@angular/common/http', 'moment', '@angular/router', '@angular/platform-browser', 'rxjs', '@angular/common'], factory) :
    (factory((global['ng-s3-analytics'] = {}),global.ng.core,null,null,null,global.ng.common.http,null,global.ng.router,global.ng.platformBrowser,global.rxjs,global.ng.common));
}(this, (function (exports,i0,AWS,uuid,i1,i2,moment_,i1$1,i4,rxjs,common) { 'use strict';

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
        accessKeyId: '',
        secretAccessKey: '',
        sessionToken: '',
        bucketName: {
            authenticatedBucket: '',
            publicBucket: '',
            screenshotBucket: ''
        },
        fileName: '',
        relativeFolders: [],
        region: '',
        isAuth: false,
        isPageLoadingToBeDetected: true
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment = moment_;
    /**
     * Analytics Service
     */
    var AnalyticsService = /** @class */ (function () {
        function AnalyticsService(cookieService, httpService) {
            this.cookieService = cookieService;
            this.httpService = httpService;
            this.demographicInfo = {};
            if (!this.cookieService.check('demographic-info')) {
                this.getIp();
            }
            else {
                this.demographicInfo = JSON.parse(this.cookieService.get('demographic-info'));
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
                if (this.cookieService.check('ngS3AnalyticsSessionId')) {
                    this.sessionId = this.cookieService.get('ngS3AnalyticsSessionId');
                }
                else {
                    this.sessionId = uuid.v4();
                    this.cookieService.set('ngS3AnalyticsSessionId', this.sessionId, new Date(new Date().getTime() + (1000 * 60 * 60)));
                }
            };
        /**
         * Pushing Analytics data to different bucket based on Authentication flag
         * @param data
         */
        /**
         * Pushing Analytics data to different bucket based on Authentication flag
         * @param {?} data
         * @return {?}
         */
        AnalyticsService.prototype.pushData = /**
         * Pushing Analytics data to different bucket based on Authentication flag
         * @param {?} data
         * @return {?}
         */
            function (data) {
                if (environment.isAuth) {
                    this.publishTOAuthS3(data);
                }
                else {
                    this.publishTOUnAuthS3(data);
                }
            };
        /**
         * Pushing data to UnAuthenticated Bucket S3
         * @param data
         */
        /**
         * Pushing data to UnAuthenticated Bucket S3
         * @private
         * @param {?} data
         * @return {?}
         */
        AnalyticsService.prototype.publishTOUnAuthS3 = /**
         * Pushing data to UnAuthenticated Bucket S3
         * @private
         * @param {?} data
         * @return {?}
         */
            function (data) {
                /**
                 * Construct S3 Bucket object
                 * @type {?}
                 */
                var s3Bucket = this.constructS3Object();
                /**
                 * Setting the params for s3
                 * @type {?}
                 */
                var params = {
                    Bucket: environment.bucketName.publicBucket,
                    Key: new Date().toISOString().split('T')[0] + "_" + this.sessionId + "_" + new Date().toISOString() + ".json",
                    Body: this.processForAthena(data.eventValues),
                    ContentType: 'json'
                };
                /*** Pushing the data to s3 */
                s3Bucket.putObject(params, ( /**
                 * @param {?} err
                 * @param {?} resData
                 * @return {?}
                 */function (err, resData) {
                    if (err) {
                        console.error(err);
                    }
                }));
            };
        /**
         * Converting JSON Array to string
         * @param data
         */
        /**
         * Converting JSON Array to string
         * @param {?} data
         * @return {?}
         */
        AnalyticsService.prototype.processForAthena = /**
         * Converting JSON Array to string
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
          * Pushing data to Authenticated Bucket S3
          * @param data
          */
        /**
         * Pushing data to Authenticated Bucket S3
         * @param {?} data
         * @return {?}
         */
        AnalyticsService.prototype.publishTOAuthS3 = /**
         * Pushing data to Authenticated Bucket S3
         * @param {?} data
         * @return {?}
         */
            function (data) {
                /**
                 * Construct S3 Bucket object
                 * @type {?}
                 */
                var s3Bucket = this.constructS3Object();
                /**
                 * Setting the params for s3
                 * @type {?}
                 */
                var params = {
                    Bucket: environment.bucketName.authenticatedBucket,
                    Key: new Date().toISOString().split('T')[0] + "_" + this.sessionId + "_" + new Date().toISOString() + ".json",
                    Body: this.processForAthena(data.eventValues),
                    ContentType: 'json'
                };
                /*** Pushing the data to s3 */
                s3Bucket.putObject(params, ( /**
                 * @param {?} err
                 * @param {?} resData
                 * @return {?}
                 */function (err, resData) {
                    if (err) {
                        console.error('error', err);
                    }
                }));
            };
        /**
         * Construct S3 Object using AWS SDK
         */
        /**
         * Construct S3 Object using AWS SDK
         * @private
         * @return {?}
         */
        AnalyticsService.prototype.constructS3Object = /**
         * Construct S3 Object using AWS SDK
         * @private
         * @return {?}
         */
            function () {
                return new AWS.S3({
                    accessKeyId: environment.accessKeyId,
                    secretAccessKey: environment.secretAccessKey,
                    region: environment.region
                });
            };
        /**
         * Uploading captured base64 image to S3
         * @param image - Base64 String
         * @param screenshotName - Screenshot name linked with pageLoaded data
         */
        /**
         * Uploading captured base64 image to S3
         * @param {?} htmlTemplate
         * @param {?} screenshotName - Screenshot name linked with pageLoaded data
         * @return {?}
         */
        AnalyticsService.prototype.saveScreenshotsInS3 = /**
         * Uploading captured base64 image to S3
         * @param {?} htmlTemplate
         * @param {?} screenshotName - Screenshot name linked with pageLoaded data
         * @return {?}
         */
            function (htmlTemplate, screenshotName) {
                // converting the base64 to buffer data
                // const buffer: Buffer = bf.Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                // const buffer: Buffer = bf.Buffer.from(image, 'base64');
                // constructing the S3 object
                /** @type {?} */
                var s3Bucket = this.constructS3Object();
                // preparing data to be pushed to bucket
                /** @type {?} */
                var params = {
                    Bucket: environment.bucketName.screenshotBucket,
                    Key: new Date().toISOString().split('T')[0] + "/" + this.sessionId + "/screenshots/" + screenshotName + ".html",
                    Body: htmlTemplate,
                    ContentType: 'text/html'
                };
                /** Pushing to S3 bucket */
                s3Bucket.upload(params, ( /**
                 * @param {?} err
                 * @param {?} resData
                 * @return {?}
                 */function (err, resData) {
                    if (err) {
                        console.error(err);
                    }
                }));
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
                // Configuring the s3
                /** @type {?} */
                var s3Bucket = this.constructS3Object();
                data['sessionId'] = this.sessionId;
                // Setting the params for s3
                /** @type {?} */
                var params = {
                    Bucket: environment.bucketName.authenticatedBucket,
                    Key: new Date().toISOString().split('T')[0] + "_" + this.sessionId + "_console_errors_" + new Date().getTime() + ".json",
                    Body: JSON.stringify(data),
                    ContentType: 'json'
                };
                // Pushing the data to s3
                s3Bucket.putObject(params, ( /**
                 * @param {?} err
                 * @param {?} resData
                 * @return {?}
                 */function (err, resData) {
                    if (err) {
                        console.log(err);
                    }
                }));
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
         * @param {?=} eventComponent
         * @return {?}
         */
        AnalyticsService.prototype.setAnalyticsData = /**
         * Setting analytics object to be saved in S3 bucket
         * @param {?=} userData - Data transferred to Event Directive
         * @param {?=} eventDetails - Position of events
         * @param {?=} eventName  - Type of event
         * @param {?=} screenshotName  - file name of saved screenshot if the event is PageLoaded
         * @param {?=} eventComponent
         * @return {?}
         */
            function (userData, eventDetails, eventName, screenshotName, eventComponent) {
                if (userData === void 0) {
                    userData = {};
                }
                /** @type {?} */
                var analyticsBean = {
                    eventLabel: eventName,
                    eventComponent: eventComponent ? eventComponent : window.location.pathname.split('?')[0],
                    browser: window.navigator.userAgent,
                    fullURL: window.location.href,
                    resolution: window.innerWidth + 'x' + window.innerHeight,
                    xCoord: eventDetails['clientX'] !== undefined ? eventDetails['clientX'].toString() : '0',
                    yCoord: eventDetails['clientY'] !== undefined ? eventDetails['clientY'].toString() : '0',
                    pageXCoord: window.pageXOffset.toString() || '0',
                    pageYCoord: window.pageYOffset.toString() || '0',
                    eventTime: moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    screenshot: screenshotName,
                    additionalInfo: JSON.stringify(userData),
                    utm: this.getUTMParameters(window.location.href),
                    demographicInfo: JSON.stringify(this.demographicInfo)
                };
                return analyticsBean;
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
                return JSON.stringify(utmObject);
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
                this.httpService.get('https://ipapi.co/json/').subscribe(( /**
                 * @param {?} res
                 * @return {?}
                 */function (res) {
                    _this.demographicInfo = res;
                    _this.cookieService.set('demographic-info', JSON.stringify(res), new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7)));
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
                    this.previousUrl = data;
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
                var analyticsBean = this.analyticsService.setAnalyticsData(this.data, this.eventDetails, 'buttonClick', '');
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
                var analyticsBean = this.analyticsService.setAnalyticsData(this.data, event, 'scroll', '');
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
                var analyticsBean = this.analyticsService.setAnalyticsData(this.data, this.eventDetails, 'buttonHover', '');
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
        // Sets Whether the user is authenticated or not
        // Sets Whether the user is authenticated or not
        /**
         * @param {?} isAuth
         * @return {?}
         */
        EnvironmentService.prototype.setAuthentication =
            // Sets Whether the user is authenticated or not
            /**
             * @param {?} isAuth
             * @return {?}
             */
            function (isAuth) {
                environment.isAuth = isAuth;
            };
        // Setting credentials on environment
        // Setting credentials on environment
        /**
         * @param {?} credentials
         * @param {?} isPageLoadingToBeDetected
         * @return {?}
         */
        EnvironmentService.prototype.setCredentialsToEnvironment =
            // Setting credentials on environment
            /**
             * @param {?} credentials
             * @param {?} isPageLoadingToBeDetected
             * @return {?}
             */
            function (credentials, isPageLoadingToBeDetected) {
                environment.accessKeyId = credentials.accessKeyId;
                environment.fileName = credentials.fileName;
                environment.secretAccessKey = credentials.secretAccessKey;
                environment.sessionToken = credentials.sessionToken;
                environment.region = credentials.region;
                environment.isPageLoadingToBeDetected = isPageLoadingToBeDetected;
                if (credentials.bucketName.authenticatedBucket !== '' && credentials.bucketName.publicBucket !== '') {
                    environment.bucketName = {
                        authenticatedBucket: credentials.bucketName.authenticatedBucket,
                        publicBucket: credentials.bucketName.publicBucket,
                        screenshotBucket: credentials.bucketName.screenshotBucket
                    };
                }
                else {
                    /** @type {?} */
                    var bucketName = (credentials.bucketName.authenticatedBucket === '') ? credentials.bucketName.publicBucket :
                        credentials.bucketName.authenticatedBucket;
                    environment.bucketName = {
                        authenticatedBucket: bucketName,
                        publicBucket: bucketName,
                        screenshotBucket: credentials.bucketName.screenshotBucket
                    };
                }
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
                        _this.analyticsPushData(event);
                    }
                    /** Triggered when NavigationError event occurs */
                    if (event instanceof i1$1.NavigationError) {
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
                /** @type {?} */
                var screenshotName = new Date().getTime().toString();
                this.analyticsData = this.analyticsService.setAnalyticsData({}, {}, 'PageLoaded', screenshotName + ".html", event.url);
                this.waitTillPageLoad(screenshotName);
                // Data is send only when user configure the page loading to be true
                this.dataStorage.setUrlKey(this.analyticsData.eventComponent);
                this.dataStorage.appendToAnalyticsArray(this.analyticsData);
            };
        /**
         * Capturing Screenshot of the page
         * @param screenshotName uploaded screenshot name
         *
        public captureScreenshot(screenshotName: string): void {
          console.log('called');
          html2canvas(document.body, {
            logging: true,
            allowTaint: true,
            width: document.body.clientWidth,
            height: document.body.scrollHeight || window.innerHeight
          }).then((canvas) => {
            // this.analyticsService.saveScreenshotsInS3(canvas.toDataURL(), screenshotName);
            console.log('image uploading...');
          }).catch(error => {
            console.log('error', error);
          });
        }
        */
        /**
         * Waiting for page to load completely
         * @param event
         */
        /**
           * Capturing Screenshot of the page
           * @param screenshotName uploaded screenshot name
           *
          public captureScreenshot(screenshotName: string): void {
            console.log('called');
            html2canvas(document.body, {
              logging: true,
              allowTaint: true,
              width: document.body.clientWidth,
              height: document.body.scrollHeight || window.innerHeight
            }).then((canvas) => {
              // this.analyticsService.saveScreenshotsInS3(canvas.toDataURL(), screenshotName);
              console.log('image uploading...');
            }).catch(error => {
              console.log('error', error);
            });
          }
          */
        /**
         * Waiting for page to load completely
         * @param {?} screenshotName
         * @return {?}
         */
        RouterService.prototype.waitTillPageLoad = /**
           * Capturing Screenshot of the page
           * @param screenshotName uploaded screenshot name
           *
          public captureScreenshot(screenshotName: string): void {
            console.log('called');
            html2canvas(document.body, {
              logging: true,
              allowTaint: true,
              width: document.body.clientWidth,
              height: document.body.scrollHeight || window.innerHeight
            }).then((canvas) => {
              // this.analyticsService.saveScreenshotsInS3(canvas.toDataURL(), screenshotName);
              console.log('image uploading...');
            }).catch(error => {
              console.log('error', error);
            });
          }
          */
            /**
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
                        // _self.captureScreenshot(screenshotName);
                        _self.captureTemplate(screenshotName);
                    }
                }), 2000);
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
                var fullPageHTML = "<html>\n      <head>\n        " + this.processRegexOperations(this.document.head.innerHTML) + "\n        <style>body {scroll-behavior: smooth;}</style>\n      </head>\n      <body>\n        " + this.processRegexOperations(this.document.body.innerHTML) + "\n        <script>\n          window.addEventListener(\"message\", (e) => {\n            try{\n              if(e.customData) {\n              var data = JSON.parse(e.customData);\n              if (data.scroll) {\n                window.scroll(0, data.value);\n              };\n            }\n          }catch(e) {console.log(e);}\n          });\n        </script>\n      </body>\n    </html>";
                console.log('Full Page HTML ===>', fullPageHTML);
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
                return text.replace(/src=\"\//g, "src=\"" + window.location.origin + "/")
                    .replace(/url\(\"\//g, "url(\"" + window.location.origin + "/")
                    .replace(/href="\//g, "href=\"" + window.location.origin + "/")
                    .replace(/src=\'\//g, "src='" + window.location.origin + "/")
                    .replace(/url\(\'\//g, "url('" + window.location.origin + "/")
                    .replace(/href=\'\//g, "href='" + window.location.origin + "/")
                    .replace(/<script.*<\/script>/g, '')
                    .replace(/href="(?!http)/g, "href=\"" + window.location.origin + "/");
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
                var analyticsBean = this.analyticsService.setAnalyticsData(this.data, this.eventDetails, 'Mouse Move', '');
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
                    /** @type {?} */
                    var analyticsBean = analyticsService.setAnalyticsData(processedError, {}, 'ConsoleError', '');
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
    var NgS3AnalyticsModule = /** @class */ (function () {
        function NgS3AnalyticsModule(routerService, dataStorage, pointerService) {
            var _this = this;
            this.routerService = routerService;
            this.dataStorage = dataStorage;
            this.pointerService = pointerService;
            rxjs.interval(1000 * 10).subscribe(( /**
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
         * @param {?} credentials
         * @param {?=} isPageLoadingToBeDetected
         * @return {?}
         */
        NgS3AnalyticsModule.forRoot =
            // Configuring the initial setup for s3 bucket and page loading
            /**
             * @param {?} credentials
             * @param {?=} isPageLoadingToBeDetected
             * @return {?}
             */
            function (credentials, isPageLoadingToBeDetected) {
                if (isPageLoadingToBeDetected === void 0) {
                    isPageLoadingToBeDetected = false;
                }
                this.environmentService.setCredentialsToEnvironment(credentials, isPageLoadingToBeDetected);
                // Assigning the credentials to environment variables
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
    exports.ɵc = ScrollDirective;
    exports.ɵb = AnalyticsService;
    exports.ɵe = PointerService;
    exports.ɵf = RouterService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctczMtYW5hbHl0aWNzLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmctczMtYW5hbHl0aWNzL2xpYi9uZy1zMy1hbmFseXRpY3Muc2VydmljZS50cyIsIm5nOi8vbmctczMtYW5hbHl0aWNzL2xpYi9uZy1zMy1hbmFseXRpY3MuY29tcG9uZW50LnRzIixudWxsLCJuZzovL25nLXMzLWFuYWx5dGljcy9saWIvZW52aXJvbm1lbnQvZW52aXJvbm1lbnQudHMiLCJuZzovL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlLnRzIiwibmc6Ly9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZS50cyIsIm5nOi8vbmctczMtYW5hbHl0aWNzL2xpYi9kaXJlY3RpdmVzL2J1dHRvbi9idXR0b24uZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1zMy1hbmFseXRpY3MvbGliL2RpcmVjdGl2ZXMvc2Nyb2xsL3Njcm9sbC5kaXJlY3RpdmUudHMiLCJuZzovL25nLXMzLWFuYWx5dGljcy9saWIvZGlyZWN0aXZlcy9idXR0b24taG92ZXIvYnV0dG9uLWhvdmVyLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlLnRzIiwibmc6Ly9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL3JvdXRlci9yb3V0ZXIuc2VydmljZS50cyIsIm5nOi8vbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9wb2ludGVyL3BvaW50ZXIuc2VydmljZS50cyIsIm5nOi8vbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9lcnJvci1oYW5kbGVyL2Vycm9ySGFuZGxlci5zZXJ2aWNlLnRzIiwibmc6Ly9uZy1zMy1hbmFseXRpY3MvbGliL25nLXMzLWFuYWx5dGljcy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ1MzQW5hbHl0aWNzU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1uZy1zMy1hbmFseXRpY3MnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgbmctczMtYW5hbHl0aWNzIHdvcmtzIVxuICAgIDwvcD5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1MzQW5hbHl0aWNzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiZXhwb3J0IGxldCBlbnZpcm9ubWVudCA9IHtcbiAgICBhY2Nlc3NLZXlJZDogJycsXG4gICAgc2VjcmV0QWNjZXNzS2V5OiAnJyxcbiAgICBzZXNzaW9uVG9rZW46ICcnLFxuICAgIGJ1Y2tldE5hbWU6IHtcbiAgICAgICAgYXV0aGVudGljYXRlZEJ1Y2tldDogJycsXG4gICAgICAgIHB1YmxpY0J1Y2tldDogJycsXG4gICAgICAgIHNjcmVlbnNob3RCdWNrZXQ6ICcnXG4gICAgfSxcbiAgICBmaWxlTmFtZTogJycsXG4gICAgcmVsYXRpdmVGb2xkZXJzOiBbXSxcbiAgICByZWdpb246ICcnLFxuICAgIGlzQXV0aDogZmFsc2UsXG4gICAgaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDogdHJ1ZVxufTtcblxuXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBBV1MgZnJvbSAnYXdzLXNkayc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50JztcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgKiBhcyBiZiBmcm9tICdidWZmZXInO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICduZ3gtY29va2llLXNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG4vKipcbiAqIEFuYWx5dGljcyBTZXJ2aWNlXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFuYWx5dGljc1NlcnZpY2Uge1xuXG4gIC8qKlxuICAgKiBTZXNzaW9uSWQgb2YgcGx1Z2luXG4gICAqL1xuICBzZXNzaW9uSWQ6IHN0cmluZztcbiAgZGVtb2dyYXBoaWNJbmZvOiBhbnkgPSB7fTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlLCBwcml2YXRlIGh0dHBTZXJ2aWNlOiBIdHRwQ2xpZW50KSB7XG4gICAgaWYgKCF0aGlzLmNvb2tpZVNlcnZpY2UuY2hlY2soJ2RlbW9ncmFwaGljLWluZm8nKSkge1xuICAgICAgdGhpcy5nZXRJcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlbW9ncmFwaGljSW5mbyA9IEpTT04ucGFyc2UodGhpcy5jb29raWVTZXJ2aWNlLmdldCgnZGVtb2dyYXBoaWMtaW5mbycpKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTZXNzaW9uSWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja2luZyB3aGV0aGVyIHNlc3Npb25JZCBwcmVzZW50IGluIGNvb2tpZSBvciBub3RcbiAgICogaWYgbm8gc2Vzc2lvbiBpZCBjb29raWUgcHJlc2VudCwgYWRkaW5nIG5ldyBzZXNzaW9uIGlkIG90aGVyd2lzZSByZXVzaW5nIHRoZSBzZXNzaW9uIGlkIHZhbHVlXG4gICAqL1xuICBwcml2YXRlIHNldFNlc3Npb25JZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb29raWVTZXJ2aWNlLmNoZWNrKCduZ1MzQW5hbHl0aWNzU2Vzc2lvbklkJykpIHtcbiAgICAgIHRoaXMuc2Vzc2lvbklkID0gdGhpcy5jb29raWVTZXJ2aWNlLmdldCgnbmdTM0FuYWx5dGljc1Nlc3Npb25JZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlc3Npb25JZCA9IHV1aWQudjQoKTtcbiAgICAgIHRoaXMuY29va2llU2VydmljZS5zZXQoJ25nUzNBbmFseXRpY3NTZXNzaW9uSWQnLCB0aGlzLnNlc3Npb25JZCwgbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoMTAwMCAqIDYwICogNjApKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgQW5hbHl0aWNzIGRhdGEgdG8gZGlmZmVyZW50IGJ1Y2tldCBiYXNlZCBvbiBBdXRoZW50aWNhdGlvbiBmbGFnXG4gICAqIEBwYXJhbSBkYXRhIFxuICAgKi9cbiAgcHVibGljIHB1c2hEYXRhKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGlmIChlbnZpcm9ubWVudC5pc0F1dGgpIHtcbiAgICAgIHRoaXMucHVibGlzaFRPQXV0aFMzKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnB1Ymxpc2hUT1VuQXV0aFMzKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIGRhdGEgdG8gVW5BdXRoZW50aWNhdGVkIEJ1Y2tldCBTM1xuICAgKiBAcGFyYW0gZGF0YSBcbiAgICovXG4gIHByaXZhdGUgcHVibGlzaFRPVW5BdXRoUzMoZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAvKioqIENvbnN0cnVjdCBTMyBCdWNrZXQgb2JqZWN0ICovXG4gICAgY29uc3QgczNCdWNrZXQ6IEFXUy5TMyA9IHRoaXMuY29uc3RydWN0UzNPYmplY3QoKTtcblxuICAgIC8qKiogU2V0dGluZyB0aGUgcGFyYW1zIGZvciBzMyAqL1xuICAgIGNvbnN0IHBhcmFtczogeyBCdWNrZXQ6IHN0cmluZywgS2V5OiBzdHJpbmcsIEJvZHk6IHN0cmluZywgQ29udGVudFR5cGU6IHN0cmluZyB9ID0ge1xuICAgICAgQnVja2V0OiBlbnZpcm9ubWVudC5idWNrZXROYW1lLnB1YmxpY0J1Y2tldCxcbiAgICAgIEtleTogYCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19XyR7dGhpcy5zZXNzaW9uSWR9XyR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfS5qc29uYCxcbiAgICAgIEJvZHk6IHRoaXMucHJvY2Vzc0ZvckF0aGVuYShkYXRhLmV2ZW50VmFsdWVzKSxcbiAgICAgIENvbnRlbnRUeXBlOiAnanNvbidcbiAgICB9O1xuXG4gICAgLyoqKiBQdXNoaW5nIHRoZSBkYXRhIHRvIHMzICovXG4gICAgczNCdWNrZXQucHV0T2JqZWN0KHBhcmFtcywgKGVycjogQVdTLkFXU0Vycm9yLCByZXNEYXRhOiBhbnkpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRpbmcgSlNPTiBBcnJheSB0byBzdHJpbmcgXG4gICAqIEBwYXJhbSBkYXRhIFxuICAgKi9cbiAgcHJvY2Vzc0ZvckF0aGVuYShkYXRhOiBBcnJheTxBbmFseXRpY3NCZWFuPik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGRhdGEubWFwKChvYmplY3Q6IGFueSkgPT4ge1xuICAgICAgb2JqZWN0WydzZXNzaW9uSWQnXSA9IHRoaXMuc2Vzc2lvbklkO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iamVjdCk7XG4gICAgfSkuam9pbignXFxuJyk7XG4gIH1cblxuICAvKipcbiAgICAqIFB1c2hpbmcgZGF0YSB0byBBdXRoZW50aWNhdGVkIEJ1Y2tldCBTM1xuICAgICogQHBhcmFtIGRhdGEgXG4gICAgKi9cbiAgcHVibGlzaFRPQXV0aFMzKGRhdGE6IGFueSkge1xuXG4gICAgLyoqKiBDb25zdHJ1Y3QgUzMgQnVja2V0IG9iamVjdCAqL1xuICAgIGNvbnN0IHMzQnVja2V0OiBBV1MuUzMgPSB0aGlzLmNvbnN0cnVjdFMzT2JqZWN0KCk7XG4gICAgLyoqKiBTZXR0aW5nIHRoZSBwYXJhbXMgZm9yIHMzICovXG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgQnVja2V0OiBlbnZpcm9ubWVudC5idWNrZXROYW1lLmF1dGhlbnRpY2F0ZWRCdWNrZXQsXG4gICAgICBLZXk6IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfV8ke3RoaXMuc2Vzc2lvbklkfV8ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKX0uanNvbmAsXG4gICAgICBCb2R5OiB0aGlzLnByb2Nlc3NGb3JBdGhlbmEoZGF0YS5ldmVudFZhbHVlcyksXG4gICAgICBDb250ZW50VHlwZTogJ2pzb24nXG4gICAgfTtcbiAgICAvKioqIFB1c2hpbmcgdGhlIGRhdGEgdG8gczMgKi9cbiAgICBzM0J1Y2tldC5wdXRPYmplY3QocGFyYW1zLCAoZXJyOiBBV1MuQVdTRXJyb3IsIHJlc0RhdGE6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdlcnJvcicsIGVycik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBTMyBPYmplY3QgdXNpbmcgQVdTIFNES1xuICAgKi9cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RTM09iamVjdCgpOiBBV1MuUzMge1xuICAgIHJldHVybiBuZXcgQVdTLlMzKHtcbiAgICAgIGFjY2Vzc0tleUlkOiBlbnZpcm9ubWVudC5hY2Nlc3NLZXlJZCxcbiAgICAgIHNlY3JldEFjY2Vzc0tleTogZW52aXJvbm1lbnQuc2VjcmV0QWNjZXNzS2V5LFxuICAgICAgcmVnaW9uOiBlbnZpcm9ubWVudC5yZWdpb25cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGxvYWRpbmcgY2FwdHVyZWQgYmFzZTY0IGltYWdlIHRvIFMzXG4gICAqIEBwYXJhbSBpbWFnZSAtIEJhc2U2NCBTdHJpbmdcbiAgICogQHBhcmFtIHNjcmVlbnNob3ROYW1lIC0gU2NyZWVuc2hvdCBuYW1lIGxpbmtlZCB3aXRoIHBhZ2VMb2FkZWQgZGF0YVxuICAgKi9cbiAgcHVibGljIHNhdmVTY3JlZW5zaG90c0luUzMoaHRtbFRlbXBsYXRlOiBzdHJpbmcsIHNjcmVlbnNob3ROYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBjb252ZXJ0aW5nIHRoZSBiYXNlNjQgdG8gYnVmZmVyIGRhdGFcbiAgICAvLyBjb25zdCBidWZmZXI6IEJ1ZmZlciA9IGJmLkJ1ZmZlci5mcm9tKGltYWdlLnJlcGxhY2UoL15kYXRhOmltYWdlXFwvXFx3KztiYXNlNjQsLywgJycpLCAnYmFzZTY0Jyk7XG4gICAgLy8gY29uc3QgYnVmZmVyOiBCdWZmZXIgPSBiZi5CdWZmZXIuZnJvbShpbWFnZSwgJ2Jhc2U2NCcpO1xuICAgIC8vIGNvbnN0cnVjdGluZyB0aGUgUzMgb2JqZWN0XG4gICAgY29uc3QgczNCdWNrZXQ6IEFXUy5TMyA9IHRoaXMuY29uc3RydWN0UzNPYmplY3QoKTtcbiAgICAvLyBwcmVwYXJpbmcgZGF0YSB0byBiZSBwdXNoZWQgdG8gYnVja2V0XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgQnVja2V0OiBlbnZpcm9ubWVudC5idWNrZXROYW1lLnNjcmVlbnNob3RCdWNrZXQsXG4gICAgICBLZXk6IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfS8ke3RoaXMuc2Vzc2lvbklkfS9zY3JlZW5zaG90cy8ke3NjcmVlbnNob3ROYW1lfS5odG1sYCxcbiAgICAgIEJvZHk6IGh0bWxUZW1wbGF0ZSxcbiAgICAgIENvbnRlbnRUeXBlOiAndGV4dC9odG1sJ1xuICAgIH07XG5cbiAgICAvKiogUHVzaGluZyB0byBTMyBidWNrZXQgKi9cbiAgICBzM0J1Y2tldC51cGxvYWQocGFyYW1zLCAoZXJyOiBBV1MuQVdTRXJyb3IsIHJlc0RhdGE6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBjb25zb2xlIGVycm9ycyB0byBTMyBidWNrZXRcbiAgICogQHBhcmFtIGRhdGEgXG4gICAqL1xuICBwdWJsaWMgcHVibGlzaENvbnNvbGVFcnJvcnMoZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAvLyBDb25maWd1cmluZyB0aGUgczNcbiAgICBjb25zdCBzM0J1Y2tldDogQVdTLlMzID0gdGhpcy5jb25zdHJ1Y3RTM09iamVjdCgpO1xuICAgIGRhdGFbJ3Nlc3Npb25JZCddID0gdGhpcy5zZXNzaW9uSWQ7XG5cbiAgICAvLyBTZXR0aW5nIHRoZSBwYXJhbXMgZm9yIHMzXG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgQnVja2V0OiBlbnZpcm9ubWVudC5idWNrZXROYW1lLmF1dGhlbnRpY2F0ZWRCdWNrZXQsXG4gICAgICBLZXk6IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfV8ke3RoaXMuc2Vzc2lvbklkfV9jb25zb2xlX2Vycm9yc18ke25ldyBEYXRlKCkuZ2V0VGltZSgpfS5qc29uYCxcbiAgICAgIEJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgQ29udGVudFR5cGU6ICdqc29uJ1xuICAgIH07XG4gICAgLy8gUHVzaGluZyB0aGUgZGF0YSB0byBzM1xuICAgIHMzQnVja2V0LnB1dE9iamVjdChwYXJhbXMsIChlcnI6IEFXUy5BV1NFcnJvciwgcmVzRGF0YTogYW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIFNldHRpbmcgYW5hbHl0aWNzIG9iamVjdCB0byBiZSBzYXZlZCBpbiBTMyBidWNrZXRcbiAgICogQHBhcmFtIHVzZXJEYXRhIC0gRGF0YSB0cmFuc2ZlcnJlZCB0byBFdmVudCBEaXJlY3RpdmVcbiAgICogQHBhcmFtIGV2ZW50RGV0YWlscyAtIFBvc2l0aW9uIG9mIGV2ZW50c1xuICAgKiBAcGFyYW0gZXZlbnROYW1lICAtIFR5cGUgb2YgZXZlbnRcbiAgICogQHBhcmFtIHNjcmVlbnNob3ROYW1lICAtIGZpbGUgbmFtZSBvZiBzYXZlZCBzY3JlZW5zaG90IGlmIHRoZSBldmVudCBpcyBQYWdlTG9hZGVkXG4gICAqL1xuICBzZXRBbmFseXRpY3NEYXRhKFxuICAgIHVzZXJEYXRhOiBhbnkgPSB7fSxcbiAgICBldmVudERldGFpbHM6IGFueSxcbiAgICBldmVudE5hbWU6IHN0cmluZyxcbiAgICBzY3JlZW5zaG90TmFtZTogc3RyaW5nLFxuICAgIGV2ZW50Q29tcG9uZW50Pzogc3RyaW5nKTogQW5hbHl0aWNzQmVhbiB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9IHtcbiAgICAgIGV2ZW50TGFiZWw6IGV2ZW50TmFtZSxcbiAgICAgIGV2ZW50Q29tcG9uZW50OiBldmVudENvbXBvbmVudCA/IGV2ZW50Q29tcG9uZW50IDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCc/JylbMF0sXG4gICAgICBicm93c2VyOiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgIGZ1bGxVUkw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgcmVzb2x1dGlvbjogd2luZG93LmlubmVyV2lkdGggKyAneCcgKyB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgICB4Q29vcmQ6IGV2ZW50RGV0YWlsc1snY2xpZW50WCddICE9PSB1bmRlZmluZWQgPyBldmVudERldGFpbHNbJ2NsaWVudFgnXS50b1N0cmluZygpIDogJzAnIHx8ICcwJyxcbiAgICAgIHlDb29yZDogZXZlbnREZXRhaWxzWydjbGllbnRZJ10gIT09IHVuZGVmaW5lZCA/IGV2ZW50RGV0YWlsc1snY2xpZW50WSddLnRvU3RyaW5nKCkgOiAnMCcgfHwgJzAnLFxuICAgICAgcGFnZVhDb29yZDogd2luZG93LnBhZ2VYT2Zmc2V0LnRvU3RyaW5nKCkgfHwgJzAnLFxuICAgICAgcGFnZVlDb29yZDogd2luZG93LnBhZ2VZT2Zmc2V0LnRvU3RyaW5nKCkgfHwgJzAnLFxuICAgICAgZXZlbnRUaW1lOiBtb21lbnQudXRjKG5ldyBEYXRlKCkpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxuICAgICAgc2NyZWVuc2hvdDogc2NyZWVuc2hvdE5hbWUsXG4gICAgICBhZGRpdGlvbmFsSW5mbzogSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpLFxuICAgICAgdXRtOiB0aGlzLmdldFVUTVBhcmFtZXRlcnMod2luZG93LmxvY2F0aW9uLmhyZWYpLFxuICAgICAgZGVtb2dyYXBoaWNJbmZvOiBKU09OLnN0cmluZ2lmeSh0aGlzLmRlbW9ncmFwaGljSW5mbylcbiAgICB9O1xuICAgIHJldHVybiBhbmFseXRpY3NCZWFuO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHRpbmcgVVRNIFBhcmFtZXRlcnMgYnkgcHJvY2Vzc2luZyBjdXJyZW50IHBhZ2VVUkxcbiAgICogQHBhcmFtIHVybCAtIFBhZ2UgVVJMXG4gICAqL1xuICBwcml2YXRlIGdldFVUTVBhcmFtZXRlcnModXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHV0bU9iamVjdCA9IHt9O1xuICAgIGlmICh1cmwuaW5jbHVkZXMoJ3V0bScpKSB7XG4gICAgICBjb25zdCB1dG1QYXJhbXMgPSB1cmwuc3BsaXQoJz8nKVsxXS5zcGxpdCgnJicpO1xuICAgICAgdXRtUGFyYW1zLm1hcChwYXJhbSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHBhcmFtLnNwbGl0KCc9Jyk7XG4gICAgICAgIHV0bU9iamVjdFtwYXJhbXNbMF1dID0gcGFyYW1zWzFdO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1dG1PYmplY3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB1c2VyIGRlbW9ncmFwaGljIGluZm9ybWF0aW9uIGluIGNvb2tpZXNcbiAgICovXG4gIHByaXZhdGUgZ2V0SXAoKTogdm9pZCB7XG4gICAgdGhpcy5odHRwU2VydmljZS5nZXQoJ2h0dHBzOi8vaXBhcGkuY28vanNvbi8nKS5zdWJzY3JpYmUoXG4gICAgICAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5kZW1vZ3JhcGhpY0luZm8gPSByZXM7XG4gICAgICAgIHRoaXMuY29va2llU2VydmljZS5zZXQoJ2RlbW9ncmFwaGljLWluZm8nLCBKU09OLnN0cmluZ2lmeShyZXMpLCBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArICgxMDAwICogNjAgKiA2MCAqIDI0ICogNykpKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBEYXRhU3RvcmFnZVNlcnZpY2Uge1xuXG4gIGFsbERhdGFBbmFseXRpY3NBcnJheTogQXJyYXk8YW55PiA9IFtdO1xuICBhbGxEYXRhQW5hbHl0aWNzOiB7XG4gICAgcGFnZVVybDogc3RyaW5nLFxuICAgIGV2ZW50VmFsdWVzOiBBcnJheTxhbnk+XG4gIH07XG4gIHByZXZpb3VzVXJsOiBzdHJpbmc7XG4gIGtleXM6IEFycmF5PGFueT4gPSBbXTtcbiAgZXZlbnRDb2xsZWN0b3IgPSBuZXcgTWFwKCk7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYW5hbHl0aWNhbFNlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XG4gIHByaXZhdGUgcm91dGVEZXRhaWxzOiBhbnkgPSBbXTtcbiAgY291bnQgPSAwO1xuICBzZXRVcmxLZXkoZGF0YTogc3RyaW5nKSB7XG4gICAgbGV0IGZsYWcgPSAwO1xuICAgIGlmICh0aGlzLnByZXZpb3VzVXJsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZXZlbnRDb2xsZWN0b3Iuc2V0KGRhdGEsIFtdKTtcbiAgICAgIHRoaXMucHJldmlvdXNVcmwgPSBkYXRhO1xuICAgIH0gZWxzZSBpZiAoIShkYXRhID09PSB0aGlzLnByZXZpb3VzVXJsKSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmtleXMoKSkpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gZGF0YSkge1xuICAgICAgICAgIGZsYWcgPSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZmxhZyA9PT0gMCkge1xuICAgICAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLnNldChkYXRhLCBbXSk7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXZpb3VzVXJsID0gZGF0YTtcbiAgICB9XG4gIH1cbiAgYXBwZW5kVG9BbmFseXRpY3NBcnJheShkYXRhOiBBbmFseXRpY3NCZWFuKSB7XG4gICAgdGhpcy5ldmVudENvbGxlY3Rvci5nZXQodGhpcy5wcmV2aW91c1VybCkucHVzaChkYXRhKTtcbiAgfVxuXG4gIHB1c2hEYXRhQXJyYXlUb1MzKCkge1xuICAgIHRoaXMuY291bnQrKztcbiAgICAvLyB0aGlzLmFsbERhdGFBbmFseXRpY3NNYXAgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KEFycmF5LmZyb20odGhpcy5ldmVudENvbGxlY3Rvci5rZXlzKCkpKSk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmtleXMoKSkpIHtcbiAgICAgIHRoaXMuYWxsRGF0YUFuYWx5dGljcyA9IHtcbiAgICAgICAgcGFnZVVybDoga2V5LFxuICAgICAgICBldmVudFZhbHVlczogQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmdldChrZXkpLnZhbHVlcygpKVxuICAgICAgfTtcbiAgICAgIHRoaXMua2V5cy5wdXNoKGtleSk7XG4gICAgICBpZiAodGhpcy5hbGxEYXRhQW5hbHl0aWNzLmV2ZW50VmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5hbmFseXRpY2FsU2VydmljZS5wdXNoRGF0YSh0aGlzLmFsbERhdGFBbmFseXRpY3MpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLmNsZWFyKCk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5rZXlzKSB7XG4gICAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLnNldChrZXksIFtdKTtcbiAgICB9XG4gIH1cblxuICBzZXRSb3V0ZURldGFpbHMocm91dGVEZXRhaWxzOiBhbnkpIHtcbiAgICB0aGlzLnJvdXRlRGV0YWlscyA9IHJvdXRlRGV0YWlscztcbiAgfVxuXG4gIGdldFJvdXRlRGV0YWlscygpIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZURldGFpbHM7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuXG4vKipcbiAqIEJ1dHRvbiBEaXJlY3RpdmUgdG8gdHJhY2sgY2xpY2sgZXZlbnRcbiAqIFNlbGVjdG9yIGNhbiBiZSBhZGRlZCB0byBhbnkgSFRNTCBFbGVtZW50XG4gKi9cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1t0cmFjay1idG5dJ1xufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25EaXJlY3RpdmUge1xuXG4gIC8vIEdldHMgaW1wb3J0YW50IGRhdGEgYWJvdXQgdGhlIGJ1dHRvbiBleHBsaWNpdGx5IGZyb20gdGhlIGFwcGxpY2F0aW9uXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgndHJhY2stYnRuJykgZGF0YTogYW55ID0ge307XG5cbiAgZXZlbnREZXRhaWxzOiBhbnk7XG5cbiAgLyoqXG4gICAqIEJ1dHRvbiBUcmFja2luZyAtIENvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBkYXRhU3RvcmFnZSAtIERhdGFTdG9yYWdlU2VydmljZVxuICAgKiBAcGFyYW0gYW5hbHl0aWNzU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLCBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UpIHsgfVxuXG5cbiAgLyoqXG4gICAqICBMaXN0ZW4gdG8gYnV0dG9uIGNsaWNrIGFjdGlvbnNcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSkgb25DbGljaygkZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuZXZlbnREZXRhaWxzID0gJGV2ZW50O1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZW5kRGF0YSgpO1xuICAgIH0sIDEwKTtcbiAgfVxuXG4gIC8qKiBTZW5kaW5nIGRhdGEgb24gYnV0dG9uIGNsaWNrICovXG4gIHB1YmxpYyBzZW5kRGF0YSgpOiB2b2lkIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgdGhpcy5ldmVudERldGFpbHMsICdidXR0b25DbGljaycsICcnKTtcbiAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgT25DaGFuZ2VzLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuXG5ARGlyZWN0aXZlKHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW3RyYWNrLXNjcm9sbF0nXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICAvLyBHZXRzIGltcG9ydGFudCBkYXRhIGFib3V0IHRoZSBjb21wb25lbnQgZXhwbGljaXRseSBmcm9tIHRoZSBhcHBsaWNhdGlvblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gICAgQElucHV0KCd0cmFjay1zY3JvbGwnKSBkYXRhOiBhbnkgPSB7fTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZVxuICAgICkgeyB9XG5cbiAgICAvLyBDYXB0dXJlIHRoZSBjaGFuZ2UgaW4gZGF0YVxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlO1xuICAgIH1cblxuICAgIC8vIFRyaWdnZXJlZCB3aGVuIGFueSBzY3JvbGwgZXZlbnQgb2NjdXJzXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnNjcm9sbCcsIFsnJGV2ZW50J10pIG9uU2Nyb2xsRXZlbnQoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbmREYXRhKCRldmVudCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc2VuZERhdGEoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgICAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgZXZlbnQsICdzY3JvbGwnLCAnJyk7XG4gICAgICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcblxuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW3RyYWNrLWJ1dHRvbkhvdmVyXSdcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uSG92ZXJEaXJlY3RpdmUge1xuICAvKiogKi9cbiAgZXZlbnREZXRhaWxzOiBhbnk7XG4gIC8vIEdldHMgaW1wb3J0YW50IGRhdGEgYWJvdXQgdGhlIGJ1dHRvbiBleHBsaWNpdGx5IGZyb20gdGhlIGFwcGxpY2F0aW9uXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgndHJhY2stYnV0dG9uSG92ZXInKSBkYXRhOiBhbnkgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSkgeyB9XG5cbiAgLy8gTGlzdGVuIHRvIGJ1dHRvbiBob3ZlciBhY3Rpb25zXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3ZlcicsIFsnJGV2ZW50J10pIG9uTW91c2VPdmVyKCRldmVudDogYW55KSB7XG4gICAgdGhpcy5ldmVudERldGFpbHMgPSAkZXZlbnQ7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNlbmREYXRhKCk7XG4gICAgfSwgMTApO1xuICB9XG5cbiAgLy8gU2VuZGluZyBkYXRhIG9uIGJ1dHRvbiBob3ZlclxuICBwdWJsaWMgc2VuZERhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIHRoaXMuZXZlbnREZXRhaWxzLCAnYnV0dG9uSG92ZXInLCAnJyk7XG4gICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICB9XG59XG4iLCJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgQ3JlZGVudGlhbHNCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcblxuZXhwb3J0IGNsYXNzIEVudmlyb25tZW50U2VydmljZSB7XG5cbiAgLy8gU2V0cyBXaGV0aGVyIHRoZSB1c2VyIGlzIGF1dGhlbnRpY2F0ZWQgb3Igbm90XG4gIHNldEF1dGhlbnRpY2F0aW9uKGlzQXV0aDogYm9vbGVhbikge1xuICAgIGVudmlyb25tZW50LmlzQXV0aCA9IGlzQXV0aDtcbiAgfVxuXG4gIC8vIFNldHRpbmcgY3JlZGVudGlhbHMgb24gZW52aXJvbm1lbnRcbiAgc2V0Q3JlZGVudGlhbHNUb0Vudmlyb25tZW50KGNyZWRlbnRpYWxzOiBDcmVkZW50aWFsc0JlYW4sIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICBlbnZpcm9ubWVudC5hY2Nlc3NLZXlJZCA9IGNyZWRlbnRpYWxzLmFjY2Vzc0tleUlkO1xuICAgIGVudmlyb25tZW50LmZpbGVOYW1lID0gY3JlZGVudGlhbHMuZmlsZU5hbWU7XG4gICAgZW52aXJvbm1lbnQuc2VjcmV0QWNjZXNzS2V5ID0gY3JlZGVudGlhbHMuc2VjcmV0QWNjZXNzS2V5O1xuICAgIGVudmlyb25tZW50LnNlc3Npb25Ub2tlbiA9IGNyZWRlbnRpYWxzLnNlc3Npb25Ub2tlbjtcbiAgICBlbnZpcm9ubWVudC5yZWdpb24gPSBjcmVkZW50aWFscy5yZWdpb247XG4gICAgZW52aXJvbm1lbnQuaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZCA9IGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ7XG4gICAgaWYgKGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUuYXV0aGVudGljYXRlZEJ1Y2tldCAhPT0gJycgJiYgY3JlZGVudGlhbHMuYnVja2V0TmFtZS5wdWJsaWNCdWNrZXQgIT09ICcnKSB7XG4gICAgICBlbnZpcm9ubWVudC5idWNrZXROYW1lID0ge1xuICAgICAgICBhdXRoZW50aWNhdGVkQnVja2V0OiBjcmVkZW50aWFscy5idWNrZXROYW1lLmF1dGhlbnRpY2F0ZWRCdWNrZXQsXG4gICAgICAgIHB1YmxpY0J1Y2tldDogY3JlZGVudGlhbHMuYnVja2V0TmFtZS5wdWJsaWNCdWNrZXQsXG4gICAgICAgIHNjcmVlbnNob3RCdWNrZXQ6IGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUuc2NyZWVuc2hvdEJ1Y2tldFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYnVja2V0TmFtZSA9IChjcmVkZW50aWFscy5idWNrZXROYW1lLmF1dGhlbnRpY2F0ZWRCdWNrZXQgPT09ICcnKSA/IGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUucHVibGljQnVja2V0IDpcbiAgICAgICAgY3JlZGVudGlhbHMuYnVja2V0TmFtZS5hdXRoZW50aWNhdGVkQnVja2V0O1xuICAgICAgZW52aXJvbm1lbnQuYnVja2V0TmFtZSA9IHtcbiAgICAgICAgYXV0aGVudGljYXRlZEJ1Y2tldDogYnVja2V0TmFtZSxcbiAgICAgICAgcHVibGljQnVja2V0OiBidWNrZXROYW1lLFxuICAgICAgICBzY3JlZW5zaG90QnVja2V0OiBjcmVkZW50aWFscy5idWNrZXROYW1lLnNjcmVlbnNob3RCdWNrZXRcbiAgICAgIH07XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCwgTmF2aWdhdGlvbkVycm9yIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG4vLyBpbXBvcnQgaHRtbDJjYW52YXMgZnJvbSAnaHRtbDJjYW52YXMnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJvdXRlclNlcnZpY2Uge1xuICBhbmFseXRpY3NEYXRhOiBBbmFseXRpY3NCZWFuO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlczogUm91dGVyLCBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSxcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55KSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFja2luZyByb3V0ZXIgZXZlbnRzXG4gICAqL1xuICBwdWJsaWMgdHJhY2tSb3V0ZXJFdmVudHMoKTogdm9pZCB7XG4gICAgLyoqIFRyaWdnZXJlZCB3aGVuIGN1cnJlbnQgcGFnZSBpcyBsb2FkZWQgKi9cbiAgICB0aGlzLnJvdXRlcy5ldmVudHMuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgLyoqIFRyaWdnZXJlZCB3aGVuIE5hdmlnYXRpb25FbmQgZXZlbnQgb2NjdXJzICovXG4gICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XG4gICAgICAgIHRoaXMuYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQpO1xuICAgICAgfVxuXG4gICAgICAvKiogVHJpZ2dlcmVkIHdoZW4gTmF2aWdhdGlvbkVycm9yIGV2ZW50IG9jY3VycyAqL1xuICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yKSB7XG4gICAgICAgIHRoaXMuYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgYW5hbHl0aWNzIGRhdGFcbiAgICogQHBhcmFtIGV2ZW50IC0gUm91dGVyIEV2ZW50XG4gICAqL1xuICBwdWJsaWMgYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHNjcmVlbnNob3ROYW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkudG9TdHJpbmcoKTtcbiAgICB0aGlzLmFuYWx5dGljc0RhdGEgPSB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh7fSwge30sICdQYWdlTG9hZGVkJywgYCR7c2NyZWVuc2hvdE5hbWV9Lmh0bWxgLCBldmVudC51cmwpO1xuICAgIHRoaXMud2FpdFRpbGxQYWdlTG9hZChzY3JlZW5zaG90TmFtZSk7XG4gICAgLy8gRGF0YSBpcyBzZW5kIG9ubHkgd2hlbiB1c2VyIGNvbmZpZ3VyZSB0aGUgcGFnZSBsb2FkaW5nIHRvIGJlIHRydWVcbiAgICB0aGlzLmRhdGFTdG9yYWdlLnNldFVybEtleSh0aGlzLmFuYWx5dGljc0RhdGEuZXZlbnRDb21wb25lbnQpO1xuICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheSh0aGlzLmFuYWx5dGljc0RhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhcHR1cmluZyBTY3JlZW5zaG90IG9mIHRoZSBwYWdlXG4gICAqIEBwYXJhbSBzY3JlZW5zaG90TmFtZSB1cGxvYWRlZCBzY3JlZW5zaG90IG5hbWVcbiAgICpcbiAgcHVibGljIGNhcHR1cmVTY3JlZW5zaG90KHNjcmVlbnNob3ROYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnY2FsbGVkJyk7XG4gICAgaHRtbDJjYW52YXMoZG9jdW1lbnQuYm9keSwge1xuICAgICAgbG9nZ2luZzogdHJ1ZSxcbiAgICAgIGFsbG93VGFpbnQ6IHRydWUsXG4gICAgICB3aWR0aDogZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCxcbiAgICAgIGhlaWdodDogZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQgfHwgd2luZG93LmlubmVySGVpZ2h0XG4gICAgfSkudGhlbigoY2FudmFzKSA9PiB7XG4gICAgICAvLyB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2F2ZVNjcmVlbnNob3RzSW5TMyhjYW52YXMudG9EYXRhVVJMKCksIHNjcmVlbnNob3ROYW1lKTtcbiAgICAgIGNvbnNvbGUubG9nKCdpbWFnZSB1cGxvYWRpbmcuLi4nKTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnZXJyb3InLCBlcnJvcik7XG4gICAgfSk7XG4gIH1cbiAgKi9cblxuXG4gIC8qKlxuICAgKiBXYWl0aW5nIGZvciBwYWdlIHRvIGxvYWQgY29tcGxldGVseVxuICAgKiBAcGFyYW0gZXZlbnQgXG4gICAqL1xuICB3YWl0VGlsbFBhZ2VMb2FkKHNjcmVlbnNob3ROYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5kb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAvLyBfc2VsZi5jYXB0dXJlU2NyZWVuc2hvdChzY3JlZW5zaG90TmFtZSk7XG4gICAgICAgIF9zZWxmLmNhcHR1cmVUZW1wbGF0ZShzY3JlZW5zaG90TmFtZSk7XG4gICAgICB9XG4gICAgfSwgMjAwMCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FwdHVyZSB0ZW1wbGF0ZSBvZiBsb2FkZWQgdmlld1xuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgLSBTY3JlZW5zaG90IGltYWdlXG4gICAqL1xuICBjYXB0dXJlVGVtcGxhdGUoc2NyZWVuc2hvdE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZ1bGxQYWdlSFRNTCA9IGA8aHRtbD5cbiAgICAgIDxoZWFkPlxuICAgICAgICAke3RoaXMucHJvY2Vzc1JlZ2V4T3BlcmF0aW9ucyh0aGlzLmRvY3VtZW50LmhlYWQuaW5uZXJIVE1MKX1cbiAgICAgICAgPHN0eWxlPmJvZHkge3Njcm9sbC1iZWhhdmlvcjogc21vb3RoO308L3N0eWxlPlxuICAgICAgPC9oZWFkPlxuICAgICAgPGJvZHk+XG4gICAgICAgICR7dGhpcy5wcm9jZXNzUmVnZXhPcGVyYXRpb25zKHRoaXMuZG9jdW1lbnQuYm9keS5pbm5lckhUTUwpfVxuICAgICAgICA8c2NyaXB0PlxuICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICBpZihlLmN1c3RvbURhdGEpIHtcbiAgICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKGUuY3VzdG9tRGF0YSk7XG4gICAgICAgICAgICAgIGlmIChkYXRhLnNjcm9sbCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGwoMCwgZGF0YS52YWx1ZSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfWNhdGNoKGUpIHtjb25zb2xlLmxvZyhlKTt9XG4gICAgICAgICAgfSk7XG4gICAgICAgIDwvc2NyaXB0PlxuICAgICAgPC9ib2R5PlxuICAgIDwvaHRtbD5gO1xuXG4gICAgY29uc29sZS5sb2coJ0Z1bGwgUGFnZSBIVE1MID09PT4nLCBmdWxsUGFnZUhUTUwpO1xuXG4gICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNhdmVTY3JlZW5zaG90c0luUzMoZnVsbFBhZ2VIVE1MLCBzY3JlZW5zaG90TmFtZSk7XG4gIH1cblxuXG4gIHByb2Nlc3NSZWdleE9wZXJhdGlvbnModGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC9zcmM9XFxcIlxcLy9nLCBgc3JjPVwiJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9gKVxuICAgICAgLnJlcGxhY2UoL3VybFxcKFxcXCJcXC8vZywgYHVybChcIiR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYClcbiAgICAgIC5yZXBsYWNlKC9ocmVmPVwiXFwvL2csIGBocmVmPVwiJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9gKVxuICAgICAgLnJlcGxhY2UoL3NyYz1cXCdcXC8vZywgYHNyYz0nJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9gKVxuICAgICAgLnJlcGxhY2UoL3VybFxcKFxcJ1xcLy9nLCBgdXJsKCcke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2ApXG4gICAgICAucmVwbGFjZSgvaHJlZj1cXCdcXC8vZywgYGhyZWY9JyR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYClcbiAgICAgIC5yZXBsYWNlKC88c2NyaXB0Lio8XFwvc2NyaXB0Pi9nLCAnJylcbiAgICAgIC5yZXBsYWNlKC9ocmVmPVwiKD8haHR0cCkvZywgYGhyZWY9XCIke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2ApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbnB1dCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBQb2ludGVyU2VydmljZSB7XG5cbiAgZXZlbnREZXRhaWxzOiBhbnk7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgndHJhY2stcG9pbnRlcicpIGRhdGE6IGFueSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlKSB7IH1cblxuICAvKipcbiAgICogVHJhY2sgTW91c2UgTW92ZW1lbnRcbiAgICovXG4gIHRyYWNrTW91c2VNb3ZlRXZlbnQoKSB7XG4gICAgZnJvbUV2ZW50KHdpbmRvdywgJ21vdXNlbW92ZScpXG4gICAgICAuc3Vic2NyaWJlKChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnREZXRhaWxzID0gZTtcbiAgICAgICAgdGhpcy5zZW5kRGF0YSgpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBNb3VzZSBNb3ZlIGRldGFpbHNcbiAgICovXG4gIHB1YmxpYyBzZW5kRGF0YSgpOiB2b2lkIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgdGhpcy5ldmVudERldGFpbHMsICdNb3VzZSBNb3ZlJywgJycpO1xuICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBFcnJvckhhbmRsZXIsIEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHbG9iYWxFcnJvckhhbmRsZXIgaW1wbGVtZW50cyBFcnJvckhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIGNvbnN0IGFuYWx5dGljc1NlcnZpY2UgPSB0aGlzLmluamVjdG9yLmdldChBbmFseXRpY3NTZXJ2aWNlKTtcbiAgICAgICAgaWYgKHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnNvbGVFcnJvckZuT2JqZWN0ID0gY29uc29sZS5lcnJvcjtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IgPSBmdW5jdGlvbiAoLi4uZXJyb3I6IGFueVtdKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkRXJyb3IgPSBlcnJvci5tYXAoZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGUpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID0gYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHByb2Nlc3NlZEVycm9yLCB7fSwgJ0NvbnNvbGVFcnJvcicsICcnKTtcbiAgICAgICAgICAgICAgICBhbmFseXRpY3NTZXJ2aWNlLnB1Ymxpc2hDb25zb2xlRXJyb3JzKGFuYWx5dGljc0JlYW4pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGVFcnJvckZuT2JqZWN0LmNhbGwoY29uc29sZSwgZXJyb3IpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBJbXBsZW1lbnRpbmcgdGhlIG1ldGhvZCAqL1xuICAgIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpIHsgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgRXJyb3JIYW5kbGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1MzQW5hbHl0aWNzQ29tcG9uZW50IH0gZnJvbSAnLi9uZy1zMy1hbmFseXRpY3MuY29tcG9uZW50JztcbmltcG9ydCB7IENyZWRlbnRpYWxzQmVhbiB9IGZyb20gJy4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgQnV0dG9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2J1dHRvbi9idXR0b24uZGlyZWN0aXZlJztcbmltcG9ydCB7IFNjcm9sbERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCdXR0b25Ib3ZlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9idXR0b24taG92ZXIvYnV0dG9uLWhvdmVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBFbnZpcm9ubWVudFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgUm91dGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlJztcbmltcG9ydCB7IGludGVydmFsIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9saWIvc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IFBvaW50ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9wb2ludGVyL3BvaW50ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEdsb2JhbEVycm9ySGFuZGxlciB9IGZyb20gJy4vc2VydmljZXMvZXJyb3ItaGFuZGxlci9lcnJvckhhbmRsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5nUzNBbmFseXRpY3NDb21wb25lbnQsXG4gICAgQnV0dG9uRGlyZWN0aXZlLFxuICAgIFNjcm9sbERpcmVjdGl2ZSxcbiAgICBCdXR0b25Ib3ZlckRpcmVjdGl2ZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgIEVudmlyb25tZW50U2VydmljZSxcbiAgICBQb2ludGVyU2VydmljZSxcbiAgICBDb29raWVTZXJ2aWNlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOZ1MzQW5hbHl0aWNzQ29tcG9uZW50LFxuICAgIEJ1dHRvbkRpcmVjdGl2ZSxcbiAgICBTY3JvbGxEaXJlY3RpdmUsXG4gICAgQnV0dG9uSG92ZXJEaXJlY3RpdmUsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmdTM0FuYWx5dGljc01vZHVsZSB7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZW52aXJvbm1lbnRTZXJ2aWNlID0gbmV3IEVudmlyb25tZW50U2VydmljZSgpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyU2VydmljZTogUm91dGVyU2VydmljZSwgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLCBwcml2YXRlIHBvaW50ZXJTZXJ2aWNlOiBQb2ludGVyU2VydmljZSkge1xuICAgIGludGVydmFsKDEwMDAgKiAxMCkuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5kYXRhU3RvcmFnZS5wdXNoRGF0YUFycmF5VG9TMygpO1xuICAgIH0pO1xuICAgIHRoaXMucG9pbnRlclNlcnZpY2UudHJhY2tNb3VzZU1vdmVFdmVudCgpO1xuICAgIHRoaXMucm91dGVyU2VydmljZS50cmFja1JvdXRlckV2ZW50cygpO1xuICB9XG4gIC8vIENvbmZpZ3VyaW5nIHRoZSBpbml0aWFsIHNldHVwIGZvciBzMyBidWNrZXQgYW5kIHBhZ2UgbG9hZGluZ1xuICBzdGF0aWMgZm9yUm9vdChjcmVkZW50aWFsczogQ3JlZGVudGlhbHNCZWFuLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkOiBib29sZWFuID0gZmFsc2UpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICB0aGlzLmVudmlyb25tZW50U2VydmljZS5zZXRDcmVkZW50aWFsc1RvRW52aXJvbm1lbnQoY3JlZGVudGlhbHMsIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQpO1xuICAgIC8vIEFzc2lnbmluZyB0aGUgY3JlZGVudGlhbHMgdG8gZW52aXJvbm1lbnQgdmFyaWFibGVzXG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ1MzQW5hbHl0aWNzTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBFcnJvckhhbmRsZXIsIHVzZUNsYXNzOiBHbG9iYWxFcnJvckhhbmRsZXIgfV1cbiAgICB9O1xuICB9XG5cblxufVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJDb21wb25lbnQiLCJ1dWlkLnY0IiwiQVdTLlMzIiwiQ29va2llU2VydmljZSIsIkh0dHBDbGllbnQiLCJ0c2xpYl8xLl9fdmFsdWVzIiwiRGlyZWN0aXZlIiwiSW5wdXQiLCJIb3N0TGlzdGVuZXIiLCJOYXZpZ2F0aW9uRW5kIiwiTmF2aWdhdGlvbkVycm9yIiwiUm91dGVyIiwiSW5qZWN0IiwiRE9DVU1FTlQiLCJmcm9tRXZlbnQiLCJJbmplY3RvciIsImludGVydmFsIiwiRXJyb3JIYW5kbGVyIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJIdHRwQ2xpZW50TW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFPRTtTQUFpQjs7b0JBTGxCQSxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7O21DQUpEO0tBUUM7Ozs7OztBQ1JEO1FBYUU7U0FBaUI7Ozs7UUFFakIseUNBQVE7OztZQUFSO2FBQ0M7O29CQWRGQyxZQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjt3QkFDL0IsUUFBUSxFQUFFLHVEQUlUO3dCQUNELE1BQU0sRUFBRSxFQUFFO3FCQUNYOzs7UUFRRCw2QkFBQztLQUFBOztJQ2xCRDs7Ozs7Ozs7Ozs7Ozs7QUFjQSxzQkE0RnlCLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU07b0JBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FB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