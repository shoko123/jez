<template>
  <v-layout fill-height>
    <v-btn v-if="groundstone">{{groundstone.tag}}</v-btn>
  </v-layout>
</template>




<script>
export default {
  name: "groundstone-picker",
  data() {
    return {};
  },

  computed: {
    groundstone() {
      return this.$store.getters["gs/groundstoneFormatted"];
    }
  },
  methods: {}
};
</script>

<style scoped>
.toolbar {
  width: 20px;
}
</style>

