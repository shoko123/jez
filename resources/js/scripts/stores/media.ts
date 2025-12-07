// stores/media.js
import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

import type { TMediaOfItem, TMediaUrls } from '@/types/mediaTypes'
import type { TModule } from '@/types/moduleTypes'
import type { TArray, TPageApi } from '@/types/collectionTypes'
import type { TAsyncSuccessOptionalMessage } from '@/types/xhrTypes'

import { useRoutesMainStore } from './routes/routesMain'
import { useAppStore } from './app'
import { useXhrStore } from './xhr'
import { useCollectionsStore } from './collections/collections'
import { useItemStore } from './item'
import { useModuleStore } from './module'
import { useNotificationsStore } from './notifications'

export const useMediaStore = defineStore('media', () => {
  const { send } = useXhrStore()
  const { showSnackbar } = useNotificationsStore()
  const { changeCount } = useModuleStore()
  const { configs } = storeToRefs(useAppStore())

  const { removeElement, getCollectionArray, elementByIndex, addElements, switchOrder } =
    useCollectionsStore()

  //Media collection index
  const mediaCollectionName = ref('Photo')
  const showUploader = ref<boolean>(false)

  function buildMedia(apiMedia: TMediaUrls | null, module?: TModule): TMediaOfItem {
    if (apiMedia === null || apiMedia === undefined) {
      return {
        mediaSource: 'Filler',
        urls: {
          full: `${configs.value.bucketUrl}app/fillers/${module}_Filler.jpg`,
          tn: `${configs.value.bucketUrl}app/fillers/${module}_Filler-tn.jpg`,
        },
      }
    } else {
      return {
        mediaSource: 'DB',
        urls: {
          full: `${configs.value.bucketUrl}${apiMedia.full}`,
          tn: `${configs.value.bucketUrl}${apiMedia.tn}`,
        },
      }
    }
  }

  //mediaUpload
  const images = ref<File[]>([])
  const imagesAsBrowserReadable = ref<string[]>([])
  const loadingToBrowser = ref<boolean>(false)

  const mediaReady = computed(() => {
    return images.value.length !== 0 && !loadingToBrowser.value
  })

  async function onInputChange() {
    if (images.value.length > 6) {
      alert('Max number of files is 6 - Upload aborted!')
      clearLocalImages()
      return
    }

    images.value.forEach((file) => {
      if (file.size > 1024 * 1024 * 2) {
        alert(`File ${file.name} exceeds max allowed 2MB - Upload aborted!`)
        clearLocalImages()
        return
      }
    })

    loadingToBrowser.value = true
    //console.log("Load files - started")
    try {
      await Promise.all(
        images.value.map(async (image) => {
          addImage(image)
        }),
      )
    } catch {
      showSnackbar(`Files upload to browser failed. Please try again later.`)
      clearLocalImages()
    }

    loadingToBrowser.value = false
  }

  async function addImage(file: File) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target) {
        //console.log(`media.push image`)
        imagesAsBrowserReadable.value.push(<string>e.target.result)
      }
    }
    reader.readAsDataURL(file)
  }

  function clearLocalImages() {
    images.value = []
    imagesAsBrowserReadable.value = []
    showUploader.value = false
    orderChanged.value = false
  }

  async function mediaUpload() {
    const { current } = storeToRefs(useRoutesMainStore())
    const { id } = storeToRefs(useItemStore())
    const fd = new FormData()

    images.value.forEach((file) => {
      fd.append('media_files[]', file, file.name)
    })

    fd.append('module', current.value.module!)
    fd.append('id', id.value as unknown as string)
    fd.append('media_collection_name', mediaCollectionName.value)

    const resUpload = await send<{ array: TArray<'media'>[]; page: TPageApi<'media'>[] }>(
      'media/upload',
      'post',
      fd,
    )
    if (!resUpload.success) {
      return resUpload
    }

    showUploader.value = false
    changeCount('media', images.value.length)
    clearLocalImages()

    // Update local media collections` array and page
    const resAdd = await addElements(
      'media',
      resUpload.data.array,
      true,
      resUpload.data.page,
      current.value.module,
    )
    return resAdd
  }

  //media destroy
  async function mediaDestroy(media_index: number) {
    const { current } = storeToRefs(useRoutesMainStore())
    const { id } = storeToRefs(useItemStore())
    const media_id = elementByIndex('media', media_index)
    console.log(
      `destroy() media_id: ${media_id}, model: ${current.value.module}, model_id: ${id.value}`,
    )

    const res = await send<{ success: boolean }>('media/destroy', 'post', {
      media_id,
      module: current.value.module,
      module_id: id.value,
    })

    if (res.success) {
      showUploader.value = false
      changeCount('media', -1)
      const ok = await removeElement('media', media_index, true, 'Gallery', current.value.module!)

      if (ok) {
        return { success: true }
      } else {
        return { success: false, message: 'Failed to remove element from local collection' }
      }
    }
    return { success: false, message: res.message }
  }

  //media reorder
  const orderChanged = ref(false)

  async function switchMediaElements(indexA: number, indexB: number): TAsyncSuccessOptionalMessage {
    console.log(`media.switchMediaElement(${indexA}, ${indexB})`)
    return await switchOrder('media', indexA, indexB)
  }

  async function mediaReorder() {
    const { current } = storeToRefs(useRoutesMainStore())
    const { id } = storeToRefs(useItemStore())

    const array = getCollectionArray('media')
    console.log(`reorder() model: ${current.value.module}, id: ${id.value} ,ordered: ${array}`)

    const res = await send<TArray<'media'>[]>('media/reorder', 'post', {
      module: current.value.module,
      module_id: id.value,
      ordered_media_ids: array,
    })

    if (res.success) {
      showUploader.value = false
      return { success: res.success }
    }
    return { success: false, message: res.message }
  }

  return {
    mediaReady,
    orderChanged,
    showUploader,
    mediaCollectionName,
    images,
    imagesAsBrowserReadable,
    buildMedia,
    onInputChange,
    clearLocalImages,
    mediaDestroy,
    switchMediaElements,
    mediaReorder,
    mediaUpload,
  }
})
