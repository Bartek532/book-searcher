import gsap from "gsap";

export const registerAnimation = () => {
  const tl = gsap.timeline({});

  if (window.innerWidth < 1000) {
    tl.from(".register__label", {
      duration: 0.7,
      opacity: 0,
    })
      .addLabel("form")
      .fromTo(
        ".register__form",
        {
          duration: 0.5,
          opacity: 0,
          y: 200,
          ease: "ease-in",
        },
        {
          opacity: 1,
          y: -90,
        },
      )
      .to(
        ".register__label",
        {
          duration: 0.5,
          y: -105,
        },
        "form",
      );
  } else {
    tl.fromTo(
      ".register__label",
      {
        duration: 0.5,
        x: -150,
        y: -70,
        opacity: 0,
      },
      {
        y: -70,
        opacity: 1,
        x: 0,
      },
    ).fromTo(
      ".register__form",
      {
        duration: 0.5,
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: -50,
        ease: "ease-in",
      },
    );
  }
};
