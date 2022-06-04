<template>
  <form name="form">
    <v-container fluid>
      <v-row dense wrap fill-height>
        <v-col xs12 lg2>
          <v-text-field name="square" v-model="square" label="Square" filled></v-text-field>
          <v-spacer></v-spacer>
        </v-col>

        <v-col xs12 lg2>
          <v-text-field name="locus_above" v-model="locus_above" label="Locus Above" filled></v-text-field>
        </v-col>

        <v-col xs12 lg2>
          <v-text-field name="locus_below" v-model="locus_below" label="Locus Below" filled></v-text-field>
        </v-col>

        <v-col xs12 lg2>
          <v-text-field
            name="locus_co_existing"
            v-model="locus_co_existing"
            label="Co-Existing"
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
                label="Date Opened"
                prepend-icon="event"
                readonly
                filled
                v-on="on"
              ></v-text-field>
            </template>

            <v-date-picker v-model="date_opened">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="date_opened = null">Clear</v-btn>
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
                label="Date Closed"
                prepend-icon="event"
                readonly
                filled
                v-on="on"
              ></v-text-field>
            </template>

            <v-date-picker v-model="date_closed">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="date_closed = null">Clear</v-btn>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu2.save(date_closed)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row dense wrap fill-height>
        <v-col xs12 lg2>
          <v-text-field name="level_opened" v-model="level_opened" label="Level Opened" filled></v-text-field>
        </v-col>

        <v-col xs12 lg2>
          <v-text-field name="level_closed" v-model="level_closed" label="Level Closed" filled></v-text-field>
        </v-col>

        <v-col xs12 lg1>
          <v-text-field name="clean" v-model="clean" label="Clean" filled></v-text-field>
        </v-col>
      </v-row>

      <v-row dense wrap fill-height>
        <v-col xs12 lg12>
          <v-textarea
            name="description"
            v-model="description"
            :error-messages="descriptionErrors"
            label="Description"
            filled
            @input="$v.description.$touch()"
            @blur="$v.description.$touch()"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row dense wrap fill-height>
        <v-col xs12 lg12>
          <v-textarea name="deposit" v-model="deposit" label="Deposit" filled></v-textarea>
          <!--v-textarea v-model="deposit" label="deposit" filled></v-textarea-->
        </v-col>
      </v-row>
      <v-row dense wrap fill-height>
        <v-col xs12 lg12>
          <v-textarea
            name="registration_notes"
            v-model="registration_notes"
            label="Registration Notes"
            filled
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row wrap>
        <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
      </v-row>
    </v-container>
  </form>
</template>


<script>
import StepButtons from "../stepper/StepButtons";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  components: { StepButtons },

  data() {
    return {
      menu: null,
      menu2: null
    };
  },

  created() {
    console.log("LocusNew created");
  },

  validations: {
    description: { required,
      maxLength: maxLength(1000)
    },
  },

  computed: {
    locus() {
      return this.$store.getters["loci/newItem"];
    },    
    isCreate() {
      return this.$store.getters["mgr/status"].isCreate;
    },

    //new locus data
    square: {
      get() {
        return this.locus.square;
      },
      set(data) {
        this.$store.commit("loci/square", data);
      }
    },
    date_opened: {
      get() {
        return this.locus.date_opened
          ? new Date(this.locus.date_opened)
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
        return this.locus.date_closed
          ? new Date(this.locus.date_closed)
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
        return this.locus.level_opened;
      },
      set(data) {
        this.$store.commit("loci/level_opened", data);
      }
    },
    level_closed: {
      get() {
        return this.locus.level_closed;
      },
      set(data) {
        this.$store.commit("loci/level_closed", data);
      }
    },
    locus_above: {
      get() {
        return this.locus.locus_above;
      },
      set(data) {
        this.$store.commit("loci/locus_above", data);
      }
    },
    locus_below: {
      get() {
        return this.locus.locus_below;
      },
      set(data) {
        this.$store.commit("loci/locus_below", data);
      }
    },
    locus_co_existing: {
      get() {
        return this.locus.locus_co_existing;
      },
      set(data) {
        this.$store.commit("loci/locus_co_existing", data);
      }
    },
    description: {
      get() {
        return this.locus.description;
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
        !this.$v.description.maxLength && errors.push("Text length exceeds 1000 characters");
      return errors;
    },

    deposit: {
      get() {
        return this.locus.deposit;
      },
      set(data) {
        this.$store.commit("loci/deposit", data);
      }
    },
    registration_notes: {
      get() {
        return this.locus.registration_notes;
      },
      set(data) {
        this.$store.commit("loci/registration_notes", data);
      }
    },
    clean: {
      get() {
        return this.locus.clean;
      },
      set(data) {
        this.$store.commit("loci/clean", data);
      }
    }
  },
  methods: {
    nextClicked() {
      console.log(
        "locusNew.nextClicked() item: " +
          JSON.stringify(this.locus.newItem, null, 2)
      );

      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("locusNew.Validation error");
        this.$store.commit("stp/disableNextButton", true);
      } else {
        console.log("validation passed - before store dispatch");

        this.$store.dispatch("mgr/store", true);
      }
    },

    handleNextButton() {
      this.$v.$touch();
      this.$store.commit("stp/disableNextButton", !!this.$v.$invalid);
    }
  }
};
</script>
