<template>
  <div>
    <v-btn text color="orange" @click="prevClicked" :disabled="step === 1">prev</v-btn>
    <v-btn color="orange" @click="nextClicked" :disabled="nextButtonIsDisabled">{{nextButtonText}}</v-btn>
    <v-btn text color="orange" @click="cancel">cancel</v-btn>
  </div>
</template>

<script>
export default {
  computed: {
    step: {
      get() {
        return this.$store.getters["stp/step"];
      },
      set(data) {
        this.$store.commit("stp/step", data);
      },
    },
    n() {
      return this.stepArray.length;
    },

    nextButtonText() {
      return this.step === this.$store.getters["stp/steps"].length
        ? "submit"
        : "next";
    },

    nextButtonIsDisabled() {
      return this.$store.getters["stp/nextButtonIsDisabled"];
    },
  },

  methods: {
    nextClicked() {
      console.log("stepButtons.next()");
      this.$emit("nextClicked", null);
    },
    prevClicked() {
      console.log("stepButtons.prev()");
      this.$store.commit("stp/moveToStep", "prev");
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

