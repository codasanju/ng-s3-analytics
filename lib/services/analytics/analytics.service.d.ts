import { AnalyticsBean } from '../../analytics-bean/analytics-bean';
import { HttpClient } from '@angular/common/http';
import { EventLabels, KeyStrokeEventType, Constants } from '../../types/event.types';
import { PluginConfigService } from './handleConfig';
/**
 * Analytics Service
 */
export declare class AnalyticsService {
    private httpService;
    private pluginConfig;
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
     * @param pluginConfig
     * @param httpService
     */
    constructor(httpService: HttpClient, pluginConfig: PluginConfigService);
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
     * Converting JSON Array to string
     * @param data
     */
    private processForAthena;
    /**
      * Preparing data to be pushed to DataStorage
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
     * Save the captured HTML to the data collection
     * @param htmlTemplate - DOM Content
     * @param screenshotName - filename to be saved
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
        consoleErrors?: string;
    }): AnalyticsBean;
    /**
     * Event details
     * @param value
     */
    private getEventDetails;
    /**
     * Get HTML Content
     * @param targetElement - target element
     */
    private getHtmlElement;
    private getEmptyKeyStrokeData;
    /**
     * Performance details
     */
    private getPerformanceDetails;
    /**
     * Memory usage of the application is provided by Google Chrome
     * @param userAgent - User agent to check the browser
     */
    private geMemoryUsageInfo;
    /**
     * Getting UTM Parameters by processing current pageURL
     * @param url - Page URL
     */
    private getUTMParameters;
}
