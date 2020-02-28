<template>
  <v-card class="elevation-12">
    <template v-if="ready">
      <v-card-title class="grey py-0 mb-4">{{fullTitle}}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col v-for="(item, index) in items" :key="item.id" cols="2">
            <MediaItemNew v-bind="{ image: item , arr: items, source: source, index: index  }"></MediaItemNew>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
      <slot name="actions" />
      </v-card-actions>
    </template>
    <v-dialog v-model="dialogMediaLightBox" persistent class="fill-height">
      <MediaLightBox />
    </v-dialog>
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

  props: {
    title: String,
    source: String
  },

  created() {
    console.log(`mediaGalleryNew.created() title: ${this.title} source: ${this.source}`);
    this.dialogMediaLightBox = false;
  },

  computed: {
    ready() {
      return this.$store.getters["mgr/item"];
    },

    items() {
      switch (this.source) {
        case "Collection":
          return null;

        case "ItemMedia":
          return this.$store.getters["med/images"];

        case "MediaEdit":
          return this.$store.getters["med/images"];

        case "LocusFinds":
          return this.$store.getters["locusFinds/locusFinds"];
      }
    },

    fullTitle() {
      let fullTitle = this.title;
      if(this.items) {
          fullTitle += " (" + this.items.length + ")";
         
        } else {
           fullTitle += " (Calculating...)"
        }
        return fullTitle;
    },

    dialogMediaLightBox: {
      get() {
        return this.$store.getters["med/dialogMediaLightBox"];
      },
      set(data) {
        this.$store.commit("med/dialogMediaLightBox", data);
      }
    }
  }
};
</script>

