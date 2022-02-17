<template>
  <div>
    <v-btn
      large
      rounded
      slot="activator"
      @click="openModal()"
      :disabled="disable"
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
          <v-btn @click="goTo()" :disabled="disableGoTo">Go!</v-btn>
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
    isReady() {
      return this.$store.getters["regs/flags"]
        ? this.$store.getters["regs/flags"].isReady
        : false;
    },
   

    tag() {
      //return `${this.$store.getters["mgr/module"]} ${this.$store.getters["mgr/item"].tag}`;
      return this.$store.getters["mgr/item"]
        ? `${this.$store.getters["mgr/module"]} ${this.$store.getters["mgr/item"].tag}`
        : "loading...";
    },
    disable() {
      let ready = this.$store.getters["mgr/ready"];
      return !ready.item || !ready.collection;
    },

    disableGoTo() {
      return !this.isReady; // ? !this.status.ready : true;
    },
  },

  methods: {
    openModal() {
      if (["Area", "Season"].includes(this.$store.getters["mgr/module"])) {
        return;
      }
      this.dialog = true;
      this.$store.commit("mgr/isPicker", true);
      this.$store.dispatch("regs/p/preparePicker");
    },

    goTo() {
      if (!this.isReady) {
        alert("Not ready");
        return;
      }

      this.$store
        .dispatch("mgr/goToRoute", {
          module: this.$store.getters["mgr/module"],
          action: "show",
          dot: this.$store.getters["regs/selected"].dot
        })
        .then((res) => {
          this.$store.commit("regs/clear");
          this.$store.commit("mgr/isPicker", false);
          this.dialog = false;
          return res;
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
