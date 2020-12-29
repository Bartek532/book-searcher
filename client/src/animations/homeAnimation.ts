import gsap from "gsap";

export default () => {
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
};