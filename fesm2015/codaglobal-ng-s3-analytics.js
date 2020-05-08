import { Injectable, Directive, HostListener, Input, ElementRef, Renderer2, Injector, NgModule, Component, defineInjectable, inject, INJECTOR } from '@angular/core';
import { Subject, interval, fromEvent } from 'rxjs';
import { __awaiter } from 'tslib';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { v4 } from 'uuid';
import { Router, NavigationEnd, NavigationError } from '@angular/router';
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
    dataCollectionApi: 'https://1xgf5a2bq2.execute-api.ap-south-1.amazonaws.com/dev/',
    isPageLoadingToBeDetected: true,
    remoteConfigApi: '',
    ignoreUrls: [],
    ignoreCssRules: [],
    showConsent: false,
    consentContent: 'We use cookies to ensure that we provide you with the best possible experience on our website.If you continue to use our site, we assume you accept our use of cookies. Privacy Policy',
    disableTracking: false,
    ignoreIPRanges: '',
    ignoreDomains: [],
    disableDemographicInfo: false
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
    KEY_STROKE: 'KEY_STROKE',
};
/** @enum {string} */
const Constants = {
    DEMOGRAPHIC_INFO: 'demographic-info',
    SESSION_ID: 'ngS3AnalyticsSessionId',
    DEMOGRAPHIC_API_URL: 'https://ipapi.co/json/',
};
class KeyStrokeEventType {
    // Pressed key label
    constructor() {
        this.key = '';
        this.keyCode = '';
        this.elementId = '';
        this.isForm = false;
        this.form = '';
        this.tagName = '';
        this.htmlElementType = '';
        this.value = '';
        this.code = '';
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class EnvironmentService {
    constructor() {
        this.envConfig = new Subject();
        this.userObject = new Subject();
    }
    // Setting Configuration on environment
    /**
     * @param {?} configuration
     * @param {?} isPageLoadingToBeDetected
     * @return {?}
     */
    setConfigurationToEnvironment(configuration, isPageLoadingToBeDetected) {
        environment.dataCollectionApi = configuration.dataCollectionApi;
        environment.isPageLoadingToBeDetected = isPageLoadingToBeDetected;
        environment.remoteConfigApi = configuration.remoteConfigApi;
        this.envConfig.next(environment);
        this.envConfig.complete();
        this.userObject.next({ userEmail: '', userProfileImage: '', userName: '', userPhoneNumber: '', userId: '', otherInfo: '' });
    }
    /**
     * @return {?}
     */
    getEnvObservable() {
        return this.envConfig;
    }
    /**
     * @param {?} userObject
     * @return {?}
     */
    setUserInfo(userObject) {
        this.userObject.next(userObject);
    }
    /**
     * @return {?}
     */
    getUserInfo() {
        return this.userObject.asObservable();
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
class PluginConfigService {
    /**
     * @param {?} httpClient
     * @param {?} injector
     * @param {?} cookieService
     */
    constructor(httpClient, injector, cookieService) {
        this.httpClient = httpClient;
        this.injector = injector;
        this.cookieService = cookieService;
        /** Constants */
        this.constants = Constants;
    }
    /**
     * @return {?}
     */
    getEnvironmentConfig() {
        /** @type {?} */
        const env = this.injector.get(EnvironmentService);
        env.getEnvObservable().subscribe((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            this.fetchRemoteConfig();
        }), (/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            // tslint:disable-next-line: max-line-length
            console.error('unable to fetch xAnalytics remote configuration. Please make sure you have configured the correct URL, if the issue persist please check the dashboard for more info or contact xA Team. ');
        }));
    }
    /**
     * @return {?}
     */
    fetchRemoteConfig() {
        this.httpClient.get(environment.remoteConfigApi)
            .subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.remotePluginConfig = res['body'];
            if (this.remotePluginConfig.showConsent) {
                /** @type {?} */
                const content = this.remotePluginConfig.consentContent ?
                    this.remotePluginConfig.consentContent : environment.consentContent;
                this.checkShowConsent(content);
            }
        }), (/**
         * @param {?} err
         * @return {?}
         */
        err => {
            console.error('collection error', err);
        }));
    }
    /**
     * @param {?} analyticsBean
     * @return {?}
     */
    handleConfiguration(analyticsBean) {
        return this.checkDisableTracking() &&
            this.checkDomain(analyticsBean.fullURL) &&
            this.checkIpRange(analyticsBean.demographicInfo['ip']);
    }
    /**
     * @return {?}
     */
    checkDisableTracking() {
        if (this.remotePluginConfig) {
            return !this.remotePluginConfig.disableTracking;
        }
        else {
            return true;
        }
    }
    /**
     * @param {?} fullUrl
     * @return {?}
     */
    checkDomain(fullUrl) {
        if (this.remotePluginConfig && this.remotePluginConfig.ignoreDomains.length > 0) {
            return !(this.remotePluginConfig.ignoreDomains.filter((/**
             * @param {?} domain
             * @return {?}
             */
            domain => fullUrl.indexOf(domain) >= 0)).length > 0);
        }
        else {
            return true;
        }
    }
    /**
     * @param {?} trackedObjects
     * @return {?}
     */
    removeCheckUrls(trackedObjects) {
        if (trackedObjects && trackedObjects.length > 0 && this.remotePluginConfig) {
            return trackedObjects.map((/**
             * @param {?} analytics
             * @return {?}
             */
            analytics => {
                if (!(this.remotePluginConfig.ignoreUrls.filter((/**
                 * @param {?} url
                 * @return {?}
                 */
                url => analytics.eventComponent.indexOf(url) >= 0)).length > 0)) {
                    return analytics;
                }
            })).filter((/**
             * @param {?} object
             * @return {?}
             */
            object => object !== undefined));
        }
        else {
            return trackedObjects;
        }
    }
    /**
     * IP range restriction added
     * \@restrictIPRange is a regex
     * if \@restrictIPRange is match with current IP,
     * the analytics data will be restricted
     * @private
     * @param {?} ip
     * @return {?}
     */
    checkIpRange(ip) {
        if (ip && this.remotePluginConfig && this.remotePluginConfig.ignoreIPRanges.length > 0) {
            /** @type {?} */
            const ipRange = this.remotePluginConfig.ignoreIPRanges;
            return ip.match(ipRange) ? false : true;
        }
        else {
            return true;
        }
    }
    /**
     * Set user demographic information in cookies
     * @return {?}
     */
    getIp() {
        return __awaiter(this, void 0, void 0, function* () {
            this.demographicInfo = yield this.httpClient.get(this.constants.DEMOGRAPHIC_API_URL).toPromise();
            this.cookieService.set(this.constants.DEMOGRAPHIC_INFO, JSON.stringify(this.demographicInfo), new Date(new Date().getTime() + (1000 * 60 * 60 * 24)));
            return this.demographicInfo;
        });
    }
    /**
     * @return {?}
     */
    setDemographicInfo() {
        if (!this.cookieService.check(this.constants.DEMOGRAPHIC_INFO)) {
            this.getIp();
        }
        else {
            this.demographicInfo = JSON.parse(this.cookieService.get(this.constants.DEMOGRAPHIC_INFO));
        }
        return this.demographicInfo;
    }
    /**
     * @return {?}
     */
    getDemographicInfo() {
        if (this.remotePluginConfig && this.remotePluginConfig.disableDemographicInfo) {
            return {};
        }
        else {
            return this.setDemographicInfo();
        }
    }
    /**
     * @param {?} content
     * @return {?}
     */
    checkShowConsent(content) {
        /** @type {?} */
        const divEl = document.createElement('div');
        divEl.classList.add('consent-wrapper');
        divEl.style.position = 'fixed';
        divEl.style.bottom = '0';
        divEl.style.left = '0';
        divEl.style.right = '0';
        divEl.style.padding = '15px';
        divEl.style.backgroundColor = '#3366ff';
        divEl.style.color = '#fff';
        divEl.style.fontSize = '12px';
        divEl.style.textAlign = 'center';
        /** @type {?} */
        const textEl = document.createTextNode(content);
        divEl.appendChild(textEl);
        document.body.appendChild(divEl);
    }
}
PluginConfigService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
PluginConfigService.ctorParameters = () => [
    { type: HttpClient },
    { type: Injector },
    { type: CookieService }
];
/** @nocollapse */ PluginConfigService.ngInjectableDef = defineInjectable({ factory: function PluginConfigService_Factory() { return new PluginConfigService(inject(HttpClient), inject(INJECTOR), inject(CookieService)); }, token: PluginConfigService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Analytics Service
 */
class AnalyticsService {
    /**
     * Analytics Service constructor
     * @param {?} httpService
     * @param {?} pluginConfig
     * @param {?} environmentService
     */
    constructor(httpService, pluginConfig, environmentService) {
        this.httpService = httpService;
        this.pluginConfig = pluginConfig;
        this.environmentService = environmentService;
        /** Demographic info */
        this.demographicInfo = {};
        /** Event label constants */
        this.eventLabels = EventLabels;
        /** Constants */
        this.constants = Constants;
        this.pluginConfig.getEnvironmentConfig();
        this.getUserInfo();
        this.setSessionId();
    }
    /**
     * Checking whether sessionId present in cookie or not
     * if no session id cookie present, adding new session id otherwise reusing the session id value
     * @private
     * @return {?}
     */
    setSessionId() {
        if (sessionStorage.getItem(this.constants.SESSION_ID)) {
            this.sessionId = sessionStorage.getItem(this.constants.SESSION_ID);
        }
        else {
            this.sessionId = v4();
            sessionStorage.setItem(this.constants.SESSION_ID, this.sessionId);
        }
    }
    /**
     * Checking the IP range to be restrict
     * @param {?} data - data to be pushed
     * @return {?}
     */
    pushData(data) {
        if (this.pluginConfig.handleConfiguration(data.eventValues[0])) {
            /** @type {?} */
            const analyticsObjectList = this.pluginConfig.removeCheckUrls(data.eventValues);
            if (analyticsObjectList.length > 0) {
                this.publishTOAuthS3(analyticsObjectList);
            }
        }
    }
    /**
     * Converting JSON Array to string
     * @private
     * @param {?} data
     * @return {?}
     */
    processForAthena(data) {
        if (data && data.length > 0) {
            return data.map((/**
             * @param {?} object
             * @return {?}
             */
            (object) => {
                object['sessionId'] = this.sessionId;
                return JSON.stringify(object);
            })).join('\n');
        }
        else {
            return JSON.stringify(data);
        }
    }
    /**
     * Preparing data to be pushed to DataStorage
     * @private
     * @param {?} data  data to be pushed
     * @return {?}
     */
    publishTOAuthS3(data) {
        /** @type {?} */
        const filename = `${new Date().toISOString().split('T')[0]}_${this.sessionId}_${new Date().toISOString()}.json`;
        /** @type {?} */
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.pushDataToS3(filename, this.processForAthena(data), headers);
    }
    /**
     * Pushing data to corresponding bucket using data collection api
     * @private
     * @param {?} path - service path
     * @param {?} data - data to be pushed
     * @param {?} headers
     * @return {?}
     */
    pushDataToS3(path, data, headers) {
        /** @type {?} */
        const url = `${environment.dataCollectionApi}${path}`;
        this.httpService.put(url, data, { headers: headers }).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => { }), (/**
         * @param {?} err
         * @return {?}
         */
        err => {
            console.log(err);
        }));
    }
    /**
     * Save the captured HTML to the data collection
     * @param {?} htmlTemplate - DOM Content
     * @param {?} screenshotName - filename to be saved
     * @return {?}
     */
    saveScreenshotsInS3(htmlTemplate, screenshotName) {
        if (this.pluginConfig.checkDisableTracking()) {
            /** @type {?} */
            const filename = `assets/${new Date().toISOString().split('T')[0]}/${this.sessionId}/${screenshotName}.html`;
            /** @type {?} */
            const headers = new HttpHeaders({ 'Content-Type': 'text/html' });
            this.pushDataToS3(filename, htmlTemplate, headers);
        }
    }
    /**
     * Pushing console errors to S3 bucket
     * @param {?} data
     * @return {?}
     */
    publishConsoleErrors(data) {
        if (this.pluginConfig.checkDisableTracking()) {
            data['sessionId'] = this.sessionId;
            /** @type {?} */
            const filename = `${new Date().toISOString().split('T')[0]}_${this.sessionId}_console_errors_${new Date().getTime()}.json`;
            /** @type {?} */
            const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            this.pushDataToS3(filename, data, headers);
        }
    }
    /**
     * Setting analytics object to be saved in S3 bucket
     * @param {?=} userData - Data transferred to Event Directive
     * @param {?=} eventDetails - Position of events
     * @param {?=} eventName  - Type of event
     * @param {?=} screenshotName  - file name of saved screenshot if the event is PageLoaded
     * @param {?=} optional
     * @return {?}
     */
    setAnalyticsData(userData = {}, eventDetails, eventName, screenshotName, optional) {
        /** @type {?} */
        const analyticsBean = {
            eventLabel: eventName,
            eventComponent: optional && optional.eventComponent ? optional.eventComponent : window.location.pathname.split('?')[0],
            browser: window.navigator.userAgent,
            fullURL: window.location.href,
            origin: window.location.origin,
            resolution: `${window.innerWidth}x${window.innerHeight}`,
            xCoord: this.getEventDetails(eventDetails['clientX']),
            yCoord: this.getEventDetails(eventDetails['clientY']),
            pageXCoord: window.pageXOffset.toString() || '0',
            pageYCoord: window.pageYOffset.toString() || '0',
            eventTime: new Date().toISOString(),
            screenshot: screenshotName,
            additionalInfo: userData,
            errors: (optional && optional.consoleErrors) ? optional.consoleErrors : '',
            utm: this.getUTMParameters(window.location.href),
            demographicInfo: this.pluginConfig.getDemographicInfo(),
            keyStrokeData: (optional && optional.keyStrokeData) ? optional.keyStrokeData : this.getEmptyKeyStrokeData(),
            htmlElement: this.getHtmlElement(eventDetails['target'], eventName),
            performance: this.getPerformanceDetails(),
            userInfo: this.userInfo
        };
        return analyticsBean;
    }
    /**
     * Event details
     * @private
     * @param {?} value
     * @return {?}
     */
    getEventDetails(value) {
        return value !== undefined ? value.toString() : '0';
    }
    /**
     * Get HTML Content
     * @private
     * @param {?} targetElement - target element
     * @param {?} eventName
     * @return {?}
     */
    getHtmlElement(targetElement, eventName) {
        if (eventName !== this.eventLabels.MOUSE_MOVE && eventName !== this.eventLabels.SCROLL) {
            return targetElement !== undefined ? targetElement['innerHTML'] : '';
        }
        else {
            return '';
        }
    }
    /**
     * @private
     * @return {?}
     */
    getEmptyKeyStrokeData() {
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
    }
    /**
     * Performance details
     * @private
     * @return {?}
     */
    getPerformanceDetails() {
        /** @type {?} */
        const performance = window.performance;
        return {
            navigation: performance.navigation,
            timeOrigin: performance.timeOrigin,
            timing: performance.timing
        };
    }
    /**
     * Memory usage of the application is provided by Google Chrome
     * @private
     * @param {?} userAgent - User agent to check the browser
     * @return {?}
     */
    geMemoryUsageInfo(userAgent) {
        /** @type {?} */
        const isChrome = userAgent.split('chrome').length > 1;
        /** @type {?} */
        const memory = isChrome ? window.performance['memory'] : '';
        return memory;
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
     * Getting user info
     * @private
     * @return {?}
     */
    getUserInfo() {
        this.environmentService.getUserInfo().subscribe((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            this.userInfo = res;
            console.log('receive user bean', this.userInfo);
        }));
    }
}
AnalyticsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
AnalyticsService.ctorParameters = () => [
    { type: HttpClient },
    { type: PluginConfigService },
    { type: EnvironmentService }
];
/** @nocollapse */ AnalyticsService.ngInjectableDef = defineInjectable({ factory: function AnalyticsService_Factory() { return new AnalyticsService(inject(HttpClient), inject(PluginConfigService), inject(EnvironmentService)); }, token: AnalyticsService, providedIn: "root" });

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
        this.constants = Constants;
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
        for (const key of Array.from(this.eventCollector.keys())) {
            this.allDataAnalytics = {
                pageUrl: key,
                eventValues: Array.from(this.eventCollector.get(key).values())
            };
            this.keys.push(key);
            if (this.allDataAnalytics.eventValues.length > 0) {
                this.stopIdleTimer();
                this.analyticalService.pushData(this.allDataAnalytics);
            }
            else {
                this.startCalculateIdleTime();
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
    /**
     * If the session is idle for 30 min, the session will be cleared
     * @return {?}
     */
    startCalculateIdleTime() {
        if (!this.idleTimerSubscription) {
            this.idleTimerSubscription = interval(1000 * 60 * 30).subscribe((/**
             * @param {?} x
             * @return {?}
             */
            x => {
                /** @type {?} */
                const sessionId = v4();
                sessionStorage.setItem(this.constants.SESSION_ID, sessionId);
                this.stopIdleTimer();
            }));
        }
    }
    /**
     * if the idle timer is running, resetting the timer
     * @return {?}
     */
    stopIdleTimer() {
        if (this.idleTimerSubscription) {
            this.idleTimerSubscription.unsubscribe();
            this.idleTimerSubscription = null;
        }
        this.startCalculateIdleTime();
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
        this.sendData();
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
class RouterService {
    /**
     * @param {?} routes
     * @param {?} analyticsService
     * @param {?} dataStorage
     */
    constructor(routes, analyticsService, dataStorage) {
        this.routes = routes;
        this.analyticsService = analyticsService;
        this.dataStorage = dataStorage;
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
        this.analyticsData = this.analyticsService.setAnalyticsData({}, {}, this.eventLabels.PAGE_LOAD, `${screenshotName}.html`, { eventComponent: event.url });
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
            if (document.readyState === 'complete') {
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
        const fullPageHTML = ngS3AnalyticsJS.constructHTMLPage(this.processRegexOperations(document.querySelector('head').innerHTML), this.processRegexOperations(document.querySelector('body').innerHTML));
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
    { type: DataStorageService }
];
/** @nocollapse */ RouterService.ngInjectableDef = defineInjectable({ factory: function RouterService_Factory() { return new RouterService(inject(Router), inject(AnalyticsService), inject(DataStorageService)); }, token: RouterService, providedIn: "root" });

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
    }
    /**
     * @return {?}
     */
    trackConsoleErrors() {
        /** @type {?} */
        const analyticsService = this.injector.get(AnalyticsService);
        /** @type {?} */
        const dataStorageService = this.injector.get(DataStorageService);
        if (window.console && console.error) {
            /** @type {?} */
            const consoleErrorFnObject = console.error;
            /** @type {?} */
            const _self = this;
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
                const analyticsBean = analyticsService.setAnalyticsData('', {}, _self.eventLabels.CONSOLE_ERROR, '', { consoleErrors: JSON.stringify(processedError) });
                dataStorageService.appendToAnalyticsArray(analyticsBean);
                consoleErrorFnObject.call(console, error);
            });
        }
    }
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
// tslint:disable-next-line: directive-selector
class KeyStrokeDirective {
    /**
     * Dependencies
     * @param {?} dataStorage
     * @param {?} analyticsService
     * @param {?} el - Element Reference
     * @param {?} renderer - Renderer
     */
    constructor(dataStorage, analyticsService, el, renderer) {
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
            const dynamicId = `key_stroke_element_${v4()}`;
            this.renderer.setAttribute(this.el.nativeElement, 'id', dynamicId);
        }
    }
    /**
     * Tracking Key press events using host listener
     * Generating a data bean in a specified format
     * @param {?} $event - KeyPress Event
     * @return {?}
     */
    onKeyStroke($event) {
        /** @type {?} */
        const keyStroke = new KeyStrokeEventType();
        if ($event.target.type !== 'password' && this.checkClassNames($event.target.classList)) {
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
        }
    }
    /**
     * @param {?} classList
     * @return {?}
     */
    checkClassNames(classList) {
        /** @type {?} */
        const classNames = [...classList].concat(environment.ignoreCssRules);
        return Array.from(new Set(classNames)).length === classNames.length;
    }
    /**
     * Sending data
     * @private
     * @param {?} keyStroke - Captured KeyStroke data
     * @param {?} eventDetails - Key Press event details
     * @return {?}
     */
    sendData(keyStroke, eventDetails) {
        /** @type {?} */
        const analyticsBean = this.analyticsService.setAnalyticsData({}, eventDetails, this.eventLabels.KEY_STROKE, '', { keyStrokeData: keyStroke });
        this.dataStorage.appendToAnalyticsArray(analyticsBean);
    }
}
KeyStrokeDirective.decorators = [
    { type: Directive, args: [{ selector: '[track-keyStroke]' },] },
];
KeyStrokeDirective.ctorParameters = () => [
    { type: DataStorageService },
    { type: AnalyticsService },
    { type: ElementRef },
    { type: Renderer2 }
];
KeyStrokeDirective.propDecorators = {
    onKeyStroke: [{ type: HostListener, args: ['keypress', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgS3AnalyticsModule {
    /**
     * @param {?} routerService
     * @param {?} dataStorage
     * @param {?} pointerService
     * @param {?} errorhandler
     */
    constructor(routerService, dataStorage, pointerService, errorhandler) {
        this.routerService = routerService;
        this.dataStorage = dataStorage;
        this.pointerService = pointerService;
        this.errorhandler = errorhandler;
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
        this.errorhandler.trackConsoleErrors();
    }
    // Configuring the initial setup for s3 bucket and page loading
    /**
     * @param {?} configuration
     * @param {?=} isPageLoadingToBeDetected
     * @return {?}
     */
    static forRoot(configuration, isPageLoadingToBeDetected = false) {
        this.environmentService.setConfigurationToEnvironment(configuration, isPageLoadingToBeDetected);
        // Assigning the configuration to environment variables
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
NgS3AnalyticsModule.ctorParameters = () => [
    { type: RouterService },
    { type: DataStorageService },
    { type: PointerService },
    { type: GlobalErrorHandler }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgS3AnalyticsService, NgS3AnalyticsComponent, NgS3AnalyticsModule, EnvironmentService, DataStorageService, ButtonHoverDirective as ɵe, ButtonDirective as ɵa, KeyStrokeDirective as ɵf, ScrollDirective as ɵd, AnalyticsService as ɵb, PluginConfigService as ɵc, GlobalErrorHandler as ɵh, PointerService as ɵg, RouterService as ɵi };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kYWdsb2JhbC1uZy1zMy1hbmFseXRpY3MuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLmNvbXBvbmVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi90eXBlcy9ldmVudC50eXBlcy50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2FuYWx5dGljcy9oYW5kbGVDb25maWcudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9kaXJlY3RpdmVzL2J1dHRvbi9idXR0b24uZGlyZWN0aXZlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL2RpcmVjdGl2ZXMvc2Nyb2xsL3Njcm9sbC5kaXJlY3RpdmUudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvZGlyZWN0aXZlcy9idXR0b24taG92ZXIvYnV0dG9uLWhvdmVyLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9yb3V0ZXIvcm91dGVyLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvcG9pbnRlci9wb2ludGVyLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvZXJyb3ItaGFuZGxlci9lcnJvckhhbmRsZXIuc2VydmljZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9kaXJlY3RpdmVzL2tleS1zdHJva2Uva2V5LXN0cm9rZS5kaXJlY3RpdmUudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW5nLXMzLWFuYWx5dGljcycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBuZy1zMy1hbmFseXRpY3Mgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiZXhwb3J0IGxldCBlbnZpcm9ubWVudCA9IHtcbiAgICBkYXRhQ29sbGVjdGlvbkFwaTogJ2h0dHBzOi8vMXhnZjVhMmJxMi5leGVjdXRlLWFwaS5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb20vZGV2LycsXG4gICAgaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDogdHJ1ZSxcbiAgICByZW1vdGVDb25maWdBcGk6ICcnLFxuICAgIGlnbm9yZVVybHM6IFtdLFxuICAgIGlnbm9yZUNzc1J1bGVzOiBbXSxcbiAgICBzaG93Q29uc2VudDogZmFsc2UsXG4gICAgY29uc2VudENvbnRlbnQ6ICdXZSB1c2UgY29va2llcyB0byBlbnN1cmUgdGhhdCB3ZSBwcm92aWRlIHlvdSB3aXRoIHRoZSBiZXN0IHBvc3NpYmxlIGV4cGVyaWVuY2Ugb24gb3VyIHdlYnNpdGUuSWYgeW91IGNvbnRpbnVlIHRvIHVzZSBvdXIgc2l0ZSwgd2UgYXNzdW1lIHlvdSBhY2NlcHQgb3VyIHVzZSBvZiBjb29raWVzLiBQcml2YWN5IFBvbGljeScsXG4gICAgZGlzYWJsZVRyYWNraW5nOiBmYWxzZSxcbiAgICBpZ25vcmVJUFJhbmdlczogJycsXG4gICAgaWdub3JlRG9tYWluczogW10sXG4gICAgZGlzYWJsZURlbW9ncmFwaGljSW5mbzogZmFsc2Vcbn07XG5cblxuIiwiZXhwb3J0IGVudW0gRXZlbnRMYWJlbHMge1xuICAgIFBBR0VfTE9BRCA9ICdQQUdFX0xPQUQnLFxuICAgIE1PVVNFX0hPVkVSID0gJ01PVVNFX0hPVkVSJyxcbiAgICBCVVRUT05fQ0xJQ0sgPSAnQlVUVE9OX0NMSUNLJyxcbiAgICBNT1VTRV9NT1ZFID0gJ01PVVNFX01PVkUnLFxuICAgIFNDUk9MTCA9ICdTQ1JPTEwnLFxuICAgIENPTlNPTEVfRVJST1IgPSAnQ09OU09MRV9FUlJPUicsXG4gICAgS0VZX1NUUk9LRSA9ICdLRVlfU1RST0tFJ1xufVxuXG5leHBvcnQgZW51bSBDb25zdGFudHMge1xuICAgIERFTU9HUkFQSElDX0lORk8gPSAnZGVtb2dyYXBoaWMtaW5mbycsXG4gICAgU0VTU0lPTl9JRCA9ICduZ1MzQW5hbHl0aWNzU2Vzc2lvbklkJyxcbiAgICBERU1PR1JBUEhJQ19BUElfVVJMID0gJ2h0dHBzOi8vaXBhcGkuY28vanNvbi8nXG59XG5cblxuZXhwb3J0IGNsYXNzIEtleVN0cm9rZUV2ZW50VHlwZSB7XG4gICAga2V5OiBzdHJpbmc7IC8vIHByZXNzZWQgS2V5XG4gICAga2V5Q29kZTogc3RyaW5nOyAvLyBwcmVzc2VkIEtleSBDb2RlXG4gICAgZWxlbWVudElkOiBzdHJpbmc7IC8vIElkIG9mIGVsZW1lbnRcbiAgICBpc0Zvcm06IGJvb2xlYW47IC8vIGlzIGl0IGEgZm9ybVxuICAgIGZvcm06IHN0cmluZztcbiAgICB0YWdOYW1lOiBzdHJpbmc7IC8vIHRhZ05hbWUgb2YgZWxlbWVudFxuICAgIGh0bWxFbGVtZW50VHlwZTogc3RyaW5nOyAvLyB0eXBlIG9mIGVsZW1lbnRcbiAgICB2YWx1ZTogc3RyaW5nOyAvLyBwcmV2aW91cyB2YWx1ZSBvZiB0aGUgZWxlbWVudFxuICAgIGNvZGU6IHN0cmluZzsgLy8gUHJlc3NlZCBrZXkgbGFiZWxcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmtleSA9ICcnO1xuICAgICAgICB0aGlzLmtleUNvZGUgPSAnJztcbiAgICAgICAgdGhpcy5lbGVtZW50SWQgPSAnJztcbiAgICAgICAgdGhpcy5pc0Zvcm0gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb3JtID0gJyc7XG4gICAgICAgIHRoaXMudGFnTmFtZSA9ICcnO1xuICAgICAgICB0aGlzLmh0bWxFbGVtZW50VHlwZSA9ICcnO1xuICAgICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMuY29kZSA9ICcnO1xuICAgIH1cbn1cbiIsIlxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uLCBQbHVnaW5Db25maWcsIFVzZXJCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcblxuZXhwb3J0IGNsYXNzIEVudmlyb25tZW50U2VydmljZSB7XG4gIGVudkNvbmZpZzogYW55ID0gbmV3IFN1YmplY3Q8UGx1Z2luQ29uZmlnPigpO1xuICB1c2VyT2JqZWN0OiBTdWJqZWN0PFVzZXJCZWFuPiA9IG5ldyBTdWJqZWN0PFVzZXJCZWFuPigpO1xuXG4gIC8vIFNldHRpbmcgQ29uZmlndXJhdGlvbiBvbiBlbnZpcm9ubWVudFxuICBzZXRDb25maWd1cmF0aW9uVG9FbnZpcm9ubWVudChjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkOiBib29sZWFuKSB7XG4gICAgZW52aXJvbm1lbnQuZGF0YUNvbGxlY3Rpb25BcGkgPSBjb25maWd1cmF0aW9uLmRhdGFDb2xsZWN0aW9uQXBpO1xuICAgIGVudmlyb25tZW50LmlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQgPSBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkO1xuICAgIGVudmlyb25tZW50LnJlbW90ZUNvbmZpZ0FwaSA9IGNvbmZpZ3VyYXRpb24ucmVtb3RlQ29uZmlnQXBpO1xuICAgIHRoaXMuZW52Q29uZmlnLm5leHQoZW52aXJvbm1lbnQpO1xuICAgIHRoaXMuZW52Q29uZmlnLmNvbXBsZXRlKCk7XG4gICAgdGhpcy51c2VyT2JqZWN0Lm5leHQoeyB1c2VyRW1haWw6ICcnLCB1c2VyUHJvZmlsZUltYWdlOiAnJywgdXNlck5hbWU6ICcnLCB1c2VyUGhvbmVOdW1iZXI6ICcnLCB1c2VySWQ6ICcnLCBvdGhlckluZm86ICcnIH0pO1xuICB9XG5cbiAgZ2V0RW52T2JzZXJ2YWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbnZDb25maWc7XG4gIH1cblxuICBzZXRVc2VySW5mbyh1c2VyT2JqZWN0OiBVc2VyQmVhbikge1xuICAgIHRoaXMudXNlck9iamVjdC5uZXh0KHVzZXJPYmplY3QpO1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlck9iamVjdC5hc09ic2VydmFibGUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50JztcbmltcG9ydCB7IFBsdWdpbkNvbmZpZywgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEVudmlyb25tZW50U2VydmljZSB9IGZyb20gJy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJ25neC1jb29raWUtc2VydmljZSc7XG5cblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBQbHVnaW5Db25maWdTZXJ2aWNlIHtcbiAgICByZW1vdGVQbHVnaW5Db25maWc6IFBsdWdpbkNvbmZpZztcbiAgICBkZW1vZ3JhcGhpY0luZm86IGFueTtcbiAgICAvKiogQ29uc3RhbnRzICovXG4gICAgY29uc3RhbnRzID0gQ29uc3RhbnRzO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsXG4gICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICBwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIGdldEVudmlyb25tZW50Q29uZmlnKCkge1xuICAgICAgICBjb25zdCBlbnYgPSB0aGlzLmluamVjdG9yLmdldChFbnZpcm9ubWVudFNlcnZpY2UpO1xuICAgICAgICBlbnYuZ2V0RW52T2JzZXJ2YWJsZSgpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hSZW1vdGVDb25maWcoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3VuYWJsZSB0byBmZXRjaCB4QW5hbHl0aWNzIHJlbW90ZSBjb25maWd1cmF0aW9uLiBQbGVhc2UgbWFrZSBzdXJlIHlvdSBoYXZlIGNvbmZpZ3VyZWQgdGhlIGNvcnJlY3QgVVJMLCBpZiB0aGUgaXNzdWUgcGVyc2lzdCBwbGVhc2UgY2hlY2sgdGhlIGRhc2hib2FyZCBmb3IgbW9yZSBpbmZvIG9yIGNvbnRhY3QgeEEgVGVhbS4gJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgIHB1YmxpYyBmZXRjaFJlbW90ZUNvbmZpZygpIHtcbiAgICAgICAgdGhpcy5odHRwQ2xpZW50LmdldChlbnZpcm9ubWVudC5yZW1vdGVDb25maWdBcGkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnID0gcmVzWydib2R5J107XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5zaG93Q29uc2VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmNvbnNlbnRDb250ZW50ID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5jb25zZW50Q29udGVudCA6IGVudmlyb25tZW50LmNvbnNlbnRDb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1Nob3dDb25zZW50KGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdjb2xsZWN0aW9uIGVycm9yJywgZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGhhbmRsZUNvbmZpZ3VyYXRpb24oYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGVja0Rpc2FibGVUcmFja2luZygpICYmXG4gICAgICAgICAgICB0aGlzLmNoZWNrRG9tYWluKGFuYWx5dGljc0JlYW4uZnVsbFVSTCkgJiZcbiAgICAgICAgICAgIHRoaXMuY2hlY2tJcFJhbmdlKGFuYWx5dGljc0JlYW4uZGVtb2dyYXBoaWNJbmZvWydpcCddKTtcblxuICAgIH1cblxuICAgIGNoZWNrRGlzYWJsZVRyYWNraW5nKCkge1xuICAgICAgICBpZiAodGhpcy5yZW1vdGVQbHVnaW5Db25maWcpIHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuZGlzYWJsZVRyYWNraW5nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0RvbWFpbihmdWxsVXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnICYmIHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmlnbm9yZURvbWFpbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuICEodGhpcy5yZW1vdGVQbHVnaW5Db25maWcuaWdub3JlRG9tYWlucy5maWx0ZXIoZG9tYWluID0+IGZ1bGxVcmwuaW5kZXhPZihkb21haW4pID49IDApLmxlbmd0aCA+IDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlQ2hlY2tVcmxzKHRyYWNrZWRPYmplY3RzOiBBcnJheTxBbmFseXRpY3NCZWFuPik6IEFycmF5PEFuYWx5dGljc0JlYW4+IHtcbiAgICAgICAgaWYgKHRyYWNrZWRPYmplY3RzICYmIHRyYWNrZWRPYmplY3RzLmxlbmd0aCA+IDAgJiYgdGhpcy5yZW1vdGVQbHVnaW5Db25maWcpIHtcbiAgICAgICAgICAgIHJldHVybiB0cmFja2VkT2JqZWN0cy5tYXAoYW5hbHl0aWNzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoISh0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5pZ25vcmVVcmxzLmZpbHRlcih1cmwgPT4gYW5hbHl0aWNzLmV2ZW50Q29tcG9uZW50LmluZGV4T2YodXJsKSA+PSAwKS5sZW5ndGggPiAwKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5hbHl0aWNzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmZpbHRlcihvYmplY3QgPT4gb2JqZWN0ICE9PSB1bmRlZmluZWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRyYWNrZWRPYmplY3RzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAqIElQIHJhbmdlIHJlc3RyaWN0aW9uIGFkZGVkXG4gICAqIEByZXN0cmljdElQUmFuZ2UgaXMgYSByZWdleFxuICAgKiBpZiBAcmVzdHJpY3RJUFJhbmdlIGlzIG1hdGNoIHdpdGggY3VycmVudCBJUCxcbiAgICogdGhlIGFuYWx5dGljcyBkYXRhIHdpbGwgYmUgcmVzdHJpY3RlZFxuICAgKi9cbiAgICBwcml2YXRlIGNoZWNrSXBSYW5nZShpcDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChpcCAmJiB0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZyAmJiB0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5pZ25vcmVJUFJhbmdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBpcFJhbmdlID0gdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuaWdub3JlSVBSYW5nZXM7XG4gICAgICAgICAgICByZXR1cm4gaXAubWF0Y2goaXBSYW5nZSkgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAqIFNldCB1c2VyIGRlbW9ncmFwaGljIGluZm9ybWF0aW9uIGluIGNvb2tpZXNcbiAgKi9cbiAgICBhc3luYyBnZXRJcCgpIHtcbiAgICAgICAgdGhpcy5kZW1vZ3JhcGhpY0luZm8gPSBhd2FpdCB0aGlzLmh0dHBDbGllbnQuZ2V0KHRoaXMuY29uc3RhbnRzLkRFTU9HUkFQSElDX0FQSV9VUkwpLnRvUHJvbWlzZSgpO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KFxuICAgICAgICAgICAgdGhpcy5jb25zdGFudHMuREVNT0dSQVBISUNfSU5GTyxcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMuZGVtb2dyYXBoaWNJbmZvKSxcbiAgICAgICAgICAgIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKDEwMDAgKiA2MCAqIDYwICogMjQpKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmRlbW9ncmFwaGljSW5mbztcbiAgICB9XG5cblxuICAgIHNldERlbW9ncmFwaGljSW5mbygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvb2tpZVNlcnZpY2UuY2hlY2sodGhpcy5jb25zdGFudHMuREVNT0dSQVBISUNfSU5GTykpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0SXAoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVtb2dyYXBoaWNJbmZvID0gSlNPTi5wYXJzZSh0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0KHRoaXMuY29uc3RhbnRzLkRFTU9HUkFQSElDX0lORk8pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5kZW1vZ3JhcGhpY0luZm87XG4gICAgfVxuXG4gICAgZ2V0RGVtb2dyYXBoaWNJbmZvKCkge1xuICAgICAgICBpZiAodGhpcy5yZW1vdGVQbHVnaW5Db25maWcgJiYgdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuZGlzYWJsZURlbW9ncmFwaGljSW5mbykge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0RGVtb2dyYXBoaWNJbmZvKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja1Nob3dDb25zZW50KGNvbnRlbnQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBkaXZFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXZFbC5jbGFzc0xpc3QuYWRkKCdjb25zZW50LXdyYXBwZXInKTtcbiAgICAgICAgZGl2RWwuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuICAgICAgICBkaXZFbC5zdHlsZS5ib3R0b20gPSAnMCc7XG4gICAgICAgIGRpdkVsLnN0eWxlLmxlZnQgPSAnMCc7XG4gICAgICAgIGRpdkVsLnN0eWxlLnJpZ2h0ID0gJzAnO1xuICAgICAgICBkaXZFbC5zdHlsZS5wYWRkaW5nID0gJzE1cHgnO1xuICAgICAgICBkaXZFbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzMzNjZmZic7XG4gICAgICAgIGRpdkVsLnN0eWxlLmNvbG9yID0gJyNmZmYnO1xuICAgICAgICBkaXZFbC5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICAgICAgZGl2RWwuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIGNvbnN0IHRleHRFbCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQpO1xuICAgICAgICBkaXZFbC5hcHBlbmRDaGlsZCh0ZXh0RWwpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdkVsKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50JztcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuLCBQZXJmb3JtYW5jZUJlYW4sIFVzZXJCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBFdmVudExhYmVscywgS2V5U3Ryb2tlRXZlbnRUeXBlLCBDb25zdGFudHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5pbXBvcnQgeyBQbHVnaW5Db25maWdTZXJ2aWNlIH0gZnJvbSAnLi9oYW5kbGVDb25maWcnO1xuaW1wb3J0IHsgRW52aXJvbm1lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQuc2VydmljZSc7XG4vKipcbiAqIEFuYWx5dGljcyBTZXJ2aWNlXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFuYWx5dGljc1NlcnZpY2Uge1xuXG4gIC8qKiBTZXNzaW9uSWQgb2YgcGx1Z2luICovXG4gIHNlc3Npb25JZDogc3RyaW5nO1xuICAvKiogRGVtb2dyYXBoaWMgaW5mbyAqL1xuICBkZW1vZ3JhcGhpY0luZm86IGFueSA9IHt9O1xuICAvKiogRXZlbnQgbGFiZWwgY29uc3RhbnRzICovXG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIC8qKiBDb25zdGFudHMgKi9cbiAgY29uc3RhbnRzID0gQ29uc3RhbnRzO1xuXG4gIHVzZXJJbmZvOiBVc2VyQmVhbjtcblxuICAvKipcbiAgICogQW5hbHl0aWNzIFNlcnZpY2UgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHBsdWdpbkNvbmZpZ1xuICAgKiBAcGFyYW0gaHR0cFNlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cFNlcnZpY2U6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBwbHVnaW5Db25maWc6IFBsdWdpbkNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbnZpcm9ubWVudFNlcnZpY2U6IEVudmlyb25tZW50U2VydmljZSkge1xuICAgIHRoaXMucGx1Z2luQ29uZmlnLmdldEVudmlyb25tZW50Q29uZmlnKCk7XG4gICAgdGhpcy5nZXRVc2VySW5mbygpO1xuICAgIHRoaXMuc2V0U2Vzc2lvbklkKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tpbmcgd2hldGhlciBzZXNzaW9uSWQgcHJlc2VudCBpbiBjb29raWUgb3Igbm90XG4gICAqIGlmIG5vIHNlc3Npb24gaWQgY29va2llIHByZXNlbnQsIGFkZGluZyBuZXcgc2Vzc2lvbiBpZCBvdGhlcndpc2UgcmV1c2luZyB0aGUgc2Vzc2lvbiBpZCB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRTZXNzaW9uSWQoKTogdm9pZCB7XG4gICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0odGhpcy5jb25zdGFudHMuU0VTU0lPTl9JRCkpIHtcbiAgICAgIHRoaXMuc2Vzc2lvbklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmNvbnN0YW50cy5TRVNTSU9OX0lEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXNzaW9uSWQgPSB1dWlkLnY0KCk7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHRoaXMuY29uc3RhbnRzLlNFU1NJT05fSUQsIHRoaXMuc2Vzc2lvbklkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tpbmcgdGhlIElQIHJhbmdlIHRvIGJlIHJlc3RyaWN0XG4gICAqIEBwYXJhbSBkYXRhIC0gZGF0YSB0byBiZSBwdXNoZWRcbiAgICovXG4gIHB1YmxpYyBwdXNoRGF0YShkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wbHVnaW5Db25maWcuaGFuZGxlQ29uZmlndXJhdGlvbihkYXRhLmV2ZW50VmFsdWVzWzBdKSkge1xuICAgICAgY29uc3QgYW5hbHl0aWNzT2JqZWN0TGlzdCA9IHRoaXMucGx1Z2luQ29uZmlnLnJlbW92ZUNoZWNrVXJscyhkYXRhLmV2ZW50VmFsdWVzKTtcbiAgICAgIGlmIChhbmFseXRpY3NPYmplY3RMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5wdWJsaXNoVE9BdXRoUzMoYW5hbHl0aWNzT2JqZWN0TGlzdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiBDb252ZXJ0aW5nIEpTT04gQXJyYXkgdG8gc3RyaW5nXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqL1xuICBwcml2YXRlIHByb2Nlc3NGb3JBdGhlbmEoZGF0YTogQXJyYXk8QW5hbHl0aWNzQmVhbj4pOiBzdHJpbmcge1xuICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGRhdGEubWFwKChvYmplY3Q6IGFueSkgPT4ge1xuICAgICAgICBvYmplY3RbJ3Nlc3Npb25JZCddID0gdGhpcy5zZXNzaW9uSWQ7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmplY3QpO1xuICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICAqIFByZXBhcmluZyBkYXRhIHRvIGJlIHB1c2hlZCB0byBEYXRhU3RvcmFnZVxuICAgICogQHBhcmFtIGRhdGEgIGRhdGEgdG8gYmUgcHVzaGVkXG4gICAgKi9cbiAgcHJpdmF0ZSBwdWJsaXNoVE9BdXRoUzMoZGF0YTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX1fJHt0aGlzLnNlc3Npb25JZH1fJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9Lmpzb25gO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgIHRoaXMucHVzaERhdGFUb1MzKGZpbGVuYW1lLCB0aGlzLnByb2Nlc3NGb3JBdGhlbmEoZGF0YSksIGhlYWRlcnMpO1xuICB9XG5cblxuICAvKipcbiAgICogUHVzaGluZyBkYXRhIHRvIGNvcnJlc3BvbmRpbmcgYnVja2V0IHVzaW5nIGRhdGEgY29sbGVjdGlvbiBhcGlcbiAgICogQHBhcmFtIHBhdGggLSBzZXJ2aWNlIHBhdGhcbiAgICogQHBhcmFtIGRhdGEgLSBkYXRhIHRvIGJlIHB1c2hlZFxuICAgKi9cbiAgcHJpdmF0ZSBwdXNoRGF0YVRvUzMocGF0aDogc3RyaW5nLCBkYXRhOiBhbnksIGhlYWRlcnM6IEh0dHBIZWFkZXJzKTogdm9pZCB7XG4gICAgY29uc3QgdXJsID0gYCR7ZW52aXJvbm1lbnQuZGF0YUNvbGxlY3Rpb25BcGl9JHtwYXRofWA7XG4gICAgdGhpcy5odHRwU2VydmljZS5wdXQodXJsLCBkYXRhLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSkuc3Vic2NyaWJlKHJlcyA9PiB7IH0sIGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgdGhlIGNhcHR1cmVkIEhUTUwgdG8gdGhlIGRhdGEgY29sbGVjdGlvblxuICAgKiBAcGFyYW0gaHRtbFRlbXBsYXRlIC0gRE9NIENvbnRlbnRcbiAgICogQHBhcmFtIHNjcmVlbnNob3ROYW1lIC0gZmlsZW5hbWUgdG8gYmUgc2F2ZWRcbiAgICovXG4gIHB1YmxpYyBzYXZlU2NyZWVuc2hvdHNJblMzKGh0bWxUZW1wbGF0ZTogc3RyaW5nLCBzY3JlZW5zaG90TmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGx1Z2luQ29uZmlnLmNoZWNrRGlzYWJsZVRyYWNraW5nKCkpIHtcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gYGFzc2V0cy8ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfS8ke3RoaXMuc2Vzc2lvbklkfS8ke3NjcmVlbnNob3ROYW1lfS5odG1sYDtcbiAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ3RleHQvaHRtbCcgfSk7XG4gICAgICB0aGlzLnB1c2hEYXRhVG9TMyhmaWxlbmFtZSwgaHRtbFRlbXBsYXRlLCBoZWFkZXJzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBjb25zb2xlIGVycm9ycyB0byBTMyBidWNrZXRcbiAgICogQHBhcmFtIGRhdGEgXG4gICAqL1xuICBwdWJsaWMgcHVibGlzaENvbnNvbGVFcnJvcnMoZGF0YTogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGx1Z2luQ29uZmlnLmNoZWNrRGlzYWJsZVRyYWNraW5nKCkpIHtcbiAgICAgIGRhdGFbJ3Nlc3Npb25JZCddID0gdGhpcy5zZXNzaW9uSWQ7XG4gICAgICBjb25zdCBmaWxlbmFtZSA9IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfV8ke3RoaXMuc2Vzc2lvbklkfV9jb25zb2xlX2Vycm9yc18ke25ldyBEYXRlKCkuZ2V0VGltZSgpfS5qc29uYDtcbiAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgICAgdGhpcy5wdXNoRGF0YVRvUzMoZmlsZW5hbWUsIGRhdGEsIGhlYWRlcnMpO1xuICAgIH1cbiAgfVxuXG5cblxuICAvKipcbiAgICogU2V0dGluZyBhbmFseXRpY3Mgb2JqZWN0IHRvIGJlIHNhdmVkIGluIFMzIGJ1Y2tldFxuICAgKiBAcGFyYW0gdXNlckRhdGEgLSBEYXRhIHRyYW5zZmVycmVkIHRvIEV2ZW50IERpcmVjdGl2ZVxuICAgKiBAcGFyYW0gZXZlbnREZXRhaWxzIC0gUG9zaXRpb24gb2YgZXZlbnRzXG4gICAqIEBwYXJhbSBldmVudE5hbWUgIC0gVHlwZSBvZiBldmVudFxuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgIC0gZmlsZSBuYW1lIG9mIHNhdmVkIHNjcmVlbnNob3QgaWYgdGhlIGV2ZW50IGlzIFBhZ2VMb2FkZWRcbiAgICovXG4gIHB1YmxpYyBzZXRBbmFseXRpY3NEYXRhKFxuICAgIHVzZXJEYXRhOiBhbnkgPSB7fSxcbiAgICBldmVudERldGFpbHM6IGFueSxcbiAgICBldmVudE5hbWU6IHN0cmluZyxcbiAgICBzY3JlZW5zaG90TmFtZTogc3RyaW5nLFxuICAgIG9wdGlvbmFsPzoge1xuICAgICAgZXZlbnRDb21wb25lbnQ/OiBzdHJpbmcsXG4gICAgICBrZXlTdHJva2VEYXRhPzogS2V5U3Ryb2tlRXZlbnRUeXBlLFxuICAgICAgY29uc29sZUVycm9ycz86IHN0cmluZ1xuICAgIH0pOiBBbmFseXRpY3NCZWFuIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID0ge1xuICAgICAgZXZlbnRMYWJlbDogZXZlbnROYW1lLFxuICAgICAgZXZlbnRDb21wb25lbnQ6IG9wdGlvbmFsICYmIG9wdGlvbmFsLmV2ZW50Q29tcG9uZW50ID8gb3B0aW9uYWwuZXZlbnRDb21wb25lbnQgOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJz8nKVswXSxcbiAgICAgIGJyb3dzZXI6IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgZnVsbFVSTDogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICBvcmlnaW46IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgICByZXNvbHV0aW9uOiBgJHt3aW5kb3cuaW5uZXJXaWR0aH14JHt3aW5kb3cuaW5uZXJIZWlnaHR9YCxcbiAgICAgIHhDb29yZDogdGhpcy5nZXRFdmVudERldGFpbHMoZXZlbnREZXRhaWxzWydjbGllbnRYJ10pLFxuICAgICAgeUNvb3JkOiB0aGlzLmdldEV2ZW50RGV0YWlscyhldmVudERldGFpbHNbJ2NsaWVudFknXSksXG4gICAgICBwYWdlWENvb3JkOiB3aW5kb3cucGFnZVhPZmZzZXQudG9TdHJpbmcoKSB8fCAnMCcsXG4gICAgICBwYWdlWUNvb3JkOiB3aW5kb3cucGFnZVlPZmZzZXQudG9TdHJpbmcoKSB8fCAnMCcsXG4gICAgICBldmVudFRpbWU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIHNjcmVlbnNob3Q6IHNjcmVlbnNob3ROYW1lLFxuICAgICAgYWRkaXRpb25hbEluZm86IHVzZXJEYXRhLFxuICAgICAgZXJyb3JzOiAob3B0aW9uYWwgJiYgb3B0aW9uYWwuY29uc29sZUVycm9ycykgPyBvcHRpb25hbC5jb25zb2xlRXJyb3JzIDogJycsXG4gICAgICB1dG06IHRoaXMuZ2V0VVRNUGFyYW1ldGVycyh3aW5kb3cubG9jYXRpb24uaHJlZiksXG4gICAgICBkZW1vZ3JhcGhpY0luZm86IHRoaXMucGx1Z2luQ29uZmlnLmdldERlbW9ncmFwaGljSW5mbygpLFxuICAgICAga2V5U3Ryb2tlRGF0YTogKG9wdGlvbmFsICYmIG9wdGlvbmFsLmtleVN0cm9rZURhdGEpID8gb3B0aW9uYWwua2V5U3Ryb2tlRGF0YSA6IHRoaXMuZ2V0RW1wdHlLZXlTdHJva2VEYXRhKCksXG4gICAgICBodG1sRWxlbWVudDogdGhpcy5nZXRIdG1sRWxlbWVudChldmVudERldGFpbHNbJ3RhcmdldCddLCBldmVudE5hbWUpLFxuICAgICAgcGVyZm9ybWFuY2U6IHRoaXMuZ2V0UGVyZm9ybWFuY2VEZXRhaWxzKCksXG4gICAgICB1c2VySW5mbzogdGhpcy51c2VySW5mb1xuICAgIH07XG4gICAgcmV0dXJuIGFuYWx5dGljc0JlYW47XG4gIH1cblxuICAvKipcbiAgICogRXZlbnQgZGV0YWlsc1xuICAgKiBAcGFyYW0gdmFsdWUgXG4gICAqL1xuICBwcml2YXRlIGdldEV2ZW50RGV0YWlscyh2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlLnRvU3RyaW5nKCkgOiAnMCc7XG4gIH1cblxuICAvKipcbiAgICogR2V0IEhUTUwgQ29udGVudFxuICAgKiBAcGFyYW0gdGFyZ2V0RWxlbWVudCAtIHRhcmdldCBlbGVtZW50XG4gICAqL1xuICBwcml2YXRlIGdldEh0bWxFbGVtZW50KHRhcmdldEVsZW1lbnQ6IGFueSwgZXZlbnROYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChldmVudE5hbWUgIT09IHRoaXMuZXZlbnRMYWJlbHMuTU9VU0VfTU9WRSAmJiBldmVudE5hbWUgIT09IHRoaXMuZXZlbnRMYWJlbHMuU0NST0xMKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0RWxlbWVudCAhPT0gdW5kZWZpbmVkID8gdGFyZ2V0RWxlbWVudFsnaW5uZXJIVE1MJ10gOiAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuXG5cbiAgcHJpdmF0ZSBnZXRFbXB0eUtleVN0cm9rZURhdGEoKTogS2V5U3Ryb2tlRXZlbnRUeXBlIHtcbiAgICByZXR1cm4ge1xuICAgICAga2V5OiAnJyxcbiAgICAgIGtleUNvZGU6ICcnLFxuICAgICAgY29kZTogJycsXG4gICAgICBlbGVtZW50SWQ6ICcnLFxuICAgICAgZm9ybTogJycsXG4gICAgICBodG1sRWxlbWVudFR5cGU6ICcnLFxuICAgICAgaXNGb3JtOiBmYWxzZSxcbiAgICAgIHRhZ05hbWU6ICcnLFxuICAgICAgdmFsdWU6ICcnXG4gICAgfTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBlcmZvcm1hbmNlIGRldGFpbHNcbiAgICovXG4gIHByaXZhdGUgZ2V0UGVyZm9ybWFuY2VEZXRhaWxzKCk6IFBlcmZvcm1hbmNlQmVhbiB7XG4gICAgY29uc3QgcGVyZm9ybWFuY2UgPSB3aW5kb3cucGVyZm9ybWFuY2U7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hdmlnYXRpb246IHBlcmZvcm1hbmNlLm5hdmlnYXRpb24sXG4gICAgICB0aW1lT3JpZ2luOiBwZXJmb3JtYW5jZS50aW1lT3JpZ2luLFxuICAgICAgdGltaW5nOiBwZXJmb3JtYW5jZS50aW1pbmdcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIE1lbW9yeSB1c2FnZSBvZiB0aGUgYXBwbGljYXRpb24gaXMgcHJvdmlkZWQgYnkgR29vZ2xlIENocm9tZVxuICAgKiBAcGFyYW0gdXNlckFnZW50IC0gVXNlciBhZ2VudCB0byBjaGVjayB0aGUgYnJvd3NlclxuICAgKi9cbiAgcHJpdmF0ZSBnZU1lbW9yeVVzYWdlSW5mbyh1c2VyQWdlbnQ6IGFueSkge1xuICAgIGNvbnN0IGlzQ2hyb21lID0gdXNlckFnZW50LnNwbGl0KCdjaHJvbWUnKS5sZW5ndGggPiAxO1xuICAgIGNvbnN0IG1lbW9yeSA9IGlzQ2hyb21lID8gd2luZG93LnBlcmZvcm1hbmNlWydtZW1vcnknXSA6ICcnO1xuICAgIHJldHVybiBtZW1vcnk7XG4gIH1cblxuICAvKipcbiAgICogR2V0dGluZyBVVE0gUGFyYW1ldGVycyBieSBwcm9jZXNzaW5nIGN1cnJlbnQgcGFnZVVSTFxuICAgKiBAcGFyYW0gdXJsIC0gUGFnZSBVUkxcbiAgICovXG4gIHByaXZhdGUgZ2V0VVRNUGFyYW1ldGVycyh1cmw6IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3QgdXRtT2JqZWN0ID0ge307XG4gICAgaWYgKHVybC5pbmNsdWRlcygndXRtJykpIHtcbiAgICAgIGNvbnN0IHV0bVBhcmFtcyA9IHVybC5zcGxpdCgnPycpWzFdLnNwbGl0KCcmJyk7XG4gICAgICB1dG1QYXJhbXMubWFwKHBhcmFtID0+IHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gcGFyYW0uc3BsaXQoJz0nKTtcbiAgICAgICAgdXRtT2JqZWN0W3BhcmFtc1swXV0gPSBwYXJhbXNbMV07XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHV0bU9iamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXR0aW5nIHVzZXIgaW5mb1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRVc2VySW5mbygpIHtcbiAgICB0aGlzLmVudmlyb25tZW50U2VydmljZS5nZXRVc2VySW5mbygpLnN1YnNjcmliZShcbiAgICAgIChyZXM6IFVzZXJCZWFuKSA9PiB7XG4gICAgICAgIHRoaXMudXNlckluZm8gPSByZXM7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWNlaXZlIHVzZXIgYmVhbicsIHRoaXMudXNlckluZm8pO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IGludGVydmFsLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERhdGFTdG9yYWdlU2VydmljZSB7XG5cbiAgY29uc3RhbnRzID0gQ29uc3RhbnRzO1xuICBhbGxEYXRhQW5hbHl0aWNzQXJyYXk6IEFycmF5PGFueT4gPSBbXTtcbiAgYWxsRGF0YUFuYWx5dGljczoge1xuICAgIHBhZ2VVcmw6IHN0cmluZyxcbiAgICBldmVudFZhbHVlczogQXJyYXk8YW55PlxuICB9O1xuICBwcmV2aW91c1VybDogc3RyaW5nO1xuICBrZXlzOiBBcnJheTxhbnk+ID0gW107XG4gIGlkbGVUaW1lclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBldmVudENvbGxlY3RvciA9IG5ldyBNYXAoKTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhbmFseXRpY2FsU2VydmljZTogQW5hbHl0aWNzU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cbiAgcHJpdmF0ZSByb3V0ZURldGFpbHM6IGFueSA9IFtdO1xuICBjb3VudCA9IDA7XG4gIHNldFVybEtleShkYXRhOiBzdHJpbmcpIHtcbiAgICBsZXQgZmxhZyA9IDA7XG4gICAgaWYgKHRoaXMucHJldmlvdXNVcmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5ldmVudENvbGxlY3Rvci5zZXQoZGF0YSwgW10pO1xuICAgICAgdGhpcy5wcmV2aW91c1VybCA9IGRhdGEgfHwgJy8nO1xuICAgIH0gZWxzZSBpZiAoIShkYXRhID09PSB0aGlzLnByZXZpb3VzVXJsKSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmtleXMoKSkpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gZGF0YSkge1xuICAgICAgICAgIGZsYWcgPSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZmxhZyA9PT0gMCkge1xuICAgICAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLnNldChkYXRhLCBbXSk7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXZpb3VzVXJsID0gZGF0YTtcbiAgICB9XG4gIH1cbiAgYXBwZW5kVG9BbmFseXRpY3NBcnJheShkYXRhOiBBbmFseXRpY3NCZWFuKSB7XG4gICAgaWYgKHRoaXMucHJldmlvdXNVcmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zZXRVcmxLZXkoZGF0YS5ldmVudENvbXBvbmVudCk7XG4gICAgfVxuICAgIHRoaXMuZXZlbnRDb2xsZWN0b3IuZ2V0KHRoaXMucHJldmlvdXNVcmwpLnB1c2goZGF0YSk7XG4gIH1cblxuICBwdXNoRGF0YUFycmF5VG9TMygpIHtcbiAgICB0aGlzLmNvdW50Kys7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmtleXMoKSkpIHtcbiAgICAgIHRoaXMuYWxsRGF0YUFuYWx5dGljcyA9IHtcbiAgICAgICAgcGFnZVVybDoga2V5LFxuICAgICAgICBldmVudFZhbHVlczogQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmdldChrZXkpLnZhbHVlcygpKVxuICAgICAgfTtcbiAgICAgIHRoaXMua2V5cy5wdXNoKGtleSk7XG4gICAgICBpZiAodGhpcy5hbGxEYXRhQW5hbHl0aWNzLmV2ZW50VmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5zdG9wSWRsZVRpbWVyKCk7XG4gICAgICAgIHRoaXMuYW5hbHl0aWNhbFNlcnZpY2UucHVzaERhdGEodGhpcy5hbGxEYXRhQW5hbHl0aWNzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhcnRDYWxjdWxhdGVJZGxlVGltZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLmNsZWFyKCk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5rZXlzKSB7XG4gICAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLnNldChrZXksIFtdKTtcbiAgICB9XG4gIH1cblxuICBzZXRSb3V0ZURldGFpbHMocm91dGVEZXRhaWxzOiBhbnkpIHtcbiAgICB0aGlzLnJvdXRlRGV0YWlscyA9IHJvdXRlRGV0YWlscztcbiAgfVxuXG4gIGdldFJvdXRlRGV0YWlscygpIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZURldGFpbHM7XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIHNlc3Npb24gaXMgaWRsZSBmb3IgMzAgbWluLCB0aGUgc2Vzc2lvbiB3aWxsIGJlIGNsZWFyZWRcbiAgICovXG4gIHN0YXJ0Q2FsY3VsYXRlSWRsZVRpbWUoKSB7XG4gICAgaWYgKCF0aGlzLmlkbGVUaW1lclN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5pZGxlVGltZXJTdWJzY3JpcHRpb24gPSBpbnRlcnZhbCgxMDAwICogNjAgKiAzMCkuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICBjb25zdCBzZXNzaW9uSWQgPSB1dWlkLnY0KCk7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0odGhpcy5jb25zdGFudHMuU0VTU0lPTl9JRCwgc2Vzc2lvbklkKTtcbiAgICAgICAgdGhpcy5zdG9wSWRsZVRpbWVyKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaWYgdGhlIGlkbGUgdGltZXIgaXMgcnVubmluZywgcmVzZXR0aW5nIHRoZSB0aW1lclxuICAgKi9cbiAgc3RvcElkbGVUaW1lcigpIHtcbiAgICBpZiAodGhpcy5pZGxlVGltZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuaWRsZVRpbWVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmlkbGVUaW1lclN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuc3RhcnRDYWxjdWxhdGVJZGxlVGltZSgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuXG4vKipcbiAqIEJ1dHRvbiBEaXJlY3RpdmUgdG8gdHJhY2sgY2xpY2sgZXZlbnRcbiAqIFNlbGVjdG9yIGNhbiBiZSBhZGRlZCB0byBhbnkgSFRNTCBFbGVtZW50XG4gKi9cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1t0cmFjay1idG5dJ1xufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25EaXJlY3RpdmUge1xuXG4gIC8vIEdldHMgaW1wb3J0YW50IGRhdGEgYWJvdXQgdGhlIGJ1dHRvbiBleHBsaWNpdGx5IGZyb20gdGhlIGFwcGxpY2F0aW9uXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgndHJhY2stYnRuJykgZGF0YTogYW55ID0ge307XG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIGV2ZW50RGV0YWlsczogYW55O1xuXG4gIC8qKlxuICAgKiBCdXR0b24gVHJhY2tpbmcgLSBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gZGF0YVN0b3JhZ2UgLSBEYXRhU3RvcmFnZVNlcnZpY2VcbiAgICogQHBhcmFtIGFuYWx5dGljc1NlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlKSB7IH1cblxuXG4gIC8qKlxuICAgKiAgTGlzdGVuIHRvIGJ1dHRvbiBjbGljayBhY3Rpb25zXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIG9uQ2xpY2soJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmV2ZW50RGV0YWlscyA9ICRldmVudDtcbiAgICB0aGlzLnNlbmREYXRhKCk7XG4gIH1cblxuICAvKiogU2VuZGluZyBkYXRhIG9uIGJ1dHRvbiBjbGljayAqL1xuICBwdWJsaWMgc2VuZERhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIHRoaXMuZXZlbnREZXRhaWxzLCB0aGlzLmV2ZW50TGFiZWxzLkJVVFRPTl9DTElDSywgJycpO1xuICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkNoYW5nZXMsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcblxuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1t0cmFjay1zY3JvbGxdJ1xufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgLy8gR2V0cyBpbXBvcnRhbnQgZGF0YSBhYm91dCB0aGUgY29tcG9uZW50IGV4cGxpY2l0bHkgZnJvbSB0aGUgYXBwbGljYXRpb25cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICAgIEBJbnB1dCgndHJhY2stc2Nyb2xsJykgZGF0YTogYW55ID0ge307XG4gICAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZVxuICAgICkgeyB9XG5cbiAgICAvLyBDYXB0dXJlIHRoZSBjaGFuZ2UgaW4gZGF0YVxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlO1xuICAgIH1cblxuICAgIC8vIFRyaWdnZXJlZCB3aGVuIGFueSBzY3JvbGwgZXZlbnQgb2NjdXJzXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnNjcm9sbCcsIFsnJGV2ZW50J10pIG9uU2Nyb2xsRXZlbnQoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbmREYXRhKCRldmVudCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc2VuZERhdGEoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgICAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgZXZlbnQsIHRoaXMuZXZlbnRMYWJlbHMuU0NST0xMLCAnJyk7XG4gICAgICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbdHJhY2stYnV0dG9uSG92ZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25Ib3ZlckRpcmVjdGl2ZSB7XG4gIC8qKiAqL1xuICBldmVudERldGFpbHM6IGFueTtcbiAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgLy8gR2V0cyBpbXBvcnRhbnQgZGF0YSBhYm91dCB0aGUgYnV0dG9uIGV4cGxpY2l0bHkgZnJvbSB0aGUgYXBwbGljYXRpb25cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCd0cmFjay1idXR0b25Ib3ZlcicpIGRhdGE6IGFueSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlKSB7IH1cblxuICAvLyBMaXN0ZW4gdG8gYnV0dG9uIGhvdmVyIGFjdGlvbnNcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VvdmVyJywgWyckZXZlbnQnXSkgb25Nb3VzZU92ZXIoJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmV2ZW50RGV0YWlscyA9ICRldmVudDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2VuZERhdGEoKTtcbiAgICB9LCAxMCk7XG4gIH1cblxuICAvLyBTZW5kaW5nIGRhdGEgb24gYnV0dG9uIGhvdmVyXG4gIHB1YmxpYyBzZW5kRGF0YSgpOiB2b2lkIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgdGhpcy5ldmVudERldGFpbHMsIHRoaXMuZXZlbnRMYWJlbHMuTU9VU0VfSE9WRVIsICcnKTtcbiAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCwgTmF2aWdhdGlvbkVycm9yIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmRlY2xhcmUgbGV0IG5nUzNBbmFseXRpY3NKUzogYW55O1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUm91dGVyU2VydmljZSB7XG4gIGFuYWx5dGljc0RhdGE6IEFuYWx5dGljc0JlYW47XG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIG5hdmlnYXRlT24gPSAnJztcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXM6IFJvdXRlciwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlLCBwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFRyYWNraW5nIHJvdXRlciBldmVudHNcbiAgICovXG4gIHB1YmxpYyB0cmFja1JvdXRlckV2ZW50cygpOiB2b2lkIHtcbiAgICAvKiogVHJpZ2dlcmVkIHdoZW4gY3VycmVudCBwYWdlIGlzIGxvYWRlZCAqL1xuICAgIHRoaXMucm91dGVzLmV2ZW50cy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAvKiogVHJpZ2dlcmVkIHdoZW4gTmF2aWdhdGlvbkVuZCBldmVudCBvY2N1cnMgKi9cbiAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgaWYgKHRoaXMubmF2aWdhdGVPbiAhPT0gZXZlbnQudXJsKSB7XG4gICAgICAgICAgdGhpcy5hbmFseXRpY3NQdXNoRGF0YShldmVudCk7XG4gICAgICAgICAgdGhpcy5uYXZpZ2F0ZU9uID0gZXZlbnQudXJsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yKSB7XG4gICAgICAgIC8qKiBUcmlnZ2VyZWQgd2hlbiBOYXZpZ2F0aW9uRXJyb3IgZXZlbnQgb2NjdXJzICovXG4gICAgICAgIHRoaXMuYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgYW5hbHl0aWNzIGRhdGFcbiAgICogQHBhcmFtIGV2ZW50IC0gUm91dGVyIEV2ZW50XG4gICAqL1xuICBwdWJsaWMgYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHNjcmVlbnNob3ROYW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkudG9TdHJpbmcoKTtcbiAgICB0aGlzLmFuYWx5dGljc0RhdGEgPSB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh7fSwge30sIHRoaXMuZXZlbnRMYWJlbHMuUEFHRV9MT0FELCBgJHtzY3JlZW5zaG90TmFtZX0uaHRtbGAsXG4gICAgICB7IGV2ZW50Q29tcG9uZW50OiBldmVudC51cmwgfSk7XG4gICAgdGhpcy53YWl0VGlsbFBhZ2VMb2FkKHNjcmVlbnNob3ROYW1lKTtcbiAgICAvLyBEYXRhIGlzIHNlbmQgb25seSB3aGVuIHVzZXIgY29uZmlndXJlIHRoZSBwYWdlIGxvYWRpbmcgdG8gYmUgdHJ1ZVxuICAgIHRoaXMuZGF0YVN0b3JhZ2Uuc2V0VXJsS2V5KHRoaXMuYW5hbHl0aWNzRGF0YS5ldmVudENvbXBvbmVudCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkodGhpcy5hbmFseXRpY3NEYXRhKTtcbiAgICB9LCAwKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFdhaXRpbmcgZm9yIHBhZ2UgdG8gbG9hZCBjb21wbGV0ZWx5XG4gICAqIEBwYXJhbSBldmVudCBcbiAgICovXG4gIHdhaXRUaWxsUGFnZUxvYWQoc2NyZWVuc2hvdE5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICBfc2VsZi5jYXB0dXJlVGVtcGxhdGUoc2NyZWVuc2hvdE5hbWUpO1xuICAgICAgfVxuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgLyoqXG4gICAqIENhcHR1cmUgdGVtcGxhdGUgb2YgbG9hZGVkIHZpZXdcbiAgICogQHBhcmFtIHNjcmVlbnNob3ROYW1lIC0gU2NyZWVuc2hvdCBpbWFnZVxuICAgKi9cbiAgY2FwdHVyZVRlbXBsYXRlKHNjcmVlbnNob3ROYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmdWxsUGFnZUhUTUwgPSBuZ1MzQW5hbHl0aWNzSlMuY29uc3RydWN0SFRNTFBhZ2UoXG4gICAgICB0aGlzLnByb2Nlc3NSZWdleE9wZXJhdGlvbnMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpLmlubmVySFRNTCksXG4gICAgICB0aGlzLnByb2Nlc3NSZWdleE9wZXJhdGlvbnMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmlubmVySFRNTClcbiAgICApO1xuICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zYXZlU2NyZWVuc2hvdHNJblMzKGZ1bGxQYWdlSFRNTCwgc2NyZWVuc2hvdE5hbWUpO1xuICB9XG5cblxuICBwcm9jZXNzUmVnZXhPcGVyYXRpb25zKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5nUzNBbmFseXRpY3NKUy5kb1JlZ2V4KHRleHQsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbnB1dCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFBvaW50ZXJTZXJ2aWNlIHtcblxuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICBldmVudERldGFpbHM6IGFueTtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCd0cmFjay1wb2ludGVyJykgZGF0YTogYW55ID0ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLCBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UpIHsgfVxuXG4gIC8qKlxuICAgKiBUcmFjayBNb3VzZSBNb3ZlbWVudFxuICAgKi9cbiAgdHJhY2tNb3VzZU1vdmVFdmVudCgpIHtcbiAgICBmcm9tRXZlbnQod2luZG93LCAnbW91c2Vtb3ZlJylcbiAgICAgIC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5ldmVudERldGFpbHMgPSBlO1xuICAgICAgICB0aGlzLnNlbmREYXRhKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIE1vdXNlIE1vdmUgZGV0YWlsc1xuICAgKi9cbiAgcHVibGljIHNlbmREYXRhKCk6IHZvaWQge1xuICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEodGhpcy5kYXRhLCB0aGlzLmV2ZW50RGV0YWlscywgdGhpcy5ldmVudExhYmVscy5NT1VTRV9NT1ZFLCAnJyk7XG4gICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEVycm9ySGFuZGxlciwgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHbG9iYWxFcnJvckhhbmRsZXIge1xuICAgIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICB9XG5cbiAgICB0cmFja0NvbnNvbGVFcnJvcnMoKSB7XG5cbiAgICAgICAgY29uc3QgYW5hbHl0aWNzU2VydmljZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KEFuYWx5dGljc1NlcnZpY2UpO1xuICAgICAgICBjb25zdCBkYXRhU3RvcmFnZVNlcnZpY2UgPSB0aGlzLmluamVjdG9yLmdldChEYXRhU3RvcmFnZVNlcnZpY2UpO1xuICAgICAgICBpZiAod2luZG93LmNvbnNvbGUgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgICAgICAgY29uc3QgY29uc29sZUVycm9yRm5PYmplY3QgPSBjb25zb2xlLmVycm9yO1xuICAgICAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvciA9IGZ1bmN0aW9uICguLi5lcnJvcjogYW55W10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRFcnJvciA9IGVycm9yLm1hcChlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoZSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICAgICAgICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9IGFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YVxuICAgICAgICAgICAgICAgICAgICAoJycsIHt9LCBfc2VsZi5ldmVudExhYmVscy5DT05TT0xFX0VSUk9SLCAnJywgeyBjb25zb2xlRXJyb3JzOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzZWRFcnJvcikgfSk7XG4gICAgICAgICAgICAgICAgZGF0YVN0b3JhZ2VTZXJ2aWNlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gICAgICAgICAgICAgICAgY29uc29sZUVycm9yRm5PYmplY3QuY2FsbChjb25zb2xlLCBlcnJvcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgS2V5U3Ryb2tlRXZlbnRUeXBlLCBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgKiBhcyB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdHJhY2sta2V5U3Ryb2tlXScgfSlcbmV4cG9ydCBjbGFzcyBLZXlTdHJva2VEaXJlY3RpdmUge1xuXG4gICAgLyoqIEV2ZW50IExhYmVscyBDb25zdGFudHMgKi9cbiAgICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuXG4gICAgLyoqXG4gICAgICogRGVwZW5kZW5jaWVzXG4gICAgICogQHBhcmFtIGRhdGFTdG9yYWdlXG4gICAgICogQHBhcmFtIGFuYWx5dGljc1NlcnZpY2VcbiAgICAgKiBAcGFyYW0gZWwgLSBFbGVtZW50IFJlZmVyZW5jZVxuICAgICAqIEBwYXJhbSByZW5kZXJlciAtIFJlbmRlcmVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaWYgSWQgZG9lc24ndCBiZWxvbmdzIHRvIHRoZSBlbGVtZW50LCB3aGljaCBpcyBiZWluZyB0cmFja2VkLFxuICAgICAgICAgKiBBZGRpbmcgYSBkeW5hbWljIElkXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoIXRoaXMuZWwubmF0aXZlRWxlbWVudC5pZCkge1xuICAgICAgICAgICAgY29uc3QgZHluYW1pY0lkID0gYGtleV9zdHJva2VfZWxlbWVudF8ke3V1aWQudjQoKX1gO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaWQnLCBkeW5hbWljSWQpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmFja2luZyBLZXkgcHJlc3MgZXZlbnRzIHVzaW5nIGhvc3QgbGlzdGVuZXJcbiAgICAgKiBHZW5lcmF0aW5nIGEgZGF0YSBiZWFuIGluIGEgc3BlY2lmaWVkIGZvcm1hdFxuICAgICAqIEBwYXJhbSAkZXZlbnQgLSBLZXlQcmVzcyBFdmVudFxuICAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2tleXByZXNzJywgWyckZXZlbnQnXSkgb25LZXlTdHJva2UoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgY29uc3Qga2V5U3Ryb2tlOiBLZXlTdHJva2VFdmVudFR5cGUgPSBuZXcgS2V5U3Ryb2tlRXZlbnRUeXBlKCk7XG4gICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LnR5cGUgIT09ICdwYXNzd29yZCcgJiYgdGhpcy5jaGVja0NsYXNzTmFtZXMoJGV2ZW50LnRhcmdldC5jbGFzc0xpc3QpKSB7XG4gICAgICAgICAgICBrZXlTdHJva2UuZWxlbWVudElkID0gJGV2ZW50LnRhcmdldC5pZDtcbiAgICAgICAgICAgIGtleVN0cm9rZS5rZXkgPSAkZXZlbnQua2V5O1xuICAgICAgICAgICAga2V5U3Ryb2tlLmNvZGUgPSAkZXZlbnQuY29kZTtcbiAgICAgICAgICAgIGtleVN0cm9rZS5rZXlDb2RlID0gJGV2ZW50LmtleUNvZGUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGtleVN0cm9rZS5pc0Zvcm0gPSAkZXZlbnQudGFyZ2V0LmZvcm0gIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGtleVN0cm9rZS5mb3JtID0gJGV2ZW50LnRhcmdldC5mb3JtICE9PSB1bmRlZmluZWQgPyBKU09OLnN0cmluZ2lmeSgkZXZlbnQudGFyZ2V0LmZvcm0uZWxlbWVudHMpIDogJyc7XG4gICAgICAgICAgICBrZXlTdHJva2UudGFnTmFtZSA9ICRldmVudC50YXJnZXQudGFnTmFtZTtcbiAgICAgICAgICAgIGtleVN0cm9rZS5odG1sRWxlbWVudFR5cGUgPSAkZXZlbnQudGFyZ2V0LnR5cGU7XG4gICAgICAgICAgICBrZXlTdHJva2UudmFsdWUgPSAkZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5zZW5kRGF0YShrZXlTdHJva2UsICRldmVudCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGNoZWNrQ2xhc3NOYW1lcyhjbGFzc0xpc3Q6IEFycmF5PHN0cmluZz4pIHtcbiAgICAgICAgY29uc3QgY2xhc3NOYW1lczogYW55ID0gWy4uLmNsYXNzTGlzdF0uY29uY2F0KGVudmlyb25tZW50Lmlnbm9yZUNzc1J1bGVzKTtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChjbGFzc05hbWVzKSkubGVuZ3RoID09PSBjbGFzc05hbWVzLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kaW5nIGRhdGFcbiAgICAgKiBAcGFyYW0ga2V5U3Ryb2tlIC0gQ2FwdHVyZWQgS2V5U3Ryb2tlIGRhdGFcbiAgICAgKiBAcGFyYW0gZXZlbnREZXRhaWxzIC0gS2V5IFByZXNzIGV2ZW50IGRldGFpbHNcbiAgICAgKi9cbiAgICBwcml2YXRlIHNlbmREYXRhKGtleVN0cm9rZTogS2V5U3Ryb2tlRXZlbnRUeXBlLCBldmVudERldGFpbHM6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgICAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHt9LFxuICAgICAgICAgICAgICAgIGV2ZW50RGV0YWlscyxcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50TGFiZWxzLktFWV9TVFJPS0UsICcnLFxuICAgICAgICAgICAgICAgIHsga2V5U3Ryb2tlRGF0YToga2V5U3Ryb2tlIH0pO1xuICAgICAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUzNBbmFseXRpY3NDb21wb25lbnQgfSBmcm9tICcuL25nLXMzLWFuYWx5dGljcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgQnV0dG9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2J1dHRvbi9idXR0b24uZGlyZWN0aXZlJztcbmltcG9ydCB7IFNjcm9sbERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCdXR0b25Ib3ZlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9idXR0b24taG92ZXIvYnV0dG9uLWhvdmVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBFbnZpcm9ubWVudFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgUm91dGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlJztcbmltcG9ydCB7IGludGVydmFsIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9saWIvc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IFBvaW50ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9wb2ludGVyL3BvaW50ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEdsb2JhbEVycm9ySGFuZGxlciB9IGZyb20gJy4vc2VydmljZXMvZXJyb3ItaGFuZGxlci9lcnJvckhhbmRsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcbmltcG9ydCB7IEtleVN0cm9rZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9rZXktc3Ryb2tlL2tleS1zdHJva2UuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5nUzNBbmFseXRpY3NDb21wb25lbnQsXG4gICAgQnV0dG9uRGlyZWN0aXZlLFxuICAgIFNjcm9sbERpcmVjdGl2ZSxcbiAgICBCdXR0b25Ib3ZlckRpcmVjdGl2ZSxcbiAgICBLZXlTdHJva2VEaXJlY3RpdmVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgIEVudmlyb25tZW50U2VydmljZSxcbiAgICBQb2ludGVyU2VydmljZSxcbiAgICBDb29raWVTZXJ2aWNlLFxuICAgIEdsb2JhbEVycm9ySGFuZGxlclxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTmdTM0FuYWx5dGljc0NvbXBvbmVudCxcbiAgICBCdXR0b25EaXJlY3RpdmUsXG4gICAgU2Nyb2xsRGlyZWN0aXZlLFxuICAgIEJ1dHRvbkhvdmVyRGlyZWN0aXZlLFxuICAgIEtleVN0cm9rZURpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NNb2R1bGUge1xuXG4gIHByaXZhdGUgc3RhdGljIGVudmlyb25tZW50U2VydmljZSA9IG5ldyBFbnZpcm9ubWVudFNlcnZpY2UoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlclNlcnZpY2U6IFJvdXRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgcG9pbnRlclNlcnZpY2U6IFBvaW50ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgZXJyb3JoYW5kbGVyOiBHbG9iYWxFcnJvckhhbmRsZXIpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKGUpID0+IHtcbiAgICAgIHRoaXMuZGF0YVN0b3JhZ2UucHVzaERhdGFBcnJheVRvUzMoKTtcbiAgICB9KTtcbiAgICBpbnRlcnZhbCgxMDAwICogMikuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5kYXRhU3RvcmFnZS5wdXNoRGF0YUFycmF5VG9TMygpO1xuICAgIH0pO1xuICAgIHRoaXMucG9pbnRlclNlcnZpY2UudHJhY2tNb3VzZU1vdmVFdmVudCgpO1xuICAgIHRoaXMucm91dGVyU2VydmljZS50cmFja1JvdXRlckV2ZW50cygpO1xuICAgIHRoaXMuZXJyb3JoYW5kbGVyLnRyYWNrQ29uc29sZUVycm9ycygpO1xuICB9XG4gIC8vIENvbmZpZ3VyaW5nIHRoZSBpbml0aWFsIHNldHVwIGZvciBzMyBidWNrZXQgYW5kIHBhZ2UgbG9hZGluZ1xuICBzdGF0aWMgZm9yUm9vdChjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICB0aGlzLmVudmlyb25tZW50U2VydmljZS5zZXRDb25maWd1cmF0aW9uVG9FbnZpcm9ubWVudChjb25maWd1cmF0aW9uLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkKTtcbiAgICAvLyBBc3NpZ25pbmcgdGhlIGNvbmZpZ3VyYXRpb24gdG8gZW52aXJvbm1lbnQgdmFyaWFibGVzXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJ1dWlkLnY0IiwiaW50ZXJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQU9FLGlCQUFpQjs7O1lBTGxCLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs7Ozs7O0FDSkQ7SUFhRSxpQkFBaUI7Ozs7SUFFakIsUUFBUTtLQUNQOzs7WUFkRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFOzs7O0dBSVQ7Z0JBQ0QsTUFBTSxFQUFFLEVBQUU7YUFDWDs7Ozs7Ozs7O0FDVkQsSUFBVyxXQUFXLEdBQUc7SUFDckIsaUJBQWlCLEVBQUUsOERBQThEO0lBQ2pGLHlCQUF5QixFQUFFLElBQUk7SUFDL0IsZUFBZSxFQUFFLEVBQUU7SUFDbkIsVUFBVSxFQUFFLEVBQUU7SUFDZCxjQUFjLEVBQUUsRUFBRTtJQUNsQixXQUFXLEVBQUUsS0FBSztJQUNsQixjQUFjLEVBQUUsd0xBQXdMO0lBQ3hNLGVBQWUsRUFBRSxLQUFLO0lBQ3RCLGNBQWMsRUFBRSxFQUFFO0lBQ2xCLGFBQWEsRUFBRSxFQUFFO0lBQ2pCLHNCQUFz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