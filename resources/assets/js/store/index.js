import  manager  from './modules/manager.js';
import  xhr  from './modules/xhr.js';
import  auth from './modules/auth.js';
import  stepper  from './modules/stepper.js';
import  find  from './modules/find.js';
import  gs from "./modules/gs";
import  locus  from './modules/locus.js';


export default {

    modules: {
        mgr: manager,
        aut: auth,
        xhr: xhr,
        stp: stepper,        
        loc: locus,
        gss: gs,        
        fnd: find,   
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
