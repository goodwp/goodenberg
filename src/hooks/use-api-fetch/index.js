import { useEffect, useState } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";

const EMPTY_OBJECT = {};

/**
 * A custom React hook which wraps the apiFetch function.
 * Helps with loading state, error handling and getting headers.
 *
 * @param {string} url       The url to fetch.
 * @param {Object} queryArgs The query args to add to the url.
 * @param {Object} options   Additional options to pass to the apiFetch/fetch function. Be sure to memoize them.
 * @return {{isLoading: boolean, response: {data: object, headers: object}, error: Error}}
 */
const useApiFetch = (url, queryArgs, options = EMPTY_OBJECT) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const path = addQueryArgs(url, queryArgs);
        const controller =
            typeof AbortController === "undefined"
                ? undefined
                : new AbortController();

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const requestResponse = await apiFetch({
                    path,
                    ...options,
                    signal: controller?.signal,
                    parse: false, // parse for ourselves, so we can return headers as well
                });
                const json = await requestResponse.json();
                setResponse({
                    data: json,
                    headers: requestResponse.headers,
                });
            } catch (responseError) {
                setError(responseError);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();

        return () => {
            controller?.abort();
        };
    }, [url, queryArgs, options]);

    return { response, error, isLoading };
};
export default useApiFetch;
