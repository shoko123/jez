import manager from './modules/manager.js';
import xhr from './modules/xhr.js';
import auth from './modules/auth.js';
import picker from './modules/registration/picker.js';
import stepper from './modules/stepper.js';
import locus from './modules/locus.js';
import find from './modules/find.js';
import stones from './modules/stones.js';
import media from './modules/media/media.js';

export default {

    modules: {
        mgr: manager,
        aut: auth,
        xhr: xhr,
        stp: stepper,
        loc: locus,
        stn: stones,
        fnd: find,
        pkr: picker,
        med: media,
    },

    state: {
        customers: [],
        storageUrl: "http://jez/storage",
        baseDbImageUrl: "http://jez/storage/app/public/DB/images"
    },

    getters: {
        storageUrl(state) {
            return state.storageUrl;
        },
        baseDbImageUrl(state) {
            return state.baseDbImageUrl;
        },
        customers(state) {
            return state.customers;
        },
    },
    mutations: {
        updateCustomers(state, payload) {
            state.customers = payload;
        },
        test(payload) {
            console.log('store.index.test() payload: ' + JSON.stringify(payload, null, 2));
        }
    },
};
