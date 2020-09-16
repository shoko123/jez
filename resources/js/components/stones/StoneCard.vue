<template>
  <LayoutItemWithImage :options="options" header="Stone Details">
    <template v-slot:e1>
      <StoneForm :showTags="options.showTags"></StoneForm>
    </template>
  </LayoutItemWithImage>
</template>

<script>
import StoneForm from "./StoneForm";
import LayoutItemWithImage from "../layouts/LayoutItemWithImage";

export default {
  components: {
    StoneForm,
    LayoutItemWithImage,
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



