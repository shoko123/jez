<template>
  <v-toolbar v-if="menuReady" dense>
    <v-container fluid class="ma-0 pa-0">
      <v-row align="center">
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
              The Database
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

        <v-btn @click="toMap" large outlined class="primary--text" :disabled=true>
          <v-icon left class="primary--text">mdi-map</v-icon>
          Map
        </v-btn>
        <!--v-spacer></v-spacer-->
        <div v-if="showNavigation">
          <v-btn fab text @click="goToItem('prev')" class="ml-4">
            <v-icon color="primary">arrow_back</v-icon>
          </v-btn>

          <v-btn fab text @click="goToItem('next')">
            <v-icon color="primary">arrow_forward</v-icon>
          </v-btn>
        </div>
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
    showNavigation() {
      return this.$store.getters["mgr/status"].isShow;
    },
    adjacents() {
      return this.$store.getters["mgr/adjacents"];
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
    toMap() {
      //console.log("digClick");
      this.$router.push({
        path: `${this.$store.getters["mgr/myModules"]["About"].appBaseUrl}/map`,
      });
    },
    goToItem(direction) {
      if (this.adjacents) {
        let path = this.$store.getters["mgr/status"].moduleAppBaseUrl;
        this.$router.push({
          path: `${path}/${
            direction == "next" ? this.adjacents.next : this.adjacents.prev
          }/show`,
        });
      }
    },
  },
};
</script>
<style scoped>
.no-uppercase {
  text-transform: none;
}
</style>