import { AnalyticsService } from '../../services/analytics/analytics.service';
import { DataStorageService } from '../../services/data-storage/data-storage.service';
export declare class ButtonHoverDirective {
    private dataStorage;
    private analyticsService;
    /** */
    eventDetails: any;
    data: any;
    constructor(dataStorage: DataStorageService, analyticsService: AnalyticsService);
    onMouseOver($event: any): void;
    sendData(): void;
}
