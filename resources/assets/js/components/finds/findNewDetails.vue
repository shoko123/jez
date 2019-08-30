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
      return this.$store.getters["mgr/isCreate"];
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
      this.$router.push({ path: `${this.$store.getters["mgr/previousPath"]}` });
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
