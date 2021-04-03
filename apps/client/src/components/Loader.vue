<template>
  <div class="page-loader">
    <div class="loader">
      <div class="book">
        <figure class="book__page"></figure>
        <figure class="book__page"></figure>
        <figure class="book__page"></figure>
      </div>

      <span class="loader__label">Czytanie</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-loader {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
.loader {
  @include flex;
  flex-flow: column wrap;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .book {
    border: 4px solid var(--blue-100);
    width: 60px;
    height: 45px;
    position: relative;
    perspective: 150px;

    &__page {
      display: block;
      width: 30px;
      height: 45px;
      border: 4px solid var(--blue-100);
      border-left: 1px solid var(--blue-100);
      margin: 0;
      position: absolute;
      right: -4px;
      top: -4px;
      overflow: hidden;
      background: var(--blue-100);
      transform-style: preserve-3d;
      -webkit-transform-origin: left center;
      transform-origin: left center;

      &:nth-child(1) {
        -webkit-animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 1.6s
          infinite;
        animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 1.6s infinite;
      }

      &:nth-child(2) {
        -webkit-animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 1.45s
          infinite;
        animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 1.45s infinite;
      }

      &:nth-child(3) {
        -webkit-animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 1.2s
          infinite;
        animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 1.2s infinite;
      }
    }
  }

  &__label {
    color: var(--blue-100);
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-size: 20px;
    position: relative;
    margin-top: 12px;
    font-weight: 500;

    &:after {
      position: absolute;
      content: "";
      -webkit-animation: Dots 2s cubic-bezier(0, 0.39, 1, 0.68) infinite;
      animation: Dots 2s cubic-bezier(0, 0.39, 1, 0.68) infinite;
    }
  }
}

@-webkit-keyframes pageTurn {
  0% {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  20% {
    background: var(--white-100);
  }
  40% {
    background: var(--white-100);
    -webkit-transform: rotateY(-180deg);
    transform: rotateY(-180deg);
  }
  100% {
    background: var(--white-100);
    -webkit-transform: rotateY(-180deg);
    transform: rotateY(-180deg);
  }
}

@keyframes pageTurn {
  0% {
    transform: rotateY(0deg);
  }
  20% {
    background: var(--white-100);
  }
  40% {
    background: var(--blue-100);
    transform: rotateY(-180deg);
  }
  100% {
    background: var(--white-100);
    transform: rotateY(-180deg);
  }
}

@-webkit-keyframes Dots {
  0% {
    content: "";
  }
  33% {
    content: ".";
  }
  66% {
    content: "..";
  }
  100% {
    content: "...";
  }
}

@keyframes Dots {
  0% {
    content: "";
  }
  33% {
    content: ".";
  }
  66% {
    content: "..";
  }
  100% {
    content: "...";
  }
}
</style>
