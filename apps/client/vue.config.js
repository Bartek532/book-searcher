module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3080",
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
};
