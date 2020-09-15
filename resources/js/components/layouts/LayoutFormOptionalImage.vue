<template>
  <v-container fluid class="ma-0 pa-0">
    <v-card class="elevation-12">
      <v-card-title class="grey py-0 mb-4">Registration Details</v-card-title>
      <v-container fluid class="ma-0">
        <v-row wrap dense>
          <v-col lg="10">
            <slot name="e1"></slot>
          </v-col>
          <v-col lg="2">
            <slot name="e2"></slot>
          </v-col>
        </v-row>
      </v-container>
      <v-card-text></v-card-text>
    </v-card>
  </v-container>
</template>

  

<script>

</script>