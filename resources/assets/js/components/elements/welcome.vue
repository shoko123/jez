 <template>
  <div>
    <component v-bind:is="welcome"></component>
  </div>
</template>

<script>
import GroundstoneWelcome from "../gs/GroundstoneWelcome";
import StoneWelcome from "../stones/StoneWelcome";
import LocusWelcome from "../loci/LocusWelcome";
export default {
  name: "welcome",
  components: { GroundstoneWelcome, LocusWelcome, StoneWelcome },

  data() {
    return {};
  },
  computed: {
    welcome() {
      return this.$store.getters["mgr/moduleItemName"] + 'Welcome';
    }
  },
  methods: {}
};
</script>