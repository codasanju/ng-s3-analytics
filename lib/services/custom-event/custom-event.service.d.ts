import { DataStorageService } from '../data-storage/data-storage.service';
import { AnalyticsService } from '../analytics/analytics.service';
export declare class CustomEventService {
    private dataStorage;
    private analyticsService;
    constructor(dataStorage: DataStorageService, analyticsService: AnalyticsService);
    /**
     * This method is exposed to user to help pushing custom events
     *
     * @param customEventName - Any name that user can be configure
     * @param eventData - Any data, which user configured in additional info
     */
    pushEvent(customEventName: string, eventData: any): void;
}
