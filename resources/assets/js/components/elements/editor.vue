<template>
<!--v-toolbar flat>
    <v-toolbar-items-->
  <!--v-card outlined  class="mx-auto">
    <v-card-text align="center" justify="center" py-0 my-0-->
    <v-row align="center" justify="center" py-0 my-0>
      <v-btn @click="itemUpdate()" large outlined color="info" text>
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn @click="media()" large outlined color="info" text>
        <v-icon>camera</v-icon>
      </v-btn>
      <v-btn @click="itemDelete()" large outlined color="info" text>
        <v-icon>delete</v-icon>
      </v-btn>
      <v-btn @click="itemCreate()" large outlined color="info" text>
        <v-icon>note_add</v-icon>
      </v-btn>
    <!--/v-toolbar-items>
</v-toolbar-->
    </v-row>
    <!--/v-card-text>
  </v-card-->
</template>


<script>
export default {
  name: "editor",
  components: {},

  created() {
    console.log("editorCreate");
  },

  data() {
    return {};
  },
  computed: {
    deletePath() {
      return this.$store.getters["mgr/status"].moduleName + "/delete";
    },

    id0() {
      let collection = this.$store.getters["mgr/collection"];
      return collection[0].id;
    },

    pathToFirstItem() {
      let path =
        this.$store.getters["mgr/status"].baseURL + "/" + this.id0 + "/show";
      return path;
    }
  },
  methods: {
    itemCreate() {
      let path = "/" + this.$store.getters["mgr/status"].baseURL + "/create";
      console.log("editor.itemCreate pushing: " + path);
      //this.$router.push({ path: `/` });
      this.$router.push({ path: `${path}` });
    },

    itemUpdate() {
      //console.log("editor.itemUpdate current path: " + this.$route.path);
      let updatePath = this.$route.path.replace("show", "update");
      this.$router.push({ path: `${updatePath}` });
    },

    media() {
      //console.log("editor.itemUpdate current path: " + this.$route.path);
      let mediaPath = this.$route.path.replace("show", "media");
      this.$router.push({ path: `${mediaPath}` });
    },
    itemDelete() {
      console.log(
        "itemDelete id " + this.$route.params.id + " calling " + this.deletePath
      );

      //call module specific delete function
      this.$store
        .dispatch(this.deletePath, this.$route.params.id)
        .then(res => {
          let item0path = `/` + this.pathToFirstItem;
          console.log("after dispatch(delete) going to: " + item0path);
          this.$router.push({ path: `${item0path}` });
          return res;
        })
        .catch(err => {
          console.log("Failed to delete item. err: " + err);
        });
    }
  }
};
</script>