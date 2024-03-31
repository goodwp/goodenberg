# Hooks for URL/Location and history API

Hooks to use the URL/window.location and history object to use
browser
navigation.

## `useLocation`

A hook to get the browsers' location object.
The search params are parsed into an object for easier access.

Returns an extended `LocationWithParams` (extension of `Location`) object with the additional keys:

- `params` (object): The search query parsed into an object.

## `useHistory`

A hook to use the browsers' history API to navigate with som helpers.

Returns an extended `HistoryWithHelpers` (extension of `History`) object with the following helpers:

- `goTo` ((path: string, args: {[p: string]: string}, replace: boolean) => void): Go to a new URL.
- `setParams` ((nextParams: {[p: string]: string}, replace: boolean) => void): Set some params without changing the path
  of the route.

## Example

```js
const App = () => {
    const { goTo } = useHistory();
    const { path } = useLocation();


    return (
        <>
            <p>{`Current path is: ${path}`}</p>
            <button onClick={() => {
                goTo("/somewhere/else", { id: 5 })
            }}>Go to new location
            </button>
        </>
    )
};
```
