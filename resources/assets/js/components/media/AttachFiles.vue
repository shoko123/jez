<template>
  <v-card class="mx-auto" max-width="90%">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Upload media form (AttachFiles)</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <div class="images-preview" v-if="filesAsUrlStrings.length">
        <v-container fluid>
          <v-row>
            <v-col
              v-for="image in filesAsUrlStrings"
              :key="image.file"
              class="d-flex child-flex"
              cols="2"
            >
              <v-card flat tile class="d-flex">
                <v-img :src="image" aspect-ratio="1" class="grey lighten-2">
                  <!--v-row class="lightbox white--text fill-height ma-0" align="center" justify="center">
              <v-col>
                <div class="subheading">{{image.sceneTag}}</div>
                <div class="body-1">image {{image.image_no}}</div>
              </v-col>
                  </v-row-->
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!--div class="images-preview" v-if="filesAsUrlStrings.length">
            <div class="img-wrapper" v-for="(image, index) in filesAsUrlStrings" :key="index">
                <img :src="image" :alt="`Image Uplaoder ${index}`">
                <div class="details">
                    <span class="name" v-text="files[index].name"></span>
                    <span class="size" v-text="getFileSize(files[index].size)"></span>
                </div>
            </div>
      </div>

      <h1>No files selected</h1-->
    </v-card-text>
    <v-card-actions>
      <v-container fluid>
        <v-row no-gutters>
          <v-col :cols="4">
            <v-file-input
              multiple
              chips
              v-model="files"
              label="Select Files..."
              accept="image/*"
              @change="onInputChange"
            ></v-file-input>
          </v-col>
          <v-col :cols="8">
            <v-row>
              <div v-if="filesAsUrlStrings.length">
                <v-btn @click="clear" class="primary--text mr-2">clear</v-btn>
                <v-btn @click="uploadMultiple" class="primary--text mr-2">Upload Multiple</v-btn>
              </div>
              <v-btn @click="close" class="primary--text mr-2">cancel</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  created() {
    this.clear();
  },
  data() {
    return {
      //file: null,
      files: [],
      filesAsUrlStrings: []
    };
  },

  computed: {
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
    clear() {
      this.files = this.filesAsUrlStrings = [];
    },

    onInputChange(e) {
      console.log("OnInputChange");
      Array.from(this.files).forEach(file => this.addImage(file));
    },

    addImage(file) {
      const img = new Image(),
        reader = new FileReader();
      reader.onload = e => this.filesAsUrlStrings.push(e.target.result);
      reader.readAsDataURL(file);
    },

    close() {
      this.dialogAddMedia = false;
    },

    uploadMultiple() {
      const formData = new FormData();

      this.files.forEach(file => {
        formData.append("myfiles[]", file, file.name);

        //formData.append('myfiles[]', file);
        //formData.append(files[i].name, files[i]);
      });
      let details = {type: "Scene", data: null}
      let itemScene = this.$store.getters["med/scenes"].find(x => {
        return x.itemsInScene === 1;
      });

      if (itemScene === undefined) {
        //new scene
        itemScene = {
          scene_id: null,
          description: "",
          sceneables: [
            {
              sceneable_type: this.$store.getters["mgr/status"].moduleItemName,
              sceneable_id: this.$store.getters["mgr/status"].id
            }
          ]
        };
        console.log(
          "creating new scene with one item: " +
            JSON.stringify(itemScene, null, 2)
        );
      }

      details.data = itemScene;
      formData.append("info", JSON.stringify(itemScene));
      formData.append("media", JSON.stringify(this.$store.getters["med/media"]));
      formData.append("details", JSON.stringify(details));
      //formData.append("files", this.files);
      
      this.$store.dispatch("med/uploadMultiple", formData).then(res => {


        this.clear();
        this.close();
        return res;
      });
    }
  }
};
</script>

