import { Router } from '@angular/router';
import { AnalyticsService } from '../analytics/analytics.service';
import { DataStorageService } from '../data-storage/data-storage.service';
import { AnalyticsBean } from '../../analytics-bean/analytics-bean';
export declare class RouterService {
    private routes;
    private analyticsService;
    private dataStorage;
    private document;
    analyticsData: AnalyticsBean;
    constructor(routes: Router, analyticsService: AnalyticsService, dataStorage: DataStorageService, document: any);
    /**
     * Tracking router events
     */
    trackRouterEvents(): void;
    /**
     * Pushing analytics data
     * @param event - Router Event
     */
    analyticsPushData(event: any): void;
    /**
     * Capturing Screenshot of the page
     * @param screenshotName uploaded screenshot name
     *
    public captureScreenshot(screenshotName: string): void {
      console.log('called');
      html2canvas(document.body, {
        logging: true,
        allowTaint: true,
        width: document.body.clientWidth,
        height: document.body.scrollHeight || window.innerHeight
      }).then((canvas) => {
        // this.analyticsService.saveScreenshotsInS3(canvas.toDataURL(), screenshotName);
        console.log('image uploading...');
      }).catch(error => {
        console.log('error', error);
      });
    }
    */
    /**
     * Waiting for page to load completely
     * @param event
     */
    waitTillPageLoad(screenshotName: string): void;
    /**
     * Capture template of loaded view
     * @param screenshotName - Screenshot image
     */
    captureTemplate(screenshotName: string): void;
    processRegexOperations(text: string): string;
}
