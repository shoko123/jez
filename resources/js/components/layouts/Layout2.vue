<template>
  <v-container fluid class="ma-0 scroll-y">
    <v-row wrap dense>
      <v-col md="12" lg="2" class="d-flex flex-column"></v-col>
      <v-col md="12" lg="8" class="d-flex flex-column">
        <slot name="e1"></slot>
      </v-col>
      <v-col md="12" lg="2" class="d-flex flex-column"></v-col>
    </v-row>
    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      fixed
      bottom
      right
      color="primary"
      @click="toTop"
    >
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      fab: false,
    };
  },
  computed: {},
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>