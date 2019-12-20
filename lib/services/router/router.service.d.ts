import { Router } from '@angular/router';
import { AnalyticsService } from '../analytics/analytics.service';
import { DataStorageService } from '../data-storage/data-storage.service';
import { AnalyticsBean } from '../../analytics-bean/analytics-bean';
import { EventLabels } from '../../types/event.types';
export declare class RouterService {
    private routes;
    private analyticsService;
    private dataStorage;
    private document;
    analyticsData: AnalyticsBean;
    eventLabels: typeof EventLabels;
    constructor(routes: Router, analyticsService: AnalyticsService, dataStorage: DataStorageService, document: any);
    /**
     * Tracking router events
     */
    trackRouterEvents(): void;
    /**
     * Pushing analytics data
     * @param event - Router Event
     */
    analyticsPushData(event: any): void;
    /**
     * Waiting for page to load completely
     * @param event
     */
    waitTillPageLoad(screenshotName: string): void;
    /**
     * Capture template of loaded view
     * @param screenshotName - Screenshot image
     */
    captureTemplate(screenshotName: string): void;
    processRegexOperations(text: string): string;
}
