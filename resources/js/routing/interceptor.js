import Router from 'vue-router'

//catch Navigation Failures (supress logging to console.)
export default function interceptor() {
    console.log("Router:navigation errors interceptor.init()");
    const { isNavigationFailure, NavigationFailureType } = Router;
    const originalPush = Router.prototype.push;

    Router.prototype.push = function push(location) {
        return originalPush.call(this, location)

            .catch(err => {
                if (err.name === 'NavigationDuplicated') {
                    console.log("duplicate");
                } else if (isNavigationFailure(err)) {
                    console.log(`Navigation error: ${err}`);
                } else {
                    throw err;
                }
            });
    }
}