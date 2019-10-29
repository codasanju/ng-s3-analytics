/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import * as i0 from "@angular/core";
export class EnvironmentService {
    // Sets Whether the user is authenticated or not
    /**
     * @param {?} isAuth
     * @return {?}
     */
    setAuthentication(isAuth) {
        environment.isAuth = isAuth;
    }
    // Setting credentials on environment
    /**
     * @param {?} credentials
     * @param {?} isPageLoadingToBeDetected
     * @return {?}
     */
    setCredentialsToEnvironment(credentials, isPageLoadingToBeDetected) {
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
            const bucketName = (credentials.bucketName.authenticatedBucket === '') ? credentials.bucketName.publicBucket :
                credentials.bucketName.authenticatedBucket;
            environment.bucketName = {
                authenticatedBucket: bucketName,
                publicBucket: bucketName,
                screenshotBucket: credentials.bucketName.screenshotBucket
            };
        }
    }
}
EnvironmentService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */ EnvironmentService.ngInjectableDef = i0.defineInjectable({ factory: function EnvironmentService_Factory() { return new EnvironmentService(); }, token: EnvironmentService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7QUFPNUQsTUFBTTs7Ozs7O0lBR0osaUJBQWlCLENBQUMsTUFBZTtRQUMvQixXQUFXLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUM5QixDQUFDOzs7Ozs7O0lBR0QsMkJBQTJCLENBQUMsV0FBNEIsRUFBRSx5QkFBa0M7UUFDMUYsV0FBVyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBQ2xELFdBQVcsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUM1QyxXQUFXLENBQUMsZUFBZSxHQUFHLFdBQVcsQ0FBQyxlQUFlLENBQUM7UUFDMUQsV0FBVyxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDO1FBQ3BELFdBQVcsQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUN4QyxXQUFXLENBQUMseUJBQXlCLEdBQUcseUJBQXlCLENBQUM7UUFDbEUsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLG1CQUFtQixLQUFLLEVBQUUsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksS0FBSyxFQUFFLEVBQUU7WUFDbkcsV0FBVyxDQUFDLFVBQVUsR0FBRztnQkFDdkIsbUJBQW1CLEVBQUUsV0FBVyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUI7Z0JBQy9ELFlBQVksRUFBRSxXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVk7Z0JBQ2pELGdCQUFnQixFQUFFLFdBQVcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCO2FBQzFELENBQUM7U0FDSDthQUFNOztrQkFDQyxVQUFVLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLG1CQUFtQixLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUM1RyxXQUFXLENBQUMsVUFBVSxDQUFDLG1CQUFtQjtZQUM1QyxXQUFXLENBQUMsVUFBVSxHQUFHO2dCQUN2QixtQkFBbUIsRUFBRSxVQUFVO2dCQUMvQixZQUFZLEVBQUUsVUFBVTtnQkFDeEIsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0I7YUFDMUQsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7O1lBbENGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBDcmVkZW50aWFsc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuXG5leHBvcnQgY2xhc3MgRW52aXJvbm1lbnRTZXJ2aWNlIHtcblxuICAvLyBTZXRzIFdoZXRoZXIgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZCBvciBub3RcbiAgc2V0QXV0aGVudGljYXRpb24oaXNBdXRoOiBib29sZWFuKSB7XG4gICAgZW52aXJvbm1lbnQuaXNBdXRoID0gaXNBdXRoO1xuICB9XG5cbiAgLy8gU2V0dGluZyBjcmVkZW50aWFscyBvbiBlbnZpcm9ubWVudFxuICBzZXRDcmVkZW50aWFsc1RvRW52aXJvbm1lbnQoY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzQmVhbiwgaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDogYm9vbGVhbikge1xuICAgIGVudmlyb25tZW50LmFjY2Vzc0tleUlkID0gY3JlZGVudGlhbHMuYWNjZXNzS2V5SWQ7XG4gICAgZW52aXJvbm1lbnQuZmlsZU5hbWUgPSBjcmVkZW50aWFscy5maWxlTmFtZTtcbiAgICBlbnZpcm9ubWVudC5zZWNyZXRBY2Nlc3NLZXkgPSBjcmVkZW50aWFscy5zZWNyZXRBY2Nlc3NLZXk7XG4gICAgZW52aXJvbm1lbnQuc2Vzc2lvblRva2VuID0gY3JlZGVudGlhbHMuc2Vzc2lvblRva2VuO1xuICAgIGVudmlyb25tZW50LnJlZ2lvbiA9IGNyZWRlbnRpYWxzLnJlZ2lvbjtcbiAgICBlbnZpcm9ubWVudC5pc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkID0gaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDtcbiAgICBpZiAoY3JlZGVudGlhbHMuYnVja2V0TmFtZS5hdXRoZW50aWNhdGVkQnVja2V0ICE9PSAnJyAmJiBjcmVkZW50aWFscy5idWNrZXROYW1lLnB1YmxpY0J1Y2tldCAhPT0gJycpIHtcbiAgICAgIGVudmlyb25tZW50LmJ1Y2tldE5hbWUgPSB7XG4gICAgICAgIGF1dGhlbnRpY2F0ZWRCdWNrZXQ6IGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUuYXV0aGVudGljYXRlZEJ1Y2tldCxcbiAgICAgICAgcHVibGljQnVja2V0OiBjcmVkZW50aWFscy5idWNrZXROYW1lLnB1YmxpY0J1Y2tldCxcbiAgICAgICAgc2NyZWVuc2hvdEJ1Y2tldDogY3JlZGVudGlhbHMuYnVja2V0TmFtZS5zY3JlZW5zaG90QnVja2V0XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBidWNrZXROYW1lID0gKGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUuYXV0aGVudGljYXRlZEJ1Y2tldCA9PT0gJycpID8gY3JlZGVudGlhbHMuYnVja2V0TmFtZS5wdWJsaWNCdWNrZXQgOlxuICAgICAgICBjcmVkZW50aWFscy5idWNrZXROYW1lLmF1dGhlbnRpY2F0ZWRCdWNrZXQ7XG4gICAgICBlbnZpcm9ubWVudC5idWNrZXROYW1lID0ge1xuICAgICAgICBhdXRoZW50aWNhdGVkQnVja2V0OiBidWNrZXROYW1lLFxuICAgICAgICBwdWJsaWNCdWNrZXQ6IGJ1Y2tldE5hbWUsXG4gICAgICAgIHNjcmVlbnNob3RCdWNrZXQ6IGNyZWRlbnRpYWxzLmJ1Y2tldE5hbWUuc2NyZWVuc2hvdEJ1Y2tldFxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==