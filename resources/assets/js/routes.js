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
            if(hydrate()) {
                console.log('hydrated...')
                next();
            } else {
                console.log('Failed to hydrate... back to home')
                next('/');
            }

            /* 
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
                */
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
                path: 'mm', //'locus-picker',
                //props: true,
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


async function hydrate() {


    let areas = axios.get('/api/areas');
    let loci = axios.get('/api/loci');
    Promise.all([areas, loci])
        .then(values => {
            store.commit('areas', values[0].data.areas);
            store.commit('loci', values[1].data.data);
            //console.log('return:\n' + JSON.stringify(values[1]));
            return true;
        })
        .catch(error => {
            return false;
        });

}

