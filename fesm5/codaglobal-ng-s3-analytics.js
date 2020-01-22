import { Injectable, Directive, HostListener, Input, Inject, Component, NgModule, ErrorHandler, Injector, defineInjectable, inject } from '@angular/core';
import { S3 } from 'aws-sdk';
import { v4 } from 'uuid';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { __values } from 'tslib';
import { Router, NavigationEnd, NavigationError } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
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
    accessKeyId: '',
    secretAccessKey: '',
    sessionToken: '',
    bucketName: {
        authenticatedBucket: '',
        publicBucket: '',
        screenshotBucket: ''
    },
    fileName: '',
    region: '',
    isAuth: false,
    isPageLoadingToBeDetected: true
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
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Analytics Service
 */
var AnalyticsService = /** @class */ (function () {
    function AnalyticsService(cookieService, httpService) {
        this.cookieService = cookieService;
        this.httpService = httpService;
        this.demographicInfo = {};
        this.eventLabels = EventLabels;
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
        if (sessionStorage.getItem('ngS3AnalyticsSessionId')) {
            this.sessionId = sessionStorage.getItem('ngS3AnalyticsSessionId');
        }
        else {
            this.sessionId = v4();
            sessionStorage.setItem('ngS3AnalyticsSessionId', this.sessionId);
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
            // tslint:disable-next-line: max-line-length
            Key: new Date().toISOString().split('T')[0] + "_" + this.sessionId + "_" + new Date().toISOString() + ".json",
            Body: this.processForAthena(data.eventValues),
            ContentType: 'json'
        };
        /*** Pushing the data to s3 */
        s3Bucket.putObject(params, (/**
         * @param {?} err
         * @param {?} resData
         * @return {?}
         */
        function (err, resData) {
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
        s3Bucket.putObject(params, (/**
         * @param {?} err
         * @param {?} resData
         * @return {?}
         */
        function (err, resData) {
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
        return new S3({
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
        s3Bucket.upload(params, (/**
         * @param {?} err
         * @param {?} resData
         * @return {?}
         */
        function (err, resData) {
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
        s3Bucket.putObject(params, (/**
         * @param {?} err
         * @param {?} resData
         * @return {?}
         */
        function (err, resData) {
            if (err) {
                console.error(err);
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
        if (userData === void 0) { userData = {}; }
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
            eventTime: new Date().toISOString(),
            screenshot: screenshotName,
            additionalInfo: JSON.stringify(userData),
            utm: this.getUTMParameters(window.location.href),
            demographicInfo: this.demographicInfo,
            htmlElement: eventDetails['target'] ? eventDetails['target']['innerHTML'] : ''
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
        this.httpService.get('https://ipapi.co/json/').subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.demographicInfo = res;
            _this.cookieService.set('demographic-info', JSON.stringify(res), new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7)));
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
        this.analyticsData = this.analyticsService.setAnalyticsData({}, {}, this.eventLabels.PAGE_LOAD, screenshotName + ".html", event.url);
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
            if (this.document.readyState === 'complete') {
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    RouterService.ctorParameters = function () { return [
        { type: Router },
        { type: AnalyticsService },
        { type: DataStorageService },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    /** @nocollapse */ RouterService.ngInjectableDef = defineInjectable({ factory: function RouterService_Factory() { return new RouterService(inject(Router), inject(AnalyticsService), inject(DataStorageService), inject(DOCUMENT)); }, token: RouterService, providedIn: "root" });
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
        /** @type {?} */
        var analyticsService = this.injector.get(AnalyticsService);
        if (window.console && console.error) {
            /** @type {?} */
            var consoleErrorFnObject_1 = console.error;
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
var NgS3AnalyticsModule = /** @class */ (function () {
    function NgS3AnalyticsModule(routerService, dataStorage, pointerService) {
        var _this = this;
        this.routerService = routerService;
        this.dataStorage = dataStorage;
        this.pointerService = pointerService;
        window.addEventListener('beforeunload', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.dataStorage.pushDataArrayToS3();
        }));
        interval(1000 * 10).subscribe((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
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
        if (isPageLoadingToBeDetected === void 0) { isPageLoadingToBeDetected = false; }
        this.environmentService.setCredentialsToEnvironment(credentials, isPageLoadingToBeDetected);
        // Assigning the credentials to environment variables
        return {
            ngModule: NgS3AnalyticsModule,
            providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }]
        };
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
                    ],
                    providers: [
                        DataStorageService,
                        EnvironmentService,
                        PointerService,
                        CookieService
                    ],
                    exports: [
                        NgS3AnalyticsComponent,
                        ButtonDirective,
                        ScrollDirective,
                        ButtonHoverDirective,
                    ]
                },] },
    ];
    NgS3AnalyticsModule.ctorParameters = function () { return [
        { type: RouterService },
        { type: DataStorageService },
        { type: PointerService }
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

export { NgS3AnalyticsService, NgS3AnalyticsComponent, NgS3AnalyticsModule, EnvironmentService, DataStorageService, ButtonHoverDirective as ɵd, ButtonDirective as ɵa, ScrollDirective as ɵc, AnalyticsService as ɵb, PointerService as ɵe, RouterService as ɵf };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kYWdsb2JhbC1uZy1zMy1hbmFseXRpY3MuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLmNvbXBvbmVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi90eXBlcy9ldmVudC50eXBlcy50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL2RpcmVjdGl2ZXMvYnV0dG9uL2J1dHRvbi5kaXJlY3RpdmUudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9kaXJlY3RpdmVzL2J1dHRvbi1ob3Zlci9idXR0b24taG92ZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL3BvaW50ZXIvcG9pbnRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2Vycm9yLWhhbmRsZXIvZXJyb3JIYW5kbGVyLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW5nLXMzLWFuYWx5dGljcycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBuZy1zMy1hbmFseXRpY3Mgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiZXhwb3J0IGxldCBlbnZpcm9ubWVudCA9IHtcbiAgICBhY2Nlc3NLZXlJZDogJycsXG4gICAgc2VjcmV0QWNjZXNzS2V5OiAnJyxcbiAgICBzZXNzaW9uVG9rZW46ICcnLFxuICAgIGJ1Y2tldE5hbWU6IHtcbiAgICAgICAgYXV0aGVudGljYXRlZEJ1Y2tldDogJycsXG4gICAgICAgIHB1YmxpY0J1Y2tldDogJycsXG4gICAgICAgIHNjcmVlbnNob3RCdWNrZXQ6ICcnXG4gICAgfSxcbiAgICBmaWxlTmFtZTogJycsXG4gICAgcmVnaW9uOiAnJyxcbiAgICBpc0F1dGg6IGZhbHNlLFxuICAgIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ6IHRydWVcbn07XG5cblxuIiwiZXhwb3J0IGVudW0gRXZlbnRMYWJlbHMge1xuICAgIFBBR0VfTE9BRCA9ICdQQUdFX0xPQUQnLFxuICAgIE1PVVNFX0hPVkVSID0gJ01PVVNFX0hPVkVSJyxcbiAgICBCVVRUT05fQ0xJQ0sgPSAnQlVUVE9OX0NMSUNLJyxcbiAgICBNT1VTRV9NT1ZFID0gJ01PVVNFX01PVkUnLFxuICAgIFNDUk9MTCA9ICdTQ1JPTEwnLFxuICAgIENPTlNPTEVfRVJST1IgPSAnQ09OU09MRV9FUlJPUidcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIEFXUyBmcm9tICdhd3Mtc2RrJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQnO1xuaW1wb3J0ICogYXMgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbi8qKlxuICogQW5hbHl0aWNzIFNlcnZpY2VcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQW5hbHl0aWNzU2VydmljZSB7XG5cbiAgLyoqXG4gICAqIFNlc3Npb25JZCBvZiBwbHVnaW5cbiAgICovXG4gIHNlc3Npb25JZDogc3RyaW5nO1xuICBkZW1vZ3JhcGhpY0luZm86IGFueSA9IHt9O1xuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UsIHByaXZhdGUgaHR0cFNlcnZpY2U6IEh0dHBDbGllbnQpIHtcbiAgICBpZiAoIXRoaXMuY29va2llU2VydmljZS5jaGVjaygnZGVtb2dyYXBoaWMtaW5mbycpKSB7XG4gICAgICB0aGlzLmdldElwKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVtb2dyYXBoaWNJbmZvID0gSlNPTi5wYXJzZSh0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0KCdkZW1vZ3JhcGhpYy1pbmZvJykpO1xuICAgIH1cbiAgICB0aGlzLnNldFNlc3Npb25JZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNraW5nIHdoZXRoZXIgc2Vzc2lvbklkIHByZXNlbnQgaW4gY29va2llIG9yIG5vdFxuICAgKiBpZiBubyBzZXNzaW9uIGlkIGNvb2tpZSBwcmVzZW50LCBhZGRpbmcgbmV3IHNlc3Npb24gaWQgb3RoZXJ3aXNlIHJldXNpbmcgdGhlIHNlc3Npb24gaWQgdmFsdWVcbiAgICovXG4gIHByaXZhdGUgc2V0U2Vzc2lvbklkKCk6IHZvaWQge1xuICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCduZ1MzQW5hbHl0aWNzU2Vzc2lvbklkJykpIHtcbiAgICAgIHRoaXMuc2Vzc2lvbklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnbmdTM0FuYWx5dGljc1Nlc3Npb25JZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlc3Npb25JZCA9IHV1aWQudjQoKTtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ25nUzNBbmFseXRpY3NTZXNzaW9uSWQnLCB0aGlzLnNlc3Npb25JZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgQW5hbHl0aWNzIGRhdGEgdG8gZGlmZmVyZW50IGJ1Y2tldCBiYXNlZCBvbiBBdXRoZW50aWNhdGlvbiBmbGFnXG4gICAqIEBwYXJhbSBkYXRhIFxuICAgKi9cbiAgcHVibGljIHB1c2hEYXRhKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGlmIChlbnZpcm9ubWVudC5pc0F1dGgpIHtcbiAgICAgIHRoaXMucHVibGlzaFRPQXV0aFMzKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnB1Ymxpc2hUT1VuQXV0aFMzKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIGRhdGEgdG8gVW5BdXRoZW50aWNhdGVkIEJ1Y2tldCBTM1xuICAgKiBAcGFyYW0gZGF0YSBcbiAgICovXG4gIHByaXZhdGUgcHVibGlzaFRPVW5BdXRoUzMoZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAvKioqIENvbnN0cnVjdCBTMyBCdWNrZXQgb2JqZWN0ICovXG4gICAgY29uc3QgczNCdWNrZXQ6IEFXUy5TMyA9IHRoaXMuY29uc3RydWN0UzNPYmplY3QoKTtcblxuICAgIC8qKiogU2V0dGluZyB0aGUgcGFyYW1zIGZvciBzMyAqL1xuICAgIGNvbnN0IHBhcmFtczogeyBCdWNrZXQ6IHN0cmluZywgS2V5OiBzdHJpbmcsIEJvZHk6IHN0cmluZywgQ29udGVudFR5cGU6IHN0cmluZyB9ID0ge1xuICAgICAgQnVja2V0OiBlbnZpcm9ubWVudC5idWNrZXROYW1lLnB1YmxpY0J1Y2tldCxcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXG4gICAgICBLZXk6IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfV8ke3RoaXMuc2Vzc2lvbklkfV8ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKX0uanNvbmAsXG4gICAgICBCb2R5OiB0aGlzLnByb2Nlc3NGb3JBdGhlbmEoZGF0YS5ldmVudFZhbHVlcyksXG4gICAgICBDb250ZW50VHlwZTogJ2pzb24nXG4gICAgfTtcbiAgICAvKioqIFB1c2hpbmcgdGhlIGRhdGEgdG8gczMgKi9cbiAgICBzM0J1Y2tldC5wdXRPYmplY3QocGFyYW1zLCAoZXJyOiBBV1MuQVdTRXJyb3IsIHJlc0RhdGE6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydGluZyBKU09OIEFycmF5IHRvIHN0cmluZyBcbiAgICogQHBhcmFtIGRhdGEgXG4gICAqL1xuICBwcm9jZXNzRm9yQXRoZW5hKGRhdGE6IEFycmF5PEFuYWx5dGljc0JlYW4+KTogc3RyaW5nIHtcbiAgICByZXR1cm4gZGF0YS5tYXAoKG9iamVjdDogYW55KSA9PiB7XG4gICAgICBvYmplY3RbJ3Nlc3Npb25JZCddID0gdGhpcy5zZXNzaW9uSWQ7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqZWN0KTtcbiAgICB9KS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIC8qKlxuICAgICogUHVzaGluZyBkYXRhIHRvIEF1dGhlbnRpY2F0ZWQgQnVja2V0IFMzXG4gICAgKiBAcGFyYW0gZGF0YSBcbiAgICAqL1xuICBwdWJsaXNoVE9BdXRoUzMoZGF0YTogYW55KSB7XG5cbiAgICAvKioqIENvbnN0cnVjdCBTMyBCdWNrZXQgb2JqZWN0ICovXG4gICAgY29uc3QgczNCdWNrZXQ6IEFXUy5TMyA9IHRoaXMuY29uc3RydWN0UzNPYmplY3QoKTtcbiAgICAvKioqIFNldHRpbmcgdGhlIHBhcmFtcyBmb3IgczMgKi9cbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBCdWNrZXQ6IGVudmlyb25tZW50LmJ1Y2tldE5hbWUuYXV0aGVudGljYXRlZEJ1Y2tldCxcbiAgICAgIEtleTogYCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19XyR7dGhpcy5zZXNzaW9uSWR9XyR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfS5qc29uYCxcbiAgICAgIEJvZHk6IHRoaXMucHJvY2Vzc0ZvckF0aGVuYShkYXRhLmV2ZW50VmFsdWVzKSxcbiAgICAgIENvbnRlbnRUeXBlOiAnanNvbidcbiAgICB9O1xuICAgIC8qKiogUHVzaGluZyB0aGUgZGF0YSB0byBzMyAqL1xuICAgIHMzQnVja2V0LnB1dE9iamVjdChwYXJhbXMsIChlcnI6IEFXUy5BV1NFcnJvciwgcmVzRGF0YTogYW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Vycm9yJywgZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cblxuICAvKipcbiAgICogQ29uc3RydWN0IFMzIE9iamVjdCB1c2luZyBBV1MgU0RLXG4gICAqL1xuICBwcml2YXRlIGNvbnN0cnVjdFMzT2JqZWN0KCk6IEFXUy5TMyB7XG4gICAgcmV0dXJuIG5ldyBBV1MuUzMoe1xuICAgICAgYWNjZXNzS2V5SWQ6IGVudmlyb25tZW50LmFjY2Vzc0tleUlkLFxuICAgICAgc2VjcmV0QWNjZXNzS2V5OiBlbnZpcm9ubWVudC5zZWNyZXRBY2Nlc3NLZXksXG4gICAgICByZWdpb246IGVudmlyb25tZW50LnJlZ2lvblxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwbG9hZGluZyBjYXB0dXJlZCBiYXNlNjQgaW1hZ2UgdG8gUzNcbiAgICogQHBhcmFtIGltYWdlIC0gQmFzZTY0IFN0cmluZ1xuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgLSBTY3JlZW5zaG90IG5hbWUgbGlua2VkIHdpdGggcGFnZUxvYWRlZCBkYXRhXG4gICAqL1xuICBwdWJsaWMgc2F2ZVNjcmVlbnNob3RzSW5TMyhodG1sVGVtcGxhdGU6IHN0cmluZywgc2NyZWVuc2hvdE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIC8vIGNvbnN0cnVjdGluZyB0aGUgUzMgb2JqZWN0XG4gICAgY29uc3QgczNCdWNrZXQ6IEFXUy5TMyA9IHRoaXMuY29uc3RydWN0UzNPYmplY3QoKTtcbiAgICAvLyBwcmVwYXJpbmcgZGF0YSB0byBiZSBwdXNoZWQgdG8gYnVja2V0XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgQnVja2V0OiBlbnZpcm9ubWVudC5idWNrZXROYW1lLnNjcmVlbnNob3RCdWNrZXQsXG4gICAgICBLZXk6IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfS8ke3RoaXMuc2Vzc2lvbklkfS9zY3JlZW5zaG90cy8ke3NjcmVlbnNob3ROYW1lfS5odG1sYCxcbiAgICAgIEJvZHk6IGh0bWxUZW1wbGF0ZSxcbiAgICAgIENvbnRlbnRUeXBlOiAndGV4dC9odG1sJ1xuICAgIH07XG5cbiAgICAvKiogUHVzaGluZyB0byBTMyBidWNrZXQgKi9cbiAgICBzM0J1Y2tldC51cGxvYWQocGFyYW1zLCAoZXJyOiBBV1MuQVdTRXJyb3IsIHJlc0RhdGE6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBjb25zb2xlIGVycm9ycyB0byBTMyBidWNrZXRcbiAgICogQHBhcmFtIGRhdGEgXG4gICAqL1xuICBwdWJsaWMgcHVibGlzaENvbnNvbGVFcnJvcnMoZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAvLyBDb25maWd1cmluZyB0aGUgczNcbiAgICBjb25zdCBzM0J1Y2tldDogQVdTLlMzID0gdGhpcy5jb25zdHJ1Y3RTM09iamVjdCgpO1xuICAgIGRhdGFbJ3Nlc3Npb25JZCddID0gdGhpcy5zZXNzaW9uSWQ7XG5cbiAgICAvLyBTZXR0aW5nIHRoZSBwYXJhbXMgZm9yIHMzXG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgQnVja2V0OiBlbnZpcm9ubWVudC5idWNrZXROYW1lLmF1dGhlbnRpY2F0ZWRCdWNrZXQsXG4gICAgICBLZXk6IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfV8ke3RoaXMuc2Vzc2lvbklkfV9jb25zb2xlX2Vycm9yc18ke25ldyBEYXRlKCkuZ2V0VGltZSgpfS5qc29uYCxcbiAgICAgIEJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgQ29udGVudFR5cGU6ICdqc29uJ1xuICAgIH07XG4gICAgLy8gUHVzaGluZyB0aGUgZGF0YSB0byBzM1xuICAgIHMzQnVja2V0LnB1dE9iamVjdChwYXJhbXMsIChlcnI6IEFXUy5BV1NFcnJvciwgcmVzRGF0YTogYW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG5cblxuICAvKipcbiAgICogU2V0dGluZyBhbmFseXRpY3Mgb2JqZWN0IHRvIGJlIHNhdmVkIGluIFMzIGJ1Y2tldFxuICAgKiBAcGFyYW0gdXNlckRhdGEgLSBEYXRhIHRyYW5zZmVycmVkIHRvIEV2ZW50IERpcmVjdGl2ZVxuICAgKiBAcGFyYW0gZXZlbnREZXRhaWxzIC0gUG9zaXRpb24gb2YgZXZlbnRzXG4gICAqIEBwYXJhbSBldmVudE5hbWUgIC0gVHlwZSBvZiBldmVudFxuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgIC0gZmlsZSBuYW1lIG9mIHNhdmVkIHNjcmVlbnNob3QgaWYgdGhlIGV2ZW50IGlzIFBhZ2VMb2FkZWRcbiAgICovXG4gIHNldEFuYWx5dGljc0RhdGEoXG4gICAgdXNlckRhdGE6IGFueSA9IHt9LFxuICAgIGV2ZW50RGV0YWlsczogYW55LFxuICAgIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgIHNjcmVlbnNob3ROYW1lOiBzdHJpbmcsXG4gICAgZXZlbnRDb21wb25lbnQ/OiBzdHJpbmcpOiBBbmFseXRpY3NCZWFuIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID0ge1xuICAgICAgZXZlbnRMYWJlbDogZXZlbnROYW1lLFxuICAgICAgZXZlbnRDb21wb25lbnQ6IGV2ZW50Q29tcG9uZW50ID8gZXZlbnRDb21wb25lbnQgOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJz8nKVswXSxcbiAgICAgIGJyb3dzZXI6IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgZnVsbFVSTDogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICByZXNvbHV0aW9uOiB3aW5kb3cuaW5uZXJXaWR0aCArICd4JyArIHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgIHhDb29yZDogZXZlbnREZXRhaWxzWydjbGllbnRYJ10gIT09IHVuZGVmaW5lZCA/IGV2ZW50RGV0YWlsc1snY2xpZW50WCddLnRvU3RyaW5nKCkgOiAnMCcgfHwgJzAnLFxuICAgICAgeUNvb3JkOiBldmVudERldGFpbHNbJ2NsaWVudFknXSAhPT0gdW5kZWZpbmVkID8gZXZlbnREZXRhaWxzWydjbGllbnRZJ10udG9TdHJpbmcoKSA6ICcwJyB8fCAnMCcsXG4gICAgICBwYWdlWENvb3JkOiB3aW5kb3cucGFnZVhPZmZzZXQudG9TdHJpbmcoKSB8fCAnMCcsXG4gICAgICBwYWdlWUNvb3JkOiB3aW5kb3cucGFnZVlPZmZzZXQudG9TdHJpbmcoKSB8fCAnMCcsXG4gICAgICBldmVudFRpbWU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIHNjcmVlbnNob3Q6IHNjcmVlbnNob3ROYW1lLFxuICAgICAgYWRkaXRpb25hbEluZm86IEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSxcbiAgICAgIHV0bTogdGhpcy5nZXRVVE1QYXJhbWV0ZXJzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKSxcbiAgICAgIGRlbW9ncmFwaGljSW5mbzogdGhpcy5kZW1vZ3JhcGhpY0luZm8sXG4gICAgICBodG1sRWxlbWVudDogZXZlbnREZXRhaWxzWyd0YXJnZXQnXSA/IGV2ZW50RGV0YWlsc1sndGFyZ2V0J11bJ2lubmVySFRNTCddIDogJydcbiAgICB9O1xuICAgIHJldHVybiBhbmFseXRpY3NCZWFuO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHRpbmcgVVRNIFBhcmFtZXRlcnMgYnkgcHJvY2Vzc2luZyBjdXJyZW50IHBhZ2VVUkxcbiAgICogQHBhcmFtIHVybCAtIFBhZ2UgVVJMXG4gICAqL1xuICBwcml2YXRlIGdldFVUTVBhcmFtZXRlcnModXJsOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IHV0bU9iamVjdCA9IHt9O1xuICAgIGlmICh1cmwuaW5jbHVkZXMoJ3V0bScpKSB7XG4gICAgICBjb25zdCB1dG1QYXJhbXMgPSB1cmwuc3BsaXQoJz8nKVsxXS5zcGxpdCgnJicpO1xuICAgICAgdXRtUGFyYW1zLm1hcChwYXJhbSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHBhcmFtLnNwbGl0KCc9Jyk7XG4gICAgICAgIHV0bU9iamVjdFtwYXJhbXNbMF1dID0gcGFyYW1zWzFdO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB1dG1PYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHVzZXIgZGVtb2dyYXBoaWMgaW5mb3JtYXRpb24gaW4gY29va2llc1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRJcCgpOiB2b2lkIHtcbiAgICB0aGlzLmh0dHBTZXJ2aWNlLmdldCgnaHR0cHM6Ly9pcGFwaS5jby9qc29uLycpLnN1YnNjcmliZShcbiAgICAgIChyZXM6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLmRlbW9ncmFwaGljSW5mbyA9IHJlcztcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCgnZGVtb2dyYXBoaWMtaW5mbycsIEpTT04uc3RyaW5naWZ5KHJlcyksIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKDEwMDAgKiA2MCAqIDYwICogMjQgKiA3KSkpO1xuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERhdGFTdG9yYWdlU2VydmljZSB7XG5cbiAgYWxsRGF0YUFuYWx5dGljc0FycmF5OiBBcnJheTxhbnk+ID0gW107XG4gIGFsbERhdGFBbmFseXRpY3M6IHtcbiAgICBwYWdlVXJsOiBzdHJpbmcsXG4gICAgZXZlbnRWYWx1ZXM6IEFycmF5PGFueT5cbiAgfTtcbiAgcHJldmlvdXNVcmw6IHN0cmluZztcbiAga2V5czogQXJyYXk8YW55PiA9IFtdO1xuICBldmVudENvbGxlY3RvciA9IG5ldyBNYXAoKTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhbmFseXRpY2FsU2VydmljZTogQW5hbHl0aWNzU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cbiAgcHJpdmF0ZSByb3V0ZURldGFpbHM6IGFueSA9IFtdO1xuICBjb3VudCA9IDA7XG4gIHNldFVybEtleShkYXRhOiBzdHJpbmcpIHtcbiAgICBsZXQgZmxhZyA9IDA7XG4gICAgaWYgKHRoaXMucHJldmlvdXNVcmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5ldmVudENvbGxlY3Rvci5zZXQoZGF0YSwgW10pO1xuICAgICAgdGhpcy5wcmV2aW91c1VybCA9IGRhdGEgfHwgJy8nO1xuICAgIH0gZWxzZSBpZiAoIShkYXRhID09PSB0aGlzLnByZXZpb3VzVXJsKSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmtleXMoKSkpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gZGF0YSkge1xuICAgICAgICAgIGZsYWcgPSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZmxhZyA9PT0gMCkge1xuICAgICAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLnNldChkYXRhLCBbXSk7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXZpb3VzVXJsID0gZGF0YTtcbiAgICB9XG4gIH1cbiAgYXBwZW5kVG9BbmFseXRpY3NBcnJheShkYXRhOiBBbmFseXRpY3NCZWFuKSB7XG4gICAgaWYgKHRoaXMucHJldmlvdXNVcmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zZXRVcmxLZXkoZGF0YS5ldmVudENvbXBvbmVudCk7XG4gICAgfVxuICAgIHRoaXMuZXZlbnRDb2xsZWN0b3IuZ2V0KHRoaXMucHJldmlvdXNVcmwpLnB1c2goZGF0YSk7XG4gIH1cblxuICBwdXNoRGF0YUFycmF5VG9TMygpIHtcbiAgICB0aGlzLmNvdW50Kys7XG4gICAgLy8gdGhpcy5hbGxEYXRhQW5hbHl0aWNzTWFwID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShBcnJheS5mcm9tKHRoaXMuZXZlbnRDb2xsZWN0b3Iua2V5cygpKSkpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIEFycmF5LmZyb20odGhpcy5ldmVudENvbGxlY3Rvci5rZXlzKCkpKSB7XG4gICAgICB0aGlzLmFsbERhdGFBbmFseXRpY3MgPSB7XG4gICAgICAgIHBhZ2VVcmw6IGtleSxcbiAgICAgICAgZXZlbnRWYWx1ZXM6IEFycmF5LmZyb20odGhpcy5ldmVudENvbGxlY3Rvci5nZXQoa2V5KS52YWx1ZXMoKSlcbiAgICAgIH07XG4gICAgICB0aGlzLmtleXMucHVzaChrZXkpO1xuICAgICAgaWYgKHRoaXMuYWxsRGF0YUFuYWx5dGljcy5ldmVudFZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuYW5hbHl0aWNhbFNlcnZpY2UucHVzaERhdGEodGhpcy5hbGxEYXRhQW5hbHl0aWNzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5ldmVudENvbGxlY3Rvci5jbGVhcigpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMua2V5cykge1xuICAgICAgdGhpcy5ldmVudENvbGxlY3Rvci5zZXQoa2V5LCBbXSk7XG4gICAgfVxuICB9XG5cbiAgc2V0Um91dGVEZXRhaWxzKHJvdXRlRGV0YWlsczogYW55KSB7XG4gICAgdGhpcy5yb3V0ZURldGFpbHMgPSByb3V0ZURldGFpbHM7XG4gIH1cblxuICBnZXRSb3V0ZURldGFpbHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVEZXRhaWxzO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuXG4vKipcbiAqIEJ1dHRvbiBEaXJlY3RpdmUgdG8gdHJhY2sgY2xpY2sgZXZlbnRcbiAqIFNlbGVjdG9yIGNhbiBiZSBhZGRlZCB0byBhbnkgSFRNTCBFbGVtZW50XG4gKi9cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1t0cmFjay1idG5dJ1xufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25EaXJlY3RpdmUge1xuXG4gIC8vIEdldHMgaW1wb3J0YW50IGRhdGEgYWJvdXQgdGhlIGJ1dHRvbiBleHBsaWNpdGx5IGZyb20gdGhlIGFwcGxpY2F0aW9uXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgndHJhY2stYnRuJykgZGF0YTogYW55ID0ge307XG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIGV2ZW50RGV0YWlsczogYW55O1xuXG4gIC8qKlxuICAgKiBCdXR0b24gVHJhY2tpbmcgLSBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gZGF0YVN0b3JhZ2UgLSBEYXRhU3RvcmFnZVNlcnZpY2VcbiAgICogQHBhcmFtIGFuYWx5dGljc1NlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlKSB7IH1cblxuXG4gIC8qKlxuICAgKiAgTGlzdGVuIHRvIGJ1dHRvbiBjbGljayBhY3Rpb25zXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIG9uQ2xpY2soJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmV2ZW50RGV0YWlscyA9ICRldmVudDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2VuZERhdGEoKTtcbiAgICB9LCAxMCk7XG4gIH1cblxuICAvKiogU2VuZGluZyBkYXRhIG9uIGJ1dHRvbiBjbGljayAqL1xuICBwdWJsaWMgc2VuZERhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIHRoaXMuZXZlbnREZXRhaWxzLCB0aGlzLmV2ZW50TGFiZWxzLkJVVFRPTl9DTElDSywgJycpO1xuICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkNoYW5nZXMsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcblxuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1t0cmFjay1zY3JvbGxdJ1xufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgLy8gR2V0cyBpbXBvcnRhbnQgZGF0YSBhYm91dCB0aGUgY29tcG9uZW50IGV4cGxpY2l0bHkgZnJvbSB0aGUgYXBwbGljYXRpb25cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICAgIEBJbnB1dCgndHJhY2stc2Nyb2xsJykgZGF0YTogYW55ID0ge307XG4gICAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZVxuICAgICkgeyB9XG5cbiAgICAvLyBDYXB0dXJlIHRoZSBjaGFuZ2UgaW4gZGF0YVxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlO1xuICAgIH1cblxuICAgIC8vIFRyaWdnZXJlZCB3aGVuIGFueSBzY3JvbGwgZXZlbnQgb2NjdXJzXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnNjcm9sbCcsIFsnJGV2ZW50J10pIG9uU2Nyb2xsRXZlbnQoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbmREYXRhKCRldmVudCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc2VuZERhdGEoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgICAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgZXZlbnQsIHRoaXMuZXZlbnRMYWJlbHMuU0NST0xMLCAnJyk7XG4gICAgICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbdHJhY2stYnV0dG9uSG92ZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25Ib3ZlckRpcmVjdGl2ZSB7XG4gIC8qKiAqL1xuICBldmVudERldGFpbHM6IGFueTtcbiAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgLy8gR2V0cyBpbXBvcnRhbnQgZGF0YSBhYm91dCB0aGUgYnV0dG9uIGV4cGxpY2l0bHkgZnJvbSB0aGUgYXBwbGljYXRpb25cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCd0cmFjay1idXR0b25Ib3ZlcicpIGRhdGE6IGFueSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlKSB7IH1cblxuICAvLyBMaXN0ZW4gdG8gYnV0dG9uIGhvdmVyIGFjdGlvbnNcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VvdmVyJywgWyckZXZlbnQnXSkgb25Nb3VzZU92ZXIoJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmV2ZW50RGV0YWlscyA9ICRldmVudDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2VuZERhdGEoKTtcbiAgICB9LCAxMCk7XG4gIH1cblxuICAvLyBTZW5kaW5nIGRhdGEgb24gYnV0dG9uIGhvdmVyXG4gIHB1YmxpYyBzZW5kRGF0YSgpOiB2b2lkIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgdGhpcy5ldmVudERldGFpbHMsIHRoaXMuZXZlbnRMYWJlbHMuTU9VU0VfSE9WRVIsICcnKTtcbiAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gIH1cbn1cbiIsIlxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBDcmVkZW50aWFsc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuXG5leHBvcnQgY2xhc3MgRW52aXJvbm1lbnRTZXJ2aWNlIHtcblxuICAvLyBTZXRzIFdoZXRoZXIgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZCBvciBub3RcbiAgc2V0QXV0aGVudGljYXRpb24oaXNBdXRoOiBib29sZWFuKSB7XG4gICAgZW52aXJvbm1lbnQuaXNBdXRoID0gaXNBdXRoO1xuICB9XG5cbiAgLy8gU2V0dGluZyBjcmVkZW50aWFscyBvbiBlbnZpcm9ubWVudFxuICBzZXRDcmVkZW50aWFsc1RvRW52aXJvbm1lbnQoY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzQmVhbiwgaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDogYm9vbGVhbikge1xuICAgIGVudmlyb25tZW50LmFjY2Vzc0tleUlkID0gY3JlZGVudGlhbHMuYWNjZXNzS2V5SWQ7XG4gICAgZW52aXJvbm1lbnQuZmlsZU5hbWUgPSBjcmVkZW50aWFscy5maWxlTmFtZTtcbiAgICBlbnZpcm9ubWVudC5zZWNyZXRBY2Nlc3NLZXkgPSBjcmVkZW50aWFscy5zZWNyZXRBY2Nlc3NLZXk7XG4gICAgZW52aXJvbm1lbnQuc2Vzc2lvblRva2VuID0gY3JlZGVudGlhbHMuc2Vzc2lvblRva2VuO1xuICAgIGVudmlyb25tZW50LnJlZ2lvbiA9IGNyZWRlbnRpYWxzLnJlZ2lvbjtcbiAgICBlbnZpcm9ubWVudC5pc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkID0gaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDtcbiAgICBpZiAoY3JlZGVudGlhbHMuYnVja2V0TmFtZS5hdXRoZW50aWNhdGVkQnVja2V0ICE9PSAnJyAmJiBjcmVkZW50aWFscy5idWNrZXROYW1lLnB1YmxpY0J1Y2tldCAhPT0gJycpIHtcbiAgICAgIGVudmlyb25tZW50LmJ1Y2tldE5hbWUgPSB7XG4gICAgICAgIGF1dGhlbnRpY2F0ZWRCdWNrZXQ6IGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUuYXV0aGVudGljYXRlZEJ1Y2tldCxcbiAgICAgICAgcHVibGljQnVja2V0OiBjcmVkZW50aWFscy5idWNrZXROYW1lLnB1YmxpY0J1Y2tldCxcbiAgICAgICAgc2NyZWVuc2hvdEJ1Y2tldDogY3JlZGVudGlhbHMuYnVja2V0TmFtZS5zY3JlZW5zaG90QnVja2V0XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBidWNrZXROYW1lID0gKGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUuYXV0aGVudGljYXRlZEJ1Y2tldCA9PT0gJycpID8gY3JlZGVudGlhbHMuYnVja2V0TmFtZS5wdWJsaWNCdWNrZXQgOlxuICAgICAgICBjcmVkZW50aWFscy5idWNrZXROYW1lLmF1dGhlbnRpY2F0ZWRCdWNrZXQ7XG4gICAgICBlbnZpcm9ubWVudC5idWNrZXROYW1lID0ge1xuICAgICAgICBhdXRoZW50aWNhdGVkQnVja2V0OiBidWNrZXROYW1lLFxuICAgICAgICBwdWJsaWNCdWNrZXQ6IGJ1Y2tldE5hbWUsXG4gICAgICAgIHNjcmVlbnNob3RCdWNrZXQ6IGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUuc2NyZWVuc2hvdEJ1Y2tldFxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kLCBOYXZpZ2F0aW9uRXJyb3IgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmRlY2xhcmUgbGV0IG5nUzNBbmFseXRpY3NKUzogYW55O1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUm91dGVyU2VydmljZSB7XG4gIGFuYWx5dGljc0RhdGE6IEFuYWx5dGljc0JlYW47XG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIG5hdmlnYXRlT24gPSAnJztcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXM6IFJvdXRlciwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlLCBwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSkge1xuXG4gIH1cblxuICAvKipcbiAgICogVHJhY2tpbmcgcm91dGVyIGV2ZW50c1xuICAgKi9cbiAgcHVibGljIHRyYWNrUm91dGVyRXZlbnRzKCk6IHZvaWQge1xuICAgIC8qKiBUcmlnZ2VyZWQgd2hlbiBjdXJyZW50IHBhZ2UgaXMgbG9hZGVkICovXG4gICAgdGhpcy5yb3V0ZXMuZXZlbnRzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIC8qKiBUcmlnZ2VyZWQgd2hlbiBOYXZpZ2F0aW9uRW5kIGV2ZW50IG9jY3VycyAqL1xuICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xuICAgICAgICBpZiAodGhpcy5uYXZpZ2F0ZU9uICE9PSBldmVudC51cmwpIHtcbiAgICAgICAgICB0aGlzLmFuYWx5dGljc1B1c2hEYXRhKGV2ZW50KTtcbiAgICAgICAgICB0aGlzLm5hdmlnYXRlT24gPSBldmVudC51cmw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRXJyb3IpIHtcbiAgICAgICAgLyoqIFRyaWdnZXJlZCB3aGVuIE5hdmlnYXRpb25FcnJvciBldmVudCBvY2N1cnMgKi9cbiAgICAgICAgdGhpcy5hbmFseXRpY3NQdXNoRGF0YShldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBhbmFseXRpY3MgZGF0YVxuICAgKiBAcGFyYW0gZXZlbnQgLSBSb3V0ZXIgRXZlbnRcbiAgICovXG4gIHB1YmxpYyBhbmFseXRpY3NQdXNoRGF0YShldmVudDogYW55KTogdm9pZCB7XG4gICAgY29uc3Qgc2NyZWVuc2hvdE5hbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygpO1xuICAgIHRoaXMuYW5hbHl0aWNzRGF0YSA9IHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHt9LCB7fSwgdGhpcy5ldmVudExhYmVscy5QQUdFX0xPQUQsIGAke3NjcmVlbnNob3ROYW1lfS5odG1sYCwgZXZlbnQudXJsKTtcbiAgICB0aGlzLndhaXRUaWxsUGFnZUxvYWQoc2NyZWVuc2hvdE5hbWUpO1xuICAgIC8vIERhdGEgaXMgc2VuZCBvbmx5IHdoZW4gdXNlciBjb25maWd1cmUgdGhlIHBhZ2UgbG9hZGluZyB0byBiZSB0cnVlXG4gICAgdGhpcy5kYXRhU3RvcmFnZS5zZXRVcmxLZXkodGhpcy5hbmFseXRpY3NEYXRhLmV2ZW50Q29tcG9uZW50KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheSh0aGlzLmFuYWx5dGljc0RhdGEpO1xuICAgIH0sIDApO1xuICB9XG5cblxuICAvKipcbiAgICogV2FpdGluZyBmb3IgcGFnZSB0byBsb2FkIGNvbXBsZXRlbHlcbiAgICogQHBhcmFtIGV2ZW50IFxuICAgKi9cbiAgd2FpdFRpbGxQYWdlTG9hZChzY3JlZW5zaG90TmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgX3NlbGYuY2FwdHVyZVRlbXBsYXRlKHNjcmVlbnNob3ROYW1lKTtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXB0dXJlIHRlbXBsYXRlIG9mIGxvYWRlZCB2aWV3XG4gICAqIEBwYXJhbSBzY3JlZW5zaG90TmFtZSAtIFNjcmVlbnNob3QgaW1hZ2VcbiAgICovXG4gIGNhcHR1cmVUZW1wbGF0ZShzY3JlZW5zaG90TmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZnVsbFBhZ2VIVE1MID0gbmdTM0FuYWx5dGljc0pTLmNvbnN0cnVjdEhUTUxQYWdlKFxuICAgICAgdGhpcy5wcm9jZXNzUmVnZXhPcGVyYXRpb25zKHRoaXMuZG9jdW1lbnQuaGVhZC5pbm5lckhUTUwpLCB0aGlzLnByb2Nlc3NSZWdleE9wZXJhdGlvbnModGhpcy5kb2N1bWVudC5ib2R5LmlubmVySFRNTCkpXG4gICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNhdmVTY3JlZW5zaG90c0luUzMoZnVsbFBhZ2VIVE1MLCBzY3JlZW5zaG90TmFtZSk7XG4gIH1cblxuXG4gIHByb2Nlc3NSZWdleE9wZXJhdGlvbnModGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbmdTM0FuYWx5dGljc0pTLmRvUmVnZXgodGV4dCwgd2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIElucHV0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUG9pbnRlclNlcnZpY2Uge1xuXG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIGV2ZW50RGV0YWlsczogYW55O1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ3RyYWNrLXBvaW50ZXInKSBkYXRhOiBhbnkgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSkgeyB9XG5cbiAgLyoqXG4gICAqIFRyYWNrIE1vdXNlIE1vdmVtZW50XG4gICAqL1xuICB0cmFja01vdXNlTW92ZUV2ZW50KCkge1xuICAgIGZyb21FdmVudCh3aW5kb3csICdtb3VzZW1vdmUnKVxuICAgICAgLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLmV2ZW50RGV0YWlscyA9IGU7XG4gICAgICAgIHRoaXMuc2VuZERhdGEoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgTW91c2UgTW92ZSBkZXRhaWxzXG4gICAqL1xuICBwdWJsaWMgc2VuZERhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIHRoaXMuZXZlbnREZXRhaWxzLCB0aGlzLmV2ZW50TGFiZWxzLk1PVVNFX01PVkUsICcnKTtcbiAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR2xvYmFsRXJyb3JIYW5kbGVyIGltcGxlbWVudHMgRXJyb3JIYW5kbGVyIHtcbiAgICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIGNvbnN0IGFuYWx5dGljc1NlcnZpY2UgPSB0aGlzLmluamVjdG9yLmdldChBbmFseXRpY3NTZXJ2aWNlKTtcbiAgICAgICAgaWYgKHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnNvbGVFcnJvckZuT2JqZWN0ID0gY29uc29sZS5lcnJvcjtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IgPSBmdW5jdGlvbiAoLi4uZXJyb3I6IGFueVtdKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkRXJyb3IgPSBlcnJvci5tYXAoZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGUpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxuICAgICAgICAgICAgICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPSBhbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEocHJvY2Vzc2VkRXJyb3IsIHt9LCB0aGlzLmV2ZW50TGFiZWxzLkNPTlNPTEVfRVJST1IsICcnKTtcbiAgICAgICAgICAgICAgICBhbmFseXRpY3NTZXJ2aWNlLnB1Ymxpc2hDb25zb2xlRXJyb3JzKGFuYWx5dGljc0JlYW4pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGVFcnJvckZuT2JqZWN0LmNhbGwoY29uc29sZSwgZXJyb3IpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBJbXBsZW1lbnRpbmcgdGhlIG1ldGhvZCAqL1xuICAgIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpIHsgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgRXJyb3JIYW5kbGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1MzQW5hbHl0aWNzQ29tcG9uZW50IH0gZnJvbSAnLi9uZy1zMy1hbmFseXRpY3MuY29tcG9uZW50JztcbmltcG9ydCB7IENyZWRlbnRpYWxzQmVhbiB9IGZyb20gJy4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgQnV0dG9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2J1dHRvbi9idXR0b24uZGlyZWN0aXZlJztcbmltcG9ydCB7IFNjcm9sbERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCdXR0b25Ib3ZlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9idXR0b24taG92ZXIvYnV0dG9uLWhvdmVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBFbnZpcm9ubWVudFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgUm91dGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlJztcbmltcG9ydCB7IGludGVydmFsIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9saWIvc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IFBvaW50ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9wb2ludGVyL3BvaW50ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEdsb2JhbEVycm9ySGFuZGxlciB9IGZyb20gJy4vc2VydmljZXMvZXJyb3ItaGFuZGxlci9lcnJvckhhbmRsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5nUzNBbmFseXRpY3NDb21wb25lbnQsXG4gICAgQnV0dG9uRGlyZWN0aXZlLFxuICAgIFNjcm9sbERpcmVjdGl2ZSxcbiAgICBCdXR0b25Ib3ZlckRpcmVjdGl2ZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgIEVudmlyb25tZW50U2VydmljZSxcbiAgICBQb2ludGVyU2VydmljZSxcbiAgICBDb29raWVTZXJ2aWNlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOZ1MzQW5hbHl0aWNzQ29tcG9uZW50LFxuICAgIEJ1dHRvbkRpcmVjdGl2ZSxcbiAgICBTY3JvbGxEaXJlY3RpdmUsXG4gICAgQnV0dG9uSG92ZXJEaXJlY3RpdmUsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmdTM0FuYWx5dGljc01vZHVsZSB7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZW52aXJvbm1lbnRTZXJ2aWNlID0gbmV3IEVudmlyb25tZW50U2VydmljZSgpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyU2VydmljZTogUm91dGVyU2VydmljZSwgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLCBwcml2YXRlIHBvaW50ZXJTZXJ2aWNlOiBQb2ludGVyU2VydmljZSkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5kYXRhU3RvcmFnZS5wdXNoRGF0YUFycmF5VG9TMygpO1xuICAgIH0pO1xuICAgIGludGVydmFsKDEwMDAgKiAxMCkuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5kYXRhU3RvcmFnZS5wdXNoRGF0YUFycmF5VG9TMygpO1xuICAgIH0pO1xuICAgIHRoaXMucG9pbnRlclNlcnZpY2UudHJhY2tNb3VzZU1vdmVFdmVudCgpO1xuICAgIHRoaXMucm91dGVyU2VydmljZS50cmFja1JvdXRlckV2ZW50cygpO1xuICB9XG4gIC8vIENvbmZpZ3VyaW5nIHRoZSBpbml0aWFsIHNldHVwIGZvciBzMyBidWNrZXQgYW5kIHBhZ2UgbG9hZGluZ1xuICBzdGF0aWMgZm9yUm9vdChjcmVkZW50aWFsczogQ3JlZGVudGlhbHNCZWFuLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkOiBib29sZWFuID0gZmFsc2UpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICB0aGlzLmVudmlyb25tZW50U2VydmljZS5zZXRDcmVkZW50aWFsc1RvRW52aXJvbm1lbnQoY3JlZGVudGlhbHMsIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQpO1xuICAgIC8vIEFzc2lnbmluZyB0aGUgY3JlZGVudGlhbHMgdG8gZW52aXJvbm1lbnQgdmFyaWFibGVzXG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ1MzQW5hbHl0aWNzTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBFcnJvckhhbmRsZXIsIHVzZUNsYXNzOiBHbG9iYWxFcnJvckhhbmRsZXIgfV1cbiAgICB9O1xuICB9XG5cblxufVxuIl0sIm5hbWVzIjpbInV1aWQudjQiLCJBV1MuUzMiLCJ0c2xpYl8xLl9fdmFsdWVzIiwiaW50ZXJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7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