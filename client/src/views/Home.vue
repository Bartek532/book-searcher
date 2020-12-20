<template>
  <div class="home">
    <div class="up-circle">
      <svg
        width="270"
        height="223"
        viewBox="0 0 270 223"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0)">
          <g filter="url(#filter0_d)">
            <path
              d="M270 0V223C217.185 175.597 222.808 117.035 136.934 112.291C51.0601 107.546 0 0 0 0H270Z"
              fill="url(#paint0_linear)"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d"
            x="-4"
            y="0"
            width="278"
            height="231"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear"
            x1="270"
            y1="-1.03126e-05"
            x2="134.086"
            y2="84.0144"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#5368EA" />
            <stop offset="1" stop-color="#2524E9" />
          </linearGradient>
          <clipPath id="clip0">
            <rect width="270" height="223" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
    <img src="../assets/svgs/logo.svg" alt="logo" class="logo" />
    <div class="logo__name">b<span class="logo__name__blue">oo</span>k</div>
    <div class="logo__subname">searcher</div>
    <SearchInput @search="$emit('default-search', $event)" />
  </div>
</template>

<script lang="ts">
import gsap from "gsap";
import { onMounted } from "vue";
import SearchInput from "../components/inputs/SearchInput.vue";
export default {
  components: {
    SearchInput
  },
  setup() {
    onMounted(() => {
      const tl = gsap.timeline();
      tl.from(".up-circle", 0.4, {
        scale: 0,
        transformOrigin: "100% 0"
      })
        .from(".logo", 0.3, {
          opacity: 0,
          y: -50
        })
        .addLabel("logo")
        .from(".logo__name", 0.3, {
          opacity: 0,
          x: 50
        })
        .from(
          ".logo__subname",
          0.3,
          {
            opacity: 0,
            x: -50
          },
          "logo"
        )
        .from(".search", 0.3, {
          opacity: 0,
          y: 50
        });
    });
  }
};
</script>

<style lang="scss" scoped>
.home {
  min-width: 100vw;
  height: 100vh;
  @include flex;
  flex-flow: column wrap;
  position: relative;
  padding: 0;

  .up-circle {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    margin-top: -8px;
  }

  .logo__name {
    font-weight: 700;
    font-size: 2.9rem;
    margin-top: 20px;
    &__blue {
      color: $main-color;
      font-weight: 700;
      font-size: 2.9rem;
    }
  }

  .logo__subname {
    font-size: 1.56rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 8px;
  }
}

@media all and (min-width: 700px) {
  .logo,
  .logo__name,
  .logo__subname,
  .search {
    transform: scale(1.2);
    margin: 6px 0;
  }

  .logo {
    margin-bottom: 14px;
  }

  .search {
    margin-top: 30px;
  }
  .up-circle {
    display: none;
  }
}
</style>
