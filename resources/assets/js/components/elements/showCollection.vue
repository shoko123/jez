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
import gssCard from "../gs/gsCard";

export default {
  name: "show-collection",

  components: { gssCard },

  computed: {
    myCardsDataTable() {
      return this.$store.getters["mgr/collection"];
    },
    myCardComponent() {
      return this.$store.getters["mgr/moduleName"] + "Card";
    }
  },
};
</script>