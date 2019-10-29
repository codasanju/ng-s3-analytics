import { DataStorageService } from '../data-storage/data-storage.service';
import { AnalyticsService } from '../analytics/analytics.service';
import { EventLabels } from '../../types/event.types';
export declare class PointerService {
    private dataStorage;
    private analyticsService;
    eventLabels: typeof EventLabels;
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
