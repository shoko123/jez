<template>
  <v-card>
    <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ item.tag }}</h3>
        <div>Description: {{ item.description }}</div>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn flat :to="'/finds/groundstones/' + this.item.id +'/show'">Show</v-btn>
      
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "gs-card",
  props: {
    item: Object
  },
  data() {
    return {};
  },
  computed: {
  
  },

  methods: {}
};
</script>