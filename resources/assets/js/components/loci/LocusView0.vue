<template>
 <v-container fluid class="px-2">
  <v-row wrap dense>
    <v-col md="12" lg="3" class="d-flex flex-column">
      <ItemMediaGate></ItemMediaGate>
    </v-col>
    <v-col md="12" lg="9" class="d-flex flex-column">
      <LocusForm></LocusForm>
    </v-col>
  </v-row>
 </v-container>
</template>

<script>
import LocusForm from "./LocusForm";
import LocusFinds from "./LocusFinds";
import ItemMediaGate from "../media/ItemMediaGate";

export default {
  components: {
    LocusFinds,
    LocusForm,
    ItemMediaGate,
  }
};
</script>