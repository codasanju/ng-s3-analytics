import { DataStorageService } from '../../services/data-storage/data-storage.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
/**
 * Button Directive to track click event
 * Selector can be added to any HTML Element
 */
export declare class ButtonDirective {
    private dataStorage;
    private analyticsService;
    data: any;
    eventDetails: any;
    /**
     * Button Tracking - Constructor
     * @param dataStorage - DataStorageService
     * @param analyticsService
     */
    constructor(dataStorage: DataStorageService, analyticsService: AnalyticsService);
    /**
     *  Listen to button click actions
     */
    onClick($event: any): void;
    /** Sending data on button click */
    sendData(): void;
}
