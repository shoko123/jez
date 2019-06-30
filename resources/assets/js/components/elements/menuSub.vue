<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar>
      <v-toolbar-items>
        <v-btn flat>item</v-btn>

        <v-divider class="mx-3" inset vertical></v-divider>

        <template v-if="showNavigator">
          <navigator/>
        </template>
        <template v-if="showEditorTools">
          <v-divider class="mx-3" inset vertical></v-divider>

          <v-btn>
            <v-icon @click="itemUpdate()">edit</v-icon>
          </v-btn>
          <v-btn>
            <v-icon @click="itemDelete()">delete</v-icon>
          </v-btn>
          <v-btn>
            <v-icon @click="itemNew()">note_add</v-icon>
          </v-btn>
        </template>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn @click="welcome" color="info" flat>welcome</v-btn>
        <v-btn @click="displayOptions()" color="info" flat>display options</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template>

<script>
import navigator from "./navigator";

export default {
  name: "subMenu",
  components: { navigator },

created() {
    
  },

  data() {
    return {};
  },
  computed: {
    tag() {
      return this.$store.getters[this.$store.getters["mg/itemName"]].tag;
    },

    findFormData() {
      return this.$store.getters.findFormData;
    },
    isCreate: {
      get() {
        return this.findFormData.isCreate;
      },
      set(data) {
        this.$store.commit("isCreate", data);
      }
    },
    subMenuTitle() {
      return 'item';
    },
    showEditorTools() {
      return true;
    },
    showNavigator() {
      return true;
    },
    item0() {
      let items = this.$store.getters['gs/items']
      return items[0].id;
    },
    itemsCount() {
      return this.$store.getters['gs/itemsCount'];
    }
  },
  methods: {
    welcome() {
      this.$router.push({ path: `/items/welcome` });
    },

    itemDelete() {
      this.$store.commit("isLoading", {
        value: true,
        message: "deleting item",
        progressColor: "green"
      });

      this.$store
        .dispatch('gs/itemDelete', this.$route.params.id)
        .then(res => {
          this.$store.commit("isLoading", {
            value: false,
            message: "",
            progressColor: "green"
          });

          this.$store.commit("snackbar", {
            value: true,
            message: "item deleted successully. Redirected to first item",
            timeout: 5000,
            color: "green",
            mode: ""
          });
          //go to update item list
          console.log("after dispatch(delete) going to stone id " + this.item0);
          this.$store.dispatch('gs/item', this.item0)
          .then(res => {

            this.$router.push({ path: `/items/${this.item0}` });
          });         
        })
        .catch(err => {
          console.log("Error in itemDelete" + err.response);
        });
    },
    itemNew() {
      this.isCreate = true;
      this.$router.push({ path: `/items/create` });
    },

    itemUpdate() {
      this.isCreate = false;
      this.$router.push({ path: `/items/create` });
    },
    displayOptions() {}
  }
};
</script>

<style scoped>
</style>