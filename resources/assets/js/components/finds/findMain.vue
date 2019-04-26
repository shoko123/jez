
<template>
  <v-container fluid class="ma-0 pa-0">
    <findMenu/>
    <router-view></router-view>
  </v-container>
</template>

<script>
import findMenu from "./findMenu";

export default {
  name: "find-main",
  components: { findMenu },

  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {}
};
</script>

<style scoped>
</style>