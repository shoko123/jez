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
        :disabled="disable" 
      >{{tag}}</v-btn>
      <v-dialog v-model="dialog" persistent max-width="600">
        <v-container>
          <v-row align-center justify-center>
            <v-col xs12>
              <v-card class="elevation-12">
                <v-card-title class="primary white--text">Pick a {{itemName}}</v-card-title>
                <v-card-text>                  
                    <PickerForm />                 
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
import PickerForm from "./PickerForm";

export default {
  components: { PickerForm },
  created() {
    if (
      !this.$store.getters["regs/regs"] ||
      !this.$store.getters["regs/regs"].areasSeasonsReady
    ) {
      console.log("picker - dispatch areasSeasons");
      this.$store.dispatch("regs/loadAreasSeasons", null);
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
    regs() {
      return this.$store.getters["regs/regs"];
    },

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
      return this.$store.getters["mgr/item"]
        ? this.$store.getters["mgr/item"].tag
        : "";
    },
     disable() {
      return (
        this.$store.getters["mgr/xhrStatus"].loadingItem ||
        this.$store.getters["mgr/xhrStatus"].loadingCollection
      );
    },

    disableButton() {
      return this.regs ? !this.regs.ready : true;
    }
  },

  methods: {
    openModal() {
      this.dialog = true;
      this.$store.commit("mgr/isPicker", true);
      this.$store.dispatch("regs/preparePicker");
    },

    goTo() {
      let newPath = `${this.$store.getters["mgr/status"].moduleAppBaseUrl}/${this.regs.itemId}/show`;
      this.$store.commit("regs/clear");
      this.$store.commit("mgr/isPicker", false);
      this.dialog = false;
      this.$router.push({
        path: newPath
      });
    },

    cancel() {
      this.$store.commit("mgr/isPicker", false);
      this.dialog = false;
    }
  }
};
</script>
