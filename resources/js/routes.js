import Home from './components/Home.vue';
import Test from './components/Test.vue';
import Login from './components/auth/Login.vue';
import locusMain from './components/loci/locusMain.vue';
import findMain from './components/finds/findMain.vue';

import showItem from './components/elements/showItem.vue';
import showCollection from './components/elements/showCollection.vue';
import stepper from './components/elements/stepper.vue';
import welcome from './components/elements/welcome.vue';
import UndefinedRoute from './components/elements/UndefinedRoute.vue';
import MediaGallery from './components/media/MediaGallery.vue';


export const routes = [
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
                component: MediaGallery
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
                component: MediaGallery
            },
        ]
    },
    {
        path: '*',
        component: UndefinedRoute,
    },

];
