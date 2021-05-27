import Vue from 'vue'
import Router from 'vue-router'
const { isNavigationFailure, NavigationFailureType } = Router;
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

//catch NavigationDuplicated and Failures (due to next(false) on BeforeEach) Errors 
//and supress logging to console.
const originalPush = Router.prototype.push;

Router.prototype.push = function push(location) {
    return originalPush.call(this, location)
    
        .catch(err => {
            if (err.name === 'NavigationDuplicated') {
                console.log("duplicate");
            } else if (isNavigationFailure(err)) {
                console.log(`Navigation error: ${err}`);
            } else {
                throw err;
            }
        });
}

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/:module(auth)',
            component: RouterElement,
            props: true,
            children: [
                {
                    path: ':action(login)',
                    component: Login
                },
                {
                    path: ':action(register)',
                    component: Login
                }
            ]
        },
        {
            path: '/dig-modules/:module',
            component: RouterElement,
            props: true,
            children: [
                {
                    path: ':action(welcome)',
                    component: PageWelcome
                },
                {
                    path: ':action(Filter)',
                    component: Filter,
                },
                {
                    path: ':action(list)',
                    component: PageCollection
                },
                {
                    path: ':action(create)',
                    component: stepper,
                    meta: { requiresAuth: true },
                },
                {
                    path: ':id(\\d+)',
                    component: RouterElement,
                    children: [
                        {
                            path: ':action(show)',
                            props: true,
                            component: PageItem
                        },
                        {
                            path: ':action(update)',
                            props: true,
                            component: stepper,
                            meta: { requiresAuth: true },
                        },
                        {
                            path: ':action(media)',
                            props: true,
                            component: MediaEdit,
                            meta: { requiresAuth: true },
                        },
                        {
                            path: ':action(tags)',
                            props: true,
                            component: Tagger,
                            meta: { requiresAuth: true },
                        },
                    ],
                },
            ]
        },
        {
            path: '/:module(about)',
            component: RouterElement,
            props: true,
            children: [
                {
                    path: ':id(\\d+)',
                    component: RouterElement,
                    children: [
                        {
                            path: ':action(show)',
                            component: PageAbout,
                        },
                    ],
                },
                {
                    path: ':action(welcome)',
                    component: PageWelcome
                },
                {
                    path: ':action(map)',
                    component: PageMap
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
        store.commit("mgr/routes/loading", true);
        console.log(`router/beforeEach from: ${from.path} to: ${to.path}`);
        store.dispatch("mgr/routes/routeChanged", { to, from })
            .then((res) => {
                store.dispatch("mgr/routes/navigationSuccess", null);
                next();
            }).catch(err => {
                console.log(`navigation error: ${JSON.stringify(err, null, 2)}`);
                next(false);
            }).finally(() => {
                store.commit("mgr/routes/loading", false);
            });
    }
});




export default router