# Goodenberg

Goodenberg is a library of components, helpers and examples for building modern WordPress sites and applications with
the block editor and all other features introduced with Gutenberg.

> **Warning**  
> This package is under active development and not considered stable, breaking changes can be added. I'm using the
> package
> on a few sites and some custom plugins successfully, but am still developing, optimizing and documenting it at the
> moment.

## Table of Contents

- [Changelog](./CHANGELOG.md)
- [Versioning / Supported WordPress versions](#versioning--supported-wordpress-versions)
- [JavaScript / React](#javascript--react)
- [PHP](#php)
- [Examples](#examples)

## Versioning / Supported WordPress versions

The library will follow SemVer versioning. Major versions and breaking changes will be kept to a minimum.
Each minor version will support the latest stable WordPress version at the time of release.
Development versions will try to work with newer Gutenberg versions.

Current supported WordPress version: WordPress 6.5

## JavaScript / React

All JavaScript code is developed inside the `src` directory.

### Usage

1. Install the package via `npm install @goodwp/goodenberg`
2. Use `@wordpress/scripts` for an easy build process and to automatically extract dependencies
3. Use single components/hooks/etc
    - All submodules (see below) can be imported from the submodules entrypoint
      `import {Page} from "@goodwp/goodenberg/admin/components";`
    - All submodules also provide directory-based imports:
      `import {Page} from "@goodwp/goodenberg/admin/components/page";`

### Architecture

The library only uses babel with the `@wordpress/babel-preset-default` preset to transpile each single js file, but does
not have any other build-process. It is suggested to use
@wordpress/scripts or a custom webpack config to bundle it.

Styles are created via @emotion to avoid requiring an additional stylesheet.

### Components (`components`)

React components to be used in your admin screens or custom blocks.

- [EntityRecordsSelect](src/components/entity-records-select/README.md): A component which allows a user to select
  multiple records (
  post, term,
  etc.).
- [EntityRecordSelect](src/components/entity-record-select/README.md): A component which allows a user to select a
  single
  record (
  post, term, etc.).

[More Information](src/components/README.md)

### Admin (`admin`)

React components, hooks, and utils for building pages in the wp-admin.
Useful for building custom plugin pages, settings pages, etc. To be used together with @wordpress/components.

#### Components

- [Page](src/admin/components/README.md): A component to build a complete wp-admin page, including header, content,
  notices.
- [Page.Header](src/admin/components/README.md): A header bar for wp-admin pages.

- [AdminNotices](src/admin/components/README.md): A "slot" which will render all admin notices that were rendered on the
  server
- [Bar](src/admin/components/README.md): A full-width navigation bar for headers/footers on admin pages (used in
  Page.Header).
- [Container](src/admin/components/README.md): A centered container which has a configurable default max-width.
- [TabPanel](src/admin/components/README.md): A styled version of WordPress TabPanel component to be used on admin pages
  right beneath your Page.Header.

[More Information](src/admin/components/README.md)

#### Router

A simple "router" to render some components based on a current active "route".
There are two implementations (one for URL-based routing, on for state-based routing).
Both provide a similar API.

[More Information](src/admin/router/README.md)

### Hooks (`hooks`)

React hooks to be used in your admin screens or custom blocks.

- [`useApiFetch`](src/hooks/use-api-fetch/README.md): A hook wrapper around
  the [`apiFetch`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-api-fetch/) function
  from core.
- [`useLocation`/`useHistory`](src/hooks/use-location/README.md): A hook to use the URL/window.location and history
  object to use
  browser
  navigation.

[More Information](src/hooks/README.md)

### Utils (`utils`)

Handy utility functions.

[More Information](src/utils/README.md)

## PHP

All PHP code is developed inside the `lib` directory.

**Usage**

1. Install the package via `composer require goodwp/goodenberg`
2. Load your composers autoload file in your plugin/theme.
3. Use the classes and helpers.

[More Information](lib/README.md)

## Examples

The [examples directory](./examples) contains a plugin which uses a lot of the components.
You can also test this plugin via @wordpress/env:

1. Clone the repository
2. Run `npm install`
3. Run `npm env:start`
4. Open `http://localhost:8888/wp-admin` and login with `admin` / `password`
5. Activate the plugin and open the example pages.

## Bugs, Issues, Security Issues, Feature Requests

Visit our [GitHub Repository](https://github.com/goodwp/goodenberg).

Inspired by [10up/block-components](https://github.com/10up/block-components).