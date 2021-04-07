<template>
  <v-row wrap>
    <v-chip
      v-for="(item, index) in items"
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
    items: Array,
    start: Number,
  },

  computed: {},

  methods: {
    disabledChips(item) {
      if (this.source !== "related") {
        return false;
      }
      if (this.getters["mgr/module"] === "Locus")
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
        id;
      if (this.source === "main") {
        module = current;
        id = item.id;
      } else {
        //related
        switch (current) {
          case "Area":
          case "Season":
            module = "AreaSeason";
            id = item.id;
            break;
          case "AreaSeason":
            module = "Locus";
            id = item.id;
            break;
          case "Locus":
            module = item.findable_type;
            id = item.findable_id;
            break;
        }
      }

      this.$store.dispatch("mgr/goToRoute", {
        module: module,
        action: "show",
        id: id,
      });
    },
  },
};
</script>

