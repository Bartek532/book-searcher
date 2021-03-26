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
        additionalData: `@import "@/assets/styles/variables.scss";`,
      },
    },
  },
};
