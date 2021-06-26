<template>
  <div>Admin</div>
</template>

<script>
export default {
  computed: {
    item() {
      return this.$store.getters["mgr/item"];
    },
  },
};
</script>