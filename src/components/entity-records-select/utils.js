import { getRecordTitle } from "../../utils";

/**
 * Helper function to get a records id based on user input in `FormTokenField`
 * @param {EntityRecord[]}                 records
 * @param {{id: int, name: string}|string} value
 * @return {int}
 */
export const getRecordIdByEntityValue = (records, value) => {
    // First, we check for exact match by `record.id` or case-sensitive `record.name|title` match.
    const entityId =
        value?.id ||
        records?.find((record) => getRecordTitle(record) === value)?.id;
    if (entityId) {
        return entityId;
    }

    /**
     * Here we make an extra check for entered records in a case-insensitive way,
     * to match user expectations, due to `FormTokenField` behavior that shows
     * suggestions which are case-insensitive.
     *
     * Although WP tries to discourage users from adding terms with the same name (case-insensitive),
     * it's still possible if you manually change the name, as long as the terms have different slugs.
     * In this edge case, we always apply the first match from the terms list.
     */
    const valueLower = value.toLocaleLowerCase();
    return records?.find(
        (record) => getRecordTitle(record).toLocaleLowerCase() === valueLower
    )?.id;
};
