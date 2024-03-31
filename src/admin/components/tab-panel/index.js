import styled from "@emotion/styled";
import { TabPanel as CoreTabPanel } from "@wordpress/components";
import { useRef } from "@wordpress/element";
import { useHistory, useLocation } from "../../../hooks";

const StyledTabPanel = styled(CoreTabPanel)`
    > .components-tab-panel__tabs {
        background: #fff;
        justify-content: center;
        border-bottom: 1px solid #e2e4e7;
    }
`;

/**
 * @typedef {Object} Tab
 * @property {string}             name        The slug name of the tab.
 * @property {string}             title       The title of the tab displayed in the tab bar.
 * @property {React.ReactElement} Component   A react component to render the tab.
 * @property {boolean}            [disabled]  Whether the tab is disabled.
 * @property {string}             [className] A className to pass to the tab panel bar item.
 * @property {IconType}           [icon]      An icon to display in the tab panel bar.
 */

/**
 * A styled version of WordPress TabPanel component to be used on admin pages, for example, right beneath
 * your `Page.Header`.
 *
 * See {@link https://developer.wordpress.org/block-editor/reference-guides/components/tab-panel/|core TabPanel package documentation} for possible props.
 *
 * @param {Object}          props            React component props. Additional props will be passed to the TabPanel.
 * @param {Array<Tab>}      props.tabs       The tabs to pass, see TabPanel.
 * @param {React.ReactNode} [props.children] An optional render method.                                                                                                         [props.children]     Children to render in the center of the header.
 * @return {React.ReactElement}
 * @class
 */
const TabPanel = ({ children, ...props }) => {
    if (!children) {
        children = (Tab) => {
            return <Tab.Component />;
        };
    }
    return <StyledTabPanel children={children} {...props} />;
};

/**
 * A TabPanel which loads its initial tab from the `tab` URL Parameter
 *  and syncs changing the tab back to the URL.
 *
 * TODO: ATM this only loads the tab from the URL on first render
 *  and sets the selected tab in the URL when changing tabs.
 *  But it does not allow updating the selected tab when the url changes (from a button in another component e.g.)
 *  This is because TabPanel has no method to set the selected tab afterwards.
 *  initialTabName is buggy when used for this.
 *
 * See {@link https://developer.wordpress.org/block-editor/reference-guides/components/tab-panel/|core TabPanel package documentation} for possible props.
 *
 * @param {Object}          props                React component props. Additional props will be passed to the TabPanel.
 * @param {Array<Tab>}      props.tabs           The tabs to pass, see TabPanel.
 * @param {React.ReactNode} [props.children]     An optional render method.
 * @param {string|null}     props.initialTabName The name of the tab to load initially if no tab is passed in the URL.
 * @return {React.ReactElement}
 * @class
 */
const UrlSyncedTabPanel = ({ initialTabName = null, tabs, ...props }) => {
    const {
        params: { tab: urlTab = "" },
    } = useLocation();
    const { setParams } = useHistory();

    const initialTab = useRef("");
    // On first render, get the initial tab from URL or fallback to the passed prop.
    if (!initialTab.current) {
        let suggestedInitialTab = initialTabName;
        if (urlTab && urlTab !== initialTabName) {
            if (tabs.find((tab) => tab.name === urlTab)) {
                suggestedInitialTab = urlTab;
            }
        }
        initialTab.current = suggestedInitialTab;
    }

    // The onSelect callback will always be called twice when the initialTab tab is selected again.
    // This is due to the useLayoutEffect in the original TabPanel.
    // It's also independent of any URL syncing done here.
    const onTabSelect = (tabName) => {
        if (urlTab !== tabName) {
            setParams({ tab: tabName }, false);
        }
        // Call onSelect if provided.
        if (props.onSelect) {
            props.onSelect(tabName);
        }
    };

    return (
        <TabPanel
            {...props}
            onSelect={onTabSelect}
            initialTabName={initialTab.current}
            tabs={tabs}
        />
    );
};

export default TabPanel;
export { UrlSyncedTabPanel };
