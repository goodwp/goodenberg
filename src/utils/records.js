import { __ } from "@wordpress/i18n";

/**
 * Function to get the record title (for posts and terms).
 *
 * @param {EntityRecord} record The record object to extract the title from
 * @return {string} The extracted or generated record title
 */
export const getRecordTitle = (record) => {
    // Taxonomy Terms
    if (record.name) {
        return record.name;
    }
    // Post Types Posts
    if (record.title) {
        if (typeof record.title === "string") {
            return record.title;
        }
        return record.title.rendered || record.title.raw;
    }
    return `#${record.id} ${__("(no title)")}`;
};

/**
 * Returns the label for a post entity record based on the title, defaulting to "(no title)" if no name is provided.
 *
 * @param {EntityRecord} post The post entity record fetched via API.
 * @return {string} The label for the post record.
 */
export const getPostRecordLabel = (post) => {
    return (
        post?.title?.rendered ||
        post?.title?.raw ||
        post?.title ||
        __("(no title)")
    );
};

/**
 * Returns the label for a term record, defaulting to "(no title)" if no name is provided.
 *
 * @param {EntityRecord} term - The term entity record fetched via API.
 * @return {string} The label for the term record
 */
export const getTermRecordLabel = (term) => {
    return term?.name || __("(no title)");
};
