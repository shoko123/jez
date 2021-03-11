import { normalize, schema } from 'normalizr';
export default {
    loadAreasSeasons(commit, dispatch, payload) {
        console.log("regs.loadAreasSeasons()");

        let xhrRequest = {
            endpoint: `/api/areas-seasons`,
            action: "get",
            data: null,
            spinner: true,
            verbose: false,
            snackbar: { onSuccess: false, onFailure: true, },
            messages: { loading: "loading areas/seasons", onSuccess: null, onFailure: "failed loading areas/seasons", },
        };

        return dispatch('xhr/xhr', xhrRequest, { root: true })
            .then(res => {
                this.normalizeAreasSeasons(commit, res.data.collection);
            })
    },

    normalizeAreasSeasons(commit, payload) {
        const areaSeasonSchema = new schema.Entity('areaSeason');
        const areasSeasonsSchema = new schema.Array(areaSeasonSchema);
        let normalizedData = normalize(payload, areasSeasonsSchema);

        //console.log('normalizeAreasSeasons: ' + JSON.stringify(normalizedData, null, 2));
        //this.areasSeasonsObject(state, normalizedData.entities.areaSeason);
        //this.areasSeasonsKeys(state, normalizedData.result);

        commit("areasSeasonsObject", normalizedData.entities.areaSeason);
        commit("areasSeasonsKeys", normalizedData.result);
    },


    loadAreaSeasonLoci(commit, dispatch, area_season_id) {
        let xhrRequest = {
            endpoint: `/api/areas-seasons/${area_season_id}/loci`,
            action: "get",
            data: null,
            spinner: true,
            verbose: false,
            snackbar: { onSuccess: false, onFailure: true, },
            messages: { loading: `loading loci for areaSeason ${area_season_id}`, onSuccess: null, onFailure: null, },
        };

        return dispatch('xhr/xhr', xhrRequest, { root: true })
            .then((res) => {
                this.normalizeLoci(commit, res.data.lociForArea);
                return res;
            })
    },

    normalizeLoci( commit , payload) {
        const locusSchema = new schema.Entity('locus');
        const lociSchema = new schema.Array(locusSchema);
        let normalizedData = normalize(payload, lociSchema);
        //console.log('normalizeLoci: ' + JSON.stringify(normalizedData, null, 2));
        commit("lociObject", normalizedData.entities.locus);
        commit("lociKeys", normalizedData.result);
    },

    loadLocusFinds(rootGetters, commit, dispatch, locus_id) {
        let xhrRequest = {
            endpoint: `/api/loci/${locus_id}/finds?find_type=${rootGetters["mgr/module"]}`,
            action: "get",
            data: null,
            spinner: true,
            verbose: true,
            snackbar: { onSuccess: false, onFailure: true, },
            messages: { loading: `loading finds for locus ${locus_id}`, onSuccess: null, onFailure: null, },
        };
        console.log('loadLocusFinds xhrRequest: ' + JSON.stringify(xhrRequest, null, 2));
        return dispatch('xhr/xhr', xhrRequest, { root: true })
            .then((res) => {
                this.normalizeFinds(commit, res.data.finds);
                return res;
            })
    },

    normalizeFinds(commit, payload) {
        //console.log('normalizeFinds payload: ' + JSON.stringify(payload, null, 2));
        const findSchema = new schema.Entity('find', {}, {
            idAttribute: (value, parent, key) => (`${value.findable_type}(${value.findable_id})`)
        });

        const findsSchema = new schema.Array(findSchema);
        let normalizedData = normalize(payload, findsSchema);
        console.log('normalizeFinds: ' + JSON.stringify(normalizedData, null, 2));
        commit("findsObject", normalizedData.entities.find);
        commit("findsKeys", normalizedData.result);
    },
}
