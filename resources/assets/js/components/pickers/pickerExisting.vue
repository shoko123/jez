<template>
  <v-layout fill-height>
    <v-btn v-if="tag" slot="activator" label="tag" @click="openModal()">{{tag}}</v-btn>
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-container>
        <v-layout align-center justify-center>
          <v-flex xs12>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Pick a {{itemName}}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <template v-if="isLocus">
                  <LocusPickerForm />
                </template>
                <template v-if="isFind">
                  <FindPickerForm />
                </template>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="goTo()" :disabled="disableButton">Go!</v-btn>
                <v-btn @click="cancel" primary>Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
</template>


<script>
import LocusPickerForm from "./LocusPickerForm";
import FindPickerForm from "./FindPickerForm";
export default {
  components: { LocusPickerForm, FindPickerForm },
  created() {
    console.log("LocusPicker.created");
  },
  destroyed() {
    console.log("LocusPicker.destroyed");
  },

  data() {
    return {
      dialog: false
    };
  },

  computed: {
    item() {
      return this.$store.getters["mgr/item"];
    },
    itemName() {
      return this.$store.getters["mgr/moduleItemName"];
    },
    isLocus() {
      return this.$store.getters["mgr/isLocus"];
    },
    isFind() {
      return this.$store.getters["mgr/isFind"];
    },
    tag() {
      if (!this.$store.getters["mgr/item"]) {
        return null;
      }
      return this.$store.getters["mgr/item"].tag;
    },

    disableButton() {
      return !this.$store.getters["pkr/locus"];
    },
    selectedItemId() {
      return this.$store.getters["pkr/selectedItemId"];
    }
  },

  methods: {
    openModal() {
      this.dialog = true;
    },

    goTo() {
      this.dialog = false;
      let id = this.$store.getters["pkr/selectedItemId"];

      //this.$store.commit("pkr/clear");
      let path = `/${this.$store.getters["mgr/moduleBaseURL"]}/${id}/show`;
      console.log("pickerExisting.goto path: " + path);
      
      
      this.$router.push({ path: `${path}` });
      //this.$router.push({ path: `/loci/${id}/show` });
      
    },

    cancel() {
      this.dialog = false;
    }
  }
};
</script>
