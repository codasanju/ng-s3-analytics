export declare class CredentialsBean {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
    bucketName: {
        authenticatedBucket: string;
        publicBucket: string;
        screenshotBucket: string;
    };
    fileName: string;
    region: string;
}
/**
 * Analytics Object Structure
 */
export interface AnalyticsBean {
    eventLabel: string;
    eventComponent: string;
    browser: string;
    fullURL: string;
    resolution: string;
    xCoord: string;
    yCoord: string;
    pageXCoord: string;
    pageYCoord: string;
    eventTime: any;
    screenshot: string;
    additionalInfo: string;
    utm: string;
    demographicInfo: string;
    htmlElement: any;
}
