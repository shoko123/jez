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
              label="related_pottery_basket"
              v-model="related_pottery_basket"
              v-validate="'required|between:1,999'"
              :error-messages="errors.collect('find-registration.related_pottery_basket')"
              name="related_pottery_basket"
              box
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm2>
            <div box>DATE</div>
            <!--v-menu
              ref="menu"
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="40"
              :return-value.sync="myDate"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                class="pr-1"
                slot="activator"
                name="myDate"
                v-model="myDate"
                :error-messages="errors.collect('myDate')"
                label="date"
                prepend-icon="event"
                readonly
                box
              ></v-text-field>
              <v-date-picker v-model="myDate">
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.menu.save(myDate)">OK</v-btn>
              </v-date-picker>
            </v-menu>
            <v-spacer></v-spacer>
            <v-text-field v-model="date_opened_formatted" label="date opened" box></v-text-field>

            <v-text-field v-model="date_opened_formatted" label="date opened" box></v-text-field-->
          </v-flex>
          <v-flex xs12 sm2>
            <v-text-field v-model="level_top" label="level_top" box></v-text-field>
          </v-flex>
          <v-flex xs12 sm2>
            <v-text-field v-model="level_bottom" label="level_bottom" box></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm4>
            <v-textarea
              label="description"
              v-model="description"
              v-validate="'required'"
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
              :error-messages="errors.collect('storage_location')"
              label="storage_location"
              box
            ></v-textarea>
          </v-flex>
        </v-layout>

        <div>registration details</div>
      </v-container>
      <v-btn flat @click.native="step = 1">Previous</v-btn>
      <v-btn type="submit" color="primary">Continue</v-btn>
      <!--v-btn type="submit" primary>submit</v-btn-->
    </form>
  </v-stepper-content>
</template>

<script>
/*
date
description
notes
square
periods
keep
level_top
level_bottom
quantity
weight
storage_location
*/
export default {
  created() {
    console.log(
      "findRegistrationDetailsForm.created(). isCreate:" + this.isCreate
    );
  },
  destroyed() {
    console.log('findRegistrationDetailsForm.destroyed()');
  },

  data: () => ({
    //myDate: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false
  }),

  computed: {
    findFormData() {
      return this.$store.getters.findFormData;
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

    locus: {
      get() {
        return this.findFormData.registration.locus;
      },
      set(data) {
        this.$store.commit("findRegistrationLocusId", data.id);
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
        this.$store.commit("findRegistrationRelatedPotteryBasket", data);
      }
    },
    myDate: {
      get() {
        return this.findFormData.date
          ? new Date(this.findFormData.date).toISOString().substr(0, 10)
          : new Date().toISOString().substr(0, 10);
      },
      set(data) {
        this.$store.commit("findRegistrationDate", data.toISOString());
      }
    },
    square: {
      get() {
        return this.findFormData.registration.type;
      },
      set(data) {
        this.$store.commit("findRegistrationSquare", data);
      }
    },

    keep: {
      get() {
        return this.findFormData.registration.keep;
      },
      set(data) {
        this.$store.commit("findRegistrationKeep", data);
      }
    },
    drawn: {
      get() {
        return this.findFormData.registration.drawn;
      },
      set(data) {
        this.$store.commit("findRegistrationDrawn", data);
      }
    },
    level_top: {
      get() {
        return this.findFormData.registration.level_top;
      },
      set(data) {
        this.$store.commit("findRegistrationLevelTop", data);
      }
    },
    level_bottom: {
      get() {
        return this.findFormData.registration.level_bottom;
      },
      set(data) {
        this.$store.commit("findRegistrationLevelBottom", data);
      }
    },
    storage_location: {
      get() {
        return this.findFormData.registration.storage_location;
      },
      set(data) {
        this.$store.commit("findRegistrationStorage_location", data);
      }
    },
    description: {
      get() {
        return this.findFormData.registration.description;
      },
      set(data) {
        this.$store.commit("findRegistrationDescription", data);
      }
    },
    notes: {
      get() {
        return this.findFormData.registration.notes;
      },
      set(data) {
        this.$store.commit("findRegistrationNotes", data);
      }
    }
  },

  methods: {
    submitForm(scope) {
      console.log("next pressed");

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
