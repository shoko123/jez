import store from '../store/store.js';

export default function authorize(router) {
    console.log("authorize.init()");

    router.beforeEach((to, from, next) => {
        let appSettings = store.getters["mgr/routes/appSettings"];
        let isLoggedIn = store.getters["aut/isLoggedIn"];
        let permissions = store.state["aut/permissions"];

        //console.log(`middleware.authorize() to.path: ${to.path} appSettings: ${JSON.stringify(appSettings, null, 2)}\nisLoggedIn: ${isLoggedIn}`);

        store.dispatch("mgr/routes/parseTo", to).then(() => {
            if (to.path === "/auth/login" || to.path === "/") {
                next();
            } else if (appSettings.loggedUsersOnly && !isLoggedIn) {
                store.commit('snackbar/snackbar', {
                    color: "orange",
                    message: "You need to be logged-in to view this page. Redirected to the login page."
                }, { root: true });
                console.log(`Router.authorize() Log in Required - redirected to login page`);
                next("/auth/login");
            } else {
                next();
            }
        })
    });
}
