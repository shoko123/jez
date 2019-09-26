<template>
<div>
  <v-layout row wrap>
    <v-flex xs12 sm6 class="px-2">
      <areaSeasonPicker />
    </v-flex>
    <template v-if="area">
      <v-flex xs12 sm6 class="px-2">
        <locusPicker />
      </v-flex>
    </template>
  </v-layout>
  <v-layout>
      <v-btn flat @click.native="cancel">Cancel</v-btn>
      <v-btn @click="next" :disabled="!enableNextButton" color="primary">Continue</v-btn>
    </v-layout>
  </div>
</template>

<script>
import areaSeasonPicker from "../pickers/areaSeasonPicker";
import locusPicker from "../pickers/locusPicker";

export default {
  components: { areaSeasonPicker, locusPicker },
  created() {
    console.log("LocusPickerForm.created");
  },
  destroyed() {
    console.log("LocusPickerForm.destroyed");
  },

  data() {
    return {
    };
  },

  computed: {

    enableNextButton(){
        return (this.$store.getters["pkr/locus_no"] !== null);     
    },
    area(){
        return this.$store.getters["pkr/area"];
    },
     step: {
      get() {
        return this.$store.getters["stp/step"];
      },
      set(data) {
        this.$store.commit("stp/step", data);
      }
    },
  },

  methods: {
    next(scope) {
      console.log("next()");

      //validate
        this.$store.commit("loc/copyRegistrationDetails", {area: this.$store.getters["pkr/area"], locus: this.$store.getters["pkr/locus_no"]});
        this.step++;
        return;
        
        //console.log("LocusRegistrationForm Errors: " + JSON.stringify(this.errors));
        // alert("Correct them errors!");


    },
    cancel() {
      console.log("cancel");
      //this.$store.commit("fnd/clear", null);
      this.$router.go(-1);
    }
  }
};
</script>
