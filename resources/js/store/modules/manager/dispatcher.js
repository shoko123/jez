export default {
  handleRouteChange(state, getters, rootGetters, commit, dispatch) {

    function sameModule() {
      return (state.status.module == state.status.modulePrevious)
    }

    function updateAppStatus(state, getters, rootGetters, commit, dispatch) {
      switch (state.status.action) {
        case "list":
          //console.log('mgr.routeChanged.list ');// + JSON.stringify(res, null, 2));
          //if same module, retrieve collection if not already populated
          if (!sameModule() || state.isDirtyCollection) {
            dispatch("aux/queryCollection", { clear: true, spinner: true, gotoCollection: true }, { root: true });
          }
          break;

        case "show":

          if (sameModule()) {
            //if no collection loaded yet, retrieve new module's collection and then item
            if (!getters.collection.length) {
              //if same module, but collection empty, retrieve collection and then item
              dispatch("aux/queryCollection", { clear: false, spinner: true, gotoCollection: false }, { root: true })
                .then((res) => {
                  dispatch("loadItem", state.status.id)
                  return res;
                })
            } else {
              if (state.status.idPrevious !== state.status.id ||
                state.status.actionPrevious === "update" ||
                state.status.actionPrevious === "tags") {
                //collection loaded - load item only
                dispatch("loadItem", state.status.id)
              } else {
                console.log("mgr - same item id - not loading")
              }
            }
          }
          else {
            //if not same module, clear old module and retrieve new module's collection and then item 
            dispatch("loadItem", state.status.id)
              .then((res) => {
                //console.log('mgr.routeChanged.show after loading item. loading collection...');
                dispatch("aux/queryCollection", { clear: true, spinner: false, gotoCollection: false }, { root: true });
                return res;
              })  
          }
          break;

        case "welcome":
        case "filter":
          commit("displaySetCurrentPage", 1);
          break;

        case "create":
          dispatch("prepare", false);
          break;
        case "update":
          dispatch("prepare", true);
          break;

        case "tags":
          dispatch(`aux/prepareTagger`, null, { root: true });
          break;

        default:
      }
    }

    //actual code starts running here

    /////////////////////////////////////////////////////////////////////////
    //if new module, can not proceed until module's data is retrieved from DB.
    /////////////////////////////////////////////////////////////////////////
    if (getters["status"].isDigModule && !sameModule()) {
      dispatch('initializeModule')
        .then(res => {
          updateAppStatus(state, getters, rootGetters, commit, dispatch);
        })

    } else {
      updateAppStatus(state, getters, rootGetters, commit, dispatch);
    }
  },
}