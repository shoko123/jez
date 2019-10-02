<template>
  <v-toolbar flat>
    <v-toolbar-items>
      <v-btn text @click="prev()">
        <v-icon color="primary">arrow_back</v-icon>
      </v-btn>

      <pickerExisting />

      <v-btn text @click="next()">
        <v-icon color="primary">arrow_forward</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <!--v-container fill-height>
    <v-row wrap>
      
        <v-btn text @click="prev()">
          <v-icon color="primary">arrow_back</v-icon>
        </v-btn>
     
        <pickerExisting />
     
        <v-btn text @click="next()">
          <v-icon color="primary">arrow_forward</v-icon>
        </v-btn>
     
    </v-row>
  </v-container-->
</template>
 


<script>
import pickerExisting from "../pickers/pickerExisting";

export default {
  name: "navigator",
  components: { pickerExisting },

  created() {
    console.log("navigatorCreate");
  },

  data() {
    return {};
  },

  computed: {
    path() {
      return this.$store.getters["mgr/moduleBaseURL"];
    },
    collection() {
      this.$store.getters["mgr/collection"];
    },
    item() {
      this.$store.getters["mgr/item"];
    },
    adjacents() {
      return this.$store.getters["mgr/adjacents"];
    }
  },
  methods: {
    next() {
      if (this.adjacents) {
        let path = "/" + this.path + "/" + this.adjacents.next + "/show";
        console.log(
          "path from manager " + this.path + "\nactual path: " + path
        );
        this.$router.push({ path: `${path}` });
      }
    },

    prev() {
      if (this.adjacents) {
        let path = "/" + this.path + "/" + this.adjacents.prev + "/show";
        console.log(
          "path from manager " + this.path + "\nactual path: " + path
        );
        this.$router.push({ path: `${path}` });
      }
    }
  }
};
</script>

<style scoped>
</style>