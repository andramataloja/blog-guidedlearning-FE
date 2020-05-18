// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { DBConfig } from 'ngx-indexed-db';

export const environment = {
  production: false,
};

export const dbConfig: DBConfig = {
  name: 'BlogDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'posts',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'title', keypath: 'title', options: { unique: false } },
        { name: 'content', keypath: 'content', options: { unique: false } },
        { name: 'created', keypath: 'created', options: { unique: false } },
      ],
    },
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
