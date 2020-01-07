import { Injectable, Input, Directive, HostListener, Inject, Component, NgModule, ErrorHandler, Injector, defineInjectable, inject } from '@angular/core';
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
        if (this.cookieService.check('ngS3AnalyticsSessionId')) {
            this.sessionId = this.cookieService.get('ngS3AnalyticsSessionId');
        }
        else {
            this.sessionId = v4();
            this.cookieService.set('ngS3AnalyticsSessionId', this.sessionId, new Date(new Date().getTime() + (1000 * 60 * 60)));
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
            htmlElement: eventDetails['srcElement']
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kYWdsb2JhbC1uZy1zMy1hbmFseXRpY3MuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLmNvbXBvbmVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3R5cGVzL2V2ZW50LnR5cGVzLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL2RpcmVjdGl2ZXMvYnV0dG9uL2J1dHRvbi5kaXJlY3RpdmUudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9kaXJlY3RpdmVzL2J1dHRvbi1ob3Zlci9idXR0b24taG92ZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL3BvaW50ZXIvcG9pbnRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2Vycm9yLWhhbmRsZXIvZXJyb3JIYW5kbGVyLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW5nLXMzLWFuYWx5dGljcycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBuZy1zMy1hbmFseXRpY3Mgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiZXhwb3J0IGxldCBlbnZpcm9ubWVudCA9IHtcbiAgICBhY2Nlc3NLZXlJZDogJycsXG4gICAgc2VjcmV0QWNjZXNzS2V5OiAnJyxcbiAgICBzZXNzaW9uVG9rZW46ICcnLFxuICAgIGJ1Y2tldE5hbWU6IHtcbiAgICAgICAgYXV0aGVudGljYXRlZEJ1Y2tldDogJycsXG4gICAgICAgIHB1YmxpY0J1Y2tldDogJycsXG4gICAgICAgIHNjcmVlbnNob3RCdWNrZXQ6ICcnXG4gICAgfSxcbiAgICBmaWxlTmFtZTogJycsXG4gICAgcmVnaW9uOiAnJyxcbiAgICBpc0F1dGg6IGZhbHNlLFxuICAgIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ6IHRydWVcbn07XG5cblxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgKiBhcyB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICduZ3gtY29va2llLXNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbi8qKlxuICogQW5hbHl0aWNzIFNlcnZpY2VcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQW5hbHl0aWNzU2VydmljZSB7XG5cbiAgLyoqXG4gICAqIFNlc3Npb25JZCBvZiBwbHVnaW5cbiAgICovXG4gIHNlc3Npb25JZDogc3RyaW5nO1xuICBkZW1vZ3JhcGhpY0luZm86IGFueSA9IHt9O1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UsIHByaXZhdGUgaHR0cFNlcnZpY2U6IEh0dHBDbGllbnQpIHtcbiAgICBpZiAoIXRoaXMuY29va2llU2VydmljZS5jaGVjaygnZGVtb2dyYXBoaWMtaW5mbycpKSB7XG4gICAgICB0aGlzLmdldElwKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVtb2dyYXBoaWNJbmZvID0gSlNPTi5wYXJzZSh0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0KCdkZW1vZ3JhcGhpYy1pbmZvJykpO1xuICAgIH1cbiAgICB0aGlzLnNldFNlc3Npb25JZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNraW5nIHdoZXRoZXIgc2Vzc2lvbklkIHByZXNlbnQgaW4gY29va2llIG9yIG5vdFxuICAgKiBpZiBubyBzZXNzaW9uIGlkIGNvb2tpZSBwcmVzZW50LCBhZGRpbmcgbmV3IHNlc3Npb24gaWQgb3RoZXJ3aXNlIHJldXNpbmcgdGhlIHNlc3Npb24gaWQgdmFsdWVcbiAgICovXG4gIHByaXZhdGUgc2V0U2Vzc2lvbklkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvb2tpZVNlcnZpY2UuY2hlY2soJ25nUzNBbmFseXRpY3NTZXNzaW9uSWQnKSkge1xuICAgICAgdGhpcy5zZXNzaW9uSWQgPSB0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0KCduZ1MzQW5hbHl0aWNzU2Vzc2lvbklkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2Vzc2lvbklkID0gdXVpZC52NCgpO1xuICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCgnbmdTM0FuYWx5dGljc1Nlc3Npb25JZCcsIHRoaXMuc2Vzc2lvbklkLCBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArICgxMDAwICogNjAgKiA2MCkpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBBbmFseXRpY3MgZGF0YSB0byBkaWZmZXJlbnQgYnVja2V0IGJhc2VkIG9uIEF1dGhlbnRpY2F0aW9uIGZsYWdcbiAgICogQHBhcmFtIGRhdGEgXG4gICAqL1xuICBwdWJsaWMgcHVzaERhdGEoZGF0YTogYW55KTogdm9pZCB7XG4gICAgaWYgKGVudmlyb25tZW50LmlzQXV0aCkge1xuICAgICAgdGhpcy5wdWJsaXNoVE9BdXRoUzMoZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHVibGlzaFRPVW5BdXRoUzMoZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgZGF0YSB0byBVbkF1dGhlbnRpY2F0ZWQgQnVja2V0IFMzXG4gICAqIEBwYXJhbSBkYXRhIFxuICAgKi9cbiAgcHJpdmF0ZSBwdWJsaXNoVE9VbkF1dGhTMyhkYXRhOiBhbnkpOiB2b2lkIHtcblxuICAgIC8qKiogQ29uc3RydWN0IFMzIEJ1Y2tldCBvYmplY3QgKi9cbiAgICBjb25zdCBzM0J1Y2tldDogQVdTLlMzID0gdGhpcy5jb25zdHJ1Y3RTM09iamVjdCgpO1xuXG4gICAgLyoqKiBTZXR0aW5nIHRoZSBwYXJhbXMgZm9yIHMzICovXG4gICAgY29uc3QgcGFyYW1zOiB7IEJ1Y2tldDogc3RyaW5nLCBLZXk6IHN0cmluZywgQm9keTogc3RyaW5nLCBDb250ZW50VHlwZTogc3RyaW5nIH0gPSB7XG4gICAgICBCdWNrZXQ6IGVudmlyb25tZW50LmJ1Y2tldE5hbWUucHVibGljQnVja2V0LFxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcbiAgICAgIEtleTogYCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19XyR7dGhpcy5zZXNzaW9uSWR9XyR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfS5qc29uYCxcbiAgICAgIEJvZHk6IHRoaXMucHJvY2Vzc0ZvckF0aGVuYShkYXRhLmV2ZW50VmFsdWVzKSxcbiAgICAgIENvbnRlbnRUeXBlOiAnanNvbidcbiAgICB9O1xuICAgIC8qKiogUHVzaGluZyB0aGUgZGF0YSB0byBzMyAqL1xuICAgIHMzQnVja2V0LnB1dE9iamVjdChwYXJhbXMsIChlcnI6IEFXUy5BV1NFcnJvciwgcmVzRGF0YTogYW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0aW5nIEpTT04gQXJyYXkgdG8gc3RyaW5nIFxuICAgKiBAcGFyYW0gZGF0YSBcbiAgICovXG4gIHByb2Nlc3NGb3JBdGhlbmEoZGF0YTogQXJyYXk8QW5hbHl0aWNzQmVhbj4pOiBzdHJpbmcge1xuICAgIHJldHVybiBkYXRhLm1hcCgob2JqZWN0OiBhbnkpID0+IHtcbiAgICAgIG9iamVjdFsnc2Vzc2lvbklkJ10gPSB0aGlzLnNlc3Npb25JZDtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmplY3QpO1xuICAgIH0pLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgLyoqXG4gICAgKiBQdXNoaW5nIGRhdGEgdG8gQXV0aGVudGljYXRlZCBCdWNrZXQgUzNcbiAgICAqIEBwYXJhbSBkYXRhIFxuICAgICovXG4gIHB1Ymxpc2hUT0F1dGhTMyhkYXRhOiBhbnkpIHtcblxuICAgIC8qKiogQ29uc3RydWN0IFMzIEJ1Y2tldCBvYmplY3QgKi9cbiAgICBjb25zdCBzM0J1Y2tldDogQVdTLlMzID0gdGhpcy5jb25zdHJ1Y3RTM09iamVjdCgpO1xuICAgIC8qKiogU2V0dGluZyB0aGUgcGFyYW1zIGZvciBzMyAqL1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIEJ1Y2tldDogZW52aXJvbm1lbnQuYnVja2V0TmFtZS5hdXRoZW50aWNhdGVkQnVja2V0LFxuICAgICAgS2V5OiBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX1fJHt0aGlzLnNlc3Npb25JZH1fJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9Lmpzb25gLFxuICAgICAgQm9keTogdGhpcy5wcm9jZXNzRm9yQXRoZW5hKGRhdGEuZXZlbnRWYWx1ZXMpLFxuICAgICAgQ29udGVudFR5cGU6ICdqc29uJ1xuICAgIH07XG4gICAgLyoqKiBQdXNoaW5nIHRoZSBkYXRhIHRvIHMzICovXG4gICAgczNCdWNrZXQucHV0T2JqZWN0KHBhcmFtcywgKGVycjogQVdTLkFXU0Vycm9yLCByZXNEYXRhOiBhbnkpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignZXJyb3InLCBlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgUzMgT2JqZWN0IHVzaW5nIEFXUyBTREtcbiAgICovXG4gIHByaXZhdGUgY29uc3RydWN0UzNPYmplY3QoKTogQVdTLlMzIHtcbiAgICByZXR1cm4gbmV3IEFXUy5TMyh7XG4gICAgICBhY2Nlc3NLZXlJZDogZW52aXJvbm1lbnQuYWNjZXNzS2V5SWQsXG4gICAgICBzZWNyZXRBY2Nlc3NLZXk6IGVudmlyb25tZW50LnNlY3JldEFjY2Vzc0tleSxcbiAgICAgIHJlZ2lvbjogZW52aXJvbm1lbnQucmVnaW9uXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBsb2FkaW5nIGNhcHR1cmVkIGJhc2U2NCBpbWFnZSB0byBTM1xuICAgKiBAcGFyYW0gaW1hZ2UgLSBCYXNlNjQgU3RyaW5nXG4gICAqIEBwYXJhbSBzY3JlZW5zaG90TmFtZSAtIFNjcmVlbnNob3QgbmFtZSBsaW5rZWQgd2l0aCBwYWdlTG9hZGVkIGRhdGFcbiAgICovXG4gIHB1YmxpYyBzYXZlU2NyZWVuc2hvdHNJblMzKGh0bWxUZW1wbGF0ZTogc3RyaW5nLCBzY3JlZW5zaG90TmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gY29uc3RydWN0aW5nIHRoZSBTMyBvYmplY3RcbiAgICBjb25zdCBzM0J1Y2tldDogQVdTLlMzID0gdGhpcy5jb25zdHJ1Y3RTM09iamVjdCgpO1xuICAgIC8vIHByZXBhcmluZyBkYXRhIHRvIGJlIHB1c2hlZCB0byBidWNrZXRcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBCdWNrZXQ6IGVudmlyb25tZW50LmJ1Y2tldE5hbWUuc2NyZWVuc2hvdEJ1Y2tldCxcbiAgICAgIEtleTogYCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19LyR7dGhpcy5zZXNzaW9uSWR9L3NjcmVlbnNob3RzLyR7c2NyZWVuc2hvdE5hbWV9Lmh0bWxgLFxuICAgICAgQm9keTogaHRtbFRlbXBsYXRlLFxuICAgICAgQ29udGVudFR5cGU6ICd0ZXh0L2h0bWwnXG4gICAgfTtcblxuICAgIC8qKiBQdXNoaW5nIHRvIFMzIGJ1Y2tldCAqL1xuICAgIHMzQnVja2V0LnVwbG9hZChwYXJhbXMsIChlcnI6IEFXUy5BV1NFcnJvciwgcmVzRGF0YTogYW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIGNvbnNvbGUgZXJyb3JzIHRvIFMzIGJ1Y2tldFxuICAgKiBAcGFyYW0gZGF0YSBcbiAgICovXG4gIHB1YmxpYyBwdWJsaXNoQ29uc29sZUVycm9ycyhkYXRhOiBhbnkpOiB2b2lkIHtcblxuICAgIC8vIENvbmZpZ3VyaW5nIHRoZSBzM1xuICAgIGNvbnN0IHMzQnVja2V0OiBBV1MuUzMgPSB0aGlzLmNvbnN0cnVjdFMzT2JqZWN0KCk7XG4gICAgZGF0YVsnc2Vzc2lvbklkJ10gPSB0aGlzLnNlc3Npb25JZDtcblxuICAgIC8vIFNldHRpbmcgdGhlIHBhcmFtcyBmb3IgczNcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBCdWNrZXQ6IGVudmlyb25tZW50LmJ1Y2tldE5hbWUuYXV0aGVudGljYXRlZEJ1Y2tldCxcbiAgICAgIEtleTogYCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19XyR7dGhpcy5zZXNzaW9uSWR9X2NvbnNvbGVfZXJyb3JzXyR7bmV3IERhdGUoKS5nZXRUaW1lKCl9Lmpzb25gLFxuICAgICAgQm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICBDb250ZW50VHlwZTogJ2pzb24nXG4gICAgfTtcbiAgICAvLyBQdXNoaW5nIHRoZSBkYXRhIHRvIHMzXG4gICAgczNCdWNrZXQucHV0T2JqZWN0KHBhcmFtcywgKGVycjogQVdTLkFXU0Vycm9yLCByZXNEYXRhOiBhbnkpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKiBTZXR0aW5nIGFuYWx5dGljcyBvYmplY3QgdG8gYmUgc2F2ZWQgaW4gUzMgYnVja2V0XG4gICAqIEBwYXJhbSB1c2VyRGF0YSAtIERhdGEgdHJhbnNmZXJyZWQgdG8gRXZlbnQgRGlyZWN0aXZlXG4gICAqIEBwYXJhbSBldmVudERldGFpbHMgLSBQb3NpdGlvbiBvZiBldmVudHNcbiAgICogQHBhcmFtIGV2ZW50TmFtZSAgLSBUeXBlIG9mIGV2ZW50XG4gICAqIEBwYXJhbSBzY3JlZW5zaG90TmFtZSAgLSBmaWxlIG5hbWUgb2Ygc2F2ZWQgc2NyZWVuc2hvdCBpZiB0aGUgZXZlbnQgaXMgUGFnZUxvYWRlZFxuICAgKi9cbiAgc2V0QW5hbHl0aWNzRGF0YShcbiAgICB1c2VyRGF0YTogYW55ID0ge30sXG4gICAgZXZlbnREZXRhaWxzOiBhbnksXG4gICAgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgc2NyZWVuc2hvdE5hbWU6IHN0cmluZyxcbiAgICBldmVudENvbXBvbmVudD86IHN0cmluZyk6IEFuYWx5dGljc0JlYW4ge1xuICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPSB7XG4gICAgICBldmVudExhYmVsOiBldmVudE5hbWUsXG4gICAgICBldmVudENvbXBvbmVudDogZXZlbnRDb21wb25lbnQgPyBldmVudENvbXBvbmVudCA6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnPycpWzBdLFxuICAgICAgYnJvd3Nlcjogd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICBmdWxsVVJMOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbiAgICAgIHJlc29sdXRpb246IHdpbmRvdy5pbm5lcldpZHRoICsgJ3gnICsgd2luZG93LmlubmVySGVpZ2h0LFxuICAgICAgeENvb3JkOiBldmVudERldGFpbHNbJ2NsaWVudFgnXSAhPT0gdW5kZWZpbmVkID8gZXZlbnREZXRhaWxzWydjbGllbnRYJ10udG9TdHJpbmcoKSA6ICcwJyB8fCAnMCcsXG4gICAgICB5Q29vcmQ6IGV2ZW50RGV0YWlsc1snY2xpZW50WSddICE9PSB1bmRlZmluZWQgPyBldmVudERldGFpbHNbJ2NsaWVudFknXS50b1N0cmluZygpIDogJzAnIHx8ICcwJyxcbiAgICAgIHBhZ2VYQ29vcmQ6IHdpbmRvdy5wYWdlWE9mZnNldC50b1N0cmluZygpIHx8ICcwJyxcbiAgICAgIHBhZ2VZQ29vcmQ6IHdpbmRvdy5wYWdlWU9mZnNldC50b1N0cmluZygpIHx8ICcwJyxcbiAgICAgIGV2ZW50VGltZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgc2NyZWVuc2hvdDogc2NyZWVuc2hvdE5hbWUsXG4gICAgICBhZGRpdGlvbmFsSW5mbzogSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpLFxuICAgICAgdXRtOiB0aGlzLmdldFVUTVBhcmFtZXRlcnMod2luZG93LmxvY2F0aW9uLmhyZWYpLFxuICAgICAgZGVtb2dyYXBoaWNJbmZvOiB0aGlzLmRlbW9ncmFwaGljSW5mbyxcbiAgICAgIGh0bWxFbGVtZW50OiBldmVudERldGFpbHNbJ3NyY0VsZW1lbnQnXVxuICAgIH07XG4gICAgcmV0dXJuIGFuYWx5dGljc0JlYW47XG4gIH1cblxuICAvKipcbiAgICogR2V0dGluZyBVVE0gUGFyYW1ldGVycyBieSBwcm9jZXNzaW5nIGN1cnJlbnQgcGFnZVVSTFxuICAgKiBAcGFyYW0gdXJsIC0gUGFnZSBVUkxcbiAgICovXG4gIHByaXZhdGUgZ2V0VVRNUGFyYW1ldGVycyh1cmw6IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3QgdXRtT2JqZWN0ID0ge307XG4gICAgaWYgKHVybC5pbmNsdWRlcygndXRtJykpIHtcbiAgICAgIGNvbnN0IHV0bVBhcmFtcyA9IHVybC5zcGxpdCgnPycpWzFdLnNwbGl0KCcmJyk7XG4gICAgICB1dG1QYXJhbXMubWFwKHBhcmFtID0+IHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gcGFyYW0uc3BsaXQoJz0nKTtcbiAgICAgICAgdXRtT2JqZWN0W3BhcmFtc1swXV0gPSBwYXJhbXNbMV07XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHV0bU9iamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdXNlciBkZW1vZ3JhcGhpYyBpbmZvcm1hdGlvbiBpbiBjb29raWVzXG4gICAqL1xuICBwcml2YXRlIGdldElwKCk6IHZvaWQge1xuICAgIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KCdodHRwczovL2lwYXBpLmNvL2pzb24vJykuc3Vic2NyaWJlKFxuICAgICAgKHJlczogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuZGVtb2dyYXBoaWNJbmZvID0gcmVzO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KCdkZW1vZ3JhcGhpYy1pbmZvJywgSlNPTi5zdHJpbmdpZnkocmVzKSwgbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoMTAwMCAqIDYwICogNjAgKiAyNCAqIDcpKSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRGF0YVN0b3JhZ2VTZXJ2aWNlIHtcblxuICBhbGxEYXRhQW5hbHl0aWNzQXJyYXk6IEFycmF5PGFueT4gPSBbXTtcbiAgYWxsRGF0YUFuYWx5dGljczoge1xuICAgIHBhZ2VVcmw6IHN0cmluZyxcbiAgICBldmVudFZhbHVlczogQXJyYXk8YW55PlxuICB9O1xuICBwcmV2aW91c1VybDogc3RyaW5nO1xuICBrZXlzOiBBcnJheTxhbnk+ID0gW107XG4gIGV2ZW50Q29sbGVjdG9yID0gbmV3IE1hcCgpO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFuYWx5dGljYWxTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlLCBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHsgfVxuICBwcml2YXRlIHJvdXRlRGV0YWlsczogYW55ID0gW107XG4gIGNvdW50ID0gMDtcbiAgc2V0VXJsS2V5KGRhdGE6IHN0cmluZykge1xuICAgIGxldCBmbGFnID0gMDtcbiAgICBpZiAodGhpcy5wcmV2aW91c1VybCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLnNldChkYXRhLCBbXSk7XG4gICAgICB0aGlzLnByZXZpb3VzVXJsID0gZGF0YSB8fCAnLyc7XG4gICAgfSBlbHNlIGlmICghKGRhdGEgPT09IHRoaXMucHJldmlvdXNVcmwpKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBBcnJheS5mcm9tKHRoaXMuZXZlbnRDb2xsZWN0b3Iua2V5cygpKSkge1xuICAgICAgICBpZiAoa2V5ID09PSBkYXRhKSB7XG4gICAgICAgICAgZmxhZyA9IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmbGFnID09PSAwKSB7XG4gICAgICAgIHRoaXMuZXZlbnRDb2xsZWN0b3Iuc2V0KGRhdGEsIFtdKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJldmlvdXNVcmwgPSBkYXRhO1xuICAgIH1cbiAgfVxuICBhcHBlbmRUb0FuYWx5dGljc0FycmF5KGRhdGE6IEFuYWx5dGljc0JlYW4pIHtcbiAgICBpZiAodGhpcy5wcmV2aW91c1VybCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNldFVybEtleShkYXRhLmV2ZW50Q29tcG9uZW50KTtcbiAgICB9XG4gICAgdGhpcy5ldmVudENvbGxlY3Rvci5nZXQodGhpcy5wcmV2aW91c1VybCkucHVzaChkYXRhKTtcbiAgfVxuXG4gIHB1c2hEYXRhQXJyYXlUb1MzKCkge1xuICAgIHRoaXMuY291bnQrKztcbiAgICAvLyB0aGlzLmFsbERhdGFBbmFseXRpY3NNYXAgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KEFycmF5LmZyb20odGhpcy5ldmVudENvbGxlY3Rvci5rZXlzKCkpKSk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmtleXMoKSkpIHtcbiAgICAgIHRoaXMuYWxsRGF0YUFuYWx5dGljcyA9IHtcbiAgICAgICAgcGFnZVVybDoga2V5LFxuICAgICAgICBldmVudFZhbHVlczogQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmdldChrZXkpLnZhbHVlcygpKVxuICAgICAgfTtcbiAgICAgIHRoaXMua2V5cy5wdXNoKGtleSk7XG4gICAgICBpZiAodGhpcy5hbGxEYXRhQW5hbHl0aWNzLmV2ZW50VmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5hbmFseXRpY2FsU2VydmljZS5wdXNoRGF0YSh0aGlzLmFsbERhdGFBbmFseXRpY3MpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLmNsZWFyKCk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5rZXlzKSB7XG4gICAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLnNldChrZXksIFtdKTtcbiAgICB9XG4gIH1cblxuICBzZXRSb3V0ZURldGFpbHMocm91dGVEZXRhaWxzOiBhbnkpIHtcbiAgICB0aGlzLnJvdXRlRGV0YWlscyA9IHJvdXRlRGV0YWlscztcbiAgfVxuXG4gIGdldFJvdXRlRGV0YWlscygpIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZURldGFpbHM7XG4gIH1cblxufVxuIiwiZXhwb3J0IGVudW0gRXZlbnRMYWJlbHMge1xuICAgIFBBR0VfTE9BRCA9ICdQQUdFX0xPQUQnLFxuICAgIE1PVVNFX0hPVkVSID0gJ01PVVNFX0hPVkVSJyxcbiAgICBCVVRUT05fQ0xJQ0sgPSAnQlVUVE9OX0NMSUNLJyxcbiAgICBNT1VTRV9NT1ZFID0gJ01PVVNFX01PVkUnLFxuICAgIFNDUk9MTCA9ICdTQ1JPTEwnLFxuICAgIENPTlNPTEVfRVJST1IgPSAnQ09OU09MRV9FUlJPUidcbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuXG4vKipcbiAqIEJ1dHRvbiBEaXJlY3RpdmUgdG8gdHJhY2sgY2xpY2sgZXZlbnRcbiAqIFNlbGVjdG9yIGNhbiBiZSBhZGRlZCB0byBhbnkgSFRNTCBFbGVtZW50XG4gKi9cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1t0cmFjay1idG5dJ1xufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25EaXJlY3RpdmUge1xuXG4gIC8vIEdldHMgaW1wb3J0YW50IGRhdGEgYWJvdXQgdGhlIGJ1dHRvbiBleHBsaWNpdGx5IGZyb20gdGhlIGFwcGxpY2F0aW9uXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgndHJhY2stYnRuJykgZGF0YTogYW55ID0ge307XG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIGV2ZW50RGV0YWlsczogYW55O1xuXG4gIC8qKlxuICAgKiBCdXR0b24gVHJhY2tpbmcgLSBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gZGF0YVN0b3JhZ2UgLSBEYXRhU3RvcmFnZVNlcnZpY2VcbiAgICogQHBhcmFtIGFuYWx5dGljc1NlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlKSB7IH1cblxuXG4gIC8qKlxuICAgKiAgTGlzdGVuIHRvIGJ1dHRvbiBjbGljayBhY3Rpb25zXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIG9uQ2xpY2soJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmV2ZW50RGV0YWlscyA9ICRldmVudDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2VuZERhdGEoKTtcbiAgICB9LCAxMCk7XG4gIH1cblxuICAvKiogU2VuZGluZyBkYXRhIG9uIGJ1dHRvbiBjbGljayAqL1xuICBwdWJsaWMgc2VuZERhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIHRoaXMuZXZlbnREZXRhaWxzLCB0aGlzLmV2ZW50TGFiZWxzLkJVVFRPTl9DTElDSywgJycpO1xuICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkNoYW5nZXMsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcblxuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1t0cmFjay1zY3JvbGxdJ1xufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgLy8gR2V0cyBpbXBvcnRhbnQgZGF0YSBhYm91dCB0aGUgY29tcG9uZW50IGV4cGxpY2l0bHkgZnJvbSB0aGUgYXBwbGljYXRpb25cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICAgIEBJbnB1dCgndHJhY2stc2Nyb2xsJykgZGF0YTogYW55ID0ge307XG4gICAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZVxuICAgICkgeyB9XG5cbiAgICAvLyBDYXB0dXJlIHRoZSBjaGFuZ2UgaW4gZGF0YVxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlO1xuICAgIH1cblxuICAgIC8vIFRyaWdnZXJlZCB3aGVuIGFueSBzY3JvbGwgZXZlbnQgb2NjdXJzXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnNjcm9sbCcsIFsnJGV2ZW50J10pIG9uU2Nyb2xsRXZlbnQoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbmREYXRhKCRldmVudCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc2VuZERhdGEoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgICAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgZXZlbnQsIHRoaXMuZXZlbnRMYWJlbHMuU0NST0xMLCAnJyk7XG4gICAgICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbdHJhY2stYnV0dG9uSG92ZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25Ib3ZlckRpcmVjdGl2ZSB7XG4gIC8qKiAqL1xuICBldmVudERldGFpbHM6IGFueTtcbiAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgLy8gR2V0cyBpbXBvcnRhbnQgZGF0YSBhYm91dCB0aGUgYnV0dG9uIGV4cGxpY2l0bHkgZnJvbSB0aGUgYXBwbGljYXRpb25cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCd0cmFjay1idXR0b25Ib3ZlcicpIGRhdGE6IGFueSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlKSB7IH1cblxuICAvLyBMaXN0ZW4gdG8gYnV0dG9uIGhvdmVyIGFjdGlvbnNcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VvdmVyJywgWyckZXZlbnQnXSkgb25Nb3VzZU92ZXIoJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmV2ZW50RGV0YWlscyA9ICRldmVudDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2VuZERhdGEoKTtcbiAgICB9LCAxMCk7XG4gIH1cblxuICAvLyBTZW5kaW5nIGRhdGEgb24gYnV0dG9uIGhvdmVyXG4gIHB1YmxpYyBzZW5kRGF0YSgpOiB2b2lkIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgdGhpcy5ldmVudERldGFpbHMsIHRoaXMuZXZlbnRMYWJlbHMuTU9VU0VfSE9WRVIsICcnKTtcbiAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gIH1cbn1cbiIsIlxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBDcmVkZW50aWFsc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuXG5leHBvcnQgY2xhc3MgRW52aXJvbm1lbnRTZXJ2aWNlIHtcblxuICAvLyBTZXRzIFdoZXRoZXIgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZCBvciBub3RcbiAgc2V0QXV0aGVudGljYXRpb24oaXNBdXRoOiBib29sZWFuKSB7XG4gICAgZW52aXJvbm1lbnQuaXNBdXRoID0gaXNBdXRoO1xuICB9XG5cbiAgLy8gU2V0dGluZyBjcmVkZW50aWFscyBvbiBlbnZpcm9ubWVudFxuICBzZXRDcmVkZW50aWFsc1RvRW52aXJvbm1lbnQoY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzQmVhbiwgaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDogYm9vbGVhbikge1xuICAgIGVudmlyb25tZW50LmFjY2Vzc0tleUlkID0gY3JlZGVudGlhbHMuYWNjZXNzS2V5SWQ7XG4gICAgZW52aXJvbm1lbnQuZmlsZU5hbWUgPSBjcmVkZW50aWFscy5maWxlTmFtZTtcbiAgICBlbnZpcm9ubWVudC5zZWNyZXRBY2Nlc3NLZXkgPSBjcmVkZW50aWFscy5zZWNyZXRBY2Nlc3NLZXk7XG4gICAgZW52aXJvbm1lbnQuc2Vzc2lvblRva2VuID0gY3JlZGVudGlhbHMuc2Vzc2lvblRva2VuO1xuICAgIGVudmlyb25tZW50LnJlZ2lvbiA9IGNyZWRlbnRpYWxzLnJlZ2lvbjtcbiAgICBlbnZpcm9ubWVudC5pc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkID0gaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDtcbiAgICBpZiAoY3JlZGVudGlhbHMuYnVja2V0TmFtZS5hdXRoZW50aWNhdGVkQnVja2V0ICE9PSAnJyAmJiBjcmVkZW50aWFscy5idWNrZXROYW1lLnB1YmxpY0J1Y2tldCAhPT0gJycpIHtcbiAgICAgIGVudmlyb25tZW50LmJ1Y2tldE5hbWUgPSB7XG4gICAgICAgIGF1dGhlbnRpY2F0ZWRCdWNrZXQ6IGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUuYXV0aGVudGljYXRlZEJ1Y2tldCxcbiAgICAgICAgcHVibGljQnVja2V0OiBjcmVkZW50aWFscy5idWNrZXROYW1lLnB1YmxpY0J1Y2tldCxcbiAgICAgICAgc2NyZWVuc2hvdEJ1Y2tldDogY3JlZGVudGlhbHMuYnVja2V0TmFtZS5zY3JlZW5zaG90QnVja2V0XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBidWNrZXROYW1lID0gKGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUuYXV0aGVudGljYXRlZEJ1Y2tldCA9PT0gJycpID8gY3JlZGVudGlhbHMuYnVja2V0TmFtZS5wdWJsaWNCdWNrZXQgOlxuICAgICAgICBjcmVkZW50aWFscy5idWNrZXROYW1lLmF1dGhlbnRpY2F0ZWRCdWNrZXQ7XG4gICAgICBlbnZpcm9ubWVudC5idWNrZXROYW1lID0ge1xuICAgICAgICBhdXRoZW50aWNhdGVkQnVja2V0OiBidWNrZXROYW1lLFxuICAgICAgICBwdWJsaWNCdWNrZXQ6IGJ1Y2tldE5hbWUsXG4gICAgICAgIHNjcmVlbnNob3RCdWNrZXQ6IGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUuc2NyZWVuc2hvdEJ1Y2tldFxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kLCBOYXZpZ2F0aW9uRXJyb3IgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJvdXRlclNlcnZpY2Uge1xuICBhbmFseXRpY3NEYXRhOiBBbmFseXRpY3NCZWFuO1xuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICBuYXZpZ2F0ZU9uID0gJyc7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVzOiBSb3V0ZXIsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSwgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnkpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFRyYWNraW5nIHJvdXRlciBldmVudHNcbiAgICovXG4gIHB1YmxpYyB0cmFja1JvdXRlckV2ZW50cygpOiB2b2lkIHtcbiAgICAvKiogVHJpZ2dlcmVkIHdoZW4gY3VycmVudCBwYWdlIGlzIGxvYWRlZCAqL1xuICAgIHRoaXMucm91dGVzLmV2ZW50cy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAvKiogVHJpZ2dlcmVkIHdoZW4gTmF2aWdhdGlvbkVuZCBldmVudCBvY2N1cnMgKi9cbiAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgaWYgKHRoaXMubmF2aWdhdGVPbiAhPT0gZXZlbnQudXJsKSB7XG4gICAgICAgICAgdGhpcy5hbmFseXRpY3NQdXNoRGF0YShldmVudCk7XG4gICAgICAgICAgdGhpcy5uYXZpZ2F0ZU9uID0gZXZlbnQudXJsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yKSB7XG4gICAgICAgIC8qKiBUcmlnZ2VyZWQgd2hlbiBOYXZpZ2F0aW9uRXJyb3IgZXZlbnQgb2NjdXJzICovXG4gICAgICAgIHRoaXMuYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgYW5hbHl0aWNzIGRhdGFcbiAgICogQHBhcmFtIGV2ZW50IC0gUm91dGVyIEV2ZW50XG4gICAqL1xuICBwdWJsaWMgYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHNjcmVlbnNob3ROYW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkudG9TdHJpbmcoKTtcbiAgICB0aGlzLmFuYWx5dGljc0RhdGEgPSB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh7fSwge30sIHRoaXMuZXZlbnRMYWJlbHMuUEFHRV9MT0FELCBgJHtzY3JlZW5zaG90TmFtZX0uaHRtbGAsIGV2ZW50LnVybCk7XG4gICAgdGhpcy53YWl0VGlsbFBhZ2VMb2FkKHNjcmVlbnNob3ROYW1lKTtcbiAgICAvLyBEYXRhIGlzIHNlbmQgb25seSB3aGVuIHVzZXIgY29uZmlndXJlIHRoZSBwYWdlIGxvYWRpbmcgdG8gYmUgdHJ1ZVxuICAgIHRoaXMuZGF0YVN0b3JhZ2Uuc2V0VXJsS2V5KHRoaXMuYW5hbHl0aWNzRGF0YS5ldmVudENvbXBvbmVudCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkodGhpcy5hbmFseXRpY3NEYXRhKTtcbiAgICB9LCAwKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFdhaXRpbmcgZm9yIHBhZ2UgdG8gbG9hZCBjb21wbGV0ZWx5XG4gICAqIEBwYXJhbSBldmVudCBcbiAgICovXG4gIHdhaXRUaWxsUGFnZUxvYWQoc2NyZWVuc2hvdE5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIF9zZWxmLmNhcHR1cmVUZW1wbGF0ZShzY3JlZW5zaG90TmFtZSk7XG4gICAgICB9XG4gICAgfSwgMjAwMCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FwdHVyZSB0ZW1wbGF0ZSBvZiBsb2FkZWQgdmlld1xuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgLSBTY3JlZW5zaG90IGltYWdlXG4gICAqL1xuICBjYXB0dXJlVGVtcGxhdGUoc2NyZWVuc2hvdE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZ1bGxQYWdlSFRNTCA9IGA8aHRtbD5cbiAgICAgIDxoZWFkPlxuICAgICAgICAke3RoaXMucHJvY2Vzc1JlZ2V4T3BlcmF0aW9ucyh0aGlzLmRvY3VtZW50LmhlYWQuaW5uZXJIVE1MKX1cbiAgICAgICAgPHN0eWxlPmJvZHkge3Njcm9sbC1iZWhhdmlvcjogc21vb3RoO308L3N0eWxlPlxuICAgICAgPC9oZWFkPlxuICAgICAgPGJvZHk+XG4gICAgICAgICR7dGhpcy5wcm9jZXNzUmVnZXhPcGVyYXRpb25zKHRoaXMuZG9jdW1lbnQuYm9keS5pbm5lckhUTUwpfVxuICAgICAgICA8c2NyaXB0PlxuICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICBpZihlLmN1c3RvbURhdGEpIHtcbiAgICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKGUuY3VzdG9tRGF0YSk7XG4gICAgICAgICAgICAgIGlmIChkYXRhLnNjcm9sbCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGwoMCwgZGF0YS52YWx1ZSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfWNhdGNoKGUpIHtjb25zb2xlLmVycm9yKGUpO31cbiAgICAgICAgICB9KTtcbiAgICAgICAgPC9zY3JpcHQ+XG4gICAgICA8L2JvZHk+XG4gICAgPC9odG1sPmA7XG5cbiAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2F2ZVNjcmVlbnNob3RzSW5TMyhmdWxsUGFnZUhUTUwsIHNjcmVlbnNob3ROYW1lKTtcbiAgfVxuXG5cbiAgcHJvY2Vzc1JlZ2V4T3BlcmF0aW9ucyh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL3NyYz1cXFwiXFwvL2csIGBzcmM9XCIke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2ApXG4gICAgICAucmVwbGFjZSgvdXJsXFwoXFxcIlxcLy9nLCBgdXJsKFwiJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9gKVxuICAgICAgLnJlcGxhY2UoL2hyZWY9XCJcXC8vZywgYGhyZWY9XCIke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2ApXG4gICAgICAucmVwbGFjZSgvc3JjPVxcJ1xcLy9nLCBgc3JjPScke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2ApXG4gICAgICAucmVwbGFjZSgvdXJsXFwoXFwnXFwvL2csIGB1cmwoJyR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYClcbiAgICAgIC5yZXBsYWNlKC9ocmVmPVxcJ1xcLy9nLCBgaHJlZj0nJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9gKVxuICAgICAgLnJlcGxhY2UoLzxzY3JpcHQuKjxcXC9zY3JpcHQ+L2csICcnKVxuICAgICAgLnJlcGxhY2UoL2hyZWY9XCIoPyFodHRwKS9nLCBgaHJlZj1cIiR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIElucHV0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUG9pbnRlclNlcnZpY2Uge1xuXG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIGV2ZW50RGV0YWlsczogYW55O1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ3RyYWNrLXBvaW50ZXInKSBkYXRhOiBhbnkgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSkgeyB9XG5cbiAgLyoqXG4gICAqIFRyYWNrIE1vdXNlIE1vdmVtZW50XG4gICAqL1xuICB0cmFja01vdXNlTW92ZUV2ZW50KCkge1xuICAgIGZyb21FdmVudCh3aW5kb3csICdtb3VzZW1vdmUnKVxuICAgICAgLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLmV2ZW50RGV0YWlscyA9IGU7XG4gICAgICAgIHRoaXMuc2VuZERhdGEoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgTW91c2UgTW92ZSBkZXRhaWxzXG4gICAqL1xuICBwdWJsaWMgc2VuZERhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIHRoaXMuZXZlbnREZXRhaWxzLCB0aGlzLmV2ZW50TGFiZWxzLk1PVVNFX01PVkUsICcnKTtcbiAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR2xvYmFsRXJyb3JIYW5kbGVyIGltcGxlbWVudHMgRXJyb3JIYW5kbGVyIHtcbiAgICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIGNvbnN0IGFuYWx5dGljc1NlcnZpY2UgPSB0aGlzLmluamVjdG9yLmdldChBbmFseXRpY3NTZXJ2aWNlKTtcbiAgICAgICAgaWYgKHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnNvbGVFcnJvckZuT2JqZWN0ID0gY29uc29sZS5lcnJvcjtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IgPSBmdW5jdGlvbiAoLi4uZXJyb3I6IGFueVtdKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkRXJyb3IgPSBlcnJvci5tYXAoZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGUpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxuICAgICAgICAgICAgICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPSBhbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEocHJvY2Vzc2VkRXJyb3IsIHt9LCB0aGlzLmV2ZW50TGFiZWxzLkNPTlNPTEVfRVJST1IsICcnKTtcbiAgICAgICAgICAgICAgICBhbmFseXRpY3NTZXJ2aWNlLnB1Ymxpc2hDb25zb2xlRXJyb3JzKGFuYWx5dGljc0JlYW4pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGVFcnJvckZuT2JqZWN0LmNhbGwoY29uc29sZSwgZXJyb3IpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBJbXBsZW1lbnRpbmcgdGhlIG1ldGhvZCAqL1xuICAgIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpIHsgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgRXJyb3JIYW5kbGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1MzQW5hbHl0aWNzQ29tcG9uZW50IH0gZnJvbSAnLi9uZy1zMy1hbmFseXRpY3MuY29tcG9uZW50JztcbmltcG9ydCB7IENyZWRlbnRpYWxzQmVhbiB9IGZyb20gJy4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgQnV0dG9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2J1dHRvbi9idXR0b24uZGlyZWN0aXZlJztcbmltcG9ydCB7IFNjcm9sbERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCdXR0b25Ib3ZlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9idXR0b24taG92ZXIvYnV0dG9uLWhvdmVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBFbnZpcm9ubWVudFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgUm91dGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlJztcbmltcG9ydCB7IGludGVydmFsIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9saWIvc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IFBvaW50ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9wb2ludGVyL3BvaW50ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEdsb2JhbEVycm9ySGFuZGxlciB9IGZyb20gJy4vc2VydmljZXMvZXJyb3ItaGFuZGxlci9lcnJvckhhbmRsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5nUzNBbmFseXRpY3NDb21wb25lbnQsXG4gICAgQnV0dG9uRGlyZWN0aXZlLFxuICAgIFNjcm9sbERpcmVjdGl2ZSxcbiAgICBCdXR0b25Ib3ZlckRpcmVjdGl2ZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgIEVudmlyb25tZW50U2VydmljZSxcbiAgICBQb2ludGVyU2VydmljZSxcbiAgICBDb29raWVTZXJ2aWNlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOZ1MzQW5hbHl0aWNzQ29tcG9uZW50LFxuICAgIEJ1dHRvbkRpcmVjdGl2ZSxcbiAgICBTY3JvbGxEaXJlY3RpdmUsXG4gICAgQnV0dG9uSG92ZXJEaXJlY3RpdmUsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmdTM0FuYWx5dGljc01vZHVsZSB7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZW52aXJvbm1lbnRTZXJ2aWNlID0gbmV3IEVudmlyb25tZW50U2VydmljZSgpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyU2VydmljZTogUm91dGVyU2VydmljZSwgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLCBwcml2YXRlIHBvaW50ZXJTZXJ2aWNlOiBQb2ludGVyU2VydmljZSkge1xuICAgIGludGVydmFsKDEwMDAgKiAxMCkuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5kYXRhU3RvcmFnZS5wdXNoRGF0YUFycmF5VG9TMygpO1xuICAgIH0pO1xuICAgIHRoaXMucG9pbnRlclNlcnZpY2UudHJhY2tNb3VzZU1vdmVFdmVudCgpO1xuICAgIHRoaXMucm91dGVyU2VydmljZS50cmFja1JvdXRlckV2ZW50cygpO1xuICB9XG4gIC8vIENvbmZpZ3VyaW5nIHRoZSBpbml0aWFsIHNldHVwIGZvciBzMyBidWNrZXQgYW5kIHBhZ2UgbG9hZGluZ1xuICBzdGF0aWMgZm9yUm9vdChjcmVkZW50aWFsczogQ3JlZGVudGlhbHNCZWFuLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkOiBib29sZWFuID0gZmFsc2UpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICB0aGlzLmVudmlyb25tZW50U2VydmljZS5zZXRDcmVkZW50aWFsc1RvRW52aXJvbm1lbnQoY3JlZGVudGlhbHMsIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQpO1xuICAgIC8vIEFzc2lnbmluZyB0aGUgY3JlZGVudGlhbHMgdG8gZW52aXJvbm1lbnQgdmFyaWFibGVzXG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ1MzQW5hbHl0aWNzTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBFcnJvckhhbmRsZXIsIHVzZUNsYXNzOiBHbG9iYWxFcnJvckhhbmRsZXIgfV1cbiAgICB9O1xuICB9XG5cblxufVxuIl0sIm5hbWVzIjpbInV1aWQudjQiLCJBV1MuUzMiLCJpbnRlcnZhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQU9FLGlCQUFpQjs7O1lBTGxCLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs7Ozs7O0FDSkQ7SUFhRSxpQkFBaUI7Ozs7SUFFakIsUUFBUTtLQUNQOzs7WUFkRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFOzs7O0dB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