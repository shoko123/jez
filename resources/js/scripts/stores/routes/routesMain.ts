// routesStore.js
//handles the entire routing mechanism - parsing, loading resources, error handling

import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import {
  useRouter,
  type LocationQueryRaw,
  type RouteLocationNormalized,
  type RouteLocationRaw,
} from 'vue-router'
import type { TModule } from '@/types/moduleTypes'
import type { TRouteInfo, TPageName, TPlanAction } from '@/types/routesTypes'

import { useRoutesPlanTransitionStore } from './routesPlanTransition'
import { useRoutesPrepareStore } from './routesPrepare'
import { useAuthStore } from '../auth'
import { useModuleStore } from '../module'
import { useTrioStore } from '../trio/trio'
import { useNotificationsStore } from '../notifications'
import { useElementAndCollectionStore } from '../collections/elementAndCollection'

export const useRoutesMainStore = defineStore('routesMain', () => {
  const router = useRouter()
  const { planTransition } = useRoutesPlanTransitionStore()
  const { showSnackbar, showSpinner } = useNotificationsStore()
  const { parseModule } = useModuleStore()
  const { moduleToUrlModuleName } = storeToRefs(useModuleStore())

  const current = ref<TRouteInfo>({
    url_module: undefined,
    slug: undefined,
    url_full_path: undefined,
    module: undefined,
    name: 'home',
    queryParams: undefined,
  })

  const to = ref<TRouteInfo>({
    url_module: undefined,
    slug: undefined,
    url_full_path: undefined,
    module: undefined,
    name: 'home',
    queryParams: undefined,
  })

  const preLogPath = ref<undefined | string>(undefined)
  const redirectedPreLogPath = ref<boolean>(false)

  const inTransition = ref(false)

  async function handleRouteChange(
    handle_from: RouteLocationNormalized,
    handle_to: RouteLocationNormalized,
  ): Promise<RouteLocationRaw | true> {
    const { prepareForNewRoute } = useRoutesPrepareStore()

    console.log(`handleRouteChange(${handle_from.name as string})} -> ${handle_to.name as string})`)

    const req = requiresAuthRedirection(handle_to)
    if (req.redirect) {
      showSnackbar(req.message)
      return { name: req.name }
    } else {
      console.log(`No Redirection required`)
    }

    if (handle_to.name === 'login') {
      if (redirectedPreLogPath.value) {
        redirectedPreLogPath.value = false
      } else {
        console.log(`****** REGLULAR preLogPath(${handle_to.fullPath})`)
        preLogPath.value = handle_from.fullPath
      }
    }

    to.value.name = <TPageName>handle_to.name
    to.value.url_full_path = handle_to.fullPath

    // Parse module
    if ('url_module' in handle_to.params) {
      const parseResponse = parseModule(handle_to.params.url_module as string)
      // console.log(`After parse url_module. parseResponse: ${JSON.stringify(parseResponse, null, 2)}`)

      if (parseResponse.success) {
        to.value.module = <TModule>parseResponse.module
        to.value.url_module = parseResponse.url_module
      } else {
        console.log(`parseModule returned ${JSON.stringify(parseResponse, null, 2)}`)
        showSnackbar(`${parseResponse.message}. redirected to Home Page`)
        inTransition.value = false
        return { name: 'home' }
      }
    }

    // console.log(`after successful module parse. to: ${JSON.stringify(to.value, null, 2)})`)

    // Ensures that the transition is legal and prepares the plan required for a successful transition.
    const planResponse = planTransition(handle_to, handle_from)

    if (!planResponse.success) {
      console.log('plan failed...')
      showSnackbar(`${planResponse.message} Redirected to Home Page`)
      inTransition.value = false
      return { name: 'home' }
    }

    console.log(`Plan successful: ${JSON.stringify(planResponse.data, null, 2)}`)
    inTransition.value = true

    // Access server and loads stuff (async)
    const prepareResponse = await prepareForNewRoute(
      to.value.module!,
      handle_to.query,
      <string>handle_to.params.slug,
      <TPlanAction[]>planResponse.data,
      handle_from.name === undefined,
    )
    if (prepareResponse.success) {
      finalizeRouting(handle_to)
    } else {
      inTransition.value = false
      if (handle_from.name === 'filter' && prepareResponse.message === 'Error: Empty result set') {
        showSnackbar('No results returned. Please modify query and resubmit!')
        return { name: 'filter' }
      } else {
        showSpinner(false)
        showSnackbar(
          `Fatal Navigation Error: ${prepareResponse.message}. Please reload the app (ctrl F5)`,
        )
        return { name: 'home' }
      }
    }
    //console.log(`router.beforeEach returned ${JSON.stringify(prepareResponse, null, 2)}`);
    inTransition.value = false
    return true
  }

  function requiresAuthRedirection(
    handle_to: RouteLocationNormalized,
  ): { redirect: false } | { redirect: true; name: string; message: string } {
    const { authenticated, accessibility } = storeToRefs(useAuthStore())

    console.log(
      `requiresAuthRedirection() authenticatedUsersOnly(${accessibility.value.authenticatedUsersOnly}), to.name(${handle_to.name as string}), authenticated(${authenticated.value})`,
    )

    if (handle_to.name === 'login' && authenticated.value) {
      return {
        redirect: true,
        name: 'home',
        message: `Route "login" is not accessible for authenticated users. Redirected to the home page.`,
      }
    }

    if (accessibility.value.authenticatedUsersOnly && !authenticated.value) {
      if (
        ['home', 'login', 'forgot-password', 'reset-password', 'register'].includes(
          handle_to.name as string,
        )
      ) {
        return { redirect: false }
      }
      console.log(`****** REDIRECT preLogPath(${handle_to.fullPath})`)
      preLogPath.value = handle_to.fullPath
      redirectedPreLogPath.value = true

      return {
        redirect: true,
        name: 'login',
        message: `Unauthorized; redirected to Login Page`,
      }
    }
    return { redirect: false }
  }

  function finalizeRouting(handle_to: RouteLocationNormalized) {
    current.value.name = <TPageName>handle_to.name
    current.value.module = to.value.name === 'home' ? undefined : to.value.module
    current.value.url_module = to.value.url_module
    current.value.queryParams = ['index', 'show'].includes(current.value.name)
      ? handle_to.query
      : undefined
    current.value.url_full_path = handle_to.fullPath
    // current.value.preLoginFullPath = to.value.name === 'login' ? handle_from.fullPath : undefined

    switch (handle_to.name) {
      case 'show':
      case 'update':
      case 'media':
      case 'tag':
        current.value.slug = handle_to.params.slug as string
        break
      default:
        current.value.slug = undefined
    }

    //console.log(`finalizing routing. current: ${JSON.stringify(current.value)}`)
    //current.value = Object.assign(to.value);
    //current.value = JSON.parse(JSON.stringify(to.value))
  }

  async function pushHome(message = '') {
    console.log(`pushHome`)
    inTransition.value = false
    if (message !== '') {
      showSnackbar(message)
    }
    await router.push('home')
  }

  async function routerPush(
    routeName: string,
    slug: string = 'none',
    module: TModule | 'current' = 'current',
    keepQuery: boolean = true,
  ) {
    let urlModule,
      query = null
    switch (routeName) {
      case 'back1':
        router.go(-1)
        break

      case 'home':
      case 'dashboard':
        await router.push({ name: routeName })
        break

      case 'login':
      case 'register':
      case 'forgot-password':
      case 'reset-password':
        await router.push({ name: routeName })
        break

      case 'welcome':
      case 'filter':
      case 'create':
        urlModule =
          module === 'current' ? current.value.url_module : moduleToUrlModuleName.value[module]
        await router.push({ name: routeName, params: { url_module: urlModule } })
        break

      case 'index':
        urlModule =
          module === 'current' ? current.value.url_module : moduleToUrlModuleName.value[module]
        query = keepQuery ? current.value.queryParams : ''
        await router.push({
          name: 'index',
          params: { url_module: urlModule },
          query: <LocationQueryRaw>query,
        })
        break

      case 'show':
        urlModule =
          module === 'current' ? current.value.url_module : moduleToUrlModuleName.value[module]
        query = keepQuery ? current.value.queryParams : ''
        await router.push({
          name: 'show',
          params: { url_module: urlModule, slug: slug },
          query: <LocationQueryRaw>query,
        })
        break

      case 'update':
      case 'media':
      case 'tag':
        await router.push({
          name: routeName,
          params: { url_module: current.value.url_module, slug: slug },
        })
        break
    }
  }

  async function moveToRelatedItem(module: TModule, id: string) {
    const { setIndexByElement, getElement } = useElementAndCollectionStore()
    const { filterClearOptions } = useTrioStore()
    const { tagAndSlugFromId } = useModuleStore()

    const tas = tagAndSlugFromId(id, module)

    if (current.value.module !== module) {
      return await routerPush('show', tas.slug, module, false)
    }

    setIndexByElement('Show', 'main', id)
    if (getElement('Show') !== undefined) {
      console.log(`moveToRelated "${module} ${tas.slug}" - IN collection`)
      return await routerPush('show', tas.slug, module)
    } else {
      console.log(
        `moveToRelated "${module} ${tas.slug}" - NOT in collection: Filters cleared and result set reloaded`,
      )
      filterClearOptions()
      await routerPush('show', tas.slug, module, false)
      showSnackbar(`Filters removed and result set reloaded`)
    }
  }
  return {
    inTransition,
    current,
    to,
    preLogPath,
    redirectedPreLogPath,
    handleRouteChange,
    routerPush,
    pushHome,
    moveToRelatedItem,
  }
})
