<template>
  <CollectionForm v-bind="props">
  </CollectionForm>
</template>

<script>
import CollectionForm from "../elements/CollectionForm";
export default {
  components: {
    CollectionForm
  },

  computed: {
    props() {
      return {
        title: "Small Finds From Locus",
        source: "related",
      }
    }
  }
};
</script>



