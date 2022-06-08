import Vue from "vue";
import Axios from "axios";

// Live server: http://hapi.fhir.org/baseR4/
// Local server: http://localhost:8080/fhir/
const baseServer = {
  online: "http://hapi.fhir.org/baseR4/",
  local: "http://localhost:8080/fhir/",
};

Vue.prototype.$axios = Axios.create({ baseURL: baseServer["local"] });
