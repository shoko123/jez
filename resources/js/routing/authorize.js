import store from '../store/store.js';

export default function parseAndPermit(router) {
    console.log("parseAndPermit.init()");

    router.beforeEach((to, from, next) => {
        let appSettings = store.getters["mgr/appSettings"];
        let isLoggedIn = store.getters["aut/isLoggedIn"];
        let permissions = store.state["aut/permissions"];

        console.log(`middleware.authorize() to.path: ${to.path} appSettings: ${JSON.stringify(appSettings, null, 2)}\nisLoggedIn: ${isLoggedIn}`);

        store.dispatch("mgr/routes/parseTo", to).then(() => {
            if (to.path === "/auth/login" || to.path === "/") {
                next();
            } else if (appSettings.authorizedUsersOnly && !isLoggedIn) {
                store.commit('snackbar/snackbar', {
                    color: "orange",
                    message: "Only logged-in users are authorized to view this page. Redirected to the login page."
                }, { root: true });
                console.log(`Router.authorize() Log in Required - redirected to login page`);
                next("/auth/login");
            } else {
                next();
            }
        })
    });
}
