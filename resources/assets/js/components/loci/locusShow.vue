<template>
<div>
  <locusForm></locusForm>
  <locusFinds></locusFinds>
</div>
</template>

<script>
import locusForm from "./locusForm";
import locusFinds from "./locusFinds";
export default {
  name: "locus-show", 
  components: { locusForm, locusFinds },
}
</script>



