<template>
  <div>
    <!--TO FIX LATER
    <v-navigation-drawer temporary v-model="sideNav">
        <v-list>
            <v-list-tile
            v-for="item in menuItems"
            :key="item.title"
            :to="item.link">
            <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>{{ item.title }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile
            v-if="!currentUser"
            @click="logout">
            <v-list-tile-action>
                <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>Logout</v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>-->
    <template v-if="show">
      <v-toolbar dark class="primary" fixed>
        <!--v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon-->
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">JEZ</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn
            text
            v-for="item in menuItems"
            :key="item.title"
            :loading="item.loading"
            @click="item.method"
          >
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>

          <!--v-btn v-if="isLoggedIn" text @click="logout">
            <v-icon left dark>exit_to_app</v-icon>Logout
          </v-btn-->

          <v-menu v-if="isLoggedIn" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="purple" dark v-bind="attrs" v-on="on">{{userName}}</v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index" @click="userMenu(index)">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-toolbar>
    </template>
    <template v-else>
      <v-toolbar dark class="orange">JEZ - edit mode</v-toolbar>
    </template>
  </div>
</template>


<script>
//:to="item.link"
export default {
  data() {
    return {
      items: [{ title: "edit profile" }, { title: "logout" }],
      sideNav: false,
      loggedInMenu: [
        {
          icon: "view_comfy",
          title: "areas",
          method: this.nullClick,
          disabled: true,
        },
        {
          icon: "account_balance",
          title: "structures",
          method: this.nullClick,
          disabled: true,
        },
        {
          icon: "reorder",
          title: "walls",
          method: this.nullClick,
          disabled: true,
        },
        {
          icon: "style",
          title: "loci",
          method: this.lociClick,
          disabled: true,
        },
        {
          icon: "fingerprint",
          title: "pottery",
          method: this.potteryClick,
          disabled: true,
        },
        {
          icon: "tonality",
          title: "stones",
          method: this.stonesClick,
        },
      ],
      guestMenu: [
        /*
        {
          icon: "face",
          title: "Sign up",
          method: this.registerClick
        },
        */
        {
          icon: "lock_open",
          title: "login",
          method: this.loginClick,
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
    show() {
      return !this.$store.getters["mgr/status"].isEdit;
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
      //alert('In click on loci');
    },
    logout() {
      this.$store.dispatch("aut/logout");
      //this.$router.push("/login");
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

      //this.$router.push("/login");
    },
    lociClick() {
      //this.$router.push("/loci/welcome");
      this.$router.push("/loci/welcome");
    },
    customersClick() {
      this.$router.push("/customers");
      //alert('In click on loci');
    },

    registerClick() {
      this.$router.push("/register");
      //alert('In click on loci');
    },
    stonesClick() {
      this.$router.push("/finds/stones/welcome");
    },
    potteryClick() {
      this.$router.push("/finds/pottery/welcome");
      //alert('In click on loci');
    },
    nullClick() {},
  },
};
</script>

