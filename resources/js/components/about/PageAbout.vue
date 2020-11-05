<template>
  <div>
    <SubMenuAbout />
    <v-card>
        <v-card-title class="title white--text text-h2">{{
          title
        }}</v-card-title>
        <v-card-text class="white--text text-h4">
          
        </v-card-text>
      </v-card>
  </div>
</template>

<script>
import SubMenuAbout from "../menus/SubMenuAbout";

export default {
  components: {
    SubMenuAbout,
  },
 
  computed: {
    title() {
      return this.$store.getters["mgr/item"].tag;
    },
    text() {
      return this.$store.getters["mgr/item"].text;
    },
   
  },
};
</script>