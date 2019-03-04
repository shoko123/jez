<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar>
      <v-toolbar-items>
        <v-btn flat>Loci</v-btn>

        <v-divider class="mx-3" inset vertical></v-divider>

        <locusNavigator/>

        <v-divider class="mx-3" inset vertical></v-divider>

        <v-btn>
          <v-icon @click="saveLocus()" color="info">save</v-icon>
        </v-btn>
        <v-btn>
          <v-icon @click="deleteLocus()" color="error">delete</v-icon>
        </v-btn>
        <v-btn>
          <v-icon @click="newLocus()" color="warning">note_add</v-icon>
        </v-btn>
        <v-btn color="success" to="/loci">
          <v-icon>list</v-icon>
        </v-btn>

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

  data() {
    return {};
  },

  created() {
    console.log('locusMain - created() loci length: ' + this.$store.getters.loci.length);
    //if alredy hydrated - abort
    if (this.$store.getters.loci.length > 0) {
      console.log("locusMain hydrate - already hydrates");
      return;
    }

    //hydrate
    this.hydrate();
  },
  computed: {
    locus() {
      return this.$store.getters.locus;
      //return this.my_locus;
    },
    snackbar() {
      return this.$store.getters.snackbar;
    },
    loci() {
      return this.$getters.loci;
    }
  },
  methods: {
    async hydrate() {
      this.$store.commit("isLoading", {
        value: true,
        message: "loading loci...",
        progressColor: "purple"
      });

      let areas = axios.get("/api/areas");
      let loci = axios.get("/api/loci");
      Promise.all([areas, loci])
        .then(values => {
          this.$store.commit("areas", values[0].data.areas);
          this.$store.commit("loci", values[1].data.data);

          this.$store.commit("isLoading", {
            value: false,
            message: null,
            progressColor: "purple"
          });

          this.$store.commit('locus', values[1].data.data[0]);
          console.log("locusMain hydrated...");
        })

        .catch(error => {
          console.log("Failed to hydrate\nError: " + error);

          this.$store.commit("isLoading", {
            value: false,
            message: null,
            progressColor: "purple"
          });
          console.log("Error loading loci...");
          this.$router.push({ path: "/" });
        });
    },

    deleteLocus() {
      this.$store.commit("isLoading", {
        value: true,
        message: "deleting locus " + this.locus.tag + "",
        progressColor: "purple"
      });
      let tag = this.locus.tag;

      //alert("delete locus.id: " + this.locus.id);
      axios
        .delete(`/api/loci/${this.locus.id}`)
        .then(res => {
          //alert("locus " + this.locus.id + " deleted");

          //NEED erase from loci list
          this.$store.commit("locusDeleteFromList", this.locus.id);
          this.$store.commit("locus", {});
          
          this.$store.commit("isLoading", {
            value: false,
            message: "",
            progressColor: "purple"
          });
          
          this.$store.commit("snackbar", {
            value: true,
            message: "Locus deleted",
            timeout: 5000,
            color: "green",
            mode: ""
          });

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