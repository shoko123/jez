  <template>
  <v-card class="elevation-12">
    <v-card-title class="grey py-0 mb-4">{{fullTitle}}</v-card-title>
    <v-card-text>
      <v-row wrap>
        <v-chip
          v-for="item in items"
          :key="item.id"
          class="font-weight-normal ma-2 body-1"
          @click="goTo(item)"
        >{{item.tag}}</v-chip>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    source: String,
  },

  created() {
    //console.log(`MediaGallery.created() title: ${this.title} source: ${this.source}`);
  },
  data() {
    return {};
  },
  computed: {
    items() {
     
          return this.$store.getters["mgr/collection"];

    },
  

    fullTitle() {
      return `${this.title}`;
    },
  },
  methods: {
   
    goTo(item) {
      let newPath = `${this.$router.currentRoute.path.replace("list", item.id.toString()  + "/show")}`
      console.log("newPath: " + newPath);
     
      this.$router.push({
        path: `${this.$router.currentRoute.path.replace("list", item.id.toString() + "/show")}`,
      });
    },
  },
};
</script>

