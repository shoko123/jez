  <template>
  <v-container v-if="collection" fluid>
    <v-row wrap>
      <v-col xs="12" md="6" lg="3" v-for="card in collection" :key="card.id">
        <v-card>
          <v-img src="https://picsum.photos/id/11/500/300" aspect-ratio="2.75"></v-img>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ card.tag }}</h3>
              <div>Description: {{ card.description }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn text :to="`/${baseURL}/${card.id}/show`">Show</v-btn>
            <!--v-btn text :to="'/loci/' + card.id +'/show'">Show</v-btn-->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

export default {
  computed: {
    collection() {
      return this.$store.getters["mgr/collection"];
    },
    baseURL() {
    return this.$store.getters["mgr/status"].baseURL
    },
  }
};
</script>