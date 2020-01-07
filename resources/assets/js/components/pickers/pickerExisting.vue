<template>
  <div>
  <!--v-layout fill-height-->
  <v-row align="center" justify="center">
  <!--v-toolbar flat>
    <v-toolbar-items-->
    <v-btn
    
      v-if="tag"
      large
      rounded
      slot="activator"
      label="tag"
      @click="openModal()"
      class="primary"
    >{{tag}}</v-btn>
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
    
    <!--/v-toolbar-items></v-toolbar-->
    </v-row>
  <!--/v-layout-->
  </div>
</template>


<script>
import LocusPickerForm from "./LocusPickerForm";
import FindPickerForm from "./FindPickerForm";

export default {
  components: { LocusPickerForm, FindPickerForm },
  created() {
    console.log("PickerExisting.created");
  },
  destroyed() {
    console.log("PickerExisting.destroyed");
  },

  data() {
    return {
      dialog: false
    };
  },

  computed: {
    itemName() {
      return this.$store.getters["mgr/status"].itemName;
    },
    isLocus() {
      return this.$store.getters["mgr/status"].isLocus;
    },
    isFind() {
      return this.$store.getters["mgr/status"].isFind;
    },

    tag() {
      if (!this.$store.getters["mgr/item"]) {
        return null;
      }
      return this.$store.getters["mgr/item"].tag;
    },

    disableButton() {
      return !this.$store.getters["pkr/item"];
    }
  },

  methods: {
    openModal() {
      this.dialog = true;
      //this.$store.commit("pkr/prepareItem", data);
    },

    goTo() {
      if (!this.$store.getters["pkr/item"]) {
        return;
      } else {
        this.dialog = false;
        this.$router.push({
          path: `${this.$store.getters["mgr/status"].baseURL}/${
            this.$store.getters["pkr/item"].id
          }/show`
        });
      }
    },

    cancel() {
      this.dialog = false;
    }
  }
};
</script>
