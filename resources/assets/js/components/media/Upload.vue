<template>
  
          <v-card>
            <v-card-actions>
              <v-file-input
                v-model="file"
                label="Select Image File..."
                accept="image/*"
                @change="onFileChange"
              ></v-file-input>
              <v-btn @click="add">Upload</v-btn>
              <v-btn @click="close">cancel</v-btn>
            </v-card-actions>
          </v-card>
 
</template>

<script>
export default {
  data() {
    return {
      myfiles: null,
      file: null,
      localImageUrl: null
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
    close() {
      this.dialogAddMedia = false;
    }
  }
};
</script>

