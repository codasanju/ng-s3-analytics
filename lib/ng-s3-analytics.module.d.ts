import { ModuleWithProviders } from '@angular/core';
import { CredentialsBean } from './analytics-bean/analytics-bean';
import { RouterService } from './services/router/router.service';
import { DataStorageService } from '../lib/services/data-storage/data-storage.service';
import { PointerService } from './services/pointer/pointer.service';
export declare class NgS3AnalyticsModule {
    private routerService;
    private dataStorage;
    private pointerService;
    private static environmentService;
    constructor(routerService: RouterService, dataStorage: DataStorageService, pointerService: PointerService);
    static forRoot(credentials: CredentialsBean, isPageLoadingToBeDetected?: boolean): ModuleWithProviders;
}
