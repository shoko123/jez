<template>
  <v-select
    label="season/area"
    :items="areasSeasons"
    v-model="area_season_id"
    name="area season"
    item-text="tag"
    item-value="id"
    single-line
    box
    @change="areaSeasonSelected"
  ></v-select>
</template>
<script>
export default {
  computed: {
    areasSeasons() {
      return this.$store.getters["pkr/areasSeasons"];
    },

    area_season_id: {
      get() {
        return this.$store.getters["pkr/area_season_id"];
      },
      set(data) {
        this.$store.commit("pkr/area_season_id", data);
      }
    },
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
