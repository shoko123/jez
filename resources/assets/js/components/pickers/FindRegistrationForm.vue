<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="px-2">
        <areaSeasonPicker />
      </v-flex>
      <template v-if="area">
        <v-flex xs12 sm6 class="px-2">
          <locusPicker />
        </v-flex>
      </template>
    </v-layout>

    <template v-if="locus">
      <v-layout row wrap>
        <v-flex xs12 sm12 class="px-2">
          <findPicker />
        </v-flex>
      </v-layout>

      <v-layout>
        <v-btn flat @click.native="cancel">Cancel</v-btn>
        <v-btn @click="next" :disabled="!enableButton" color="primary">Continue</v-btn>
      </v-layout>
    </template>
  </div>
</template>

<script>
import areaSeasonPicker from "../pickers/areaSeasonPicker";
import locusPicker from "../pickers/locusPicker";
import findPicker from "../pickers/findPicker";
export default {
  components: { areaSeasonPicker, locusPicker, findPicker },
  created() {
    console.log("FindRegistrationForm.created");
  },
  destroyed() {
    console.log("FindRegistrationForm.destroyed");
  },

  data() {
    return {};
  },

  computed: {
    area() {
      return this.$store.getters["pkr/area"];
    },
    locus() {
      return this.$store.getters["pkr/locus"];
    },
    step: {
      get() {
        return this.$store.getters["stp/step"];
      },
      set(data) {
        this.$store.commit("stp/step", data);
      }
    },
    enableButton() {
      return this.$store.getters["pkr/item"];
    }
  },

  methods: {
    next(scope) {
      console.log("next()");
      //validate
      this.$store.commit("fnd/copyRegistrationDetails", {
        findable_type: this.$store.getters["mgr/status"].moduleItemName,
        locus_id: this.$store.getters["pkr/locus"].id,
        registration_category: this.$store.getters["pkr/registration_category"],
        basket_no: this.$store.getters["pkr/basket_no"],
        item_no: this.$store.getters["pkr/item_no"]
      });
      this.step++;
      return;

      //console.log("LocusRegistrationForm Errors: " + JSON.stringify(this.errors));
      // alert("Correct them errors!");
    },
    cancel() {
      console.log("cancel");
      //this.$store.commit("fnd/clear", null);
      this.$router.go(-1);
    },
  }
};
</script>
