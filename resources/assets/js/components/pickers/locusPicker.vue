<template>
  <v-select
    label="locus no"
    :items="loci"
    v-model="locus"
    item-text="locus_no"
    return-object
    name="locus no"
    single-line
    box
    @change="locusSelected"
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
    loci() {
      return this.$store.getters["pkr/loci"];
    },
    locus: {
      get() {
        return this.$store.getters["pkr/locus"];
        //return { locus_id: this.$store.getters["pkr/locus_id"], locus_no: this.$store.getters["pkr/locus_no"]};
      },
      set(data) {
        if (this.isNewLocus) {
          this.$store.commit("pkr/locus_no", data.locus_no);
        } else {
          this.$store.commit("pkr/locus_id", data.locus_id);
        }
      }
    },
    isNewLocus() {
      return (
        this.$store.getters["mgr/isLocus"] &&
        this.$store.getters["mgr/isCreate"]
      );
    }
  },
  methods: {
    locusSelected() {
      console.log("locus selected");
      this.$store.dispatch("pkr/locusSelected");
    }
  }
};
</script>
