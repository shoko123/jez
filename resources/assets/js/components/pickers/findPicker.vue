
<template>
  <div>
    <template v-if="isCreate">
      <findPickerNew />
    </template>
    <template v-else>
      <v-select
        label="find"
        :items="finds"
        v-model="find"
        item-text="id_string"
        return-object
        name="find"
        single-line
        box
        @change="findSelected"
        >
      </v-select>
    </template>
  </div>
</template>

    
    <!--v-flex xs12 md6 lg3 v-for="x in finds" :key="x.id">
      <v-btn @click="findSelected(x.id)">{{x.tag}}</v-btn>
    </v-flex-->



<script>

import findPickerNew from "./findPickerNew";
import findPickerExisting from "./findPickerExisting";

export default {
  components: { findPickerNew},
  created() {
    console.log("findPickerExisting.created()");
  },
  destroyed() {
    console.log("findPickerExisting.destroyed");
  },
  isCreate() {
      return this.$store.getters["mgr/isCreate"];
    },

  data() {
    return {};
  },

  computed: {
    isCreate() {
      return this.$store.getters["mgr/isCreate"];
    },

    find: {
      get() {
        return this.$store.getters["pkr/find"];
        //return { locus_id: this.$store.getters["pkr/locus_id"], locus_no: this.$store.getters["pkr/locus_no"]};
      },
      set(data) {
        this.$store.commit("pkr/findable_id", data.id);
      }
    },
    finds() {
      return this.$store.getters["pkr/finds"];
    }
  },
  methods: {
    findSelected(id) {
      //this.dialog = false;
      //let path = '/' + this.moduleBaseURL + '/' + this.locus_id + '/show';
      console.log('findPicker.vue find: ' + JSON.stringify(this.find, null, 2));
      //this.$router.push({ path: `/loci/${this.locus_id}/show` });
    },
  }
};
</script>

