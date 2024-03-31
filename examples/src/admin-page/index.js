import { createRoot } from "@wordpress/element";
import domReady from "@wordpress/dom-ready";
import {
    Button,
    Panel,
    PanelRow,
    PanelBody,
    __experimentalVStack as VStack,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import {
    AdminNotices,
    Container,
    Page,
} from "@goodwp/goodenberg/admin/components";
import { LocalRouter, Route, useRoute, useRouterNavigation } from "@goodwp/goodenberg/admin/router";

const PageActions = () => {
    return (
        <Button
            variant="primary"
            onClick={() => {
                window.location.href("https://github.com/goodwp/goodenberg");
            }}
            icon="external"
            iconPosition="right"
            text={__("Go to GitHub", "goodenberg-examples")}
        />
    );
};

const FirstView = (props) => {
    const { goTo } = useRouterNavigation();
    return (
        <Panel header={"First View"}>
            <PanelBody>
                <PanelRow>
                    <p>This is the first view.</p>
                    <Button
                        onClick={() => {
                            goTo("second-view");
                        }}>
                        Go to second view.
                    </Button>
                </PanelRow>
            </PanelBody>
        </Panel>
    );
};

const SecondView = (props) => {
    const { goTo } = useRouterNavigation();
    return (
        <Panel header={"Second View"}>
            <PanelBody>
                <PanelRow>
                    <p>This is the second view.</p>
                    <Button
                        onClick={() => {
                            goTo("first-view");
                        }}>
                        Go to first view.
                    </Button>
                </PanelRow>
            </PanelBody>
        </Panel>
    );
};

const ExamplePage = () => {
    const { goTo: goToView } = useRouterNavigation();
    const { path: view } = useRoute();
    return (
        <Page name="goodenberg-examples">
            <Page.Header
                title={__("Goodenberg", "goodenberg-examples")}
                icon="info"
                actions={<PageActions />}
                hasBottomMargin>
                <p>{__("Example Page", "goodenberg-examples")}</p>
            </Page.Header>
            <Container contained>
                <VStack spacing={2}>
                    <AdminNotices />
                    {/* Always Render this Panel (regardless of view) */}
                    <Panel header={"Welcome"}>
                        <PanelBody>
                            <PanelRow>
                                <p>Welcome to the Goodenberg Examples page.</p>
                                {view === "" ? (
                                    <Button
                                        onClick={() => {
                                            goToView("first-view");
                                        }}>
                                        Open a sub-view
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => {
                                            goToView("");
                                        }}>
                                        Close sub-view
                                    </Button>
                                )}
                            </PanelRow>
                        </PanelBody>
                    </Panel>
                    <Route name={"first-view"} Component={FirstView} />
                    <Route name={"second-view"} Component={SecondView} />
                </VStack>
            </Container>
        </Page>
    );
};

const App = () => {
    return (
        <LocalRouter>
            <ExamplePage />
        </LocalRouter>
    );
};

domReady(() => {
    const container = document.getElementById("goodenberg-examples-admin-page");
    const root = createRoot(container);
    root.render(<App />);
});
