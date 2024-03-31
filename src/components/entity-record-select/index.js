import EntityRecordSelect from "./select";
import { getPostRecordLabel, getTermRecordLabel } from "../../utils";

/**
 * A variant of the EntityRecordSelect component which allows selecting a post of a specific post-type.
 *
 * @param {Object}                           props                    Any additional props will be passed to the EntityRecordSelect component.
 * @param {string}                           props.postType           The post type from which to select a post.
 * @param {(record: EntityRecord) => string} [props.buildOptionLabel] Callback to build labels for the options. Default to a function returning the posts' title.
 * @return {React.ReactElement}
 * @class
 */
const PostSelect = ({
    postType,
    buildOptionLabel = getPostRecordLabel,
    ...props
}) => {
    return (
        <EntityRecordSelect
            type="postType"
            subType={postType}
            buildOptionLabel={buildOptionLabel}
            {...props}
        />
    );
};

/**
 * A variant of the EntityRecordSelect component which allows selecting a term of a specific taxonomy.
 *
 * @param {Object}                           props                    Any additional props will be passed to the EntityRecordSelect component.
 * @param {string}                           props.taxonomy           The taxonomy from which to select a term.
 * @param {(record: EntityRecord) => string} [props.buildOptionLabel] Callback to build labels for the options. Defaults to a function returning the terms' name.
 * @return {React.ReactElement}
 * @class
 */
const TermSelect = ({
    taxonomy,
    buildOptionLabel = getTermRecordLabel,
    ...props
}) => {
    return (
        <EntityRecordSelect
            type="taxonomy"
            subType={taxonomy}
            buildOptionLabel={buildOptionLabel}
            {...props}
        />
    );
};

export default EntityRecordSelect;
export { PostSelect, TermSelect };
