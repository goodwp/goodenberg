# `useApiFetch`

A hook wrapper around
the [`apiFetch`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-api-fetch/) function
from core.
It provides a convenient way to fetch data from the WordPress REST API and handling loading state, errors, and getting
headers.

## Parameters

- `path`: The API endpoint path to fetch data from.
- `options`: Additional options for the API request, such as method, headers, body, etc. See apiFetch documentation.
  Be sure to memoize these options if they are static (e.g., define outside render function, use useMemo).
  If you define them on each render, they will trigger a new API call on each render.

## Return Value

The hook returns an object with the following properties:

- `isLoading` (bool): A boolean to indicate if the API request is in progress.
- `response` (object: {data: object, headers: object}): The response fetched from the API endpoint including data (JSON
  parsed) and headers.
- `error` (Error): Any error that occurred during the API request.

## Example

```js
import { useApiFetch } from '@goodwp/goodenberg/hooks';

const BASE_OPTIONS = {
    per_page: 10,
}

// If you don't want to pass any params,
// use an empty object defined outside render function.
const EMPTY_OBJECT = {};

const MyComponent = ({ orderBy, ...props }) => {
    const apiParams = useMemo(() => {
        return {
            ...BASE_OPTIONS,
            orderby: orderBy
        }
    }, [orderBy])
    const { isLoadingPosts, postResponse, postError } = useApiFetch('/wp/v2/posts', apiParams);
    const { response: { data, headers } } = useApiFetch('/custom/v1/endpoint', EMPTY_OBJECT);

    if (isLoadingPosts) {
        return <Spinner/>;
    }

    if (postError) {
        return <p>Error: {postError.message}</p>;
    }

    return (
        <ul>
            {postResponse.data.map(post => (
                <li key={post.id}>{post.title.rendered}</li>
            ))}
        </ul>
    );
};

export default MyComponent;
```