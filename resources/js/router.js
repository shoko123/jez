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
            meta: {
                requiresAuth: true
            },
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
                    component: stepper
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
                            component: stepper
                        },
                        {
                            path: ':action(media)',
                            props: true,
                            component: MediaEdit
                        },
                        {
                            path: ':action(tags)',
                            props: true,
                            component: Tagger
                        },
                    ],
                },           
            ]
        },
        {
            path: '/:module(about)',
            component: RouterElement,
            props: true,
            meta: {
                requiresAuth: true
            },
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
        store.dispatch("mgr/routes/routeChanged", { to, from })
            .then((res) => {
                store.commit("mgr/routes/navigationSuccess", null);
                next();
            })
        //next();
    }
});

export default router