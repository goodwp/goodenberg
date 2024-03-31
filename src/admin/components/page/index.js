import {
    Icon,
    SlotFillProvider,
    // eslint-disable-next-line @wordpress/no-unsafe-wp-apis
    __experimentalHeading as Heading,
} from "@wordpress/components";
import { Bar } from "../index";
import Layout from "./layout";
import { PageContext, usePageContext } from "./context";

/**
 * A header bar for wp-admin pages.
 *
 * @param {Object}          props            React component props. Additional props will be passed to the header wrapper.
 * @param {string}          props.title      The page title to display.
 * @param {IconType}        [props.icon]     The icon to display. Passed to the Icon component.
 * @param {React.ReactNode} [props.actions]  The actions to display.
 * @param {React.ReactNode} [props.children] Children to render in the center of the header.
 * @return {React.ReactElement}
 * @class
 */
const Header = ({ title, icon = null, actions, children, ...props }) => {
    const Title = (
        <>
            {icon && <Icon icon={icon} />}
            <Heading level={3} as={"h1"}>
                {title}
            </Heading>
        </>
    );
    return (
        <Bar
            start={Title}
            center={children}
            end={actions}
            as={"header"}
            {...props}
        />
    );
};

/**
 * An admin page component. Includes important context providers and the general layout.
 * Use the Header and Content components as children.
 *
 * @param {Object}          props          React component props, additional props passed to the layout wrapper.
 * @param {string}          props.name     The name (slug) of the page. Used for CSS classes.
 * @param {React.ReactNode} props.children Any components to render on the page. Use Header, Content components.
 * @return {React.ReactElement}
 * @class
 */
const Page = ({ name, children, ...props }) => {
    return (
        <SlotFillProvider>
            <PageContext.Provider value={{ name }}>
                <Layout name={name} {...props}>
                    {children}
                </Layout>
            </PageContext.Provider>
        </SlotFillProvider>
    );
};

Page.Header = Header;

export { Page, usePageContext };
