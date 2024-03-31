import { createContext, useContext } from "@wordpress/element";
import "./types";

const RouteContext = createContext();
const RouterNavigationContext = createContext();

/**
 * A custom React hook that provides access to the RouteContext.
 *
 * @return {Route} The current route object
 */
const useRoute = () => {
    return useContext(RouteContext);
};

/**
 * A custom React hook that provides access to the RouterNavigationContext.
 *
 * @return {RouterNavigation} The router navigation object.
 */
const useRouterNavigation = () => {
    return useContext(RouterNavigationContext);
};

export { RouteContext, RouterNavigationContext, useRoute, useRouterNavigation };
