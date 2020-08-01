<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar>
      <v-toolbar-items>
        <v-btn @click="toWelcome" class="primary--text" outlined text>{{moduleText}}</v-btn>
        <v-btn @click="toFilter" class="primary--text" outlined text>{{filtersText}}</v-btn>
        <v-btn @click="toCollection" class="primary--text" outlined text>{{collectionText}}</v-btn>
        <Navigator />
        <v-divider class="mx-3" inset vertical></v-divider>
        <Editor />
      </v-toolbar-items>
      <v-spacer></v-spacer>

      <v-btn
        @click="changeDisplayOption"
        color="info"
        text
        large
        rounded
        outlined
      >display mode: {{displayMode}}</v-btn>
    </v-toolbar>
  </v-container>
</template>

<script>
import Navigator from "../menus/Navigator";
import Editor from "../menus/Editor";

export default {
  components: { Navigator, Editor },

  data() {
    return {};
  },
  computed: {
    moduleText() {
      return `${this.$store.getters["mgr/status"].collectionName} (${this.$store.getters["mgr/moduleDetails"].itemCount})`;
    },
    filtersText() {
      return `>Filters(${this.$store.getters["tag/totalNoSelected"].filters})`;
    },
    collectionText() {
      return `>Results(${this.$store.getters["mgr/status"].count})`;
    },

    displayMode() {
      return this.$store.getters["mgr/status"].displayOption.text;
    },
  },
  methods: {
    toWelcome() {
      this.$router.push({ path: `${this.$store.getters["mgr/moduleInfo"].appBaseUrl}/welcome` }); 
    },
    toFilter() {
      this.$router.push({
        path: `${this.$store.getters["mgr/moduleInfo"].appBaseUrl}/filter`,
      });
    },
    toCollection() {
      this.$router.push({
        path: `${this.$store.getters["mgr/moduleInfo"].appBaseUrl}/list`,
      });
    },
    changeDisplayOption() {
      this.$store.commit("mgr/changeDisplayOption");
    },
  },
};
</script>