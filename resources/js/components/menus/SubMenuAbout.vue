<template>
  <v-toolbar v-if="menuReady" dense>
    <v-container fluid class="ma-0 pa-0">
      <v-row>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              class="primary--text no-uppercase"
              large
              outlined
            >
              <v-icon left dark>mdi-pickaxe</v-icon>
              The Dig
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in dig"
              :key="index"
              @click="goToMenuItem(item)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              class="primary--text no-uppercase"
              large
              outlined
            >
              <v-icon left dark>mdi-web</v-icon>
              This Website
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in db"
              :key="index"
              @click="goToMenuItem(item)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
         
         <v-btn
            @click="toLocation"
            large
            outlined
            class="primary--text"
          >
            <v-icon left class="primary--text">mdi-map</v-icon>
            Location
          </v-btn>
      </v-row>
    </v-container>
  </v-toolbar>
</template>

<script>
export default {
  computed: {
    menuReady() {
      return this.$store.getters["about/menu"];
    },
    dig() {
      return this.$store.getters["about/menu"].db;
    },
    db() {
      return this.$store.getters["about/menu"].dig;
    },
  },
  methods: {
    callMethod(name) {
      this[name]();
    },
    goToMenuItem(item) {
      //console.log("digClick");
      this.$router.push({
        path: `${this.$store.getters["mgr/myModules"]["About"].appBaseUrl}/${item.id}/show`,
      });
    },
    toLocation() {
      //console.log("digClick");
      this.$router.push({
        path: `${this.$store.getters["mgr/myModules"]["About"].appBaseUrl}/location`,
      });
    },
  },
};
</script>
<style scoped>
.no-uppercase {
  text-transform: none;
}
</style>