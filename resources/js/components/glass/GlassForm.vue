<template>
  <v-container v-if="item" fluid class="pa-1 ma-0">
    <v-row wrap no-gutters>
      <v-textarea
        v-model="item.description"
        label="description"
        rows="1"
        auto-grow
        readonly
        filled
      ></v-textarea>
    </v-row>
    <v-row wrap no-gutters>
      <v-text-field
        label="Rim Diameter"
        v-model="item.rim_diameter"
        class="mr-1"
        filled
      ></v-text-field>
      <v-text-field
        label="Base Diameter"
        v-model="item.base_diameter"
        class="mr-1"
        filled
      ></v-text-field>
      <v-text-field
        label="Bangle Diameter"
        v-model="item.bangle_diameter"
        class="mr-1"
        filled
      ></v-text-field>
      <v-text-field
        label="Bead Diameter"
        v-model="item.bead_diameter"
        class="mr-1"
        filled
      ></v-text-field>
      <v-text-field
        label="Pontil Diameter"
        v-model="item.pontil_diameter"
        class="mr-1"
        filled
      ></v-text-field>
    </v-row>
      <TagList />
    <v-divider inset></v-divider>
    <v-row wrap no-gutters>
      <div class="font-weight-normal ml-1 text-subtitle-1">Specialist(s): </div>
      <v-chip
        v-for="s in specialists"
        :key="s"
        class="font-weight-normal pa-1 mb-1 body-1"
        color="primary"
        >{{ s }}</v-chip
      >
    </v-row>
  </v-container>
</template>

<script>
import TagList from "../tags/TagList";
export default {
  components: {
    TagList,
  },
  computed: {
    item() {
      return this.$store.getters["mgr/item"];
    },
    specialists() {
      return this.item.specialists;
    },
    tags() {
      return this.$store.getters[`aux/selectedItemParams`];
    },
  },
};
</script>



