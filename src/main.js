import Vue from "vue";
import App from "./App.vue";
import router from "./router";

require("./axios");
import calculateAge from "./filters/calculate-age";
import getPhone from "./filters/get-phone";
import getAddress from "./filters/get-address";
import getName from "./filters/get-name";
import getObservationFromCondition from "./filters/get-observation-from-condition";
import formatDate from "./filters/fomart-date";

import NavbarComponent from "./components/navbar.vue";

Vue.config.productionTip = false;
Vue.component("fhir-navbar", NavbarComponent);
Vue.filter("calculateAge", calculateAge);
Vue.filter("getPhone", getPhone);
Vue.filter("getAddress", getAddress);
Vue.filter("getName", getName);
Vue.filter("formatDate", formatDate);
Vue.filter("getObservationFromCondition", getObservationFromCondition);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
