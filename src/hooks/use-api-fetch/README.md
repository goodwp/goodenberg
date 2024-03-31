# `useApiFetch`

A hook wrapper around
the [`apiFetch`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-api-fetch/) function
from core.
It provides a convenient way to fetch data from the WordPress REST API and handling loading state, errors, and getting
headers.

## Parameters

- `path`: The API endpoint path to fetch data from.
- `options`: Additional options for the API request, such as method, headers, body, etc. See apiFetch documentation.

## Return Value

The hook returns an object with the following properties:

- `isLoading` (bool): A boolean to indicate if the API request is in progress.
- `response` (object: {data: object, headers: object}): The response fetched from the API endpoint including data (JSON
  parsed) and headers.
- `error` (Error): Any error that occurred during the API request.

## Example

```js
import {useApiFetch} from '@goodwp/goodenberg/hooks';

const MyComponent = () => {
    const {isLoading, respones, error} = useApiFetch('/wp/v2/posts', {});

    if (isLoading) {
        return <Spinner/>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <ul>
            {response.data.map(post => (
                <li key={post.id}>{post.title.rendered}</li>
            ))}
        </ul>
    );
};

export default MyComponent;
```