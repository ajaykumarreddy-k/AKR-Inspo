html
<div class="spacer">
  scroll down
</div>
<div class="main">
  <div class="container initial">
    <div class="box"></div>
  </div>
  <div class="container second">
    <div class="marker"></div>
  </div>
  <div class="container third">
    <div class="marker"></div>
  </div>
</div>

<div class="spacer final"></div>
css
body {
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.05) 2px,
      transparent 2px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 2px, transparent 2px),
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
  background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.spacer {
  width: 100%;
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main {
  position: relative;
  height: 100vh;
  min-height: 800px;
}

.container {
  position: absolute;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed var(--color-surface50);
  border-radius: 10px;
}

.initial {
  left: 60%;
  top: 10%;
}

.box {
  width: 100px;
  height: 100px;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  background-image: url("https://assets.codepen.io/16327/circle.png");
}

.second {
  left: 10%;
  top: 50%;
}

.marker {
  border-radius: 10px;
}

.second .marker {
  width: 100px;
  height: 100px;
}

.third {
  right: 10%;
  bottom: 3rem;
}

.third .marker {
  width: 100px;
  height: 100px;
}
js
console.clear();

gsap.registerPlugin(Flip, ScrollTrigger);

let flipCtx;

const createTimeline = () => {
  flipCtx && flipCtx.revert();

  flipCtx = gsap.context(() => {
    const secondState = Flip.getState(".second .marker");
    const thirdState = Flip.getState(".third .marker");
    const flipConfig = {
      ease: "none",
      duration: 1
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container.initial",
        start: "clamp(top center)",
        endTrigger: ".final",
        end: "clamp(top center)",
        scrub: 1
        // markers: true
      }
    });

    tl.add(Flip.fit(".box", secondState, flipConfig)).add(
      Flip.fit(".box", thirdState, flipConfig),
      "+=0.5"
    );
  });
};

createTimeline();

window.addEventListener("resize", createTimeline);

