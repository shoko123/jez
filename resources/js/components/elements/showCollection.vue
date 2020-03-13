  <template>
  <v-container fluid>
    <MediaGallery v-bind="props"></MediaGallery>
  </v-container>
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
        title: "Collection Gallery",
        source: "Collection"
      };
    }
  }
};
</script>
