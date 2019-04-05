  <template>
  <v-container v-if="stones" fluid grid-list-md>
    <v-layout>
      <v-flex>
        <template v-if="stones">
          <v-layout row wrap>
            <v-flex xs12 md6 lg3 v-for="stone in stones" :key="stone.id">
              <stone-card v-bind:stone="stone"></stone-card>
            </v-flex>
          </v-layout>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import stoneCard from "./stoneCard";

export default {
  name: "stone-list",

  components: { stoneCard },

  created() {
    console.log("stoneList.created() dispatching 'stones'");
    if (this.$store.getters.stones.length > 0) {
       console.log("stoneList - list already hydrated");
    } else {
      this.$store.dispatch("stones");
    }
  },

  data() {
    return {
      myStones: null
    };
  },
  computed: {
    stones() {
      return this.$store.getters.stonesFormatted;
      //return this.my_locus;
    }
  },

  methods: {}
};
</script>