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
      return this.$store.getters["mg/moduleName"] + "/delete";
    },

    id0() {
      let collection = this.$store.getters["mg/collection"];
      return collection[0].id;
    },
    
    pathToFirstItem() {
      let path = this.$store.getters["mg/moduleBaseURL"] + "/" + this.id0 + "/show";
      return path;
    }
  },
  methods: {
    itemCreate() {
      let path = '/' + this.$store.getters["mg/moduleBaseURL"] + "/create";
      console.log("editor.itemCreate pushing: " + path);
      //this.$router.push({ path: `/` });
      this.$router.push({ path: `${path}` });
    },

    itemUpdate() {
      //console.log("editor.itemUpdate");
      
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

          //on a successful delete show success snackbar
          this.$store.commit("snackbar", {
            value: true,
            message: "item deleted successully. Redirected to first item",
            timeout: 5000,
            color: "green",
            mode: ""
          });

          //return;
          this.$router.push({ path: `${item0path}` });
          return res;
        })
        .catch(err => {
          //on a failed delete notify user with a snackbar. stay at local URI
          console.log("editor Failed to delete. err: " + err);
          
          this.$store.commit("snackbar", {
            value: true,
            message: "failed to delete item",
            timeout: 5000,
            color: "red",
            mode: ""
          });
          return err;
        });
    }  
  }
};
</script>