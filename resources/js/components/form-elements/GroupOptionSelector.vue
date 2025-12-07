<template>
    <template v-if="props.presentation === 'selectList'">
        <v-select :label=props.groupName :items="options" item-title="label" item-value="val" return-object
            v-model="selectedOption" @update:model-value="selected()"></v-select>
    </template>
    <template v-else>
        <v-text-field v-model="label" :label=props.groupName @click="openModal = true"></v-text-field>
        <v-dialog v-model="openModal" fullscreen>
            <v-container fluid>
                <v-card class="mx-auto" min-height="400" width="800">
                    <v-card-title class="bg-grey text-black py-0 mb-4"> {{ props.groupName }} Selector Form
                    </v-card-title>
                    <v-card-text class=text-center>
                        <v-row class="ga-3 mt-5">
                            <v-chip v-for="(option, index) in options" :key="index" large @click="clicked(index)">
                                {{ option.label }}
                            </v-chip>
                        </v-row>
                    </v-card-text>
                    <!-- <v-card-actions>
                        <v-btn variant="outlined" class="ml-1" @click="cancel"> Cancel </v-btn>
                        </v-card-actions> -->
                </v-card>
            </v-container>
        </v-dialog>
    </template>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTrioStore } from '../../scripts/stores/trio/trio'
import { useRoutesMainStore } from '../../scripts/stores/routes/routesMain'
import { TFieldValue } from '@/types/moduleTypes'

const { getOptionsByGroupName } = useTrioStore()
const { routerPush } = useRoutesMainStore()

const props = defineProps<{
    groupName: string,
    presentation: 'modal' | 'selectList',
    openModal?: boolean
}>()

const label = defineModel<string>('label')
const val = defineModel<number | string>('val')

// Init - start
const openModal = ref(props.openModal)
const options = ref(getOptionsByGroupName(props.groupName))
const index = options.value.findIndex(x => x.val === val.value)
const selectedOption = ref<{ label: string, val: TFieldValue }>(options.value[index]!)
// Init - end

const cancel = async () => {
    await routerPush('back1')
}

function clicked(index: number) {
    console.log(`clicked() selected: ${JSON.stringify(options.value[index], null, 2)}`)
    const s = options.value[index]!
    label.value = s.label
    val.value = s.val as string | number
    openModal.value = false
}

function selected() {
    console.log(`GroupOptionSelector.selected():  ${JSON.stringify(selectedOption.value, null, 2)}`)
    label.value = selectedOption.value?.label
    val.value = selectedOption.value?.val as number
}

</script>
