 <template>
  <div>
    <div>welcome with module {{myModule}}</div>
    <component v-bind:is="myWelcome"></component>
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
    appStatus() {
      return this.$store.getters["mg/appStatus"];
    },
    myModule() {
      return this.appStatus.moduleName;
    },
    myWelcome() {
      return this.myModule + "Welcome";
      //return this.$store.getters[this.fullName];
    }
  },
  methods: {}
};
</script>