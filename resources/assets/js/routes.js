import Home from './components/Home.vue';
import Login from './components/auth/Login.vue';
import CustomersMain from './components/customers/Main.vue';
import CustomersList from './components/customers/List.vue';
import NewCustomer from './components/customers/New.vue';
import Customer from './components/customers/View.vue';

import locusMain from './components/loci/locusMain.vue';
import locusList from './components/loci/locusList.vue';
import locusCreate from './components/loci/locusCreate.vue';
import locusShow from './components/loci/locusShow.vue';


import test1 from './components/tests/test1.vue';

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
                path: '/',
                component: locusList
            },
            {
                path: 'new',
                component: locusCreate
            },
            {
                path: ':id',
                component: locusShow
            }
        ]
    },
    {
        path: '/test1', 
        component: test1,
    },
];