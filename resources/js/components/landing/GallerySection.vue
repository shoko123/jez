<template>
    <v-card fluid>
        <v-card-title class="bg-grey-lighten-3 text-black title"> <span>Gallery</span>
        </v-card-title>
        <v-carousel v-model="model" height="600" continuos cycle :show-arrows="false" hide-delimiters>
            <v-carousel-item v-for="(item, i) in images" :key="i" :value="i" :src="item.media.urls.full"
                :lazy-src="item.media.urls.tn" cover>
            </v-carousel-item>
        </v-carousel>
        <v-divider />
        <!-- <div class="text-h6 font-weight-bold ml-2">{{ current.title }}</div> -->
        <v-divider />
    </v-card>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { TMediaOfItem } from '../../types/mediaTypes'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../../scripts/stores/app'

let { configs } = storeToRefs(useAppStore())

const model = ref<number>(0)

const images = computed(() => {
    let c: Array<{ title: string, media: TMediaOfItem }> = []
    for (let i = 1; i <= 6; i++) {
        c.push({
            title: `Picture ${i}`,
            media: {
                mediaSource: 'Asset',
                urls: {
                    full: `${configs.value.bucketUrl}app/gallery/Gallery${i}.jpg`,
                    tn: `${configs.value.bucketUrl}app/gallery/Gallery${i}-tn.jpg`,
                },
            }
        })
    }
    return c
})


</script>
<style scoped>
#overlay {
    background-color: rgba(92, 19, 19, 0.4) !important;
    z-index: 20;
}
</style>