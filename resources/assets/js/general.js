
export function initialize(store, router) {
    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const currentUser = store.state.currentUser;

        if (requiresAuth && !currentUser) {
            next('/login');
        } else if (to.path == '/login' && currentUser) {
            next('/');
        } else {
            /////
            store.dispatch('mg/routeChanged', to);
            ////
            next();
        }
    });

    axios.interceptors.response.use(null/*
        (response) => {
            console.log('axios interceptor response: ' + JSON.stringify(response, null, 2));
            return Promise.resolve(response);
        }*/,
        (error) => {
            console.log('axios interceptor error: ' + JSON.stringify(error, null, 2));
            if (error.resposne.status == 401) {
                console.log('axios interceptor: 401');
                store.commit('logout');
                router.push('/login');
            }

            return Promise.reject(error);
        });

    if (store.getters.currentUser) {
        setAuthorization(store.getters.currentUser.token);
    } else {
        console.log('axios interceptor: user is null!!!!');
    }
}

export function setAuthorization(token) {
    console.log('setAuth() token: ' + token)
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export function login(credentials) {
    return new Promise((res, rej) => {
        axios.post('/api/auth/login', credentials)
            .then((response) => {
                setAuthorization(response.data.access_token);
                res(response.data);
            })
            .catch((err) => {
                rej("Wrong email or password");
            })
    })
}

export function getLocalUser() {
    const userStr = localStorage.getItem("user");

    if (!userStr) {
        return null;
    }

    return JSON.parse(userStr);
}