import authorize from './authorize'
import load from './load'

export default function middleware (router) {
    authorize(router);
    load(router);
}