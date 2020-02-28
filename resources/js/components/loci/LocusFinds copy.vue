<template>
  <v-container fluid class="pa-0 ma-0">
    <v-card class="elevation-12">
      <v-card-title class="grey py-0 mb-4">{{title}}</v-card-title>
      <v-card-text>
        <template v-if="finds">
          <v-container fluid>
            <v-row>
              <v-col v-for="find in finds" :key="find.id" class="d-flex child-flex" cols="2">
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-card class="mx-auto" max-width="350">
                      <template v-if="find.image">
                        <v-img
                          :src="find.srcThumbnail"
                          contain
                          aspect-ratio="1"
                          class="grey lighten-2"
                          max-width="330"
                        ></v-img>
                      </template>
                      <template v-else>
                        <v-img
                          :src="`${srcFiller}`"
                          aspect-ratio="1"
                          class="grey lighten-2"
                          max-width="330"
                        ></v-img>
                      </template>
                      <v-fade-transition>
                        <v-overlay v-if="hover" absolute color="#036358">
                          <h4>{{ find.tag }}</h4>
                          <h5>Description: {{ find.description }}</h5>
                          <v-btn @click="goTo(find)">Visit</v-btn>
                          <!--v-btn @click="editImage(image)">Edit</v-btn-->
                        </v-overlay>
                      </v-fade-transition>
                    </v-card>
                  </template>
                </v-hover>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <template v-else>
          <h1>NO FINDS</h1>
        </template>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  created() {
    //console.log("LocusFinds.created()");
  },
  computed: {
    finds() {
      return this.$store.getters["locusFinds/locusFinds"];
    },
   
    srcFiller() {
      return this.$store.getters["med/srcThumbnailFiller"];
    },
    title() {
      let title = null;
        if(!this.finds) {
          title = "Finds calculating"
        } else {
          title = "Finds (" + this.finds.length + ")";
        }
        return title;
    }
  },
  methods: {
    goTo(find) {
      let path = null;
      switch (find.findable_type) {
        case "Stone":
          path = `/finds/stones/${find.findable_id}/show`;
          break;
        case "Pottery":
          path = `/finds/pottery/${find.findable_id}/show`;
          break;
        default:
          alert("Not implemented yet");
          return;
      }
      this.$router.push({ path: `${path}` });
    }
  }
};
</script>



