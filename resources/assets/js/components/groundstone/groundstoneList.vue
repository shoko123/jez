  <template>
  <v-container v-if="groundstones" fluid grid-list-md>
    <v-layout>
      <v-flex>
        <template v-if="groundstones">
          <v-layout row wrap>
            <v-flex xs12 md6 lg3 v-for="groundstone in groundstones" :key="groundstone.id">
              <groundstone-card v-bind:groundstone="groundstone"></groundstone-card>
            </v-flex>
          </v-layout>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import groundstoneCard from "./groundstoneCard";

export default {
  name: "groundstone-list",

  components: { groundstoneCard },

  created() {
    if (this.$store.getters['gs/groundstones']) {
      console.log("groundstoneList - list already hydrated");
    } else {
      console.log("groundstoneList.created() dispatching 'groundstones'");

      this.$store.commit("isLoading", {
        value: true,
        message: "loading groundstones"
      });

      this.$store
        .dispatch('gs/groundstones', this.$route.params.id)
        .then(res => {
          this.$store.commit("isLoading", { value: false });
        })
        .catch(err => {
          this.$store.commit("isLoading", { value: false });
          console.log("groundstoneList received error from dispatch" + err.response);
        });

      //this.$store.dispatch("groundstones");
    }
  },

  data() {
    return {
      mygroundstones: null
    };
  },
  computed: {
    groundstones() {
      return this.$store.getters['gs/groundstonesFormatted'];
      //return this.my_locus;
    }
  },

  methods: {}
};
</script>