import { ElementRef, Renderer2 } from '@angular/core';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { DataStorageService } from '../../services/data-storage/data-storage.service';
import { EventLabels } from '../../types/event.types';
export declare class KeyStrokeDirective {
    private dataStorage;
    private analyticsService;
    private el;
    private renderer;
    /** Event Labels Constants */
    eventLabels: typeof EventLabels;
    /**
     * Dependencies
     * @param dataStorage
     * @param analyticsService
     * @param el - Element Reference
     * @param renderer - Renderer
     */
    constructor(dataStorage: DataStorageService, analyticsService: AnalyticsService, el: ElementRef, renderer: Renderer2);
    /**
     * Tracking Key press events using host listener
     * Generating a data bean in a specified format
     * @param $event - KeyPress Event
     */
    onKeyStroke($event: any): void;
    /**
     * Sending data
     * @param keyStroke - Captured KeyStroke data
     * @param eventDetails - Key Press event details
     */
    private sendData;
}
