  <template>
  <v-container v-if="myCards" fluid grid-list-md>
    <v-layout>
      <v-flex>
        <div>show collection</div>
        <template>
          <v-layout row wrap>
            <v-flex xs12 md6 lg3 v-for="card in myCards" :key="card.id">
              
              <component v-bind:is="myCard" v-bind:groundstone="card"></component>
              
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

  created() {
    console.log("showCollection fullName: " + this.tableFullName);
  },

  data() {
    return {
      mygroundstones: null
    };
  },
  computed: {
    tableFullName() {
      return this.$store.getters["mg/tableFullName"];
    },

    myCards() {
      return this.$store.getters[this.tableFullName];
    },
    myCard() {
      return this.$store.getters["mg/moduleName"] + 'Card';
      
      //return 'gsCard';
    }
  },

  methods: {}
};
</script>