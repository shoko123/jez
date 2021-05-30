import store from '../store/store.js';

export default function autorize(router) {
    console.log("authorize.init()");

    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

        if (requiresAuth && !store.getters["aut/isLoggedIn"]) {
            next("/auth/login");
        } else if (to.path == "/auth/login" && store.getters["aut/isLoggedIn"]) {
            next("/");
        } else {
           console.log("authorization is OK");
           next();
        }
    });
}
