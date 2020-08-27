<template>
  <v-container fluid class="ma-0">
    <v-row wrap dense>
      <v-col lg="9"><!--v-col md="12" lg="9" class="d-flex flex-column"-->
        <slot name="e1"></slot>
      </v-col>
      <v-col lg="3"><!--v-col md="12" lg="3" class="d-flex flex-column"-->
        <slot name="e2"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
</script>