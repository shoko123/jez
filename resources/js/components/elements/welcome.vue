 <template>
  <component v-bind:is="moduleWelcome"></component>
</template>

<script>
import LocusWelcome from "../loci/LocusWelcome";
import StoneWelcome from "../stones/StoneWelcome";
import PotteryWelcome from "../pottery/PotteryWelcome";

export default {
  components: { LocusWelcome, StoneWelcome, PotteryWelcome },

  computed: {
    moduleWelcome() {
      return this.$store.getters["mgr/appStatus"].module + "Welcome";
    },
  },
};
</script>