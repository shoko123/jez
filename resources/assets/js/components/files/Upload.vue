<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>File uploader</v-toolbar-title>
          </v-toolbar>
          <v-card-text>

             <v-row align="center" justify="center">
    <v-img
      :src="imageUrl"
      aspect-ratio="1"
      class="grey lighten-2"
      max-width="500"
      max-height="300"
      contain
    ></v-img>
  </v-row>
            <v-card-title primary-title></v-card-title>
            <v-card-actions>
              <v-file-input
                v-model="file"
                label="Select Image File..."
                accept="image/*"
                @change="onFileChange"
              ></v-file-input>
              <v-btn @click="upload">upload</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      myfiles: null,
      file: null,
      localImageUrl: null,
      src: "http://jez/storage/images/full/bach.jpeg"
    };
  },

  computed: {
    imageUrl() {
      return `${this.$store.getters["storageUrl"]}/images/full/bach.jpeg`;
    }
  },
  methods: {
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
                verbose: true,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: "loading file", onSuccess: "Images uploaded successfully", onFailure: "failed loading file", },
            };
            return this.$store.dispatch("xhr/xhr", xhrRequest)
            //return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //console.log('gss collection after xhr res: ' + JSON.stringify(res, null, 2));
                    return res;
                })
                .catch(err => {
                    console.log('gss Failed to load stones. err: ' + err);
                    return err;
                })
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
  }
};
</script>

