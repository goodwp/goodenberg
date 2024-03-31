/**
 * @typedef {Object} LocationWithParams
 * @augments Location
 * @property {Object} params The search query parsed into an object.
 */

/**
 * @typedef {Object} HistoryWithHelpers
 * @augments History
 * @property {(path: string, args: {[p: string]: string}, replace: boolean) => void} goTo      Go to a new URL.
 * @property {(nextParams: {[p: string]: string}, replace: boolean) => void}         setParams Set some params without changing the path of the route.
 */
