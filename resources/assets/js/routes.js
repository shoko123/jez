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
import findMain from './components/finds/findMain.vue';
import findFilter from './components/finds/findFilter.vue';
import showItem from './components/elements/showItem.vue';
import showCollection from './components/elements/showCollection.vue';
import jezNew from './components/elements/jezNew.vue';
import welcome from './components/elements/welcome.vue';
import UndefinedRoute from './components/elements/UndefinedRoute.vue';



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
                component: jezNew
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
                component: jezNew
            },
        ]
    },
    {
        path: '*',
        component: UndefinedRoute,
    },

];
