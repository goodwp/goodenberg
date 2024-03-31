# Goodenberg Admin

React components, hooks, and utils for building pages in the wp-admin. Useful for building custom plugin pages, settings
pages, etc.
To be used together with @wordpress/components.

## Components

Components for building custom wp-admin pages with React.

- Page: A component to build a complete wp-admin page, including header, content, notices.
- Page.Header: A header bar for wp-admin pages.

- AdminNotices: A "slot" which will render all admin notices that were rendered on the server
- Bar: A full-width navigation bar for headers/footers on admin pages (used in Page.Header).
- Container: A centered container which has a configurable default max-width.
- TabPanel: A styled version of WordPress TabPanel component to be used on admin pages right beneath your Page.Header.

[More Information](components/README.md)

## Hooks

## Router

A simple router framework for rendering routes/views depending on the current route and providing navigation for it.
`UrlRouter` syncs with the URL and works with browser history/navigation, `LocalRouter` keeps the routing state in a
component.

[More Information](router/README.md)