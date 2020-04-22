<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar>
      <v-toolbar-items>
        <v-btn class="primary--text" text>{{subMenuTitle}}</v-btn>

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
    subMenuTitle() {
      return `${this.$store.getters["mgr/status"].itemName} (${this.$store.getters["mgr/status"].count})`;
    },

    showEditor() {
      return true;
    },
    showNavigator() {
      return true;
    },
    displayMode() {
      return this.$store.getters["mgr/status"].displayOption.text;
    }
  },
  methods: {
    welcome() {
      //this.$router.push({ path: `/items/welcome` });
    },
    changeDisplayOption() {
      this.$store.commit("mgr/changeDisplayOption");
    }
  }
};
</script>

<style scoped>
</style>