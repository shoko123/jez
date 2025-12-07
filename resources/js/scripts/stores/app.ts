import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import type { TModuleToUrlName } from '../../types/moduleTypes'
import { useXhrStore } from './xhr'
import { useAuthStore } from './auth'
import { useModuleStore } from './module'

type TAppConfigs = {
  appUrl: string
  bucketUrl: string
  googleMapsApiKey: string
  mediaCollectionNames: string[]
  appName: string
  primaryKey: {
    surrogate: boolean
    autoIncrement: boolean
  }
}
type TAppInit = {
  configs: TAppConfigs
  modules: TModuleToUrlName
  accessibility: {
    readOnly: boolean
    authenticatedUsersOnly: boolean
    registrationAllowed: boolean
  }
}

export const useAppStore = defineStore('app', () => {
  const { accessibility } = storeToRefs(useAuthStore())
  const { send } = useXhrStore()
  const { setModuleAndUrlNamesObjects } = useModuleStore()
  const initialized = ref(false)
  const configs = ref<TAppConfigs>({
    appUrl: '',
    bucketUrl: '',
    googleMapsApiKey: '',
    mediaCollectionNames: [],
    appName: '',
    primaryKey: {
      surrogate: false,
      autoIncrement: false,
    },
  })

  async function appInit() {
    const res = await send<TAppInit>('app/init', 'get')
    if (res.success) {
      accessibility.value = res.data.accessibility
      initialized.value = true
      configs.value = res.data.configs
      setModuleAndUrlNamesObjects(res.data.modules)
    } else {
      console.log(`app/init failed status: ${res.status} message: ${res.message}`)
      throw 'app.init() failed'
    }
  }

  return {
    appInit,
    initialized,
    configs,
  }
})
