<template>
  <div>
    <SubMenuAbout />

    <v-container fluid>
      <v-card v-if="item" class="elevation-12">
        <v-card-title class="grey py-0">{{ item.title }}</v-card-title>
        <v-container fluid>
          <v-row dense>
            <v-card width="20%">
              <v-card-text class="text-h6 font-weight-bold">
                <v-row
                  v-for="(line, index) in item.text"
                  :key="index"
                  class="title"
                >
                  {{ line }}
                </v-row>
              </v-card-text>
            </v-card>
            <v-spacer></v-spacer>
            <v-card width="80%">
              <v-img
                id="img"
                :src="item.fullUrl"
                :lazy-src="item.tnUrl"
                :cover="true"
              />
            </v-card>
          </v-row>
        </v-container>
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
  },
};
</script>
<style scoped>
#img {
  height: 80vh;
}
</style>