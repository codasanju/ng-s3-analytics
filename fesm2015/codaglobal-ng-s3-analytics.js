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
        }), 2000);
    }
    /**
     * Capture template of loaded view
     * @param {?} screenshotName - Screenshot image
     * @return {?}
     */
    captureTemplate(screenshotName) {
        /** @type {?} */
        const fullPageHTML = `<html>
      <head>
        ${this.processRegexOperations(this.document.head.innerHTML)}
        <style>body {scroll-behavior: smooth;}</style>
      </head>
      <body>
        ${this.processRegexOperations(this.document.body.innerHTML)}
        <script>
          window.addEventListener("message", (e) => {
            try{
              if(e.customData) {
              var data = JSON.parse(e.customData);
              if (data.scroll) {
                window.scroll(0, data.value);
              };
            }
          }catch(e) {console.error(e);}
          });
        </script>
      </body>
    </html>`;
        this.analyticsService.saveScreenshotsInS3(fullPageHTML, screenshotName);
    }
    /**
     * @param {?} text
     * @return {?}
     */
    processRegexOperations(text) {
        return text.replace(/src=\"\//g, `src="${window.location.origin}/`)
            .replace(/url\(\"\//g, `url("${window.location.origin}/`)
            .replace(/href="\//g, `href="${window.location.origin}/`)
            .replace(/src=\'\//g, `src='${window.location.origin}/`)
            .replace(/url\(\'\//g, `url('${window.location.origin}/`)
            .replace(/href=\'\//g, `href='${window.location.origin}/`)
            .replace(/<script.*<\/script>/g, '')
            .replace(/href="(?!http)/g, `href="${window.location.origin}/`);
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
        interval(1000 * 10).subscribe((/**
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kYWdsb2JhbC1uZy1zMy1hbmFseXRpY3MuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLmNvbXBvbmVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3R5cGVzL2V2ZW50LnR5cGVzLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL2RpcmVjdGl2ZXMvYnV0dG9uL2J1dHRvbi5kaXJlY3RpdmUudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9kaXJlY3RpdmVzL2J1dHRvbi1ob3Zlci9idXR0b24taG92ZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL3BvaW50ZXIvcG9pbnRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2Vycm9yLWhhbmRsZXIvZXJyb3JIYW5kbGVyLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW5nLXMzLWFuYWx5dGljcycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBuZy1zMy1hbmFseXRpY3Mgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiZXhwb3J0IGxldCBlbnZpcm9ubWVudCA9IHtcbiAgICBhY2Nlc3NLZXlJZDogJycsXG4gICAgc2VjcmV0QWNjZXNzS2V5OiAnJyxcbiAgICBzZXNzaW9uVG9rZW46ICcnLFxuICAgIGJ1Y2tldE5hbWU6IHtcbiAgICAgICAgYXV0aGVudGljYXRlZEJ1Y2tldDogJycsXG4gICAgICAgIHB1YmxpY0J1Y2tldDogJycsXG4gICAgICAgIHNjcmVlbnNob3RCdWNrZXQ6ICcnXG4gICAgfSxcbiAgICBmaWxlTmFtZTogJycsXG4gICAgcmVnaW9uOiAnJyxcbiAgICBpc0F1dGg6IGZhbHNlLFxuICAgIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ6IHRydWVcbn07XG5cblxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgKiBhcyB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICduZ3gtY29va2llLXNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbi8qKlxuICogQW5hbHl0aWNzIFNlcnZpY2VcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQW5hbHl0aWNzU2VydmljZSB7XG5cbiAgLyoqXG4gICAqIFNlc3Npb25JZCBvZiBwbHVnaW5cbiAgICovXG4gIHNlc3Npb25JZDogc3RyaW5nO1xuICBkZW1vZ3JhcGhpY0luZm86IGFueSA9IHt9O1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UsIHByaXZhdGUgaHR0cFNlcnZpY2U6IEh0dHBDbGllbnQpIHtcbiAgICBpZiAoIXRoaXMuY29va2llU2VydmljZS5jaGVjaygnZGVtb2dyYXBoaWMtaW5mbycpKSB7XG4gICAgICB0aGlzLmdldElwKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVtb2dyYXBoaWNJbmZvID0gSlNPTi5wYXJzZSh0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0KCdkZW1vZ3JhcGhpYy1pbmZvJykpO1xuICAgIH1cbiAgICB0aGlzLnNldFNlc3Npb25JZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNraW5nIHdoZXRoZXIgc2Vzc2lvbklkIHByZXNlbnQgaW4gY29va2llIG9yIG5vdFxuICAgKiBpZiBubyBzZXNzaW9uIGlkIGNvb2tpZSBwcmVzZW50LCBhZGRpbmcgbmV3IHNlc3Npb24gaWQgb3RoZXJ3aXNlIHJldXNpbmcgdGhlIHNlc3Npb24gaWQgdmFsdWVcbiAgICovXG4gIHByaXZhdGUgc2V0U2Vzc2lvbklkKCk6IHZvaWQge1xuICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCduZ1MzQW5hbHl0aWNzU2Vzc2lvbklkJykpIHtcbiAgICAgIHRoaXMuc2Vzc2lvbklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnbmdTM0FuYWx5dGljc1Nlc3Npb25JZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlc3Npb25JZCA9IHV1aWQudjQoKTtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ25nUzNBbmFseXRpY3NTZXNzaW9uSWQnLCB0aGlzLnNlc3Npb25JZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgQW5hbHl0aWNzIGRhdGEgdG8gZGlmZmVyZW50IGJ1Y2tldCBiYXNlZCBvbiBBdXRoZW50aWNhdGlvbiBmbGFnXG4gICAqIEBwYXJhbSBkYXRhIFxuICAgKi9cbiAgcHVibGljIHB1c2hEYXRhKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGlmIChlbnZpcm9ubWVudC5pc0F1dGgpIHtcbiAgICAgIHRoaXMucHVibGlzaFRPQXV0aFMzKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnB1Ymxpc2hUT1VuQXV0aFMzKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIGRhdGEgdG8gVW5BdXRoZW50aWNhdGVkIEJ1Y2tldCBTM1xuICAgKiBAcGFyYW0gZGF0YSBcbiAgICovXG4gIHByaXZhdGUgcHVibGlzaFRPVW5BdXRoUzMoZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAvKioqIENvbnN0cnVjdCBTMyBCdWNrZXQgb2JqZWN0ICovXG4gICAgY29uc3QgczNCdWNrZXQ6IEFXUy5TMyA9IHRoaXMuY29uc3RydWN0UzNPYmplY3QoKTtcblxuICAgIC8qKiogU2V0dGluZyB0aGUgcGFyYW1zIGZvciBzMyAqL1xuICAgIGNvbnN0IHBhcmFtczogeyBCdWNrZXQ6IHN0cmluZywgS2V5OiBzdHJpbmcsIEJvZHk6IHN0cmluZywgQ29udGVudFR5cGU6IHN0cmluZyB9ID0ge1xuICAgICAgQnVja2V0OiBlbnZpcm9ubWVudC5idWNrZXROYW1lLnB1YmxpY0J1Y2tldCxcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXG4gICAgICBLZXk6IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfV8ke3RoaXMuc2Vzc2lvbklkfV8ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKX0uanNvbmAsXG4gICAgICBCb2R5OiB0aGlzLnByb2Nlc3NGb3JBdGhlbmEoZGF0YS5ldmVudFZhbHVlcyksXG4gICAgICBDb250ZW50VHlwZTogJ2pzb24nXG4gICAgfTtcbiAgICAvKioqIFB1c2hpbmcgdGhlIGRhdGEgdG8gczMgKi9cbiAgICBzM0J1Y2tldC5wdXRPYmplY3QocGFyYW1zLCAoZXJyOiBBV1MuQVdTRXJyb3IsIHJlc0RhdGE6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydGluZyBKU09OIEFycmF5IHRvIHN0cmluZyBcbiAgICogQHBhcmFtIGRhdGEgXG4gICAqL1xuICBwcm9jZXNzRm9yQXRoZW5hKGRhdGE6IEFycmF5PEFuYWx5dGljc0JlYW4+KTogc3RyaW5nIHtcbiAgICByZXR1cm4gZGF0YS5tYXAoKG9iamVjdDogYW55KSA9PiB7XG4gICAgICBvYmplY3RbJ3Nlc3Npb25JZCddID0gdGhpcy5zZXNzaW9uSWQ7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqZWN0KTtcbiAgICB9KS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIC8qKlxuICAgICogUHVzaGluZyBkYXRhIHRvIEF1dGhlbnRpY2F0ZWQgQnVja2V0IFMzXG4gICAgKiBAcGFyYW0gZGF0YSBcbiAgICAqL1xuICBwdWJsaXNoVE9BdXRoUzMoZGF0YTogYW55KSB7XG5cbiAgICAvKioqIENvbnN0cnVjdCBTMyBCdWNrZXQgb2JqZWN0ICovXG4gICAgY29uc3QgczNCdWNrZXQ6IEFXUy5TMyA9IHRoaXMuY29uc3RydWN0UzNPYmplY3QoKTtcbiAgICAvKioqIFNldHRpbmcgdGhlIHBhcmFtcyBmb3IgczMgKi9cbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBCdWNrZXQ6IGVudmlyb25tZW50LmJ1Y2tldE5hbWUuYXV0aGVudGljYXRlZEJ1Y2tldCxcbiAgICAgIEtleTogYCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19XyR7dGhpcy5zZXNzaW9uSWR9XyR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfS5qc29uYCxcbiAgICAgIEJvZHk6IHRoaXMucHJvY2Vzc0ZvckF0aGVuYShkYXRhLmV2ZW50VmFsdWVzKSxcbiAgICAgIENvbnRlbnRUeXBlOiAnanNvbidcbiAgICB9O1xuICAgIC8qKiogUHVzaGluZyB0aGUgZGF0YSB0byBzMyAqL1xuICAgIHMzQnVja2V0LnB1dE9iamVjdChwYXJhbXMsIChlcnI6IEFXUy5BV1NFcnJvciwgcmVzRGF0YTogYW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Vycm9yJywgZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cblxuICAvKipcbiAgICogQ29uc3RydWN0IFMzIE9iamVjdCB1c2luZyBBV1MgU0RLXG4gICAqL1xuICBwcml2YXRlIGNvbnN0cnVjdFMzT2JqZWN0KCk6IEFXUy5TMyB7XG4gICAgcmV0dXJuIG5ldyBBV1MuUzMoe1xuICAgICAgYWNjZXNzS2V5SWQ6IGVudmlyb25tZW50LmFjY2Vzc0tleUlkLFxuICAgICAgc2VjcmV0QWNjZXNzS2V5OiBlbnZpcm9ubWVudC5zZWNyZXRBY2Nlc3NLZXksXG4gICAgICByZWdpb246IGVudmlyb25tZW50LnJlZ2lvblxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwbG9hZGluZyBjYXB0dXJlZCBiYXNlNjQgaW1hZ2UgdG8gUzNcbiAgICogQHBhcmFtIGltYWdlIC0gQmFzZTY0IFN0cmluZ1xuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgLSBTY3JlZW5zaG90IG5hbWUgbGlua2VkIHdpdGggcGFnZUxvYWRlZCBkYXRhXG4gICAqL1xuICBwdWJsaWMgc2F2ZVNjcmVlbnNob3RzSW5TMyhodG1sVGVtcGxhdGU6IHN0cmluZywgc2NyZWVuc2hvdE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIC8vIGNvbnN0cnVjdGluZyB0aGUgUzMgb2JqZWN0XG4gICAgY29uc3QgczNCdWNrZXQ6IEFXUy5TMyA9IHRoaXMuY29uc3RydWN0UzNPYmplY3QoKTtcbiAgICAvLyBwcmVwYXJpbmcgZGF0YSB0byBiZSBwdXNoZWQgdG8gYnVja2V0XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgQnVja2V0OiBlbnZpcm9ubWVudC5idWNrZXROYW1lLnNjcmVlbnNob3RCdWNrZXQsXG4gICAgICBLZXk6IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfS8ke3RoaXMuc2Vzc2lvbklkfS9zY3JlZW5zaG90cy8ke3NjcmVlbnNob3ROYW1lfS5odG1sYCxcbiAgICAgIEJvZHk6IGh0bWxUZW1wbGF0ZSxcbiAgICAgIENvbnRlbnRUeXBlOiAndGV4dC9odG1sJ1xuICAgIH07XG5cbiAgICAvKiogUHVzaGluZyB0byBTMyBidWNrZXQgKi9cbiAgICBzM0J1Y2tldC51cGxvYWQocGFyYW1zLCAoZXJyOiBBV1MuQVdTRXJyb3IsIHJlc0RhdGE6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBjb25zb2xlIGVycm9ycyB0byBTMyBidWNrZXRcbiAgICogQHBhcmFtIGRhdGEgXG4gICAqL1xuICBwdWJsaWMgcHVibGlzaENvbnNvbGVFcnJvcnMoZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAvLyBDb25maWd1cmluZyB0aGUgczNcbiAgICBjb25zdCBzM0J1Y2tldDogQVdTLlMzID0gdGhpcy5jb25zdHJ1Y3RTM09iamVjdCgpO1xuICAgIGRhdGFbJ3Nlc3Npb25JZCddID0gdGhpcy5zZXNzaW9uSWQ7XG5cbiAgICAvLyBTZXR0aW5nIHRoZSBwYXJhbXMgZm9yIHMzXG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgQnVja2V0OiBlbnZpcm9ubWVudC5idWNrZXROYW1lLmF1dGhlbnRpY2F0ZWRCdWNrZXQsXG4gICAgICBLZXk6IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfV8ke3RoaXMuc2Vzc2lvbklkfV9jb25zb2xlX2Vycm9yc18ke25ldyBEYXRlKCkuZ2V0VGltZSgpfS5qc29uYCxcbiAgICAgIEJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgQ29udGVudFR5cGU6ICdqc29uJ1xuICAgIH07XG4gICAgLy8gUHVzaGluZyB0aGUgZGF0YSB0byBzM1xuICAgIHMzQnVja2V0LnB1dE9iamVjdChwYXJhbXMsIChlcnI6IEFXUy5BV1NFcnJvciwgcmVzRGF0YTogYW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG5cblxuICAvKipcbiAgICogU2V0dGluZyBhbmFseXRpY3Mgb2JqZWN0IHRvIGJlIHNhdmVkIGluIFMzIGJ1Y2tldFxuICAgKiBAcGFyYW0gdXNlckRhdGEgLSBEYXRhIHRyYW5zZmVycmVkIHRvIEV2ZW50IERpcmVjdGl2ZVxuICAgKiBAcGFyYW0gZXZlbnREZXRhaWxzIC0gUG9zaXRpb24gb2YgZXZlbnRzXG4gICAqIEBwYXJhbSBldmVudE5hbWUgIC0gVHlwZSBvZiBldmVudFxuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgIC0gZmlsZSBuYW1lIG9mIHNhdmVkIHNjcmVlbnNob3QgaWYgdGhlIGV2ZW50IGlzIFBhZ2VMb2FkZWRcbiAgICovXG4gIHNldEFuYWx5dGljc0RhdGEoXG4gICAgdXNlckRhdGE6IGFueSA9IHt9LFxuICAgIGV2ZW50RGV0YWlsczogYW55LFxuICAgIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgIHNjcmVlbnNob3ROYW1lOiBzdHJpbmcsXG4gICAgZXZlbnRDb21wb25lbnQ/OiBzdHJpbmcpOiBBbmFseXRpY3NCZWFuIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID0ge1xuICAgICAgZXZlbnRMYWJlbDogZXZlbnROYW1lLFxuICAgICAgZXZlbnRDb21wb25lbnQ6IGV2ZW50Q29tcG9uZW50ID8gZXZlbnRDb21wb25lbnQgOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJz8nKVswXSxcbiAgICAgIGJyb3dzZXI6IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgZnVsbFVSTDogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICByZXNvbHV0aW9uOiB3aW5kb3cuaW5uZXJXaWR0aCArICd4JyArIHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgIHhDb29yZDogZXZlbnREZXRhaWxzWydjbGllbnRYJ10gIT09IHVuZGVmaW5lZCA/IGV2ZW50RGV0YWlsc1snY2xpZW50WCddLnRvU3RyaW5nKCkgOiAnMCcgfHwgJzAnLFxuICAgICAgeUNvb3JkOiBldmVudERldGFpbHNbJ2NsaWVudFknXSAhPT0gdW5kZWZpbmVkID8gZXZlbnREZXRhaWxzWydjbGllbnRZJ10udG9TdHJpbmcoKSA6ICcwJyB8fCAnMCcsXG4gICAgICBwYWdlWENvb3JkOiB3aW5kb3cucGFnZVhPZmZzZXQudG9TdHJpbmcoKSB8fCAnMCcsXG4gICAgICBwYWdlWUNvb3JkOiB3aW5kb3cucGFnZVlPZmZzZXQudG9TdHJpbmcoKSB8fCAnMCcsXG4gICAgICBldmVudFRpbWU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIHNjcmVlbnNob3Q6IHNjcmVlbnNob3ROYW1lLFxuICAgICAgYWRkaXRpb25hbEluZm86IEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSxcbiAgICAgIHV0bTogdGhpcy5nZXRVVE1QYXJhbWV0ZXJzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKSxcbiAgICAgIGRlbW9ncmFwaGljSW5mbzogdGhpcy5kZW1vZ3JhcGhpY0luZm8sXG4gICAgICBodG1sRWxlbWVudDogZXZlbnREZXRhaWxzWyd0YXJnZXQnXSA/IGV2ZW50RGV0YWlsc1sndGFyZ2V0J11bJ2lubmVySFRNTCddIDogJydcbiAgICB9O1xuICAgIHJldHVybiBhbmFseXRpY3NCZWFuO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHRpbmcgVVRNIFBhcmFtZXRlcnMgYnkgcHJvY2Vzc2luZyBjdXJyZW50IHBhZ2VVUkxcbiAgICogQHBhcmFtIHVybCAtIFBhZ2UgVVJMXG4gICAqL1xuICBwcml2YXRlIGdldFVUTVBhcmFtZXRlcnModXJsOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IHV0bU9iamVjdCA9IHt9O1xuICAgIGlmICh1cmwuaW5jbHVkZXMoJ3V0bScpKSB7XG4gICAgICBjb25zdCB1dG1QYXJhbXMgPSB1cmwuc3BsaXQoJz8nKVsxXS5zcGxpdCgnJicpO1xuICAgICAgdXRtUGFyYW1zLm1hcChwYXJhbSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHBhcmFtLnNwbGl0KCc9Jyk7XG4gICAgICAgIHV0bU9iamVjdFtwYXJhbXNbMF1dID0gcGFyYW1zWzFdO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB1dG1PYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHVzZXIgZGVtb2dyYXBoaWMgaW5mb3JtYXRpb24gaW4gY29va2llc1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRJcCgpOiB2b2lkIHtcbiAgICB0aGlzLmh0dHBTZXJ2aWNlLmdldCgnaHR0cHM6Ly9pcGFwaS5jby9qc29uLycpLnN1YnNjcmliZShcbiAgICAgIChyZXM6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLmRlbW9ncmFwaGljSW5mbyA9IHJlcztcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCgnZGVtb2dyYXBoaWMtaW5mbycsIEpTT04uc3RyaW5naWZ5KHJlcyksIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKDEwMDAgKiA2MCAqIDYwICogMjQgKiA3KSkpO1xuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERhdGFTdG9yYWdlU2VydmljZSB7XG5cbiAgYWxsRGF0YUFuYWx5dGljc0FycmF5OiBBcnJheTxhbnk+ID0gW107XG4gIGFsbERhdGFBbmFseXRpY3M6IHtcbiAgICBwYWdlVXJsOiBzdHJpbmcsXG4gICAgZXZlbnRWYWx1ZXM6IEFycmF5PGFueT5cbiAgfTtcbiAgcHJldmlvdXNVcmw6IHN0cmluZztcbiAga2V5czogQXJyYXk8YW55PiA9IFtdO1xuICBldmVudENvbGxlY3RvciA9IG5ldyBNYXAoKTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhbmFseXRpY2FsU2VydmljZTogQW5hbHl0aWNzU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cbiAgcHJpdmF0ZSByb3V0ZURldGFpbHM6IGFueSA9IFtdO1xuICBjb3VudCA9IDA7XG4gIHNldFVybEtleShkYXRhOiBzdHJpbmcpIHtcbiAgICBsZXQgZmxhZyA9IDA7XG4gICAgaWYgKHRoaXMucHJldmlvdXNVcmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5ldmVudENvbGxlY3Rvci5zZXQoZGF0YSwgW10pO1xuICAgICAgdGhpcy5wcmV2aW91c1VybCA9IGRhdGEgfHwgJy8nO1xuICAgIH0gZWxzZSBpZiAoIShkYXRhID09PSB0aGlzLnByZXZpb3VzVXJsKSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmtleXMoKSkpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gZGF0YSkge1xuICAgICAgICAgIGZsYWcgPSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZmxhZyA9PT0gMCkge1xuICAgICAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLnNldChkYXRhLCBbXSk7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXZpb3VzVXJsID0gZGF0YTtcbiAgICB9XG4gIH1cbiAgYXBwZW5kVG9BbmFseXRpY3NBcnJheShkYXRhOiBBbmFseXRpY3NCZWFuKSB7XG4gICAgaWYgKHRoaXMucHJldmlvdXNVcmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zZXRVcmxLZXkoZGF0YS5ldmVudENvbXBvbmVudCk7XG4gICAgfVxuICAgIHRoaXMuZXZlbnRDb2xsZWN0b3IuZ2V0KHRoaXMucHJldmlvdXNVcmwpLnB1c2goZGF0YSk7XG4gIH1cblxuICBwdXNoRGF0YUFycmF5VG9TMygpIHtcbiAgICB0aGlzLmNvdW50Kys7XG4gICAgLy8gdGhpcy5hbGxEYXRhQW5hbHl0aWNzTWFwID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShBcnJheS5mcm9tKHRoaXMuZXZlbnRDb2xsZWN0b3Iua2V5cygpKSkpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIEFycmF5LmZyb20odGhpcy5ldmVudENvbGxlY3Rvci5rZXlzKCkpKSB7XG4gICAgICB0aGlzLmFsbERhdGFBbmFseXRpY3MgPSB7XG4gICAgICAgIHBhZ2VVcmw6IGtleSxcbiAgICAgICAgZXZlbnRWYWx1ZXM6IEFycmF5LmZyb20odGhpcy5ldmVudENvbGxlY3Rvci5nZXQoa2V5KS52YWx1ZXMoKSlcbiAgICAgIH07XG4gICAgICB0aGlzLmtleXMucHVzaChrZXkpO1xuICAgICAgaWYgKHRoaXMuYWxsRGF0YUFuYWx5dGljcy5ldmVudFZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuYW5hbHl0aWNhbFNlcnZpY2UucHVzaERhdGEodGhpcy5hbGxEYXRhQW5hbHl0aWNzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5ldmVudENvbGxlY3Rvci5jbGVhcigpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMua2V5cykge1xuICAgICAgdGhpcy5ldmVudENvbGxlY3Rvci5zZXQoa2V5LCBbXSk7XG4gICAgfVxuICB9XG5cbiAgc2V0Um91dGVEZXRhaWxzKHJvdXRlRGV0YWlsczogYW55KSB7XG4gICAgdGhpcy5yb3V0ZURldGFpbHMgPSByb3V0ZURldGFpbHM7XG4gIH1cblxuICBnZXRSb3V0ZURldGFpbHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVEZXRhaWxzO1xuICB9XG5cbn1cbiIsImV4cG9ydCBlbnVtIEV2ZW50TGFiZWxzIHtcbiAgICBQQUdFX0xPQUQgPSAnUEFHRV9MT0FEJyxcbiAgICBNT1VTRV9IT1ZFUiA9ICdNT1VTRV9IT1ZFUicsXG4gICAgQlVUVE9OX0NMSUNLID0gJ0JVVFRPTl9DTElDSycsXG4gICAgTU9VU0VfTU9WRSA9ICdNT1VTRV9NT1ZFJyxcbiAgICBTQ1JPTEwgPSAnU0NST0xMJyxcbiAgICBDT05TT0xFX0VSUk9SID0gJ0NPTlNPTEVfRVJST1InXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcblxuLyoqXG4gKiBCdXR0b24gRGlyZWN0aXZlIHRvIHRyYWNrIGNsaWNrIGV2ZW50XG4gKiBTZWxlY3RvciBjYW4gYmUgYWRkZWQgdG8gYW55IEhUTUwgRWxlbWVudFxuICovXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbdHJhY2stYnRuXSdcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uRGlyZWN0aXZlIHtcblxuICAvLyBHZXRzIGltcG9ydGFudCBkYXRhIGFib3V0IHRoZSBidXR0b24gZXhwbGljaXRseSBmcm9tIHRoZSBhcHBsaWNhdGlvblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ3RyYWNrLWJ0bicpIGRhdGE6IGFueSA9IHt9O1xuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICBldmVudERldGFpbHM6IGFueTtcblxuICAvKipcbiAgICogQnV0dG9uIFRyYWNraW5nIC0gQ29uc3RydWN0b3JcbiAgICogQHBhcmFtIGRhdGFTdG9yYWdlIC0gRGF0YVN0b3JhZ2VTZXJ2aWNlXG4gICAqIEBwYXJhbSBhbmFseXRpY3NTZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSkgeyB9XG5cblxuICAvKipcbiAgICogIExpc3RlbiB0byBidXR0b24gY2xpY2sgYWN0aW9uc1xuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKSBvbkNsaWNrKCRldmVudDogYW55KSB7XG4gICAgdGhpcy5ldmVudERldGFpbHMgPSAkZXZlbnQ7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNlbmREYXRhKCk7XG4gICAgfSwgMTApO1xuICB9XG5cbiAgLyoqIFNlbmRpbmcgZGF0YSBvbiBidXR0b24gY2xpY2sgKi9cbiAgcHVibGljIHNlbmREYXRhKCk6IHZvaWQge1xuICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEodGhpcy5kYXRhLCB0aGlzLmV2ZW50RGV0YWlscywgdGhpcy5ldmVudExhYmVscy5CVVRUT05fQ0xJQ0ssICcnKTtcbiAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgT25DaGFuZ2VzLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbdHJhY2stc2Nyb2xsXSdcbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIC8vIEdldHMgaW1wb3J0YW50IGRhdGEgYWJvdXQgdGhlIGNvbXBvbmVudCBleHBsaWNpdGx5IGZyb20gdGhlIGFwcGxpY2F0aW9uXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgICBASW5wdXQoJ3RyYWNrLXNjcm9sbCcpIGRhdGE6IGFueSA9IHt9O1xuICAgIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgLy8gQ2FwdHVyZSB0aGUgY2hhbmdlIGluIGRhdGFcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gY2hhbmdlcy5kYXRhLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG5cbiAgICAvLyBUcmlnZ2VyZWQgd2hlbiBhbnkgc2Nyb2xsIGV2ZW50IG9jY3Vyc1xuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpzY3JvbGwnLCBbJyRldmVudCddKSBvblNjcm9sbEV2ZW50KCRldmVudDogYW55KSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZW5kRGF0YSgkZXZlbnQpO1xuICAgICAgICB9LCAxMDApO1xuICAgIH1cblxuXG4gICAgcHVibGljIHNlbmREYXRhKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICAgICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIGV2ZW50LCB0aGlzLmV2ZW50TGFiZWxzLlNDUk9MTCwgJycpO1xuICAgICAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcblxuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW3RyYWNrLWJ1dHRvbkhvdmVyXSdcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uSG92ZXJEaXJlY3RpdmUge1xuICAvKiogKi9cbiAgZXZlbnREZXRhaWxzOiBhbnk7XG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIC8vIEdldHMgaW1wb3J0YW50IGRhdGEgYWJvdXQgdGhlIGJ1dHRvbiBleHBsaWNpdGx5IGZyb20gdGhlIGFwcGxpY2F0aW9uXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgndHJhY2stYnV0dG9uSG92ZXInKSBkYXRhOiBhbnkgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSkgeyB9XG5cbiAgLy8gTGlzdGVuIHRvIGJ1dHRvbiBob3ZlciBhY3Rpb25zXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3ZlcicsIFsnJGV2ZW50J10pIG9uTW91c2VPdmVyKCRldmVudDogYW55KSB7XG4gICAgdGhpcy5ldmVudERldGFpbHMgPSAkZXZlbnQ7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNlbmREYXRhKCk7XG4gICAgfSwgMTApO1xuICB9XG5cbiAgLy8gU2VuZGluZyBkYXRhIG9uIGJ1dHRvbiBob3ZlclxuICBwdWJsaWMgc2VuZERhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIHRoaXMuZXZlbnREZXRhaWxzLCB0aGlzLmV2ZW50TGFiZWxzLk1PVVNFX0hPVkVSLCAnJyk7XG4gICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICB9XG59XG4iLCJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgQ3JlZGVudGlhbHNCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcblxuZXhwb3J0IGNsYXNzIEVudmlyb25tZW50U2VydmljZSB7XG5cbiAgLy8gU2V0cyBXaGV0aGVyIHRoZSB1c2VyIGlzIGF1dGhlbnRpY2F0ZWQgb3Igbm90XG4gIHNldEF1dGhlbnRpY2F0aW9uKGlzQXV0aDogYm9vbGVhbikge1xuICAgIGVudmlyb25tZW50LmlzQXV0aCA9IGlzQXV0aDtcbiAgfVxuXG4gIC8vIFNldHRpbmcgY3JlZGVudGlhbHMgb24gZW52aXJvbm1lbnRcbiAgc2V0Q3JlZGVudGlhbHNUb0Vudmlyb25tZW50KGNyZWRlbnRpYWxzOiBDcmVkZW50aWFsc0JlYW4sIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICBlbnZpcm9ubWVudC5hY2Nlc3NLZXlJZCA9IGNyZWRlbnRpYWxzLmFjY2Vzc0tleUlkO1xuICAgIGVudmlyb25tZW50LmZpbGVOYW1lID0gY3JlZGVudGlhbHMuZmlsZU5hbWU7XG4gICAgZW52aXJvbm1lbnQuc2VjcmV0QWNjZXNzS2V5ID0gY3JlZGVudGlhbHMuc2VjcmV0QWNjZXNzS2V5O1xuICAgIGVudmlyb25tZW50LnNlc3Npb25Ub2tlbiA9IGNyZWRlbnRpYWxzLnNlc3Npb25Ub2tlbjtcbiAgICBlbnZpcm9ubWVudC5yZWdpb24gPSBjcmVkZW50aWFscy5yZWdpb247XG4gICAgZW52aXJvbm1lbnQuaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZCA9IGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ7XG4gICAgaWYgKGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUuYXV0aGVudGljYXRlZEJ1Y2tldCAhPT0gJycgJiYgY3JlZGVudGlhbHMuYnVja2V0TmFtZS5wdWJsaWNCdWNrZXQgIT09ICcnKSB7XG4gICAgICBlbnZpcm9ubWVudC5idWNrZXROYW1lID0ge1xuICAgICAgICBhdXRoZW50aWNhdGVkQnVja2V0OiBjcmVkZW50aWFscy5idWNrZXROYW1lLmF1dGhlbnRpY2F0ZWRCdWNrZXQsXG4gICAgICAgIHB1YmxpY0J1Y2tldDogY3JlZGVudGlhbHMuYnVja2V0TmFtZS5wdWJsaWNCdWNrZXQsXG4gICAgICAgIHNjcmVlbnNob3RCdWNrZXQ6IGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUuc2NyZWVuc2hvdEJ1Y2tldFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYnVja2V0TmFtZSA9IChjcmVkZW50aWFscy5idWNrZXROYW1lLmF1dGhlbnRpY2F0ZWRCdWNrZXQgPT09ICcnKSA/IGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUucHVibGljQnVja2V0IDpcbiAgICAgICAgY3JlZGVudGlhbHMuYnVja2V0TmFtZS5hdXRoZW50aWNhdGVkQnVja2V0O1xuICAgICAgZW52aXJvbm1lbnQuYnVja2V0TmFtZSA9IHtcbiAgICAgICAgYXV0aGVudGljYXRlZEJ1Y2tldDogYnVja2V0TmFtZSxcbiAgICAgICAgcHVibGljQnVja2V0OiBidWNrZXROYW1lLFxuICAgICAgICBzY3JlZW5zaG90QnVja2V0OiBjcmVkZW50aWFscy5idWNrZXROYW1lLnNjcmVlbnNob3RCdWNrZXRcbiAgICAgIH07XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCwgTmF2aWdhdGlvbkVycm9yIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSb3V0ZXJTZXJ2aWNlIHtcbiAgYW5hbHl0aWNzRGF0YTogQW5hbHl0aWNzQmVhbjtcbiAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgbmF2aWdhdGVPbiA9ICcnO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlczogUm91dGVyLCBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSxcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55KSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFja2luZyByb3V0ZXIgZXZlbnRzXG4gICAqL1xuICBwdWJsaWMgdHJhY2tSb3V0ZXJFdmVudHMoKTogdm9pZCB7XG4gICAgLyoqIFRyaWdnZXJlZCB3aGVuIGN1cnJlbnQgcGFnZSBpcyBsb2FkZWQgKi9cbiAgICB0aGlzLnJvdXRlcy5ldmVudHMuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgLyoqIFRyaWdnZXJlZCB3aGVuIE5hdmlnYXRpb25FbmQgZXZlbnQgb2NjdXJzICovXG4gICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XG4gICAgICAgIGlmICh0aGlzLm5hdmlnYXRlT24gIT09IGV2ZW50LnVybCkge1xuICAgICAgICAgIHRoaXMuYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQpO1xuICAgICAgICAgIHRoaXMubmF2aWdhdGVPbiA9IGV2ZW50LnVybDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FcnJvcikge1xuICAgICAgICAvKiogVHJpZ2dlcmVkIHdoZW4gTmF2aWdhdGlvbkVycm9yIGV2ZW50IG9jY3VycyAqL1xuICAgICAgICB0aGlzLmFuYWx5dGljc1B1c2hEYXRhKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIGFuYWx5dGljcyBkYXRhXG4gICAqIEBwYXJhbSBldmVudCAtIFJvdXRlciBFdmVudFxuICAgKi9cbiAgcHVibGljIGFuYWx5dGljc1B1c2hEYXRhKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBzY3JlZW5zaG90TmFtZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5hbmFseXRpY3NEYXRhID0gdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEoe30sIHt9LCB0aGlzLmV2ZW50TGFiZWxzLlBBR0VfTE9BRCwgYCR7c2NyZWVuc2hvdE5hbWV9Lmh0bWxgLCBldmVudC51cmwpO1xuICAgIHRoaXMud2FpdFRpbGxQYWdlTG9hZChzY3JlZW5zaG90TmFtZSk7XG4gICAgLy8gRGF0YSBpcyBzZW5kIG9ubHkgd2hlbiB1c2VyIGNvbmZpZ3VyZSB0aGUgcGFnZSBsb2FkaW5nIHRvIGJlIHRydWVcbiAgICB0aGlzLmRhdGFTdG9yYWdlLnNldFVybEtleSh0aGlzLmFuYWx5dGljc0RhdGEuZXZlbnRDb21wb25lbnQpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KHRoaXMuYW5hbHl0aWNzRGF0YSk7XG4gICAgfSwgMCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBXYWl0aW5nIGZvciBwYWdlIHRvIGxvYWQgY29tcGxldGVseVxuICAgKiBAcGFyYW0gZXZlbnQgXG4gICAqL1xuICB3YWl0VGlsbFBhZ2VMb2FkKHNjcmVlbnNob3ROYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5kb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICBfc2VsZi5jYXB0dXJlVGVtcGxhdGUoc2NyZWVuc2hvdE5hbWUpO1xuICAgICAgfVxuICAgIH0sIDIwMDApO1xuICB9XG5cbiAgLyoqXG4gICAqIENhcHR1cmUgdGVtcGxhdGUgb2YgbG9hZGVkIHZpZXdcbiAgICogQHBhcmFtIHNjcmVlbnNob3ROYW1lIC0gU2NyZWVuc2hvdCBpbWFnZVxuICAgKi9cbiAgY2FwdHVyZVRlbXBsYXRlKHNjcmVlbnNob3ROYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmdWxsUGFnZUhUTUwgPSBgPGh0bWw+XG4gICAgICA8aGVhZD5cbiAgICAgICAgJHt0aGlzLnByb2Nlc3NSZWdleE9wZXJhdGlvbnModGhpcy5kb2N1bWVudC5oZWFkLmlubmVySFRNTCl9XG4gICAgICAgIDxzdHlsZT5ib2R5IHtzY3JvbGwtYmVoYXZpb3I6IHNtb290aDt9PC9zdHlsZT5cbiAgICAgIDwvaGVhZD5cbiAgICAgIDxib2R5PlxuICAgICAgICAke3RoaXMucHJvY2Vzc1JlZ2V4T3BlcmF0aW9ucyh0aGlzLmRvY3VtZW50LmJvZHkuaW5uZXJIVE1MKX1cbiAgICAgICAgPHNjcmlwdD5cbiAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgaWYoZS5jdXN0b21EYXRhKSB7XG4gICAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShlLmN1c3RvbURhdGEpO1xuICAgICAgICAgICAgICBpZiAoZGF0YS5zY3JvbGwpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsKDAsIGRhdGEudmFsdWUpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1jYXRjaChlKSB7Y29uc29sZS5lcnJvcihlKTt9XG4gICAgICAgICAgfSk7XG4gICAgICAgIDwvc2NyaXB0PlxuICAgICAgPC9ib2R5PlxuICAgIDwvaHRtbD5gO1xuXG4gICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNhdmVTY3JlZW5zaG90c0luUzMoZnVsbFBhZ2VIVE1MLCBzY3JlZW5zaG90TmFtZSk7XG4gIH1cblxuXG4gIHByb2Nlc3NSZWdleE9wZXJhdGlvbnModGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC9zcmM9XFxcIlxcLy9nLCBgc3JjPVwiJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9gKVxuICAgICAgLnJlcGxhY2UoL3VybFxcKFxcXCJcXC8vZywgYHVybChcIiR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYClcbiAgICAgIC5yZXBsYWNlKC9ocmVmPVwiXFwvL2csIGBocmVmPVwiJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9gKVxuICAgICAgLnJlcGxhY2UoL3NyYz1cXCdcXC8vZywgYHNyYz0nJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9gKVxuICAgICAgLnJlcGxhY2UoL3VybFxcKFxcJ1xcLy9nLCBgdXJsKCcke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2ApXG4gICAgICAucmVwbGFjZSgvaHJlZj1cXCdcXC8vZywgYGhyZWY9JyR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYClcbiAgICAgIC5yZXBsYWNlKC88c2NyaXB0Lio8XFwvc2NyaXB0Pi9nLCAnJylcbiAgICAgIC5yZXBsYWNlKC9ocmVmPVwiKD8haHR0cCkvZywgYGhyZWY9XCIke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2ApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbnB1dCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFBvaW50ZXJTZXJ2aWNlIHtcblxuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICBldmVudERldGFpbHM6IGFueTtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCd0cmFjay1wb2ludGVyJykgZGF0YTogYW55ID0ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLCBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UpIHsgfVxuXG4gIC8qKlxuICAgKiBUcmFjayBNb3VzZSBNb3ZlbWVudFxuICAgKi9cbiAgdHJhY2tNb3VzZU1vdmVFdmVudCgpIHtcbiAgICBmcm9tRXZlbnQod2luZG93LCAnbW91c2Vtb3ZlJylcbiAgICAgIC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5ldmVudERldGFpbHMgPSBlO1xuICAgICAgICB0aGlzLnNlbmREYXRhKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIE1vdXNlIE1vdmUgZGV0YWlsc1xuICAgKi9cbiAgcHVibGljIHNlbmREYXRhKCk6IHZvaWQge1xuICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEodGhpcy5kYXRhLCB0aGlzLmV2ZW50RGV0YWlscywgdGhpcy5ldmVudExhYmVscy5NT1VTRV9NT1ZFLCAnJyk7XG4gICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEVycm9ySGFuZGxlciwgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdsb2JhbEVycm9ySGFuZGxlciBpbXBsZW1lbnRzIEVycm9ySGFuZGxlciB7XG4gICAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBjb25zdCBhbmFseXRpY3NTZXJ2aWNlID0gdGhpcy5pbmplY3Rvci5nZXQoQW5hbHl0aWNzU2VydmljZSk7XG4gICAgICAgIGlmICh3aW5kb3cuY29uc29sZSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBjb25zb2xlRXJyb3JGbk9iamVjdCA9IGNvbnNvbGUuZXJyb3I7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yID0gZnVuY3Rpb24gKC4uLmVycm9yOiBhbnlbXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZEVycm9yID0gZXJyb3IubWFwKGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChlKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgICAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID0gYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHByb2Nlc3NlZEVycm9yLCB7fSwgdGhpcy5ldmVudExhYmVscy5DT05TT0xFX0VSUk9SLCAnJyk7XG4gICAgICAgICAgICAgICAgYW5hbHl0aWNzU2VydmljZS5wdWJsaXNoQ29uc29sZUVycm9ycyhhbmFseXRpY3NCZWFuKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlRXJyb3JGbk9iamVjdC5jYWxsKGNvbnNvbGUsIGVycm9yKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogSW1wbGVtZW50aW5nIHRoZSBtZXRob2QgKi9cbiAgICBoYW5kbGVFcnJvcihlcnJvcjogYW55KSB7IH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIEVycm9ySGFuZGxlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdTM0FuYWx5dGljc0NvbXBvbmVudCB9IGZyb20gJy4vbmctczMtYW5hbHl0aWNzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDcmVkZW50aWFsc0JlYW4gfSBmcm9tICcuL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEJ1dHRvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9idXR0b24vYnV0dG9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTY3JvbGxEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2Nyb2xsL3Njcm9sbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQnV0dG9uSG92ZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYnV0dG9uLWhvdmVyL2J1dHRvbi1ob3Zlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRW52aXJvbm1lbnRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IFJvdXRlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3JvdXRlci9yb3V0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBpbnRlcnZhbCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vbGliL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBQb2ludGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcG9pbnRlci9wb2ludGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBHbG9iYWxFcnJvckhhbmRsZXIgfSBmcm9tICcuL3NlcnZpY2VzL2Vycm9yLWhhbmRsZXIvZXJyb3JIYW5kbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJ25neC1jb29raWUtc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOZ1MzQW5hbHl0aWNzQ29tcG9uZW50LFxuICAgIEJ1dHRvbkRpcmVjdGl2ZSxcbiAgICBTY3JvbGxEaXJlY3RpdmUsXG4gICAgQnV0dG9uSG92ZXJEaXJlY3RpdmUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERhdGFTdG9yYWdlU2VydmljZSxcbiAgICBFbnZpcm9ubWVudFNlcnZpY2UsXG4gICAgUG9pbnRlclNlcnZpY2UsXG4gICAgQ29va2llU2VydmljZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTmdTM0FuYWx5dGljc0NvbXBvbmVudCxcbiAgICBCdXR0b25EaXJlY3RpdmUsXG4gICAgU2Nyb2xsRGlyZWN0aXZlLFxuICAgIEJ1dHRvbkhvdmVyRGlyZWN0aXZlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NNb2R1bGUge1xuXG4gIHByaXZhdGUgc3RhdGljIGVudmlyb25tZW50U2VydmljZSA9IG5ldyBFbnZpcm9ubWVudFNlcnZpY2UoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlclNlcnZpY2U6IFJvdXRlclNlcnZpY2UsIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBwb2ludGVyU2VydmljZTogUG9pbnRlclNlcnZpY2UpIHtcbiAgICBpbnRlcnZhbCgxMDAwICogMTApLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMuZGF0YVN0b3JhZ2UucHVzaERhdGFBcnJheVRvUzMoKTtcbiAgICB9KTtcbiAgICB0aGlzLnBvaW50ZXJTZXJ2aWNlLnRyYWNrTW91c2VNb3ZlRXZlbnQoKTtcbiAgICB0aGlzLnJvdXRlclNlcnZpY2UudHJhY2tSb3V0ZXJFdmVudHMoKTtcbiAgfVxuICAvLyBDb25maWd1cmluZyB0aGUgaW5pdGlhbCBzZXR1cCBmb3IgczMgYnVja2V0IGFuZCBwYWdlIGxvYWRpbmdcbiAgc3RhdGljIGZvclJvb3QoY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzQmVhbiwgaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDogYm9vbGVhbiA9IGZhbHNlKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgdGhpcy5lbnZpcm9ubWVudFNlcnZpY2Uuc2V0Q3JlZGVudGlhbHNUb0Vudmlyb25tZW50KGNyZWRlbnRpYWxzLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkKTtcbiAgICAvLyBBc3NpZ25pbmcgdGhlIGNyZWRlbnRpYWxzIHRvIGVudmlyb25tZW50IHZhcmlhYmxlc1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmdTM0FuYWx5dGljc01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogRXJyb3JIYW5kbGVyLCB1c2VDbGFzczogR2xvYmFsRXJyb3JIYW5kbGVyIH1dXG4gICAgfTtcbiAgfVxuXG5cbn1cbiJdLCJuYW1lcyI6WyJ1dWlkLnY0IiwiQVdTLlMzIiwiaW50ZXJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFPRSxpQkFBaUI7OztZQUxsQixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7Ozs7OztBQ0pEO0lBYUUsaUJBQWlCOzs7O0lBRWpCLFFBQVE7S0FDUDs7O1lBZEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRTs7OztHQUlUO2dCQUNELE1BQU0s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