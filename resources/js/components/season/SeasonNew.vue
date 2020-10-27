<template>
  <form>
    <v-container fluid>
      <v-row class="mb-2">
        <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
      </v-row>
      <v-row wrap no-gutters>
        <v-textarea
          label="Description"
          v-model="description"
          :error-messages="descriptionErrors"
          @input="$v.description.$touch()"
          @blur="$v.description.$touch()"
          class="mr-1"
          filled
        ></v-textarea>

        <v-textarea
          label="Dtaff"
          v-model="staff"
          :error-messages="staffErrors"
          @input="$v.staff.$touch()"
          @blur="$v.staff.$touch()"
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
    staff: {
      maxLength: maxLength(1000),
    },
  },

  computed: {
    item() {
      return this.$store.getters["season/newItem"];
    },

    description: {
      get() {
        return this.item.description;
      },
      set(data) {
        this.$store.commit("season/description", data);
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

    staff: {
      get() {
        return this.item.staff;
      },
      set(data) {
        this.$store.commit("season/staff", data);
        this.handleNextButton();
      },
    },
    staffErrors() {
      const errors = [];
      if (!this.$v.staff.$dirty) {
        return errors;
      }
      !this.$v.staff.maxLength &&
        errors.push("Staff exceeds length of 1000 characters");
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


