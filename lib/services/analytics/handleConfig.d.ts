import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PluginConfig, AnalyticsBean } from '../../analytics-bean/analytics-bean';
import { Constants } from '../../types/event.types';
import { CookieService } from 'ngx-cookie-service';
export declare class PluginConfigService {
    private httpClient;
    private injector;
    private cookieService;
    remotePluginConfig: PluginConfig;
    demographicInfo: any;
    /** Constants */
    constants: typeof Constants;
    constructor(httpClient: HttpClient, injector: Injector, cookieService: CookieService);
    getEnvironmentConfig(): void;
    fetchRemoteConfig(): void;
    handleConfiguration(analyticsBean: AnalyticsBean): boolean;
    checkDisableTracking(): boolean;
    checkDomain(fullUrl: string): boolean;
    removeCheckUrls(trackedObjects: Array<AnalyticsBean>): Array<AnalyticsBean>;
    /**
   * IP range restriction added
   * @restrictIPRange is a regex
   * if @restrictIPRange is match with current IP,
   * the analytics data will be restricted
   */
    private checkIpRange;
    /**
  * Set user demographic information in cookies
  */
    getIp(): Promise<any>;
    setDemographicInfo(): any;
    getDemographicInfo(): any;
    checkShowConsent(content: string): void;
}
