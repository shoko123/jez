<template>
  <Layout-1>
    <template v-slot:e1>
      <MediaGate></MediaGate>
    </template>
    <template v-slot:e2>
      <LocusForm></LocusForm>
    </template>
  </Layout-1>
</template>

<script>
import Layout1 from "../layouts/Layout1";
import MediaGate from "../media/MediaGate";
import LocusForm from "./LocusForm";

export default {
  components: {
    Layout1,
    LocusForm,
    MediaGate
  }
};
</script>