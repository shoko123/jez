<template>
  <v-stepper-content step="3">
    <form @submit.prevent="submitForm('groundstone1')" data-vv-scope="groundstone1">
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm6 class="px-1">
            <v-textarea
              label="description"
              v-model="description"
              v-validate="'required'"
              :error-messages="errors.collect('groundstone1.description')"
              name="description"
              box
            ></v-textarea>
          </v-flex>
          <v-flex xs12 sm6 class="px-1">
            <v-textarea
              label="notes"
              v-model="notes"
              v-validate="'required'"
              :error-messages="errors.collect('groundstone1.notes')"
              name="notes"
              box
            ></v-textarea>
          </v-flex>
          <v-flex xs12 sm2 class="px-1">
            <v-text-field
              label="type"
              v-model="type"
              v-validate="'required'"
              :error-messages="errors.collect('groundstone1.type')"
              name="type"
              box
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>

      <v-btn flat @click.native="step = 2">Previous</v-btn>
      <v-btn type="submit" color="primary">Continue</v-btn>
    </form>
  </v-stepper-content>
</template>

<script>
export default {
  created() {
    console.log(
      "groundstoneCreateForm.created() groundstone: " +
        JSON.stringify(this.groundstone)
    );
    if (!this.isCreate) {
      this.description = this.groundstone.description;
      this.notes = this.groundstone.notes;
      this.type = this.groundstone.type;
      this.id = this.groundstone.id;
    }
    //this.getAreasWithLoci();
  },

  data: () => ({
    //locusHydrated: false,
    //data() {
    //  return {

    registrationCategories: [{ id: 0, name: "GS" }, { id: 1, name: "AR" }]
  }),

  computed: {
    findFormData() {
      return this.$store.getters.findFormData;
    },
    groundstoneFormData() {
      return this.$store.getters["gs/createData"];
    },

    step: {
      get() {
        return this.findFormData.step;
      },
      set(data) {
        this.$store.commit("step", data);
      }
    },

    isCreate() {
      return this.findFormData.isCreate;
    },

    headerMessage() {
      return this.findFormData.headerMessage;
    },
    groundstone() {
      return this.$store.getters["gs/groundstone"];
    },

    description: {
      get() {
        return this.groundstoneFormData.description;
      },
      set(data) {
        this.$store.commit("gs/formDataDescription", data);
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
    type: {
      get() {
        return this.groundstoneFormData.type;
      },
      set(data) {
        this.$store.commit("gs/formDataType", data);
      }
    },
    id: {
      get() {
        return this.groundstoneFormData.find.id;
      },
      set(data) {
        this.$store.commit("gs/formDataFindId", data);
      }
    }
  },

  methods: {
    submitForm(scope) {
      console.log("next()");

      this.$validator.validateAll(scope).then(result => {
        if (result) {
          // eslint-disable-next-line
          //alert("next!");
          //this.step = 4;
          this.sendToServer();
          return;
        }
        //alert("Correct them errors!");
      });
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

    sendToServer() {
      console.log("sendToServer()");

      this.$store
        .dispatch("findCreate")
        .then(res => {
          console.log("back from findCreate() OK");
          this.$store.commit("snackbar", {
            value: true,
            message: "groundstone created",
            timeout: 4000,
            color: "green"
          });
        })
        .catch(err => {
          //alert("groundstone creation failed!");
          console.log("back from findCreate() failed " + err);
        });
    }
  }
};
</script>
