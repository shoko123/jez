import manager from './modules/manager/manager.js';
import xhr from './modules/xhr.js';
import auth from './modules/auth.js';
//import picker from './modules/registration/picker.js';
import registration from './modules/reg/registration.js';
import stepper from './modules/stepper.js';
import locus from './modules/locus.js';
import locusFinds from './modules/locusFinds.js';
import find from './modules/find.js';
import stones from './modules/stones.js';
import pottery from './modules/pottery';
import media from './modules/media/media.js';

export default {

    modules: {
        mgr: manager,
        aut: auth,
        xhr: xhr,
        stp: stepper,
        loci: locus,
        locusFinds: locusFinds,
        stones: stones,
        pottery: pottery,
        fnd: find,
        //pkr: picker,
        med: media,
        reg: registration,
    },

    state: {
        customers: [],
    },

    getters: {
        storageUrl(state) {
            return state.storageUrl;
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