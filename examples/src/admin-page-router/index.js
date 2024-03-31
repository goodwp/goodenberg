import { createRoot } from "@wordpress/element";
import domReady from "@wordpress/dom-ready";
import {
    Button,
    Panel,
    PanelRow,
    PanelBody,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import {
    Container,
    Page,
} from "@goodwp/goodenberg/admin/components";
import { Route, UrlRouter, useRouterNavigation } from "@goodwp/goodenberg/admin/router";

const ParamBasedRoute = ({ name, ...props }) => {
    return <Route {...props} shouldRender={(route) => (route.params.view || "") === name} />;
};

const FirstView = (props) => {
    const { setParams } = useRouterNavigation();
    return (
        <Panel header={"First View"}>
            <PanelBody>
                <PanelRow>
                    <p>This is the first view.</p>
                    <Button
                        onClick={() => {
                            setParams({ view: "second-view" });
                        }}>
                        Go to second view.
                    </Button>
                </PanelRow>
            </PanelBody>
        </Panel>
    );
};

const SecondView = (props) => {
    const { setParams } = useRouterNavigation();
    return (
        <Panel header={"Second View"}>
            <PanelBody>
                <PanelRow>
                    <p>This is the second view.</p>
                    <Button
                        onClick={() => {
                            setParams({ view: "" });
                        }}>
                        Go to first view.
                    </Button>
                </PanelRow>
            </PanelBody>
        </Panel>
    );
};

const ExamplePage = () => {
    return (
        <Page name="goodenberg-examples" hideNotices>
            <Page.Header
                title={__("Goodenberg", "goodenberg-examples")}
                icon="info"
                hasBottomMargin>
                <p>{__("Example Page", "goodenberg-examples")}</p>
            </Page.Header>
            <Container contained>
                <ParamBasedRoute name={""} Component={FirstView} />
                <ParamBasedRoute name={"second-view"}><SecondView /></ParamBasedRoute>
            </Container>
        </Page>
    );
};

const App = () => {
    return (
        <UrlRouter>
            <ExamplePage />
        </UrlRouter>
    );
};

domReady(() => {
    const container = document.getElementById("goodenberg-examples-admin-page");
    const root = createRoot(container);
    root.render(<App />);
});
