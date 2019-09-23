import { AnalyticsBean } from '../../analytics-bean/analytics-bean';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
/**
 * Analytics Service
 */
export declare class AnalyticsService {
    private cookieService;
    private httpService;
    /**
     * SessionId of plugin
     */
    sessionId: string;
    demographicInfo: any;
    constructor(cookieService: CookieService, httpService: HttpClient);
    /**
     * Checking whether sessionId present in cookie or not
     * if no session id cookie present, adding new session id otherwise reusing the session id value
     */
    private setSessionId;
    /**
     * Pushing Analytics data to different bucket based on Authentication flag
     * @param data
     */
    pushData(data: any): void;
    /**
     * Pushing data to UnAuthenticated Bucket S3
     * @param data
     */
    private publishTOUnAuthS3;
    /**
     * Converting JSON Array to string
     * @param data
     */
    processForAthena(data: Array<AnalyticsBean>): string;
    /**
      * Pushing data to Authenticated Bucket S3
      * @param data
      */
    publishTOAuthS3(data: any): void;
    /**
     * Construct S3 Object using AWS SDK
     */
    private constructS3Object;
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
    setAnalyticsData(userData: any, eventDetails: any, eventName: string, screenshotName: string, eventComponent?: string): AnalyticsBean;
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
