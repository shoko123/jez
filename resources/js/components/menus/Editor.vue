<template>
  <v-row align="center" justify="center" py-0 my-0>
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn @click="itemUpdate()" large outlined color="info" dark v-on="on">
          <v-icon>edit</v-icon>
        </v-btn>
      </template>
      <span>Edit {{status.itemName}} details</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn @click="media()" large outlined color="info" dark v-on="on">
          <v-icon>camera</v-icon>
        </v-btn>
      </template>
      <span>Edit {{status.itemName}} media</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn @click="itemDelete()" large outlined color="info" dark v-on="on">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>
      <span>Delete {{status.itemName}}</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn @click="itemCreate()" large outlined color="info" dark v-on="on">
          <v-icon>note_add</v-icon>
        </v-btn>
      </template>
      <span>Create new {{status.itemName}}</span>
    </v-tooltip>
  </v-row>
</template>


<script>
export default {
  name: "editor",
  components: {},

  created() {
    //console.log("editorCreate");
  },

  data() {
    return {};
  },
  computed: {
    status() {
      return this.$store.getters["mgr/status"];
    }
  },
  methods: {
    itemCreate() {
      if (!this.$store.getters["mgr/status"].isImplemented) {
        alert("Not implemented yet");
        return;
      }
      switch (this.$store.getters["mgr/status"].itemName) {
        case "Locus":
        case "Stone":
          break;
        default:
          alert("not implemented yet");
          return false;
      }

      let path = this.$store.getters["mgr/status"].moduleAppBaseUrl + "/create";
      console.log("editor.itemCreate pushing: " + path);
      //this.$router.push({ path: `/` });
      this.$router.push({ path: `${path}` });
    },

    itemUpdate() {
      if (!this.$store.getters["mgr/status"].isImplemented) {
        alert("Not implemented yet");
        return;
      }
      switch (this.$store.getters["mgr/status"].itemName) {
        case "Locus":
        case "Stone":
          break;
        default:
          alert("not implemented yet");
          return false;
      }
      //console.log("editor.itemUpdate current path: " + this.$route.path);
      let updatePath = this.$route.path.replace("show", "update");
      this.$router.push({ path: `${updatePath}` });
    },

    media() {
      if (!this.$store.getters["mgr/status"].isImplemented) {
        alert("Not implemented yet");
        return;
      }

      //we reach this section only if this module is implemented in code.
      let mediaPath = this.$route.path.replace("show", "media");
      this.$router.push({ path: `${mediaPath}` });
    },

    itemDelete() {
      if (!this.$store.getters["mgr/status"].isImplemented) {
        alert("Not implemented yet");
        return;
      }

      switch (this.$store.getters["mgr/status"].itemName) {
        case "Pottery":
          alert("not implemented yet");
          return;

        default:
          break;
      }

      //we reach this section only if this module is implemented in code.
      if (!this.$store.getters["mgr/status"].isDeleteable) {
        alert(" Can't delete due to existence of media or related modules");
        return;
      }
      if (!confirm("Are you sure you want to delete this item?")) {
        return;
      }
      //call module specific delete function

      this.$store
        .dispatch("mgr/delete", this.$route.params.id)
        .then(res => {
          //let item0path = this.pathToFirstItem;
          //console.log("after dispatch(delete) going to: " + item0path);
          this.$router.push({
            path: `${this.$store.getters["mgr/status"].moduleAppBaseUrl}/${this.$store.getters["mgr/collection"][0].id}/show`
          });
          return res;
        })
        .catch(err => {
          console.log("Failed to delete item. err: " + err);
        });
    }
  }
};
</script>