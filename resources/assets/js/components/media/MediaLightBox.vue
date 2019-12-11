<template>
<v-container fluid fill-height>
  <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
<v-card>
    <v-card-title class="grey py-0 mb-4">Media Lightbox</v-card-title>
    <v-card-text>
      <v-carousel height="100%">
        <v-carousel-item
       
          v-for="(image,i) in images"
          :key="i"
          
           class="fill-height"
            align="center"
            justify="center"
        >
        <v-sheet
        
        height="100%"
        tile
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
       
          <v-img 
          :src="`${imagesBaseUrl}${image.fileName}`"
          width="900"
          height="600"
          max-height="600"
          max-width="900"
          ></v-img>
        </v-row>
      </v-sheet>
        
        
        
        </v-carousel-item>
      </v-carousel>
    </v-card-text>
    <v-card-actions>
      <v-btn dark @click="closeLightBox">Close Dialog</v-btn>
    </v-card-actions>
  </v-card>
  <!--v-card class="fill-height">
    <v-card-title class="grey py-0 mb-4">Media Lightbox</v-card-title>
    <v-card-text>
      <v-carousel>
        <v-carousel-item
       
          v-for="(image,i) in images"
          :key="i"
          :src="`${imagesBaseUrl}${image.fileName}`"
           class="fill-height"
            align="center"
            justify="center"
        >
        
        
        
        </v-carousel-item>
      </v-carousel>
    </v-card-text>
    <v-card-actions>
      <v-btn dark @click="closeLightBox">Close Dialog</v-btn>
    </v-card-actions>
  </v-card-->
  </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ]
    };
  },

  computed: {
    images() {
      return this.$store.getters["med/images"];
    },
    show() {
      return this.images ? this.images.length > 0 : false;
    },
    dialogMediaLightBox: {
      get() {
        return this.$store.getters["med/dialogMediaLightBox"];
      },
      set(data) {
        this.$store.commit("med/dialogMediaLightBox", data);
      }
    },

    thumbnailsBaseUrl() {
      return `${this.$store.getters["med/storageUrl"]}/DB/images/thumbnails/`;
    },
    imagesBaseUrl() {
      return `${this.$store.getters["med/storageUrl"]}/DB/images/full/`;
    }
  },
  methods: {
    closeLightBox() {
      this.dialogMediaLightBox = false;
    }
  }
};
</script>
