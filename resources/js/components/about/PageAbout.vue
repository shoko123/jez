<template>
  <div>
    <SubMenuAbout />

    <v-container fluid>
      <v-card v-if="item" class="elevation-12">
        <v-card-title class="grey py-0 mb-2">{{ title }}</v-card-title>
        <v-card-text>{{ text }} </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import SubMenuAbout from "../menus/SubMenuAbout";

export default {
  components: {
    SubMenuAbout,
  },

  computed: {
    item() {
      return this.$store.getters["mgr/item"];
    },
    title() {
      return this.item.title;
    },
    text() {
      return this.item.text;
    },
  },
};
</script>