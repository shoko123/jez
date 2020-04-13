import manager from './modules/manager/manager.js';
import xhr from './modules/xhr.js';
import auth from './modules/auth.js';
//import registration from './modules/reg/registration.js';
import regs from './modules/reg/regs.js';
import stepper from './modules/stepper.js';
import locus from './modules/locus.js';
import locusFinds from './modules/locusFinds.js';
import find from './modules/find.js';
import stones from './modules/stones.js';
import pottery from './modules/pottery';
import media from './modules/media/media.js';
import tags from './modules/tags.js';
import snackbar from './modules/snackbar.js';

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
        med: media,
        //reg: registration,
        regs: regs,
        tag: tags,
        snackbar: snackbar,
    },
};
