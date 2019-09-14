<template>
  <div>
    <template v-if="newLocus">
      <form>
        <v-text-field
          label="Locus no"
          v-model="locus_no"
          v-validate="'required|between:1,999'"
          :error-messages="errors.collect('locus_no')"
          name="locus_no"
          box
          @change="locusNumberChanged"
        ></v-text-field>
      </form>
    </template>
    <template v-else>
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
  </div>
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

    locus: {
      get() {
        return this.$store.getters["pkr/locus"];
      },
      set(data) {
        this.$store.commit("pkr/locus", data);
      }
    },
    locus_id: {
      get() {
        return this.$store.getters["pkr/locus_id"];
      },
      set(data) {
        this.$store.commit("pkr/locus_id", data);
      }
    },
    locus_no: {
      get() {
        return this.$store.getters["pkr/locus_no"];
      },
      set(data) {
        this.$store.commit("pkr/locus_no", data);
      }
    },
    newLocus() {
      return (this.isCreate && this.$store.getters["mgr/moduleItemName"] === "Locus");
    },
    
    loci() {
      return this.$store.getters["pkr/loci"];
    }
  },

  methods: {
    locusSelected() {
      console.log("locus selected");
      this.$store.dispatch("pkr/locusSelected");
    },
    locusNumberChanged() {
      console.log("locus number changed");
      this.$validator.validateAll().then(result => {
        if (result) {
          console.log("validation OK");
          return;
        }
        console.log("Validation failed Errors: " + JSON.stringify(this.errors));
        // alert("Correct them errors!");
      });
      //this.$store.dispatch("pkr/locusSelected");
    },
  }
};
</script>
