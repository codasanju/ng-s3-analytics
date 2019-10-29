<a>
  <h1 align="center">ng-s3-analytics</h1>
</a>

<p align="center">
In-house analytics for enterprise level applications using Angular 6+, AWS S3 & AWS Athena
</p>

## Table of Contents
1. [Getting Started](#getting-started)
2. [Usage](#usage)
3. [Contribution](#contribution)
4. [License](#license)

<a name="getting-started"></a>

## Getting Started

Tracking events is important. 
Knowing which section of the application the user visits frequently is extremely important. 
This plugin captures each and every action the user performs on the application like - button click, scroll, hover and page visit. 
Analytics are saved in S3 bucket for further analysis.

<a name="usage"></a>

## Usage
### Step 0
Install `ng-s3-analytics` from `npm`
```bash
npm install --save ng-s3-analytics
```
### Step 1

 To use the library, import the library in  `app.module.ts`.

```typescript
import { NgS3AnalyticsModule } from '@codaglobal/ng-s3-analytics';

imports: [
     NgS3AnalyticsModule.forRoot(credentials: CredentialsBean, pageDetection: Boolean)
]
```
The forRoot method accepts two parameters -  credentials (S3 bucket and other information) and a boolean which defines whether to track page load or not

Credential Bean Structure

```TS
credential: {
  accessKeyId: string, // IAM user access Id
  secretAccessKey: string, // IAM user  secret key
  sessionToken: string, // optional
  bucketName: {
    authenticatedBucket: string, // optional
    publicBucket: string
  },
  fileName: string, // file name to be saved in S3
  region: string // S3 bucket region
}
```
The credentials are stored in environment of analytics library. These credentials are used to push tracked data onto S3 bucket

### Step 2

AWS-sdk plugin is used in this library to push the data into S3 bucket. Installation command for aws-sdk is below

```bash
npm install --save aws-sdk
```

In the polyfills TS file,

```typescript
(window as any).global = window;
```
This makes the AWS sdk files global.

If any error occurs like `Cannot find module 'stream'`. Run the below command

```bash
npm install @types/node
```
### Step 3

This library can be used as plugin to track `page load` , `button click` , `scroll` and `hover` events on the page.
Every event has custom data that is structured as a bean.

```typescript
AnalyticsBean: {
  pageUrl: string, // window url
  redirectedTo: string, // if the button click triggers any redirection
  componentName: string, // in which component the button belongs
  id: string, // to uniquely identified the element
  placement: string // to identify where the button belongs in html, (eg:- Header)
  // additional data ...
}
```

In the html, add the directive along with the data required in the tag to be tracked.

```html
<button type="button" [track-buttonHover]='onClickButton' [track-btn]='onClickButton'>Logout</button>
```
In the TS file,

```typescript
onClickButton: AnalyticsBean = {
    pageUrl: "",
    redirectedTo: "",
    componentName: "",
    id: "",
    placement: ""
    // additional data ...
};
```
The available directives are:
Button Clicked : `track-btn`,
Hover : `track-buttonHover`,
Scroll : `track-scroll`

### Step 4 

You can also separately inject an environment service in order to configure the credentials and authentication state

```typescript
import { EnvironmentService } from '@codaglobal/ng-s3-analytics';

constructor(private environmentService: EnvironmentService) { }

export class TestComponent {

  credentials: CredentialsBean;
  isPageLoadingToBeDetected: Boolean;

  exampleMethod() {
    this.environmentService.setCredentialsToEnvironment(credentials, isPageLoadingToBeDetected);
  }
}

```
```typescript
import { EnvironmentService } from '@codaglobal/ng-s3-analytics';

constructor(private environmentService: EnvironmentService) { }

export class TestComponent {

  isAuth: Boolean;

  exampleMethod() {
    this.environmentService.setAuthentication(isAuth);
  }
}
```


<a name="contribution"></a>

## Contribution

Are very welcome! And remember, contribution is not only PRs and code, but any help with docs or helping other developers to solve issues are very appreciated! Thanks in advance!


<a name="license"></a>

### License

MIT

