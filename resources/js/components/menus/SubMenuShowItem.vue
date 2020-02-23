<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar>
      <v-toolbar-items>
        <v-btn class="primary--text" text>{{subMenuTitle}}</v-btn>

        <!--v-btn>
          <v-icon>filter</v-icon>
        </v-btn-->
         

        

        <!--v-divider class="mx-3" inset vertical></v-divider-->

        <template v-if="showNavigator">
          <v-row align="center" justify="center">
            <navigator />
          </v-row>
        </template>

        <v-divider class="mx-3" inset vertical></v-divider>

        <template v-if="showEditor">
          <editor />
        </template>
      </v-toolbar-items>
      <v-spacer></v-spacer>

      <v-row align="center" justify="center">
        <!--v-btn @click="welcome" color="info" text>welcome</v-btn-->
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
import navigator from "../elements/navigator";
import editor from "../elements/editor";

export default {
  components: { navigator, editor },

  created() {
    //console.log("menuSub.created()");
  },

  data() {
    return {};
  },
  computed: {
    subMenuTitle() {
      return `${this.$store.getters["mgr/status"].itemName} (${
        this.$store.getters["mgr/status"].count})`;
    },

    showEditor() {
      return true;
    },
    showNavigator() {
      return true;
    },
    displayMode() {
      return this.$store.getters["mgr/status"].displayOption.text;
    },
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