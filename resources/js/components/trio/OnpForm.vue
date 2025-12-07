<template>
    <v-dialog v-if="onpFormData.isOpen" v-model="onpFormData.isOpen" width="auto">
        <v-card class="mx-auto" width="800">
            <v-card-title class="bg-primary">
                Numeric Value Entry Form
            </v-card-title>
            <v-card-text>
                <v-row>
                    {{ onpFormData.grpLabel }} : {{ onpFormData.optionName }}({{ onpFormData.unitLabel }})
                    [min: {{ onpFormData.min }}, max: {{ onpFormData.max }}]
                </v-row>
                <v-row>
                    <v-number-input v-model="onpFormData.onpValue" :precision="onpFormData.shift"
                        control-variant="hidden" :error-messages="errorMessage" @input="change()"
                        autofocus></v-number-input>
                </v-row>
            </v-card-text>
            <v-card-actions class="justify-start">
                <v-btn variant="outlined" class="ml-1" @click="submit()" :disabled="errorMessage !== null"> Set Value
                </v-btn>
                <v-btn variant="outlined" class="ml-1" @click="reset()"> Reset </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTrioOnpStore } from '../../scripts/stores/trio/trioOnp'

const errorMessage = ref<string | null>(null)

const { close } = useTrioOnpStore()
const { onpFormData } = storeToRefs(useTrioOnpStore())

function submit() {
    if (errorMessage.value !== null) {
        return
    }
    close()
}

function reset() {
    onpFormData.value.onpValue = null
}

function change() {
    if (onpFormData.value.onpValue === null) {
        errorMessage.value = null
    } else {
        errorMessage.value = onpFormData.value.onpValue! < onpFormData.value.min || onpFormData.value.onpValue! > onpFormData.value.max ? `Out of range` : null
    }
}

</script>