<template>
  <form @submit.prevent="submitForm('locus-details')" data-vv-scope="locus-details">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 lg2>
          <v-text-field
            class="pr-1"
            name="square"
            v-model="square"
            :error-messages="errors.collect('locus-details.square')"
            label="Square"
            filled
          ></v-text-field>
          <v-spacer></v-spacer>
        </v-flex>

        <v-flex xs12 lg2>
          <v-text-field
            class="pr-1"
            name="locus_above"
            v-model="locus_above"
            :error-messages="errors.collect('locus-details.locus_above')"
            label="locus above"
            filled
          ></v-text-field>
        </v-flex>

        <v-flex xs12 lg2>
          <v-text-field
            class="pr-1"
            name="locus_below"
            v-model="locus_below"
            :error-messages="errors.collect('locus-details.locus_below')"
            label="locus below"
            filled
          ></v-text-field>
        </v-flex>

        <v-flex xs12 lg2>
          <v-text-field
            class="pr-1"
            name="locus_co_existing"
            v-model="locus_co_existing"
            :error-messages="errors.collect('locus-details.locus_co_existing')"
            label="co existing"
            filled
          ></v-text-field>
        </v-flex>

        <v-flex xs12 lg2>
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="menu"
            :nudge-right="40"
            :return-value.sync="date_opened"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                name="date_opened"
                v-model="date_opened"
                :error-messages="errors.collect('locus-details.date_opened')"
                label="date opened"
                prepend-icon="event"
                readonly
                filled
                v-on="on"
              ></v-text-field>
            </template>

            <v-date-picker v-model="date_opened">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date_opened)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-spacer></v-spacer>
        </v-flex>

        <v-flex xs12 lg2>
          <v-menu
            ref="menu2"
            :close-on-content-click="false"
            v-model="menu2"
            :nudge-right="40"
            :return-value.sync="date_closed"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
          <template v-slot:activator="{ on }">
              <v-text-field
                name="date_closed"
                v-model="date_closed"
                :error-messages="errors.collect('locus-details.date_closed')"
                label="date closed"
                prepend-icon="event"
                readonly
                filled
                v-on="on"
              ></v-text-field>
            </template>
           
            <v-date-picker v-model="date_closed">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu2.save(date_closed)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 lg2>
          <v-text-field
            class="pr-1"
            name="level_opened"
            v-model="level_opened"
            :error-messages="errors.collect('locus-details.level_opened')"
            label="level opened"
            filled
          ></v-text-field>
        </v-flex>

        <v-flex xs12 lg2>
          <v-text-field
            class="pr-1"
            name="level_closed"
            v-model="level_closed"
            :error-messages="errors.collect('locus-details.level_closed')"
            label="level closed"
            filled
          ></v-text-field>
        </v-flex>

        <v-flex xs12 lg1>
          <v-text-field
            class="pr-1"
            name="clean"
            v-model="clean"
            :error-messages="errors.collect('locus-details.clean')"
            label="clean"
            filled
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 lg12>
          <v-textarea
            class="pr-1"
            name="description"
            v-model="description"
            v-validate="'required'"
            :error-messages="errors.collect('locus-details.description')"
            label="description"
            filled
          ></v-textarea>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 lg12>
          <v-textarea
            class="pr-1"
            name="deposit"
            v-model="deposit"
            :error-messages="errors.collect('locus-details.deposit')"
            label="deposit"
            filled
          ></v-textarea>
          <!--v-textarea v-model="deposit" label="deposit" filled></v-textarea-->
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 lg12>
          <v-textarea
            class="pr-1"
            name="registration_notes"
            v-model="registration_notes"
            :error-messages="errors.collect('locus-details.registration_notes')"
            label="registration notes"
            filled
          ></v-textarea>
        </v-flex>
      </v-layout>
      <template v-if="isCreate">
        <v-btn text @click.native="previous">Previous</v-btn>
      </template>
      <v-btn type="submit" color="primary">submit</v-btn>
      <v-btn text @click.native="cancel">Cancel</v-btn>
    </v-container>
  </form>
