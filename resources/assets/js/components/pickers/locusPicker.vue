<template>
  <v-select
    label="locus no"
    :items="loci"
    v-model="locus"
    item-text="locus_no"
    item-value="locus_id"
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
    isCreate() {
      return this.$store.getters["mgr/isCreate"];
    },

    areasSeasons() {
      return this.$store.getters["pkr/areasSeasons"];
    },

    areaSeason() {
      return this.$store.getters["pkr/areaSeason"];
    },

    area_season_id: {
      get() {
        return this.$store.getters["pkr/area_season_id"];
      },
      set(data) {
        this.$store.commit("pkr/area_season_id", data);
      }
    },
    locus: {
      get() {
        return this.$store.getters["pkr/locus"];
      },
      set(data) {
        this.$store.commit("pkr/locus", data);
      }
    },

    loci() {
      return this.$store.getters["pkr/loci"];
    }
  },

  methods: {
    locusSelected() {
      console.log("locus selected");
      this.$store.dispatch("pkr/locusSelected")
    }
  }
};
</script>
