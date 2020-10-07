  <template>
  <div>
    <SubMenuShowCollection />
    <v-container fluid>
      <CollectionForm v-bind="props"></CollectionForm>
    </v-container>
  </div>
</template>


<script>
import SubMenuShowCollection from "../menus/SubMenuShowCollection";
import CollectionForm from "./CollectionForm";
export default {
  components: {
    SubMenuShowCollection,
    CollectionForm,
  },

  computed: {
    props() {
      return {
        title: `${this.$store.getters["mgr/appStatus"].module} Query Results Gallery`,
        source: "Collection",
      };
    },
  },
};
</script>
