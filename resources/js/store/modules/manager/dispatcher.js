export default {
  handleRouteChange(state, getters, rootGetters, commit, dispatch) {

    function sameModule() {
      return (state.status.module == state.status.modulePrevious)
    }

    //commit('parsePath', payload);
    //console.log('mgr.routeChanged.show sameModule: ' + sameModule());
    if (!sameModule()) {
      state.collection = null;
      dispatch("clear");
    }

    switch (state.status.action) {
      case "show":

        if (sameModule()) {
          //if no collection loaded yet, retrieve new module's collection and then item
          if (!getters.collection) {
            //if same module, but collection empty, retrieve collection and then item
            dispatch("loadCollection", null)
              .then((res) => {
                console.log('mgr.routeChanged.show after loading collection. loading item...');// + JSON.stringify(res, null, 2));
                dispatch("loadItem", state.status.id)
                return res;
              })
              .then((res) => {
                //console.log('gss collection after xhr res: ' + JSON.stringify(res, null, 2));
                console.log('mgr.show after loading item');
                return res;
              })
              .catch(err => {
                console.log('mgr.show failed to load');
                return err;
              })
          } else {
            if (state.status.idPrevious !== state.status.id || state.status.actionPrevious === "update") {
              //collection loaded - load item only
              //console.log("mgr - new item or update - loading")
              dispatch("loadItem", state.status.id)
                .then((res) => {
                  //console.log('gss collection after xhr res: ' + JSON.stringify(res, null, 2));
                  //console.log('mgr.show after loading item');
                  return res;
                })
            } else {
              console.log("mgr - same item id - not loading")
            }
          }
        }
        else {
          state.displayOptionsIndex = 0;
          //if not same module, clear old module and retrieve new module's collection and then item 
          //dispatch(`${getters.stattus.modulePrevious + '/clear'}`, null, { root: true })
          dispatch("loadItem", state.status.id)
            .then((res) => {
              console.log('mgr.routeChanged.show after loading item. loading collection...');// + JSON.stringify(res, null, 2));
              dispatch("loadCollection", null);
              return res;
            })
            .then((res) => {
              //console.log('gss collection after xhr res: ' + JSON.stringify(res, null, 2));
              console.log('mgr.show after loading item');
              return res;
            })
            .catch(err => {
              console.log('mgr.show failed to load');
              return err;
            })
        }
        break;

      case "welcome":
        //dispatch("pkr/loadAreasSeasons", null, { root: true });
        dispatch("loadSummary", null)
        break;
      case "list":
        console.log('mgr.routeChanged.list or welcome');// + JSON.stringify(res, null, 2));
        //if same module, retrieve collection if not already populated
        if (!sameModule() || !state.collection) {
          //dispatch("mgr/loadCollection", null, { root: true });
          dispatch("loadCollection", null);
        }
        break;

      case "create":
      case "update":
        dispatch("prepare", null);
      default:
    }
  },


  util1: function (rootGetters) {
    return rootGetters["mgr/item"];
  },


}