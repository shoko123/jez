  <template>
  <v-container v-if="collection" fluid>
    <v-card>
      <v-card-title class="grey py-0 mb-4">{{status.itemName}} - showing the first 50 items</v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col xs="12" md="6" lg="3" v-for="card in collection" :key="card.id">
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-card class="mx-auto" max-width="350">
                  <template v-if="card.srcThumbnail">
                    <v-img
                      :src="card.srcThumbnail"
                      aspect-ratio="1"
                      class="grey lighten-2"
                      max-width="330"
                    ></v-img>
                  </template>
                  <template v-else>
                    <v-img
                      :src="`${srcFiller}`"
                      aspect-ratio="1"
                      class="grey lighten-2"
                      max-width="330"
                    ></v-img>
                  </template>
                  <v-fade-transition>
                    <v-overlay v-if="hover" absolute color="#036358">
                      <h4>{{ card.tag }}</h4>

                      <h5>Description: {{ card.description }}</h5>
                      <v-btn @click="goTo(card)">Visit</v-btn>
                      <!--v-btn @click="editImage(image)">Edit</v-btn-->
                    </v-overlay>
                  </v-fade-transition>
                </v-card>
              </template>
            </v-hover>
          </v-col>

          <!--v-col xs="12" md="6" lg="3" v-for="card in collection" :key="card.id">
            <v-card>
              <v-img
                  :src="`${srcFiller}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  height="250"
                  width="350"
                  max-width="350"
                  max-height="250"
                ></v-img>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{ card.tag }}</h3>
                  <div>Description: {{ card.description }}</div>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-btn text :to="`/${baseURL}/${card.id}/show`">Show</v-btn>
               
              </v-card-actions>
            </v-card>
          </v-col-->
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  computed: {
    status() {
      return this.$store.getters["mgr/status"];
    },
    collection() {
      return this.$store.getters["mgr/collection"]
        ? this.$store.getters["mgr/collection"].slice(0, 40)
        : null;
    },
    baseURL() {
      return this.$store.getters["mgr/status"].baseURL;
    },
    srcFiller() {
      return this.$store.getters["med/srcThumbnailFiller"];
    },
  },
  methods: {
    goTo(card) {
      let path = `${this.baseURL}/${card.id}/show`;

      
      this.$router.push({ path: `${path}` });
      
    },
  },

};
</script>