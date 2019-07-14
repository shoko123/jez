<template>
  <v-stepper-content step="3">
    <form @submit.prevent="submitForm('groundstone1')" data-vv-scope="groundstone1">
      <!--form data-vv-scope="groundstone1"-->
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm2>
            <v-select
              label=" GS type"
              :items="groundstoneTypes"
              v-model="groundstone_type_id"
              name="type"
              item-text="name"
              item-value="id"
              single-line
              box
              @change="typeSelected"
            ></v-select>
          </v-flex>
          <v-flex xs12 sm2 class="px-1">
            <v-select
              label="material"
              :items="materials"
              v-model="material_id"
              name="material"
              item-text="name"
              item-value="id"
              single-line
              box
              @change="materialSelected"
            ></v-select>
          </v-flex>
          <v-flex xs12 sm2 class="px-1">
            <v-text-field
              label="weight"
              v-model="weight"
              v-validate="'between:1,9999'"
              :error-messages="errors.collect('groundstone1.weight')"
              name="weight"
              box
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm6 class="px-1">
            <v-textarea
              label="notes"
              v-model="notes"
              :error-messages="errors.collect('groundstone1.notes')"
              name="notes"
              box
            ></v-textarea>
          </v-flex>
          <v-flex xs12 sm6 class="px-1">
            <v-textarea
              label="measurements"
              v-model="measurements"
              :error-messages="errors.collect('groundstone1.measurements')"
              name="measurements"
              box
            ></v-textarea>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-btn flat @click.native="step = 2">Previous</v-btn>
          <v-btn flat @click.native="cancel">Cancel</v-btn>
          <v-btn type="submit" disable="disableSubmit" color="primary">submit</v-btn>
          <v-spacer></v-spacer>
        </v-layout>
      </v-container>
    </form>
  </v-stepper-content>
</template>

<script>
export default {
  created() {
    //console.log("groundstoneCreateForm.created() groundstone: " + JSON.stringify(this.groundstone));
    if (!this.isCreate) {
      this.id = this.groundstone.id;
      this.groundstone_type_id = this.groundstone.groundstone_type_id;
      this.material_id = this.groundstone.material_id;
      this.weight = this.groundstone.weight;
      this.notes = this.groundstone.notes;
      this.measurements = this.groundstone.measurements;
    }

    this.$store
      .dispatch('gs/materials')
      .then(res => {})
      .catch(err => {
        console.log("failed to get materials" + err);
      });
    this.$store
      .dispatch('gs/groundstoneTypes')
      .then(res => {})
      .catch(err => {
        console.log("failed to get groundstoneTypes" + err);
      });
  },

  data: () => ({
    width: null,
    length: null,
    height: null,
    drawn: null,
    disableSubmit: false,

    registrationCategories: [{ id: 0, name: "GS" }, { id: 1, name: "AR" }]
  }),

  computed: {
    findFormData() {
      return this.$store.getters['fn/findFormData'];
    },
    groundstoneFormData() {
      return this.$store.getters["gs/createData"];
    },

    step: {
      get() {
        return this.findFormData.step;
      },
      set(data) {
        this.$store.commit("fn/step", data);
      }
    },

    isCreate() {
      //return this.$store.getters['mg/isCreate'];
      return this.findFormData.isCreate;
    },

    headerMessage() {
      return this.findFormData.headerMessage;
    },
    groundstone() {
      return this.$store.getters["gs/groundstone"];
    },

    id: {
      get() {
        return this.groundstoneFormData.id;
      },
      set(data) {
        this.$store.commit("gs/formDataFindId", data);
      }
    },

    groundstone_type_id: {
      get() {
        return this.groundstoneFormData.groundstone_type_id;
      },
      set(data) {
        this.$store.commit("gs/createDataSetter", {
          name: "groundstone_type_id",
          data: data
        });
      }
    },
    material_id: {
      get() {
        return this.groundstoneFormData.material_id;
      },
      set(data) {
        this.$store.commit("gs/createDataSetter", {
          name: "material_id",
          data: data
        });
      }
    },
    weight: {
      get() {
        return this.groundstoneFormData.weight;
      },
      set(data) {
        this.$store.commit("gs/createDataSetter", {
          name: "weight",
          data: data
        });
      }
    },
    notes: {
      get() {
        return this.groundstoneFormData.notes;
      },
      set(data) {
        this.$store.commit("gs/formDataNotes", data);
      }
    },
    measurements: {
      get() {
        return this.groundstoneFormData.measurements;
      },
      set(data) {
        this.$store.commit("gs/createDataSetter", {
          name: "measurements",
          data: data
        });
      }
    },
    materials() {
      return this.groundstoneFormData.extra.materials;
    },
    groundstoneTypes() {
      return this.groundstoneFormData.extra.groundstone_types;
    }
  },

  methods: {
    submitForm(scope) {
      //console.log("next()");

      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.sendToServer();
          return;
        }
        //alert("Correct them errors!");
      });
    },
    cancel() {
      this.$store.commit("fn/findRegistrationClear", null, {root: true});
      let gsId = this.isCreate ? this.groundstone.id : this.id;
      console.log("cancel pushing to " + gsId);
      this.$router.push(`/groundstones/${gsId}`);
    },

    clear() {
      /*
      this.locus.locus_no = "";
      this.locus.square = "";
      this.locus.date_opened = null;
      this.locus.date_closed = null;
      this.locus.level_opened = "";
      this.locus.level_closed = "";
      this.locus.locus_above = "";
      this.locus.locus_below = "";
      this.locus.locus_co_existing = "";
      this.locus.description = "";
      this.locus.deposit = "";
      this.locus.registration_notes = "";
      this.loculs.clean = "";
      this.$validator.reset();
      */
    },
    typeSelected() {},
    materialSelected() {},
    sendToServer() {
      console.log("sendToServer()");
      this.disableSubmit = true;
      this.$store.commit("isLoading", {
        value: true,
        message: "saving groundstone",
        progressColor: "green"
      });

      this.$store
        .dispatch("fn/findCreate")
        .then(res => {
          //console.log(
          //  "gsCreateForm back from dispatch(findCreate) success!\n" +
          //    JSON.stringify(res, null, 2)
          //);
          let message = this.isCreate
            ? "groundstone created successfully, redirected to new groundstone"
            : "groundstone updated, back to updated groundstone";

          //for good measure
          this.disableSubmit = false;

          this.$store.commit("snackbar", {
            value: true,
            message: message,
            timeout: 4000,
            color: "green"
          });

          //console.log("gsCreateForm back from server res: " + JSON.stringify(res, null, 2));
          let target = this.isCreate ? res.id : res.data.groundstone.id;
          this.$store.commit("fn/findRegistrationClear", null);
          this.$store.commit("gs/createDataClear", null);
          this.$router.push(`/groundstones/${target}`);
        })
        .catch(err => {
          //alert("groundstone creation failed!");
          console.log("back from findCreate() failed " + err);
          this.disableSubmit = false;
        });
    }
  }
};
</script>
