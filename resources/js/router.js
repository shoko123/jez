import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue';
import Login from './components/auth/Login.vue';
import RouterElement from './components/elements/RouterElement.vue';
import ShowItem from './components/elements/ShowItem.vue';
import ShowCollection from './components/elements/ShowCollection.vue';
import stepper from './components/stepper/stepper.vue';
import LayoutWelcome from './components/layouts/LayoutWelcome.vue';
import UndefinedRoute from './components/elements/UndefinedRoute.vue';
import MediaEdit from './components/media/MediaEdit.vue';
import Filter from './components/filter/Filter.vue';
import Tagger from './components/tags/Tagger.vue';
import store from './store/store.js';

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
            path: '/dig-modules/:module',
            component: RouterElement,
            props: true,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: 'welcome',
                    component: LayoutWelcome
                },
                {
                    path: 'Filter',
                    component: Filter,
                },
                {
                    path: 'list',
                    component: ShowCollection
                },
                {
                    path: 'create',
                    component: stepper
                },
                {
                    path: ':id/show',
                    props: true,
                    component: ShowItem
                },
                {
                    path: ':id/update',
                    props: true,
                    component: stepper
                },
                {
                    path: ':id/media',
                    props: true,
                    component: MediaEdit
                },
                {
                    path: ':id/tags',
                    props: true,
                    component: Tagger
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
        next("/login");
    } else if (to.path == "/login" && store.getters["aut/isLoggedIn"]) {
        next("/");
    } else {
        store.dispatch("mgr/routeChanged", { to, from });
        next();
    }
});

export default router