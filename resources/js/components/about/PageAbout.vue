<template>
  <div>
    <SubMenuAbout />

    <v-container fluid>
      <v-card v-if="item" class="elevation-12">
        <v-card-title class="grey py-0">{{ title }}</v-card-title>
        <div v-if="!isSlideShow">
         
            <v-card-text class="col-lg-4 offset-lg-1">
            
              {{ text }}
             
            </v-card-text>
   
        </div>
        <div v-if="isSlideShow">
          <v-carousel height="800px">
            <v-carousel-item v-for="(item, i) in slides" :key="i">
              <v-row>
                <v-card width="20%">
                  <v-card-text>
                    <div class="text-h5 font-weight-bold">{{ item.title }}</div>
                    <br />{{ item.text }}</v-card-text
                  >
                </v-card>
                <v-spacer></v-spacer>
                <v-card width="80%">
                  <v-img :src="item.fullUrl" />
                </v-card>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </div>
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
    isSlideShow() {
      return this.item.type === 1;
    },
    slides() {
      return this.isSlideShow ? this.item.slides : null;
    },
  },
};
</script>