import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";

/**
 * Get the selected/applied block style by its class name.
 *
 * @param {string} className The blocks className attribute.
 * @return {string|false} The slug of the selected style or false if none found/default is selected.
 */
const getBlockStyle = (className) => {
    const styles = className.match(/is-style-([a-zA-Z0-9-]*)/);

    if (!styles || styles.length <= 1) {
        return false;
    }

    return styles[1];
};

/**
 * Allows hooking into the registerBlockType hook of a specific block.
 * Avoids having to check for the block name in your callback.
 *
 * Call like `onBlockRegistration("core/button", "custom/button", callbackFunction)`.
 *
 * @param {string}                       blockName The blockName (slug) in which to hook.
 * @param {string}                       namespace The namespace for the addFilter call.
 * @param {(settings: object) => object} callback  The callback to the filter.
 *                                                 Get passed the settings object and should return the filtered settings object.
 */
const onBlockRegistration = (blockName, namespace, callback) => {
    addFilter("blocks.registerBlockType", namespace, (settings, name) => {
        if (name !== blockName) {
            return settings;
        }
        return callback(settings);
    });
};

/**
 * Allows hooking into the BlockEdit hook of a specific block.
 * Avoids having to check for the block name in your callback.
 *
 * Call like `onBlockEdit("core/button", "custom/button", callbackFunction)`.
 *
 * @param {string}                                                               blockName            The blockName (slug) in which to hook.
 * @param {string}                                                               namespace            The namespace for the addFilter call.
 * @param {(BlockEdit: React.ReactElement, props: object) => React.ReactElement} callback             The render function of your custom block edit component, gets passed the original BlockEdit and any props for it.
 * @param {string|false}                                                         higherOrderComponent Whether to wrap the render in a higher order component.
 *                                                                                                    Can be a string to name the HOC or false to not wrap it.
 */
const onBlockEdit = (
    blockName,
    namespace,
    callback,
    higherOrderComponent = false
) => {
    let filterCallback = (BlockEdit) => {
        return (props) => {
            if (props.name !== blockName) {
                return BlockEdit(props);
            }
            return callback(BlockEdit, props);
        };
    };
    if (higherOrderComponent) {
        filterCallback = createHigherOrderComponent(
            filterCallback,
            higherOrderComponent
        );
    }
    addFilter("editor.BlockEdit", namespace, filterCallback);
};

export { getBlockStyle, onBlockRegistration, onBlockEdit };
