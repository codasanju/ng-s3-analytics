import { OnChanges } from '@angular/core';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { DataStorageService } from '../../services/data-storage/data-storage.service';
export declare class ScrollDirective implements OnChanges {
    private analyticsService;
    private dataStorage;
    data: any;
    constructor(analyticsService: AnalyticsService, dataStorage: DataStorageService);
    ngOnChanges(changes: any): void;
    onScrollEvent($event: any): void;
    sendData(event: any): void;
}
