<template>
  <div>
    <template v-if="show">
      <!--v-toolbar flat>
        <v-toolbar-items-->
          <v-row align="center" justify="center">
          <v-btn class="mx-2" fab text @click="prev()">
            <v-icon color="primary">arrow_back</v-icon>
          </v-btn>

          <pickerExisting />

          <v-btn class="mx-2" fab text @click="next()">
            <v-icon color="primary">arrow_forward</v-icon>
          </v-btn>

          <template v-if="isLocus">
            <v-btn class="mr-10" large @click="goToLoci" color="info" text rounded outlined>To Loci</v-btn>
          </template>
          <template v-if="isFind">
            <v-btn class="mr-10" large @click="goToLocus" color="info" text rounded outlined>To Locus</v-btn>
          </template>
          </v-row>
        <!--/v-toolbar-items>
      </v-toolbar-->
    </template>
  </div>
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
      return this.$store.getters["mgr/status"].baseURL;
    },
    collection() {
      this.$store.getters["mgr/collection"];
    },
    item() {
      this.$store.getters["mgr/item"];
    },
    show() {
      //return true;
      return this.collection !== null && this.item !== null;
    },
    adjacents() {
      return this.$store.getters["mgr/adjacents"];
    },
    isLocus() {
      return this.$store.getters["mgr/status"].isLocus;
    },
    isFind() {
      return this.$store.getters["mgr/status"].isFind;
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
    },
    goToLocus() {
      if (this.$store.getters["mgr/item"]) {
        this.$router.push({
          path: `/loci/${this.$store.getters["mgr/item"].locus_id}/show`
        });
      }
    },
    goToLoci() {
      this.$router.push({ path: `/loci/list` });
    }
  }
};
</script>

<style scoped>
</style>