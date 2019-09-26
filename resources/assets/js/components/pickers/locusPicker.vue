<template>
  <div>
    <template v-if="isCreateLocus">
      <v-select
        label="locus no"
        :items="locusNos"
        v-model="locus_no"
        name="locus no"
        single-line
        box
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
        single-line
        box
        @change="locusSelected"
      ></v-select>
    </template>
  </div>
</template>
</div>
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
    isCreateLocus() {
      return this.$store.getters["mgr/status"].isCreateLocus;
    },
    loci() {
      return this.$store.getters["pkr/loci"];
    },

    locusNos() {
      return this.$store.getters["pkr/locusNos"];
    },

    locus: {
      get() {
        return this.$store.getters["pkr/locus"];
      },
      set(data) {
        this.$store.commit("pkr/locus_id", data.id);
      }
    },
    locus_no: {
      get() {
        return this.$store.getters["pkr/locus_no"];
      },
      set(data) {
        this.$store.commit("pkr/locus_no", data);
      }
    }
    /*
    locus: {
      get() {
        return this.$store.getters["pkr/locus"];
      },
      set(data) {
        //if new locus:
        if (
          this.$store.getters["mgr/isLocus"] &&
          this.$store.getters["mgr/isCreate"]
        ) {
          //save locus_no
          this.$store.commit("pkr/locus_no", data.no);
        } else {
          //save locus_id
          this.$store.commit("pkr/locus_id", data.id);
        }
      }
    }
    */
  },
  methods: {
    locusSelected() {
      console.log("locus selected");
      this.$store.dispatch("pkr/locusSelected");
    }
  }
};
</script>
