import { Injectable, Directive, Input, HostListener, Inject, NgModule, ErrorHandler, Component, Injector, defineInjectable, inject } from '@angular/core';
import { S3 } from 'aws-sdk';
import { v4 } from 'uuid';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import 'moment';
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
            this.sessionId = v4();
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
            demographicInfo: this.demographicInfo
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
                _this.analyticsPushData(event);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kYWdsb2JhbC1uZy1zMy1hbmFseXRpY3MuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLmNvbXBvbmVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3R5cGVzL2V2ZW50LnR5cGVzLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL2RpcmVjdGl2ZXMvYnV0dG9uL2J1dHRvbi5kaXJlY3RpdmUudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9kaXJlY3RpdmVzL2J1dHRvbi1ob3Zlci9idXR0b24taG92ZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL3BvaW50ZXIvcG9pbnRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2Vycm9yLWhhbmRsZXIvZXJyb3JIYW5kbGVyLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW5nLXMzLWFuYWx5dGljcycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBuZy1zMy1hbmFseXRpY3Mgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiZXhwb3J0IGxldCBlbnZpcm9ubWVudCA9IHtcbiAgICBhY2Nlc3NLZXlJZDogJycsXG4gICAgc2VjcmV0QWNjZXNzS2V5OiAnJyxcbiAgICBzZXNzaW9uVG9rZW46ICcnLFxuICAgIGJ1Y2tldE5hbWU6IHtcbiAgICAgICAgYXV0aGVudGljYXRlZEJ1Y2tldDogJycsXG4gICAgICAgIHB1YmxpY0J1Y2tldDogJycsXG4gICAgICAgIHNjcmVlbnNob3RCdWNrZXQ6ICcnXG4gICAgfSxcbiAgICBmaWxlTmFtZTogJycsXG4gICAgcmVnaW9uOiAnJyxcbiAgICBpc0F1dGg6IGZhbHNlLFxuICAgIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ6IHRydWVcbn07XG5cblxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgKiBhcyB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0ICogYXMgYmYgZnJvbSAnYnVmZmVyJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuLyoqXG4gKiBBbmFseXRpY3MgU2VydmljZVxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBbmFseXRpY3NTZXJ2aWNlIHtcblxuICAvKipcbiAgICogU2Vzc2lvbklkIG9mIHBsdWdpblxuICAgKi9cbiAgc2Vzc2lvbklkOiBzdHJpbmc7XG4gIGRlbW9ncmFwaGljSW5mbzogYW55ID0ge307XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29va2llU2VydmljZTogQ29va2llU2VydmljZSwgcHJpdmF0ZSBodHRwU2VydmljZTogSHR0cENsaWVudCkge1xuICAgIGlmICghdGhpcy5jb29raWVTZXJ2aWNlLmNoZWNrKCdkZW1vZ3JhcGhpYy1pbmZvJykpIHtcbiAgICAgIHRoaXMuZ2V0SXAoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZW1vZ3JhcGhpY0luZm8gPSBKU09OLnBhcnNlKHRoaXMuY29va2llU2VydmljZS5nZXQoJ2RlbW9ncmFwaGljLWluZm8nKSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U2Vzc2lvbklkKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tpbmcgd2hldGhlciBzZXNzaW9uSWQgcHJlc2VudCBpbiBjb29raWUgb3Igbm90XG4gICAqIGlmIG5vIHNlc3Npb24gaWQgY29va2llIHByZXNlbnQsIGFkZGluZyBuZXcgc2Vzc2lvbiBpZCBvdGhlcndpc2UgcmV1c2luZyB0aGUgc2Vzc2lvbiBpZCB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRTZXNzaW9uSWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29va2llU2VydmljZS5jaGVjaygnbmdTM0FuYWx5dGljc1Nlc3Npb25JZCcpKSB7XG4gICAgICB0aGlzLnNlc3Npb25JZCA9IHRoaXMuY29va2llU2VydmljZS5nZXQoJ25nUzNBbmFseXRpY3NTZXNzaW9uSWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXNzaW9uSWQgPSB1dWlkLnY0KCk7XG4gICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KCduZ1MzQW5hbHl0aWNzU2Vzc2lvbklkJywgdGhpcy5zZXNzaW9uSWQsIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKDEwMDAgKiA2MCAqIDYwKSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIEFuYWx5dGljcyBkYXRhIHRvIGRpZmZlcmVudCBidWNrZXQgYmFzZWQgb24gQXV0aGVudGljYXRpb24gZmxhZ1xuICAgKiBAcGFyYW0gZGF0YSBcbiAgICovXG4gIHB1YmxpYyBwdXNoRGF0YShkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoZW52aXJvbm1lbnQuaXNBdXRoKSB7XG4gICAgICB0aGlzLnB1Ymxpc2hUT0F1dGhTMyhkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wdWJsaXNoVE9VbkF1dGhTMyhkYXRhKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBkYXRhIHRvIFVuQXV0aGVudGljYXRlZCBCdWNrZXQgUzNcbiAgICogQHBhcmFtIGRhdGEgXG4gICAqL1xuICBwcml2YXRlIHB1Ymxpc2hUT1VuQXV0aFMzKGRhdGE6IGFueSk6IHZvaWQge1xuXG4gICAgLyoqKiBDb25zdHJ1Y3QgUzMgQnVja2V0IG9iamVjdCAqL1xuICAgIGNvbnN0IHMzQnVja2V0OiBBV1MuUzMgPSB0aGlzLmNvbnN0cnVjdFMzT2JqZWN0KCk7XG5cbiAgICAvKioqIFNldHRpbmcgdGhlIHBhcmFtcyBmb3IgczMgKi9cbiAgICBjb25zdCBwYXJhbXM6IHsgQnVja2V0OiBzdHJpbmcsIEtleTogc3RyaW5nLCBCb2R5OiBzdHJpbmcsIENvbnRlbnRUeXBlOiBzdHJpbmcgfSA9IHtcbiAgICAgIEJ1Y2tldDogZW52aXJvbm1lbnQuYnVja2V0TmFtZS5wdWJsaWNCdWNrZXQsXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxuICAgICAgS2V5OiBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX1fJHt0aGlzLnNlc3Npb25JZH1fJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9Lmpzb25gLFxuICAgICAgQm9keTogdGhpcy5wcm9jZXNzRm9yQXRoZW5hKGRhdGEuZXZlbnRWYWx1ZXMpLFxuICAgICAgQ29udGVudFR5cGU6ICdqc29uJ1xuICAgIH07XG4gICAgLyoqKiBQdXNoaW5nIHRoZSBkYXRhIHRvIHMzICovXG4gICAgczNCdWNrZXQucHV0T2JqZWN0KHBhcmFtcywgKGVycjogQVdTLkFXU0Vycm9yLCByZXNEYXRhOiBhbnkpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRpbmcgSlNPTiBBcnJheSB0byBzdHJpbmcgXG4gICAqIEBwYXJhbSBkYXRhIFxuICAgKi9cbiAgcHJvY2Vzc0ZvckF0aGVuYShkYXRhOiBBcnJheTxBbmFseXRpY3NCZWFuPik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGRhdGEubWFwKChvYmplY3Q6IGFueSkgPT4ge1xuICAgICAgb2JqZWN0WydzZXNzaW9uSWQnXSA9IHRoaXMuc2Vzc2lvbklkO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iamVjdCk7XG4gICAgfSkuam9pbignXFxuJyk7XG4gIH1cblxuICAvKipcbiAgICAqIFB1c2hpbmcgZGF0YSB0byBBdXRoZW50aWNhdGVkIEJ1Y2tldCBTM1xuICAgICogQHBhcmFtIGRhdGEgXG4gICAgKi9cbiAgcHVibGlzaFRPQXV0aFMzKGRhdGE6IGFueSkge1xuXG4gICAgLyoqKiBDb25zdHJ1Y3QgUzMgQnVja2V0IG9iamVjdCAqL1xuICAgIGNvbnN0IHMzQnVja2V0OiBBV1MuUzMgPSB0aGlzLmNvbnN0cnVjdFMzT2JqZWN0KCk7XG4gICAgLyoqKiBTZXR0aW5nIHRoZSBwYXJhbXMgZm9yIHMzICovXG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgQnVja2V0OiBlbnZpcm9ubWVudC5idWNrZXROYW1lLmF1dGhlbnRpY2F0ZWRCdWNrZXQsXG4gICAgICBLZXk6IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfV8ke3RoaXMuc2Vzc2lvbklkfV8ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKX0uanNvbmAsXG4gICAgICBCb2R5OiB0aGlzLnByb2Nlc3NGb3JBdGhlbmEoZGF0YS5ldmVudFZhbHVlcyksXG4gICAgICBDb250ZW50VHlwZTogJ2pzb24nXG4gICAgfTtcbiAgICAvKioqIFB1c2hpbmcgdGhlIGRhdGEgdG8gczMgKi9cbiAgICBzM0J1Y2tldC5wdXRPYmplY3QocGFyYW1zLCAoZXJyOiBBV1MuQVdTRXJyb3IsIHJlc0RhdGE6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdlcnJvcicsIGVycik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBTMyBPYmplY3QgdXNpbmcgQVdTIFNES1xuICAgKi9cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RTM09iamVjdCgpOiBBV1MuUzMge1xuICAgIHJldHVybiBuZXcgQVdTLlMzKHtcbiAgICAgIGFjY2Vzc0tleUlkOiBlbnZpcm9ubWVudC5hY2Nlc3NLZXlJZCxcbiAgICAgIHNlY3JldEFjY2Vzc0tleTogZW52aXJvbm1lbnQuc2VjcmV0QWNjZXNzS2V5LFxuICAgICAgcmVnaW9uOiBlbnZpcm9ubWVudC5yZWdpb25cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGxvYWRpbmcgY2FwdHVyZWQgYmFzZTY0IGltYWdlIHRvIFMzXG4gICAqIEBwYXJhbSBpbWFnZSAtIEJhc2U2NCBTdHJpbmdcbiAgICogQHBhcmFtIHNjcmVlbnNob3ROYW1lIC0gU2NyZWVuc2hvdCBuYW1lIGxpbmtlZCB3aXRoIHBhZ2VMb2FkZWQgZGF0YVxuICAgKi9cbiAgcHVibGljIHNhdmVTY3JlZW5zaG90c0luUzMoaHRtbFRlbXBsYXRlOiBzdHJpbmcsIHNjcmVlbnNob3ROYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBjb252ZXJ0aW5nIHRoZSBiYXNlNjQgdG8gYnVmZmVyIGRhdGFcbiAgICAvLyBjb25zdCBidWZmZXI6IEJ1ZmZlciA9IGJmLkJ1ZmZlci5mcm9tKGltYWdlLnJlcGxhY2UoL15kYXRhOmltYWdlXFwvXFx3KztiYXNlNjQsLywgJycpLCAnYmFzZTY0Jyk7XG4gICAgLy8gY29uc3QgYnVmZmVyOiBCdWZmZXIgPSBiZi5CdWZmZXIuZnJvbShpbWFnZSwgJ2Jhc2U2NCcpO1xuICAgIC8vIGNvbnN0cnVjdGluZyB0aGUgUzMgb2JqZWN0XG4gICAgY29uc3QgczNCdWNrZXQ6IEFXUy5TMyA9IHRoaXMuY29uc3RydWN0UzNPYmplY3QoKTtcbiAgICAvLyBwcmVwYXJpbmcgZGF0YSB0byBiZSBwdXNoZWQgdG8gYnVja2V0XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgQnVja2V0OiBlbnZpcm9ubWVudC5idWNrZXROYW1lLnNjcmVlbnNob3RCdWNrZXQsXG4gICAgICBLZXk6IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfS8ke3RoaXMuc2Vzc2lvbklkfS9zY3JlZW5zaG90cy8ke3NjcmVlbnNob3ROYW1lfS5odG1sYCxcbiAgICAgIEJvZHk6IGh0bWxUZW1wbGF0ZSxcbiAgICAgIENvbnRlbnRUeXBlOiAndGV4dC9odG1sJ1xuICAgIH07XG5cbiAgICAvKiogUHVzaGluZyB0byBTMyBidWNrZXQgKi9cbiAgICBzM0J1Y2tldC51cGxvYWQocGFyYW1zLCAoZXJyOiBBV1MuQVdTRXJyb3IsIHJlc0RhdGE6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBjb25zb2xlIGVycm9ycyB0byBTMyBidWNrZXRcbiAgICogQHBhcmFtIGRhdGEgXG4gICAqL1xuICBwdWJsaWMgcHVibGlzaENvbnNvbGVFcnJvcnMoZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAvLyBDb25maWd1cmluZyB0aGUgczNcbiAgICBjb25zdCBzM0J1Y2tldDogQVdTLlMzID0gdGhpcy5jb25zdHJ1Y3RTM09iamVjdCgpO1xuICAgIGRhdGFbJ3Nlc3Npb25JZCddID0gdGhpcy5zZXNzaW9uSWQ7XG5cbiAgICAvLyBTZXR0aW5nIHRoZSBwYXJhbXMgZm9yIHMzXG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgQnVja2V0OiBlbnZpcm9ubWVudC5idWNrZXROYW1lLmF1dGhlbnRpY2F0ZWRCdWNrZXQsXG4gICAgICBLZXk6IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfV8ke3RoaXMuc2Vzc2lvbklkfV9jb25zb2xlX2Vycm9yc18ke25ldyBEYXRlKCkuZ2V0VGltZSgpfS5qc29uYCxcbiAgICAgIEJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgQ29udGVudFR5cGU6ICdqc29uJ1xuICAgIH07XG4gICAgLy8gUHVzaGluZyB0aGUgZGF0YSB0byBzM1xuICAgIHMzQnVja2V0LnB1dE9iamVjdChwYXJhbXMsIChlcnI6IEFXUy5BV1NFcnJvciwgcmVzRGF0YTogYW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIFNldHRpbmcgYW5hbHl0aWNzIG9iamVjdCB0byBiZSBzYXZlZCBpbiBTMyBidWNrZXRcbiAgICogQHBhcmFtIHVzZXJEYXRhIC0gRGF0YSB0cmFuc2ZlcnJlZCB0byBFdmVudCBEaXJlY3RpdmVcbiAgICogQHBhcmFtIGV2ZW50RGV0YWlscyAtIFBvc2l0aW9uIG9mIGV2ZW50c1xuICAgKiBAcGFyYW0gZXZlbnROYW1lICAtIFR5cGUgb2YgZXZlbnRcbiAgICogQHBhcmFtIHNjcmVlbnNob3ROYW1lICAtIGZpbGUgbmFtZSBvZiBzYXZlZCBzY3JlZW5zaG90IGlmIHRoZSBldmVudCBpcyBQYWdlTG9hZGVkXG4gICAqL1xuICBzZXRBbmFseXRpY3NEYXRhKFxuICAgIHVzZXJEYXRhOiBhbnkgPSB7fSxcbiAgICBldmVudERldGFpbHM6IGFueSxcbiAgICBldmVudE5hbWU6IHN0cmluZyxcbiAgICBzY3JlZW5zaG90TmFtZTogc3RyaW5nLFxuICAgIGV2ZW50Q29tcG9uZW50Pzogc3RyaW5nKTogQW5hbHl0aWNzQmVhbiB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9IHtcbiAgICAgIGV2ZW50TGFiZWw6IGV2ZW50TmFtZSxcbiAgICAgIGV2ZW50Q29tcG9uZW50OiBldmVudENvbXBvbmVudCA/IGV2ZW50Q29tcG9uZW50IDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCc/JylbMF0sXG4gICAgICBicm93c2VyOiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgIGZ1bGxVUkw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgcmVzb2x1dGlvbjogd2luZG93LmlubmVyV2lkdGggKyAneCcgKyB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgICB4Q29vcmQ6IGV2ZW50RGV0YWlsc1snY2xpZW50WCddICE9PSB1bmRlZmluZWQgPyBldmVudERldGFpbHNbJ2NsaWVudFgnXS50b1N0cmluZygpIDogJzAnIHx8ICcwJyxcbiAgICAgIHlDb29yZDogZXZlbnREZXRhaWxzWydjbGllbnRZJ10gIT09IHVuZGVmaW5lZCA/IGV2ZW50RGV0YWlsc1snY2xpZW50WSddLnRvU3RyaW5nKCkgOiAnMCcgfHwgJzAnLFxuICAgICAgcGFnZVhDb29yZDogd2luZG93LnBhZ2VYT2Zmc2V0LnRvU3RyaW5nKCkgfHwgJzAnLFxuICAgICAgcGFnZVlDb29yZDogd2luZG93LnBhZ2VZT2Zmc2V0LnRvU3RyaW5nKCkgfHwgJzAnLFxuICAgICAgZXZlbnRUaW1lOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICBzY3JlZW5zaG90OiBzY3JlZW5zaG90TmFtZSxcbiAgICAgIGFkZGl0aW9uYWxJbmZvOiBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSksXG4gICAgICB1dG06IHRoaXMuZ2V0VVRNUGFyYW1ldGVycyh3aW5kb3cubG9jYXRpb24uaHJlZiksXG4gICAgICBkZW1vZ3JhcGhpY0luZm86IHRoaXMuZGVtb2dyYXBoaWNJbmZvXG4gICAgfTtcbiAgICByZXR1cm4gYW5hbHl0aWNzQmVhbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXR0aW5nIFVUTSBQYXJhbWV0ZXJzIGJ5IHByb2Nlc3NpbmcgY3VycmVudCBwYWdlVVJMXG4gICAqIEBwYXJhbSB1cmwgLSBQYWdlIFVSTFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRVVE1QYXJhbWV0ZXJzKHVybDogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCB1dG1PYmplY3QgPSB7fTtcbiAgICBpZiAodXJsLmluY2x1ZGVzKCd1dG0nKSkge1xuICAgICAgY29uc3QgdXRtUGFyYW1zID0gdXJsLnNwbGl0KCc/JylbMV0uc3BsaXQoJyYnKTtcbiAgICAgIHV0bVBhcmFtcy5tYXAocGFyYW0gPT4ge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBwYXJhbS5zcGxpdCgnPScpO1xuICAgICAgICB1dG1PYmplY3RbcGFyYW1zWzBdXSA9IHBhcmFtc1sxXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdXRtT2JqZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB1c2VyIGRlbW9ncmFwaGljIGluZm9ybWF0aW9uIGluIGNvb2tpZXNcbiAgICovXG4gIHByaXZhdGUgZ2V0SXAoKTogdm9pZCB7XG4gICAgdGhpcy5odHRwU2VydmljZS5nZXQoJ2h0dHBzOi8vaXBhcGkuY28vanNvbi8nKS5zdWJzY3JpYmUoXG4gICAgICAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5kZW1vZ3JhcGhpY0luZm8gPSByZXM7XG4gICAgICAgIHRoaXMuY29va2llU2VydmljZS5zZXQoJ2RlbW9ncmFwaGljLWluZm8nLCBKU09OLnN0cmluZ2lmeShyZXMpLCBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArICgxMDAwICogNjAgKiA2MCAqIDI0ICogNykpKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBEYXRhU3RvcmFnZVNlcnZpY2Uge1xuXG4gIGFsbERhdGFBbmFseXRpY3NBcnJheTogQXJyYXk8YW55PiA9IFtdO1xuICBhbGxEYXRhQW5hbHl0aWNzOiB7XG4gICAgcGFnZVVybDogc3RyaW5nLFxuICAgIGV2ZW50VmFsdWVzOiBBcnJheTxhbnk+XG4gIH07XG4gIHByZXZpb3VzVXJsOiBzdHJpbmc7XG4gIGtleXM6IEFycmF5PGFueT4gPSBbXTtcbiAgZXZlbnRDb2xsZWN0b3IgPSBuZXcgTWFwKCk7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYW5hbHl0aWNhbFNlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XG4gIHByaXZhdGUgcm91dGVEZXRhaWxzOiBhbnkgPSBbXTtcbiAgY291bnQgPSAwO1xuICBzZXRVcmxLZXkoZGF0YTogc3RyaW5nKSB7XG4gICAgbGV0IGZsYWcgPSAwO1xuICAgIGlmICh0aGlzLnByZXZpb3VzVXJsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZXZlbnRDb2xsZWN0b3Iuc2V0KGRhdGEsIFtdKTtcbiAgICAgIHRoaXMucHJldmlvdXNVcmwgPSBkYXRhIHx8ICcvJztcbiAgICB9IGVsc2UgaWYgKCEoZGF0YSA9PT0gdGhpcy5wcmV2aW91c1VybCkpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIEFycmF5LmZyb20odGhpcy5ldmVudENvbGxlY3Rvci5rZXlzKCkpKSB7XG4gICAgICAgIGlmIChrZXkgPT09IGRhdGEpIHtcbiAgICAgICAgICBmbGFnID0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZsYWcgPT09IDApIHtcbiAgICAgICAgdGhpcy5ldmVudENvbGxlY3Rvci5zZXQoZGF0YSwgW10pO1xuICAgICAgfVxuICAgICAgdGhpcy5wcmV2aW91c1VybCA9IGRhdGE7XG4gICAgfVxuICB9XG4gIGFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoZGF0YTogQW5hbHl0aWNzQmVhbikge1xuICAgIGlmICh0aGlzLnByZXZpb3VzVXJsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc2V0VXJsS2V5KGRhdGEuZXZlbnRDb21wb25lbnQpO1xuICAgIH1cbiAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLmdldCh0aGlzLnByZXZpb3VzVXJsKS5wdXNoKGRhdGEpO1xuICB9XG5cbiAgcHVzaERhdGFBcnJheVRvUzMoKSB7XG4gICAgdGhpcy5jb3VudCsrO1xuICAgIC8vIHRoaXMuYWxsRGF0YUFuYWx5dGljc01hcCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmtleXMoKSkpKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBBcnJheS5mcm9tKHRoaXMuZXZlbnRDb2xsZWN0b3Iua2V5cygpKSkge1xuICAgICAgdGhpcy5hbGxEYXRhQW5hbHl0aWNzID0ge1xuICAgICAgICBwYWdlVXJsOiBrZXksXG4gICAgICAgIGV2ZW50VmFsdWVzOiBBcnJheS5mcm9tKHRoaXMuZXZlbnRDb2xsZWN0b3IuZ2V0KGtleSkudmFsdWVzKCkpXG4gICAgICB9O1xuICAgICAgdGhpcy5rZXlzLnB1c2goa2V5KTtcbiAgICAgIGlmICh0aGlzLmFsbERhdGFBbmFseXRpY3MuZXZlbnRWYWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmFuYWx5dGljYWxTZXJ2aWNlLnB1c2hEYXRhKHRoaXMuYWxsRGF0YUFuYWx5dGljcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZXZlbnRDb2xsZWN0b3IuY2xlYXIoKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLmtleXMpIHtcbiAgICAgIHRoaXMuZXZlbnRDb2xsZWN0b3Iuc2V0KGtleSwgW10pO1xuICAgIH1cbiAgfVxuXG4gIHNldFJvdXRlRGV0YWlscyhyb3V0ZURldGFpbHM6IGFueSkge1xuICAgIHRoaXMucm91dGVEZXRhaWxzID0gcm91dGVEZXRhaWxzO1xuICB9XG5cbiAgZ2V0Um91dGVEZXRhaWxzKCkge1xuICAgIHJldHVybiB0aGlzLnJvdXRlRGV0YWlscztcbiAgfVxuXG59XG4iLCJleHBvcnQgZW51bSBFdmVudExhYmVscyB7XG4gICAgUEFHRV9MT0FEID0gJ1BBR0VfTE9BRCcsXG4gICAgTU9VU0VfSE9WRVIgPSAnTU9VU0VfSE9WRVInLFxuICAgIEJVVFRPTl9DTElDSyA9ICdCVVRUT05fQ0xJQ0snLFxuICAgIE1PVVNFX01PVkUgPSAnTU9VU0VfTU9WRScsXG4gICAgU0NST0xMID0gJ1NDUk9MTCcsXG4gICAgQ09OU09MRV9FUlJPUiA9ICdDT05TT0xFX0VSUk9SJ1xufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5cbi8qKlxuICogQnV0dG9uIERpcmVjdGl2ZSB0byB0cmFjayBjbGljayBldmVudFxuICogU2VsZWN0b3IgY2FuIGJlIGFkZGVkIHRvIGFueSBIVE1MIEVsZW1lbnRcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW3RyYWNrLWJ0bl0nXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkRpcmVjdGl2ZSB7XG5cbiAgLy8gR2V0cyBpbXBvcnRhbnQgZGF0YSBhYm91dCB0aGUgYnV0dG9uIGV4cGxpY2l0bHkgZnJvbSB0aGUgYXBwbGljYXRpb25cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCd0cmFjay1idG4nKSBkYXRhOiBhbnkgPSB7fTtcbiAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgZXZlbnREZXRhaWxzOiBhbnk7XG5cbiAgLyoqXG4gICAqIEJ1dHRvbiBUcmFja2luZyAtIENvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBkYXRhU3RvcmFnZSAtIERhdGFTdG9yYWdlU2VydmljZVxuICAgKiBAcGFyYW0gYW5hbHl0aWNzU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLCBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UpIHsgfVxuXG5cbiAgLyoqXG4gICAqICBMaXN0ZW4gdG8gYnV0dG9uIGNsaWNrIGFjdGlvbnNcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSkgb25DbGljaygkZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuZXZlbnREZXRhaWxzID0gJGV2ZW50O1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZW5kRGF0YSgpO1xuICAgIH0sIDEwKTtcbiAgfVxuXG4gIC8qKiBTZW5kaW5nIGRhdGEgb24gYnV0dG9uIGNsaWNrICovXG4gIHB1YmxpYyBzZW5kRGF0YSgpOiB2b2lkIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgdGhpcy5ldmVudERldGFpbHMsIHRoaXMuZXZlbnRMYWJlbHMuQlVUVE9OX0NMSUNLLCAnJyk7XG4gICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIE9uQ2hhbmdlcywgSG9zdExpc3RlbmVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW3RyYWNrLXNjcm9sbF0nXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICAvLyBHZXRzIGltcG9ydGFudCBkYXRhIGFib3V0IHRoZSBjb21wb25lbnQgZXhwbGljaXRseSBmcm9tIHRoZSBhcHBsaWNhdGlvblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gICAgQElucHV0KCd0cmFjay1zY3JvbGwnKSBkYXRhOiBhbnkgPSB7fTtcbiAgICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIC8vIENhcHR1cmUgdGhlIGNoYW5nZSBpbiBkYXRhXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGNoYW5nZXMuZGF0YS5jdXJyZW50VmFsdWU7XG4gICAgfVxuXG4gICAgLy8gVHJpZ2dlcmVkIHdoZW4gYW55IHNjcm9sbCBldmVudCBvY2N1cnNcbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6c2Nyb2xsJywgWyckZXZlbnQnXSkgb25TY3JvbGxFdmVudCgkZXZlbnQ6IGFueSkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VuZERhdGEoJGV2ZW50KTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBzZW5kRGF0YShldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEodGhpcy5kYXRhLCBldmVudCwgdGhpcy5ldmVudExhYmVscy5TQ1JPTEwsICcnKTtcbiAgICAgICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1t0cmFjay1idXR0b25Ib3Zlcl0nXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkhvdmVyRGlyZWN0aXZlIHtcbiAgLyoqICovXG4gIGV2ZW50RGV0YWlsczogYW55O1xuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICAvLyBHZXRzIGltcG9ydGFudCBkYXRhIGFib3V0IHRoZSBidXR0b24gZXhwbGljaXRseSBmcm9tIHRoZSBhcHBsaWNhdGlvblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ3RyYWNrLWJ1dHRvbkhvdmVyJykgZGF0YTogYW55ID0ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLCBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UpIHsgfVxuXG4gIC8vIExpc3RlbiB0byBidXR0b24gaG92ZXIgYWN0aW9uc1xuICBASG9zdExpc3RlbmVyKCdtb3VzZW92ZXInLCBbJyRldmVudCddKSBvbk1vdXNlT3ZlcigkZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuZXZlbnREZXRhaWxzID0gJGV2ZW50O1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZW5kRGF0YSgpO1xuICAgIH0sIDEwKTtcbiAgfVxuXG4gIC8vIFNlbmRpbmcgZGF0YSBvbiBidXR0b24gaG92ZXJcbiAgcHVibGljIHNlbmREYXRhKCk6IHZvaWQge1xuICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEodGhpcy5kYXRhLCB0aGlzLmV2ZW50RGV0YWlscywgdGhpcy5ldmVudExhYmVscy5NT1VTRV9IT1ZFUiwgJycpO1xuICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgfVxufVxuIiwiXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50JztcbmltcG9ydCB7IENyZWRlbnRpYWxzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5cbmV4cG9ydCBjbGFzcyBFbnZpcm9ubWVudFNlcnZpY2Uge1xuXG4gIC8vIFNldHMgV2hldGhlciB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkIG9yIG5vdFxuICBzZXRBdXRoZW50aWNhdGlvbihpc0F1dGg6IGJvb2xlYW4pIHtcbiAgICBlbnZpcm9ubWVudC5pc0F1dGggPSBpc0F1dGg7XG4gIH1cblxuICAvLyBTZXR0aW5nIGNyZWRlbnRpYWxzIG9uIGVudmlyb25tZW50XG4gIHNldENyZWRlbnRpYWxzVG9FbnZpcm9ubWVudChjcmVkZW50aWFsczogQ3JlZGVudGlhbHNCZWFuLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkOiBib29sZWFuKSB7XG4gICAgZW52aXJvbm1lbnQuYWNjZXNzS2V5SWQgPSBjcmVkZW50aWFscy5hY2Nlc3NLZXlJZDtcbiAgICBlbnZpcm9ubWVudC5maWxlTmFtZSA9IGNyZWRlbnRpYWxzLmZpbGVOYW1lO1xuICAgIGVudmlyb25tZW50LnNlY3JldEFjY2Vzc0tleSA9IGNyZWRlbnRpYWxzLnNlY3JldEFjY2Vzc0tleTtcbiAgICBlbnZpcm9ubWVudC5zZXNzaW9uVG9rZW4gPSBjcmVkZW50aWFscy5zZXNzaW9uVG9rZW47XG4gICAgZW52aXJvbm1lbnQucmVnaW9uID0gY3JlZGVudGlhbHMucmVnaW9uO1xuICAgIGVudmlyb25tZW50LmlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQgPSBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkO1xuICAgIGlmIChjcmVkZW50aWFscy5idWNrZXROYW1lLmF1dGhlbnRpY2F0ZWRCdWNrZXQgIT09ICcnICYmIGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUucHVibGljQnVja2V0ICE9PSAnJykge1xuICAgICAgZW52aXJvbm1lbnQuYnVja2V0TmFtZSA9IHtcbiAgICAgICAgYXV0aGVudGljYXRlZEJ1Y2tldDogY3JlZGVudGlhbHMuYnVja2V0TmFtZS5hdXRoZW50aWNhdGVkQnVja2V0LFxuICAgICAgICBwdWJsaWNCdWNrZXQ6IGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUucHVibGljQnVja2V0LFxuICAgICAgICBzY3JlZW5zaG90QnVja2V0OiBjcmVkZW50aWFscy5idWNrZXROYW1lLnNjcmVlbnNob3RCdWNrZXRcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGJ1Y2tldE5hbWUgPSAoY3JlZGVudGlhbHMuYnVja2V0TmFtZS5hdXRoZW50aWNhdGVkQnVja2V0ID09PSAnJykgPyBjcmVkZW50aWFscy5idWNrZXROYW1lLnB1YmxpY0J1Y2tldCA6XG4gICAgICAgIGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUuYXV0aGVudGljYXRlZEJ1Y2tldDtcbiAgICAgIGVudmlyb25tZW50LmJ1Y2tldE5hbWUgPSB7XG4gICAgICAgIGF1dGhlbnRpY2F0ZWRCdWNrZXQ6IGJ1Y2tldE5hbWUsXG4gICAgICAgIHB1YmxpY0J1Y2tldDogYnVja2V0TmFtZSxcbiAgICAgICAgc2NyZWVuc2hvdEJ1Y2tldDogY3JlZGVudGlhbHMuYnVja2V0TmFtZS5zY3JlZW5zaG90QnVja2V0XG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQsIE5hdmlnYXRpb25FcnJvciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUm91dGVyU2VydmljZSB7XG4gIGFuYWx5dGljc0RhdGE6IEFuYWx5dGljc0JlYW47XG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVzOiBSb3V0ZXIsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSwgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnkpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFRyYWNraW5nIHJvdXRlciBldmVudHNcbiAgICovXG4gIHB1YmxpYyB0cmFja1JvdXRlckV2ZW50cygpOiB2b2lkIHtcbiAgICAvKiogVHJpZ2dlcmVkIHdoZW4gY3VycmVudCBwYWdlIGlzIGxvYWRlZCAqL1xuICAgIHRoaXMucm91dGVzLmV2ZW50cy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAvKiogVHJpZ2dlcmVkIHdoZW4gTmF2aWdhdGlvbkVuZCBldmVudCBvY2N1cnMgKi9cbiAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgdGhpcy5hbmFseXRpY3NQdXNoRGF0YShldmVudCk7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yKSB7XG4gICAgICAgIC8qKiBUcmlnZ2VyZWQgd2hlbiBOYXZpZ2F0aW9uRXJyb3IgZXZlbnQgb2NjdXJzICovXG4gICAgICAgIHRoaXMuYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgYW5hbHl0aWNzIGRhdGFcbiAgICogQHBhcmFtIGV2ZW50IC0gUm91dGVyIEV2ZW50XG4gICAqL1xuICBwdWJsaWMgYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHNjcmVlbnNob3ROYW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkudG9TdHJpbmcoKTtcbiAgICB0aGlzLmFuYWx5dGljc0RhdGEgPSB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh7fSwge30sIHRoaXMuZXZlbnRMYWJlbHMuUEFHRV9MT0FELCBgJHtzY3JlZW5zaG90TmFtZX0uaHRtbGAsIGV2ZW50LnVybCk7XG4gICAgdGhpcy53YWl0VGlsbFBhZ2VMb2FkKHNjcmVlbnNob3ROYW1lKTtcbiAgICAvLyBEYXRhIGlzIHNlbmQgb25seSB3aGVuIHVzZXIgY29uZmlndXJlIHRoZSBwYWdlIGxvYWRpbmcgdG8gYmUgdHJ1ZVxuICAgIHRoaXMuZGF0YVN0b3JhZ2Uuc2V0VXJsS2V5KHRoaXMuYW5hbHl0aWNzRGF0YS5ldmVudENvbXBvbmVudCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkodGhpcy5hbmFseXRpY3NEYXRhKTtcbiAgICB9LCAwKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFdhaXRpbmcgZm9yIHBhZ2UgdG8gbG9hZCBjb21wbGV0ZWx5XG4gICAqIEBwYXJhbSBldmVudCBcbiAgICovXG4gIHdhaXRUaWxsUGFnZUxvYWQoc2NyZWVuc2hvdE5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIF9zZWxmLmNhcHR1cmVUZW1wbGF0ZShzY3JlZW5zaG90TmFtZSk7XG4gICAgICB9XG4gICAgfSwgMjAwMCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FwdHVyZSB0ZW1wbGF0ZSBvZiBsb2FkZWQgdmlld1xuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgLSBTY3JlZW5zaG90IGltYWdlXG4gICAqL1xuICBjYXB0dXJlVGVtcGxhdGUoc2NyZWVuc2hvdE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZ1bGxQYWdlSFRNTCA9IGA8aHRtbD5cbiAgICAgIDxoZWFkPlxuICAgICAgICAke3RoaXMucHJvY2Vzc1JlZ2V4T3BlcmF0aW9ucyh0aGlzLmRvY3VtZW50LmhlYWQuaW5uZXJIVE1MKX1cbiAgICAgICAgPHN0eWxlPmJvZHkge3Njcm9sbC1iZWhhdmlvcjogc21vb3RoO308L3N0eWxlPlxuICAgICAgPC9oZWFkPlxuICAgICAgPGJvZHk+XG4gICAgICAgICR7dGhpcy5wcm9jZXNzUmVnZXhPcGVyYXRpb25zKHRoaXMuZG9jdW1lbnQuYm9keS5pbm5lckhUTUwpfVxuICAgICAgICA8c2NyaXB0PlxuICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICBpZihlLmN1c3RvbURhdGEpIHtcbiAgICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKGUuY3VzdG9tRGF0YSk7XG4gICAgICAgICAgICAgIGlmIChkYXRhLnNjcm9sbCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGwoMCwgZGF0YS52YWx1ZSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfWNhdGNoKGUpIHtjb25zb2xlLmxvZyhlKTt9XG4gICAgICAgICAgfSk7XG4gICAgICAgIDwvc2NyaXB0PlxuICAgICAgPC9ib2R5PlxuICAgIDwvaHRtbD5gO1xuXG4gICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNhdmVTY3JlZW5zaG90c0luUzMoZnVsbFBhZ2VIVE1MLCBzY3JlZW5zaG90TmFtZSk7XG4gIH1cblxuXG4gIHByb2Nlc3NSZWdleE9wZXJhdGlvbnModGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC9zcmM9XFxcIlxcLy9nLCBgc3JjPVwiJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9gKVxuICAgICAgLnJlcGxhY2UoL3VybFxcKFxcXCJcXC8vZywgYHVybChcIiR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYClcbiAgICAgIC5yZXBsYWNlKC9ocmVmPVwiXFwvL2csIGBocmVmPVwiJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9gKVxuICAgICAgLnJlcGxhY2UoL3NyYz1cXCdcXC8vZywgYHNyYz0nJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9gKVxuICAgICAgLnJlcGxhY2UoL3VybFxcKFxcJ1xcLy9nLCBgdXJsKCcke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2ApXG4gICAgICAucmVwbGFjZSgvaHJlZj1cXCdcXC8vZywgYGhyZWY9JyR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYClcbiAgICAgIC5yZXBsYWNlKC88c2NyaXB0Lio8XFwvc2NyaXB0Pi9nLCAnJylcbiAgICAgIC5yZXBsYWNlKC9ocmVmPVwiKD8haHR0cCkvZywgYGhyZWY9XCIke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2ApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbnB1dCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFBvaW50ZXJTZXJ2aWNlIHtcblxuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICBldmVudERldGFpbHM6IGFueTtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCd0cmFjay1wb2ludGVyJykgZGF0YTogYW55ID0ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLCBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UpIHsgfVxuXG4gIC8qKlxuICAgKiBUcmFjayBNb3VzZSBNb3ZlbWVudFxuICAgKi9cbiAgdHJhY2tNb3VzZU1vdmVFdmVudCgpIHtcbiAgICBmcm9tRXZlbnQod2luZG93LCAnbW91c2Vtb3ZlJylcbiAgICAgIC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5ldmVudERldGFpbHMgPSBlO1xuICAgICAgICB0aGlzLnNlbmREYXRhKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIE1vdXNlIE1vdmUgZGV0YWlsc1xuICAgKi9cbiAgcHVibGljIHNlbmREYXRhKCk6IHZvaWQge1xuICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEodGhpcy5kYXRhLCB0aGlzLmV2ZW50RGV0YWlscywgdGhpcy5ldmVudExhYmVscy5NT1VTRV9NT1ZFLCAnJyk7XG4gICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEVycm9ySGFuZGxlciwgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdsb2JhbEVycm9ySGFuZGxlciBpbXBsZW1lbnRzIEVycm9ySGFuZGxlciB7XG4gICAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBjb25zdCBhbmFseXRpY3NTZXJ2aWNlID0gdGhpcy5pbmplY3Rvci5nZXQoQW5hbHl0aWNzU2VydmljZSk7XG4gICAgICAgIGlmICh3aW5kb3cuY29uc29sZSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBjb25zb2xlRXJyb3JGbk9iamVjdCA9IGNvbnNvbGUuZXJyb3I7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yID0gZnVuY3Rpb24gKC4uLmVycm9yOiBhbnlbXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZEVycm9yID0gZXJyb3IubWFwKGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChlKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgICAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID0gYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHByb2Nlc3NlZEVycm9yLCB7fSwgdGhpcy5ldmVudExhYmVscy5DT05TT0xFX0VSUk9SLCAnJyk7XG4gICAgICAgICAgICAgICAgYW5hbHl0aWNzU2VydmljZS5wdWJsaXNoQ29uc29sZUVycm9ycyhhbmFseXRpY3NCZWFuKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlRXJyb3JGbk9iamVjdC5jYWxsKGNvbnNvbGUsIGVycm9yKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogSW1wbGVtZW50aW5nIHRoZSBtZXRob2QgKi9cbiAgICBoYW5kbGVFcnJvcihlcnJvcjogYW55KSB7IH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIEVycm9ySGFuZGxlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdTM0FuYWx5dGljc0NvbXBvbmVudCB9IGZyb20gJy4vbmctczMtYW5hbHl0aWNzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDcmVkZW50aWFsc0JlYW4gfSBmcm9tICcuL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEJ1dHRvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9idXR0b24vYnV0dG9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTY3JvbGxEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2Nyb2xsL3Njcm9sbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQnV0dG9uSG92ZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYnV0dG9uLWhvdmVyL2J1dHRvbi1ob3Zlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRW52aXJvbm1lbnRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IFJvdXRlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3JvdXRlci9yb3V0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBpbnRlcnZhbCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vbGliL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBQb2ludGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcG9pbnRlci9wb2ludGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBHbG9iYWxFcnJvckhhbmRsZXIgfSBmcm9tICcuL3NlcnZpY2VzL2Vycm9yLWhhbmRsZXIvZXJyb3JIYW5kbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJ25neC1jb29raWUtc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOZ1MzQW5hbHl0aWNzQ29tcG9uZW50LFxuICAgIEJ1dHRvbkRpcmVjdGl2ZSxcbiAgICBTY3JvbGxEaXJlY3RpdmUsXG4gICAgQnV0dG9uSG92ZXJEaXJlY3RpdmUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERhdGFTdG9yYWdlU2VydmljZSxcbiAgICBFbnZpcm9ubWVudFNlcnZpY2UsXG4gICAgUG9pbnRlclNlcnZpY2UsXG4gICAgQ29va2llU2VydmljZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTmdTM0FuYWx5dGljc0NvbXBvbmVudCxcbiAgICBCdXR0b25EaXJlY3RpdmUsXG4gICAgU2Nyb2xsRGlyZWN0aXZlLFxuICAgIEJ1dHRvbkhvdmVyRGlyZWN0aXZlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NNb2R1bGUge1xuXG4gIHByaXZhdGUgc3RhdGljIGVudmlyb25tZW50U2VydmljZSA9IG5ldyBFbnZpcm9ubWVudFNlcnZpY2UoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlclNlcnZpY2U6IFJvdXRlclNlcnZpY2UsIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBwb2ludGVyU2VydmljZTogUG9pbnRlclNlcnZpY2UpIHtcbiAgICBpbnRlcnZhbCgxMDAwICogMTApLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMuZGF0YVN0b3JhZ2UucHVzaERhdGFBcnJheVRvUzMoKTtcbiAgICB9KTtcbiAgICB0aGlzLnBvaW50ZXJTZXJ2aWNlLnRyYWNrTW91c2VNb3ZlRXZlbnQoKTtcbiAgICB0aGlzLnJvdXRlclNlcnZpY2UudHJhY2tSb3V0ZXJFdmVudHMoKTtcbiAgfVxuICAvLyBDb25maWd1cmluZyB0aGUgaW5pdGlhbCBzZXR1cCBmb3IgczMgYnVja2V0IGFuZCBwYWdlIGxvYWRpbmdcbiAgc3RhdGljIGZvclJvb3QoY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzQmVhbiwgaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDogYm9vbGVhbiA9IGZhbHNlKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgdGhpcy5lbnZpcm9ubWVudFNlcnZpY2Uuc2V0Q3JlZGVudGlhbHNUb0Vudmlyb25tZW50KGNyZWRlbnRpYWxzLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkKTtcbiAgICAvLyBBc3NpZ25pbmcgdGhlIGNyZWRlbnRpYWxzIHRvIGVudmlyb25tZW50IHZhcmlhYmxlc1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmdTM0FuYWx5dGljc01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogRXJyb3JIYW5kbGVyLCB1c2VDbGFzczogR2xvYmFsRXJyb3JIYW5kbGVyIH1dXG4gICAgfTtcbiAgfVxuXG5cbn1cbiJdLCJuYW1lcyI6WyJ1dWlkLnY0IiwiQVdTLlMzIiwidHNsaWJfMS5fX3ZhbHVlcyIsImludGVydmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFPRTtL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