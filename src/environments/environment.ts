// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  firebaseConfig :{
    apiKey: "AIzaSyBvjeGded-q_KgnEwhMfA4leKVzSPpTVXo",
    authDomain: "social-web-5068e.firebaseapp.com",
    databaseUrl: "https://social-web-5068e-default-rtdb.firebaseio.com/",
    projectId: "social-web-5068e",
    storageBucket: "social-web-5068e.appspot.com",
    messagingSenderId: "646383888939",
    appId: "1:646383888939:web:5ec5d57450390d0e5d986e",
    measurementId: "G-3HTS1B1GSK"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
