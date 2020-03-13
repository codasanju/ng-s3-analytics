import { AnalyticsBean, PerformanceBean } from '../../analytics-bean/analytics-bean';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { EventLabels, KeyStrokeEventType, Constants } from '../../types/event.types';
/**
 * Analytics Service
 */
export declare class AnalyticsService {
    private cookieService;
    private httpService;
    /** SessionId of plugin */
    sessionId: string;
    /** Demographic info */
    demographicInfo: any;
    /** Event label constants */
    eventLabels: typeof EventLabels;
    /** Constants */
    constants: typeof Constants;
    /**
     * Analytics Service constructor
     * @param cookieService
     * @param httpService
     */
    constructor(cookieService: CookieService, httpService: HttpClient);
    /**
     * Checking whether sessionId present in cookie or not
     * if no session id cookie present, adding new session id otherwise reusing the session id value
     */
    private setSessionId;
    /**
     * Checking the IP range to be restrict
     * @param data - data to be pushed
     */
    pushData(data: any): void;
    /**
     * IP range restriction added
     * @restrictIPRange is a regex
     * if @restrictIPRange is match with current IP,
     * the analytics data will be restricted
     */
    private checkIpRange;
    /**
     * Converting JSON Array to string
     * @param data
     */
    processForAthena(data: Array<AnalyticsBean>): string;
    /**
      * Pushing data to Authenticated Bucket S3
      * @param data  data to be pushed
      */
    private publishTOAuthS3;
    /**
     * Pushing data to corresponding bucket using data collection api
     * @param path - service path
     * @param data - data to be pushed
     */
    private pushDataToS3;
    /**
     * Uploading captured base64 image to S3
     * @param image - Base64 String
     * @param screenshotName - Screenshot name linked with pageLoaded data
     */
    saveScreenshotsInS3(htmlTemplate: string, screenshotName: string): void;
    /**
     * Pushing console errors to S3 bucket
     * @param data
     */
    publishConsoleErrors(data: any): void;
    /**
     * Setting analytics object to be saved in S3 bucket
     * @param userData - Data transferred to Event Directive
     * @param eventDetails - Position of events
     * @param eventName  - Type of event
     * @param screenshotName  - file name of saved screenshot if the event is PageLoaded
     */
    setAnalyticsData(userData: any, eventDetails: any, eventName: string, screenshotName: string, optional?: {
        eventComponent?: string;
        keyStrokeData?: KeyStrokeEventType;
    }): AnalyticsBean;
    /**
     * Event details
     * @param value
     */
    getEventDetails(value: any): string;
    /**
     * Get HTML Content
     * @param targetElement - target element
     */
    getHtmlElement(targetElement: any): string;
    /**
     * Performance details
     */
    getPerformanceDetails(): PerformanceBean;
    /**
     * Memory usage of the application is provided by Google Chrome
     * @param userAgent - User agent to check the browser
     */
    geMemoryUsageInfo(userAgent: any): any;
    /**
     * Getting UTM Parameters by processing current pageURL
     * @param url - Page URL
     */
    private getUTMParameters;
    /**
     * Set user demographic information in cookies
     */
    private getIp;
}
