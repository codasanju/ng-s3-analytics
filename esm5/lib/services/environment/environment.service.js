/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import * as i0 from "@angular/core";
var EnvironmentService = /** @class */ (function () {
    function EnvironmentService() {
    }
    // Sets Whether the user is authenticated or not
    // Sets Whether the user is authenticated or not
    /**
     * @param {?} isAuth
     * @return {?}
     */
    EnvironmentService.prototype.setAuthentication = 
    // Sets Whether the user is authenticated or not
    /**
     * @param {?} isAuth
     * @return {?}
     */
    function (isAuth) {
        environment.isAuth = isAuth;
    };
    // Setting credentials on environment
    // Setting credentials on environment
    /**
     * @param {?} credentials
     * @param {?} isPageLoadingToBeDetected
     * @return {?}
     */
    EnvironmentService.prototype.setCredentialsToEnvironment = 
    // Setting credentials on environment
    /**
     * @param {?} credentials
     * @param {?} isPageLoadingToBeDetected
     * @return {?}
     */
    function (credentials, isPageLoadingToBeDetected) {
        environment.accessKeyId = credentials.accessKeyId;
        environment.fileName = credentials.fileName;
        environment.secretAccessKey = credentials.secretAccessKey;
        environment.sessionToken = credentials.sessionToken;
        environment.region = credentials.region;
        environment.isPageLoadingToBeDetected = isPageLoadingToBeDetected;
        if (credentials.bucketName.authenticatedBucket !== '' && credentials.bucketName.publicBucket !== '') {
            environment.bucketName = {
                authenticatedBucket: credentials.bucketName.authenticatedBucket,
                publicBucket: credentials.bucketName.publicBucket,
                screenshotBucket: credentials.bucketName.screenshotBucket
            };
        }
        else {
            /** @type {?} */
            var bucketName = (credentials.bucketName.authenticatedBucket === '') ? credentials.bucketName.publicBucket :
                credentials.bucketName.authenticatedBucket;
            environment.bucketName = {
                authenticatedBucket: bucketName,
                publicBucket: bucketName,
                screenshotBucket: credentials.bucketName.screenshotBucket
            };
        }
    };
    EnvironmentService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */ EnvironmentService.ngInjectableDef = i0.defineInjectable({ factory: function EnvironmentService_Factory() { return new EnvironmentService(); }, token: EnvironmentService, providedIn: "root" });
    return EnvironmentService;
}());
export { EnvironmentService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7QUFHNUQ7SUFBQTtLQW1DQztJQTdCQyxnREFBZ0Q7Ozs7OztJQUNoRCw4Q0FBaUI7Ozs7OztJQUFqQixVQUFrQixNQUFlO1FBQy9CLFdBQVcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQzlCLENBQUM7SUFFRCxxQ0FBcUM7Ozs7Ozs7SUFDckMsd0RBQTJCOzs7Ozs7O0lBQTNCLFVBQTRCLFdBQTRCLEVBQUUseUJBQWtDO1FBQzFGLFdBQVcsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUNsRCxXQUFXLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFDNUMsV0FBVyxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUMsZUFBZSxDQUFDO1FBQzFELFdBQVcsQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQztRQUNwRCxXQUFXLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDeEMsV0FBVyxDQUFDLHlCQUF5QixHQUFHLHlCQUF5QixDQUFDO1FBQ2xFLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsS0FBSyxFQUFFLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEtBQUssRUFBRSxFQUFFO1lBQ25HLFdBQVcsQ0FBQyxVQUFVLEdBQUc7Z0JBQ3ZCLG1CQUFtQixFQUFFLFdBQVcsQ0FBQyxVQUFVLENBQUMsbUJBQW1CO2dCQUMvRCxZQUFZLEVBQUUsV0FBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZO2dCQUNqRCxnQkFBZ0IsRUFBRSxXQUFXLENBQUMsVUFBVSxDQUFDLGdCQUFnQjthQUMxRCxDQUFDO1NBQ0g7YUFBTTs7Z0JBQ0MsVUFBVSxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDNUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUI7WUFDNUMsV0FBVyxDQUFDLFVBQVUsR0FBRztnQkFDdkIsbUJBQW1CLEVBQUUsVUFBVTtnQkFDL0IsWUFBWSxFQUFFLFVBQVU7Z0JBQ3hCLGdCQUFnQixFQUFFLFdBQVcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCO2FBQzFELENBQUM7U0FDSDtJQUNILENBQUM7O2dCQWxDRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7NkJBUEQ7Q0F3Q0MsQUFuQ0QsSUFtQ0M7U0EvQlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50JztcbmltcG9ydCB7IENyZWRlbnRpYWxzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5cbmV4cG9ydCBjbGFzcyBFbnZpcm9ubWVudFNlcnZpY2Uge1xuXG4gIC8vIFNldHMgV2hldGhlciB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkIG9yIG5vdFxuICBzZXRBdXRoZW50aWNhdGlvbihpc0F1dGg6IGJvb2xlYW4pIHtcbiAgICBlbnZpcm9ubWVudC5pc0F1dGggPSBpc0F1dGg7XG4gIH1cblxuICAvLyBTZXR0aW5nIGNyZWRlbnRpYWxzIG9uIGVudmlyb25tZW50XG4gIHNldENyZWRlbnRpYWxzVG9FbnZpcm9ubWVudChjcmVkZW50aWFsczogQ3JlZGVudGlhbHNCZWFuLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkOiBib29sZWFuKSB7XG4gICAgZW52aXJvbm1lbnQuYWNjZXNzS2V5SWQgPSBjcmVkZW50aWFscy5hY2Nlc3NLZXlJZDtcbiAgICBlbnZpcm9ubWVudC5maWxlTmFtZSA9IGNyZWRlbnRpYWxzLmZpbGVOYW1lO1xuICAgIGVudmlyb25tZW50LnNlY3JldEFjY2Vzc0tleSA9IGNyZWRlbnRpYWxzLnNlY3JldEFjY2Vzc0tleTtcbiAgICBlbnZpcm9ubWVudC5zZXNzaW9uVG9rZW4gPSBjcmVkZW50aWFscy5zZXNzaW9uVG9rZW47XG4gICAgZW52aXJvbm1lbnQucmVnaW9uID0gY3JlZGVudGlhbHMucmVnaW9uO1xuICAgIGVudmlyb25tZW50LmlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQgPSBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkO1xuICAgIGlmIChjcmVkZW50aWFscy5idWNrZXROYW1lLmF1dGhlbnRpY2F0ZWRCdWNrZXQgIT09ICcnICYmIGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUucHVibGljQnVja2V0ICE9PSAnJykge1xuICAgICAgZW52aXJvbm1lbnQuYnVja2V0TmFtZSA9IHtcbiAgICAgICAgYXV0aGVudGljYXRlZEJ1Y2tldDogY3JlZGVudGlhbHMuYnVja2V0TmFtZS5hdXRoZW50aWNhdGVkQnVja2V0LFxuICAgICAgICBwdWJsaWNCdWNrZXQ6IGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUucHVibGljQnVja2V0LFxuICAgICAgICBzY3JlZW5zaG90QnVja2V0OiBjcmVkZW50aWFscy5idWNrZXROYW1lLnNjcmVlbnNob3RCdWNrZXRcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGJ1Y2tldE5hbWUgPSAoY3JlZGVudGlhbHMuYnVja2V0TmFtZS5hdXRoZW50aWNhdGVkQnVja2V0ID09PSAnJykgPyBjcmVkZW50aWFscy5idWNrZXROYW1lLnB1YmxpY0J1Y2tldCA6XG4gICAgICAgIGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUuYXV0aGVudGljYXRlZEJ1Y2tldDtcbiAgICAgIGVudmlyb25tZW50LmJ1Y2tldE5hbWUgPSB7XG4gICAgICAgIGF1dGhlbnRpY2F0ZWRCdWNrZXQ6IGJ1Y2tldE5hbWUsXG4gICAgICAgIHB1YmxpY0J1Y2tldDogYnVja2V0TmFtZSxcbiAgICAgICAgc2NyZWVuc2hvdEJ1Y2tldDogY3JlZGVudGlhbHMuYnVja2V0TmFtZS5zY3JlZW5zaG90QnVja2V0XG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuIl19