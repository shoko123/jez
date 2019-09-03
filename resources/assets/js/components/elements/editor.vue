<template>
  <v-layout fill-height>
    <v-btn>
      <v-icon @click="itemUpdate()" color="info" flat>edit</v-icon>
    </v-btn>
    <v-btn>
      <v-icon @click="itemDelete()" color="info" flat>delete</v-icon>
    </v-btn>
    <v-btn>
      <v-icon @click="itemCreate()" color="info" flat>note_add</v-icon>
    </v-btn>
  </v-layout>
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
      return this.$store.getters["mgr/moduleFolderName"] + "/delete";
    },

    id0() {
      let collection = this.$store.getters["mgr/collection"];
      return collection[0].id;
    },

    pathToFirstItem() {
      let path =
        this.$store.getters["mgr/moduleBaseURL"] + "/" + this.id0 + "/show";
      return path;
    }
  },
  methods: {
    itemCreate() {
      let path = "/" + this.$store.getters["mgr/moduleBaseURL"] + "/create";
      console.log("editor.itemCreate pushing: " + path);
      //this.$router.push({ path: `/` });
      this.$router.push({ path: `${path}` });
    },

    itemUpdate() {
      //console.log("editor.itemUpdate current path: " + this.$route.path);
      let updatePath = this.$route.path.replace("show", "update");
      this.$router.push({ path: `${updatePath}` });
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