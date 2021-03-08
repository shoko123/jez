<template>
  <v-container fluid class="ma-0 pa-0">
    <v-card class="elevation-12">
      <v-card-title class="grey py-0 mb-2">{{ header }}</v-card-title>
      <v-card-text>
        <template v-if="showMedia">
          <LayoutItemWithImageCard :header="header">
            <template v-slot:e1>
              <component v-bind:is="itemForm" v-bind:showTags="showTags">
              </component>
            </template>
          </LayoutItemWithImageCard>
        </template>
        <template v-else>
          <LayoutItemCard :header="header">
            <template v-slot:e1>
              <component v-bind:is="itemForm" v-bind:showTags="showTags">
              </component>
            </template>
          </LayoutItemCard>
        </template> </v-card-text></v-card
  ></v-container>
</template>

<script>
import LayoutItemCard from "./LayoutItemCard";
import LayoutItemWithImageCard from "./LayoutItemWithImageCard";
import AreaForm from "../area/AreaForm";
import SeasonForm from "../season/SeasonForm";
import AreaSeasonForm from "../areaSeason/AreaSeasonForm";
import LocusForm from "../loci/LocusForm";
import StoneForm from "../stones/StoneForm";
import PotteryForm from "../pottery/PotteryForm";
import LithicForm from "../lithics/LithicForm";
import GlassForm from "../glass/GlassForm";
import MetalForm from "../metal/MetalForm";

export default {
  components: {
    LayoutItemCard,
    LayoutItemWithImageCard,
    AreaForm,
    SeasonForm,
    AreaSeasonForm,
    LocusForm,
    StoneForm,
    PotteryForm,
    LithicForm,
    GlassForm,
    MetalForm,
  },

  props: {
    header: String,
  },
  computed: {
    itemForm() {
      return this.$store.getters["mgr/module"] + "Form";
    },
    hasMedia() {
      return this.$store.getters["med/itemOneMedia"]
        ? this.$store.getters["med/itemOneMedia"].hasMedia
        : false;
    },
    showMedia() {
      return this.hasMedia;
    },
    showTags() {
      return this.$store.getters["mgr/status"].itemDisplayOptionIndex === 0;
    },
  },
};
</script>