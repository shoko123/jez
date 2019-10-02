<template>
  <v-select
    label="season/area"
    :items="areasSeasons"
    v-model="area"
    name="area season"
    item-text="tag"
    return-object
    filled
    @change="areaSeasonSelected"
  ></v-select>
</template>
<script>
export default {
  computed: {
    areasSeasons() {
      return this.$store.getters["pkr/areasSeasons"];
    },

    area: {
      get() {
        return this.$store.getters["pkr/area"];
      },
      set(data) {
        this.$store.commit("pkr/area_season_id", data.id);
      }
    },
  },

  methods: {
    areaSeasonSelected() {
      console.log("area season selected");
      this.$store.dispatch("pkr/areaSeasonSelected")
    },
    locusSelected() {
      console.log("locus selected");
    }
  }
};
</script>
