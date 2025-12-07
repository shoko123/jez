import { createRouter, createWebHistory } from 'vue-router'
import navigationErrorHandler from './routes/navigationErrorHandler'
import { useRoutesMainStore } from '../stores/routes/routesMain'
import { useAppStore } from '../stores/app'
import { useNotificationsStore } from '../stores/notifications'
import routes from './routes/routes'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.onError.bind(navigationErrorHandler)

router.beforeEach(async (to, from) => {
  const { handleRouteChange } = useRoutesMainStore()
  const m = useAppStore()
  const { showSpinner } = useNotificationsStore()
  if (!m.initialized) {
    console.log(`vue-router beforeEach app is not initialized calling appInit()`)
    await m.appInit()
  }

  try {
    const res = await handleRouteChange(from, to)
    //console.log(`router.beforeEach returned ${JSON.stringify(res, null, 2)}`);
    return res
  } catch (err) {
    console.log(
      `**** navigationErrorHandler ****  to: ${to.path}. Error: ${JSON.stringify(err, null, 2)}`,
    )
    showSpinner(false)
    return { name: 'home' }
    //return false
  }
})

export default router
