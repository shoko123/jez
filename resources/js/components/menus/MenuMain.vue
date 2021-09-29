<template>
  <div>
    <v-toolbar v-if="isRead" dark class="primary" fixed dense>
      <v-btn text @click="home"> {{ moduleName }} </v-btn>
      <v-spacer></v-spacer>
      <template v-if="showModules">
        <v-toolbar-items class="hidden-xs-only">
          <v-btn text @click="moduleClick({ module: 'About' })">
            <v-icon left dark>mdi-help-circle-outline</v-icon>About
          </v-btn>
          <v-menu offset-y>
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
            v-for="item in btns"
            :key="item.title"
            @click="moduleClick(item)"
          >
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>

          <v-menu offset-y v-if="isLoggedIn">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="purple" dark v-bind="attrs" v-on="on">{{
                userName
              }}</v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in userDropBoxItems"
                :key="index"
                @click="userMenu(item)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            v-if="showLoginBtn"
            color="purple"
            dark
            @click="moduleClick(loginBtn)"
          >
            <v-icon left dark>{{ loginBtn.icon }}</v-icon>
            {{ loginBtn.title }}
          </v-btn>
        </v-toolbar-items>
      </template>
    </v-toolbar>

    <v-toolbar v-if="isEdit" dark class="orange" fixed dense
      >JEZ - EDIT MODE</v-toolbar
    >

    <v-toolbar v-if="isAdmin" dark class="red" fixed dense
      >JEZ - Admin Mode</v-toolbar
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      //items: [{ title: "edit profile" }, { title: "logout" }],
      areaSeasonDropList: [
        { title: "Areas", module: "Area" },
        { title: "Seasons", module: "Season" },
        { title: "Areas/Seasons", module: "AreaSeason" },
      ],
      sideNav: false,
      btns: [
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
      loginBtn: {
        icon: "lock_open",
        title: "login",
        module: "Login",
      },
    };
  },

  computed: {
    status() {
      return this.$store.getters["mgr/status"];
    },
    isLoggedIn() {
      return this.$store.getters["aut/isLoggedIn"];
    },
    showModules() {
      return (
        this.status.action !== "login" &&
        (!this.$store.getters["mgr/appSettings/authorizedUsersOnly"] ||
          this.isLoggedIn)
      );
      //return this.$store.getters["aut/isLoggedIn"];
    },
    showLoginBtn() {
      return (
        !this.$store.getters["aut/isLoggedIn"] && this.status.action !== "login"
      );
      //return this.$store.getters["aut/isLoggedIn"];
    },
    userName() {
      return this.$store.getters["aut/userName"];
    },

    isRead() {
      return this.status.isRead;
    },
    isEdit() {
      return this.status.isEdit;
    },
    isAdmin() {
      return this.status.isAdmin;
    },
    isNotHome() {
      return this.$store.getters["mgr/status"].module !== "Home";
    },
    moduleName() {
      return ["Home", "Auth"].includes(this.$store.getters["mgr/module"])
        ? ` Jezreel Expedition (${this.$store.getters["mgr/module"]})`
        : `  Jezreel Expedition (${this.$store.getters["mgr/status"].collectionName})`;
    },
    userDropBoxItems() {
      //return [{ title: "Admin Dashboard" }, { title: "logout" }];
      return this.$store.getters["aut/role"]("Admin")
        ? [{ title: "Dashboard" }, { title: "Logout" }]
        : [{ title: "Logout" }];
    },
  },
  methods: {
    userMenu(item) {
      switch (item.title) {
        case "Logout":
          this.$store.dispatch("aut/logout");
          break;
        case "Dashboard":
          this.$store.dispatch("mgr/goToRoute", "dashboard");
          break;
      }
    },

    moduleClick(item) {
      switch (item.module) {
        case "Login":
          this.$store.dispatch("mgr/goToRoute", "login");
          break;

        default:
          this.$store.dispatch("mgr/goToRoute", {
            module: item.module,
            action: "welcome",
          });
      }
    },
    home() {
      this.$store.dispatch("mgr/goToRoute", "home");
    },
  },
};
</script>

