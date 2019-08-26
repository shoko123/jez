<template>
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
            <v-btn flat @click.native="previous">Previous</v-btn>
          </template>
          <v-btn flat @click.native="cancel">Cancel</v-btn>
          <v-btn type="submit" color="primary">Continue</v-btn>
        </v-layout>
      </v-container>

      <!--v-btn type="submit" primary>submit</v-btn-->
    </form>
</template>

<script>
export default {
  created() {
    console.log("findNewDetails.created()");
  },
  destroyed() {
    console.log("findNewDetails.destroyed()");
  },

  data: () => ({
    menu: false,
  }),

  computed: {
    isCreate() {
      return this.$store.getters["mg/isCreate"];
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
        return this.$store.getters["fn/date"]
          ? new Date(this.$store.getters["fn/date"])
              .toISOString()
              .substr(0, 10)
          : "";
      },
      set(data) {
        this.$store.commit("fn/date", data);
      }
    },

    related_pottery_basket: {
      get() {
        return this.$store.getters["fn/related_pottery_basket"];
      },
      set(data) {
        this.$store.commit("fn/related_pottery_basket", data);
      }
    },

    square: {
      get() {
        return this.$store.getters["fn/square"];;
      },
      set(data) {
        this.$store.commit("fn/square", data);
      }
    },

    keep: {
      get() {
        return this.$store.getters["fn/keep"];
      },
      set(data) {
        this.$store.commit("fn/keep", data);
      }
    },
    drawn: {
      get() {
        return this.$store.getters["fn/drawn"];
      },
      set(data) {
        this.$store.commit("fn/drawn", data);
      }
    },
    level_top: {
      get() {
        return this.$store.getters["fn/level_top"];
      },
      set(data) {
        this.$store.commit("fn/level_top", data);
      }
    },

    level_bottom: {
      get() {
        return this.$store.getters["fn/level_bottom"];
      },
      set(data) {
        this.$store.commit("fn/level_bottom", data);
      }
    },
    storage_location: {
      get() {
        return this.$store.getters["fn/storage_location"];
      },
      set(data) {
        this.$store.commit("fn/storage_location", data);
      }
    },
    description: {
      get() {
        return this.$store.getters["fn/description"];;
      },
      set(data) {
        this.$store.commit("fn/description", data);
      }
    },
    notes: {
      get() {
        return this.$store.getters["fn/notes"];
      },
      set(data) {
        this.$store.commit("fn/notes", data);
      }
    },
  },

  methods: {
    cancel() {
      this.$router.push({ path: `${this.$store.getters["mg/previousPath"]}` });
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
