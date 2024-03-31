import { SnackbarList } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { store as noticesStore } from "@wordpress/notices";

/**
 * Renders a list of snackbar notifications, just like in the block editor.
 *
 * @param {Object} props Any props passed to the SnackbarList component.
 * @return {React.ReactElement}
 * @class
 */
const NotificationsList = (props) => {
    const notices = useSelect(
        (select) => select(noticesStore).getNotices(),
        []
    );
    const { removeNotice } = useDispatch(noticesStore);
    const snackbarNotices = notices.filter(({ type }) => type === "snackbar");
    return (
        <SnackbarList
            {...props}
            notices={snackbarNotices}
            onRemove={removeNotice}
        />
    );
};

export default NotificationsList;
