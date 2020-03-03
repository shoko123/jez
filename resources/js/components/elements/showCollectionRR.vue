  <template>
  <MediaGallery v-bind="props">
  </MediaGallery>
</template>

<script>
import MediaGallery from "../media/MediaGallery";
export default {
  components: {
    MediaGallery
  },

  computed: {
    finds() {
      return this.$store.getters["locusFinds/locusFinds"];
    },
    props() {
      return {
        title: "Item Gallery",
        source: "Collection",
      }
    }
  }
};
</script>
