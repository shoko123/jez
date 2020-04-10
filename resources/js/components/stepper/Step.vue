<template>
  <v-container fluid>
    <v-card class="mx-auto elevation-12">
      <!--v-card-title class="orange py-0">{{headerMessage}}</v-card-title-->
      <v-card-text>
        <slot name="stepForm"></slot>
      </v-card-text>
      
    </v-card>
  </v-container>
</template>

<script>
//import RegistrationNewLocus from "../registration/RegistrationNewLocus";


export default {
  name: "step",

/*
  components: {
    RegistrationNewLocus,
    RegistrationNewFind,
    LocusNew,
    FindNew,
    StoneNew
  },
  */
  created() {
    //console.log("step.created()");
  },
  destroyed() {
    //console.log("step.destroyed()");
  },
  data() {
    return {};
  },

  computed: {
    stepArray() {
      return this.$store.getters["stp/steps"];
    },
    n() {
      return this.stepArray.length;
    },

    headerMessage() {
      return this.$store.getters["stp/header"];
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
  methods: {}
};
</script>

