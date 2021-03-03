  <template>
  <div>
    <SubMenuCollection />
    <v-container fluid>
      <CollectionForm v-bind="props"></CollectionForm>
    </v-container>
  </div>
</template>


<script>
import SubMenuCollection from "../menus/SubMenuCollection";
import CollectionForm from "../elements/CollectionForm";
export default {
  components: {
    SubMenuCollection,
    CollectionForm,
  },

  computed: {
    props() {
      return {
        title: `${this.$store.getters["mgr/module"]} Query Results`,
        source: "Collection",
      };
    },
  },
};
</script>
