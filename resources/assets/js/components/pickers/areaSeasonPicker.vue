<template>
  <v-select
    label="season/area"
    :items="areasSeasons"
    v-model="areaSeason"
    name="area season"
    item-text="tag"
    item-value="id"
    return-object
    single-line
    box
    @change="areaSeasonSelected"
  ></v-select>
</template>
<script>
export default {
  created() {
    console.log("AreaSeasonPicker.created");
  },
  destroyed() {
    console.log("AreaSeasonPicker.destroyed");
  },

  data() {
    return {};
  },

  computed: {
    isCreate() {
      return this.$store.getters["mgr/isCreate"];
    },

    areasSeasons() {
      return this.$store.getters["pkr/areasSeasons"];
    },

    areaSeason: {
      get() {
        return this.$store.getters["pkr/areaSeason"];
      },
      set(data) {
        this.$store.commit("pkr/areaSeason", data);
      }
    },
    area_season_id: {
      get() {
        return this.$store.getters["pkr/area_season_id"];
      },
      set(data) {
        this.$store.commit("pkr/area_season_id", data);
      }
    },
    locus_id: {
      get() {
        return this.$store.getters["pkr/locus_id"];
      },
      set(data) {
        this.$store.commit("pkr/locus_id", data);
      }
    },

    loci() {
      return this.$store.getters["pkr/loci"];
    }
  },

  methods: {
    areaSeasonSelected() {
      console.log("area season selected");
      this.$store.dispatch("pkr/areaSeasonSelected")
      //if(isCreate) {
      //this.$store.dispatch("pkr/areaSeasonLoci");
      //}
    },
    locusSelected() {
      console.log("locus selected");
    }
  }
};
</script>
