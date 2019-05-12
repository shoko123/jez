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
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">JEZ</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :loading="item.loading"

          @click="item.method"
        >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

        <v-btn v-if="currentUser" flat @click="logout">
          <v-icon left dark>exit_to_app</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>


<script>
//:to="item.link"
export default {
  data() {
    return {
      sideNav: false,
      menuItems: []
    };
  },
  created() {
    this.setMainMenu();
  },
  watch: {
    currentUser (newcurrentUser, oldcurrentUser) {
      this.setMainMenu();
    }
  },

  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },  
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.setMainMenu();
      this.$router.push("/login");
    }, 

    setMainMenu() {
      if (this.$store.getters.isLoggedIn) {
        this.menuItems = [
          /*
          {
            icon: "supervisor_account",
            title: "customers",
            method: this.customersClick,
            loading: false
          },
          */
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
            icon: "fingerprint",
            title: "pottery",
            method: this.nullClick,
            disabled: true,
          },
          {
            icon: "flash_on",
            title: "flints",
            method: this.nullClick,
            disabled: true,
          },
          {
            icon: "panorama_wide_angle",
            title: "stones",
            method: this.stonesClick,
            disabled: true,
          },
          {
            icon: "style",
            title: "loci",
            method: this.lociClick,
            disabled: true,
          },
          {
            icon: "tonality",
            title: "groundstones",
            method: this.groundstonesClick,
            disabled: true,
          },
          /*
           {
            icon: "loyalty",
            title: "finds",
            method: this.findsClick,
            disabled: true,
          },
          */
        ];
      } else {
        this.menuItems = [
          {
            icon: "face",
            title: "Sign up",
            method: this.registerClick
          },
          {
            icon: "lock_open",
            title: "login",
            method: this.loginClick
          }
        ];
      }
    },

    lociClick() {
      //alert("In click on loci");
      //let index = this.menuItems.findIndex(it => it.title === "loci");
      //this.menuItems[index].loading = true;
      //this.setMainMenu();
      this.$router.push("/loci/list");
    },
    customersClick() {
      this.$router.push("/customers");
      //alert('In click on loci');
    },
    loginClick() {
      this.$router.push("/login");
      //alert('In click on loci');
    },
    registerClick() {
      this.$router.push("/register");
      //alert('In click on loci');
    },
    stonesClick() {
      this.$router.push("/stones/welcome");
      //alert('In click on loci');
    },
    groundstonesClick() {
      this.$router.push("/groundstones/welcome");
      //alert('In click on loci');
    },
    findsClick() {
      this.$router.push("/finds/stone/welcome");
      //alert('In click on loci');
    },
    nullClick() {
      //this.$router.push("/finds/stone/welcome");
      //alert('In click on loci');
    },
  }
};
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

