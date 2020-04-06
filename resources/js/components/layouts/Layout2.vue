<template>
  <v-container fluid class="ma-0">
    <v-row wrap dense>
      <v-col md="12" lg="2" class="d-flex flex-column">
        <slot name="e1"></slot>
      </v-col>
      <v-col md="12" lg="7" class="d-flex flex-column">
        <slot name="e2"></slot>
      </v-col>
      <v-col md="12" lg="3" class="d-flex flex-column">
        <slot name="e3"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
</script>