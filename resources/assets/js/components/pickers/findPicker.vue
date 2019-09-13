<template>
  <div>
    <template v-if="isCreate">
      <findPickerNew />
    </template>
    <template v-else>
      <findPickerExisting />
    </template>
  </div>
</template>
<script>

import findPickerNew from "./findPickerNew";
import findPickerExisting from "./findPickerExisting";

export default {
  components: { findPickerNew, findPickerExisting },
  computed: {
    isCreate() {
      return this.$store.getters["mgr/isCreate"];
    },
  },
};
</script>
