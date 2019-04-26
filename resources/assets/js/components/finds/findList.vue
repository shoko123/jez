  <template>
  <v-container v-if="finds" fluid grid-list-md>
    <v-layout>
      <v-flex>
        <template v-if="finds">
          <v-layout row wrap>
            <v-flex xs12 md6 lg3 v-for="find in finds" :key="find.id">
              <find-card v-bind:find="find"></find-card>
            </v-flex>
          </v-layout>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import findCard from "./findCard";

export default {
  name: "find-list",

  components: { findCard },

  created() {
    
    if (this.$store.getters.finds.length > 0) {
       console.log("findList - list already hydrated");
    } else {
      console.log("findList.created() dispatching 'finds'");
      this.$store.dispatch("finds");
    }
  },

  data() {
    return {
      myfinds: null
    };
  },
  computed: {
    finds() {
      return this.$store.getters.findsFormatted;
      //return this.my_locus;
    }
  },

  methods: {}
};
</script>