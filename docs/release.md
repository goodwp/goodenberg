# Release Process

1. Update version in `package.json`
2. Add changelog to `CHANGELOG.md`
3. Push to origin/main
4. Create a new release + tag on GitHub. Add the changelog as release notes
5. GitHub actions will publish to NPM and trigger composer archive building for packagist.