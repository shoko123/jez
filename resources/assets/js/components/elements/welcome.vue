 <template>
  <div>
    <component v-bind:is="welcome"></component>
  </div>
</template>

<script>

import LocusWelcome from "../loci/LocusWelcome";
import StoneWelcome from "../stones/StoneWelcome";
import PotteryWelcome from "../pottery/PotteryWelcome";

export default {
  name: "welcome",
  components: { LocusWelcome, StoneWelcome, PotteryWelcome },

  data() {
    return {};
  },
  computed: {
    welcome() {
      return this.$store.getters["mgr/status"].itemName + 'Welcome';
    }
  },
  methods: {}
};
</script>