<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar dense>
      <v-toolbar-items>
        <v-btn @click="toWelcome" class="primary--text" outlined text>{{moduleText}}</v-btn>

        <!--v-btn @click="toFilter" class="primary--text" outlined text>{{filtersText}}</v-btn-->
        <FilterButton />

        <v-btn @click="toCollection" class="primary--text" outlined text>{{collectionText}}</v-btn>
        <Navigator />
        <v-divider class="mx-3" inset vertical></v-divider>
        <Editor />
      </v-toolbar-items>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="primary--text" v-bind="attrs" v-on="on" depressed>{{displayOptionsText}}</v-btn>
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
import FilterButton from "../filter/FilterButton";
export default {
  components: { Navigator, Editor, FilterButton },

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

    display() {
      return this.$store.getters["mgr/display"];
    },

    displayOptions() {
      return this.display.itemDisplayOptions;
    },

    displayItemOptionIndex() {
      return this.display.itemDisplayOptionIndex;
    },

    displayOptionsText() {
      return `view: ${this.displayOptions[this.displayItemOptionIndex]}`;
    },
  },
  methods: {
    changeView(index) {
      console.log("change view index: " + index);
      this.$store.commit("mgr/displayItemOptionIndex", index);
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