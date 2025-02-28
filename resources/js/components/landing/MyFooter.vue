<template>

  <v-footer class="bg-indigo-lighten-1 text-center d-flex flex-column">
    <div>
      <v-btn v-for="(icon, i) in icons" :key="i" class="ma-4 white--text" :href="icon.link" target="_blank" icon>
        <v-icon size="24px">{{ icon.text }}</v-icon>
      </v-btn>
    </div>

    <!-- <div>
      Time is short and plenty to do
    </div> -->
    <div class="mt-4">
      <strong>{{ new Date().getFullYear() }} — Nala Industries</strong>
    </div>
  </v-footer>
</template>




<script lang="ts" setup>
import { computed } from 'vue'

//      <v-img src="http://127.0.0.1:9090/dig/app/landing/borderWavesBlue.svg" />

const icons = computed(() => {
  return [
    {
      text: "mdi-facebook",
      link: "",
    },
    {
      text: "mdi-twitter",
      link: "",
    },
    {
      text: "mdi-linkedin",
      link: "",
    },
    {
      text: "mdi-instagram",
      link: "",
    },
  ]
})

</script>

<style scoped></style>