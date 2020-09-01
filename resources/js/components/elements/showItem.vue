<template>
  <div>
    <SubMenuShowItem />
    <component v-bind:is="view"></component>
  </div>
</template>

<script>
import SubMenuShowItem from "../menus/SubMenuShowItem";
import LocusView0 from "../loci/LocusView0";
import LocusView1 from "../loci/LocusView1";
import LocusView2 from "../loci/LocusView2";
import LocusView3 from "../loci/LocusView3";
import StoneView0 from "../stones/StoneView0";
import StoneView1 from "../stones/StoneView1";
import StoneView2 from "../stones/StoneView2";
import StoneView3 from "../stones/StoneView3";
import PotteryView0 from "../pottery/PotteryView0";
import PotteryView1 from "../pottery/PotteryView1";
import PotteryView2 from "../pottery/PotteryView2";
import PotteryView3 from "../pottery/PotteryView3";
import LithicView0 from "../lithics/LithicView0";
import LithicView1 from "../lithics/LithicView1";

export default {
  name: "show-item",
  components: {
    SubMenuShowItem,
    LocusView0,
    LocusView1,
    LocusView2,
    LocusView3,
    StoneView0,
    StoneView1,
    StoneView2,
    StoneView3,
    PotteryView0,
    PotteryView1,
    PotteryView2,
    PotteryView3,
    LithicView0,
    LithicView1
  },
  data() {
    return {};
  },
  computed: {
    displayOption() {
      return this.$store.getters["mgr/displayOptionsIndex"];
    },
    view() {
      return (
        this.$store.getters["mgr/appStatus"].module +
        "View" +
        this.displayOption
      );
    },
  },
};
</script>

