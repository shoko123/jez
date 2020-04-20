<template>
  <div v-if="areasSeasons">
    <v-select
      label="season/area"
      :items="areasSeasons"
      v-model="areaSeason"
      name="area season"
      item-text="tag"
      item-value="id"
      return-object
      filled
    ></v-select>
  </div>
</template>

<script>
export default {
  
  created() {

  },
  computed: {
    regs() {
      return this.$store.getters["regs/regs"];
    },

    areasSeasons() {
      return this.$store.getters["regs/regs"].areasSeasons;
    },
 
    areaSeason: {
      get() {
        return this.$store.getters["regs/regs"].areaSeason;
      },
      set(data) {
        this.$store.dispatch("regs/areaSeasonSelected", data);
      }
    }
  }
};
</script>
