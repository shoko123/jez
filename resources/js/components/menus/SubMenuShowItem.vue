<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar dense>
      <v-toolbar-items>
        <v-btn @click="toWelcome" class="primary--text" outlined text>{{moduleText}}</v-btn>
        <v-btn @click="toFilter" class="primary--text" outlined text>{{filtersText}}</v-btn>
        <v-btn @click="toCollection" class="primary--text" outlined text>{{collectionText}}</v-btn>
        <Navigator />
        <v-divider class="mx-3" inset vertical></v-divider>
        <Editor />
      </v-toolbar-items>
      <v-spacer></v-spacer>

        <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        class="primary--text"
          v-bind="attrs"
          v-on="on"
        >
          {{viewMenuText}}
        </v-btn>
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
  </v-container>
</template>

<script>
import Navigator from "../menus/Navigator";
import Editor from "../menus/Editor";

export default {
  components: { Navigator, Editor },

  data() {
    return {
      //index: 0,
    };
  },
  computed: {
    moduleText() {
      return `Total(${this.$store.getters["mgr/moduleDetails"].itemCount})`;
    },
    filtersText() {
      return `>Filters(${this.$store.getters["aux/totalNoSelected"].filters})`;
    },
    collectionText() {
      return `>Results(${this.$store.getters["mgr/status"].count})`;
    },
    displayOptions() {
      return this.$store.getters["mgr/displayOptions"];
    },
    
    viewMenuText() {
      return `view: ${this.displayOptions[this.displayOptionIndex]}`;
    },
    displayOptionIndex: {
      get() {
        return this.$store.getters["mgr/displayOptionsIndex"];
      },
      set(data) {
        //this.$store.commit("mgr/displayOptionsIndex", data.id);
      },
    },
    displayMode() {
      return "***";
      /*
      return this.displayOptions.length > 0
        ? this.displayOptions[this.displayOptionsIndex].text
        : "";
        */
    },
  },
  methods: {
    changeView(index) {
      console.log("change view index: " + index);
      this.$store.commit("mgr/displayOptionsIndex", index);
    },
    toWelcome() {
      this.$router.push({
        path: `${this.$store.getters["mgr/moduleInfo"].appBaseUrl}/welcome`,
      });
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
  },
};
</script>