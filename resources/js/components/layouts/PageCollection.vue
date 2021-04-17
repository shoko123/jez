  <template>
  <div>
    <SubMenuCollection />
    <v-container fluid>
      <CollectionForm  v-bind="{ source: 'main' }"></CollectionForm>
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
};
</script>
