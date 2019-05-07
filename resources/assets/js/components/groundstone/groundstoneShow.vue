<template>
<div>
  <findForm></findForm>
  <groundstoneForm></groundstoneForm>
  <groundstoneImages></groundstoneImages>
</div>
</template>

<script>
import groundstoneForm from "./groundstoneForm";
import groundstoneImages from "./groundstoneImages";
import findForm from "../finds/findForm";
export default {
  name: "groundstone-show", 
  components: { findForm, groundstoneForm, groundstoneImages },
}
</script>



