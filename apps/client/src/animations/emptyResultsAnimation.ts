import gsap, { Power2, Power3, Power4 } from "gsap";

export default () => {
  const tl = gsap.timeline();

  tl.from("#sun", {
    duration: 0.3,
    scale: 0,
    transformOrigin: "center center",
  })
    .addLabel("start")
    .from(
      "#holes path",
      {
        duration: 0.4,
        scale: 0,
        transformOrigin: "center center",
        stagger: 0.15,
        ease: Power4.easeOut,
      },
      "start",
    )
    .from(
      "#leafs g",
      {
        duration: 0.4,
        opacity: 0,
        y: -250,
        stagger: 0.15,
        ease: Power4.easeOut,
      },
      "start",
    )
    .from(
      "#trees g",
      {
        duration: 0.4,
        scaleY: 0,
        transformOrigin: "50% 100%",
        ease: Power2.easeInOut,
        stagger: 0.1,
      },
      "start",
    )
    .from("#people g", {
      duration: 0.5,
      opacity: 0,
      x: 50,
      stagger: 0.15,
    })
    .fromTo(
      "#hats path",
      {
        duration: 0.1,
        opacity: 0,
        rotate: "-45deg",
        x: -30,
      },
      {
        rotate: 0,
        opacity: 1,
        x: 0,
        ease: Power3.easeOut,
      },
    )
    .from(".not-found__label", {
      opacity: 0,
      duration: 0.4,
      y: -100,
      ease: Power3.easeIn,
    });
};
