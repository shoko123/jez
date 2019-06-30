<template>
  <v-card>
    <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ groundstone.tag }}</h3>
        <div>Description: {{ groundstone.description }}</div>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn flat :to="'/finds/groundstones/' + this.groundstone.id +'/show'">Show</v-btn>
      <v-btn flat color="orange">Explore</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "gs-card",
  props: {
    groundstone: Object
  },
  data() {
    return {};
  },
  computed: {
  
  },

  methods: {}
};
</script>