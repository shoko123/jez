<template>
  <div v-if="regs">
    <template v-if="isCreateLocus">
      <v-select
        label="locus no"
        :items="locusNos"
        v-model="locus_no"
        name="locus no"
        filled
      ></v-select>
    </template>

    <template v-else>
      <v-select
        label="locus no"
        :items="loci"
        v-model="locus"
        item-text="locus_no"
        item-value="id"
        return-object
        name="locus no"
        filled
      ></v-select>
    </template>
  </div>
</template>

<script>
export default {
  created() {
    //console.log("ElementLocus.created");
  },
  destroyed() {
    //console.log("ElementLocus.destroyed");
  },

  data() {
    return {};
  },

  computed: {
    regs() {
      return this.$store.getters["regs/regs"];
    },

    isCreateLocus() {
      return (this.$store.getters["mgr/status"].isCreateLocus);
    },

    loci() {
      return this.regs.areaSeasonLoci;
    },

    locusNos() {
      return this.regs.locusNos;
    },

    locus: {
      get() {
         return this.$store.getters["regs/locus"];
      },
      set(data) {
        this.$store.dispatch("regs/locusSelected", data);
      }
    },
    locus_no: {
      get() {
         return this.$store.getters["regs/locus_no"];
      },
      set(data) {
        this.$store.dispatch("regs/locusNoSelected", data);
      }
    }
  },
};
</script>
