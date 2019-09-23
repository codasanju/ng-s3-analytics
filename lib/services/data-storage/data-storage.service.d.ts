import { AnalyticsService } from '../analytics/analytics.service';
import { HttpClient } from '@angular/common/http';
import { AnalyticsBean } from '../../analytics-bean/analytics-bean';
export declare class DataStorageService {
    private analyticalService;
    private http;
    allDataAnalyticsArray: Array<any>;
    allDataAnalytics: {
        pageUrl: string;
        eventValues: Array<any>;
    };
    previousUrl: string;
    keys: Array<any>;
    eventCollector: Map<any, any>;
    constructor(analyticalService: AnalyticsService, http: HttpClient);
    private routeDetails;
    count: number;
    setUrlKey(data: string): void;
    appendToAnalyticsArray(data: AnalyticsBean): void;
    pushDataArrayToS3(): void;
    setRouteDetails(routeDetails: any): void;
    getRouteDetails(): any;
}
