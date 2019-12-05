<template>
  <div>
    <v-container fluid class="ma-0 pa-0">
      <v-toolbar :elevation="10">
        <v-toolbar-title class="primary--text mr-2" text>Media Editor for {{itemTypeAndTag}}</v-toolbar-title>
        
        <v-toolbar-items>
          <v-btn slot="activator" label="tag" @click="add()" class="primary--text mr-2">Add media</v-btn>
            <v-dialog v-model="dialogAddMedia" persistent>
              <AttachFiles />
            </v-dialog>
            <v-spacer></v-spacer>
          <v-btn @click="cancel" class="primary--text mr-2">back to {{itemType}}</v-btn>
        </v-toolbar-items>
      </v-toolbar>
  
      <template v-if="ready">
        <v-tabs v-model="tab" background-color="transparent" color="basil">
          <v-tab v-for="mediaTab in mediaTabs" :key="mediaTab.text">{{ mediaTab.text }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="mediaTab in mediaTabs" :key="mediaTab.text">
            <component v-bind:is="mediaTab.component"></component>
          </v-tab-item>
        </v-tabs-items>

       
        
      </template>
    </v-container>
  </div>
</template>

<script>
import ImagesEditor from "./ImagesEditor";
import ImagesMultiItemEditor from "./ImagesMultiItemEditor";
import IllustrationsEditor from "./IllustrationsEditor";
import PlansEditor from "./PlansEditor";
import AttachFiles from "./AttachFiles";

export default {
  components: {
    ImagesEditor,
    ImagesMultiItemEditor,
    IllustrationsEditor,
    PlansEditor,
    AttachFiles
  },
  created() {
    this.dialogAddMedia = false;
  },

  data() {
    return {
      tab: null,
      items: ["images", "multi-item images", "illustrations", "plans"],
      mediaTabs: [
        { text: "images", component: ImagesEditor },
        { text: "multi-item images", component: ImagesMultiItemEditor },
        { text: "illustrations", component: IllustrationsEditor },
        { text: "plans", component: PlansEditor }
      ],
      dialog: false,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },

  computed: {
    ready() {
      return this.$store.getters["mgr/item"];
    },
    itemType() {
      return this.$store.getters["mgr/moduleItemName"];
    },
    itemTypeAndTag() {
      return (
        this.$store.getters["mgr/moduleItemName"] +
        " " +
        this.$store.getters["mgr/item"].tag
      );
    },
    scenes() {
      return this.$store.getters["med/scenes"];
    },
   
    imagesMultiItem() {},

    dialogAddMedia: {
      get() {
        return this.$store.getters["med/dialogAddMedia"];
      },
      set(data) {
        this.$store.commit("med/dialogAddMedia", data);
      }
    }
  },
  methods: {
    add() {
      this.dialogAddMedia = true;
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

