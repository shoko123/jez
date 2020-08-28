export default {
    status(state, getters, rootState, rootGetters) {
        function isImplemented() {
            switch (state.status.module) {
                case "Stone":
                case "Pottery":
                case "Locus":
                    return true;
                default:
                    return false;
            }
        }
        function isDigItem() {
            switch (state.status.module) {
                case "Auth":
                    return false;

                default:
                    return true;
            }
        }
        function isFind() {
            switch (state.status.module) {
                case "Stone":
                case "Glass":
                case "Pottery":
                case "Lithic":
                    return true;

                default:
                    return false;
            }
        }
     
        //notice - plural
        function getDisplayOptions() {
            if(!state.status.module) return [];
            return getters["moduleInfo"].displayOptions;
            if (displayOptionsArr) {
                state.displayOptions = displayOptionsArr;
            }
            return displayOptionsArr;
        }
        //notice - single
        function getDisplayOption() {
            let displayOptions = getDisplayOptions
            if (!state.displayOptions) {
                return null;
            }
            return { index: state.displayOptionsIndex, text: state.displayOptions[state.displayOptionsIndex] };
        }

        function hasMedia() {
            return (!rootGetters["med/itemAllMedia"] || (rootGetters["med/itemAllMedia"].length > 0));
        }

        function hasRelatedModules() {
            if (state.status.module === "Locus") {
                if (!getters.item || !rootGetters["med/locusFindsMedia"]) {
                    return true;
                } else {
                    return (rootGetters["med/locusFindsMedia"].length > 0);
                }

            } else {
                return false;
            }
        }
        function isDeleteable() {
            return (!hasMedia() && !hasRelatedModules());
        }

        let status = {
            itemName: getters["moduleInfo"] ? getters["moduleInfo"].itemName : null,
            collectionName: getters["moduleInfo"] ? getters["moduleInfo"].collectionName : null,
            moduleAppBaseUrl: getters["moduleInfo"] ? getters["moduleInfo"].appBaseUrl : null,
            moduleApiBaseUrl: getters["moduleInfo"] ? getters["moduleInfo"].apiBaseUrl : null,

            displayOptions: getDisplayOptions(),
            displayOption: getDisplayOption(),
            
            moduleName: state.status.module,
            modulePrevious: state.status.modulePrevious,
            pathPrevious: state.status.pathPrevious,
            action: state.status.action,
            actionPrevious: state.status.actionPrevious,
            id: state.status.id,
            idPrevious: state.status.idPrevious,

            isImplemented: isImplemented(),
            count: state.collection.length ? state.collection.length : "...",
            isLocus: (state.status.module === "Locus"),
            isFind: isFind(),
            isDigItem: isDigItem(),
            isCreate: (state.status.action === "create"),
            isUpdate: (state.status.action === "update"),
            isFilter: (state.status.action === "filter" ||state.status.action === "welcome"),
            isShow: (state.status.action === "show"),
            isWelcome: (state.status.action === "welcome"),
            isTags: (state.status.action === "tags"),
            isCreateLocus: (state.status.action === "create" && state.status.module === "Locus"),
            isCreateFind: (state.status.action === "create" && isFind()),
            isMediaEdit: (state.status.action === "media"),
            isEdit: (state.status.action === "create" || state.status.action === "update" || state.status.action === "media" || state.status.action === "tags"),
            
            hasMedia: hasMedia(),
            hasRelatedModules: hasRelatedModules(),
            isDeleteable: isDeleteable(),
        };
        return status;
    },

}