<template>
  <!--v-toolbar flat>
  <v-toolbar-items-->
  <!--v-card outlined  class="mx-auto">
  <v-card-text align="center" justify="center" py-0 my-0-->
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
    status() {
      return this.$store.getters["mgr/status"];
    },
    deletePath() {
      return this.$store.getters["mgr/status"].moduleName + "/delete";
    },

    id0() {
      return this.$store.getters["mgr/collection"][0].id;
    },

    pathToFirstItem() {
      return (
        this.$store.getters["mgr/status"].moduleAppBaseUrl + "/" + this.id0 + "/show"
      );
    }
  },
  methods: {
    isImplemented() {
      switch (this.$store.getters["mgr/status"].itemName) {
        case "Locus":
        case "Stone":
        case "Pottery":
          return true;
        default:
          alert("Not impemented yet");
          return false;
      }
    },

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
          alert("unauthorized action");
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
          alert("unauthorized action");
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
        case "Locus":
        case "Pottery":
          alert("unauthorized action");
          return;

        default:
          break;
      }

      //we reach this section only if this module is implemented in code.
      if (!this.$store.getters["mgr/status"].isDeleteable) {
        alert(" Can't delete due to existence of media or related modules");
        return;
      }

      //call module specific delete function

      this.$store
        .dispatch(this.deletePath, this.$route.params.id)
        .then(res => {
          let item0path = this.pathToFirstItem;
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