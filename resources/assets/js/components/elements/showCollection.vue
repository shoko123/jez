  <template>
  <v-container v-if="myCardsDataTable" fluid grid-list-md>
    <v-layout>
      <v-flex>
        <template>
          <v-layout row wrap>
            <v-flex xs12 md6 lg3 v-for="card in myCardsDataTable" :key="card.id">
              <component v-bind:is="myCardComponent" v-bind:item="card"></component>
            </v-flex>
          </v-layout>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import StoneCard from "../stones/StoneCard";
import LocusCard from "../loci/LocusCard";

export default {
  components: { LocusCard, StoneCard },

  computed: {
    myCardsDataTable() {
      return this.$store.getters["mgr/collection"];
    },
    myCardComponent() {
      return this.$store.getters["mgr/moduleItemName"] + "Card";
    }
  },
};
</script>