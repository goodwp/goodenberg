import "./types";
import {
    RouteContext,
    RouterNavigationContext,
    useRoute,
    useRouterNavigation,
} from "./context";
import LocalRouter from "./local";
import UrlRouter from "./url";

/**
 * Renders a child component only when the current view matches the provided name or when the custom shouldRender callback evaluates to true.
 *
 * @param {Object}                           props                Additional props will be passed to the component.
 * @param {string}                           props.name           The route name, to match against the current routes' path.
 * @param {(currentRoute: Route) => boolean} [props.shouldRender] A function that returns true if the route should be rendered. Gets passed the currentRoute.
 * @param {React.ReactElement}               [props.Component]    The child component to render. Will be passed any additional props. Either this or children must be passed.
 * @param {React.ReactNode}                  [props.children]     The child component to render. Either this or Component must be passed.
 * @return {React.ReactElement|null}
 * @class
 */
const Route = ({
    name,
    shouldRender = null,
    Component,
    children,
    ...props
}) => {
    const currentRoute = useRoute();

    if (shouldRender) {
        if (!shouldRender(currentRoute)) {
            return null;
        }
    } else if (currentRoute.path !== name) {
        return null;
    }
    if (Component) {
        return <Component {...props} />;
    }

    return <>{children}</>;
};

export {
    Route,
    LocalRouter,
    UrlRouter,
    useRoute,
    useRouterNavigation,
    RouteContext,
    RouterNavigationContext,
};
