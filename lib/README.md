# Goodenberg PHP Library

This library provides you abstract classes and helper functions for developing custom WordPress blocks, building modern
wp-admin pages or extending core/3rd party blocks.

## Blocks

### `GoodWP\Goodenberg\Blocks\Abstract_Block_Type`

TODO: Test and document this class.

### `GoodWP\Goodenberg\Blocks\Abstract_Dynamic_Block_Type`

TODO: Test and document this class.

### `GoodWP\Goodenberg\Blocks\BlockUtils`

- `get_block_style( array $block ): ?string`: Returns the applied block style for a block.

## Utils

### `GoodWP\Goodenberg\Utils\Assets`

A utility class with methods to register and enqueue scripts/styles which were built with the @wordpress/scripts
package.
It makes registering scripts which have a `.asset.php` file easier.