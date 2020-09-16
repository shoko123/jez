<template>
  <v-row align="center" justify="center" py-0 my-0>
    <v-tooltip v-if="isAllowed('update')" top>
      <template v-slot:activator="{ on }">
        <v-btn @click="itemUpdate()" large outlined color="info" dark v-on="on">
          <v-icon>edit</v-icon>
        </v-btn>
      </template>
      <span>Edit {{status.itemName}} details</span>
    </v-tooltip>

    <v-tooltip v-if="isAllowed('media')" top>
      <template v-slot:activator="{ on }">
        <v-btn @click="goToMedia()" large outlined color="info" dark v-on="on">
          <v-icon>camera</v-icon>
        </v-btn>
      </template>
      <span>Manage {{status.itemName}} media</span>
    </v-tooltip>

    <v-tooltip v-if="isAllowed('tag')" top>
      <template v-slot:activator="{ on }">
        <v-btn @click="goToTagger()" large outlined color="info" dark v-on="on">
          <v-icon>mdi-tag</v-icon>
        </v-btn>
      </template>
      <span>Manage {{status.itemName}} tags</span>
    </v-tooltip>

    <v-tooltip v-if="isAllowed('delete')" top>
      <template v-slot:activator="{ on }">
        <v-btn @click="itemDelete()" large outlined color="info" dark v-on="on">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>
      <span>Delete {{status.itemName}}</span>
    </v-tooltip>

    <v-tooltip v-if="isAllowed('create')" top>
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
    },
  },

  methods: {
    isAllowed(permissionName) {
      let fullPremissionName =
        this.$store.getters["mgr/appStatus"].module + "-" + permissionName;
      //let fullPremissionName = this.status.itemName + "-" + permissionName;

      return this.$store.getters["aut/can"](fullPremissionName);
    },

    itemCreate() {
      if (!this.$store.getters["mgr/status"].isImplemented) {
        alert("Not implemented yet");
        return;
      }
      switch (this.$store.getters["mgr/appStatus"].module) {
        case "Locus":
        case "Stone":
        //case "Glass":
        //case "Lithic":
        //case "Metal":
          break;
        default:
          alert("not implemented yet");
          return false;
      }

      //let path = this.$store.getters["mgr/status"].moduleAppBaseUrl + "/create";
      //console.log("editor.itemCreate pushing: " + path);
      //this.$router.push({ path: `/` });
      this.$router.push({
        path: `${this.$store.getters["mgr/status"].moduleAppBaseUrl}/create`,
      });

      //this.$router.push({ path: `${path}` });
    },

    itemUpdate() {
      if (!this.$store.getters["mgr/status"].isImplemented) {
        alert("Not implemented yet");
        return;
      }
      switch (this.$store.getters["mgr/appStatus"].module) {
        case "Locus":
        case "Stone":
          break;
        default:
          alert("not implemented yet");
          return false;
      }
      this.$router.push({
        path: `${this.$router.currentRoute.path.replace("show", "update")}`,
      });
    },

    goToMedia() {
      if (!this.$store.getters["mgr/status"].isImplemented) {
        alert("Not implemented yet");
        return;
      }

      //we reach this section only if this module is implemented in code.
      this.$router.push({
        path: `${this.$router.currentRoute.path.replace("show", "media")}`,
      });
    },

    goToTagger() {
      if (this.$store.getters["aux/newItem"].length === 0) {
        alert(
          `Tagging system for "${this.$store.getters["mgr/appStatus"].module}" not implemented yet!`
        );
      } else {
        this.$router.push({
          path: `${this.$router.currentRoute.path.replace("show", "tags")}`,
        });
      }
    },
    itemDelete() {
      if (!this.$store.getters["mgr/status"].isImplemented) {
        alert("Not implemented yet");
        return;
      }

      switch (this.$store.getters["mgr/appStatus"].module) {
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
      this.$store.dispatch(
        "mgr/delete",
        parseInt(this.$router.currentRoute.params.id, 10)
      );
    },
  },
};
</script>