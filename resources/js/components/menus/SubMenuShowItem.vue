<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar>
      <v-toolbar-items>
        <v-btn class="primary--text" outlined text>{{moduleText}}</v-btn>
        <v-btn @click="toFilter" class="primary--text" outlined text>{{filtersText}}</v-btn>
        <v-btn  @click="toCollection" class="primary--text" outlined text>{{collectionText}}</v-btn>

        <template v-if="showNavigator">
          <v-row align="center" justify="center">
            <Navigator />
          </v-row>
        </template>

        <v-divider class="mx-3" inset vertical></v-divider>

        <template v-if="showEditor">
          <Editor />
        </template>
      </v-toolbar-items>
      <v-spacer></v-spacer>

      <v-row align="center" justify="center">
        <v-btn
          @click="changeDisplayOption"
          color="info"
          text
          large
          rounded
          outlined
        >display mode: {{displayMode}}</v-btn>
      </v-row>
    </v-toolbar>
  </v-container>
</template>

<script>
import Navigator from "../menus/Navigator";
import Editor from "../menus/Editor";

export default {
  components: { Navigator, Editor },

  created() {
    //console.log("menuSub.created()");
  },

  data() {
    return {};
  },
  computed: {
    showEditor() {
      return true;
    },
    showNavigator() {
      return true;
    },
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
    }
  },
  methods: {
    welcome() {
      //this.$router.push({ path: `/items/welcome` });
    },
    toFilter() {
      this.$router.push({
        path: `${this.$store.getters["mgr/moduleInfo"].appBaseUrl}/filter/show-filter`
      });
    },
    toCollection() {
      this.$router.push({
        path: `${this.$store.getters["mgr/moduleInfo"].appBaseUrl}/list`
      });
    },
    changeDisplayOption() {
      this.$store.commit("mgr/changeDisplayOption");
    }
  }
};
</script>

<style scoped>
</style>