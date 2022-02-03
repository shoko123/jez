import parseAndAuthorize from './parseAndAuthorize'
import prepareForNewRoute from './prepareForNewRoute'

export default function middlewareInit (router) {
    parseAndAuthorize(router);
    prepareForNewRoute(router);
}