<template>
  <div>
    <v-btn text color="orange">prev</v-btn>
    <v-btn color="orange" @click="next" :disabled="disableNextButton">Next</v-btn>
    <v-btn text color="orange" @click="cancel">Cancel</v-btn>
  </div>
</template>

<script>
export default {
  name: "stepButtons",

  created() {
    //console.log("stepper.created()");
  },
  destroyed() {
    //console.log("stepper.destroyed()");
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
    },
    disableNextButton() {
      return this.$store.getters["stp/disableNextButton"];
    }
  },

  methods: {
    next() {
      console.log("stepButtons.next()");
      this.$store.commit("stp/disableNextButton", true);
      this.$root.$emit("stepperNextClicked", this.step);
    },

    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

