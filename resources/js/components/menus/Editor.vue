<template>
  <v-container class="ma-0 pa-0 min_width">
    <v-row align="center">
      <v-tooltip v-if="isAllowed('update')" top>
        <template v-slot:activator="{ on }">
          <v-btn
            @click="itemUpdate()"
            large
            outlined
            color="info"
            dark
            v-on="on"
          >
            <v-icon>edit</v-icon>
          </v-btn>
        </template>
        <span>Edit {{ status.itemName }} details</span>
      </v-tooltip>

      <v-tooltip v-if="isAllowed('media')" top>
        <template v-slot:activator="{ on }">
          <v-btn
            @click="goToMedia()"
            large
            outlined
            color="info"
            dark
            v-on="on"
          >
            <v-icon>camera</v-icon>
          </v-btn>
        </template>
        <span>Manage {{ status.itemName }} media</span>
      </v-tooltip>

      <v-tooltip v-if="isAllowed('tag')" top>
        <template v-slot:activator="{ on }">
          <v-btn
            @click="goToTagger()"
            large
            outlined
            color="info"
            dark
            v-on="on"
          >
            <v-icon>mdi-tag</v-icon>
          </v-btn>
        </template>
        <span>Manage {{ status.itemName }} tags</span>
      </v-tooltip>

      <v-tooltip v-if="isAllowed('delete')" top>
        <template v-slot:activator="{ on }">
          <v-btn
            @click="itemDelete()"
            large
            outlined
            color="info"
            dark
            v-on="on"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
        <span>Delete {{ status.itemName }}</span>
      </v-tooltip>

      <v-tooltip v-if="isAllowed('create')" top>
        <template v-slot:activator="{ on }">
          <v-btn
            @click="itemCreate()"
            large
            outlined
            color="info"
            dark
            v-on="on"
          >
            <v-icon>note_add</v-icon>
          </v-btn>
        </template>
        <span>Create new {{ status.itemName }}</span>
      </v-tooltip>
    </v-row></v-container
  >
</template>


<script>
export default {
  computed: {
    status() {
      return this.$store.getters["mgr/status"];
    },
  },

  methods: {
    isAllowed(permissionName) {
      let fullPermissionName =
        this.$store.getters["mgr/appStatus"].module + "-" + permissionName;
      return this.$store.getters["aut/can"](fullPermissionName);
    },

    itemCreate() {
      switch (this.$store.getters["mgr/appStatus"].module) {
        case "Locus":
        case "Stone":
        case "Glass":
        case "Lithic":
        case "Metal":
        case "Pottery":
          break;

        default:
          alert("'Create' page not implemented yet");
          return false;
      }

      this.$router.push({
        path: `${this.$store.getters["mgr/status"].moduleAppBaseUrl}/create`,
      });

      //this.$router.push({ path: `${path}` });
    },

    itemUpdate() {
      switch (this.$store.getters["mgr/appStatus"].module) {
        case "Area":
        case "Season":
        case "AreaSeason":
        case "Locus":
        case "Stone":
        case "Glass":
        case "Lithic":
        case "Metal":
        case "Pottery":
          break;

        default:
          alert("'Edit' page not implemented yet");
          return false;
      }
      this.$router.push({
        path: `${this.$router.currentRoute.path.replace("show", "update")}`,
      });
    },

    goToMedia() {
      //we reach this section only if this module is implemented in code.
      this.$router.push({
        path: `${this.$router.currentRoute.path.replace("show", "media")}`,
      });
    },

    goToTagger() {
      switch (this.$store.getters["mgr/appStatus"].module) {
        //case "Locus":
        case "Stone":
        case "Glass":
        case "Lithic":
        case "Metal":
        case "Pottery":
          break;

        default:
          alert("'Tagging' page not implemented yet");
          return;
      }


/*
      if (this.$store.getters["aux/newItem"].length === 0) {
        alert(
          `Tagging system for "${this.$store.getters["mgr/appStatus"].module}" not implemented yet!`
        );
      } else {
        this.$router.push({
          path: `${this.$router.currentRoute.path.replace("show", "tags")}`,
        });
      }
*/
this.$router.push({
          path: `${this.$router.currentRoute.path.replace("show", "tags")}`,
        });

    },
    itemDelete() {
      switch (this.$store.getters["mgr/appStatus"].module) {
        case "Locus":
        case "Stone":
        case "Glass":
        case "Lithic":
        case "Metal":
        case "Pottery":
          break;

        default:
          alert("'Delete' page not implemented yet");
          return;
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
<style scoped>
.min_width {
   min-width: 400px;
}
</style>