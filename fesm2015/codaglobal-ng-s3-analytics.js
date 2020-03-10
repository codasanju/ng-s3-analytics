import { Injectable, Directive, HostListener, Input, Inject, Component, NgModule, ErrorHandler, Injector, defineInjectable, inject } from '@angular/core';
import { S3 } from 'aws-sdk';
import { v4 } from 'uuid';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, NavigationEnd, NavigationError } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { fromEvent, interval } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgS3AnalyticsService {
    constructor() { }
}
NgS3AnalyticsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
NgS3AnalyticsService.ctorParameters = () => [];
/** @nocollapse */ NgS3AnalyticsService.ngInjectableDef = defineInjectable({ factory: function NgS3AnalyticsService_Factory() { return new NgS3AnalyticsService(); }, token: NgS3AnalyticsService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgS3AnalyticsComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
NgS3AnalyticsComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-ng-s3-analytics',
                template: `
    <p>
      ng-s3-analytics works!
    </p>
  `,
                styles: []
            },] },
];
NgS3AnalyticsComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let environment = {
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
const EventLabels = {
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
class AnalyticsService {
    /**
     * @param {?} cookieService
     * @param {?} httpService
     */
    constructor(cookieService, httpService) {
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
     * @private
     * @return {?}
     */
    setSessionId() {
        if (sessionStorage.getItem('ngS3AnalyticsSessionId')) {
            this.sessionId = sessionStorage.getItem('ngS3AnalyticsSessionId');
        }
        else {
            this.sessionId = v4();
            sessionStorage.setItem('ngS3AnalyticsSessionId', this.sessionId);
        }
    }
    /**
     * Pushing Analytics data to different bucket based on Authentication flag
     * @param {?} data
     * @return {?}
     */
    pushData(data) {
        if (environment.isAuth) {
            this.publishTOAuthS3(data);
        }
        else {
            this.publishTOUnAuthS3(data);
        }
    }
    /**
     * Pushing data to UnAuthenticated Bucket S3
     * @private
     * @param {?} data
     * @return {?}
     */
    publishTOUnAuthS3(data) {
        /**
         * Construct S3 Bucket object
         * @type {?}
         */
        const s3Bucket = this.constructS3Object();
        /**
         * Setting the params for s3
         * @type {?}
         */
        const params = {
            Bucket: environment.bucketName.publicBucket,
            // tslint:disable-next-line: max-line-length
            Key: `${new Date().toISOString().split('T')[0]}_${this.sessionId}_${new Date().toISOString()}.json`,
            Body: this.processForAthena(data.eventValues),
            ContentType: 'json'
        };
        /*** Pushing the data to s3 */
        s3Bucket.putObject(params, (/**
         * @param {?} err
         * @param {?} resData
         * @return {?}
         */
        (err, resData) => {
            if (err) {
                console.error(err);
            }
        }));
    }
    /**
     * Converting JSON Array to string
     * @param {?} data
     * @return {?}
     */
    processForAthena(data) {
        return data.map((/**
         * @param {?} object
         * @return {?}
         */
        (object) => {
            object['sessionId'] = this.sessionId;
            return JSON.stringify(object);
        })).join('\n');
    }
    /**
     * Pushing data to Authenticated Bucket S3
     * @param {?} data
     * @return {?}
     */
    publishTOAuthS3(data) {
        /**
         * Construct S3 Bucket object
         * @type {?}
         */
        const s3Bucket = this.constructS3Object();
        /**
         * Setting the params for s3
         * @type {?}
         */
        const params = {
            Bucket: environment.bucketName.authenticatedBucket,
            Key: `${new Date().toISOString().split('T')[0]}_${this.sessionId}_${new Date().toISOString()}.json`,
            Body: this.processForAthena(data.eventValues),
            ContentType: 'json'
        };
        /*** Pushing the data to s3 */
        s3Bucket.putObject(params, (/**
         * @param {?} err
         * @param {?} resData
         * @return {?}
         */
        (err, resData) => {
            if (err) {
                console.error('error', err);
            }
        }));
    }
    /**
     * Construct S3 Object using AWS SDK
     * @private
     * @return {?}
     */
    constructS3Object() {
        return new S3({
            accessKeyId: environment.accessKeyId,
            secretAccessKey: environment.secretAccessKey,
            region: environment.region
        });
    }
    /**
     * Uploading captured base64 image to S3
     * @param {?} htmlTemplate
     * @param {?} screenshotName - Screenshot name linked with pageLoaded data
     * @return {?}
     */
    saveScreenshotsInS3(htmlTemplate, screenshotName) {
        // constructing the S3 object
        /** @type {?} */
        const s3Bucket = this.constructS3Object();
        // preparing data to be pushed to bucket
        /** @type {?} */
        const params = {
            Bucket: environment.bucketName.screenshotBucket,
            Key: `${new Date().toISOString().split('T')[0]}/${this.sessionId}/screenshots/${screenshotName}.html`,
            Body: htmlTemplate,
            ContentType: 'text/html'
        };
        /** Pushing to S3 bucket */
        s3Bucket.upload(params, (/**
         * @param {?} err
         * @param {?} resData
         * @return {?}
         */
        (err, resData) => {
            if (err) {
                console.error(err);
            }
        }));
    }
    /**
     * Pushing console errors to S3 bucket
     * @param {?} data
     * @return {?}
     */
    publishConsoleErrors(data) {
        // Configuring the s3
        /** @type {?} */
        const s3Bucket = this.constructS3Object();
        data['sessionId'] = this.sessionId;
        // Setting the params for s3
        /** @type {?} */
        const params = {
            Bucket: environment.bucketName.authenticatedBucket,
            Key: `${new Date().toISOString().split('T')[0]}_${this.sessionId}_console_errors_${new Date().getTime()}.json`,
            Body: JSON.stringify(data),
            ContentType: 'json'
        };
        // Pushing the data to s3
        s3Bucket.putObject(params, (/**
         * @param {?} err
         * @param {?} resData
         * @return {?}
         */
        (err, resData) => {
            if (err) {
                console.error(err);
            }
        }));
    }
    /**
     * Setting analytics object to be saved in S3 bucket
     * @param {?=} userData - Data transferred to Event Directive
     * @param {?=} eventDetails - Position of events
     * @param {?=} eventName  - Type of event
     * @param {?=} screenshotName  - file name of saved screenshot if the event is PageLoaded
     * @param {?=} eventComponent
     * @return {?}
     */
    setAnalyticsData(userData = {}, eventDetails, eventName, screenshotName, eventComponent) {
        /** @type {?} */
        const analyticsBean = {
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
            // tslint:disable-next-line: max-line-length
            htmlElement: eventDetails['target'] ? eventDetails['target']['innerHTML'] : ''
        };
        return analyticsBean;
    }
    /**
     * Getting UTM Parameters by processing current pageURL
     * @private
     * @param {?} url - Page URL
     * @return {?}
     */
    getUTMParameters(url) {
        /** @type {?} */
        const utmObject = {};
        if (url.includes('utm')) {
            /** @type {?} */
            const utmParams = url.split('?')[1].split('&');
            utmParams.map((/**
             * @param {?} param
             * @return {?}
             */
            param => {
                /** @type {?} */
                const params = param.split('=');
                utmObject[params[0]] = params[1];
            }));
        }
        return utmObject;
    }
    /**
     * Set user demographic information in cookies
     * @private
     * @return {?}
     */
    getIp() {
        this.httpService.get('https://ipapi.co/json/').subscribe((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            this.demographicInfo = res;
            this.cookieService.set('demographic-info', JSON.stringify(res), new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7)));
        }));
    }
}
AnalyticsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
AnalyticsService.ctorParameters = () => [
    { type: CookieService },
    { type: HttpClient }
];
/** @nocollapse */ AnalyticsService.ngInjectableDef = defineInjectable({ factory: function AnalyticsService_Factory() { return new AnalyticsService(inject(CookieService), inject(HttpClient)); }, token: AnalyticsService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DataStorageService {
    /**
     * @param {?} analyticalService
     * @param {?} http
     */
    constructor(analyticalService, http) {
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
    setUrlKey(data) {
        /** @type {?} */
        let flag = 0;
        if (this.previousUrl === undefined) {
            this.eventCollector.set(data, []);
            this.previousUrl = data || '/';
        }
        else if (!(data === this.previousUrl)) {
            for (const key of Array.from(this.eventCollector.keys())) {
                if (key === data) {
                    flag = 1;
                    break;
                }
            }
            if (flag === 0) {
                this.eventCollector.set(data, []);
            }
            this.previousUrl = data;
        }
    }
    /**
     * @param {?} data
     * @return {?}
     */
    appendToAnalyticsArray(data) {
        if (this.previousUrl === undefined) {
            this.setUrlKey(data.eventComponent);
        }
        this.eventCollector.get(this.previousUrl).push(data);
    }
    /**
     * @return {?}
     */
    pushDataArrayToS3() {
        this.count++;
        // this.allDataAnalyticsMap = JSON.parse(JSON.stringify(Array.from(this.eventCollector.keys())));
        for (const key of Array.from(this.eventCollector.keys())) {
            this.allDataAnalytics = {
                pageUrl: key,
                eventValues: Array.from(this.eventCollector.get(key).values())
            };
            this.keys.push(key);
            if (this.allDataAnalytics.eventValues.length > 0) {
                this.analyticalService.pushData(this.allDataAnalytics);
            }
        }
        this.eventCollector.clear();
        for (const key of this.keys) {
            this.eventCollector.set(key, []);
        }
    }
    /**
     * @param {?} routeDetails
     * @return {?}
     */
    setRouteDetails(routeDetails) {
        this.routeDetails = routeDetails;
    }
    /**
     * @return {?}
     */
    getRouteDetails() {
        return this.routeDetails;
    }
}
DataStorageService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
DataStorageService.ctorParameters = () => [
    { type: AnalyticsService },
    { type: HttpClient }
];
/** @nocollapse */ DataStorageService.ngInjectableDef = defineInjectable({ factory: function DataStorageService_Factory() { return new DataStorageService(inject(AnalyticsService), inject(HttpClient)); }, token: DataStorageService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Button Directive to track click event
 * Selector can be added to any HTML Element
 */
class ButtonDirective {
    /**
     * Button Tracking - Constructor
     * @param {?} dataStorage - DataStorageService
     * @param {?} analyticsService
     */
    constructor(dataStorage, analyticsService) {
        this.dataStorage = dataStorage;
        this.analyticsService = analyticsService;
        // Gets important data about the button explicitly from the application
        // tslint:disable-next-line: no-input-rename
        this.data = {};
        this.eventLabels = EventLabels;
    }
    /**
     *  Listen to button click actions
     * @param {?} $event
     * @return {?}
     */
    onClick($event) {
        this.eventDetails = $event;
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.sendData();
        }), 10);
    }
    /**
     * Sending data on button click
     * @return {?}
     */
    sendData() {
        /** @type {?} */
        const analyticsBean = this.analyticsService.setAnalyticsData(this.data, this.eventDetails, this.eventLabels.BUTTON_CLICK, '');
        this.dataStorage.appendToAnalyticsArray(analyticsBean);
    }
}
ButtonDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line: directive-selector
                selector: '[track-btn]'
            },] },
];
ButtonDirective.ctorParameters = () => [
    { type: DataStorageService },
    { type: AnalyticsService }
];
ButtonDirective.propDecorators = {
    data: [{ type: Input, args: ['track-btn',] }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ScrollDirective {
    /**
     * @param {?} analyticsService
     * @param {?} dataStorage
     */
    constructor(analyticsService, dataStorage) {
        this.analyticsService = analyticsService;
        this.dataStorage = dataStorage;
        // Gets important data about the component explicitly from the application
        // tslint:disable-next-line: no-input-rename
        this.data = {};
        this.eventLabels = EventLabels;
    }
    // Capture the change in data
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.data = changes.data.currentValue;
    }
    // Triggered when any scroll event occurs
    /**
     * @param {?} $event
     * @return {?}
     */
    onScrollEvent($event) {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.sendData($event);
        }), 100);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    sendData(event) {
        /** @type {?} */
        const analyticsBean = this.analyticsService.setAnalyticsData(this.data, event, this.eventLabels.SCROLL, '');
        this.dataStorage.appendToAnalyticsArray(analyticsBean);
    }
}
ScrollDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line: directive-selector
                selector: '[track-scroll]'
            },] },
];
ScrollDirective.ctorParameters = () => [
    { type: AnalyticsService },
    { type: DataStorageService }
];
ScrollDirective.propDecorators = {
    data: [{ type: Input, args: ['track-scroll',] }],
    onScrollEvent: [{ type: HostListener, args: ['window:scroll', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ButtonHoverDirective {
    /**
     * @param {?} dataStorage
     * @param {?} analyticsService
     */
    constructor(dataStorage, analyticsService) {
        this.dataStorage = dataStorage;
        this.analyticsService = analyticsService;
        this.eventLabels = EventLabels;
        // Gets important data about the button explicitly from the application
        // tslint:disable-next-line: no-input-rename
        this.data = {};
    }
    // Listen to button hover actions
    /**
     * @param {?} $event
     * @return {?}
     */
    onMouseOver($event) {
        this.eventDetails = $event;
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.sendData();
        }), 10);
    }
    // Sending data on button hover
    /**
     * @return {?}
     */
    sendData() {
        /** @type {?} */
        const analyticsBean = this.analyticsService.setAnalyticsData(this.data, this.eventDetails, this.eventLabels.MOUSE_HOVER, '');
        this.dataStorage.appendToAnalyticsArray(analyticsBean);
    }
}
ButtonHoverDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line: directive-selector
                selector: '[track-buttonHover]'
            },] },
];
ButtonHoverDirective.ctorParameters = () => [
    { type: DataStorageService },
    { type: AnalyticsService }
];
ButtonHoverDirective.propDecorators = {
    data: [{ type: Input, args: ['track-buttonHover',] }],
    onMouseOver: [{ type: HostListener, args: ['mouseover', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class EnvironmentService {
    // Sets Whether the user is authenticated or not
    /**
     * @param {?} isAuth
     * @return {?}
     */
    setAuthentication(isAuth) {
        environment.isAuth = isAuth;
    }
    // Setting credentials on environment
    /**
     * @param {?} credentials
     * @param {?} isPageLoadingToBeDetected
     * @return {?}
     */
    setCredentialsToEnvironment(credentials, isPageLoadingToBeDetected) {
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
            const bucketName = (credentials.bucketName.authenticatedBucket === '') ? credentials.bucketName.publicBucket :
                credentials.bucketName.authenticatedBucket;
            environment.bucketName = {
                authenticatedBucket: bucketName,
                publicBucket: bucketName,
                screenshotBucket: credentials.bucketName.screenshotBucket
            };
        }
    }
}
EnvironmentService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */ EnvironmentService.ngInjectableDef = defineInjectable({ factory: function EnvironmentService_Factory() { return new EnvironmentService(); }, token: EnvironmentService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RouterService {
    /**
     * @param {?} routes
     * @param {?} analyticsService
     * @param {?} dataStorage
     * @param {?} document
     */
    constructor(routes, analyticsService, dataStorage, document) {
        this.routes = routes;
        this.analyticsService = analyticsService;
        this.dataStorage = dataStorage;
        this.document = document;
        this.eventLabels = EventLabels;
        this.navigateOn = '';
    }
    /**
     * Tracking router events
     * @return {?}
     */
    trackRouterEvents() {
        /** Triggered when current page is loaded */
        this.routes.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** Triggered when NavigationEnd event occurs */
            if (event instanceof NavigationEnd) {
                if (this.navigateOn !== event.url) {
                    this.analyticsPushData(event);
                    this.navigateOn = event.url;
                }
            }
            else if (event instanceof NavigationError) {
                /** Triggered when NavigationError event occurs */
                this.analyticsPushData(event);
            }
        }));
    }
    /**
     * Pushing analytics data
     * @param {?} event - Router Event
     * @return {?}
     */
    analyticsPushData(event) {
        /** @type {?} */
        const screenshotName = new Date().getTime().toString();
        this.analyticsData = this.analyticsService.setAnalyticsData({}, {}, this.eventLabels.PAGE_LOAD, `${screenshotName}.html`, event.url);
        this.waitTillPageLoad(screenshotName);
        // Data is send only when user configure the page loading to be true
        this.dataStorage.setUrlKey(this.analyticsData.eventComponent);
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.dataStorage.appendToAnalyticsArray(this.analyticsData);
        }), 0);
    }
    /**
     * Waiting for page to load completely
     * @param {?} screenshotName
     * @return {?}
     */
    waitTillPageLoad(screenshotName) {
        /** @type {?} */
        const _self = this;
        /** @type {?} */
        const interval$$1 = setInterval((/**
         * @return {?}
         */
        function () {
            if (this.document.readyState === 'complete') {
                clearInterval(interval$$1);
                _self.captureTemplate(screenshotName);
            }
        }), 1000);
    }
    /**
     * Capture template of loaded view
     * @param {?} screenshotName - Screenshot image
     * @return {?}
     */
    captureTemplate(screenshotName) {
        /** @type {?} */
        const fullPageHTML = ngS3AnalyticsJS.constructHTMLPage(this.processRegexOperations(this.document.head.innerHTML), this.processRegexOperations(this.document.body.innerHTML));
        this.analyticsService.saveScreenshotsInS3(fullPageHTML, screenshotName);
    }
    /**
     * @param {?} text
     * @return {?}
     */
    processRegexOperations(text) {
        return ngS3AnalyticsJS.doRegex(text, window.location.origin);
    }
}
RouterService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
RouterService.ctorParameters = () => [
    { type: Router },
    { type: AnalyticsService },
    { type: DataStorageService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ RouterService.ngInjectableDef = defineInjectable({ factory: function RouterService_Factory() { return new RouterService(inject(Router), inject(AnalyticsService), inject(DataStorageService), inject(DOCUMENT)); }, token: RouterService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PointerService {
    /**
     * @param {?} dataStorage
     * @param {?} analyticsService
     */
    constructor(dataStorage, analyticsService) {
        this.dataStorage = dataStorage;
        this.analyticsService = analyticsService;
        this.eventLabels = EventLabels;
        // tslint:disable-next-line: no-input-rename
        this.data = {};
    }
    /**
     * Track Mouse Movement
     * @return {?}
     */
    trackMouseMoveEvent() {
        fromEvent(window, 'mousemove')
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.eventDetails = e;
            this.sendData();
        }));
    }
    /**
     * Pushing Mouse Move details
     * @return {?}
     */
    sendData() {
        /** @type {?} */
        const analyticsBean = this.analyticsService.setAnalyticsData(this.data, this.eventDetails, this.eventLabels.MOUSE_MOVE, '');
        this.dataStorage.appendToAnalyticsArray(analyticsBean);
    }
}
PointerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
PointerService.ctorParameters = () => [
    { type: DataStorageService },
    { type: AnalyticsService }
];
PointerService.propDecorators = {
    data: [{ type: Input, args: ['track-pointer',] }]
};
/** @nocollapse */ PointerService.ngInjectableDef = defineInjectable({ factory: function PointerService_Factory() { return new PointerService(inject(DataStorageService), inject(AnalyticsService)); }, token: PointerService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GlobalErrorHandler {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        this.injector = injector;
        this.eventLabels = EventLabels;
        /** @type {?} */
        const analyticsService = this.injector.get(AnalyticsService);
        if (window.console && console.error) {
            /** @type {?} */
            const consoleErrorFnObject = console.error;
            console.error = (/**
             * @param {...?} error
             * @return {?}
             */
            function (...error) {
                /** @type {?} */
                const processedError = error.map((/**
                 * @param {?} e
                 * @return {?}
                 */
                e => {
                    if (typeof (e) === 'object') {
                        return JSON.stringify(e);
                    }
                    else {
                        return e;
                    }
                }));
                // tslint:disable-next-line: max-line-length
                /** @type {?} */
                const analyticsBean = analyticsService.setAnalyticsData(processedError, {}, this.eventLabels.CONSOLE_ERROR, '');
                analyticsService.publishConsoleErrors(analyticsBean);
                consoleErrorFnObject.call(console, error);
            });
        }
    }
    /**
     * Implementing the method
     * @param {?} error
     * @return {?}
     */
    handleError(error) { }
}
GlobalErrorHandler.decorators = [
    { type: Injectable },
];
GlobalErrorHandler.ctorParameters = () => [
    { type: Injector }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgS3AnalyticsModule {
    /**
     * @param {?} routerService
     * @param {?} dataStorage
     * @param {?} pointerService
     */
    constructor(routerService, dataStorage, pointerService) {
        this.routerService = routerService;
        this.dataStorage = dataStorage;
        this.pointerService = pointerService;
        window.addEventListener('beforeunload', (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.dataStorage.pushDataArrayToS3();
        }));
        interval(1000 * 2).subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.dataStorage.pushDataArrayToS3();
        }));
        this.pointerService.trackMouseMoveEvent();
        this.routerService.trackRouterEvents();
    }
    // Configuring the initial setup for s3 bucket and page loading
    /**
     * @param {?} credentials
     * @param {?=} isPageLoadingToBeDetected
     * @return {?}
     */
    static forRoot(credentials, isPageLoadingToBeDetected = false) {
        this.environmentService.setCredentialsToEnvironment(credentials, isPageLoadingToBeDetected);
        // Assigning the credentials to environment variables
        return {
            ngModule: NgS3AnalyticsModule,
            providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }]
        };
    }
}
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
NgS3AnalyticsModule.ctorParameters = () => [
    { type: RouterService },
    { type: DataStorageService },
    { type: PointerService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgS3AnalyticsService, NgS3AnalyticsComponent, NgS3AnalyticsModule, EnvironmentService, DataStorageService, ButtonHoverDirective as ɵd, ButtonDirective as ɵa, ScrollDirective as ɵc, AnalyticsService as ɵb, PointerService as ɵe, RouterService as ɵf };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kYWdsb2JhbC1uZy1zMy1hbmFseXRpY3MuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLmNvbXBvbmVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi90eXBlcy9ldmVudC50eXBlcy50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL2RpcmVjdGl2ZXMvYnV0dG9uL2J1dHRvbi5kaXJlY3RpdmUudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9kaXJlY3RpdmVzL2J1dHRvbi1ob3Zlci9idXR0b24taG92ZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL3BvaW50ZXIvcG9pbnRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2Vycm9yLWhhbmRsZXIvZXJyb3JIYW5kbGVyLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW5nLXMzLWFuYWx5dGljcycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBuZy1zMy1hbmFseXRpY3Mgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiZXhwb3J0IGxldCBlbnZpcm9ubWVudCA9IHtcbiAgICBhY2Nlc3NLZXlJZDogJycsXG4gICAgc2VjcmV0QWNjZXNzS2V5OiAnJyxcbiAgICBzZXNzaW9uVG9rZW46ICcnLFxuICAgIGJ1Y2tldE5hbWU6IHtcbiAgICAgICAgYXV0aGVudGljYXRlZEJ1Y2tldDogJycsXG4gICAgICAgIHB1YmxpY0J1Y2tldDogJycsXG4gICAgICAgIHNjcmVlbnNob3RCdWNrZXQ6ICcnXG4gICAgfSxcbiAgICBmaWxlTmFtZTogJycsXG4gICAgcmVnaW9uOiAnJyxcbiAgICBpc0F1dGg6IGZhbHNlLFxuICAgIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ6IHRydWVcbn07XG5cblxuIiwiZXhwb3J0IGVudW0gRXZlbnRMYWJlbHMge1xuICAgIFBBR0VfTE9BRCA9ICdQQUdFX0xPQUQnLFxuICAgIE1PVVNFX0hPVkVSID0gJ01PVVNFX0hPVkVSJyxcbiAgICBCVVRUT05fQ0xJQ0sgPSAnQlVUVE9OX0NMSUNLJyxcbiAgICBNT1VTRV9NT1ZFID0gJ01PVVNFX01PVkUnLFxuICAgIFNDUk9MTCA9ICdTQ1JPTEwnLFxuICAgIENPTlNPTEVfRVJST1IgPSAnQ09OU09MRV9FUlJPUidcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIEFXUyBmcm9tICdhd3Mtc2RrJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQnO1xuaW1wb3J0ICogYXMgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbi8qKlxuICogQW5hbHl0aWNzIFNlcnZpY2VcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQW5hbHl0aWNzU2VydmljZSB7XG5cbiAgLyoqXG4gICAqIFNlc3Npb25JZCBvZiBwbHVnaW5cbiAgICovXG4gIHNlc3Npb25JZDogc3RyaW5nO1xuICBkZW1vZ3JhcGhpY0luZm86IGFueSA9IHt9O1xuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UsIHByaXZhdGUgaHR0cFNlcnZpY2U6IEh0dHBDbGllbnQpIHtcbiAgICBpZiAoIXRoaXMuY29va2llU2VydmljZS5jaGVjaygnZGVtb2dyYXBoaWMtaW5mbycpKSB7XG4gICAgICB0aGlzLmdldElwKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVtb2dyYXBoaWNJbmZvID0gSlNPTi5wYXJzZSh0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0KCdkZW1vZ3JhcGhpYy1pbmZvJykpO1xuICAgIH1cbiAgICB0aGlzLnNldFNlc3Npb25JZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNraW5nIHdoZXRoZXIgc2Vzc2lvbklkIHByZXNlbnQgaW4gY29va2llIG9yIG5vdFxuICAgKiBpZiBubyBzZXNzaW9uIGlkIGNvb2tpZSBwcmVzZW50LCBhZGRpbmcgbmV3IHNlc3Npb24gaWQgb3RoZXJ3aXNlIHJldXNpbmcgdGhlIHNlc3Npb24gaWQgdmFsdWVcbiAgICovXG4gIHByaXZhdGUgc2V0U2Vzc2lvbklkKCk6IHZvaWQge1xuICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCduZ1MzQW5hbHl0aWNzU2Vzc2lvbklkJykpIHtcbiAgICAgIHRoaXMuc2Vzc2lvbklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnbmdTM0FuYWx5dGljc1Nlc3Npb25JZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlc3Npb25JZCA9IHV1aWQudjQoKTtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ25nUzNBbmFseXRpY3NTZXNzaW9uSWQnLCB0aGlzLnNlc3Npb25JZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgQW5hbHl0aWNzIGRhdGEgdG8gZGlmZmVyZW50IGJ1Y2tldCBiYXNlZCBvbiBBdXRoZW50aWNhdGlvbiBmbGFnXG4gICAqIEBwYXJhbSBkYXRhIFxuICAgKi9cbiAgcHVibGljIHB1c2hEYXRhKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGlmIChlbnZpcm9ubWVudC5pc0F1dGgpIHtcbiAgICAgIHRoaXMucHVibGlzaFRPQXV0aFMzKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnB1Ymxpc2hUT1VuQXV0aFMzKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIGRhdGEgdG8gVW5BdXRoZW50aWNhdGVkIEJ1Y2tldCBTM1xuICAgKiBAcGFyYW0gZGF0YSBcbiAgICovXG4gIHByaXZhdGUgcHVibGlzaFRPVW5BdXRoUzMoZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAvKioqIENvbnN0cnVjdCBTMyBCdWNrZXQgb2JqZWN0ICovXG4gICAgY29uc3QgczNCdWNrZXQ6IEFXUy5TMyA9IHRoaXMuY29uc3RydWN0UzNPYmplY3QoKTtcblxuICAgIC8qKiogU2V0dGluZyB0aGUgcGFyYW1zIGZvciBzMyAqL1xuICAgIGNvbnN0IHBhcmFtczogeyBCdWNrZXQ6IHN0cmluZywgS2V5OiBzdHJpbmcsIEJvZHk6IHN0cmluZywgQ29udGVudFR5cGU6IHN0cmluZyB9ID0ge1xuICAgICAgQnVja2V0OiBlbnZpcm9ubWVudC5idWNrZXROYW1lLnB1YmxpY0J1Y2tldCxcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXG4gICAgICBLZXk6IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfV8ke3RoaXMuc2Vzc2lvbklkfV8ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKX0uanNvbmAsXG4gICAgICBCb2R5OiB0aGlzLnByb2Nlc3NGb3JBdGhlbmEoZGF0YS5ldmVudFZhbHVlcyksXG4gICAgICBDb250ZW50VHlwZTogJ2pzb24nXG4gICAgfTtcbiAgICAvKioqIFB1c2hpbmcgdGhlIGRhdGEgdG8gczMgKi9cbiAgICBzM0J1Y2tldC5wdXRPYmplY3QocGFyYW1zLCAoZXJyOiBBV1MuQVdTRXJyb3IsIHJlc0RhdGE6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydGluZyBKU09OIEFycmF5IHRvIHN0cmluZyBcbiAgICogQHBhcmFtIGRhdGEgXG4gICAqL1xuICBwcm9jZXNzRm9yQXRoZW5hKGRhdGE6IEFycmF5PEFuYWx5dGljc0JlYW4+KTogc3RyaW5nIHtcbiAgICByZXR1cm4gZGF0YS5tYXAoKG9iamVjdDogYW55KSA9PiB7XG4gICAgICBvYmplY3RbJ3Nlc3Npb25JZCddID0gdGhpcy5zZXNzaW9uSWQ7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqZWN0KTtcbiAgICB9KS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIC8qKlxuICAgICogUHVzaGluZyBkYXRhIHRvIEF1dGhlbnRpY2F0ZWQgQnVja2V0IFMzXG4gICAgKiBAcGFyYW0gZGF0YSBcbiAgICAqL1xuICBwdWJsaXNoVE9BdXRoUzMoZGF0YTogYW55KSB7XG5cbiAgICAvKioqIENvbnN0cnVjdCBTMyBCdWNrZXQgb2JqZWN0ICovXG4gICAgY29uc3QgczNCdWNrZXQ6IEFXUy5TMyA9IHRoaXMuY29uc3RydWN0UzNPYmplY3QoKTtcbiAgICAvKioqIFNldHRpbmcgdGhlIHBhcmFtcyBmb3IgczMgKi9cbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBCdWNrZXQ6IGVudmlyb25tZW50LmJ1Y2tldE5hbWUuYXV0aGVudGljYXRlZEJ1Y2tldCxcbiAgICAgIEtleTogYCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19XyR7dGhpcy5zZXNzaW9uSWR9XyR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfS5qc29uYCxcbiAgICAgIEJvZHk6IHRoaXMucHJvY2Vzc0ZvckF0aGVuYShkYXRhLmV2ZW50VmFsdWVzKSxcbiAgICAgIENvbnRlbnRUeXBlOiAnanNvbidcbiAgICB9O1xuICAgIC8qKiogUHVzaGluZyB0aGUgZGF0YSB0byBzMyAqL1xuICAgIHMzQnVja2V0LnB1dE9iamVjdChwYXJhbXMsIChlcnI6IEFXUy5BV1NFcnJvciwgcmVzRGF0YTogYW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Vycm9yJywgZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cblxuICAvKipcbiAgICogQ29uc3RydWN0IFMzIE9iamVjdCB1c2luZyBBV1MgU0RLXG4gICAqL1xuICBwcml2YXRlIGNvbnN0cnVjdFMzT2JqZWN0KCk6IEFXUy5TMyB7XG4gICAgcmV0dXJuIG5ldyBBV1MuUzMoe1xuICAgICAgYWNjZXNzS2V5SWQ6IGVudmlyb25tZW50LmFjY2Vzc0tleUlkLFxuICAgICAgc2VjcmV0QWNjZXNzS2V5OiBlbnZpcm9ubWVudC5zZWNyZXRBY2Nlc3NLZXksXG4gICAgICByZWdpb246IGVudmlyb25tZW50LnJlZ2lvblxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwbG9hZGluZyBjYXB0dXJlZCBiYXNlNjQgaW1hZ2UgdG8gUzNcbiAgICogQHBhcmFtIGltYWdlIC0gQmFzZTY0IFN0cmluZ1xuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgLSBTY3JlZW5zaG90IG5hbWUgbGlua2VkIHdpdGggcGFnZUxvYWRlZCBkYXRhXG4gICAqL1xuICBwdWJsaWMgc2F2ZVNjcmVlbnNob3RzSW5TMyhodG1sVGVtcGxhdGU6IHN0cmluZywgc2NyZWVuc2hvdE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIC8vIGNvbnN0cnVjdGluZyB0aGUgUzMgb2JqZWN0XG4gICAgY29uc3QgczNCdWNrZXQ6IEFXUy5TMyA9IHRoaXMuY29uc3RydWN0UzNPYmplY3QoKTtcbiAgICAvLyBwcmVwYXJpbmcgZGF0YSB0byBiZSBwdXNoZWQgdG8gYnVja2V0XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgQnVja2V0OiBlbnZpcm9ubWVudC5idWNrZXROYW1lLnNjcmVlbnNob3RCdWNrZXQsXG4gICAgICBLZXk6IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfS8ke3RoaXMuc2Vzc2lvbklkfS9zY3JlZW5zaG90cy8ke3NjcmVlbnNob3ROYW1lfS5odG1sYCxcbiAgICAgIEJvZHk6IGh0bWxUZW1wbGF0ZSxcbiAgICAgIENvbnRlbnRUeXBlOiAndGV4dC9odG1sJ1xuICAgIH07XG5cbiAgICAvKiogUHVzaGluZyB0byBTMyBidWNrZXQgKi9cbiAgICBzM0J1Y2tldC51cGxvYWQocGFyYW1zLCAoZXJyOiBBV1MuQVdTRXJyb3IsIHJlc0RhdGE6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBjb25zb2xlIGVycm9ycyB0byBTMyBidWNrZXRcbiAgICogQHBhcmFtIGRhdGEgXG4gICAqL1xuICBwdWJsaWMgcHVibGlzaENvbnNvbGVFcnJvcnMoZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAvLyBDb25maWd1cmluZyB0aGUgczNcbiAgICBjb25zdCBzM0J1Y2tldDogQVdTLlMzID0gdGhpcy5jb25zdHJ1Y3RTM09iamVjdCgpO1xuICAgIGRhdGFbJ3Nlc3Npb25JZCddID0gdGhpcy5zZXNzaW9uSWQ7XG5cbiAgICAvLyBTZXR0aW5nIHRoZSBwYXJhbXMgZm9yIHMzXG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgQnVja2V0OiBlbnZpcm9ubWVudC5idWNrZXROYW1lLmF1dGhlbnRpY2F0ZWRCdWNrZXQsXG4gICAgICBLZXk6IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfV8ke3RoaXMuc2Vzc2lvbklkfV9jb25zb2xlX2Vycm9yc18ke25ldyBEYXRlKCkuZ2V0VGltZSgpfS5qc29uYCxcbiAgICAgIEJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgQ29udGVudFR5cGU6ICdqc29uJ1xuICAgIH07XG4gICAgLy8gUHVzaGluZyB0aGUgZGF0YSB0byBzM1xuICAgIHMzQnVja2V0LnB1dE9iamVjdChwYXJhbXMsIChlcnI6IEFXUy5BV1NFcnJvciwgcmVzRGF0YTogYW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG5cblxuICAvKipcbiAgICogU2V0dGluZyBhbmFseXRpY3Mgb2JqZWN0IHRvIGJlIHNhdmVkIGluIFMzIGJ1Y2tldFxuICAgKiBAcGFyYW0gdXNlckRhdGEgLSBEYXRhIHRyYW5zZmVycmVkIHRvIEV2ZW50IERpcmVjdGl2ZVxuICAgKiBAcGFyYW0gZXZlbnREZXRhaWxzIC0gUG9zaXRpb24gb2YgZXZlbnRzXG4gICAqIEBwYXJhbSBldmVudE5hbWUgIC0gVHlwZSBvZiBldmVudFxuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgIC0gZmlsZSBuYW1lIG9mIHNhdmVkIHNjcmVlbnNob3QgaWYgdGhlIGV2ZW50IGlzIFBhZ2VMb2FkZWRcbiAgICovXG4gIHNldEFuYWx5dGljc0RhdGEoXG4gICAgdXNlckRhdGE6IGFueSA9IHt9LFxuICAgIGV2ZW50RGV0YWlsczogYW55LFxuICAgIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgIHNjcmVlbnNob3ROYW1lOiBzdHJpbmcsXG4gICAgZXZlbnRDb21wb25lbnQ/OiBzdHJpbmcpOiBBbmFseXRpY3NCZWFuIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID0ge1xuICAgICAgZXZlbnRMYWJlbDogZXZlbnROYW1lLFxuICAgICAgZXZlbnRDb21wb25lbnQ6IGV2ZW50Q29tcG9uZW50ID8gZXZlbnRDb21wb25lbnQgOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJz8nKVswXSxcbiAgICAgIGJyb3dzZXI6IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgZnVsbFVSTDogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICByZXNvbHV0aW9uOiB3aW5kb3cuaW5uZXJXaWR0aCArICd4JyArIHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgIHhDb29yZDogZXZlbnREZXRhaWxzWydjbGllbnRYJ10gIT09IHVuZGVmaW5lZCA/IGV2ZW50RGV0YWlsc1snY2xpZW50WCddLnRvU3RyaW5nKCkgOiAnMCcgfHwgJzAnLFxuICAgICAgeUNvb3JkOiBldmVudERldGFpbHNbJ2NsaWVudFknXSAhPT0gdW5kZWZpbmVkID8gZXZlbnREZXRhaWxzWydjbGllbnRZJ10udG9TdHJpbmcoKSA6ICcwJyB8fCAnMCcsXG4gICAgICBwYWdlWENvb3JkOiB3aW5kb3cucGFnZVhPZmZzZXQudG9TdHJpbmcoKSB8fCAnMCcsXG4gICAgICBwYWdlWUNvb3JkOiB3aW5kb3cucGFnZVlPZmZzZXQudG9TdHJpbmcoKSB8fCAnMCcsXG4gICAgICBldmVudFRpbWU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIHNjcmVlbnNob3Q6IHNjcmVlbnNob3ROYW1lLFxuICAgICAgYWRkaXRpb25hbEluZm86IEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSxcbiAgICAgIHV0bTogdGhpcy5nZXRVVE1QYXJhbWV0ZXJzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKSxcbiAgICAgIGRlbW9ncmFwaGljSW5mbzogdGhpcy5kZW1vZ3JhcGhpY0luZm8sXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxuICAgICAgaHRtbEVsZW1lbnQ6IGV2ZW50RGV0YWlsc1sndGFyZ2V0J10gPyBldmVudERldGFpbHNbJ3RhcmdldCddWydpbm5lckhUTUwnXSA6ICcnXG4gICAgfTtcbiAgICByZXR1cm4gYW5hbHl0aWNzQmVhbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXR0aW5nIFVUTSBQYXJhbWV0ZXJzIGJ5IHByb2Nlc3NpbmcgY3VycmVudCBwYWdlVVJMXG4gICAqIEBwYXJhbSB1cmwgLSBQYWdlIFVSTFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRVVE1QYXJhbWV0ZXJzKHVybDogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCB1dG1PYmplY3QgPSB7fTtcbiAgICBpZiAodXJsLmluY2x1ZGVzKCd1dG0nKSkge1xuICAgICAgY29uc3QgdXRtUGFyYW1zID0gdXJsLnNwbGl0KCc/JylbMV0uc3BsaXQoJyYnKTtcbiAgICAgIHV0bVBhcmFtcy5tYXAocGFyYW0gPT4ge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBwYXJhbS5zcGxpdCgnPScpO1xuICAgICAgICB1dG1PYmplY3RbcGFyYW1zWzBdXSA9IHBhcmFtc1sxXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdXRtT2JqZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB1c2VyIGRlbW9ncmFwaGljIGluZm9ybWF0aW9uIGluIGNvb2tpZXNcbiAgICovXG4gIHByaXZhdGUgZ2V0SXAoKTogdm9pZCB7XG4gICAgdGhpcy5odHRwU2VydmljZS5nZXQoJ2h0dHBzOi8vaXBhcGkuY28vanNvbi8nKS5zdWJzY3JpYmUoXG4gICAgICAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5kZW1vZ3JhcGhpY0luZm8gPSByZXM7XG4gICAgICAgIHRoaXMuY29va2llU2VydmljZS5zZXQoJ2RlbW9ncmFwaGljLWluZm8nLCBKU09OLnN0cmluZ2lmeShyZXMpLCBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArICgxMDAwICogNjAgKiA2MCAqIDI0ICogNykpKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBEYXRhU3RvcmFnZVNlcnZpY2Uge1xuXG4gIGFsbERhdGFBbmFseXRpY3NBcnJheTogQXJyYXk8YW55PiA9IFtdO1xuICBhbGxEYXRhQW5hbHl0aWNzOiB7XG4gICAgcGFnZVVybDogc3RyaW5nLFxuICAgIGV2ZW50VmFsdWVzOiBBcnJheTxhbnk+XG4gIH07XG4gIHByZXZpb3VzVXJsOiBzdHJpbmc7XG4gIGtleXM6IEFycmF5PGFueT4gPSBbXTtcbiAgZXZlbnRDb2xsZWN0b3IgPSBuZXcgTWFwKCk7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYW5hbHl0aWNhbFNlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XG4gIHByaXZhdGUgcm91dGVEZXRhaWxzOiBhbnkgPSBbXTtcbiAgY291bnQgPSAwO1xuICBzZXRVcmxLZXkoZGF0YTogc3RyaW5nKSB7XG4gICAgbGV0IGZsYWcgPSAwO1xuICAgIGlmICh0aGlzLnByZXZpb3VzVXJsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZXZlbnRDb2xsZWN0b3Iuc2V0KGRhdGEsIFtdKTtcbiAgICAgIHRoaXMucHJldmlvdXNVcmwgPSBkYXRhIHx8ICcvJztcbiAgICB9IGVsc2UgaWYgKCEoZGF0YSA9PT0gdGhpcy5wcmV2aW91c1VybCkpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIEFycmF5LmZyb20odGhpcy5ldmVudENvbGxlY3Rvci5rZXlzKCkpKSB7XG4gICAgICAgIGlmIChrZXkgPT09IGRhdGEpIHtcbiAgICAgICAgICBmbGFnID0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZsYWcgPT09IDApIHtcbiAgICAgICAgdGhpcy5ldmVudENvbGxlY3Rvci5zZXQoZGF0YSwgW10pO1xuICAgICAgfVxuICAgICAgdGhpcy5wcmV2aW91c1VybCA9IGRhdGE7XG4gICAgfVxuICB9XG4gIGFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoZGF0YTogQW5hbHl0aWNzQmVhbikge1xuICAgIGlmICh0aGlzLnByZXZpb3VzVXJsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc2V0VXJsS2V5KGRhdGEuZXZlbnRDb21wb25lbnQpO1xuICAgIH1cbiAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLmdldCh0aGlzLnByZXZpb3VzVXJsKS5wdXNoKGRhdGEpO1xuICB9XG5cbiAgcHVzaERhdGFBcnJheVRvUzMoKSB7XG4gICAgdGhpcy5jb3VudCsrO1xuICAgIC8vIHRoaXMuYWxsRGF0YUFuYWx5dGljc01hcCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmtleXMoKSkpKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBBcnJheS5mcm9tKHRoaXMuZXZlbnRDb2xsZWN0b3Iua2V5cygpKSkge1xuICAgICAgdGhpcy5hbGxEYXRhQW5hbHl0aWNzID0ge1xuICAgICAgICBwYWdlVXJsOiBrZXksXG4gICAgICAgIGV2ZW50VmFsdWVzOiBBcnJheS5mcm9tKHRoaXMuZXZlbnRDb2xsZWN0b3IuZ2V0KGtleSkudmFsdWVzKCkpXG4gICAgICB9O1xuICAgICAgdGhpcy5rZXlzLnB1c2goa2V5KTtcbiAgICAgIGlmICh0aGlzLmFsbERhdGFBbmFseXRpY3MuZXZlbnRWYWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmFuYWx5dGljYWxTZXJ2aWNlLnB1c2hEYXRhKHRoaXMuYWxsRGF0YUFuYWx5dGljcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZXZlbnRDb2xsZWN0b3IuY2xlYXIoKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLmtleXMpIHtcbiAgICAgIHRoaXMuZXZlbnRDb2xsZWN0b3Iuc2V0KGtleSwgW10pO1xuICAgIH1cbiAgfVxuXG4gIHNldFJvdXRlRGV0YWlscyhyb3V0ZURldGFpbHM6IGFueSkge1xuICAgIHRoaXMucm91dGVEZXRhaWxzID0gcm91dGVEZXRhaWxzO1xuICB9XG5cbiAgZ2V0Um91dGVEZXRhaWxzKCkge1xuICAgIHJldHVybiB0aGlzLnJvdXRlRGV0YWlscztcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcblxuLyoqXG4gKiBCdXR0b24gRGlyZWN0aXZlIHRvIHRyYWNrIGNsaWNrIGV2ZW50XG4gKiBTZWxlY3RvciBjYW4gYmUgYWRkZWQgdG8gYW55IEhUTUwgRWxlbWVudFxuICovXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbdHJhY2stYnRuXSdcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uRGlyZWN0aXZlIHtcblxuICAvLyBHZXRzIGltcG9ydGFudCBkYXRhIGFib3V0IHRoZSBidXR0b24gZXhwbGljaXRseSBmcm9tIHRoZSBhcHBsaWNhdGlvblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ3RyYWNrLWJ0bicpIGRhdGE6IGFueSA9IHt9O1xuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICBldmVudERldGFpbHM6IGFueTtcblxuICAvKipcbiAgICogQnV0dG9uIFRyYWNraW5nIC0gQ29uc3RydWN0b3JcbiAgICogQHBhcmFtIGRhdGFTdG9yYWdlIC0gRGF0YVN0b3JhZ2VTZXJ2aWNlXG4gICAqIEBwYXJhbSBhbmFseXRpY3NTZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSkgeyB9XG5cblxuICAvKipcbiAgICogIExpc3RlbiB0byBidXR0b24gY2xpY2sgYWN0aW9uc1xuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKSBvbkNsaWNrKCRldmVudDogYW55KSB7XG4gICAgdGhpcy5ldmVudERldGFpbHMgPSAkZXZlbnQ7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNlbmREYXRhKCk7XG4gICAgfSwgMTApO1xuICB9XG5cbiAgLyoqIFNlbmRpbmcgZGF0YSBvbiBidXR0b24gY2xpY2sgKi9cbiAgcHVibGljIHNlbmREYXRhKCk6IHZvaWQge1xuICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEodGhpcy5kYXRhLCB0aGlzLmV2ZW50RGV0YWlscywgdGhpcy5ldmVudExhYmVscy5CVVRUT05fQ0xJQ0ssICcnKTtcbiAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgT25DaGFuZ2VzLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbdHJhY2stc2Nyb2xsXSdcbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIC8vIEdldHMgaW1wb3J0YW50IGRhdGEgYWJvdXQgdGhlIGNvbXBvbmVudCBleHBsaWNpdGx5IGZyb20gdGhlIGFwcGxpY2F0aW9uXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgICBASW5wdXQoJ3RyYWNrLXNjcm9sbCcpIGRhdGE6IGFueSA9IHt9O1xuICAgIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgLy8gQ2FwdHVyZSB0aGUgY2hhbmdlIGluIGRhdGFcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gY2hhbmdlcy5kYXRhLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG5cbiAgICAvLyBUcmlnZ2VyZWQgd2hlbiBhbnkgc2Nyb2xsIGV2ZW50IG9jY3Vyc1xuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpzY3JvbGwnLCBbJyRldmVudCddKSBvblNjcm9sbEV2ZW50KCRldmVudDogYW55KSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZW5kRGF0YSgkZXZlbnQpO1xuICAgICAgICB9LCAxMDApO1xuICAgIH1cblxuXG4gICAgcHVibGljIHNlbmREYXRhKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICAgICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIGV2ZW50LCB0aGlzLmV2ZW50TGFiZWxzLlNDUk9MTCwgJycpO1xuICAgICAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcblxuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW3RyYWNrLWJ1dHRvbkhvdmVyXSdcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uSG92ZXJEaXJlY3RpdmUge1xuICAvKiogKi9cbiAgZXZlbnREZXRhaWxzOiBhbnk7XG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIC8vIEdldHMgaW1wb3J0YW50IGRhdGEgYWJvdXQgdGhlIGJ1dHRvbiBleHBsaWNpdGx5IGZyb20gdGhlIGFwcGxpY2F0aW9uXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgndHJhY2stYnV0dG9uSG92ZXInKSBkYXRhOiBhbnkgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSkgeyB9XG5cbiAgLy8gTGlzdGVuIHRvIGJ1dHRvbiBob3ZlciBhY3Rpb25zXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3ZlcicsIFsnJGV2ZW50J10pIG9uTW91c2VPdmVyKCRldmVudDogYW55KSB7XG4gICAgdGhpcy5ldmVudERldGFpbHMgPSAkZXZlbnQ7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNlbmREYXRhKCk7XG4gICAgfSwgMTApO1xuICB9XG5cbiAgLy8gU2VuZGluZyBkYXRhIG9uIGJ1dHRvbiBob3ZlclxuICBwdWJsaWMgc2VuZERhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIHRoaXMuZXZlbnREZXRhaWxzLCB0aGlzLmV2ZW50TGFiZWxzLk1PVVNFX0hPVkVSLCAnJyk7XG4gICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICB9XG59XG4iLCJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgQ3JlZGVudGlhbHNCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcblxuZXhwb3J0IGNsYXNzIEVudmlyb25tZW50U2VydmljZSB7XG5cbiAgLy8gU2V0cyBXaGV0aGVyIHRoZSB1c2VyIGlzIGF1dGhlbnRpY2F0ZWQgb3Igbm90XG4gIHNldEF1dGhlbnRpY2F0aW9uKGlzQXV0aDogYm9vbGVhbikge1xuICAgIGVudmlyb25tZW50LmlzQXV0aCA9IGlzQXV0aDtcbiAgfVxuXG4gIC8vIFNldHRpbmcgY3JlZGVudGlhbHMgb24gZW52aXJvbm1lbnRcbiAgc2V0Q3JlZGVudGlhbHNUb0Vudmlyb25tZW50KGNyZWRlbnRpYWxzOiBDcmVkZW50aWFsc0JlYW4sIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICBlbnZpcm9ubWVudC5hY2Nlc3NLZXlJZCA9IGNyZWRlbnRpYWxzLmFjY2Vzc0tleUlkO1xuICAgIGVudmlyb25tZW50LmZpbGVOYW1lID0gY3JlZGVudGlhbHMuZmlsZU5hbWU7XG4gICAgZW52aXJvbm1lbnQuc2VjcmV0QWNjZXNzS2V5ID0gY3JlZGVudGlhbHMuc2VjcmV0QWNjZXNzS2V5O1xuICAgIGVudmlyb25tZW50LnNlc3Npb25Ub2tlbiA9IGNyZWRlbnRpYWxzLnNlc3Npb25Ub2tlbjtcbiAgICBlbnZpcm9ubWVudC5yZWdpb24gPSBjcmVkZW50aWFscy5yZWdpb247XG4gICAgZW52aXJvbm1lbnQuaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZCA9IGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ7XG4gICAgaWYgKGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUuYXV0aGVudGljYXRlZEJ1Y2tldCAhPT0gJycgJiYgY3JlZGVudGlhbHMuYnVja2V0TmFtZS5wdWJsaWNCdWNrZXQgIT09ICcnKSB7XG4gICAgICBlbnZpcm9ubWVudC5idWNrZXROYW1lID0ge1xuICAgICAgICBhdXRoZW50aWNhdGVkQnVja2V0OiBjcmVkZW50aWFscy5idWNrZXROYW1lLmF1dGhlbnRpY2F0ZWRCdWNrZXQsXG4gICAgICAgIHB1YmxpY0J1Y2tldDogY3JlZGVudGlhbHMuYnVja2V0TmFtZS5wdWJsaWNCdWNrZXQsXG4gICAgICAgIHNjcmVlbnNob3RCdWNrZXQ6IGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUuc2NyZWVuc2hvdEJ1Y2tldFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYnVja2V0TmFtZSA9IChjcmVkZW50aWFscy5idWNrZXROYW1lLmF1dGhlbnRpY2F0ZWRCdWNrZXQgPT09ICcnKSA/IGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUucHVibGljQnVja2V0IDpcbiAgICAgICAgY3JlZGVudGlhbHMuYnVja2V0TmFtZS5hdXRoZW50aWNhdGVkQnVja2V0O1xuICAgICAgZW52aXJvbm1lbnQuYnVja2V0TmFtZSA9IHtcbiAgICAgICAgYXV0aGVudGljYXRlZEJ1Y2tldDogYnVja2V0TmFtZSxcbiAgICAgICAgcHVibGljQnVja2V0OiBidWNrZXROYW1lLFxuICAgICAgICBzY3JlZW5zaG90QnVja2V0OiBjcmVkZW50aWFscy5idWNrZXROYW1lLnNjcmVlbnNob3RCdWNrZXRcbiAgICAgIH07XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCwgTmF2aWdhdGlvbkVycm9yIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5kZWNsYXJlIGxldCBuZ1MzQW5hbHl0aWNzSlM6IGFueTtcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJvdXRlclNlcnZpY2Uge1xuICBhbmFseXRpY3NEYXRhOiBBbmFseXRpY3NCZWFuO1xuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICBuYXZpZ2F0ZU9uID0gJyc7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVzOiBSb3V0ZXIsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSwgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnkpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFRyYWNraW5nIHJvdXRlciBldmVudHNcbiAgICovXG4gIHB1YmxpYyB0cmFja1JvdXRlckV2ZW50cygpOiB2b2lkIHtcbiAgICAvKiogVHJpZ2dlcmVkIHdoZW4gY3VycmVudCBwYWdlIGlzIGxvYWRlZCAqL1xuICAgIHRoaXMucm91dGVzLmV2ZW50cy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAvKiogVHJpZ2dlcmVkIHdoZW4gTmF2aWdhdGlvbkVuZCBldmVudCBvY2N1cnMgKi9cbiAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgaWYgKHRoaXMubmF2aWdhdGVPbiAhPT0gZXZlbnQudXJsKSB7XG4gICAgICAgICAgdGhpcy5hbmFseXRpY3NQdXNoRGF0YShldmVudCk7XG4gICAgICAgICAgdGhpcy5uYXZpZ2F0ZU9uID0gZXZlbnQudXJsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yKSB7XG4gICAgICAgIC8qKiBUcmlnZ2VyZWQgd2hlbiBOYXZpZ2F0aW9uRXJyb3IgZXZlbnQgb2NjdXJzICovXG4gICAgICAgIHRoaXMuYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgYW5hbHl0aWNzIGRhdGFcbiAgICogQHBhcmFtIGV2ZW50IC0gUm91dGVyIEV2ZW50XG4gICAqL1xuICBwdWJsaWMgYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHNjcmVlbnNob3ROYW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkudG9TdHJpbmcoKTtcbiAgICB0aGlzLmFuYWx5dGljc0RhdGEgPSB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh7fSwge30sIHRoaXMuZXZlbnRMYWJlbHMuUEFHRV9MT0FELCBgJHtzY3JlZW5zaG90TmFtZX0uaHRtbGAsIGV2ZW50LnVybCk7XG4gICAgdGhpcy53YWl0VGlsbFBhZ2VMb2FkKHNjcmVlbnNob3ROYW1lKTtcbiAgICAvLyBEYXRhIGlzIHNlbmQgb25seSB3aGVuIHVzZXIgY29uZmlndXJlIHRoZSBwYWdlIGxvYWRpbmcgdG8gYmUgdHJ1ZVxuICAgIHRoaXMuZGF0YVN0b3JhZ2Uuc2V0VXJsS2V5KHRoaXMuYW5hbHl0aWNzRGF0YS5ldmVudENvbXBvbmVudCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkodGhpcy5hbmFseXRpY3NEYXRhKTtcbiAgICB9LCAwKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFdhaXRpbmcgZm9yIHBhZ2UgdG8gbG9hZCBjb21wbGV0ZWx5XG4gICAqIEBwYXJhbSBldmVudCBcbiAgICovXG4gIHdhaXRUaWxsUGFnZUxvYWQoc2NyZWVuc2hvdE5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIF9zZWxmLmNhcHR1cmVUZW1wbGF0ZShzY3JlZW5zaG90TmFtZSk7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FwdHVyZSB0ZW1wbGF0ZSBvZiBsb2FkZWQgdmlld1xuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgLSBTY3JlZW5zaG90IGltYWdlXG4gICAqL1xuICBjYXB0dXJlVGVtcGxhdGUoc2NyZWVuc2hvdE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZ1bGxQYWdlSFRNTCA9IG5nUzNBbmFseXRpY3NKUy5jb25zdHJ1Y3RIVE1MUGFnZShcbiAgICAgIHRoaXMucHJvY2Vzc1JlZ2V4T3BlcmF0aW9ucyh0aGlzLmRvY3VtZW50LmhlYWQuaW5uZXJIVE1MKSwgdGhpcy5wcm9jZXNzUmVnZXhPcGVyYXRpb25zKHRoaXMuZG9jdW1lbnQuYm9keS5pbm5lckhUTUwpKVxuICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zYXZlU2NyZWVuc2hvdHNJblMzKGZ1bGxQYWdlSFRNTCwgc2NyZWVuc2hvdE5hbWUpO1xuICB9XG5cblxuICBwcm9jZXNzUmVnZXhPcGVyYXRpb25zKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5nUzNBbmFseXRpY3NKUy5kb1JlZ2V4KHRleHQsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbnB1dCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFBvaW50ZXJTZXJ2aWNlIHtcblxuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICBldmVudERldGFpbHM6IGFueTtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCd0cmFjay1wb2ludGVyJykgZGF0YTogYW55ID0ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLCBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UpIHsgfVxuXG4gIC8qKlxuICAgKiBUcmFjayBNb3VzZSBNb3ZlbWVudFxuICAgKi9cbiAgdHJhY2tNb3VzZU1vdmVFdmVudCgpIHtcbiAgICBmcm9tRXZlbnQod2luZG93LCAnbW91c2Vtb3ZlJylcbiAgICAgIC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5ldmVudERldGFpbHMgPSBlO1xuICAgICAgICB0aGlzLnNlbmREYXRhKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIE1vdXNlIE1vdmUgZGV0YWlsc1xuICAgKi9cbiAgcHVibGljIHNlbmREYXRhKCk6IHZvaWQge1xuICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEodGhpcy5kYXRhLCB0aGlzLmV2ZW50RGV0YWlscywgdGhpcy5ldmVudExhYmVscy5NT1VTRV9NT1ZFLCAnJyk7XG4gICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEVycm9ySGFuZGxlciwgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdsb2JhbEVycm9ySGFuZGxlciBpbXBsZW1lbnRzIEVycm9ySGFuZGxlciB7XG4gICAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBjb25zdCBhbmFseXRpY3NTZXJ2aWNlID0gdGhpcy5pbmplY3Rvci5nZXQoQW5hbHl0aWNzU2VydmljZSk7XG4gICAgICAgIGlmICh3aW5kb3cuY29uc29sZSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBjb25zb2xlRXJyb3JGbk9iamVjdCA9IGNvbnNvbGUuZXJyb3I7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yID0gZnVuY3Rpb24gKC4uLmVycm9yOiBhbnlbXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZEVycm9yID0gZXJyb3IubWFwKGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChlKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgICAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID0gYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHByb2Nlc3NlZEVycm9yLCB7fSwgdGhpcy5ldmVudExhYmVscy5DT05TT0xFX0VSUk9SLCAnJyk7XG4gICAgICAgICAgICAgICAgYW5hbHl0aWNzU2VydmljZS5wdWJsaXNoQ29uc29sZUVycm9ycyhhbmFseXRpY3NCZWFuKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlRXJyb3JGbk9iamVjdC5jYWxsKGNvbnNvbGUsIGVycm9yKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogSW1wbGVtZW50aW5nIHRoZSBtZXRob2QgKi9cbiAgICBoYW5kbGVFcnJvcihlcnJvcjogYW55KSB7IH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIEVycm9ySGFuZGxlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdTM0FuYWx5dGljc0NvbXBvbmVudCB9IGZyb20gJy4vbmctczMtYW5hbHl0aWNzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDcmVkZW50aWFsc0JlYW4gfSBmcm9tICcuL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEJ1dHRvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9idXR0b24vYnV0dG9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTY3JvbGxEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2Nyb2xsL3Njcm9sbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQnV0dG9uSG92ZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYnV0dG9uLWhvdmVyL2J1dHRvbi1ob3Zlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRW52aXJvbm1lbnRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IFJvdXRlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3JvdXRlci9yb3V0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBpbnRlcnZhbCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vbGliL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBQb2ludGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcG9pbnRlci9wb2ludGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBHbG9iYWxFcnJvckhhbmRsZXIgfSBmcm9tICcuL3NlcnZpY2VzL2Vycm9yLWhhbmRsZXIvZXJyb3JIYW5kbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJ25neC1jb29raWUtc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOZ1MzQW5hbHl0aWNzQ29tcG9uZW50LFxuICAgIEJ1dHRvbkRpcmVjdGl2ZSxcbiAgICBTY3JvbGxEaXJlY3RpdmUsXG4gICAgQnV0dG9uSG92ZXJEaXJlY3RpdmUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERhdGFTdG9yYWdlU2VydmljZSxcbiAgICBFbnZpcm9ubWVudFNlcnZpY2UsXG4gICAgUG9pbnRlclNlcnZpY2UsXG4gICAgQ29va2llU2VydmljZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTmdTM0FuYWx5dGljc0NvbXBvbmVudCxcbiAgICBCdXR0b25EaXJlY3RpdmUsXG4gICAgU2Nyb2xsRGlyZWN0aXZlLFxuICAgIEJ1dHRvbkhvdmVyRGlyZWN0aXZlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NNb2R1bGUge1xuXG4gIHByaXZhdGUgc3RhdGljIGVudmlyb25tZW50U2VydmljZSA9IG5ldyBFbnZpcm9ubWVudFNlcnZpY2UoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlclNlcnZpY2U6IFJvdXRlclNlcnZpY2UsIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBwb2ludGVyU2VydmljZTogUG9pbnRlclNlcnZpY2UpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKGUpID0+IHtcbiAgICAgIHRoaXMuZGF0YVN0b3JhZ2UucHVzaERhdGFBcnJheVRvUzMoKTtcbiAgICB9KTtcbiAgICBpbnRlcnZhbCgxMDAwICogMikuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5kYXRhU3RvcmFnZS5wdXNoRGF0YUFycmF5VG9TMygpO1xuICAgIH0pO1xuICAgIHRoaXMucG9pbnRlclNlcnZpY2UudHJhY2tNb3VzZU1vdmVFdmVudCgpO1xuICAgIHRoaXMucm91dGVyU2VydmljZS50cmFja1JvdXRlckV2ZW50cygpO1xuICB9XG4gIC8vIENvbmZpZ3VyaW5nIHRoZSBpbml0aWFsIHNldHVwIGZvciBzMyBidWNrZXQgYW5kIHBhZ2UgbG9hZGluZ1xuICBzdGF0aWMgZm9yUm9vdChjcmVkZW50aWFsczogQ3JlZGVudGlhbHNCZWFuLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkOiBib29sZWFuID0gZmFsc2UpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICB0aGlzLmVudmlyb25tZW50U2VydmljZS5zZXRDcmVkZW50aWFsc1RvRW52aXJvbm1lbnQoY3JlZGVudGlhbHMsIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQpO1xuICAgIC8vIEFzc2lnbmluZyB0aGUgY3JlZGVudGlhbHMgdG8gZW52aXJvbm1lbnQgdmFyaWFibGVzXG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ1MzQW5hbHl0aWNzTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBFcnJvckhhbmRsZXIsIHVzZUNsYXNzOiBHbG9iYWxFcnJvckhhbmRsZXIgfV1cbiAgICB9O1xuICB9XG5cblxufVxuIl0sIm5hbWVzIjpbInV1aWQudjQiLCJBV1Mu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