<template>
  <v-container>
    <template v-if="ready">
      <v-layout align-center justify-center>
        <v-flex xs12>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Media Editor for {{itemTypeAndTag}}</v-toolbar-title>
            </v-toolbar>

            <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
              <v-tab v-for="mediaTab in mediaTabs" :key="mediaTab.text">{{ mediaTab.text }}</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item v-for="mediaTab in mediaTabs" :key="mediaTab.text">
                <v-card flat color="basil">
                  <v-card-text>
                    <component v-bind:is="mediaTab.component"></component>

                    </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
            <v-card-title primary-title></v-card-title>
            <v-card-actions>
              <v-file-input
                v-model="file"
                label="Select Image File..."
                accept="image/*"
                @change="onFileChange"
              ></v-file-input>
              <v-btn @click="add">add media</v-btn>
              <v-btn @click="cancel">cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import ImagesEditor from "./ImagesEditor";
import ImagesMultiItemEditor from "./ImagesMultiItemEditor";
import IllustrationsEditor from "./IllustrationsEditor";
import PlansEditor from "./PlansEditor";

export default {
  components: {
    ImagesEditor,
    ImagesMultiItemEditor,
    IllustrationsEditor,
    PlansEditor
  },

  data() {
    return {
      myfiles: null,
      file: null,
      localImageUrl: null,
      //src: "http://jez/storage/app/public/DB/images/full/bach.jpeg",
      tab: null,
      items: ["images", "multi-item images", "illustrations", "plans"],
      mediaTabs: [
        { text: "images", component: ImagesEditor },
        { text: "multi-item images", component: ImagesMultiItemEditor },
        { text: "illustrations", component: IllustrationsEditor },
        { text: "plans", component: PlansEditor }
      ],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },

  computed: {
    imageUrl() {
      return `${this.$store.getters["storageUrl"]}/DB/images/full/bach.jpeg`;
    },
    ready() {
      return this.$store.getters["mgr/item"];
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
    images() {
      if (!this.scenes) {
        return [];
      }
      let itemScene = getters["med/scenes"].find(x => {
        return x.itemsInScene === 1;
      });
      if (itemScene === "undefined") {
        return [];
      }
      console.log("images: " + JSON.stringify(itemScene.images, null, 2));
      return itemScene.images;
    },
    imagesMultiItem() {}
  },
  methods: {
    add() {
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("name", this.file.name);
      //console.log("upload() myfiles: " + JSON.stringify(this.myfiles, null, 2))
      console.log(this.file);

      //let data = JSON.stringify(Object.fromEntries(formData));
      let xhrRequest = {
        endpoint: `/api/files/store`,
        action: "post",
        data: formData,
        spinner: true,
        verbose: true,
        snackbar: { onSuccess: true, onFailure: true },
        messages: {
          loading: "loading file",
          onSuccess: "Images uploaded successfully",
          onFailure: "failed loading file"
        }
      };
      return (
        this.$store
          .dispatch("xhr/xhr", xhrRequest)
          //return dispatch('xhr/xhr', xhrRequest, { root: true })
          .then(res => {
            //console.log('gss collection after xhr res: ' + JSON.stringify(res, null, 2));
            return res;
          })
          .catch(err => {
            console.log("gss Failed to load stones. err: " + err);
            return err;
          })
      );
      /*
      axios.post("/api/files/store", formData).then(response => {
        //this.$toastr.s("All images uplaoded successfully");
        this.images = [];
        this.files = [];
      });
      */
    },

    fileChange($event) {
      console.log(
        "fileChange() files: " + JSON.stringify(this.myfiles, null, 2)
      );
      //this.$router.push({ path: `/loci/list` });
    },
    onFileChange() {
      let reader = new FileReader();
      reader.onload = () => {
        this.localImageUrl = reader.result;
      };
      reader.readAsDataURL(this.file);
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

