<template>
    <form @submit.prevent="submitForm('find-registration')" data-vv-scope="find-registration">
      <v-container grid-list-md text-xs-center class="ma-0 pa-0">
        <v-layout row wrap>
          <v-flex xs12 sm1>
            <v-text-field v-model="square" label="square" filled></v-text-field>
          </v-flex>
          <v-flex xs12 sm2>
            <v-text-field
              label="related pottery"
              v-model="related_pottery_basket"
              v-validate="'between:1,999'"
              :error-messages="errors.collect('find-registration.related_pottery_basket')"
              name="related_pottery_basket"
              filled
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm2>

            <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="menu"
            :nudge-right="40"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                name="date"
                v-model="date"
                :error-messages="errors.collect('locus-details.date')"
                label="date"
                prepend-icon="event"
                readonly
                filled
                v-on="on"
              ></v-text-field>
            </template>

            <v-date-picker v-model="date">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
            <v-spacer></v-spacer>
          </v-flex>
          <v-flex xs12 sm2>
            <v-text-field v-model="level_top" label="level_top" filled></v-text-field>
          </v-flex>
          <v-flex xs12 sm2>
            <v-text-field v-model="level_bottom" label="level_bottom" filled></v-text-field>
          </v-flex>

          <v-flex xs12 sm1>
            <v-switch v-model="keep" label="keep"></v-switch>
            <!-- UNTIL FIXED IN FRAMEWORK v-checkbox v-model="keep" name="keep" label="keep" filled></v-checkbox-->
          </v-flex>
          <v-flex xs12 sm2>
            <v-switch v-model="drawn" label="drawn"></v-switch>
            <!--v-checkbox v-model="drawn" name="drawn" label="drawn" filled></v-checkbox-->
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm4>
            <v-textarea
              label="description"
              v-model="description"
              :error-messages="errors.collect('find-registration.description')"
              name="description"
              filled
            ></v-textarea>
          </v-flex>

          <v-flex xs12 sm4>
            <v-textarea
              class="pr-1"
              name="notes"
              v-model="notes"
              :error-messages="errors.collect('notes')"
              label="notes"
              filled
            ></v-textarea>
          </v-flex>

          <v-flex xs12 sm4>
            <v-textarea
              class="pr-1"
              name="storage_location"
              v-model="storage_location"
              :error-messages="errors.collect('storage_location')"
              label="storage_location"
              filled
            ></v-textarea>
          </v-flex>
        </v-layout>

        <v-layout raw>
          <template v-if="isCreate">
            <v-btn text @click.native="previous">Previous</v-btn>
          </template>
          <v-btn text @click.native="cancel">Cancel</v-btn>
          <v-btn type="submit" color="primary">Continue</v-btn>
        </v-layout>
      </v-container>

      <!--v-btn type="submit" primary>submit</v-btn-->
    </form>
</template>

<script>
export default {
  created() {
    console.log("FindNew.created()");
  },
  destroyed() {
    console.log("FindNew.destroyed()");
  },

  data: () => ({
    menu: false,
  }),

  computed: {
    isCreate() {
      return this.$store.getters["mgr/status"].isCreate;
    },

    step: {
      get() {
        return this.$store.getters["stp/step"];
      },
      set(data) {
        this.$store.commit("stp/step", data);
      }
    },

    date: {
      get() {
        return this.$store.getters["fnd/date"]
          ? new Date(this.$store.getters["fnd/date"])
              .toISOString()
              .substr(0, 10)
          : "";
      },
      set(data) {
        this.$store.commit("fnd/date", data);
      }
    },

    related_pottery_basket: {
      get() {
        return this.$store.getters["fnd/related_pottery_basket"];
      },
      set(data) {
        this.$store.commit("fnd/related_pottery_basket", data);
      }
    },

    square: {
      get() {
        return this.$store.getters["fnd/square"];;
      },
      set(data) {
        this.$store.commit("fnd/square", data);
      }
    },

    keep: {
      get() {
        return this.$store.getters["fnd/keep"];
      },
      set(data) {
        this.$store.commit("fnd/keep", data);
      }
    },
    drawn: {
      get() {
        return this.$store.getters["fnd/drawn"];
      },
      set(data) {
        this.$store.commit("fnd/drawn", data);
      }
    },
    level_top: {
      get() {
        return this.$store.getters["fnd/level_top"];
      },
      set(data) {
        this.$store.commit("fnd/level_top", data);
      }
    },

    level_bottom: {
      get() {
        return this.$store.getters["fnd/level_bottom"];
      },
      set(data) {
        this.$store.commit("fnd/level_bottom", data);
      }
    },
    storage_location: {
      get() {
        return this.$store.getters["fnd/storage_location"];
      },
      set(data) {
        this.$store.commit("fnd/storage_location", data);
      }
    },
    description: {
      get() {
        return this.$store.getters["fnd/description"];;
      },
      set(data) {
        this.$store.commit("fnd/description", data);
      }
    },
    notes: {
      get() {
        return this.$store.getters["fnd/notes"];
      },
      set(data) {
        this.$store.commit("fnd/notes", data);
      }
    },
  },

  methods: {
    cancel() {
      this.$router.push({ path: `${this.$store.getters["mgr/status"].pathPrevious}` });
    },
    previous() {
      this.step--;
    },
    submitForm(scope) {
      //console.log("next pressed");

      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.step++;
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