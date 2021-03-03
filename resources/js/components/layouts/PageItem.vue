<template>
  <div>
    <SubMenuItem />
    <component v-bind:is="view"></component>
  </div>
</template>

<script>
import SubMenuItem from "../menus/SubMenuItem";
import AreaView0 from "../area/AreaView0";
import AreaView1 from "../area/AreaView1";
import AreaView2 from "../area/AreaView2";
import SeasonView0 from "../season/SeasonView0";
import SeasonView1 from "../season/SeasonView1";
import SeasonView2 from "../season/SeasonView2";
import AreaSeasonView0 from "../areaSeason/AreaSeasonView0";
import AreaSeasonView1 from "../areaSeason/AreaSeasonView1";
import AreaSeasonView2 from "../areaSeason/AreaSeasonView2";
import LocusView0 from "../loci/LocusView0";
import LocusView1 from "../loci/LocusView1";
import LocusView2 from "../loci/LocusView2";
import StoneView0 from "../stones/StoneView0";
import StoneView1 from "../stones/StoneView1";
import StoneView2 from "../stones/StoneView2";
import PotteryView0 from "../pottery/PotteryView0";
import PotteryView1 from "../pottery/PotteryView1";
import PotteryView2 from "../pottery/PotteryView2";
import LithicView0 from "../lithics/LithicView0";
import LithicView1 from "../lithics/LithicView1";
import LithicView2 from "../lithics/LithicView2";
import GlassView0 from "../glass/GlassView0";
import GlassView1 from "../glass/GlassView1";
import GlassView2 from "../glass/GlassView2";
import MetalView0 from "../metal/MetalView0";
import MetalView1 from "../metal/MetalView1";
import MetalView2 from "../metal/MetalView2";

export default {
  name: "show-item",
  components: {
    SubMenuItem,
    AreaView0,
    AreaView1,
    AreaView2,
    SeasonView0,
    SeasonView1,
    SeasonView2,
    AreaSeasonView0,
    AreaSeasonView1,
    AreaSeasonView2,
    LocusView0,
    LocusView1,
    LocusView2,
    StoneView0,
    StoneView1,
    StoneView2,
    PotteryView0,
    PotteryView1,
    PotteryView2,
    LithicView0,
    LithicView1,
    LithicView2,
    GlassView0,
    GlassView1,
    GlassView2,
    MetalView0,
    MetalView1,
    MetalView2,
  },
  data() {
    return {};
  },
  computed: {
    displayOption() {
      return this.$store.getters["mgr/display"].itemDisplayOptionIndex;
    },
    view() {
      return (
        this.$store.getters["mgr/module"] +
        "View" +
        this.displayOption
      );
    },
  },
};
</script>

