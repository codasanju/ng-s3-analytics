import { OnChanges } from '@angular/core';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { DataStorageService } from '../../services/data-storage/data-storage.service';
import { EventLabels } from '../../types/event.types';
export declare class ScrollDirective implements OnChanges {
    private analyticsService;
    private dataStorage;
    data: any;
    eventLabels: typeof EventLabels;
    constructor(analyticsService: AnalyticsService, dataStorage: DataStorageService);
    ngOnChanges(changes: any): void;
    onScrollEvent($event: any): void;
    sendData(event: any): void;
}
