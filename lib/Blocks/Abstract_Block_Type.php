<?php

namespace GoodWP\Goodenberg\Blocks;

/**
 * An abstract class for a custom block type.
 * Extend and overwrite class constants to define a block type.
 */
abstract class Abstract_Block_Type {

	/**
	 * The blocks namespace
	 *
	 * !! OVERWRITE !!
	 *
	 * @var string
	 */
	protected const string NAMESPACE = '';

	/**
	 * The blocks name without namespace
	 *
	 * !! OVERWRITE !!
	 *
	 * @var string
	 */
	protected const string NAME = '';

	/**
	 * The block dir containing the block.json
	 *
	 * !! OVERWRITE !!
	 *
	 * @var string
	 */
	protected const string DIR = '';

	/**
	 * Initializes the service
	 * e.g. registering hooks (= side effects)
	 *
	 * @return void
	 */
	public function init(): void {
		assert( ! empty( static::NAME ), 'Block Type must declare NAME const with slug of block type' );
		assert( ! empty( static::NAMESPACE ), 'Block Type must declare NAMESPACE const with namespace of block type' );
		assert( ! empty( static::DIR ), 'Block Type must declare DIR const with path to block.json' );

		add_action( 'init', [ $this, 'register' ] );
	}

	/**
	 * Register the block type.
	 *
	 * @hooked register_block_type
	 * @param array $args Additional block register args.
	 * @return void
	 */
	public function register( array $args = [] ): void {
		register_block_type( static::DIR, $args );
	}

	/**
	 * Get the full block name.
	 *
	 * @return string
	 */
	public function get_name(): string {
		return static::NAMESPACE . '/' . static::NAME;
	}
}
