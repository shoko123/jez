<template>
  <v-stepper-content step="2">
    <form @submit.prevent="submitForm('find-registration')" data-vv-scope="find-registration">
      <v-container grid-list-md text-xs-center class="ma-0 pa-0">
        <v-layout row wrap>
          <v-flex xs12 sm2>
            <v-text-field v-model="square" label="square" box></v-text-field>
          </v-flex>
          <v-flex xs12 sm2>
            <v-text-field
              label="related pottery"
              v-model="related_pottery_basket"
              v-validate="'between:1,999'"
              :error-messages="errors.collect('find-registration.related_pottery_basket')"
              name="related_pottery_basket"
              box
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm2>
            <v-menu
              ref="menu"
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                class="pr-1"
                slot="activator"
                name="my date"
                v-model="date"
                :error-messages="errors.collect('date')"
                label="date"
                prepend-icon="event"
                readonly
                box
              ></v-text-field>
              <v-date-picker v-model="date">
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
            <v-spacer></v-spacer>
          </v-flex>
          <v-flex xs12 sm2>
            <v-text-field v-model="level_top" label="level_top" box></v-text-field>
          </v-flex>
          <v-flex xs12 sm2>
            <v-text-field v-model="level_bottom" label="level_bottom" box></v-text-field>
          </v-flex>

          <v-flex xs12 sm1>
            <v-checkbox v-model="keep" name="keep" label="keep" box></v-checkbox>
          </v-flex>
          <v-flex xs12 sm1>
            <v-checkbox v-model="drawn" name="drawn" label="drawn" box></v-checkbox>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm4>
            <v-textarea
              label="description"
              v-model="description"
              :error-messages="errors.collect('find-registration.description')"
              name="description"
              box
            ></v-textarea>
          </v-flex>

          <v-flex xs12 sm4>
            <v-textarea
              class="pr-1"
              name="notes"
              v-model="notes"
              :error-messages="errors.collect('notes')"
              label="notes"
              box
            ></v-textarea>
          </v-flex>

          <v-flex xs12 sm4>
            <v-textarea
              class="pr-1"
              name="storage_location"
              v-model="storage_location"
              :error-messages="errors.collect('storage_location')"
              label="storage_location"
              box
            ></v-textarea>
          </v-flex>
        </v-layout>

        <v-layout raw>
          <template v-if="isCreate">
            <v-btn flat @click.native="step = 1">Previous</v-btn>
          </template>
          <v-btn flat @click.native="cancel">Cancel</v-btn>
          <v-btn type="submit" color="primary">Continue</v-btn>
        </v-layout>
      </v-container>

      <!--v-btn type="submit" primary>submit</v-btn-->
    </form>
  </v-stepper-content>
</template>

<script>
export default {
  created() {
    //console.log("findRegistrationDetailsForm.created() copy from find: " + JSON.stringify(this.find, null, 2));
    if (!this.isCreate) {
      this.date = this.find.date;
      this.related_pottery_basket = this.find.related_pottery_basket;
      this.square = this.find.square;
      this.level_top = this.find.level_top;
      this.level_bottom = this.find.level_bottom;
      this.keep = this.find.keep;
      this.drawn = this.find.drawn;
      this.description = this.find.description;
      this.notes = this.find.notes;
      this.storage_location = this.find.storage_location;
    }
  },
  destroyed() {
    //console.log("findRegistrationDetailsForm.destroyed()");
  },

  data: () => ({
    menu: false,
    modal: false,
    menu2: false,
    aDate: null
  }),

  computed: {
    find() {
      return this.$store.getters['fn/find'];
    },
    findFormData() {
      return this.$store.getters['fn/findFormData'];
    },
    date: {
      get() {
        return this.findFormData.registration.date
          ? new Date(this.findFormData.registration.date)
              .toISOString()
              .substr(0, 10)
          : "";
      },
      set(data) {
        this.$store.commit("fn/findRegistrationDate", data);
      }
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

    locus: {
      get() {
        return this.findFormData.registration.locus;
      },
      set(data) {
        this.$store.commit("fn/findRegistrationLocusId", data.id);
      }
    },
    locusId: {
      get() {
        return this.findFormData.registration.locusId;
      },
      set(value) {
        this.locusSelected(value);
      }
    },

    related_pottery_basket: {
      get() {
        return this.findFormData.registration.related_pottery_basket;
      },
      set(data) {
        this.$store.commit("fn/findRegistrationRelatedPotteryBasket", data);
      }
    },

    square: {
      get() {
        return this.findFormData.registration.square;
      },
      set(data) {
        this.$store.commit("fn/findRegistrationSquare", data);
      }
    },

    keep: {
      get() {
        return this.findFormData.registration.keep;
      },
      set(data) {
        this.$store.commit("fn/findRegistrationKeep", data);
      }
    },
    drawn: {
      get() {
        return this.findFormData.registration.drawn;
      },
      set(data) {
        this.$store.commit("fn/findRegistrationDrawn", data);
      }
    },
    level_top: {
      get() {
        return this.findFormData.registration.level_top;
      },
      set(data) {
        this.$store.commit("fn/findRegistrationLevelTop", data);
      }
    },
    level_bottom: {
      get() {
        return this.findFormData.registration.level_bottom;
      },
      set(data) {
        this.$store.commit("fn/findRegistrationLevelBottom", data);
      }
    },
    storage_location: {
      get() {
        return this.findFormData.registration.storage_location;
      },
      set(data) {
        this.$store.commit("fn/findRegistrationStorageLocation", data);
      }
    },
    description: {
      get() {
        return this.findFormData.registration.description;
      },
      set(data) {
        this.$store.commit("fn/findRegistrationDescription", data);
      }
    },
    notes: {
      get() {
        return this.findFormData.registration.notes;
      },
      set(data) {
        this.$store.commit("fn/findRegistrationNotes", data);
      }
    },
    groundstone() {
      return this.$store.getters["gs/groundstone"];
    }
  },

  methods: {
    saveDate(data) {
      console.log("saveDate" + data);
    },
    cancel() {
      this.$store.commit("fn/findRegistrationClear", null);
      let gsId = this.isCreate ? this.groundstone.id : this.find.findable_id;
      //console.log("cancel pushing to " + gsId);
      this.$router.push(`/groundstones/${gsId}`);
    },

    submitForm(scope) {
      //console.log("next pressed");

      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.step = 3;
          return;
        }
        console.log("Errors: " + JSON.stringify(this.errors));
        console.log("description: " + this.description);
        //alert("Correct them errors!");
      });
    }
  }
};
</script>
