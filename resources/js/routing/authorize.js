import store from '../store/store.js';

export default function autorize(router) {
    console.log("authorize.init()");

    router.beforeEach((to, from, next) => {
        let appSettings = store.getters["mgr/routes/appSettings"];
        let isLoggedIn = store.getters["aut/isLoggedIn"];
        let permissions = store.state["aut/permissions"];
        console.log(`middleware.authorize() to.path: ${to.path} appSettings: ${JSON.stringify(appSettings, null, 2)}\nisLoggedIn: ${isLoggedIn}`);
        store.dispatch("mgr/routes/parseTo", to);
        if (to.path === "/auth/login" || to.path === "/") {
            next();
        } else if (appSettings.loggedUsersOnly && !isLoggedIn) {
            store.commit('snackbar/displaySnackbar', {
                isSuccess: false,
                message: "You need to be logged-in to view this page. Redirected to the login page."
            }, { root: true });
            console.log(`sending to login page`);
            next("/auth/login");
        } else {
            next();
        }
        //const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

        /*
        if (requiresAuth && !store.getters["aut/isLoggedIn"]) {
            next("/auth/login");
        } else if (to.path == "/auth/login" && store.getters["aut/isLoggedIn"]) {
            next("/");
        } else {
           console.log("authorization is OK");
           next();
        }
        */
    });
}
