<template>
  <v-container fluid class="ma-0">
    <v-row wrap dense>
      <v-col lg="9">
        <slot name="e1"></slot>
      </v-col>
      <v-col lg="3">
        <slot name="e2"></slot>
      </v-col>     
    </v-row>
  </v-container>
</template>