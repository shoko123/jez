<template>
  <div>
    <template v-if="isCreateLocus">
      <v-select
        label="locus no"
        :items="locusNos"
        v-model="locus_no"
        name="locus no"
        filled
        @change="locusSelected"
      ></v-select>
    </template>

    <template v-else>
      <v-select
        label="locus no"
        :items="loci"
        v-model="locus"
        item-text="no"
        return-object
        name="locus no"
        filled
        @change="locusSelected"
      ></v-select>
    </template>
  </div>
</template>

<script>
export default {
  created() {
    console.log("ElementLocus.created");
  },
  destroyed() {
    console.log("ElementLocus.destroyed");
  },

  data() {
    return {};
  },

  computed: {
    isCreateLocus() {
      return this.$store.getters["mgr/status"].isCreateLocus;
    },
    loci() {
      return this.$store.getters["reg/areaSeasonLoci"];
    },

    locusNos() {
      return this.$store.getters["reg/locusNos"];
    },

    locus: {
      get() {
        return this.$store.getters["reg/locus"];
      },
      set(data) {
        this.$store.commit("reg/locus_id", data.id);
      }
    },
    locus_no: {
      get() {
        return this.$store.getters["reg/locus_no"];
      },
      set(data) {
        this.$store.commit("reg/locus_no", data);
      }
    }
  },
  methods: {
    locusSelected() {
      console.log("locus selected");
      this.$store.dispatch("reg/locusSelected");
    }
  }
};
</script>
