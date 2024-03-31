import { useEffect } from "@wordpress/element";
import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import classnames from "classnames";

import NotificationsList from "./notifications";

const PositionedNotificationsList = styled(NotificationsList)`
    position: fixed;
    bottom: 20px;
    left: auto;
    padding-left: 20px;
`;

/**
 * A general layout page wrapper, adding basic layout styles, adds a class to the body.
 * Also renders the snackbar notifications list and (optionally) hides any pre-existing php rendered admin notices.
 *
 * @param {Object}          props             React component props, additional props passed to the wrapper.
 * @param {string}          props.name        The page name.
 * @param {boolean}         props.hideNotices Hide any server-side rendered admin notices.
 * @param {string}          [props.className] Additional CSS classes for the wrapper.
 * @param {React.ReactNode} props.children    Any components to render on the page.
 * @return {React.ReactElement}
 * @class
 */
const Layout = ({ name, hideNotices, children, ...props }) => {
    const pageClassName = `${name}-page`;
    const primaryClassName = `${name}`;

    useEffect(() => {
        document.body.classList.add(pageClassName);
        return () => {
            document.body.classList.remove(pageClassName);
        };
    }, [pageClassName]);

    return (
        <>
            <Global
                // Use scoped styles, so the styles are only applied to the current page.
                styles={css`
                    .${pageClassName} #wpcontent,
                    .${pageClassName}.auto-fold #wpcontent {
                        padding-left: 0;
                    }

                    .${primaryClassName} {
                        box-sizing: border-box;
                    }

                    .${primaryClassName} *,
                    .${primaryClassName} *::before,
                    .${primaryClassName} *::after {
                        box-sizing: inherit;
                    }
                `}
            />
            {hideNotices && (
                <Global
                    styles={css`
                        // Hide all notices

                        .${pageClassName} #wpbody-content > .notice {
                            display: none;
                        }
                    `}
                />
            )}
            <div
                className={classnames(primaryClassName, props?.className)}
                {...props}>
                {children}
                <PositionedNotificationsList />
            </div>
        </>
    );
};

export default Layout;
