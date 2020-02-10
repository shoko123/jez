<template>
  <div v-if="registration">
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

    <template v-if="locus">
      <v-layout row wrap>
        <v-flex xs12 sm12 class="px-2">
          <ElementFind />
        </v-flex>
      </v-layout>

      <v-layout>
        <v-btn text @click.native="cancel">Cancel</v-btn>
        <v-btn @click="next" :disabled="disableButton" color="primary">Continue</v-btn>
      </v-layout>
    </template>
  </div>
</template>

<script>
import ElementAreaSeason from "./ElementAreaSeason";
import ElementLocus from "./ElementLocus";
import ElementFind from "./ElementFind";
export default {
  components: { ElementAreaSeason, ElementLocus, ElementFind },
  created() {
    console.log("RegistrationNewFind.created");
  },
  destroyed() {
    console.log("RegistrationNewFind.destroyed");
  },

  data() {
    return {};
  },

  computed: {
    registration() {
      return this.$store.getters["reg/registration"];
    },
    area() {
      return this.registration.area;
    },
    locus() {
      return this.registration.locus;
    },
    step: {
      get() {
        return this.$store.getters["stp/step"];
      },
      set(data) {
        this.$store.commit("stp/step", data);
      }
    },
    disableButton() {
      return !this.registration.isReady;
    }
  },

  methods: {
    next(scope) {
      console.log("next()");
      this.$store.dispatch("reg/copyRegistration");
      this.step++;
      return;
    },
    
    cancel() {
      console.log("cancel");
      //this.$store.commit("fnd/clear", null);
      this.$router.go(-1);
    },
  }
};
</script>
