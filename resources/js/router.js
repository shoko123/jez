import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue';
import Test from './components/Test.vue';
import Login from './components/auth/Login.vue';
import locusMain from './components/loci/locusMain.vue';
import findMain from './components/finds/findMain.vue';
import showItem from './components/elements/showItem.vue';
import showCollection from './components/elements/showCollection.vue';
import stepper from './components/stepper/stepper.vue';
import welcome from './components/elements/welcome.vue';
import UndefinedRoute from './components/elements/UndefinedRoute.vue';
import MediaEdit from './components/media/MediaEdit.vue';
import Filter from './components/filter/Filter.vue';

import store from './store/store.js';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
        path: '/',
        component: Home,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/test',
        component: Test
    },
    {
        path: '/register',
        name: 'register',
        component: Login
    },
    {
        path: '/loci',
        component: locusMain,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: 'welcome',
                component: welcome
            },
            {
                path: 'filter',
                component: Filter
            },
            {
                path: 'list',
                component: showCollection
            },

            {
                path: 'create',
                component: stepper
            },
            
            {
                path: ':id/show',
                props: true,
                component: showItem
            },
            {
                path: ':id/update',
                props: true,
                component: stepper
            },
            {
                path: ':id/media',
                props: true,
                component: MediaEdit
            },
        ]
    },    
    {
        path: '/finds/:findType',
        component: findMain,
        props: true,
        meta: {
            requiresAuth: true
        },

        children: [
            {
                path: 'welcome',
                component: welcome
            },
            {
                path: 'filter',
                component: Filter
            },
            {
                path: 'list',
                component: showCollection
            },

            {
                path: 'create',
                component: stepper
            },
            
            {
                path: ':id/show',
                props: true,
                component: showItem
            },
            {
                path: ':id/update',
                props: true,
                component: stepper
            },
            {
                path: ':id/media',
                props: true,
                component: MediaEdit
            },
        ]
    },
    {
        path: '*',
        component: UndefinedRoute,
    },
  ]
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !store.getters["aut/isLoggedIn"]) {
      next("/login");
    } else if (to.path == "/login" && store.getters["aut/isLoggedIn"]) {
      next("/");
    } else {
      store.dispatch("mgr/routeChanged", { to, from });
      next();
    }
  });

export default router