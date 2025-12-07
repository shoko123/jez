<template>
    <v-date-input v-model="date" :label="props.label" :error-messages="formattedError" :min="dateParams.min"
        :max="dateParams.max" :display-format="format" placeholder=" YYYY-MM-DD" clearable max-width="400"
        prepend-icon="" prepend-inner-icon="$calendar" @click:clear="date = null">
    </v-date-input>
</template>

<script lang="ts" setup>
import { defineProps, defineModel, computed } from "vue"
import { storeToRefs } from 'pinia'
import { VDateInput } from 'vuetify/labs/VDateInput'
import type { TFields, TFieldParamsSpecifics } from '@/types/moduleTypes'
import { useModuleStore } from '../../scripts/stores/module'
import { dateToISO8601String } from '../../scripts/utils/utils'
const { fieldsParams } = storeToRefs(useModuleStore())

const date = defineModel<Date | null>('date') // passed by parent
const props = defineProps<{
    label: string
    fieldName: string
    errorMsg: string | undefined
}>()

const dateParams = computed(() => {
    return fieldsParams.value![props.fieldName as keyof TFields][1] as unknown as TFieldParamsSpecifics<'DAT'>
})

function format(date: Date | null) {
    return dateToISO8601String(date)
}

const formattedError = computed(() => {
    if (props.errorMsg === undefined || props.errorMsg === `The value is required`) {
        return props.errorMsg
    }

    const regExp = /^(?<msg>^\D*)(?<val>\d+)$/
    const res = regExp.exec(props.errorMsg)
    if (res === null) {
        return `Unspecified validation Error`
    }

    // console.log(`DatePicker regExp errorMsg: ${props.errorMsg}. regExp.results: ${JSON.stringify(res, null, 2)}`)
    return regExpFormatter(res?.groups!)
})

function regExpFormatter(g: Record<string, string>) {
    // May have to fix this if Vuelidate decide to change their error messges
    switch (g.msg) {
        case 'The maximum value allowed is ':
            return `The latest allowed date is ${getDate(+g.val!)}`

        case 'The minimum value allowed is ':
            return `The earliest allowed date is ${getDate(+g.val!)}`

        default:
            return `Unspecified validation Error`
    }
}

function getDate(val: number) {
    return new Date(val).toISOString().substring(0, 10)
}
</script>