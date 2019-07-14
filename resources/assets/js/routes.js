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

import groundstoneMain from './components/groundstone/groundstoneMain.vue';
import groundstoneWelcome from './components/groundstone/groundstoneWelcome.vue';
import groundstoneList from './components/groundstone/groundstoneList.vue';
import groundstoneListFiltered from './components/groundstone/groundstoneListFiltered.vue';
//import groundstoneCreate from './components/groundstone/groundstoneCreate.vue';
import groundstoneShow from './components/groundstone/groundstoneShow.vue';
import groundstoneFilter from './components/groundstone/groundstoneFilter.vue';
import groundstoneOptions from './components/groundstone/groundstoneOptions.vue';


import findMain from './components/finds/findMain.vue';


import findCreate from './components/finds/findCreate.vue';
import findFilter from './components/finds/findFilter.vue';

import card from './components/elements/card.vue';
import editor from './components/elements/editor.vue';
import filter from './components/elements/filter.vue';
import navigator from './components/elements/navigator.vue';
import picker from './components/elements/picker.vue';
import showItem from './components/elements/showItem.vue';
import showCollection from './components/elements/showCollection.vue';
import stepper from './components/elements/stepper.vue';
import menuSub from './components/elements/menuSub.vue';
import welcome from './components/elements/welcome.vue';
import UndefinedRoute from './components/UndefinedRoute.vue';

import test1 from './components/tests/test1.vue';
import test2 from './components/tests/test2.vue';


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
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
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
                path: 'filters',
                name: 'stoneFilters',
                component: stoneFilter
            },
            {
                path: 'create',
                name: 'stoneCreate',
                component: stoneCreate
            },
            {
                path: 'options',
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
        path: '/groundstones',
        component: groundstoneMain,
        meta: {
            requiresAuth: true
        },

        children: [
            {
                path: 'welcome',
                name: 'groundstoneWelcome',
                component: groundstoneWelcome
            },
            {
                path: 'list',
                name: 'groundstoneList',
                component: groundstoneList
            },
            {
                path: 'list-filtered',
                name: 'groundstoneListFiltered',
                component: groundstoneListFiltered
            },
            {
                path: 'filters',
                name: 'groundstoneFilters',
                component: groundstoneFilter
            },
            {
                path: 'create',
                name: 'findCreate',
                component: findCreate
            },
            {
                path: 'options',
                name: 'groundstoneOptions',
                component: groundstoneOptions
            }, 
            {
                //show a single groundstone
                path: ':id',
                props: true,
                name: 'groundstoneShow',
                component: groundstoneShow
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
                name: 'welcome',
                component: welcome
            },
            {
                path: 'list',
                name: 'showCollection',
                component: showCollection
            },
            {
                path: 'filters',
                name: 'findFilters',
                component: findFilter
            },
            {
                path: 'create',
                name: 'createItem',
                component: findCreate
            },
            
            {
                path: ':id/show',
                props: true,
                name: 'showItem',
                component: showItem
            },
            {
                path: ':id/update',
                props: true,
                name: 'updateItem',
                component: stepper
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
