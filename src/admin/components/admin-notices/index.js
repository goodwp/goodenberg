import styled from "@emotion/styled";
import { useRefEffect } from "@wordpress/compose";

const NoticesWrapper = styled.div`
    > .notice {
        margin-left: 0;
        margin-right: 0;
    }
`;

/**
 * A "slot" which will render all admin notices that were rendered on the server via `admin_notices` hook.
 * Will move all notices into this wrapper.
 *
 * @param {Object} props React component props, passed to the wrapper.
 * @return {React.ReactElement}
 * @class
 */
const AdminNotices = (props) => {
    const ref = useRefEffect((element) => {
        document
            .querySelectorAll("#wpbody-content > .notice")
            .forEach((notice) => {
                element.appendChild(notice);
            });

        return () => {
            const bodyContent = document.querySelector("#wpbody-content");
            element
                .querySelectorAll("#wpbody-content > .notice")
                .forEach((notice) => {
                    bodyContent.appendChild(notice);
                });
        };
    }, []);
    return <NoticesWrapper ref={ref} {...props} />;
};

export default AdminNotices;
