<template>
    <v-row class="ga-1">
        <v-col cols=2>
            <v-btn v-if="registrarLabel !== null" :class="'bg-green-lighten-3'" @click="openSpecificRegistrar">{{
                registrarLabel }}</v-btn>
        </v-col>
    </v-row>

    <v-dialog v-model="openIdSelectorModal" width="auto">
        <v-card class="mx-auto" width="800">
            <v-card-title class="bg-primary">
                Resgisration Form ({{ current.module }})
            </v-card-title>
            <v-card-text>
                <v-row class="my-4 mr-2">
                    <Suspense>
                        <v-container fluid>
                            <component :is="ModuleSpecificRegistrar" ref="child"
                                v-model:specificLabel="registrarLabel" />
                        </v-container>
                    </Suspense>
                </v-row>
            </v-card-text>
            <v-card-actions class="justify-start">
                <v-btn variant="outlined" class="ml-1" @click="cancel"> Cancel </v-btn>
                <v-btn v-if="registrarLabel" variant="outlined" :class="'bg-green-lighten-3'" @click="accept">
                    {{ registrarLabel }} </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { computed, type Component, defineAsyncComponent, ref, markRaw } from 'vue'
import { storeToRefs } from 'pinia'
import type { TModule } from '@/types/moduleTypes'
import { useItemNewStore } from '../../scripts/stores/itemNew'
import { useRoutesMainStore } from '../../scripts/stores/routes/routesMain'
import { useModuleStore } from '../../scripts/stores/module'

const { module, moduleToUrlModuleName } = storeToRefs(useModuleStore())
let { routerPush } = useRoutesMainStore()
const { current } = storeToRefs(useRoutesMainStore())
const { openIdSelectorModal, } = storeToRefs(useItemNewStore())

const registrarLabel = ref<string | null>(null)

// Vue needs to statically 'compile' components
const specificRegistrarObj = ref<Partial<Record<TModule, Component>>>({})
for (let key in moduleToUrlModuleName.value) {
    const componentLocation = ['Ceramic', 'Stone', 'Lithic', 'Fauna', 'Metal', 'Glass'].includes(key) ? `./FindsRegistrar.vue` : `../modules/${module.value}/${module.value}Registrar.vue`
    specificRegistrarObj.value[key as TModule] = markRaw(defineAsyncComponent(() => import(componentLocation)))
}

const ModuleSpecificRegistrar = computed<Component>(() => {
    return specificRegistrarObj.value[module.value]!
})

const child = ref()

const accept = () => {
    child.value.accept()
}

function openSpecificRegistrar() {
    registrarLabel.value = null
    openIdSelectorModal.value = true
}

const cancel = async () => {
    await routerPush('back1')
}
</script>