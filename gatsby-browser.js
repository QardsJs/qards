const config = require("./static/config/settings");

exports.onInitialClientRender = () => {
  if (!config.performanceMode) {
    require("typeface-roboto");
  }

  require("./src/styles/index.scss");
};