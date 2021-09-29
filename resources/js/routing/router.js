import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue';
import AdminDash from '../components/admin/Admin.vue';
import Login from '../components/auth/Login.vue';

import PageItem from '../components/layouts/PageItem.vue';
import PageCollection from '../components/layouts/PageCollection.vue';
import PageWelcome from '../components/layouts/PageWelcome.vue';
import Filter from '../components/filter/Filter.vue';
import PageAbout from '../components/about/PageAbout.vue';
import PageMap from '../components/about/PageMap.vue';


import MediaEdit from '../components/media/MediaEdit.vue';
import stepper from '../components/stepper/stepper.vue';
import Tagger from '../components/tags/Tagger.vue';

import UndefinedRoute from '../components/elements/UndefinedRoute.vue';
import RouterElement from '../components/elements/RouterElement.vue';
import middlewareInit from './middleware.js';
import interceptorInit from './interceptor.js';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/:module(admin)',
            component: RouterElement,
            props: true,
            children: [
                {
                    path: 'dashboard',
                    component: AdminDash
                },
            ],
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

interceptorInit(router);
middlewareInit(router);
export default router