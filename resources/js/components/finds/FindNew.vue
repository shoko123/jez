<template>
  <form v-if="find">
    <v-container fluid>
      <v-row>
        <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
      </v-row>
      <v-row wrap>
        <v-col xs12 sm1>
          <v-text-field
            v-model="square"
            :error-messages="squareErrors"
            @input="$v.square.$touch()"
            @blur="$v.square.$touch()"
            label="Square"
            filled
          ></v-text-field>
        </v-col>
        <v-col xs12 sm1>
          <v-text-field
            label="r/t PT"
            v-model="related_pottery_basket"
            :error-messages="related_pottery_basketErrors"
            @input="$v.related_pottery_basket.$touch()"
            @blur="$v.related_pottery_basket.$touch()"
            filled
          ></v-text-field>
        </v-col>

        <v-col xs12 sm2>
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
                label="Date"
                prepend-icon="event"
                readonly
                filled
                v-on="on"
              ></v-text-field>
            </template>

            <v-date-picker v-model="date">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="date = null">Clear</v-btn>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
        </v-col>

        <v-col xs12 sm2>
          <v-text-field
            v-model="level_top"
            label="Level-Top"
            filled
          ></v-text-field>
        </v-col>
        <v-col xs12 sm2>
          <v-text-field
            v-model="level_bottom"
            label="Level-Bottom"
            filled
          ></v-text-field>
        </v-col>

        <v-col xs12 sm1>
          <v-checkbox
            v-model="keep"
            name="keep"
            label="Keep"
            filled
          ></v-checkbox>
        </v-col>

        <v-col v-if="scopeIsBasket" xs12 sm1>
          <v-text-field
            v-model="artifact_count"
            name="artifact_count"
            label="Artifact Count"
            filled
            :error-messages="descriptionErrors"
            @input="$v.artifact_count.$touch()"
            @blur="$v.artifact_count.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row wrap>
        <v-col xs12 sm4>
          <v-textarea
            label="Description"
            v-model="description"
            name="description"
            filled
            :error-messages="descriptionErrors"
            @input="$v.description.$touch()"
            @blur="$v.description.$touch()"
          ></v-textarea>
        </v-col>

        <v-col xs12 sm4>
          <v-textarea
            class="pr-1"
            name="notes"
            v-model="notes"
            label="Notes"
            filled
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>


<script>
import StepButtons from "../stepper/StepButtons";
import {
  required,
  integer,
  between,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  components: { StepButtons },

  validations: {
    square: {
      maxLength: maxLength(16),
    },

    related_pottery_basket: {
      between: between(1, 99),
    },

    /*
    date: {
      between: (value) => {
        let min = new Date("2012-01-01");
        let max = new Date("2019-01-01");
        //console.log("min: " + min + " val: " + value + " passed: " + (value > min && value < max) ? "TRUE": "FALSE");
        return between(min, max);
      },
    },
  */
    level_top: {
      maxLength: maxLength(20),
    },
    level_bottom: {
      maxLength: maxLength(20),
    },
    notes: {
      maxLength: maxLength(400),
    },
    description: {
      maxLength: maxLength(400),
    },
    artifact_count: {
      maxLength: maxLength(10),
    },
  },

  data: () => ({
    menu: false,
  }),

  computed: {
    find() {
      return this.$store.getters["fnd/newItem"];
    },

    scopeIsBasket() {
      return this.find.scopeIsBasket;
    },

    related_pottery_basket: {
      get() {
        return this.find.related_pottery_basket;
      },
      set(data) {
        this.$store.commit("fnd/related_pottery_basket", data);
        this.handleNextButton();
      },
    },
    related_pottery_basketErrors() {
      const errors = [];
      if (!this.$v.related_pottery_basket.$dirty) {
        return errors;
      }
      !this.$v.related_pottery_basket.between &&
        errors.push("Related pottery basket must be between 1-99.");
      return errors;
    },

    square: {
      get() {
        return this.find.square;
      },
      set(data) {
        this.$store.commit("fnd/square", data);
        this.handleNextButton();
      },
    },
    squareErrors() {
      const errors = [];
      if (!this.$v.square.$dirty) {
        return errors;
      }
      !this.$v.square.maxLength && errors.push("Square name is too long.");
      return errors;
    },

    date: {
      get() {
        return this.find.date
          ? new Date(this.find.date).toISOString().substr(0, 10)
          : "";
      },
      set(data) {
        this.$store.commit("fnd/date", data);
        this.handleNextButton();
      },
    },
    /*
    dateErrors() {
      const errors = [];
      if (!this.$v.date.$dirty) {
        return errors;
      }
      !this.$v.date.between && errors.push("Date must be between 2012-2018");
      return errors;
    },
    */

    keep: {
      get() {
        return this.find.keep;
      },
      set(data) {
        this.$store.commit("fnd/keep", data);
      },
    },

    level_top: {
      get() {
        return this.find.level_top;
      },
      set(data) {
        this.$store.commit("fnd/level_top", data);
        this.handleNextButton();
      },
    },
    level_topErrors() {
      const errors = [];
      if (!this.$v.level_top.$dirty) {
        return errors;
      }
      !this.$v.level_top.maxLength &&
        errors.push("Top level value is too long.");
      return errors;
    },

    level_bottom: {
      get() {
        return this.find.level_bottom;
      },
      set(data) {
        this.$store.commit("fnd/level_bottom", data);
        this.handleNextButton();
      },
    },
    level_bottomErrors() {
      const errors = [];
      if (!this.$v.level_bottom.$dirty) {
        return errors;
      }
      !this.$v.level_bottom.maxLength &&
        errors.push("Bottom level value is too long.");
      return errors;
    },

    description: {
      get() {
        return this.find.description;
      },
      set(data) {
        this.$store.commit("fnd/description", data);
        this.handleNextButton();
      },
    },

    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) {
        return errors;
      }
      !this.$v.description.maxLength &&
        errors.push("Description must not exceed 400 characters");
      return errors;
    },

    notes: {
      get() {
        return this.find.notes;
      },
      set(data) {
        this.$store.commit("fnd/notes", data);
        this.handleNextButton();
      },
    },
    notesErrors() {
      const errors = [];
      if (!this.$v.notes.$dirty) {
        return errors;
      }
      !this.$v.notes.maxLength &&
        errors.push("Notes must be less than 400 characters");
      return errors;
    },

    artifact_count: {
      get() {
        return this.find.artifact_count;
      },
      set(data) {
        this.$store.commit("fnd/artifact_count", data);
        this.handleNextButton();
      },
    },
    artifact_countErrors() {
      const errors = [];
      if (!this.$v.artifact_count.$dirty) {
        return errors;
      }
      !this.$v.artifact_count.maxLength &&
        errors.push("artifact_count length must be less than 10 characters");
      return errors;
    },
  },

  methods: {
    nextClicked() {
      console.log("findNew nextClicked");
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("FindNew.Validation error");
        this.$store.commit("stp/disableNextButton", true);
      } else {
        console.log("validation passed - before next step");
        this.$store.commit("stp/moveToStep", "next");
      }
    },

    handleNextButton() {
      this.$v.$touch();
      this.$store.commit("stp/disableNextButton", !!this.$v.$invalid);
    },
  },
};
</script>
