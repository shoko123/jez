export default {
    parseRoute(state, payload) {
        //TODO this needs a lot of work to make more reasonable, but it works for now.

        let sections = payload.to.path.split('/');
        state.status.pathPrevious = payload.from.path;
        state.status.modulePrevious = state.status.module;
        state.status.idPrevious = state.status.id;
        state.status.actionPrevious = state.status.action;
        //console.log('parsePaths.from ' + JSON.stringify(fromTokens, null, 2));
        //console.log('parsePaths.to: ' + JSON.stringify(sections, null, 2));
        //let path = payload.to.path;

        switch (sections[1]) {
            case '':
                //whenever we change module we clear the old one. so let make the old one 'aut'
                //TODO fix this nonesense
                state.status.modulePrevious = state.status.module = 'Auth';
                break;

            case 'login':
                state.status.module = 'Auth';
                state.status.action = 'login';
                break;

            case 'loci':
                state.status.module = 'Locus';
                state.status.action = sections[sections.length - 1];
                state.status.id = payload.to.params ? payload.to.params.id : null;
                //state.status.actionPrevious = null;
                break;

            case 'finds':
                state.status.action = sections[sections.length - 1];
                state.status.id = payload.to.params ? payload.to.params.id : null;
                switch (sections[2]) {
                    case 'stones':
                        state.status.module = 'Stone';
                        break;

                    case 'pottery':
                        state.status.module = 'Pottery';
                        break;

                    case 'lithics':
                        state.status.module = 'Lithic';
                        break;

                    case 'glass':
                        state.status.module = 'Glass';
                        break;
                        
                    case 'metals':
                        state.status.module = 'Metal';
                        break

                    default:
                        state.status.module = 'Unknown';
                        alert('unknown find type');
                        break

                }
                break;
            default:
                console.log('can\'t parse path');
        };
        state.status.action = sections[sections.length - 1]
    }
}
