# Changelog

## v0.3.0 (2024-11-22)

- Fix `useApiFetch` not resetting error when run multiple times and first request errors, but second is successfull (other way round as well).
- Update @wordpress packages and loosen peerDependencies version constraints so it's easier to install with newer versions.

## v0.2.1 (2024-10-14)

- Fix: EntityRecordsSelect with custom `buildOptionLabel` were not saving selected values.

## v0.2.0 (2024-05-24)

- Feature: Add `onBlockRegistration` and `onBlockEdit` filter helpers
- Dev: Set @wordpress packages versions to the ones shipped in WordPress 6.5
- Docs: Suggest using useMemo for useApiFetch

## v0.1.2 (2024-04-1)

- Dev: Fix npm publishing

## v0.1.1 (2024-03-31)

- Dev: Try to fix composer dist URLs

## v0.1.0 (2024-03-31)

First public release.
This is still in development, and breaking changes may occur until version 1.0.0 is released.
