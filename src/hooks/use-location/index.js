import { createBrowserHistory } from "history";
import { useEffect, useState } from "@wordpress/element";
import { parseLocation, parseParamsFromLocation } from "./utils";
import "./types";
import { buildQueryString } from "@wordpress/url";

const history = createBrowserHistory();

/**
 * A hook to get the browsers' location object.
 * The search params are parsed into an object for easier access.
 *
 * @return {LocationWithParams} The current location object
 */
const useLocation = () => {
    const [location, setLocation] = useState(() =>
        parseLocation(history.location)
    );

    useEffect(() => {
        return history.listen(({ location: updatedLocation }) => {
            setLocation(parseLocation(updatedLocation));
        });
    }, []);

    return location;
};

/**
 * A hook to use the browsers' history API to navigate with som helpers.
 *
 * @return {HistoryWithHelpers}
 */
const useHistory = () => {
    /**
     * @type HistoryWithHelpers.setParams
     * @param {{[p: string]: string}} nextParams
     * @param {boolean}               replace
     */
    const setParams = (nextParams, replace = false) => {
        const args = {
            ...parseParamsFromLocation(history.location),
            ...nextParams,
        };
        const search = "?" + buildQueryString(args);
        const path = history.location.pathname;
        return replace
            ? history.replace({ pathname: path, search })
            : history.push({ pathname: path, search });
    };

    /**
     * @type HistoryWithHelpers.goTo
     * @param {string}                path
     * @param {{[p: string]: string}} params
     * @param {boolean}               [replace=false]
     */
    const goTo = (path, params, replace = false) => {
        const search = "?" + buildQueryString(params);
        return replace
            ? history.replace({ pathname: path, search })
            : history.push({ pathname: path, search });
    };

    return {
        ...history,
        // Add custom helper functions here.
        setParams,
        goTo,
    };
};

export { useLocation, useHistory };
