<template>
  <v-carousel height=800>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>


<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'http://jezreel-expedition.com/wp-content/uploads/2018/08/36188904_1941880392553632_3540573457441882112_o.jpg'
          },
          {
            src: "http://jezreel-expedition.com/wp-content/uploads/photo-gallery/DSC_0917%20k.jpg"
          },          
          {
            src: 'http://jezreel-expedition.com/wp-content/uploads/photo-gallery/2012%2010.JPG'
          },
          {
            src: 'http://jezreel-expedition.com/wp-content/uploads/photo-gallery/wilson%201881.jpg'
          },
        ]
      }
    }
  }
</script>
