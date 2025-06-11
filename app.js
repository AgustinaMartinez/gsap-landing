gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("hero");
  const ctx = canvas.getContext("2d");
  canvas.width = 1068;
  canvas.height = 600;

  const TOTAL_FRAMES = 65;

  const createURL = (frame) => {
    const id = frame.toString().padStart(4, "0");
    return `https://www.apple.com/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/hero/medium/${id}.png`;
  };

  const images = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
    const img = new Image();
    img.src = createURL(i);
    return img;
  });

  const airpods = { frame: 0 };

  images[0].onload = () => render();

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images[airpods.frame], 0, 0);
  }

  function createScrollAnimations(scrollDuration) {
    const timelines = [];

    // 1. SECCIÓN AIRPODS
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-section",
        pin: true,
        scrub: 0.5,
        start: "top top",
        end: scrollDuration,
      },
    });
    heroTl.to(airpods, {
      frame: TOTAL_FRAMES - 1,
      snap: "frame",
      ease: "none",
      onUpdate: render,
    });
    heroTl.to(".title", { autoAlpha: 0, scale: 0.8 }, "<20%");
    timelines.push(heroTl);

    // 2. SECCIÓN MARVEL
    const marvelTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#marvel-container",
        pin: true,
        scrub: 0.55,
        start: "top top",
        end: scrollDuration,
      },
    });
    marvelTl.from("#marvel-container .grid img", {
      scale: 0.5,
      opacity: 0,
      stagger: 0.1,
      ease: "power2.out",
    });
    marvelTl.to(
      "#marvel-container .grid img",
      { opacity: 0, stagger: 0.05, ease: "power2.in" },
      ">+0.5"
    );
    timelines.push(marvelTl);

    // 3. SECCIÓN TEXT
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#title-section",
        pin: true,
        scrub: 0.5,
        start: "top top",
        end: "+=1500",
      },
    });
    const split = new SplitText(".text", { type: "words" });
    textTl.from(split.words, {
      y: 50,
      filter: "blur(10px)",
      autoAlpha: 0,
      stagger: 0.05,
    });
    textTl.to(
      split.words,
      { y: -50, filter: "blur(10px)", autoAlpha: 0, stagger: 0.05 },
      ">+0.5"
    );
    timelines.push(textTl);

    // 4. SECCIÓN CAJAS
    const boxesTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#boxes-section",
        pin: true,
        scrub: 0.5,
        start: "top top",
        end: scrollDuration,
      },
    });
    boxesTl
      .from(".box.purple", { x: -300, autoAlpha: 0 })
      .from(".box.blue", { y: 100, autoAlpha: 0 }, "<")
      .from(".box.yellow", { x: 300, autoAlpha: 0 }, "<");
    timelines.push(boxesTl);

    return timelines;
  }

  ScrollTrigger.matchMedia({
    "(min-width: 769px)": function (ctx) {
      let timelines;
      ctx.add(() => {
        timelines = createScrollAnimations("+=1000");
      });
      return () => timelines.forEach((tl) => tl.revert());
    },
    "(max-width: 768px)": function (ctx) {
      let timelines;
      ctx.add(() => {
        timelines = createScrollAnimations("+=600");
      });
      return () => timelines.forEach((tl) => tl.revert());
    },
  });
});
