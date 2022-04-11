export default {
    namespaced: true,

    state: {
        newItem: {
            id: null,
            description: null,
            taxon: null,
            element: null,
            symmetry: null,
            d_and_r: null,
            age: null,
            breakage: null,
            $table: false,
            butchery_desc: null,
            burning: false,
            burning_desc: null,
            weathering: null,
            other_bsm: null,
            notes: null,
            taxon_L1_id: 1,
            element_L1_id: 1,
            measured: false,
            GL: null,
            Glpe: null,
            GLl: null,
            GLP: null,
            Bd: null,
            BT: null,
            Dd: null,
            BFd: null,
            Bp: null,
            Dp: null,
            SD: null,
            HTC: null,
            Dl: null,
            DEM: null,
            DVM: null,
            WCM: null,
            DEL: null,
            DVL: null,
            WCL: null,
            LD: null,
            DLS: null,
            LG: null,
            BG: null,
            DID: null,
            BFcr: null,
            GD: null,
            GB: null,
            BF: null,
            LF: null,
            GLm: null,
            GH: null,
        },
    },

    getters: {
        newItem(state) {
            return state.newItem;
        },
    },

    mutations: {
        id(state, payload) {
            state.newItem.id = payload;
        },
        description(state, payload) {
            state.newItem.description = payload;
        },
        taxon(state, payload) {
            state.newItem.taxon = payload;
        },
        element(state, payload) {
            state.newItem.element = payload;
        },
        symmetry(state, payload) {
            state.newItem.symmetry = payload;
        },
        d_and_r(state, payload) {
            state.newItem.d_and_r = payload;
        },
        age(state, payload) {
            state.newItem.age = payload;
        },
        breakage(state, payload) {
            state.newItem.breakage = payload;
        },
        butchery(state, payload) {
            state.newItem.butchery = payload;
        },
        butchery_desc(state, payload) {
            state.newItem.butchery_desc = payload;
        },
        burning(state, payload) {
            state.newItem.burning = payload;
        },
        burning_desc(state, payload) {
            state.newItem.burning_desc = payload;
        },
        weathering(state, payload) {
            state.newItem.weathering = payload;
        },
        other_bsm(state, payload) {
            state.newItem.other_bsm = payload;
        },
        notes(state, payload) {
            state.newItem.notes = payload;
        },
        taxon_L1_id(state, payload) {
            state.newItem.taxon_L1_id = payload;
        },
        element_L1_id(state, payload) {
            state.newItem.element_L1_id = payload;
        },
        measured(state, payload) {
            state.newItem.measured = payload;
        },
        GL(state, payload) {
            state.newItem.GL = payload;
        },
        GLpe(state, payload) {
            state.newItem.GLpe = payload;
        },
        GLl(state, payload) {
            state.newItem.GLl = payload;
        },
        GLP(state, payload) {
            state.newItem.GLP = payload;
        },
        Bd(state, payload) {
            state.newItem.Bd = payload;
        },
        BT(state, payload) {
            state.newItem.BT = payload;
        },
        Dd(state, payload) {
            state.newItem.Dd = payload;
        },
        BFd(state, payload) {
            state.newItem.BFd = payload;
        },
        Bp(state, payload) {
            state.newItem.Bp = payload;
        },
        Dp(state, payload) {
            state.newItem.Dp = payload;
        },
        SD(state, payload) {
            state.newItem.SD = payload;
        },
        HTC(state, payload) {
            state.newItem.HTC = payload;
        },
        Dl(state, payload) {
            state.newItem.Dl = payload;
        },
        DEM(state, payload) {
            state.newItem.DEM = payload;
        },
        DVM(state, payload) {
            state.newItem.DVM = payload;
        },
        WCM(state, payload) {
            state.newItem.WCM = payload;
        },
        DEL(state, payload) {
            state.newItem.DEL = payload;
        },
        DVL(state, payload) {
            state.newItem.DVL = payload;
        },
        WCL(state, payload) {
            state.newItem.WCL = payload;
        },
        LD(state, payload) {
            state.newItem.LD = payload;
        },
        DLS(state, payload) {
            state.newItem.DLS = payload;
        },
        LG(state, payload) {
            state.newItem.LG = payload;
        },
        BG(state, payload) {
            state.newItem.BG = payload;
        },
        DID(state, payload) {
            state.newItem.DID = payload;
        },
        BFcr(state, payload) {
            state.newItem.BFcr = payload;
        },
        GD(state, payload) {
            state.newItem.GD = payload;
        },
        GB(state, payload) {
            state.newItem.GB = payload;
        },
        BF(state, payload) {
            state.newItem.BF = payload;
        },
        LF(state, payload) {
            state.newItem.LF = payload;
        },
        GLm(state, payload) {
            state.newItem.GLm = payload;
        },
        GH(state, payload) {
            state.newItem.GH = payload;
        },
    },

    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }, payload) {
            let toCopy = payload;
            let item = rootGetters["mgr/item"];
            commit("id", toCopy ? item.id : null);
            commit("description", toCopy ? item.description : null);
            commit("taxon", toCopy ? item.taxon : null);
            commit("element", toCopy ? item.element : null);
            commit("symmetry", toCopy ? item.symmetry : null);
            commit("d_and_r", toCopy ? item.d_and_r : null);
            commit("age", toCopy ? item.age : null);
            commit("breakage", toCopy ? item.breakage : null);
            commit("butchery", toCopy ? item.butchery : false);
            commit("butchery_desc", toCopy ? item.burning_desc : null);
            commit("burning", toCopy ? item.burning : false);
            commit("burning_desc", toCopy ? item.burning_desc : null);
            commit("weathering", toCopy ? item.weathering : null);
            commit("other_bsm", toCopy ? item.other_bsm : null);
            commit("notes", toCopy ? item.notes : null);
            commit("taxon_L1_id", toCopy ? item.taxon_L1_id : 1);
            commit("element_L1_id", toCopy ? item.element_L1_id : 1);
            commit("measured", toCopy ? item.measured : false);
            commit("GL", toCopy ? item.GL : null);
            commit("GLpe", toCopy ? item.GLpe : null);
            commit("GLl", toCopy ? item.GLl : null);
            commit("GLP", toCopy ? item.GLP : null);
            commit("Bd", toCopy ? item.Bd : null);
            commit("BT", toCopy ? item.BT : null);
            commit("Dd", toCopy ? item.Dd : null);
            commit("BFd", toCopy ? item.BFd : null);
            commit("Bp", toCopy ? item.Bp : null);
            commit("Dp", toCopy ? item.Dp : null);
            commit("SD", toCopy ? item.SD : null);
            commit("HTC", toCopy ? item.HTC : null);
            commit("Dl", toCopy ? item.Dl : null);
            commit("DEM", toCopy ? item.DEM : null);
            commit("DVM", toCopy ? item.DVM : null);
            commit("WCM", toCopy ? item.WCM : null);
            commit("DEL", toCopy ? item.DEL : null);
            commit("DVL", toCopy ? item.DVL : null);
            commit("WCL", toCopy ? item.WCL : null);
            commit("LD", toCopy ? item.LD : null);
            commit("DLS", toCopy ? item.DLS : null);
            commit("LG", toCopy ? item.LG : null);
            commit("BG", toCopy ? item.BG : null);
            commit("DID", toCopy ? item.DID : null);
            commit("BFcr", toCopy ? item.BFcr : null);
            commit("GD", toCopy ? item.GD : null);
            commit("GB", toCopy ? item.GB : null);
            commit("BF", toCopy ? item.BF : null);
            commit("LF", toCopy ? item.LF : null);
            commit("GLm", toCopy ? item.GLm : null);
            commit("GH", toCopy ? item.GH : null);
        },

    }
}