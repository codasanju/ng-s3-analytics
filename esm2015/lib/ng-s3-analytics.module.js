/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { NgS3AnalyticsComponent } from './ng-s3-analytics.component';
import { ButtonDirective } from './directives/button/button.directive';
import { ScrollDirective } from './directives/scroll/scroll.directive';
import { ButtonHoverDirective } from './directives/button-hover/button-hover.directive';
import { EnvironmentService } from './services/environment/environment.service';
import { RouterService } from './services/router/router.service';
import { interval } from 'rxjs';
import { DataStorageService } from '../lib/services/data-storage/data-storage.service';
import { PointerService } from './services/pointer/pointer.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GlobalErrorHandler } from './services/error-handler/errorHandler.service';
import { CookieService } from 'ngx-cookie-service';
import { KeyStrokeDirective } from './directives/key-stroke/key-stroke.directive';
export class NgS3AnalyticsModule {
    /**
     * @param {?} routerService
     * @param {?} dataStorage
     * @param {?} pointerService
     * @param {?} errorhandler
     */
    constructor(routerService, dataStorage, pointerService, errorhandler) {
        this.routerService = routerService;
        this.dataStorage = dataStorage;
        this.pointerService = pointerService;
        this.errorhandler = errorhandler;
        window.addEventListener('beforeunload', (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.dataStorage.pushDataArrayToS3();
        }));
        interval(1000 * 2).subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.dataStorage.pushDataArrayToS3();
        }));
        this.pointerService.trackMouseMoveEvent();
        this.routerService.trackRouterEvents();
        this.errorhandler.trackConsoleErrors();
    }
    // Configuring the initial setup for s3 bucket and page loading
    /**
     * @param {?} configuration
     * @param {?=} isPageLoadingToBeDetected
     * @return {?}
     */
    static forRoot(configuration, isPageLoadingToBeDetected = false) {
        this.environmentService.setConfigurationToEnvironment(configuration, isPageLoadingToBeDetected);
        // Assigning the configuration to environment variables
    }
}
NgS3AnalyticsModule.environmentService = new EnvironmentService();
NgS3AnalyticsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    HttpClientModule
                ],
                declarations: [
                    NgS3AnalyticsComponent,
                    ButtonDirective,
                    ScrollDirective,
                    ButtonHoverDirective,
                    KeyStrokeDirective
                ],
                providers: [
                    DataStorageService,
                    EnvironmentService,
                    PointerService,
                    CookieService,
                    GlobalErrorHandler
                ],
                exports: [
                    NgS3AnalyticsComponent,
                    ButtonDirective,
                    ScrollDirective,
                    ButtonHoverDirective,
                    KeyStrokeDirective
                ]
            },] },
];
NgS3AnalyticsModule.ctorParameters = () => [
    { type: RouterService },
    { type: DataStorageService },
    { type: PointerService },
    { type: GlobalErrorHandler }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgS3AnalyticsModule.environmentService;
    /**
     * @type {?}
     * @private
     */
    NgS3AnalyticsModule.prototype.routerService;
    /**
     * @type {?}
     * @private
     */
    NgS3AnalyticsModule.prototype.dataStorage;
    /**
     * @type {?}
     * @private
     */
    NgS3AnalyticsModule.prototype.pointerService;
    /**
     * @type {?}
     * @private
     */
    NgS3AnalyticsModule.prototype.errorhandler;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctczMtYW5hbHl0aWNzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy8iLCJzb3VyY2VzIjpbImxpYi9uZy1zMy1hbmFseXRpY3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXJFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDeEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDdkYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUNuRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUE2QmxGLE1BQU07Ozs7Ozs7SUFJSixZQUFvQixhQUE0QixFQUN0QyxXQUErQixFQUMvQixjQUE4QixFQUM5QixZQUFnQztRQUh0QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUN0QyxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGlCQUFZLEdBQVosWUFBWSxDQUFvQjtRQUN4QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsY0FBYzs7OztRQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUMsRUFBQyxDQUFDO1FBQ0gsUUFBUSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDekMsQ0FBQzs7Ozs7OztJQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBNEIsRUFBRSw0QkFBcUMsS0FBSztRQUNyRixJQUFJLENBQUMsa0JBQWtCLENBQUMsNkJBQTZCLENBQUMsYUFBYSxFQUFFLHlCQUF5QixDQUFDLENBQUM7UUFDaEcsdURBQXVEO0lBQ3pELENBQUM7O0FBcEJjLHNDQUFrQixHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQzs7WUE3QjlELFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixnQkFBZ0I7aUJBQ2pCO2dCQUNELFlBQVksRUFBRTtvQkFDWixzQkFBc0I7b0JBQ3RCLGVBQWU7b0JBQ2YsZUFBZTtvQkFDZixvQkFBb0I7b0JBQ3BCLGtCQUFrQjtpQkFDbkI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULGtCQUFrQjtvQkFDbEIsa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLGFBQWE7b0JBQ2Isa0JBQWtCO2lCQUNuQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asc0JBQXNCO29CQUN0QixlQUFlO29CQUNmLGVBQWU7b0JBQ2Ysb0JBQW9CO29CQUNwQixrQkFBa0I7aUJBQ25CO2FBQ0Y7OztZQXBDUSxhQUFhO1lBRWIsa0JBQWtCO1lBQ2xCLGNBQWM7WUFHZCxrQkFBa0I7Ozs7Ozs7SUFpQ3pCLHVDQUE2RDs7Ozs7SUFFakQsNENBQW9DOzs7OztJQUM5QywwQ0FBdUM7Ozs7O0lBQ3ZDLDZDQUFzQzs7Ozs7SUFDdEMsMkNBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUzNBbmFseXRpY3NDb21wb25lbnQgfSBmcm9tICcuL25nLXMzLWFuYWx5dGljcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgQnV0dG9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2J1dHRvbi9idXR0b24uZGlyZWN0aXZlJztcbmltcG9ydCB7IFNjcm9sbERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCdXR0b25Ib3ZlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9idXR0b24taG92ZXIvYnV0dG9uLWhvdmVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBFbnZpcm9ubWVudFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgUm91dGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlJztcbmltcG9ydCB7IGludGVydmFsIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9saWIvc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IFBvaW50ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9wb2ludGVyL3BvaW50ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEdsb2JhbEVycm9ySGFuZGxlciB9IGZyb20gJy4vc2VydmljZXMvZXJyb3ItaGFuZGxlci9lcnJvckhhbmRsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcbmltcG9ydCB7IEtleVN0cm9rZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9rZXktc3Ryb2tlL2tleS1zdHJva2UuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5nUzNBbmFseXRpY3NDb21wb25lbnQsXG4gICAgQnV0dG9uRGlyZWN0aXZlLFxuICAgIFNjcm9sbERpcmVjdGl2ZSxcbiAgICBCdXR0b25Ib3ZlckRpcmVjdGl2ZSxcbiAgICBLZXlTdHJva2VEaXJlY3RpdmVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgIEVudmlyb25tZW50U2VydmljZSxcbiAgICBQb2ludGVyU2VydmljZSxcbiAgICBDb29raWVTZXJ2aWNlLFxuICAgIEdsb2JhbEVycm9ySGFuZGxlclxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTmdTM0FuYWx5dGljc0NvbXBvbmVudCxcbiAgICBCdXR0b25EaXJlY3RpdmUsXG4gICAgU2Nyb2xsRGlyZWN0aXZlLFxuICAgIEJ1dHRvbkhvdmVyRGlyZWN0aXZlLFxuICAgIEtleVN0cm9rZURpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NNb2R1bGUge1xuXG4gIHByaXZhdGUgc3RhdGljIGVudmlyb25tZW50U2VydmljZSA9IG5ldyBFbnZpcm9ubWVudFNlcnZpY2UoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlclNlcnZpY2U6IFJvdXRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgcG9pbnRlclNlcnZpY2U6IFBvaW50ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgZXJyb3JoYW5kbGVyOiBHbG9iYWxFcnJvckhhbmRsZXIpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKGUpID0+IHtcbiAgICAgIHRoaXMuZGF0YVN0b3JhZ2UucHVzaERhdGFBcnJheVRvUzMoKTtcbiAgICB9KTtcbiAgICBpbnRlcnZhbCgxMDAwICogMikuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5kYXRhU3RvcmFnZS5wdXNoRGF0YUFycmF5VG9TMygpO1xuICAgIH0pO1xuICAgIHRoaXMucG9pbnRlclNlcnZpY2UudHJhY2tNb3VzZU1vdmVFdmVudCgpO1xuICAgIHRoaXMucm91dGVyU2VydmljZS50cmFja1JvdXRlckV2ZW50cygpO1xuICAgIHRoaXMuZXJyb3JoYW5kbGVyLnRyYWNrQ29uc29sZUVycm9ycygpO1xuICB9XG4gIC8vIENvbmZpZ3VyaW5nIHRoZSBpbml0aWFsIHNldHVwIGZvciBzMyBidWNrZXQgYW5kIHBhZ2UgbG9hZGluZ1xuICBzdGF0aWMgZm9yUm9vdChjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICB0aGlzLmVudmlyb25tZW50U2VydmljZS5zZXRDb25maWd1cmF0aW9uVG9FbnZpcm9ubWVudChjb25maWd1cmF0aW9uLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkKTtcbiAgICAvLyBBc3NpZ25pbmcgdGhlIGNvbmZpZ3VyYXRpb24gdG8gZW52aXJvbm1lbnQgdmFyaWFibGVzXG4gIH1cbn1cbiJdfQ==