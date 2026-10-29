const path = require("path");

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      { pattern: "src/tests/**/*.test.jsx", watched: false }
    ],
    preprocessors: {
      "src/tests/**/*.test.jsx": ["webpack"]
    },
    webpack: {
      mode: "development",
      devtool: "inline-source-map",
      resolve: { extensions: [".js", ".jsx"] },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: { loader: "babel-loader", options: { configFile: path.resolve(__dirname, "babel.config.cjs") } }
          }
        ]
      }
    },
    reporters: ["progress"],
    browsers: ["ChromeHeadlessNoSandbox"],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"]
      }
    },
    singleRun: true,
    restartOnFileChange: false
  });
};