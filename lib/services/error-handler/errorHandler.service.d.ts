import { ErrorHandler, Injector } from '@angular/core';
export declare class GlobalErrorHandler implements ErrorHandler {
    private injector;
    constructor(injector: Injector);
    /** Implementing the method */
    handleError(error: any): void;
}
