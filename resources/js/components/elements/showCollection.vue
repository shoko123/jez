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
        title: `${this.$store.getters["mgr/moduleInfo"].itemName} Collection Gallery`,
        source: "Collection"
      };
    }
  }
};
</script>
