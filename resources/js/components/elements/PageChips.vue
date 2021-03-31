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
     start: Number
  },



  computed: {

  },

  methods: {
    disabledChips(item) {
      if (this.source !== "LocusFinds") {
        return false;
      }
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
    },

    goTo(item) {
      //console.log(`goTo() source: ${this.source} newUrl: ${newUrl}`);
      let module = null,
        id = null;
      switch (this.source) {
        case "Collection":
          module = this.$store.getters["mgr/module"];
          break;
        case "AreasSeasons":
          module = "AreaSeason";
          break;
        case "AreaSeasonLoci":
          module = "Locus";
          break;
        case "LocusFinds":
          module = item.findable_type;
          break;
      }

      switch (this.source) {
        case "Collection":
        case "AreasSeasons":
        case "AreaSeasonLoci":
          id = item.id;
          break;
        case "LocusFinds":
          id = item.findable_id;
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

