<template>
  <form v-if="find">
    <v-container grid-list-md text-xs-center class="ma-0 pa-0">
       <v-row>
        <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
      </v-row>
      <v-row wrap>
        <v-col xs12 sm1>
          <v-text-field v-model="square" label="square" filled></v-text-field>
        </v-col>
        <v-col xs12 sm2>
          <v-text-field
            label="related pottery"
            v-model="related_pottery_basket"
            name="related_pottery_basket"
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
        </v-col>
        <v-col xs12 sm2>
          <v-text-field v-model="level_top" label="level_top" filled></v-text-field>
        </v-col>
        <v-col xs12 sm2>
          <v-text-field v-model="level_bottom" label="level_bottom" filled></v-text-field>
        </v-col>

        <v-col xs12 sm1>
          <v-switch v-model="keep" label="keep"></v-switch>
          <!-- UNTIL FIXED IN FRAMEWORK v-checkbox v-model="keep" name="keep" label="keep" filled></v-checkbox-->
        </v-col>
      </v-row>
      <v-row wrap>
        <v-col xs12 sm4>
          <v-textarea
            label="find_description"
            v-model="find_description"
            name="find_description"
            filled
            :error-messages="find_descriptionErrors"
            @input="$v.find_description.$touch()"
            @blur="$v.find_description.$touch()"
          ></v-textarea>
        </v-col>

        <v-col xs12 sm4>
          <v-textarea class="pr-1" name="find_notes" v-model="find_notes" label="find_notes" filled></v-textarea>
        </v-col>
      </v-row>

     
    </v-container>
  </form>
</template>


<script>
import StepButtons from "../stepper/StepButtons";
import { required, integer, between, maxLength } from "vuelidate/lib/validators";

export default {
  components: { StepButtons },


  validations: {
    find_description: {
      maxLength: maxLength(400)
    },
    /*
    related_pottery_basket: {

      between: between(0, 99),
    }
    */
  },

  data: () => ({
    menu: false
  }),

  computed: {
    find() {
      return this.$store.getters["fnd/newItem"];
    },
    date: {
      get() {
        return this.find.date
          ? new Date(this.find.date)
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
        return this.find.related_pottery_basket;
      },
      set(data) {
        this.$store.commit("fnd/related_pottery_basket", data);
        this.handleNextButton();
      }
    },
    /*
    related_pottery_basketErrors() {
      const errors = [];
      if (!this.$v.related_pottery_basket.$dirty) {
        return errors;
      }
      !this.$v.related_pottery_basket.required &&
        errors.push("related pottery number must be between 1-99");
      return errors;
    },
  */
    square: {
      get() {
        return this.find.square;
      },
      set(data) {
        this.$store.commit("fnd/square", data);
      }
    },

    keep: {
      get() {
        return this.find.keep;
      },
      set(data) {
        this.$store.commit("fnd/keep", data);
      }
    },

    level_top: {
      get() {
        return this.find.level_top;
      },
      set(data) {
        this.$store.commit("fnd/level_top", data);
      }
    },

    level_bottom: {
      get() {
        return this.find.level_bottom;
      },
      set(data) {
        this.$store.commit("fnd/level_bottom", data);
      }
    },

    find_description: {
      get() {
        return this.find.find_description;
      },
      set(data) {
        this.$store.commit("fnd/find_description", data);
        this.handleNextButton();
      }
    },

    find_descriptionErrors() {
      const errors = [];
      if (!this.$v.find_description.$dirty) {
        return errors;
      }
      !this.$v.find_description.maxLength &&
        errors.push("description must be less than 400 characters");
      return errors;
    },

    find_notes: {
      get() {
        return this.find.find_notes;
      },
      set(data) {
        this.$store.commit("fnd/find_notes", data);
      }
    }
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
    }
  }
};
</script>
