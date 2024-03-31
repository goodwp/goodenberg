import { useState } from "@wordpress/element";
import "../types";
import { RouteContext, RouterNavigationContext } from "../context";

/**
 * A Router implementation based on local state.
 * Useful for rendering different components based on a user flow.
 * For example, adding an entity, editing an entity, list view.
 *
 * This router is the context provider and must be put around your components using the router.
 *
 * @param {Object}          props
 * @param {React.ReactNode} props.children
 * @return {React.ReactElement}
 * @class
 */
const LocalRouter = ({ children }) => {
    const [path, setPath] = useState("");
    const [params, setParams] = useState({});
    const [hash, setHash] = useState("#");

    /**
     * @type {RouterNavigation}
     */
    const routerNavigation = {
        goTo: (newPath, args = {}) => {
            setPath(newPath);
            setParams(args);
        },
        setParams: (newParams) => {
            setParams({ ...params, ...newParams });
        },
        // noop
        back: () => {},
        // noop
        forward: () => {},
    };

    /**
     * @type {Route}
     */
    const route = {
        path,
        params,
        hash,
    };
    return (
        <RouterNavigationContext.Provider value={routerNavigation}>
            <RouteContext.Provider value={route}>
                {children}
            </RouteContext.Provider>
        </RouterNavigationContext.Provider>
    );
};

export default LocalRouter;
