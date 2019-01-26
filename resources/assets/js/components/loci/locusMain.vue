<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar class="ma-0 pa-0">
      <v-toolbar-items>
        <v-btn flat>Loci</v-btn>

        <v-divider class="mx-3" inset vertical></v-divider>

        <locusNavigator/>

        <v-divider class="mx-3" inset vertical></v-divider>

        <v-btn>
          <v-icon :loading="saving" @click="saveLocus()" color="info">save</v-icon>
        </v-btn>
        <v-btn>
          <v-icon :loading="deleting" @click="deleteLocus()" color="error">delete</v-icon>
        </v-btn>
        <v-btn>
          <v-icon :loading="saving" @click="newLocus()" color="warning">note_add</v-icon>
        </v-btn>
        <v-btn color="success" to="/loci">
          <v-icon>list</v-icon>
        </v-btn>

        <v-snackbar
          top
          v-model="snackbar"
          :color="color"
          :multi-line="mode === 'multi-line'"
          :timeout="timeout"
          :vertical="mode === 'vertical'"
        >
          {{ text }}
          <v-btn dark flat @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <!--
        <v-spacer></v-spacer>
        -->
      </v-toolbar-items>
    </v-toolbar>

    <router-view></router-view>
  </v-container>
</template>

<script>
import locusPicker from "./locusPicker";
import locusNavigator from "./locusNavigator";

export default {
  name: "locus-main",
  components: { locusPicker, locusNavigator },

  //import store from '../../app.js';

  //import store from '../app.js';

  /*
  beforeRouteEnter(to, from, next) {
    
    axios
      .get("/api/loci")
      .then(response => {
        console.log("loc main BeforeEnter OK");
        console.log(store.getters.isLoggedIn);
        //store.commit("loci", response.data.data);
        next();
      })
      .catch(err => {
        //alert('Routes Before enter axios error @LociGet');
        console.log("loc main BeforeEnter error " + err);
        next('/');//this.$router.push({ path: "/" });
      });
      
     next();
  },
  */

  created() {
    //this.$store.dispatch('areas');
    //this.$store.dispatch("loci");
  },

  data() {
    return {
      items: [
        {
          text: "Loci",
          disabled: false,
          href: "#"
        },
        {
          text: "filter1",
          disabled: false,
          href: "#"
        },
        {
          text: "filter2",
          disabled: true,
          href: "#"
        }
      ],
      deleting: false,
      saving: false,
      snackbar: false,
      color: "green",
      mode: "",
      timeout: 3000,
      text: ""
    };
  },

  computed: {
    locus() {
      return this.$store.getters.locus;
      //return this.my_locus;
    }
  },
  methods: {
    deleteLocus() {
      this.deleting = true;
      this.text = "locus " + this.locus.tag + " deleted";
      //alert("delete locus.id: " + this.locus.id);
      axios
        .delete(`/api/loci/${this.locus.id}`)
        .then(res => {
          //alert("locus " + this.locus.id + " deleted");

          //NEED erase from loci list
          this.$store.commit("locusDeleteFromList", this.locus.id);
          this.$store.commit("locus", {});
          this.deleting = false;
          this.snackbar = true;
          this.$router.push({ path: `/loci` });
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.my {
  background: rgb(156, 8, 8);
}
</style>