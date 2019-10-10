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

        <v-btn v-if="isLoggedIn" text @click="logout">
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
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters["aut/isLoggedIn"];
    },
    menuItems() {
      if (this.isLoggedIn) {
        return [
          {
            icon: "view_comfy",
            title: "areas",
            method: this.nullClick,
            disabled: true
          },
          {
            icon: "account_balance",
            title: "structures",
            method: this.nullClick,
            disabled: true
          },
          {
            icon: "reorder",
            title: "walls",
            method: this.nullClick,
            disabled: true
          },

          {
            icon: "fingerprint",
            title: "pottery",
            method: this.potteryBasketsClick,
            disabled: true
          },
          {
            icon: "flash_on",
            title: "lithics",
            method: this.nullClick,
            disabled: true
          },

          {
            icon: "style",
            title: "loci",
            method: this.lociClick,
            disabled: true
          },
          {
            icon: "tonality",
            title: "stones",
            method: this.stonesClick
          }
        ];
      } else {
        return [
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
    }
  },
  methods: {
    logout() {
      this.$store.commit("aut/logout");
      this.$router.push("/login");
    },
    lociClick() {
      this.$router.push("/loci/welcome");
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
      this.$router.push("/finds/stones/welcome");
    },
    potteryBasketsClick() {
      this.$router.push("/finds/pottery-baskets/welcome");
      //alert('In click on loci');
    },
    nullClick() {
      //this.$router.push("/finds/stone/welcome");
      //alert('In click on loci');
    }
  }
};
</script>

