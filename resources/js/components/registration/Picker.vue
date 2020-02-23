<template>
  <div>
    <v-row align="center" justify="center">
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
          <v-row align-center justify-center>
            <v-col xs12>
              <v-card class="elevation-12">
                <v-card-title class="primary white--text">Pick a {{itemName}}</v-card-title>
                <v-card-text>
                  <template v-if="isLocus">
                    <PickerFormLocus />
                  </template>
                  <template v-if="isFind">
                    <PickerFormFind />
                  </template>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="goTo()" :disabled="disableButton">Go!</v-btn>
                  <v-btn @click="cancel" primary>Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import PickerFormLocus from "./PickerFormLocus";
import PickerFormFind from "./PickerFormFind";

export default {
  components: { PickerFormLocus, PickerFormFind },
  created() {
    if (!this.$store.getters["reg/areasSeasons"]) {
      console.log("picker - dispatch areasSeasons");
      this.$store.dispatch("reg/loadAreasSeasons", null);
    }
  },
  destroyed() {
    //console.log("PickerExisting.destroyed");
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
      return this.$store.getters["mgr/item"] ? this.$store.getters["mgr/item"].tag : "";
    },

    disableButton() {
      return this.$store.getters["reg/registration"] ? !this.$store.getters["reg/registration"].isReady : true;
    }
  },

  methods: {
    openModal() {
      this.dialog = true;
      this.$store.commit("mgr/isPicker", true);
    },

    goTo() {
      this.$store.commit("mgr/isPicker", false);
      this.dialog = false;
      this.$router.push({
        path: `${this.$store.getters["mgr/status"].moduleAppBaseUrl}/${this.$store.getters["reg/item"].id}/show`
      });
    },

    cancel() {
      this.$store.commit("mgr/isPicker", false);
      this.dialog = false;
    }
  }
};
</script>
