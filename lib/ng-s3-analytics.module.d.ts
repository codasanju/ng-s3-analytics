import { Configuration } from './analytics-bean/analytics-bean';
import { RouterService } from './services/router/router.service';
import { DataStorageService } from '../lib/services/data-storage/data-storage.service';
import { PointerService } from './services/pointer/pointer.service';
import { GlobalErrorHandler } from './services/error-handler/errorHandler.service';
export declare class NgS3AnalyticsModule {
    private routerService;
    private dataStorage;
    private pointerService;
    private errorhandler;
    private static environmentService;
    constructor(routerService: RouterService, dataStorage: DataStorageService, pointerService: PointerService, errorhandler: GlobalErrorHandler);
    static forRoot(configuration: Configuration, isPageLoadingToBeDetected?: boolean): void;
}
