import { useMemo } from "@wordpress/element";

import { RouteContext, RouterNavigationContext } from "../context";
import { useLocation, useHistory } from "../../../hooks";

/**
 * @typedef {Object} UrlRoute
 * @augments Route
 * @property {LocationWithParams} location The current browsers location object.
 */

/**
 * @typedef {Object} UrlRouterNavigation
 * @augments RouterNavigation
 * @property {(path: string, args: Object, replace: boolean) => void}       goTo      Go to a new route.
 * @property {(newParams: {[p: string]: string}, replace: boolean) => void} setParams Set some params without changing the path of the route.
 */

/**
 * A Router implementation based on the URL.
 * Can use any part of the URL (path, params, hash).
 * The search params are parsed into an object for easier access.
 *
 * This router is the context provider and must be put around your components using the router.
 *
 * @param {Object}          props
 * @param {React.ReactNode} props.children
 * @return {React.ReactElement}
 * @class
 */
const UrlRouter = ({ children }) => {
    const history = useHistory();
    const location = useLocation();

    /**
     * @type UrlRouterNavigation
     */
    const routerNavigation = {
        goTo: history.goTo,
        setParams: history.setParams,
        back: history.back,
        forward: history.forward,
    };

    /**
     * @type UrlRoute
     */
    const route = useMemo(() => {
        return {
            path: location.pathname,
            params: location.params,
            hash: location.hash,
            location,
        };
    }, [location]);

    return (
        <RouterNavigationContext.Provider value={routerNavigation}>
            <RouteContext.Provider value={route}>
                {children}
            </RouteContext.Provider>
        </RouterNavigationContext.Provider>
    );
};

export default UrlRouter;
