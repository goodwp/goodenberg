<?php
/**
 * Utility functions for blocks.
 *
 * @package GoodWP\Goodenberg
 */

namespace GoodWP\Goodenberg\Blocks;

/**
 * Utility functions for blocks.
 *
 * @package GoodWP\Goodenberg
 */
abstract class BlockUtils {

	/**
	 * Returns the applied block style for a block.
	 * Should be passed the parsed block (e.g. from `render_block_data`)
	 *
	 * @param array $block The parsed block, contain a `className` or `attrs.className` property.
	 * @return string|null The matched block style
	 */
	public static function get_block_style( array $block ): ?string {
		$style = null;

		if ( isset( $block['className'] ) || isset( $block['attrs']['className'] ) ) {
			$class_name = $block['className'] ?? $block['attrs']['className'];
			preg_match( '/is-style-([a-zA-Z0-9\-]*)/', $class_name, $styles );
			if ( $styles && count( $styles ) > 0 ) {
				$style = $styles[1];
			}
		}

		return $style;
	}
}
