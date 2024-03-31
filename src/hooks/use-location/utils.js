/**
 * Parses the path and parameters from a given URL.
 *
 * @param {Location} location The location to parse.
 * @return {LocationWithParams} Location with parsed parameters as an object.
 */
const parseLocation = (location) => {
    return {
        ...location,
        params: parseParamsFromLocation(location),
    };
};

/**
 * Parse the query params/search params from a Locations string into an object.
 *
 * @param {Location} location
 * @return {{[p: string]: string}}
 */
const parseParamsFromLocation = (location) => {
    const searchParams = new URLSearchParams(location.search);
    return Object.fromEntries(searchParams.entries());
};

export { parseLocation, parseParamsFromLocation };
