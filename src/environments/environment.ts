// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  confirm: {
    name: '',
    password: ''
  },
  // APIEndpoint: '{API_ENDPOINT}'
  backendApiPlanUrl: 'https://api.travel-plan-manager.com/myPlan/travelPlan',
  // 'http://18.234.87.155:9527/myPlan/travelPlan',
  // 'http://localhost:9527/myPlan/travelPlan',
  // '${BACKEND_API_PLAN}',
  backendApiSearchUrl: 'https://api.travel-plan-manager.com/mySearch/elastic/pageByParam?pageSize=5&startPage=1'
  // '${BACKEND_API_SEARCH}'
  // apiBaseUrl: 'API_BASE_URL',
  // version: 'v${require("../package.json").version}'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
