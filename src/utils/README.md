# Goodenberg Utils

## Blocks

### `getBlockStyle(className: string)`

Get the selected/applied block style by its classname.

- `className` (string): The blocks className attribute.
- Returns (string|false): The slug of the selected style or false if none found/default is selected.

**Example:**

```js
import { getBlockStyle } from "@goodwp/goodenberg/utils";

const BlockEdit = ({ attributes }) => {
    const { className } = attributes;
    const style = getBlockStyle(className);

    if (style === "outline") {
        // Do something
    }
};
```

## Records

### `getRecordTitle(record: EntityRecord)`

Function to get the records' title (for posts and terms) to display in a select component.

- `record` (EntityRecord): The record object to extract the title from.
- Returns (string): The extracted or generated record title.

See [EntityRecordsSelect](../components/entity-records-select/select.js) for example usage.

### `getPostRecordLabel(post)`

Returns the label for a post-record based on the title, defaulting to "(no title)" if no name is provided.

- `post` (EntityRecord): The post entityrecord fetched via API.
- Returns (string): The label for the post record.

See [PostSelect](../components/entity-record-select/index.js) for example usage.

### `getTermRecordLabel(term)`

Returns the label for a term record, defaulting to "(no title)" if no name is provided.

- `term` (EntityRecord): The term entity record fetched via API.
- Returns (string): The label for the term record.

See [TermSelect](../components/entity-record-select/index.js) for example usage.
