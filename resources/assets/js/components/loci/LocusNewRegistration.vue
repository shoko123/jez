<template>
  <form data-vv-scope="locus-registration">
    <v-container grid-list-md text-xs-center class="ma-0 pa-0">
      <v-layout row wrap>
        <v-flex xs4>
          <v-layout row wrap>
            <v-flex xs12 sm6 class="px-1">
              <v-select
                label="area"
                :items="areas"
                v-model="area_id"
                name="area tag"
                item-text="tag"
                item-value="id"
                single-line
                box
                @change="areaSelected"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6 class="px-1">
              <v-select
                label="locus no"
                :items="loci"
                v-model="locus_id"
                v-validate="'required'"
                :error-messages="errors.collect('locus-registration.locus_id')"
                name="locus_no"
                item-text="locus"
                item-value="id"
                single-line
                box
                @change="locusSelected"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <v-layout>
      <v-btn flat @click.native="cancel">Cancel</v-btn>
      <v-btn @click="next" :disabled="!enableNextButton" color="primary">Continue</v-btn>
    </v-layout>
  </form>
</template>

<script>
export default {
  created() {
    console.log("LocusNewRegistration.created");
    this.areaSelected(this.area_id);
    this.locusSelected(this.locus_id);
  },
  destroyed() {
    console.log("LocusNewRegistration.destroyed");
  },

  data() {
    return {
    };
  },

  computed: {
    isCreate() {
      return this.$store.getters["mgr/isCreate"];
    },

    step: {
      get() {
        return this.$store.getters["stp/step"];
      },
      set(data) {
        this.$store.commit("stp/step", data);
      }
    },

    areas() {
      return this.$store.getters["fnd/areas"];
    },
    loci() {
      //loci are read from DB at areaSelected();
      return this.$store.getters["fnd/loci"];
    },



    area_id: {
      get() {
        return this.$store.getters["fnd/area_id"];
      },
      set(data) {
        this.$store.commit("fnd/area_id", data);
      }
    },
    locus_id: {
      get() {
        return this.$store.getters["fnd/locus_id"];
      },
      set(data) {
        this.$store.commit("fnd/locus_id", data);
      }
    },
  },

  methods: {
    areaSelected(id) {
      this.$store.dispatch("fnd/lociListForArea", id);
    },

    locusSelected(id) {
      
    },

    enableNextButton() {
      return true;
    },

    next(scope) {
      console.log("next()");
      return;

      //validate
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.step++;
          return;
        }
        console.log("Errors: " + JSON.stringify(this.errors));
        // alert("Correct them errors!");
      });
      ggg
    },
    cancel() {
      console.log("cancel");
      this.$store.commit("fnd/clear", null);
      this.$router.go(-1);
    }
  }
};
</script>
