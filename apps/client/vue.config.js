module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target:
          process.env.NODE_ENV === "production"
            ? "https://book-searcher.herokuapp.com"
            : "http://localhost:3080",
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/variables.scss";`,
      },
    },
  },
  pwa: {
    name: "Book Searcher",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "dev/sw.js",
    },
  },
};
