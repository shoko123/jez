<template>
  <div>
    <template v-if="displayOption">
      <component v-bind:is="view"></component>
    </template>
  </div>
</template>

<script>
import LocusView0 from "../loci/LocusView0";
import LocusView1 from "../loci/LocusView1";
import LocusView2 from "../loci/LocusView2";
import LocusView3 from "../loci/LocusView3";
import LocusView4 from "../loci/LocusView4";
import StoneView0 from "../stones/StoneView0";
import StoneView1 from "../stones/StoneView1";
import StoneView2 from "../stones/StoneView2";
import StoneView3 from "../stones/StoneView3";
import PotteryView0 from "../pottery/PotteryView0";
import PotteryView1 from "../pottery/PotteryView1";
import PotteryView2 from "../pottery/PotteryView2";
import PotteryView3 from "../pottery/PotteryView3";


export default {
  name: "show-item",
  components: {
    LocusView0,
    LocusView1,
    LocusView2,
    LocusView3,
    LocusView4,
    StoneView0,
    StoneView1,
    StoneView2,
    StoneView3,
    PotteryView0,
    PotteryView1,
    PotteryView2,
    PotteryView3
  },
  data() {
    return {};
  },
  computed: {

    displayOption() {
      return this.$store.getters["mgr/status"].displayOption;
    },
    view() {
      //return 'LocusView' + 1;
      return (
        this.$store.getters["mgr/status"].itemName +
        "View" +
        this.displayOption.index
      );
    }
  },
  methods: {}
};
</script>

