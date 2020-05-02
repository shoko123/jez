<template>
  <form name="stone">
    <v-container fluid>

      <v-row wrap>
        <v-col xs12 sm6 class="px-1">
          <v-textarea label="notes" v-model="notes" name="notes" filled></v-textarea>
        </v-col>
        <v-col xs12 sm6 class="px-1">
          <v-textarea label="measurements" v-model="measurements" name="measurements" filled></v-textarea>
        </v-col>
      </v-row>

      <v-row wrap>
        <v-col xs12 sm2 class="px-1">
          <v-text-field label="weight" v-model="weight" name="weight" filled></v-text-field>
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

export default {
  components: { StepButtons },

  created() {
    //console.log("StoneNew created");
  },

  data: () => ({}),

  computed: {
 
    weight: {
      get() {
        return this.$store.getters["stones/weight"];
      },
      set(data) {
        this.$store.commit("stones/weight", data);
      }
    },
    notes: {
      get() {
        return this.$store.getters["stones/notes"];
      },
      set(data) {
        this.$store.commit("stones/notes", data);
      }
    },
    measurements: {
      get() {
        return this.$store.getters["stones/measurements"];
      },
      set(data) {
        this.$store.commit("stones/measurements", data);
      }
    },
  },

  methods: {
    nextClicked() {
      console.log(
        "StoneNew.nextClicked() item: " +
          JSON.stringify(this.$store.getters["loci/newItem"], null, 2)
      );

      this.$store.dispatch("mgr/store", this.$router).then(res => {
        this.$store.commit("stp/moveToStep", "first");
      });
    },

    handleNextButton() {
      this.$v.$touch();
      this.$store.commit("stp/disableNextButton", !!this.$v.$invalid);
    }
  }
};
</script>


