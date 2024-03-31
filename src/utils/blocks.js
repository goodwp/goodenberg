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

export { getBlockStyle };
