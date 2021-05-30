
import store from '../store/store.js';

export default function prepareForNewRoute(router) {
    console.log("prepareForNewRoute.init()");

    router.beforeEach((to, from, next) => {
        store.dispatch("mgr/routes/routeChanged", { to, from })
        .then((res) => {
            store.dispatch("mgr/routes/navigationSuccess", null);
            next();
        }).catch(err => {
            console.log(`navigation error: ${JSON.stringify(err, null, 2)}`);
            next(false);
        }).finally(() => {
            store.commit("mgr/routes/loading", false);
        });
    
    });
}