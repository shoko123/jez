<template>
  <div>
    <v-row wrap>
      <v-col xs12 sm6 class="px-2">
        <ElementAreaSeason />
      </v-col>
      <template v-if="areaSeason">
        <v-col xs12 sm6 class="px-2">
          <ElementLocus />
        </v-col>
      </template>
    </v-row>
    <v-row>
      <v-btn text @click.native="cancel">Cancel</v-btn>
      <v-btn @click="next" :disabled="disabled" color="primary">Continue</v-btn>
    </v-row>
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
    areaSeason() {
      return this.$store.getters["reg/areaSeason"];
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
