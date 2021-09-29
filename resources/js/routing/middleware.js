import parseAndPermit from './authorize'
import prepareForNewRoute from './prepareForNewRoute'

export default function middlewareInit (router) {
    parseAndPermit(router);
    prepareForNewRoute(router);
}