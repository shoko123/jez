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
import AreaView3 from "../area/AreaView3";
import SeasonView0 from "../season/SeasonView0";
import SeasonView1 from "../season/SeasonView1";
import SeasonView2 from "../season/SeasonView2";
import SeasonView3 from "../season/SeasonView3";
import AreaSeasonView0 from "../areaSeason/AreaSeasonView0";
import AreaSeasonView1 from "../areaSeason/AreaSeasonView1";
import AreaSeasonView2 from "../areaSeason/AreaSeasonView2";
import AreaSeasonView3 from "../areaSeason/AreaSeasonView3";
import LocusView0 from "../loci/LocusView0";
import LocusView1 from "../loci/LocusView1";
import LocusView2 from "../loci/LocusView2";
import LocusView3 from "../loci/LocusView3";
import FindView0 from "../finds/FindView0";
import FindView1 from "../finds/FindView1";
import FindView2 from "../finds/FindView2";
import FindView3 from "../finds/FindView3";
import FindView4 from "../finds/FindView4";

export default {
  name: "show-item",
  components: {
    SubMenuItem,
    AreaView0,
    AreaView1,
    AreaView2,
    AreaView3,
    SeasonView0,
    SeasonView1,
    SeasonView2,
    SeasonView3,
    AreaSeasonView0,
    AreaSeasonView1,
    AreaSeasonView2,
    AreaSeasonView3,
    LocusView0,
    LocusView1,
    LocusView2,
    LocusView3,
    FindView0,
    FindView1,
    FindView2,
    FindView3,
    FindView4,
  
  },
  data() {
    return {};
  },
  computed: {
    displayOption() {
      return this.$store.getters["mgr/status"].itemDisplayOptionIndex;
    },
    view() {
      //return this.$store.getters["mgr/module"] + "View" + this.displayOption;
      if (this.$store.getters["mgr/status"].isFind) {
        return "FindView" + this.displayOption;
      } else {
        return this.$store.getters["mgr/module"] + "View" + this.displayOption;
      }
    },
  },
};
</script>

