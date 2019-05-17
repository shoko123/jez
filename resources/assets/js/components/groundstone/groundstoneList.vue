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

  

  data() {
    return {
      mygroundstones: null
    };
  },
  computed: {
    groundstones() {
      return this.$store.getters['gs/groundstones'];
      //return this.my_locus;
    }
  },

  methods: {}
};
</script>