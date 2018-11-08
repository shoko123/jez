

<!--

<template>
        <v-app id="main">
            <Header/>
            <div class="content">
                <router-view></router-view>
            </div>
        </v-app>
</template>

-->

<template>

<v-app id="main">
    <vfyHeader/>
  <v-content>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-content>
  <v-footer app></v-footer>
</v-app>
</template>


<script>

    import Header from './Header.vue';
    import vfyHeader from './vfyHeader.vue';
    
    export default {
        name: 'main-app',
        components: {vfyHeader}
    }
</script>
