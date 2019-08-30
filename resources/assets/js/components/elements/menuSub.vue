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
  name: "subMenu",
  components: { navigator, editor },

created() {
    
  },

  data() {
    return {};
  },
  computed: {
    subMenuTitle() {
      return `${this.$store.getters['mg/moduleCollectionName']} (${this.$store.getters['mg/count']})`;//return 'item';
    },
    showEditor() {
      return true;
    },
    showNavigator() {
      return true;
    },

    itemsCount() {
      return `(${this.$store.getters['mg/count']})`;
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
</style>