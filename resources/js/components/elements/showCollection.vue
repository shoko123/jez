  <template>
  <div>
    <SubMenuShowCollection />
    <v-container fluid>
      <MediaGallery v-bind="props"></MediaGallery>
    </v-container>
  </div>
</template>

<script>
import SubMenuShowCollection from "../menus/SubMenuShowCollection";
import MediaGallery from "../media/MediaGallery";

export default {
  components: {
    SubMenuShowCollection,
    MediaGallery
  },

  computed: {
    props() {
      return {
        title: `${this.$store.getters["mgr/appStatus"].module} Collection Gallery`,
        source: "Collection"
      };
    }
  }
};
</script>
