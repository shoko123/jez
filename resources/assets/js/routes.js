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
import UndefinedRoute from './components/UndefinedRoute.vue';
import locusPicker from './components/loci/locusPicker.vue';
import test1 from './components/tests/test1.vue';
import test2 from './components/tests/test2.vue';
import store from './app.js';

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

        beforeEnter: (to, from, next) => {
            //hydrate with loci and areas
            //hydrate()

            axios.get('/api/loci')
                .then((response) => {
                    //console.log('Router BeforeEnter OK');
                    //console.log(store.getters.isLoggedIn);
                    store.commit('loci', response.data.data);
                    next();
                })
                .catch(err => {
                    console.log('Router BeforeEnter loci error ' + err.response);
                    next('/');
                })
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
                path: '/locus-picker',
                props: true,
                component: locusPicker
            },
            {
                path: ':id',
                props: true,
                component: locusShow
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

function hydrate() {
    axios.get('/api/loci')
        .then((response) => {
            context.commit('loci', response.data.data);
        })
        .catch(err => {
            alert('axios error @LociGet');
            console.log(err.response);
            //router.push({ path: "/" })
        })
    return;
}