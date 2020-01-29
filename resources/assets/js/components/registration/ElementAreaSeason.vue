<template>
  <div v-if="registration">
    <v-select
      label="season/area"
      :items="areasSeasons"
      v-model="area"
      name="area season"
      item-text="tag"
      return-object
      filled
      @change="areaSeasonSelected()"
    ></v-select>
  </div>
</template>
<script>
export default {
  computed: {
    registration() {
      return this.$store.getters["reg/registration"];
    },
    areasSeasons() {
      return this.registration.areasSeasons;
    },
    area: {
      get() {
        return this.registration.area;
      },
      set(data) {
        this.$store.commit("reg/area_season_id", data.id);
      }
    }
  },

  methods: {
    areaSeasonSelected() {
      this.$store.dispatch("reg/areaSeasonSelected");
    },
    locusSelected() {
      console.log("locus selected");
    }
  }
};
</script>
