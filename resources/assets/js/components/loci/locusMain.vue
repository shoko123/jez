<template>
    
    <v-container fluid class="ma-0 pa-0">

    
    <v-toolbar class="ma-0 pa-0">
        <v-toolbar-title>Loci</v-toolbar-title>


        <v-toolbar-items>
            <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
        </v-toolbar-items>
    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn flat>Link One</v-btn>
      <v-btn flat>Link Two</v-btn>
      <v-btn flat>Link Three</v-btn>
    </v-toolbar-items>
  </v-toolbar>
    

    <router-view></router-view>

    </v-container>
    <!--
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Locus</div>

                    <div class="card-body">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>-->
    
</template>

<script>
    export default {
        name: 'locus-main',

        data: () => ({
      items: [
        {
          text: 'Loci',
          disabled: false,
          href: '#'
        },
        {
          text: 'filter1',
          disabled: false,
          href: '#'
        },
        {
          text: 'filter2',
          disabled: true,
          href: '#'
        }
      ]
    })
    }
</script>