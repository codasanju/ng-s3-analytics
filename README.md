<a>
  <h1 align="center">ng-s3-analytics</h1>
</a>

<p align="center">
In-house analytics for enterprise level applications using Angular 6+, AWS S3 & AWS Athena
</p>

## Table of Contents
1. [Getting Started](#getting-started)
2. [Usage](#usage)
3. [Custom Events](#customEvents)
4. [Contribution](#contribution)
5. [License](#license)

<a name="getting-started"></a>

## Getting Started

Tracking events is important. 
Knowing which section of the application the user visits frequently is extremely important. 
This plugin captures each and every action the user performs on the application like - button click, scroll, hover and page visit, console errors & key stroke. 
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
     NgS3AnalyticsModule.forRoot(configuration: Configuration, pageDetection: Boolean)
]
```
The forRoot method accepts two parameters -  configurations (data collection api url & IP range to be restricted, it can have regex eg:- /192.168.143.*/g ) and a boolean which defines whether to track page load or not

Configuration Bean Structure

```TS
configuration: {
  dataCollectionApi: string,
  remoteConfigApi: string
}
```
The configuration are stored in environment of analytics library. These configuration are used to push tracked data onto S3 bucket

### Step 2

This library can be used as plugin to track `page load` , `button click` , `scroll`, `hover`, `mouse move`, `console errors` & `key strokes` events on the page.
Every event has custom data that is structured as a bean.


In the html, add the directive along with the data required in the tag to be tracked.

```html
<button type="button" [track-buttonHover]='additionalInfoToBeTracked'
[track-btn]='additionalInfoToBeTracked'>Logout</button>
```
Additional info can be any JSON object that to be tracked

The available directives are:<br>
Button Clicked : `track-btn`,<br>
Hover : `track-buttonHover`,<br>
Scroll : `track-scroll`,<br>
Key Stroke : `track-keyStroke`


### Step 3

You can also separately inject an environment service in order to configure the configuration.

```typescript
import { EnvironmentService } from '@codaglobal/ng-s3-analytics';

constructor(private environmentService: EnvironmentService) { }

export class TestComponent {

  configuration: Configuration;
  isPageLoadingToBeDetected: boolean;

  exampleMethod() {
    this.environmentService.setConfigurationToEnvironment(configuration, isPageLoadingToBeDetected);
  }
}

```


<a name="customEvents"></a>
## Custom Events

User will be able to trigger custom events from their typescript/js by using the custom event service class. Here make sure that, the data type being passed is already configured in your additional info schema

```typescript
import { CustomEventService } from '@codaglobal/ng-s3-analytics';

constructor(private customEventService: CustomEventService) { }

export class TestComponent {


  triggerMyEvent() {
    this.customEventService.pushEvent('MY_EVENT_LABEL', 'My data');
  }
}

```


<a name="contribution"></a>

## Contribution

Are very welcome! And remember, contribution is not only PRs and code, but any help with docs or helping other developers to solve issues are very appreciated! Thanks in advance!


<a name="license"></a>

### License

MIT

