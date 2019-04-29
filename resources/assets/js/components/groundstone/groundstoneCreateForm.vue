<template>
  <v-stepper-content step="2">
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

      <v-btn flat @click.native="step = 1">Previous</v-btn>
      <v-btn type="submit" color="primary">Continue</v-btn>
    </form>
  </v-stepper-content>
</template>

<script>
export default {
  created() {
    console.log("groundstoneCreateForm.created()");
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
      return this.$store.getters['gs/formData'];
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

    description: {
      get() {
        return this.groundstoneFormData.description;
      },
      set(data) {
        this.$store.commit('gs/formDataDescription', data);
      }
    },
    notes: {
      get() {
        return this.groundstoneFormData.notes;
      },
      set(data) {
        this.$store.commit('gs/formDataNotes', data);
      }
    },
    type: {
      get() {
        return this.groundstoneFormData.type;
      },
      set(data) {
        this.$store.commit('gs/formDataType', data);
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
          this.step = 3;
          //this.sendToServer();
          return;
        }
        alert("Correct them errors!");
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

      let find = {
        locus_id: this.regLocusId,
        registration_category: this.registrationCategory,
        basket_no: null,
        item_no: null,
        related_pottery_basket: null,
        date: null,
        description: null,
        notes: null,
        square: null,
        periods: null,
        keep: null,
        level_top: null,
        level_bottom: null,
        quantity: null,
        weight: null,
        findable_type: "Groundstone",
        findable_id: null
      };

      if (this.gsCreateUpdate.registration.registrationCategory == "GS") {
        find.basket_no = this.gsBasketNo;
        find.item_no = this.gsItemNo;
      } else if (
        this.gsCreateUpdate.registration.registrationCategory == "AR"
      ) {
        find.basket_no = null;
        find.item_no = this.arItemNo;
      }

      let new_groundstone = {
        groundstone: this.groundstone,
        find: find
      };
      console.log("before create " + JSON.stringify(new_groundstone));

      axios
        .post("/api/groundstones/create", new_groundstone)
        .then(res => {
          console.log("success!\n" + JSON.stringify(res));
          this.$store.commit("snackbar", {
            value: true,
            message: "groundstone created",
            timeout: 4000,
            color: "green"
          });
          //alert("groundstone + find created! id: " + res.data.id);
          //router.push({ path: `/user/${userId}` }) // -> /user/123
          this.$router.push({
            path: `/groundstones/${res.data.groundstone.id}`
          });
        })
        .catch(err => {
          //alert("groundstone creation failed!");
          console.log("groundstoneCreate failed\n" + err);
        });
    }
  }
};
</script>
