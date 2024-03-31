import { useEffect, useState } from "@wordpress/element";
import { useDebounce } from "@wordpress/compose";
import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";
import { FormTokenField } from "@wordpress/components";
import { decodeEntities } from "@wordpress/html-entities";
import { getRecordIdByEntityValue } from "./utils";
import { getRecordTitle } from "../../utils";

const EMPTY_ARRAY = [];

/**
 * A select component which allows searching for a record (post, term,...).
 * Allows selecting multiple values.
 *
 * @param {Object}                           props                    Additional props will be passed to the FormTokenField
 * @param {string}                           props.type               Entity record type ("postType", "taxonomy", ...). See @wordpress/core-data.
 * @param {string}                           props.subType            Entity record subtype (postType, taxonomy. See @wordpress/core-data.
 * @param {int[]}                            props.values             The selected record ids.
 * @param {(ids: int[]) => void}             props.onSelect           Callback for when a new value is selected. Gets passed all ids.
 * @param {boolean}                          props.loadInitial        Whether to load some initial values. Will run a default query for the type+subtype.
 * @param {(record: EntityRecord) => string} [props.buildOptionLabel] Callback to build labels for the options. Make sure to memoize it.
 * @param {Object}                           [props.queryArgs]        Additional query args to pass to the API.
 * @return {React.ReactElement}
 * @class
 */
const EntityRecordsSelect = ({
    type,
    subType,
    values,
    onSelect,
    loadInitial = false,
    buildOptionLabel = getRecordTitle,
    ...props
}) => {
    // The selected entities but mapped to records from the selected ids
    const [value, setValue] = useState(EMPTY_ARRAY);
    // The current search term
    const [searchTerm, setSearchTerm] = useState("");
    // A list of all possible options/suggestions
    const [suggestions, setSuggestions] = useState(EMPTY_ARRAY);
    // Debounce the request to the API while typing
    const debouncedSearch = useDebounce(setSearchTerm, 250);

    // Get the search results after typing
    const { searchResults, searchHasResolved } = useSelect(
        (select) => {
            if (!searchTerm && !loadInitial) {
                // if loadInitial = true, search with empty search to show top options
                return {
                    searchResults: EMPTY_ARRAY,
                    searchHasResolved: true,
                };
            }

            const { getEntityRecords, hasFinishedResolution } =
                select(coreStore);
            const selectorArgs = [
                type,
                subType,
                {
                    search: searchTerm,
                    order: "asc",
                    _fields: "id,name,title",
                    context: "view",
                    orderby: type === "taxonomy" ? "name" : "title",
                    exclude: values,
                    per_page: 20,
                },
            ];
            return {
                searchResults: getEntityRecords(...selectorArgs),
                searchHasResolved: hasFinishedResolution(
                    "getEntityRecords",
                    selectorArgs
                ),
            };
        },
        [searchTerm, values, type, subType, loadInitial]
    );

    // `existingEntities` are the ones fetched from the API and their type is `{ id: number; name: string }`.
    // They are used to extract the entities' names to populate the `FormTokenField` properly
    // and to sanitize the provided `values`, by setting only the ones that exist.
    const { existingEntities, existingEntitiesHasResolved } = useSelect(
        (select) => {
            if (!values?.length) {
                return {
                    existingEntities: EMPTY_ARRAY,
                    existingEntitiesHasResolved: true,
                };
            }
            const { getEntityRecords, hasFinishedResolution } =
                select(coreStore);
            const selectorArgs = [
                type,
                subType,
                {
                    include: values,
                    per_page: values.length,
                },
            ];
            return {
                existingEntities: getEntityRecords(...selectorArgs),
                existingEntitiesHasResolved: hasFinishedResolution(
                    "getEntityRecords",
                    selectorArgs
                ),
            };
        },
        [values, type, subType]
    );

    // Update the `value` state only after the selectors are resolved
    // to avoid emptying the input when we're changing selected entities.
    useEffect(() => {
        if (!values?.length) {
            setValue(EMPTY_ARRAY);
        }
        if (!existingEntities?.length) {
            return;
        }
        // Returns only the existing entity ids. This prevents the component
        // from crashing in the editor when non-existing ids are provided.
        const sanitizedValue = values.reduce((accumulator, id) => {
            const entity = existingEntities.find((ent) => ent.id === id);
            if (entity) {
                accumulator.push({
                    id,
                    value: buildOptionLabel(entity),
                });
            }
            return accumulator;
        }, []);
        setValue(sanitizedValue);
    }, [values, existingEntities, buildOptionLabel]);

    // Update suggestions only when the query has resolved.
    useEffect(() => {
        if (!searchHasResolved) return;
        setSuggestions(searchResults.map(buildOptionLabel));
    }, [searchResults, searchHasResolved, buildOptionLabel]);

    const onValueChange = (newValues) => {
        const newIds = new Set();
        for (const newValue of newValues) {
            const entityId = getRecordIdByEntityValue(searchResults, newValue);
            if (entityId) {
                newIds.add(entityId);
            }
        }
        setSuggestions(EMPTY_ARRAY);
        onSelect(Array.from(newIds));
    };

    // if (!searchHasResolved || !existingEntitiesHasResolved) {
    //   return (
    //     <BaseControl {...props}>
    //       <Spinner />
    //     </BaseControl>
    //   );
    // }

    return (
        <FormTokenField
            {...props}
            value={value}
            onInputChange={debouncedSearch}
            suggestions={suggestions}
            displayTransform={decodeEntities}
            onChange={onValueChange}
            // disabled={!searchHasResolved || !existingEntitiesHasResolved}
        />
    );
};

export default EntityRecordsSelect;
