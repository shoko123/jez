<template>
  <LayoutItemCardOptionalImage :header="header">
    <template v-slot:e1>
      <component
        v-bind:is="form"
        :header="header"
      ></component>
    </template>
  </LayoutItemCardOptionalImage>
</template>

<script>
import LayoutItemCardOptionalImage from "../layouts/LayoutItemCardOptionalImage";

import AreaForm from "../area/AreaForm";
import SeasonForm from "../season/SeasonForm";
import AreaSeasonForm from "../areaSeason/AreaSeasonForm";
import LocusForm from "../loci/LocusForm";
import PotteryForm from "../pottery/PotteryForm";
import StoneForm from "../stones/StoneForm";
import LithicForm from "../lithics/LithicForm";
import MetalForm from "../metal/MetalForm";
import GlassForm from "../glass/GlassForm";
import FaunaForm from "../fauna/FaunaForm";

export default {
  components: {
    AreaForm,
    SeasonForm,
    AreaSeasonForm,
    LocusForm,
    PotteryForm,
    StoneForm,
    LithicForm,
    MetalForm,
    GlassForm,
    FaunaForm,
    LayoutItemCardOptionalImage,
  },
  computed: {
    form() {
      return this.$store.getters["mgr/module"] + "Form";
    },
    header() {
      return this.$store.getters["mgr/module"] + " Details";
    },
  },
};
</script>

