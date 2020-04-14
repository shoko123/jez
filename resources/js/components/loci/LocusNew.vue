<template>
  <form name="form">
    <v-container fluid>
      <v-row dense wrap fill-height>
        <v-col xs12 lg2>
          <v-text-field name="square" v-model="square" label="Square" filled></v-text-field>
          <v-spacer></v-spacer>
        </v-col>

        <v-col xs12 lg2>
          <v-text-field name="locus_above" v-model="locus_above" label="locus above" filled></v-text-field>
        </v-col>

        <v-col xs12 lg2>
          <v-text-field name="locus_below" v-model="locus_below" label="locus below" filled></v-text-field>
        </v-col>

        <v-col xs12 lg2>
          <v-text-field
            name="locus_co_existing"
            v-model="locus_co_existing"
            label="co existing"
            filled
          ></v-text-field>
        </v-col>


        <v-col xs12 lg2>
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
        </v-col>

        <v-col xs12 lg2>
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
        </v-col>
      </v-row>

      <v-row dense wrap fill-height>
        <v-col xs12 lg2>
          <v-text-field name="level_opened" v-model="level_opened" label="level opened" filled></v-text-field>
        </v-col>

        <v-col xs12 lg2>
          <v-text-field name="level_closed" v-model="level_closed" label="level closed" filled></v-text-field>
        </v-col>

        <v-col xs12 lg1>
          <v-text-field name="clean" v-model="clean" label="clean" filled></v-text-field>
        </v-col>
      </v-row>

      <v-row dense wrap fill-height>
        <v-col xs12 lg12>
          <v-textarea
            name="description"
            v-model="description"
            :error-messages="descriptionErrors"
            label="description"
            filled
            @input="$v.description.$touch()"
            @blur="$v.description.$touch()"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row dense wrap fill-height>
        <v-col xs12 lg12>
          <v-textarea name="deposit" v-model="deposit" label="deposit" filled></v-textarea>
          <!--v-textarea v-model="deposit" label="deposit" filled></v-textarea-->
        </v-col>
      </v-row>
      <v-row dense wrap fill-height>
        <v-col xs12 lg12>
          <v-textarea
            name="registration_notes"
            v-model="registration_notes"
            label="registration notes"
            filled
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>

    
  

<script>
import { required } from "vuelidate/lib/validators";

export default {
  data: () => ({
    menu: null,
    menu2: null
  }),

  mounted() {
    this.$root.$on("stepperNextClicked", () => {
      console.log("LocusNew Event");
      this.submitForm();
    });
  },

  created() {
    console.log("gsNew created");
    this.handleNextButton();
    //this.$store.commit("stp/disableNextButton", false);
  },

  validations: {
    description: { required }
  },

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
        return this.$store.getters["loci/square"];
      },
      set(data) {
        this.$store.commit("loci/square", data);
      }
    },
    date_opened: {
      get() {
        return this.$store.getters["loci/date_opened"]
          ? new Date(this.$store.getters["loci/date_opened"])
              .toISOString()
              .substr(0, 10)
          : "";
      },
      set(data) {
        this.$store.commit("loci/date_opened", data);
      }
    },
    date_closed: {
      get() {
        return this.$store.getters["loci/date_closed"]
          ? new Date(this.$store.getters["loci/date_closed"])
              .toISOString()
              .substr(0, 10)
          : "";
      },
      set(data) {
        this.$store.commit("loci/date_closed", data);
      }
    },
    level_opened: {
      get() {
        return this.$store.getters["loci/level_opened"];
      },
      set(data) {
        this.$store.commit("loci/level_opened", data);
      }
    },
    level_closed: {
      get() {
        return this.$store.getters["loci/level_closed"];
      },
      set(data) {
        this.$store.commit("loci/level_closed", data);
      }
    },
    locus_above: {
      get() {
        return this.$store.getters["loci/locus_above"];
      },
      set(data) {
        this.$store.commit("loci/locus_above", data);
      }
    },
    locus_below: {
      get() {
        return this.$store.getters["loci/locus_below"];
      },
      set(data) {
        this.$store.commit("loci/locus_below", data);
      }
    },
    locus_co_existing: {
      get() {
        return this.$store.getters["loci/locus_co_existing"];
      },
      set(data) {
        this.$store.commit("loci/locus_co_existing", data);
      }
    },
    description: {
      get() {
        return this.$store.getters["loci/description"];
      },
      set(data) {
        this.$store.commit("loci/description", data);
        this.handleNextButton();
      }
    },

    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) {
        return errors;
      }
      !this.$v.description.required &&
        errors.push("Locus description is required");
      return errors;
    },

    deposit: {
      get() {
        return this.$store.getters["loci/deposit"];
      },
      set(data) {
        this.$store.commit("loci/deposit", data);
      }
    },
    registration_notes: {
      get() {
        return this.$store.getters["loci/registration_notes"];
      },
      set(data) {
        this.$store.commit("loci/registration_notes", data);
      }
    },
    clean: {
      get() {
        return this.$store.getters["loci/clean"];
      },
      set(data) {
        this.$store.commit("loci/clean", data);
      }
    }
  },
  methods: {
    submitForm() {
      console.log(
        "submit newItem.data: " +
          JSON.stringify(this.$store.getters["loci/newItem"], null, 2)
      );

      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Validation error");
      } else {
        console.log("validation passed - before store dispatch");
        this.$store.dispatch("mgr/store", this.$router).then(res => {
          this.step = 1;
          //this.$router.push({ path: `/loci/${res.data.item.id}/show` });
        });
      }
    },
    handleNextButton() {
      this.$v.$touch();
      this.$store.commit("stp/disableNextButton", this.$v.$invalid);
    }
  }
};
</script>
