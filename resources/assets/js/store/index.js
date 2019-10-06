import manager from './modules/manager.js';
import xhr from './modules/xhr.js';
import auth from './modules/auth.js';
import picker from './modules/picker.js';
import stepper from './modules/stepper.js';
import locus from './modules/locus.js';
import find from './modules/find.js';
import groundstone from "./modules/groundstone";


import stones from './modules/stones.js';

export default {

    modules: {
        mgr: manager,
        aut: auth,
        xhr: xhr,
        stp: stepper,
        loc: locus,
        gss: groundstone,
        stn: stones,
        fnd: find,
        pkr: picker,
    },

    state: {
        customers: [],
    },

    getters: {
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
