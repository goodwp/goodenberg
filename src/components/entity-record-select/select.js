import { useState } from "@wordpress/element";
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

    let options = [...extraOptions];

    const { records, hasLoadedRecords } = useSelect(
        (select) => {
            const { getEntityRecords, getEntityRecord, hasFinishedResolution } =
                select(coreStore);

            const baseQuery = {
                per_page: 20,
                order: "asc",
                _fields: "id,name,title",
                context: "view",
                orderby: type === "taxonomy" ? "name" : "title",
                ...queryArgs,
            };
            const allRecords = [];

            // Load the existing value into the options
            const existingSelectorArgs = [type, subType, value];
            if (value) {
                const selectedRecord = getEntityRecord(...existingSelectorArgs);
                if (selectedRecord) {
                    allRecords.push({
                        value: selectedRecord.id,
                        label: buildOptionLabel
                            ? buildOptionLabel(selectedRecord)
                            : selectedRecord.title || selectedRecord.name,
                    });
                }
            }

            const searchSelectorArgs = [
                type,
                subType,
                {
                    ...baseQuery,
                    search: searchTerm,
                    exclude: value,
                },
            ];

            if (searchTerm) {
                const searchRecords = getEntityRecords(...searchSelectorArgs);
                if (searchRecords) {
                    searchRecords.forEach((r) => {
                        allRecords.push({
                            value: r.id,
                            label: buildOptionLabel
                                ? buildOptionLabel(r)
                                : r.title || r.name,
                        });
                    });
                }
            }

            const shouldLoadInitial = allRecords.length === 0 && loadInitial;
            const initialSelectorArgs = [
                type,
                subType,
                {
                    ...baseQuery,
                },
            ];
            if (shouldLoadInitial) {
                const initialRecords = getEntityRecords(...initialSelectorArgs);
                if (initialRecords) {
                    initialRecords.forEach((r) => {
                        allRecords.push({
                            value: r.id,
                            label: buildOptionLabel
                                ? buildOptionLabel(r)
                                : r.title || r.name,
                        });
                    });
                }
            }

            const hasLoadedExisting =
                !value ||
                hasFinishedResolution("getEntityRecord", existingSelectorArgs);
            const hasLoadedSearch =
                !searchTerm ||
                hasFinishedResolution("getEntityRecords", searchSelectorArgs);
            const hasLoadedInitial =
                !shouldLoadInitial ||
                hasFinishedResolution("getEntityRecords", initialSelectorArgs);
            return {
                records: allRecords,
                hasLoadedRecords:
                    hasLoadedExisting && hasLoadedSearch && hasLoadedInitial,
            };
        },
        [
            type,
            subType,
            searchTerm,
            value,
            loadInitial,
            queryArgs,
            buildOptionLabel,
        ]
    );

    if (records && hasLoadedRecords) {
        options = [...options, ...records];
    }

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
