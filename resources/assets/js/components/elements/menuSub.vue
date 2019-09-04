<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar>
      <v-toolbar-items>
        <v-btn flat>{{subMenuTitle}}</v-btn>

        <v-divider class="mx-3" inset vertical></v-divider>

        <template v-if="showNavigator">         
          <navigator/>
        </template>
        
        <v-divider class="mx-3" inset vertical></v-divider>
        
        <template v-if="showEditor">          
          <editor></editor>
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
import editor from "./editor";

export default {
  name: "menuSub",
  components: { navigator, editor },

created() {
    console.log("menuSub.created()");
  },

  data() {
    return {};
  },
  computed: {
    subMenuTitle() {
      return `${this.$store.getters["mgr/moduleCollectionName"]} (${this.$store.getters["mgr/count"]})`;//return 'item';
    },
    showEditor() {
      return true;
    },
    showNavigator() {
      return true;
    },

    itemsCount() {
      return `(${this.$store.getters["mgr/count"]})`;
    }
  },
  methods: {
     welcome() {
      //this.$router.push({ path: `/items/welcome` });
    },
    displayOptions() {}
  }
};
</script>

<style scoped>
*{ text-transform: none !important; } 
</style>