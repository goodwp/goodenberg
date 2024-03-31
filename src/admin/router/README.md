# Goodenberg Router

A simple router to render some components based on a current active route.
There are two implementations (one for URL-based routing, on for state-based routing).
Both provide a similar API.

## LocalRouter

A Router implementation based on local state.
Useful for rendering different components based on a user flow.
For example, adding an entity, editing an entity, list view.

An example could be to open an edit or create model when a button is pressed. The button to trigger the model can be
deep inside some nested components and use the context to trigger the view-change.

This router is the context provider and must be put around your components using the router.

### Example

```js
const ExamplePage = () => {
    const { goTo: goToView } = useRouterNavigation();
    const { path: view } = useRoute();
    return (
        <>
            <Panel header={"Welcome"}>
                <PanelBody>
                    <PanelRow>
                        <p>Welcome to the Goodenberg Examples page.</p>
                        <Button
                            onClick={() => {
                                goToView("special-view");
                            }}>
                            Open a sub-view
                        </Button>
                    </PanelRow>
                </PanelBody>
            </Panel>
            <Route name={"special-view"} Component={SpecialView}/>
        </>
    );
};

const App = () => {
    return (
        <LocalRouter>
            <ExamplePage/>
        </LocalRouter>
    );
}
```

## UrlRouter

A Router implementation based on the URL.
It uses window.location/window.history and the history package.
Can use any part of the URL (path, params, hash).
The search params are parsed into an object for easier access.

In the context of admin pages you are probably going to use one URL param (like `section`) and not the full path
(because that contains `wp-admin/admin.php`).

### Example

```js
const ParamBasedRoute = ({ name, ...props }) => {
    return <Route {...props} shouldRender={(route) => (route.params.view || "") === name}/>;
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
                <ParamBasedRoute name={""} Component={FirstView}/>
                <ParamBasedRoute name={"second-view"}>
                    <SecondView/>
                </ParamBasedRoute>
            </Container>
        </Page>
    );
};

const App = () => {
    return (
        <UrlRouter>
            <ExamplePage/>
        </UrlRouter>
    );
};
```

## Route

A component that conditionally renders another component based on the route. By default, it will match the `name` prop
against the current routes `path` value.
But you can define a `shouldRender` function in which you can run custom checks.

- `name` (string): The route name, to match against the current routes' path.
- [`shouldRender`] ((currentRoute: Route) => boolean): A function that returns true if the route should
  be rendered. Gets passed the currentRoute.
- [`Component`] (React.ReactElement): The child component to render. Will be passed any additional props. Either this
  or children must be passed.
- [`children`] (React.ReactNode): The child component to render. Either this or Component must be passed.
- Additional props will be passed to the component.

## useRoute

A hook which returns the current context value of type `Route`:

- `path` (string): The path of the route.
- `params` (Object): The parameters of the route.
- `hash` (string): The hash of the route.

When using the `URLRouter` it returns an extended `UrlRoute` with the following additional fields:

- `location` (LocationWithParams) The current browsers location object with an additional `params` object containing all
  search params parsed into an object.

## useRouterNavigation

A hook which returns an object to navigate in the current contexts router of type `RouterNavigation`:

- `goTo` ((path: string, params: Object) => void): Go to a new route.
- `setParams` ((newParams: Object) => void): Set some params without changing the path of the route.
- `back` (() => void): Go to the previous route in the history stack.
- `forward` (() => void): Go to the next route in the history stack.

When using the `URLRouter` it returns an extended `UrlRouterNavigation` with the following functions accepting
additional parameters:

- `goTo` ((path: string, args: Object, replace: boolean) => void): An additional `replace` argument, whether to
  call `history.replace` or `history.push`. Defaults to false.
- `setParams` ((newParams: Object, replace: boolean) => void): An additional `replace` argument, whether to
  call `history.replace` or `history.push`. Defaults to false.
