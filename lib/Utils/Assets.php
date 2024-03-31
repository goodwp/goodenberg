<?php
/**
 * Utility functions for registering and enqueueing assets.
 *
 * @package GoodWP\Goodenberg
 */

namespace GoodWP\Goodenberg\Utils;

/**
 * Utility functions for registering and enqueueing assets.
 *
 * @package GoodWP\Goodenberg
 */
class Assets {



	/**
	 * Register a script from an asset file (built via wp-scripts).
	 *
	 * @param string $handle The handle under which to register the script.
	 * @param string $asset_path The full path to the asset, excluding the extension (e.g. plugins/example/assets/index).
	 * @param array  $extras Any additional data to merge/overwrite into the data from the asset file.
	 * @return string|null The registered script handle on success, null on error.
	 */
	public static function register_script_from_asset(
		string $handle,
		string $asset_path,
		array $extras = []
	): ?string {
		$asset_data = [];

		$asset_file = wp_normalize_path( realpath( $asset_path . '.asset.php' ) );
		$asset_src  = get_block_asset_url( $asset_path . '.js' );

		if ( file_exists( $asset_file ) ) {
			$asset_data = include $asset_file;
		}

		foreach ( $extras as $key => $value ) {
			if ( array_key_exists( $key, $asset_data ) && is_array( $asset_data[ $key ] ) ) {
				$asset_data[ $key ] = array_merge( $asset_data[ $key ], $value );
			} else {
				$asset_data[ $key ] = $value;
			}
		}

		$registered = wp_register_script(
			$handle,
			$asset_src,
			$asset_data['dependencies'] ?? [],
			$asset_data['version'] ?? null,
			// Old format: $footer (bool), new format: $args (array) loading strategy.
			$asset_data['footer'] ?? ( $asset_data['args'] ?? false )
		);

		return $registered ? $handle : null;
	}

	/**
	 * Enqueues a script from an asset file (built via wp-scripts).
	 *
	 * @param string $handle The handle under which to register the script.
	 * @param string $asset_path The full path to the asset, excluding the extension (e.g. plugins/example/assets/index).
	 * @param array  $extras Any additional data to merge/overwrite into the data from the asset file.
	 * @return string|null The registered script handle on success, null on error.
	 */
	public static function enqueue_script_from_asset(
		string $handle,
		string $asset_path,
		array $extras = []
	): ?string {
		$registered = self::register_script_from_asset( $handle, $asset_path, $extras );
		if ( $registered ) {
			wp_enqueue_script( $registered );
			return $registered;
		}
		return null;
	}
}
