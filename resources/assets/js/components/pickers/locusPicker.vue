<template>
  <v-select
    label="locus no"
    :items="loci"
    v-model="locus"
    item-text="no"
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
    console.log("LocusSeasonPicker.created");
  },
  destroyed() {
    console.log("LocusSeasonPicker.destroyed");
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
      },
      set(data) {
        //if new locus:
        if (this.$store.getters["mgr/isLocus"] && this.$store.getters["mgr/isCreate"]) {
          //save locus_no
          this.$store.commit("pkr/locus_no", data.no);
        } else {
          //save locus_id
          this.$store.commit("pkr/locus_id", data.id);
        }
      }
    },
  },
  methods: {
    locusSelected() {
      console.log("locus selected");
      this.$store.dispatch("pkr/locusSelected");
    }
  }
};
</script>
