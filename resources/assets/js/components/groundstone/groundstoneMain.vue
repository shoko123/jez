
<template>
  <v-container fluid class="ma-0 pa-0">
    <template v-if="showSubMenu">
      <groundstoneMenu/>
    </template>
    <router-view></router-view>
  </v-container>
</template>

<script>
import groundstoneMenu from "./groundstoneMenu";

export default {
  name: "groundstone-main",
  components: { groundstoneMenu },
  created() {
    //console.log("groundstoneMain.created()");
    if (this.$store.getters["gs/groundstones"]) {
      console.log("gsMain.created() - gs list already hydrated");
    } else {
      console.log("gsMain.created() dispatching 'groundstones'");

      this.$store.commit("isLoading", {
        value: true,
        message: "loading groundstones"
      });

      this.$store
        .dispatch("gs/groundstones", this.$route.params.id)
        .then(res => {
          this.$store.commit("isLoading", { value: false });
        })
        .catch(err => {
          this.$store.commit("isLoading", { value: false });
          console.log(
            "groundstoneList received error from dispatch" + err.response
          );
        });

      //this.$store.dispatch("groundstones");
    }
  },

  data() {
    return {
      drawer: null,
      on: true
    };
  },
  props: {
    source: String
  },

  computed: {
    showSubMenu() {
      return this.$store.getters.showSubMenu;
    }
  },
  methods: {}
};
</script>

<style scoped>
</style>