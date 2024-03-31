/**
 * @typedef {Object} Route
 * @property {string} path   The path of the route.
 * @property {Object} params The parameters of the route.
 * @property {string} hash   The hash of the route.
 */

/**
 * @typedef {Object} RouterNavigation
 * @property {(path: string, params: Object) => void} goTo      Go to a new route.
 * @property {(newParams: Object) => void}            setParams Set some params without changing the path of the route.
 * @property {() => void}                             back      Go to the previous route in the history stack.
 * @property {() => void}                             forward   Go to the next route in the history stack.
 */
