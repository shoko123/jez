<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="px-2">
        <ElementAreaSeason />
      </v-flex>
      <template v-if="area">
        <v-flex xs12 sm6 class="px-2">
          <ElementLocus />
        </v-flex>
      </template>
    </v-layout>
    <v-layout>
      <v-btn text @click.native="cancel">Cancel</v-btn>
      <v-btn @click="next" :disabled="disabled" color="primary">Continue</v-btn>
    </v-layout>
  </div>
</template>

<script>
import ElementAreaSeason from "../registration/ElementAreaSeason";
import ElementLocus from "../registration/ElementLocus";

export default {
  components: { ElementAreaSeason, ElementLocus },
  created() {
    console.log("RegistrationNewLocus.created");
  },
  destroyed() {
    console.log("RegistrationNewLocus.destroyed");
  },


  computed: {
    disabled() {
      return this.$store.getters["reg/locus_no"] == null;
    },
    area() {
      return this.$store.getters["reg/area"];
    },
    step: {
      get() {
        return this.$store.getters["stp/step"];
      },
      set(data) {
        this.$store.commit("stp/step", data);
      }
    }
  },

  methods: {
    next(scope) {
      console.log("next()");
      this.$store.dispatch("reg/copyRegistration");
      /*
      this.$store.commit("loci/copyRegistrationDetails", {
        area: this.$store.getters["reg/area"],
        locus: this.$store.getters["reg/locus_no"]
      });
      */
      this.step++;
    },
    cancel() {
      console.log("cancel");
      //this.$store.commit("fnd/clear", null);
      this.$router.go(-1);
    }
  }
};
</script>
