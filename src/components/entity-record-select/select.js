import { useState, useMemo } from "@wordpress/element";
import { useDebounce } from "@wordpress/compose";
import { store as coreStore } from "@wordpress/core-data";
import { ComboboxControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";

/**
 * A select component which allows searching for a record (post, term,...).
 * Allows selecting only a single value.
 *
 * @param {Object}                              props                    Additional props will be passed to the ComboboxControl
 * @param {string}                              props.type               Entity record type ("postType", "taxonomy", ...). See @wordpress/core-data.
 * @param {string}                              props.subType            Entity record subtype (postType, taxonomy. See @wordpress/core-data.
 * @param {int|null}                            props.value              The selected value.
 * @param {(id: int) => void}                   props.onSelect           Callback for when a new value is selected.
 * @param {boolean}                             props.loadInitial        Whether to load some initial values. Will run a default query for the type+subtype.
 * @param {Array.<{label: string, value: int}>} [props.extraOptions]     Static extra options to show in the select.
 * @param {(record: EntityRecord) => string}    [props.buildOptionLabel] Callback to build labels for the options.
 * @param {Object}                              [props.queryArgs]        Additional query args to pass to the API.
 * @return {React.ReactElement}
 * @class
 */
const EntityRecordSelect = ({
    type,
    subType,
    value,
    onSelect,
    loadInitial = false,
    extraOptions = [],
    buildOptionLabel = null,
    queryArgs = {},
    ...props
}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const debouncedSetSearchTerm = useDebounce(setSearchTerm, 250);

    // Do not build the dynamic array of all records on every useSelect call.
    const { selectedRecord, searchRecords, initialRecords, hasLoadedRecords } =
        useSelect(
            (select) => {
                const {
                    getEntityRecords,
                    getEntityRecord,
                    hasFinishedResolution,
                } = select(coreStore);

                const baseQuery = {
                    per_page: 20,
                    order: "asc",
                    _fields: "id,name,title",
                    context: "view",
                    orderby: type === "taxonomy" ? "name" : "title",
                    ...queryArgs,
                };

                // Get the selected record if value exists
                const existingSelectorArgs = [type, subType, value];
                const selectedRecord = value
                    ? getEntityRecord(...existingSelectorArgs)
                    : null;

                // Get search records if search term exists
                const searchSelectorArgs = [
                    type,
                    subType,
                    {
                        ...baseQuery,
                        search: searchTerm,
                        exclude: value,
                    },
                ];
                const searchRecords = searchTerm
                    ? getEntityRecords(...searchSelectorArgs)
                    : null;

                // Determine if we should load initial records
                const hasSelectedOrSearchRecords =
                    selectedRecord !== null ||
                    (searchRecords && searchRecords.length > 0);

                const shouldLoadInitial =
                    !hasSelectedOrSearchRecords && loadInitial;

                // Get initial records if needed
                const initialSelectorArgs = [
                    type,
                    subType,
                    {
                        ...baseQuery,
                    },
                ];
                const initialRecords = shouldLoadInitial
                    ? getEntityRecords(...initialSelectorArgs)
                    : null;

                // Check if all data has loaded
                const hasLoadedExisting =
                    !value ||
                    hasFinishedResolution(
                        "getEntityRecord",
                        existingSelectorArgs
                    );
                const hasLoadedSearch =
                    !searchTerm ||
                    hasFinishedResolution(
                        "getEntityRecords",
                        searchSelectorArgs
                    );
                const hasLoadedInitial =
                    !shouldLoadInitial ||
                    hasFinishedResolution(
                        "getEntityRecords",
                        initialSelectorArgs
                    );

                return {
                    selectedRecord,
                    searchRecords,
                    initialRecords,
                    hasLoadedRecords:
                        hasLoadedExisting &&
                        hasLoadedSearch &&
                        hasLoadedInitial,
                };
            },
            [type, subType, searchTerm, value, loadInitial, queryArgs]
        );

    // Use useMemo to build the options array directly from the raw data
    const options = useMemo(() => {
        const records = [];

        // Add selected record if it exists
        if (selectedRecord) {
            records.push({
                value: selectedRecord.id,
                label: buildOptionLabel
                    ? buildOptionLabel(selectedRecord)
                    : selectedRecord.title || selectedRecord.name,
            });
        }

        // Add search records if they exist
        if (searchRecords) {
            searchRecords.forEach((record) => {
                records.push({
                    value: record.id,
                    label: buildOptionLabel
                        ? buildOptionLabel(record)
                        : record.title || record.name,
                });
            });
        }

        // Add initial records if they exist
        if (initialRecords) {
            initialRecords.forEach((record) => {
                records.push({
                    value: record.id,
                    label: buildOptionLabel
                        ? buildOptionLabel(record)
                        : record.title || record.name,
                });
            });
        }

        // Combine with extraOptions
        if (records.length > 0 && hasLoadedRecords) {
            return [...extraOptions, ...records];
        }
        return [...extraOptions];
    }, [
        selectedRecord,
        searchRecords,
        initialRecords,
        buildOptionLabel,
        extraOptions,
        hasLoadedRecords,
    ]);

    return (
        <ComboboxControl
            {...props}
            options={options}
            value={value}
            onChange={onSelect}
            onFilterValueChange={debouncedSetSearchTerm}
        />
    );
};

export default EntityRecordSelect;
