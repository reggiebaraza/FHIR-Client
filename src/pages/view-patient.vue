<template>
  <div class="container-fluid">
    <fhir-navbar></fhir-navbar>
    <div class="row mt-5">
      <div class="col-8 offset-2">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a
              class="nav-link"
              :class="page === 'personal' ? 'active' : ''"
              aria-current="page"
              @click="page = 'personal'"
            >
              Personal Details
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="page === 'medical' ? 'active' : ''"
              @click="page = 'medical'"
            >
              Medical Conditions
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="page = 'visit'">Visit History</a>
          </li>
        </ul>
        <div class="row p-3 py-5 border">
          <div v-if="page === 'personal'" class="row col-12">
            <div class="row">
              <div class="col-3"><h5>Name:</h5></div>
              <div class="col-3">{{ patient.name | getName }}</div>
            </div>
            <div class="row">
              <div class="col-3"><h5>Age:</h5></div>
              <div class="col-3">
                {{ patient.birthDate | calculateAge }} yrs old
              </div>
            </div>
            <div class="row">
              <div class="col-3"><h5>Sex:</h5></div>
              <div class="col-3">{{ patient.gender }}</div>
            </div>
            <div class="row">
              <div class="col-3"><h5>Date of Birth:</h5></div>
              <div class="col-3">{{ patient.birthDate }}</div>
            </div>
            <div class="row">
              <div class="col-3"><h5>Address:</h5></div>
              <div class="col-3">{{ patient.contact | getAddress }}</div>
            </div>
          </div>
          <div v-else-if="page === 'medical'" class="row col-12">
            <h3 class="text-center">Medical Conditions</h3>
            <ul
              v-for="(observation, i) in observations"
              :key="i"
              class="list-group list-group-flush"
            >
              <strong>{{
                observation.resource.meta.lastUpdated | formatDate
              }}</strong>
              <li class="list-group-item">
                {{ observation.resource.code | getObservationFromCondition }}
              </li>
            </ul>
            <div class="row mt-3">
              <div class=" offset-3 col-6 d-grid">
                <!-- Button trigger modal -->
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#add-observation-modal"
                >
                  Record new observation
                </button>
              </div>
            </div>
          </div>
          <div v-else class="row col-12">
            <h3 class="text-center">Visit History</h3>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="add-observation-modal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Modal title
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">
                <div class="col-6">
                  <div class="form-group mb-3">
                    <label for="firstName">Condition Name:</label>
                    <input
                      v-model="newObservation.name"
                      class="form-control"
                      id="name"
                      aria-describedby="name"
                      placeholder="Temperature"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group mb-3">
                    <label for="firstName">Value:</label>
                    <input
                      v-model="newObservation.value"
                      class="form-control"
                      id="conditionValue"
                      aria-describedby="conditionValue"
                      placeholder="23 Degrees Celcius"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              @click="onSaveNewObservation"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "view-patient",
  data() {
    return {
      page: "personal",
      patient: {},
      observations: [],
      newObservation: {},
    };
  },
  created() {
    this.fetchPatientData();
    this.fetchPatientObservations();
  },
  computed: {
    observationResource() {
      return {
        resourceType: "Observation",
        status: "registered",
        code: {
          text: `${this.newObservation.name}: ${this.newObservation.value}`,
        },
        subject: {
          type: "Patient",
          reference: "Patient/" + this.$route.params.patientId,
        },
      };
    },
  },
  methods: {
    async fetchPatientData() {
      const patientId = this.$route.params.patientId;
      const response = await this.$axios.get("/Patient/" + patientId);
      this.patient = response.data;
      console.log("fetched patient:", this.patient);
    },
    async fetchPatientObservations() {
      const patientId = this.$route.params.patientId;
      const response = await this.$axios.get(
        "/Observation?subject=" + patientId
      );
      this.observations = response.data.entry;
      console.log("fetched observations:", response.data);
    },
    async onSaveNewObservation() {
      const response = await this.$axios.post(
        "/Observation",
        this.observationResource
      );
      console.log("Added new observation:", response.data);
      // refresh changes
      this.fetchPatientObservations();
    },
  },
};
</script>

<style></style>
