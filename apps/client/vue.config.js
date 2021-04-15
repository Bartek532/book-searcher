module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target:
          process.env.NODE_ENV === "production"
            ? "https://backend-book-searcher.herokuapp.com"
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
};
