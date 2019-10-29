import { AnalyticsService } from '../../services/analytics/analytics.service';
import { DataStorageService } from '../../services/data-storage/data-storage.service';
import { EventLabels } from '../../types/event.types';
export declare class ButtonHoverDirective {
    private dataStorage;
    private analyticsService;
    /** */
    eventDetails: any;
    eventLabels: typeof EventLabels;
    data: any;
    constructor(dataStorage: DataStorageService, analyticsService: AnalyticsService);
    onMouseOver($event: any): void;
    sendData(): void;
}
