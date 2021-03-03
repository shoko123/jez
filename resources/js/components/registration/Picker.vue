<template>
  <div>
    <v-btn
      v-if="tag"
      large
      rounded
      slot="activator"
      @click="openModal()"
      :disabled="loading"
      class="purple white--text no-uppercase"
      >{{ tag }}</v-btn
    >
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card class="elevation-12">
        <v-card-title class="primary white--text"
          >Pick a {{ moduleName }}</v-card-title
        >
        <v-card-text>
          <PickerForm />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="goTo()" :disabled="disableButton">Go!</v-btn>
          <v-btn @click="cancel" primary>Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PickerForm from "./PickerForm";

export default {
  components: { PickerForm },
  data() {
    return {
      dialog: false,
    };
  },

  computed: {
    status() {
      return this.$store.getters["regs/status"];
    },
    moduleName() {
      return this.$store.getters["mgr/module"];
    },
    isLocus() {
      return this.$store.getters["mgr/status"].isLocus;
    },
    isFind() {
      return this.$store.getters["mgr/status"].isFind;
    },

    tag() {
      return this.$store.getters["mgr/item"]
        ? `${this.$store.getters["mgr/module"]} ${this.$store.getters["mgr/item"].tag}`
        : "";
    },
    loading() {
      return (
        this.$store.getters["mgr/xhrStatus"].loadingItem ||
        this.$store.getters["mgr/xhrStatus"].loadingCollection
      );
    },

    disableButton() {
      return this.status ? !this.status.ready : true;
    },
  },

  methods: {
    openModal() {
      if (["Area", "Season"].includes(this.$store.getters["mgr/module"])) {
        return;
      }
      this.dialog = true;  
      this.$store.commit("mgr/isPicker", true);
      this.$store.dispatch("regs/preparePicker");
    },

    goTo() {
      if (!this.status.ready) {
        alert("Not ready");
        return;
      }
      let newPath = `${this.$store.getters["mgr/status"].moduleAppBaseUrl}/${this.status.itemId}/show`;

      this.$store.commit("regs/clear");
      this.$store.commit("mgr/isPicker", false);
      this.dialog = false;
      this.$router.push({
        path: newPath,
      });
    },

    cancel() {
      this.$store.commit("mgr/isPicker", false);
      this.dialog = false;
    },
  },
};
</script>
<style scoped>
.no-uppercase {
  text-transform: none;
}
</style>
