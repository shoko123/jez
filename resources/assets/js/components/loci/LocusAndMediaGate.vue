<template>
  <v-row dense>
    <v-col xs="12" md="6" lg="3" class="d-flex flex-column">
      <ItemMediaGate></ItemMediaGate>
    </v-col>
    <v-col xs="12" md="6" lg="9" class="flex d-flex flex-column">
      <LocusForm></LocusForm>
    </v-col>
  </v-row>
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