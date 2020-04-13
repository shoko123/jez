<template>
  <form>
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
  </form>
</template>

<script>
import ElementAreaSeason from "../registration/ElementAreaSeason";
import ElementLocus from "../registration/ElementLocus";

export default {
  components: { ElementAreaSeason, ElementLocus },

  mounted() {
    this.$root.$on("stepperNextClicked", () => {
      console.log("RegistrationNewLocus NextClicked Event");
      this.next();
    });
  },

  created() {
    console.log("RegistrationNewLocus.created");
    this.updateDisabledNextButton();
  },

  destroyed() {
    console.log("RegistrationNewLocus.destroyed");
  },

  computed: {
    regs() {
      return this.$store.getters["regs/regs"];
    },

    areaSeason() {
      return this.regs.areaSeason;
    },
  },


  methods: {
   
  }
};
</script>
