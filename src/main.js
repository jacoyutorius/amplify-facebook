import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Amplify, * as AmplifyModules from "aws-amplify";
import {
  AmplifyPlugin
} from "aws-amplify-vue";
import awsconfig from "./aws-exports";
import store from "./store";
Amplify.configure(awsconfig);

Vue.config.productionTip = false;

require('./assets/sass/main.scss');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");