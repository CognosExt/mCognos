// Import Vue
import Vue from 'vue';

// Import F7
import Framework7 from 'framework7';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue';

// Import F7 iOS Theme Styles
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css';
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css';
/* OR for Material Theme:
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
*/

// Import App Custom Styles
import AppStyles from './css/app.css';

// Import Routes
import Routes from './routes.js';

// Import App Component
import App from './app';

//import store from './store/folderStore'
import store from './store';

//import VueNotifications from 'vue-notifications';
//import VueToasted from 'vue-toasted';
import Grid from 'vue-js-grid';
import VueGoodTable from 'vue-good-table';
import VueCordova from 'vue-cordova';
import Notifications from 'vue-notification';

// Include mini-toaster (or any other UI-notification library)
//import miniToastr from 'mini-toastr';

Vue.use(VueCordova);
Vue.use(Grid);
Vue.use(VueGoodTable);
Vue.use(Notifications);

require('Framework7-Upscroller-Plugin');

console.log('Starting Vue Application');

/*const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
};*/

//miniToastr.init({ types: toastTypes });

/*
  * Setting up notifications
  */

//function toast({ title, message, type, timeout, cb }) {
/*
  if (type === VueNotifications.types.warn) type = 'show';
  return Vue.toasted[type](message, { duration: timeout });*/
//  return miniToastr[type](message, title, timeout, cb);
//}
//const options = {
//  success: toast,
//  error: toast,
//  info: toast,
//  warn: toast
//};
//Vue.use(VueToasted);
//Vue.use(VueNotifications, options);

// Init F7 Vue Plugin
Vue.use(Framework7Vue);

// We delay the loading slightly because the browser still needs to load cordova.js
var delay = 1000; //Your delay in milliseconds

setTimeout(function() {
  //window.location = "home.html";

  // Init App
  new Vue({
    el: '#app',
    store,
    template: '<app/>',
    // Init Framework7 by passing parameters here
    framework7: {
      root: '#app',
      /* Uncomment to enable Material theme: */
      // material: true,
      routes: Routes,
      upscroller: {
        text: 'Scroll Up',
        ignorePages: ['about'] // defaults to []
      }
    },
    // Register App Component
    components: {
      app: App
    }
  });
}, delay);