</template>

<script>
export default {
  created() {
    console.log("gsNew created");
  },

  data: () => ({
    disableSubmit: false,
    menu: null,
    menu2: null
  }),

  computed: {
    step: {
      get() {
        return this.$store.getters["stp/step"];
      },
      set(data) {
        this.$store.commit("stp/step", data);
      }
    },

    isCreate() {
      return this.$store.getters["mgr/status"].isCreate;
    },

    //new locus data
    square: {
      get() {
        return this.$store.getters["locus/square"];
      },
      set(data) {
        this.$store.commit("locus/square", data);
      }
    },
    date_opened: {
      get() {
        return this.$store.getters["locus/date_opened"]
          ? new Date(this.$store.getters["locus/date_opened"])
              .toISOString()
              .substr(0, 10)
          : "";
      },
      set(data) {
        this.$store.commit("locus/date_opened", data);
      }
    },
    date_closed: {
      get() {
        return this.$store.getters["locus/date_closed"]
          ? new Date(this.$store.getters["locus/date_closed"])
              .toISOString()
              .substr(0, 10)
          : "";
      },
      set(data) {
        this.$store.commit("locus/date_closed", data);
      }
    },
    level_opened: {
      get() {
        return this.$store.getters["locus/level_opened"];
      },
      set(data) {
        this.$store.commit("locus/level_opened", data);
      }
    },
    level_closed: {
      get() {
        return this.$store.getters["locus/level_closed"];
      },
      set(data) {
        this.$store.commit("locus/level_closed", data);
      }
    },
    locus_above: {
      get() {
        return this.$store.getters["locus/locus_above"];
      },
      set(data) {
        this.$store.commit("locus/locus_above", data);
      }
    },
    locus_below: {
      get() {
        return this.$store.getters["locus/locus_below"];
      },
      set(data) {
        this.$store.commit("locus/locus_below", data);
      }
    },
    locus_co_existing: {
      get() {
        return this.$store.getters["locus/locus_co_existing"];
      },
      set(data) {
        this.$store.commit("locus/locus_co_existing", data);
      }
    },
    description: {
      get() {
        return this.$store.getters["locus/description"];
      },
      set(data) {
        this.$store.commit("locus/description", data);
      }
    },
    deposit: {
      get() {
        return this.$store.getters["locus/deposit"];
      },
      set(data) {
        this.$store.commit("locus/deposit", data);
      }
    },
    registration_notes: {
      get() {
        return this.$store.getters["locus/registration_notes"];
      },
      set(data) {
        this.$store.commit("locus/registration_notes", data);
      }
    },
    clean: {
      get() {
        return this.$store.getters["locus/clean"];
      },
      set(data) {
        this.$store.commit("locus/clean", data);
      }
    }
  },

  methods: {
    submitForm(scope) {
      console.log(
        "submit newItem.data: " +
          JSON.stringify(this.$store.getters["locus/newItemData"], null, 2)
      );

      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.$store
            .dispatch("locus/store")
            .then(res => {
              let newLocusId = res.data.locus.id;

              if (this.isCreate) {
                this.$store.dispatch("locus/collection").then(res => {
                  this.step = 1;
                  this.$router.push({
                    path: `/loci/${newLocusId}/show`
                  });
                });
              } else {
                this.step = 1;
                this.$router.push({
                  path: `/loci/${newLocusId}/show`
                });
              }
            })
            .catch(err => {});
          return;
        }
        //alert("Correct them errors!");
      });
    },
    cancel() {
      this.$router.push({ path: `${this.$store.getters["mgr/pathPervious"]}` });
    },
    previous() {
      this.step--;
    },
    sendToServer() {
      console.log("sendToServer()");
      this.disableSubmit = true;
    }
  }
};
</script>
