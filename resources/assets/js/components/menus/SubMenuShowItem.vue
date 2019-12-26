<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar>
      <v-toolbar-items>
        <v-btn class="primary--text" text>{{subMenuTitle}}</v-btn>

        <!--v-divider class="mx-3" inset vertical></v-divider-->

        <template v-if="showNavigator">
          <v-row align="center" justify="center">
          <navigator />
          </v-row >
        </template>

        <v-divider class="mx-3" inset vertical></v-divider>
        
        <template v-if="showEditor">
          
          <editor />
         
        </template>
        
      </v-toolbar-items>
      <v-spacer></v-spacer>

      <v-row align="center" justify="center">
        <!--v-btn @click="welcome" color="info" text>welcome</v-btn-->
        <v-btn @click="changeDisplayOption" color="info" text large rounded outlined>display mode: {{displayMode}}</v-btn>
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
    console.log("menuSub.created()");
  },

  data() {
    return {};
  },
  computed: {
    subMenuTitle() {
      return `${this.$store.getters["mgr/status"].collectioName} (${
        this.$store.getters["mgr/count"]
      })`; //return 'item';
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

    itemsCount() {
      return `(${this.$store.getters["mgr/count"]})`;
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