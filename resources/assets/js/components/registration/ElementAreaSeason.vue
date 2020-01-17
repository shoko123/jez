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
      return this.$store.getters["reg/areasSeasons"];
    },

    area: {
      get() {
        return this.$store.getters["reg/area"];
      },
      set(data) {
        this.$store.commit("reg/area_season_id", data.id);
      }
    },
  },

  methods: {
    areaSeasonSelected() {
      console.log("area season selected");
      this.$store.dispatch("reg/areaSeasonSelected")
    },
    locusSelected() {
      console.log("locus selected");
    }
  }
};
</script>
