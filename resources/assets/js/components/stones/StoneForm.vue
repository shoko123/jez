<template>
  <v-container fluid>
    <template v-if="stone">
      <v-card class="elevation-12">
        <v-card-text>
          <v-card-title>
            <h2>Stone details:</h2>
          </v-card-title>
          <v-layout row wrap>
            <v-flex xs12 sm2 class="px-1">
              <v-text-field v-model="stone_type" readonly label="stone type" filled></v-text-field>
            </v-flex>
            <v-flex xs12 sm2 class="px-1">
              <v-text-field v-model="material" readonly label="material" filled></v-text-field>
            </v-flex>
            <v-flex xs12 sm2 class="px-1">
              <v-text-field v-model="stone.weight" readonly label="weight" filled></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 lg4 class="px-1">
              <v-textarea v-model="stone.notes" readonly label="notes" filled></v-textarea>
            </v-flex>
            <v-flex xs12 lg4 class="px-1">
              <v-textarea v-model="stone.measurements" readonly label="measurements" filled></v-textarea>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </template>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    stone() {
      return this.$store.getters["mgr/item"];
    },

    stone_type() {
      return this.stone.stone_type ? this.stone.stone_type.name : "";
    },
    material() {
      return this.stone.material ? this.stone.material.name : "";
    },
    imageUrl() {
      if (!this.stone.scenes.length) {
        return null;
      }
      let sceneOfOne = this.stone.scenes.find(x => {
        return x.sceneable.length == 1;
      });
      if (sceneOfOne === undefined) {
        return null;
      }
      if (!sceneOfOne.imags.length) {
        return null;
      } else {
        let url = this.$store.getters["storageUrl"] +
          sceneOfOne.images[0].image_no.padStart(5, "0") +
          "." +
          sceneOfOne.images[0].extension;
        console.log("imageUrl: " + url);
        return url;
      }
    }
  },
  methods: {}
};
</script>



