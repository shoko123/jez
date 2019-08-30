 <template>
  <div>
    <!--div>welcome with module {{myModule}}</div-->
    <component v-bind:is="welcome"></component>
  </div>
</template>

<script>
import gssWelcome from "../gs/gsWelcome";
export default {
  name: "welcome",
  components: { gssWelcome },

  data() {
    return {};
  },
  computed: {
    welcome() {
      return this.$store.getters["mgr/moduleName"] + 'Welcome';
    }
  },
  methods: {}
};
</script>