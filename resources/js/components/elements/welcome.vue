 <template>
  <div>
    <template v-if="itemName">
      <component v-bind:is="welcome"></component>
    </template>
  </div>
</template>

<script>
import LocusWelcome from "../loci/LocusWelcome";
import StoneWelcome from "../stones/StoneWelcome";
import PotteryWelcome from "../pottery/PotteryWelcome";

export default {
  name: "welcome",
  components: { LocusWelcome, StoneWelcome, PotteryWelcome },

  computed: {
    itemName() {
      return this.$store.getters["mgr/status"].itemName;
    },
    welcome() {
      return this.itemName + "Welcome";
    }
  },
};
</script>