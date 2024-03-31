const resolve = require("path").resolve;
const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
    ...defaultConfig,
    entry: {
        ...defaultConfig.entry(),
        "admin-page": resolve(process.cwd(), "src", "admin-page", "index.js"),
        "admin-page-tabs": resolve(
            process.cwd(),
            "src",
            "admin-page-tabs",
            "index.js",
        ),
        "admin-page-router": resolve(
            process.cwd(),
            "src",
            "admin-page-router",
            "index.js",
        ),
    },
};
