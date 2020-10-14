<template>
  <LayoutItemWithImageCard :options="options" header="Stone Details">
    <template v-slot:e1>
      <StoneForm :showTags="options.showTags"></StoneForm>
    </template>
  </LayoutItemWithImageCard>
</template>

<script>
import StoneForm from "./StoneForm";
import LayoutItemWithImageCard from "../layouts/LayoutItemWithImageCard";

export default {
  components: {
    StoneForm,
    LayoutItemWithImageCard,
  },
  props: {
    options: Object,
  },
  data() {
    return {};
  },
  created() {
    console.log("StoneCard options: " + JSON.stringify(this.options, null, 2));
  },

  computed: {},
  methods: {},
};
</script>



