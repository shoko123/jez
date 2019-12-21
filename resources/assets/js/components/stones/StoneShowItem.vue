<template>
  <div>
    <template v-if="displayOption">
      <component v-bind:is="view"></component>
    </template>
  </div>
</template>

<script>
import StoneView0 from "./StoneView0";
import StoneView1 from "./StoneView1";
import StoneView2 from "./StoneView2";
import StoneView3 from "./StoneView3";
export default {
  components: {
    StoneView0,
    StoneView1,
    StoneView2,
    StoneView3
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
      return "StoneView" + this.displayOption.index;
     }
  },

  methods: {}
};
</script>