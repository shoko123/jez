<template>
  <v-row wrap>
    <v-chip
      v-for="(item, index) in chunk"
      :key="index"
      :disabled="disabledChips(item)"
      class="font-weight-normal ma-2 body-1"
      @click="goTo(item)"
      >{{ item.tag }}</v-chip
    >
  </v-row>
</template>

<script>
export default {
  props: {
    source: String,
    page: Number,
  },

  computed: {
    chunk() {
      return this.$store.getters["mgr/collections"](this.source).chunk;
    },
  },

  methods: {
    disabledChips(item) {
      if (this.source !== "related") {
        return false;
      }
      if (this.$store.getters["mgr/module"] === "Locus")
        switch (item.findable_type) {
          case "Stone":
          case "Pottery":
          case "Lithic":
          case "Glass":
          case "Metal":
            return false;
          default:
            return true;
        }
      else {
        return false;
      }
    },

    goTo(item) {
      //console.log(`goTo() source: ${this.source} newUrl: ${newUrl}`);
      let current = this.$store.getters["mgr/module"],
        module,
        dot;
      if (this.source === "main") {
        module = current;
        dot = item.dot;
      } else {
        //related
        switch (current) {
          case "Area":
          case "Season":
            module = "AreaSeason";
            dot = item.dot;
            break;
          case "AreaSeason":
            module = "Locus";
            dot = item.dot;
            break;
          case "Locus":
            module = item.findable_type;
            dot = item.dot;
            break;
        }
      }

      this.$store.dispatch("mgr/goToRoute", {
        module: module,
        action: "show",
        dot: dot,
      });
    },
  },
};
</script>

