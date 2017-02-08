module.exports = {
  cache: {
    cacheId: "react-material-sample",
    runtimeCaching: [{
      handler: "fastest",
      urlPattern: "\/$"
    }],
    staticFileGlobs: ['dist/**/*']
  },
  manifest: {
    background: "#FFFFFF",
    title: "react-material-sample",
    short_name: "PWA",
    theme_color: "#FFFFFF"
  }
};
