
 

 <template>
  <v-container fluid>
    <v-card class="elevation-12">
      <v-card-title class="grey py-0 mb-4">{{header}}</v-card-title>
      <v-card-text>
        <v-tabs v-model="tab" background-color="orange" dark>
          <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item.tab">
            <v-card flat>
              <v-row justify="space-around">
                <v-col cols="12" sm="10" md="8" lg="8">
                  <v-sheet elevation="10" class="pa-4">
                    <v-chip-group column active-class="primary--text">
                      <v-chip v-for="tag in tags" :key="tag.name">{{ tag.name }}</v-chip>
                    </v-chip-group>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-btn text @click="cancel">Cancel</v-btn>
          <v-btn text @click="submit">save</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      items: [
        { tab: "Use status", content: "Tab 1 Content" },
        { tab: "Features", content: "Tab 2 Content" },
        { tab: "Kinematics", content: "Tab 3 Content" },
        { tab: "Alternative names", content: "Tab 4 Content" }
      ]
    };
  },
  created() {
    //console.log("stepper.created()");
    this.$store.dispatch("tag/storeTags", null);
  },
  computed: {
    header() {
      return `${this.$store.getters["mgr/moduleInfo"].itemName} tag editor`;
    },
    tags() {
      //this.$store.getters["tag/tags"];
      return this.$store.getters["tag/tagsFiltered"]("stone:use-status");
    }
  },
  methods: {
    submit() {
      console.log("submit");
      //this.$store.commit("fnd/clear", null);
      this.$router.go(-1);
    },
    cancel() {
      console.log("cancel()");
      this.$router.go(-1);
    }
  }
};
</script>
