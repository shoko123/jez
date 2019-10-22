import Home from './components/Home.vue';
import Login from './components/auth/Login.vue';

import locusMain from './components/loci/locusMain.vue';
import findMain from './components/finds/findMain.vue';

import showItem from './components/elements/showItem.vue';
import showCollection from './components/elements/showCollection.vue';
import jezNew from './components/elements/jezNew.vue';
import welcome from './components/elements/welcome.vue';
import UndefinedRoute from './components/elements/UndefinedRoute.vue';
import Upload from './components/files/Upload.vue';



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
        path: '/register',
        name: 'register',
        component: Login
    },
    {
        path: '/upload',
        component: Upload
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
                component: jezNew
            },
            
            {
                path: ':id/show',
                props: true,
                component: showItem
            },
            {
                path: ':id/update',
                props: true,
                component: jezNew
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
                component: jezNew
            },
            
            {
                path: ':id/show',
                props: true,
                component: showItem
            },
            {
                path: ':id/update',
                props: true,
                component: jezNew
            },
        ]
    },
    {
        path: '*',
        component: UndefinedRoute,
    },

];
