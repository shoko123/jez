<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar>
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

  data() {
    return {
      deleting: false,
      saving: false,
      snackbar: false,
      color: "green",
      mode: "",
      timeout: 3000,
      text: ""
    };
  },

  created() {
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