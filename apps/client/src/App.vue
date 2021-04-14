<template>
  <div class="wrapper">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  setup() {
    const router = useRouter();
    router.afterEach((to) => {
      document.title = to.meta.title
        ? to.meta.title + " · Book searcher "
        : "Book searcher";
    });
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;

  &::selection {
    background-color: var(--orange-100);
    color: var(--white-100);
  }
}

html {
  scroll-behavior: smooth;
}

body {
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  @include flex;
}

.wrapper {
  position: relative;
  width: 100vw;
  max-width: 1200px;
  padding-bottom: 85px;
  @include flex;
  min-height: 100vh;
}

a {
  text-decoration: none;
  color: var(--black-100);
}

input[type="search"]::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}
input[type="search"]::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}

/*
  Improved screen reader only CSS class
  @author Gaël Poupard
    @note Based on Yahoo!'s technique
    @author Thierry Koblentz
    @see https://developer.yahoo.com/blogs/ydn/clip-hidden-content-better-accessibility-53456.html
  * 1.
    @note `clip` is deprecated but works everywhere
    @see https://developer.mozilla.org/en-US/docs/Web/CSS/clip
  * 2.
    @note `clip-path` is the future-proof version, but not very well supported yet
    @see https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path
    @see http://caniuse.com/#search=clip-path
    @author Yvain Liechti
    @see https://twitter.com/ryuran78/status/778943389819604992
  * 3.
    @note preventing text to be condensed
    author J. Renée Beach
    @see https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe
    @note Drupal 8 goes with word-wrap: normal instead
    @see https://www.drupal.org/node/2045151
    @see http://cgit.drupalcode.org/drupal/commit/?id=5b847ea
  * 4.
    @note !important is important
    @note Obviously you wanna hide something
    @author Harry Roberts
    @see https://csswizardry.com/2016/05/the-importance-of-important/
*/

.sr-only {
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important; /* 2 */
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important; /* 3 */
}

/*
  Use in conjunction with .sr-only to only display content when it's focused.
  @note Useful for skip links 
  @see http://www.w3.org/TR/2013/NOTE-WCAG20-TECHS-20130905/G1
  @note Based on a HTML5 Boilerplate technique, included in Bootstrap
  @note Fixed a bug with position: static on iOS 10.0.2 + VoiceOver
    @author Sylvain Pigeard
    @see https://github.com/twbs/bootstrap/issues/20732
*/
.sr-only-focusable:focus,
.sr-only-focusable:active {
  clip: auto !important;
  -webkit-clip-path: none !important;
  clip-path: none !important;
  height: auto !important;
  margin: auto !important;
  overflow: visible !important;
  width: auto !important;
  white-space: normal !important;
}

@media all and (min-width: 700px) {
  .wrapper {
    padding: 80px 0 50px 0;
  }
}
</style>
