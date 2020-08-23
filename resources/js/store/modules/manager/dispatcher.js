export default {
  handleRouteChange(state, getters, rootGetters, commit, dispatch, router) {

    function sameModule() {
      return (state.status.module == state.status.modulePrevious)
    }

    //console.log('mgr.routeChanged.show sameModule: ' + sameModule());
    if (!sameModule()) {
      dispatch("clear");
      if (getters["status"].isItem) {
        //we can't proceed before we loaded the module's 'parameters'.
        dispatch('loadModuleTags');
        (async () => {
          await dispatch('initializeModule');
      })();
        //await dispatch('initializeModule');
      }
    }

    switch (state.status.action) {
      case "list":
        //console.log('mgr.routeChanged.list ');// + JSON.stringify(res, null, 2));
        //if same module, retrieve collection if not already populated
        if (!sameModule() || state.isDirtyCollection) {
          dispatch("aux/queryCollection", {clear: true, spinner: true, gotoCollection: true}, { root: true } );
        }
        break;

      case "show":

        if (sameModule()) {
          //if no collection loaded yet, retrieve new module's collection and then item
          if (!getters.collection.length) {
            //if same module, but collection empty, retrieve collection and then item
            dispatch("aux/queryCollection", {clear: false, spinner: true, gotoCollection: false}, { root: true } )
              .then((res) => {
                dispatch("loadItem", state.status.id)
                return res;
              })

          } else {
            if (state.status.idPrevious !== state.status.id || state.status.actionPrevious === "update") {
              //collection loaded - load item only
              dispatch("loadItem", state.status.id)
            } else {
              console.log("mgr - same item id - not loading")
            }
          }
        }
        else {
          state.displayOptionsIndex = 0;
          //if not same module, clear old module and retrieve new module's collection and then item 
          //dispatch(`${getters.stattus.modulePrevious + '/clear'}`, null, { root: true })
          //dispatch("loadItem", state.status.id)
          dispatch("loadItem", state.status.id)
            .then((res) => {
              //console.log('mgr.routeChanged.show after loading item. loading collection...');
              dispatch("aux/queryCollection", {clear: true, spinner: false, gotoCollection: false}, { root: true } );
              return res;
            })
        }
        break;

      case "welcome":
      case "filter":
        break;

      case "create":
      case "update":
        dispatch("prepare", null);
        break;

      case "tags":
        dispatch(`tag/prepareForNew`, null, { root: true });
        dispatch(`aux/prepareForNew`, null, { root: true });
        break;
        
      default:
    }
  },


  util1: function (rootGetters) {
    return rootGetters["mgr/item"];
  },


}