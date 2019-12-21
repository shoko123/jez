<template>
  <div>
    <template v-if="displayOption">
      <component v-bind:is="view"></component>
    </template>
  </div>
</template>

<script>
import LocusView0 from "./LocusView0";
import LocusView1 from "./LocusView1";
import LocusView2 from "./LocusView2";
import LocusView3 from "./LocusView3";
export default {
  components: {
    LocusView0,
    LocusView1,
    LocusView2,
    LocusView3
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
      return "LocusView" + this.displayOption.index;
     }
  },

  methods: {}
};
</script>
