<template>
  <v-row dense>
    <v-col xs="12" md="6" lg="3" class="d-flex flex-column">
      <ItemMediaGate1></ItemMediaGate1>
    </v-col>
    <v-col xs="12" md="6" lg="9" class="flex d-flex flex-column">
      <LocusForm1></LocusForm1>
    </v-col>
  </v-row>
</template>

<script>
import LocusForm from "./LocusForm";
import LocusForm1 from "./LocusForm1";
import LocusFinds from "./LocusFinds";
import ItemMediaGate from "../media/ItemMediaGate";
import ItemMediaGate1 from "../media/ItemMediaGate1";

export default {
  components: {
    LocusFinds,
    LocusForm,
    LocusForm1,
    ItemMediaGate,
    ItemMediaGate1
  }
};
</script>