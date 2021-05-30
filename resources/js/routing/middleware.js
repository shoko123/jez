import authorize from './authorize'
import prepareForNewRoute from './prepareForNewRoute'

export default function middleware (router) {
    authorize(router);
    prepareForNewRoute(router);
}