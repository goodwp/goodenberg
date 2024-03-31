import EntityRecordsSelect from "./select";
import { getPostRecordLabel, getTermRecordLabel } from "../../utils";

/**
 * A variant of the EntityRecordsSelect component which allows selecting posts of a specific post-type.
 *
 * @param {Object}                           props                    Any additional props will be passed to the EntityRecordsSelect component.
 * @param {string}                           props.postType           The post type from which to select a post.
 * @param {(record: EntityRecord) => string} [props.buildOptionLabel] Callback to build labels for the options. Default to a function returning the posts' title.
 * @return {React.ReactElement}
 * @class
 */
const PostsSelect = ({
    postType,
    buildOptionLabel = getPostRecordLabel,
    ...props
}) => {
    return (
        <EntityRecordsSelect
            type="postType"
            subType={postType}
            buildOptionLabel={buildOptionLabel}
            {...props}
        />
    );
};

/**
 * A variant of the EntityRecordSelect component which allows selecting terms of a specific taxonomy.
 *
 * @param {Object}                           props                    Any additional props will be passed to the EntityRecordsSelect component.
 * @param {string}                           props.taxonomy           The taxonomy from which to select a term.
 * @param {(record: EntityRecord) => string} [props.buildOptionLabel] Callback to build labels for the options. Defaults to a function returning the terms' name.
 * @return {React.ReactElement}
 * @class
 */
const TermsSelect = ({
    taxonomy,
    buildOptionLabel = getTermRecordLabel,
    ...props
}) => {
    return (
        <EntityRecordsSelect
            type="taxonomy"
            subType={taxonomy}
            buildOptionLabel={buildOptionLabel}
            {...props}
        />
    );
};

export default EntityRecordsSelect;
export { PostsSelect, TermsSelect };
