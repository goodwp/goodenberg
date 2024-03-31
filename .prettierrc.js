const wordPressConfig = require("@wordpress/prettier-config");

module.exports = {
  ...wordPressConfig,
  useTabs: false,
  bracketSameLine: true,
  singleQuote: false,
};
