<template>
  <div v-if="regs">
    <v-select
      label="season/area"
      :items="areasSeasons"
      v-model="areaSeason"
      name="area season"
      item-text="tag"
      return-object
      filled
    ></v-select>
  </div>
</template>

<script>

export default {
  computed: {
    regs() {
      return this.$store.getters["regs/regs"];
    },

    areasSeasons() {
      return this.regs.areasSeasons;
    },

    areaSeason: {
      get() {
        return this.regs.areaSeason;
      },
      set(data) {
        this.$store.dispatch("regs/areaSeasonSelected", data);
      }
    }
  }
};
</script>
