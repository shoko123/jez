<template>
 <v-container fluid class="px-2">
  <v-row wrap dense>
    <v-col md="12" lg="3" class="d-flex flex-column">
      <ItemMediaGate></ItemMediaGate>
    </v-col>
    <v-col md="12" lg="9" class="d-flex flex-column">
      <findForm></findForm>
    </v-col>
  </v-row><v-row dense>
      <StoneForm></StoneForm>
    </v-row>
 </v-container>
</template>

<script>
import StoneForm from "./StoneForm";
import findForm from "../finds/findForm";
import ItemMediaGate from "../media/ItemMediaGate";

export default {
components: { findForm, StoneForm, ItemMediaGate },
};
</script>
