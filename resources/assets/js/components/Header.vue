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
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up "></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">JEZ</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}

        </v-btn>
        <v-btn
          v-if="currentUser"
          flat
          @click="logout">
          <v-icon left dark>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    </div>
</template>

<script>
export default {
data () {
      return {
        sideNav: false
      }
    },
    computed: {
       menuItems() {
      let menuItems = [
        { icon: "face", title: "Sign up", link: "/register" },
        { icon: "lock_open", title: "login", link: "/login" }
      ];
      if (this.currentUser) {
        menuItems = [
          {
            icon: "supervisor_account",
            title: "customers",
            link: "/customers"
          },
          { icon: "room", title: "loci", link: "/loci" }
        ];
      }
      return menuItems
      },
      currentUser() {
                return this.$store.getters.currentUser
        }
    },
    methods: {
      logout() {
        this.$store.commit("logout");
        this.$router.push("/login");
      },
    }
  }
/*
export default {
  computed: {
      data() {
    return {
      sideNav: false
    },
    menuItems() {
      let menuItems = [
        { icon: "face", title: "Sign up", link: "/register" },
        { icon: "lock_open", title: "login", link: "/login" }
      ];
      if (this.currentUser) {
        menuItems = [
          {
            icon: "supervisor_account",
            title: "customers",
            link: "/customers"
          },
          { icon: "room", title: "loci", link: "/loci" }
        ];
      }
      return menuItems;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    }, },
    methods: {
      
      logout() {
        alert("logged out");
        this.$store.commit("logout");
        this.$router.push("/login");
      },
      myAlert() {
          alert('myAlert');
      }


    }
  }
};

*/
</script>

