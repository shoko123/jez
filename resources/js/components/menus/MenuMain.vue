<template>
  <div>
    <template v-if="isRead">
      <v-toolbar dark class="primary" fixed dense>
        <v-btn text @click="home"> {{ moduleName }} </v-btn>
        <v-spacer></v-spacer>

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
            :loading="item.loading"
            @click="moduleClick(item)"
          >
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
          <template v-if="isLoggedIn">
            <v-menu offset-y>
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
          </template>
          <template v-else>
            <v-btn
              text
              :loading="loginBtn.loading"
              @click="moduleClick(loginBtn)"
            >
              <v-icon left dark>{{ loginBtn.icon }}</v-icon>
              {{ loginBtn.title }}
            </v-btn>
          </template>
        </v-toolbar-items>
      </v-toolbar>
    </template>
    <template v-else-if="isEdit">
      <v-toolbar dark class="orange" fixed dense>JEZ - EDIT MODE</v-toolbar>
    </template>
    <template v-else-if="isAdmin">
      <v-toolbar dark class="red" fixed dense>JEZ - Admin Mode</v-toolbar>
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
  },
  methods: {
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

