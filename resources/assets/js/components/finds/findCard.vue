<template>
  
        <v-card>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ find.tag }}</h3>
              <div>Description: {{ find.description }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat :to="'/finds/' + this.find.id">Show</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
     
</template>

<script>
export default {
  name: "find-card",
  props: {
    find: Object,
  },
  data() {
    return {
     
    };
  },
  computed: {
    findFormatted() {
      let findFormatted = {
                id: this.find.id,
                tag: this.find.find.locus.area.year + '.' +
                    this.find.find.locus.area.area + '.' +
                    this.find.find.locus.locus + ' Reg: ' +
                    this.find.find.registration_category + ' Bskt: ' +
                    this.find.find.basket_no + ' No: ' +
                    this.find.find.item_no,
                description: this.find.description
            }
    }
  },

  methods: {}
};
</script>