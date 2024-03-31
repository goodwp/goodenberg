import { createRoot, useState } from "@wordpress/element";
import domReady from "@wordpress/dom-ready";
import {
    Panel,
    PanelBody,
    __experimentalVStack as VStack,
    Button,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import {
    PostSelect,
    TermSelect,
} from "@goodwp/goodenberg/components/entity-record-select";
import {
    PostsSelect,
    TermsSelect,
} from "@goodwp/goodenberg/components/entity-records-select";
import {
    AdminNotices,
    Page,
    Container,
    UrlSyncedTabPanel as TabPanel,
} from "@goodwp/goodenberg/admin/components";

const TABS = [
    {
        name: "components",
        title: __("Components", "goodenberg-examples"),
        Component: () => {
            const [post, setPost] = useState();
            const [category, setCategory] = useState();
            const [posts, setPosts] = useState();
            const [categories, setCategories] = useState();
            return (
                <VStack spacing={2}>
                    <Panel header={"Single Record Components"}>
                        <PanelBody>
                            <PostSelect
                                label={__(
                                    "Select a post",
                                    "goodenberg-examples"
                                )}
                                postType={"post"}
                                value={post}
                                onSelect={setPost}
                                loadInitial
                            />
                            <TermSelect
                                label={__(
                                    "Select a category",
                                    "goodenberg-examples"
                                )}
                                taxonomy={"category"}
                                value={category}
                                onSelect={setCategory}
                                loadInitial
                            />
                        </PanelBody>
                    </Panel>
                    <Panel header={"Multiple Records Components"}>
                        <PanelBody>
                            <PostsSelect
                                label={__(
                                    "Select posts",
                                    "goodenberg-examples"
                                )}
                                postType={"post"}
                                values={posts}
                                onSelect={setPosts}
                                loadInitial
                            />
                            <TermsSelect
                                label={__(
                                    "Select categories",
                                    "goodenberg-examples"
                                )}
                                taxonomy={"category"}
                                values={categories}
                                onSelect={setCategories}
                                loadInitial
                            />
                        </PanelBody>
                    </Panel>
                </VStack>
            );
        },
    },
    {
        name: "second-tab",
        title: __("2nd tab", "goodenberg-examples"),
        Component: () => {
            return <div>2nd tab</div>;
        },
    },
];

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

const ExamplePage = () => {
    return (
        <Page name="goodenberg-examples">
            <Page.Header
                title={__("Goodenberg", "goodenberg-examples")}
                icon="info"
                actions={<PageActions />}
            />
            <TabPanel
                className="goodenberg-tabs"
                tabs={TABS}
                initialTabName={"components"}
                children={(Tab) => {
                    return (
                        <>
                            <Container contained>
                                <AdminNotices />
                            </Container>
                            <Container contained style={{ marginTop: "8px" }}>
                                <Tab.Component />
                            </Container>
                        </>
                    );
                }}
            />
        </Page>
    );
};

const App = () => {
    return <ExamplePage />;
};

domReady(() => {
    const container = document.getElementById("goodenberg-examples-admin-page");
    const root = createRoot(container);
    root.render(<App />);
});
