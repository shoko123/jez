<template>
   <v-card class="mx-auto" max-width="90%">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Upload media form</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <!--div class="images-preview" v-if="images.length">
            <div class="img-wrapper" v-for="(image, index) in images" :key="index">
                <img :src="image" :alt="`Image Uplaoder ${index}`">
                <div class="details">
                    <span class="name" v-text="files[index].name"></span>
                    <span class="size" v-text="getFileSize(files[index].size)"></span>
                </div>
            </div>
      </div-->

      <h1>No files selected</h1>
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
          <v-col :cols="4">
            <!--v-btn @click="upload">Upload</v-btn-->
            <v-btn @click="uploadMultiple">Upload Multiple</v-btn>
            <v-btn @click="close">cancel</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      files: [],
      filesAsStrings: [],
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
    onInputChange() {
      //convert file to string for local display
      let reader = new FileReader();
      reader.onload = () => {
        //this.localImageUrl = reader.result;
      };
      //reader.readAsDataURL(this.file);
    },
    upload() {
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
    },
    uploadMultiple() {
      const formData = new FormData();

        this.files.forEach(file => {
             
                formData.append('myfiles[]', file, file.name);
           
                //formData.append('myfiles[]', file);
                //formData.append(files[i].name, files[i]);
            });

      //formData.append("files", this.files);
     

      //let data = JSON.stringify(Object.fromEntries(formData));
      let xhrRequest = {
        endpoint: `/api/files/storeMultiple`,
        action: "post",
        data: formData,
        spinner: true,
        verbose: true,
        snackbar: { onSuccess: true, onFailure: true },
        messages: {
          loading: "loading files",
          onSuccess: "Files uploaded successfully",
          onFailure: "failed loading files"
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
            console.log("Upload Failed to load files. err: " + err);
            return err;
          })
      );
    },

 
    close() {
      this.dialogAddMedia = false;
    }
  }
};
</script>

