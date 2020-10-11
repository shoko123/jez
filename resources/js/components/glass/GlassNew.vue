<template>
  <form>
    <v-container fluid>
      <v-row class="mb-1">
        <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
      </v-row>

      <v-row wrap no-gutters>
        <v-col xs12  lg2 class="px-1">
          <v-text-field
            label="Rim Diameter"
            v-model="rim_diameter"
            :error-messages="rim_diameterErrors"
            @input="$v.rim_diameter.$touch()"
            @blur="$v.rim_diameter.$touch()"
            filled
          ></v-text-field>
        </v-col>
        <v-col xs12  lg2 class="px-1">
          <v-text-field
            label="Base Diameter"
            v-model="base_diameter"
            :error-messages="base_diameterErrors"
            @input="$v.base_diameter.$touch()"
            @blur="$v.base_diameter.$touch()"
            filled
          ></v-text-field>
        </v-col>
        <v-col xs12  lg2 class="px-1">
          <v-text-field
            label="Bangle Diameter"
            v-model="bangle_diameter"
            :error-messages="bangle_diameterErrors"
            @input="$v.bangle_diameter.$touch()"
            @blur="$v.bangle_diameter.$touch()"
            filled
          ></v-text-field>
        </v-col>
        <v-col xs12  lg2 class="px-1">
          <v-text-field
            label="Bead Diameter"
            v-model="bead_diameter"
            :error-messages="bead_diameterErrors"
            @input="$v.bead_diameter.$touch()"
            @blur="$v.bead_diameter.$touch()"
            filled
          ></v-text-field>
        </v-col>
        <v-col xs12  lg2 class="px-1">
          <v-text-field
            label="Pontil Diameter"
            v-model="pontil_diameter"
            :error-messages="pontil_diameterErrors"
            @input="$v.pontil_diameter.$touch()"
            @blur="$v.pontil_diameter.$touch()"
            filled
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row wrap no-gutters>
        <v-textarea
          label="description"
          v-model="description"
          :error-messages="descriptionErrors"
          @input="$v.description.$touch()"
          @blur="$v.description.$touch()"
          filled
        ></v-textarea>
      </v-row>
    </v-container>
  </form>
</template>


<script>
import StepButtons from "../stepper/StepButtons";
import { maxLength, between } from "vuelidate/lib/validators";

export default {
  components: { StepButtons },

  validations: {
    rim_diameter: {
      between: between(1, 50000),
    },
    base_diameter: {
      between: between(1, 50000),
    },
    bangle_diameter: {
      between: between(1, 50000),
    },
    bead_diameter: {
      between: between(1, 50000),
    },
    pontil_diameter: {
      between: between(1, 50000),
    },
    description: {
      maxLength: maxLength(400),
    },
  },

  computed: {
    item() {
      return this.$store.getters["glass/newItem"];
    },

    rim_diameter: {
      get() {
        return this.item.rim_diameter;
      },
      set(data) {
        this.$store.commit("glass/rim_diameter", data);
        this.handleNextButton();
      },
    },
    rim_diameterErrors() {
      const errors = [];
      if (!this.$v.rim_diameter.$dirty) {
        return errors;
      }
      !this.$v.rim_diameter.between &&
        errors.push("rim_diameter must be between 1-50000");
      return errors;
    },

    base_diameter: {
      get() {
        return this.item.base_diameter;
      },
      set(data) {
        this.$store.commit("glass/base_diameter", data);
        this.handleNextButton();
      },
    },
    base_diameterErrors() {
      const errors = [];
      if (!this.$v.base_diameter.$dirty) {
        return errors;
      }
      !this.$v.base_diameter.between &&
        errors.push("base_diameter must be between 1-50000");
      return errors;
    },

    bangle_diameter: {
      get() {
        return this.item.bangle_diameter;
      },
      set(data) {
        this.$store.commit("glass/bangle_diameter", data);
        this.handleNextButton();
      },
    },

    bangle_diameterErrors() {
      const errors = [];
      if (!this.$v.bangle_diameter.$dirty) {
        return errors;
      }
      !this.$v.bangle_diameter.between &&
        errors.push("bangle_diameter must be between 1-50000");
      return errors;
    },

    bead_diameter: {
      get() {
        return this.item.bead_diameter;
      },
      set(data) {
        this.$store.commit("glass/bead_diameter", data);
        this.handleNextButton();
      },
    },
    bead_diameterErrors() {
      const errors = [];
      if (!this.$v.bead_diameter.$dirty) {
        return errors;
      }
      !this.$v.bead_diameter.between &&
        errors.push("bead_diameter must be between 1-50000");
      return errors;
    },

    pontil_diameter: {
      get() {
        return this.item.pontil_diameter;
      },
      set(data) {
        this.$store.commit("glass/pontil_diameter", data);
        this.handleNextButton();
      },
    },
    pontil_diameterErrors() {
      const errors = [];
      if (!this.$v.pontil_diameter.$dirty) {
        return errors;
      }
      !this.$v.pontil_diameter.between &&
        errors.push("pontil_diameter must be between 1-50000");
      return errors;
    },

    description: {
      get() {
        return this.item.description;
      },
      set(data) {
        this.$store.commit("glass/description", data);
        this.handleNextButton();
      },
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) {
        return errors;
      }
      !this.$v.description.maxLength &&
        errors.push("Description exceeds length of 400 characters");
      return errors;
    },
  },

  methods: {
    nextClicked() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("itemNew.Validation error");
        this.$store.commit("stp/disableNextButton", true);
      } else {
        this.$store.dispatch("mgr/store", true).then((res) => {
          this.$store.commit("stp/moveToStep", "first");
        });
      }
    },

    handleNextButton() {
      this.$v.$touch();
      this.$store.commit("stp/disableNextButton", !!this.$v.$invalid);
    },
  },
};
</script>

