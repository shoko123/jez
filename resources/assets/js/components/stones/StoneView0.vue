
<template>
  <div>
    <v-row dense>
      <v-col xs="12" md="12" lg="2">
        <ItemMediaGate></ItemMediaGate>
      </v-col>
      <v-col xs="12" md="12" lg="10">
        <findForm></findForm>
      </v-col>
    </v-row>
    <v-row dense>
      <StoneForm></StoneForm>
    </v-row>
  </div>
</template>

<script>
import StoneForm from "./StoneForm";
import findForm from "../finds/findForm";
import ItemMediaGate from "../media/ItemMediaGate";

export default {
components: { findForm, StoneForm, ItemMediaGate },
};
</script>
