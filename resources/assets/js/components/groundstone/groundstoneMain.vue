
<template>
  <v-container fluid class="ma-0 pa-0">
    <groundstoneMenu/>
    
    <router-view></router-view>
  </v-container>
</template>

<script>
import groundstoneMenu from "./groundstoneMenu";

export default {
  name: "groundstone-main",
  components: { groundstoneMenu },

  data() {
    return {
      drawer: null,
      on: true,
    };
  },
  props: {
    source: String
  },
  created() {
    console.log("groundstoneMain.created()");
    //if alredy hydrated - abort
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
</style>