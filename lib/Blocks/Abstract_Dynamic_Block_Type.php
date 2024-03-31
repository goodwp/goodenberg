<?php

namespace GoodWP\Goodenberg\Blocks;

use WP_Block;

/**
 * An abstract class for a dynamic custom block type with a render callback.
 */
abstract class Abstract_Dynamic_Block_Type extends Abstract_Block_Type {


	public function register( array $args = [] ): void {
		parent::register(
			wp_parse_args(
				$args,
				[
					'render_callback' => [ $this, 'render' ],
				]
			)
		);
	}

	abstract public function render( array $attributes, string $content, WP_Block $block ): string;
}
