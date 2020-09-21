<template>
  <form name="item">
    <v-container fluid>
      <v-row class="mb-1">
        <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
      </v-row>

      <v-row wrap no-gutters>
       
          <v-text-field
            label="Periods"
            v-model="periods"
            filled
          ></v-text-field>
      
      </v-row>
      <v-row wrap no-gutters>
        <v-textarea
          label="description"
          v-model="description"
          filled
        ></v-textarea>
      </v-row>
    </v-container>
  </form>
</template>


<script>
import StepButtons from "../stepper/StepButtons";
import { required } from "vuelidate/lib/validators";

export default {
  components: { StepButtons },

  validations: {
  },
  data: () => ({}),

  computed: {
    item() {
      return this.$store.getters["pot/newItem"];
    },

    periods: {
      get() {
        return this.item.periods;
      },
      set(data) {
        this.$store.commit("pot/periods", data);
      },
    },  

    description: {
      get() {
        return this.item.description;
      },
      set(data) {
        this.$store.commit("pot/description", data);
      },
    },
  },

  methods: {
    nextClicked() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("itemNew.Validation error");
        this.$store.commit("stp/disableNextButton", true);
      } else {
        this.$store.dispatch("mgr/store", true)
        .then((res) => {
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


