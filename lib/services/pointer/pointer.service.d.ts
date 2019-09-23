import { DataStorageService } from '../data-storage/data-storage.service';
import { AnalyticsService } from '../analytics/analytics.service';
export declare class PointerService {
    private dataStorage;
    private analyticsService;
    eventDetails: any;
    data: any;
    constructor(dataStorage: DataStorageService, analyticsService: AnalyticsService);
    /**
     * Track Mouse Movement
     */
    trackMouseMoveEvent(): void;
    /**
     * Pushing Mouse Move details
     */
    sendData(): void;
}
