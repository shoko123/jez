import Home from './components/Home.vue';
import Login from './components/auth/Login.vue';
import CustomersMain from './components/customers/Main.vue';
import CustomersList from './components/customers/List.vue';
import NewCustomer from './components/customers/New.vue';
import Customer from './components/customers/View.vue';

import locusMain from './components/loci/locusMain.vue';
import locusWelcome from './components/loci/locusWelcome.vue';
import locusList from './components/loci/locusList.vue';
import locusListFiltered from './components/loci/locusListFiltered.vue';
import locusCreate from './components/loci/locusCreate.vue';
import locusShow from './components/loci/locusShow.vue';
import locusPicker from './components/loci/locusPicker.vue';

import stoneMain from './components/stone/stoneMain.vue';
import stoneWelcome from './components/stone/stoneWelcome.vue';
import stoneList from './components/stone/stoneList.vue';
import stoneListFiltered from './components/stone/stoneListFiltered.vue';
import stoneCreate from './components/stone/stoneCreate.vue';
import stoneShow from './components/stone/stoneShow.vue';
import stoneFilter from './components/stone/stoneFilter.vue';
import stoneOptions from './components/stone/stoneOptions.vue';


import UndefinedRoute from './components/UndefinedRoute.vue';

import test1 from './components/tests/test1.vue';
import test2 from './components/tests/test2.vue';
//import store from './app.js';

export const routes = [
    {
        path: '/',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/customers',
        component: CustomersMain,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '/',
                component: CustomersList
            },
            {
                path: 'new',
                component: NewCustomer
            },
            {
                path: ':id',
                component: Customer
            }
        ]
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
                name: 'locusWelcome',
                component: locusWelcome
            },
            {
                path: 'list',
                name: 'lociList',
                component: locusList
            },
            {
                path: 'filtered-list',
                name: 'locusFilteredList',
                component: locusListFiltered
            },
            
            {
                path: '/new',
                name: 'locusNew',
                component: locusCreate
            },
            {
                path: '/filters',
                name: 'locusFilters',
                component: locusCreate
            },
            {
                path: '/display-options',
                name: 'locusDisplayOptions',
                component: locusCreate
            },
            {
                path: 'mm', //'locus-picker',
                //props: true,
                component: locusPicker
            },


                
            {
                //show a single locus
                path: ':id',
                props: true,
                name: 'locusShow',
                component: locusShow
            },

        ]
    },
    {
        path: '/stones',
        component: stoneMain,
        meta: {
            requiresAuth: true
        },

        children: [
            {
                path: 'welcome',
                name: 'stoneWelcome',
                component: stoneWelcome
            },
            {
                path: 'list',
                name: 'stoneList',
                component: stoneList
            },
            {
                path: 'list-filtered',
                name: 'stoneListFiltered',
                component: stoneListFiltered
            },
            {
                path: '/filters',
                name: 'stoneFilters',
                component: stoneFilter
            },
            {
                path: '/new',
                name: 'stoneCreate',
                component: stoneCreate
            },
            {
                path: '/options',
                name: 'stoneOptions',
                component: stoneOptions
            }, 
            {
                //show a single stone
                path: ':id',
                props: true,
                name: 'stoneShow',
                component: stoneShow
            },

        ]
    },
    {
        path: '/test1',
        component: test1,
    },
    {
        path: '/test2',
        component: test2,
    },
    {
        path: '*',
        component: UndefinedRoute,
    },

];
