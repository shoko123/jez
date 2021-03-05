<template>
  <v-toolbar v-if="menuReady" dense>
    <v-container fluid class="ma-0 pa-0">
      <v-row align="center">
        <div v-for="(btn, tabIndex) in tabs" :key="tabIndex">
          <v-menu open-on-hover offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                class="primary--text no-uppercase"
                large
                outlined
              >
                <v-icon left dark>{{ iconName(tabIndex) }}</v-icon>
                {{ btn.name }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in items(tabIndex)"
                :key="index"
                @click="goToMenuItem(item)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
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
    tabs() {
      return this.$store.getters["about/menu"].map((x) => {
        return { name: x.name, icon: x.ic };
      });
    },

    showNavigation() {
      return this.$store.getters["mgr/status"].isShow;
    },
    adjacents() {
      return this.$store.getters["mgr/adjacents"];
    },
  },
  methods: {
    items(tabIndex) {
      return this.$store.getters["about/menu"][tabIndex].data;
    },
    iconName(tabIndex) {
      return this.$store.getters["about/menu"][tabIndex].icon;
    },
    goToMenuItem(item) {
      this.$store.dispatch("mgr/goToRoute", {
        module: "About",
        action: "show",
        id: item.id,
      });
    },
    toMap() {
      //console.log("toMap");
      //TODO open map in a new tab
    },
    goToItem(direction) {
      if (this.adjacents) {
        this.$store.dispatch("mgr/goToRoute", {
          module: "About",
          action: "show",
          id: direction == "next" ? this.adjacents.next : this.adjacents.prev,
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