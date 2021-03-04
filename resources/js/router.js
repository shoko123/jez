import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store.js';

import Home from './components/Home.vue';
import Login from './components/auth/Login.vue';

import PageItem from './components/layouts/PageItem.vue';
import PageCollection from './components/layouts/PageCollection.vue';
import PageWelcome from './components/layouts/PageWelcome.vue';
import Filter from './components/filter/Filter.vue';
import PageAbout from './components/about/PageAbout.vue';
import PageMap from './components/about/PageMap.vue';


import MediaEdit from './components/media/MediaEdit.vue';
import stepper from './components/stepper/stepper.vue';
import Tagger from './components/tags/Tagger.vue';

import UndefinedRoute from './components/elements/UndefinedRoute.vue';
import RouterElement from './components/elements/RouterElement.vue';

//prevent NavigationDuplicated error
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => {
        if (err.name !== 'NavigationDuplicated') throw err
    });
}

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
            path: '/auth/login',
            name: 'login',
            component: Login
        },
        {
            path: '/auth/register',
            name: 'register',
            component: Login
        },
        {
            path: '/dig-modules/:module',
            component: RouterElement,
            props: true,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: 'welcome',
                    component: PageWelcome
                },
                {
                    path: 'Filter',
                    component: Filter,
                },
                {
                    path: 'list',
                    component: PageCollection
                },
                {
                    path: 'create',
                    component: stepper
                },
                {
                    path: ':id/show',
                    props: true,
                    component: PageItem
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
                {
                    path: ':id/tags',
                    props: true,
                    component: Tagger
                },
            ]
        },


        {
            path: '/about',
            component: RouterElement,
            props: true,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: 'welcome',
                    component: PageWelcome
                },           
                {
                    path: 'map',
                    component: PageMap
                },
                {
                    path: ':id/show',
                    props: true,
                    component: PageAbout
                },              
                {
                    path: '*',
                    component: UndefinedRoute,
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
        next("/auth/login");
    } else if (to.path == "/auth/login" && store.getters["aut/isLoggedIn"]) {
        next("/");
    } else {
        store.dispatch("mgr/routeChanged", { to, from });
        next();
    }
});

export default router