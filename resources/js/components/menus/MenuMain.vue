<template>
  <div>
    <template v-if="isReadMode">
      <v-toolbar dark class="primary" fixed dense>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer"
            >JEZREEL EXPEDITION</router-link
          >
          <template v-if="isDigModule">{{ moduleHeader }}</template>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <!--v-btn text @click="moduleClick({module: 'About'})">About </v-btn-->

        <v-toolbar-items class="hidden-xs-only">
          <v-menu v-if="isLoggedIn" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" text>
                <v-icon left dark>view_comfy</v-icon>
                Areas/Seasons
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in areaSeasonDropList"
                :key="index"
                @click="moduleClick(item)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn
            text
            v-for="item in menuItems"
            :key="item.title"
            :loading="item.loading"
            @click="moduleClick(item)"
          >
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
          <v-menu v-if="isLoggedIn" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="purple" dark v-bind="attrs" v-on="on">{{
                userName
              }}</v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                @click="userMenu(index)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-toolbar>
    </template>
    <template v-else>
      <v-toolbar dark class="orange">JEZ - EDIT MODE</v-toolbar>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [{ title: "edit profile" }, { title: "logout" }],
      areaSeasonDropList: [
        { title: "Areas", module: "Area" },
        { title: "Seasons", module: "Season" },
        { title: "Areas/Seasons", module: "AreaSeason" },
      ],
      sideNav: false,
      loggedInMenu: [
        {
          icon: "style",
          title: "loci",
          module: "Locus",
        },
        {
          icon: "mdi-fingerprint",
          title: "pottery",
          module: "Pottery",
        },
        {
          icon: "tonality",
          title: "stones",
          module: "Stone",
        },
        {
          icon: "mdi-navigation",
          title: "lithics",
          module: "Lithic",
        },
        {
          icon: "mdi-glass-wine",
          title: "glass",
          module: "Glass",
        },
        {
          icon: "mdi-knife",
          title: "metal",
          module: "Metal",
        },
      ],
      guestMenu: [
        /*
        {
          icon: "face",
          title: "Sign up",
          module: this.registerClick
        },
        */
        {
          icon: "lock_open",
          title: "login",
          module: "Login",
        },
      ],
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters["aut/isLoggedIn"];
    },
    userName() {
      return this.$store.getters["aut/userName"];
    },
    isReadMode() {
      return !this.$store.getters["mgr/status"].isEdit;
    },
    isDigModule() {
      return this.$store.getters["mgr/status"].isDigModule;
    },
    moduleHeader() {
      return this.isDigModule
        ? ` (${this.$store.getters["mgr/status"].collectionName})`
        : ``;
    },
    menuItems() {
      return this.isLoggedIn
        ? this.loggedInMenu
        : this.$store.getters["mgr/status"].action == "login"
        ? []
        : this.guestMenu;
    },
  },
  methods: {
    loginClick() {
      this.$router.push("/login");
    },

    logout() {
      this.$store.dispatch("aut/logout");
    },

    userMenu(index) {
      console.log("option " + index);
      switch (index) {
        case 0:
          break;
        case 1:
          this.$store.dispatch("aut/logout");
          break;
      }
    },

    moduleClick(item) {
      switch (item.module) {
        case "Login":
          this.$router.push("/login");
          break;

        default:
          this.$router.push({
            path: `${
              this.$store.getters["mgr/myModules"][item.module].appBaseUrl
            }/welcome`,
          });
      }
    },
  },
};
</script>

