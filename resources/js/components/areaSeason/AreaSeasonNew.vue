<template>
  <form>
    <v-container fluid>
      <v-row class="mb-2">
        <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
      </v-row>
      <v-row wrap no-gutters>
        <v-textarea
          label="Summary"
          v-model="summary"
          :error-messages="summaryErrors"
          @input="$v.summary.$touch()"
          @blur="$v.summary.$touch()"
          class="mr-1"
          filled
        ></v-textarea>
        <v-textarea
          label="Description"
          v-model="description"
          :error-messages="descriptionErrors"
          @input="$v.description.$touch()"
          @blur="$v.description.$touch()"
          class="mr-1"
          filled
        ></v-textarea>
      </v-row>
    </v-container>
  </form>
</template>


<script>
import StepButtons from "../stepper/StepButtons";
import { maxLength } from "vuelidate/lib/validators";

export default {
  components: { StepButtons },

  validations: {
    description: {
      maxLength: maxLength(2000),
    },
    summary: {
      maxLength: maxLength(1000),
    },
  },

  computed: {
    item() {
      return this.$store.getters["arsn/newItem"];
    },

    description: {
      get() {
        return this.item.description;
      },
      set(data) {
        this.$store.commit("arsn/description", data);
        this.handleNextButton();
      },
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) {
        return errors;
      }
      !this.$v.description.maxLength &&
        errors.push("Description exceeds length of 2000 characters");
      return errors;
    },

    summary: {
      get() {
        return this.item.summary;
      },
      set(data) {
        this.$store.commit("arsn/summary", data);
        this.handleNextButton();
      },
    },
    summaryErrors() {
      const errors = [];
      if (!this.$v.summary.$dirty) {
        return errors;
      }
      !this.$v.summary.maxLength &&
        errors.push("summary exceeds length of 1000 characters");
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


