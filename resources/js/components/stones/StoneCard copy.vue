<template>
  <v-card class="elevation-12">
    <v-card-title class="grey py-0 mb-4">Stone Details</v-card-title>
    <v-card-text>
      <StoneForm :showTags="true"></StoneForm>
    </v-card-text>
  </v-card>
</template>

<script>
import StoneForm from "./StoneForm";

export default {
  components: {
    StoneForm,
  },
  data() {
    return {};
  },
  props: {
    showTags: Boolean,
    showImage: Boolean,
  },
  computed: {},
  methods: {},
};
</script>



