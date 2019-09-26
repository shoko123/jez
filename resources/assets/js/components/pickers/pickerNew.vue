<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs8>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-layout align-center justify-center>
          <v-flex xs12>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register a {{itemName}}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <areaSeasonPicker />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="goTo()" :disabled="disableButton">select</v-btn>
                <v-btn @click="cancel" primary>Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import areaSeasonPicker from "../pickers/areaSeasonPicker";

export default {
  components: { areaSeasonPicker },
  created() {
    console.log("LocusPicker.created");
  },
  destroyed() {
    console.log("LocusPicker.destroyed");
  },

  data() {
    return {
      dialog: false,

    };
  },

  computed: {

    item() {
      return this.$store.getters["mgr/item"];
    },
    itemName() {
      this.$store.getters["mgr/moduleItemName"];
    },

    tag() {
      if (!this.item) {
        return null;
      }
      let sections = this.item.id_string.split(".");
      let tag =
        sections[0] + "/" + sections[1] + "/" + parseInt(sections[2], 10);
      return tag;
    },
    disableButton() {
      return !this.$store.getters["pkr/locus"];
    },
  },

  methods: {

    openModal() {
      this.dialog = true;
      this.$store.commit("pkr/prepareItem", data);
    },

    goTo() {
      this.dialog = false;
      //let path = '/' + this.moduleBaseURL + '/' + this.locus_id + '/show';
      //console.log("findPicker.goto: " + path);
      this.$router.push({ path: `/loci/${this.locus_id}/show` });
    },

    cancel() {
      this.dialog = false;
    }
  }
};
</script>
