  <template>
  <div>
    <SubMenuShowCollection />
    <v-container fluid>
      <template v-if="collectionDisplayAsMedia">
        <MediaGallery v-bind="props"></MediaGallery>
      </template>
      <template v-else>
        <ChipCollection v-bind="props"></ChipCollection>
      </template>
    </v-container>
  </div>
</template>


<script>
import SubMenuShowCollection from "../menus/SubMenuShowCollection";
import MediaGallery from "../media/MediaGallery";
import ChipCollection from "./ChipCollection";
export default {
  components: {
    SubMenuShowCollection,
    MediaGallery,
    ChipCollection,
  },

  computed: {
    props() {
      return {
        title: `${this.$store.getters["mgr/appStatus"].module} Query Results Gallery`,
        source: "Collection",
      };
    },
    collectionDisplayAsMedia() {
      return this.$store.getters["mgr/display"].collectionDisplayAsMedia;
    },
  },
};
</script>
