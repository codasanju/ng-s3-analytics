import { Injector } from '@angular/core';
import { EventLabels } from '../../types/event.types';
export declare class GlobalErrorHandler {
    private injector;
    eventLabels: typeof EventLabels;
    constructor(injector: Injector);
    trackConsoleErrors(): void;
}
