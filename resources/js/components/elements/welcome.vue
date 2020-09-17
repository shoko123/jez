 <template>
  <component v-bind:is="moduleWelcome"></component>
</template>

<script>
import LocusWelcome from "../loci/LocusWelcome";
import StoneWelcome from "../stones/StoneWelcome";
import PotteryWelcome from "../pottery/PotteryWelcome";
import LithicWelcome from "../lithics/LithicWelcome";
import GlassWelcome from "../glass/GlassWelcome";
import MetalWelcome from "../metal/MetalWelcome";


export default {
  components: { LocusWelcome, StoneWelcome, PotteryWelcome, LithicWelcome, GlassWelcome, MetalWelcome  },

  computed: {
    moduleWelcome() {
      return this.$store.getters["mgr/appStatus"].module + "Welcome";
    },
  },
};
</script>