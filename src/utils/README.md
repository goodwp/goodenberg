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

### `onBlockRegistration(blockName, namespace, callback)`

Allows hooking into the registerBlockType hook of a specific block.
Avoid having to check for the block name in your callback.

- `blockName` (string): The blockName (slug) in which to hook.
- `namespace` (string): The namespace for the addFilter call.
- `callback` ((settings: object) => object) The callback to the filter. Get passed the settings object and should return
  the filtered settings object.

**Example**

```js
onBlockRegistration("core/columns", "custom/columns", (settings) => {
    return {
        ...settings,
        supports: {
            spacing: false,
            ...settings.supports,
        }
    }
});
```

### `onBlockEdit(blockName, namespace, callback, higherOrderComponent = false)`

Allows hooking into the BlockEdit hook of a specific block.
Avoid having to check for the block name in your callback.

- `blockName` (string): The blockName (slug) in which to hook.
- `namespace` (string): The namespace for the addFilter call.
- `callback` ((BlockEdit: React.ReactElement, props: object) => React.ReactElement) block edit component, gets passed
  the original BlockEdit and any props for it.
- `higherOrderComponent` (string|false): Whether to wrap the render in a higher order component. Can be a string to name
  the HOC or false to not wrap it. Defaults to false.

**Example**

```js
onBlockEdit("core/columns", "custom/columns", (BlockEdit, props) => {
    return (
        <>
            <BlockEdit {...props} />
            <InspectorControls>
                <CustomControl/>
            </InspectorControls>
        </>
    )
}, "withCustomControls");
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
