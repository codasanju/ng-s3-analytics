import { ErrorHandler, Injector } from '@angular/core';
import { EventLabels } from '../../types/event.types';
export declare class GlobalErrorHandler implements ErrorHandler {
    private injector;
    eventLabels: typeof EventLabels;
    constructor(injector: Injector);
    /** Implementing the method */
    handleError(error: any): void;
}
