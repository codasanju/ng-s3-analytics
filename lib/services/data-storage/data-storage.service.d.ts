import { AnalyticsService } from '../analytics/analytics.service';
import { HttpClient } from '@angular/common/http';
import { AnalyticsBean } from '../../analytics-bean/analytics-bean';
import { Subscription } from 'rxjs';
import { Constants } from '../../types/event.types';
export declare class DataStorageService {
    private analyticalService;
    private http;
    private platformId;
    constants: typeof Constants;
    allDataAnalyticsArray: Array<any>;
    allDataAnalytics: {
        pageUrl: string;
        eventValues: Array<any>;
    };
    previousUrl: string;
    keys: Array<any>;
    idleTimerSubscription: Subscription;
    eventCollector: Map<any, any>;
    constructor(analyticalService: AnalyticsService, http: HttpClient, platformId: any);
    private routeDetails;
    count: number;
    setUrlKey(data: string): void;
    appendToAnalyticsArray(data: AnalyticsBean): void;
    pushDataArrayToS3(): void;
    setRouteDetails(routeDetails: any): void;
    getRouteDetails(): any;
    /**
     * If the session is idle for 30 min, the session will be cleared
     */
    startCalculateIdleTime(): void;
    /**
     * if the idle timer is running, resetting the timer
     */
    stopIdleTimer(): void;
}
