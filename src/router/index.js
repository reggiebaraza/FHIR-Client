import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import LandingPage from "../pages/landing";
import AddPatientPage from "../pages/add-patient";
import SearchPage from "../pages/search";
import AllPatientsPage from "../pages/all-patients";
import SearchPatientPage from "../pages/results";
import ViewPatientPage from "../pages/view-patient";

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: LandingPage,
    },
    {
      path: "/add-patient",
      component: AddPatientPage,
    },
    {
      path: "/search",
      component: SearchPage,
    },
    {
      path: "/patients",
      component: AllPatientsPage,
    },
    {
      path: "/results/:searchTerm",
      component: SearchPatientPage,
    },
    {
      path: "/patient/:patientId",
      component: ViewPatientPage,
    },
  ],
});

export default router;
