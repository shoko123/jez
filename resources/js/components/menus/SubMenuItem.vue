<template>
  <v-toolbar dense>
    <CollectionButtons />
    <Navigator />
    <Editor />

    <v-spacer></v-spacer>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" class="primary--text no-uppercase" large outlined>
          <v-icon left dark>mdi-eye</v-icon>{{
          displayOptionsText
        }}</v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in displayOptions"
          :key="index"
          @click="changeView(index)"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import Navigator from "../menus/Navigator";
import Editor from "../menus/Editor";
import CollectionButtons from "./CollectionButtons";
export default {
  components: { Navigator, Editor, CollectionButtons },

  data() {
    return {
      //index: 0,
    };
  },
  computed: {
    /*
    display() {
      return this.$store.getters["mgr/display"];
    },
  */
    displayOptions() {
      return this.$store.getters["mgr/status"].itemDisplayOptions;
    },

    displayItemOptionIndex() {
      return this.$store.getters["mgr/status"].itemDisplayOptionIndex;
    },

    displayOptionsText() {
      return `${this.displayOptions[this.displayItemOptionIndex]}`;
    },
  },
  methods: {
    changeView(index) {
      this.$store.commit("mgr/displayItemOptionIndex", index);
    },
  },
};
</script>
<style scoped>
.no-uppercase {
  text-transform: none;
}
</style>