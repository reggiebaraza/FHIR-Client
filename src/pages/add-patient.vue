<template>
  <div class="container-fluid">
    <fhir-navbar></fhir-navbar>
    <div class="row half-height">
      <div class="col-6 d-flex align-items-center justify-content-center">
        <img
          v-if="!isDevMode"
          src="@/assets/blue_logo.png"
          class="w-100"
          alt="logo"
        />
        <textarea
          v-else
          v-text="patientResource"
          rows="20"
          cols="50"
        ></textarea>
      </div>
      <div class="col-6 d-flex align-items-center justify-content-center">
        <!-- Patient details -->
        <form id="patient-card" @submit.prevent="onAddPatient" class="card p-4">
          <h4 class="mb-4">Tell us about the patient</h4>
          <div
            v-if="alert"
            class="alert"
            :class="'alert-' + alert.type"
            role="alert"
          >
            {{ alert.message }}
            <router-link to="/patients">
              go to patients table
            </router-link>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="form-group mb-3">
                <label for="firstName">First Name</label>
                <input
                  v-model="patient.firstName"
                  class="form-control"
                  id="firstName"
                  aria-describedby="firstName"
                  placeholder="John"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="form-group mb-3">
                <label for="lastName">Last Name</label>
                <input
                  v-model="patient.lastName"
                  class="form-control"
                  id="lastName"
                  aria-describedby="lastName"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="form-group mb-3">
                <label for="email">Email Address</label>
                <input
                  v-model="patient.email"
                  type="email"
                  class="form-control"
                  id="email"
                  aria-describedby="email"
                  placeholder="johndoe@example.com"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="form-group mb-3">
                <label for="dob">Date of Birth</label>
                <input
                  v-model="patient.dob"
                  type="date"
                  class="form-control"
                  id="dob"
                  aria-describedby="dob"
                  placeholder=""
                />
              </div>
            </div>
            <div class="col-6">
              <div class="form-group mb-3">
                <label for="address">Physical Address</label>
                <input
                  v-model="patient.address"
                  class="form-control"
                  id="address"
                  aria-describedby="address"
                  placeholder="133 - Kilifi Ave, Mombasa"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="form-group mb-3">
                <label for="sex">Sex</label>
                <select
                  v-model="patient.sex"
                  name="sex"
                  id="sex"
                  class="form-select"
                >
                  <option value="undefined">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group mb-3">
                <label for="phone">Phone number</label>
                <input
                  v-model="patient.phone"
                  class="form-control"
                  id="phone"
                  placeholder="+254722000000"
                />
              </div>
            </div>
            <div
              v-if="!isLoading"
              class="col-12 d-flex justify-content-between"
            >
              <button class="btn btn-light col-4" @click="$router.push('/')">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary col-4">
                Next
              </button>
            </div>
            <div v-else class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-patient",
  data() {
    return {
      isDevMode: false,
      patient: {},
      isLoading: false,
      alert: null,
    };
  },
  computed: {
    patientResource() {
      return {
        resourceType: "Patient",
        name: [
          {
            use: "usual",
            text: `${this.patient.firstName} ${this.patient.lastName}`,
          },
        ],
        contact: [
          {
            telecom: [
              {
                system: "email",
                value: this.patient.email,
              },
              {
                system: "phone",
                value: this.patient.phone,
              },
            ],
            address: {
              use: "home",
              type: "physical",
              line: [this.patient.address],
            },
          },
        ],
        birthDate: this.patient.dob,
        gender: this.patient.sex,
      };
    },
  },
  methods: {
    async onAddPatient() {
      // TODO: validate
      this.isLoading = true;
      try {
        const response = await this.$axios.post(
          "/Patient",
          this.patientResource
        );
        this.patient = {};
        this.isLoading = false;
        this.alert = {
          type: "success",
          message: "Patient added successfully",
        };
        console.log("patient added", response.data);
      } catch (e) {
        console.log("Error while saving patient", e.response.data);
        this.isLoading = false;
        this.alert = {
          type: "danger",
          message: "Could not add patient. Check details and try again",
        };
      }
    },
  },
};
</script>

<style></style>
