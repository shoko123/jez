export default {
    status(state, getters, rootState, rootGetters) {
        function isImplemented() {
            switch (state.status.module) {
                case "stones":
                case "pottery":
                case "loci":
                    return true;
                default:
                    return false;
            }
        }

        function isFind() {
            switch (state.status.module) {
                case "stones":
                case "glass":
                case "pottery":
                case "lithics":
                    return true;

                default:
                    return false;
            }
        }
        function registrationCategories() {
            if (!isFind()) {
                return null;
            }
            return rootGetters[state.status.module + '/moduleStaticData'] ? rootGetters[state.status.module + '/moduleStaticData'].registrationCategories : null;
        }
        //notice - plural
        function getDisplayOptions() {
            let displayOptionsArr = rootGetters[state.status.module + '/moduleStaticData'] ? rootGetters[state.status.module + '/moduleStaticData'].displayOptions : null;
            if (displayOptionsArr) {
                state.displayOptions = displayOptionsArr;
            }
            return displayOptionsArr;
        }
        //notice - single
        function getDisplayOption() {
            if (!state.displayOptions) {
                return null;
            }
            return { index: state.displayOptionsIndex, text: state.displayOptions[state.displayOptionsIndex] };
        }

        function hasMedia() {
            if (!rootGetters["med/scenes"]) {
                return true;
            } else {
                return rootGetters["med/scenes"].length ? true : false;
            }
        }
        function hasRelatedModules() {
            if (state.status.module === 'loci') {
                if (!getters.item  || !rootGetters["locusFinds/locusFinds"]) {
                    return true;
                } else {
                    return rootGetters["locusFinds/locusFinds"].length > 0;
                }
            } else {
                return false;
            }
        }
        function isDeleteable() {
            return (!hasMedia() && !hasRelatedModules());
        }

        let status = {
            itemName: getters["moduleInfo"] ? getters["moduleInfo"].itemName : null,//rootGetters[state.status.module + '/moduleStaticData'] ? rootGetters[state.status.module + '/moduleStaticData'].itemName : null,
            collectionName: getters["moduleInfo"] ? getters["moduleInfo"].collectionName : null,//rootGetters[state.status.module + '/moduleStaticData'] ? rootGetters[state.status.module + '/moduleStaticData'].collectionName : null,
            moduleAppBaseUrl: getters["moduleInfo"] ? getters["moduleInfo"].appBaseUrl : null,//rootGetters[state.status.module + '/moduleStaticData'] ? rootGetters[state.status.module + '/moduleStaticData'].moduleAppBaseUrl : null,
            moduleApiBaseUrl: getters["moduleInfo"] ? getters["moduleInfo"].apiBaseUrl : null,//rootGetters[state.status.module + '/moduleStaticData'] ? rootGetters[state.status.module + '/moduleStaticData'].moduleApiBaseUrl : null,

            displayOptions: getDisplayOptions(),//rootGetters[state.status.module + '/moduleStaticData'] ? rootGetters[state.status.module + '/moduleStaticData'].displayOptions : null,
            registrationCategories: registrationCategories(),
            moduleName: state.status.module,
            modulePrevious: state.status.modulePrevious,
            pathPrevious: state.status.pathPrevious,
            action: state.status.action,
            actionPrevious: state.status.actionPrevious,
            id: state.status.id,
            idPrevious: state.status.idPrevious,

            isImplemented: isImplemented(),
            count: getters.collection ? getters.collection.length : "Calculating...",
            isLocus: (state.status.module === "loci"),
            isFind: isFind(),
            isCreate: (state.status.action === "create"),
            isUpdate: (state.status.action === "update"),
            isFilter: (state.status.action === "filter" || state.status.action === "welcome"),
            isShow: (state.status.action === "show"),
            isWelcome: (state.status.action === "welcome"),
            isPicker: state.isPicker,
            isCreateLocus: (state.status.action === "create" && state.status.module === "loci"),
            isCreateFind: (state.status.action === "create" && isFind()),
            isMediaEdit: (state.status.action === "media"),
            isEdit: (state.status.action === "create" || state.status.action === "update" || state.status.action === "media" || state.status.action === "tags"),
            displayOption: getDisplayOption(),
            hasMedia: hasMedia(),
            hasRelatedModules: hasRelatedModules(),
            isDeleteable: isDeleteable(),
        };
        return status;
    },

}