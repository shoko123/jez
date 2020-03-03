<template>
  <v-card class="elevation-12">
    <template v-if="ready">
      <MediaItemNew v-bind="{ image: image , arr: images, source: source, index: 0  }"></MediaItemNew>
      <!--v-dialog v-model="dialogMediaLightBox" persistent class="fill-height">
        <MediaLightBox />
      </v-dialog-->
    </template>
  </v-card>
</template>

<script>
import MediaItemNew from "./MediaItemNew";
import MediaLightBox from "./MediaLightBox";

export default {
  components: {
    MediaItemNew,
    MediaLightBox
  },

  created() {
    this.dialogMediaLightBox = false;
  },

  computed: {
    source() {
      return "ItemMedia";
    },
    ready() {
      return this.$store.getters["mgr/item"];
    },

    images() {
      return this.$store.getters["med/images"];
    },

    image() {
      return this.$store.getters["med/images"][0];
    },

    
  }
};
</script>

