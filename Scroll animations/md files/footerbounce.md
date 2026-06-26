html 

<p>scroll down</p>
<div class="footer">
  <svg preserveAspectRatio="none" id="footer-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2278 683">
    <defs>
      <linearGradient id="grad-1" x1="0" y1="0" x2="2278" y2="683" gradientUnits="userSpaceOnUse">
        <stop offset="0.2" stop-color="#fec5fb"></stop>
        <stop offset="0.8" stop-color="#00bae2"></stop>
      </linearGradient>
    </defs>
    <path class="footer-svg" id="bouncy-path" fill="url(#grad-1)" d="M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z"/>
  </svg>
</div>
css 
html {
    overscroll-behavior: none;
}

body {
  height: 250vh;
  position: relative;
  margin: 0;
  background-color: #0e100f;
}

p {
  position: absolute;
  top: 40vh;
  color: #fffce1;
  text-align: center;
  width: 100%;
}

.footer {
  position: absolute;
  width: 100%;
  bottom: 0;
}

.footer:after {
  content: '';
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-blend-mode: color-dodge;
  background-image: url("https://assets.codepen.io/16327/noise.png");
}

#footer-img {
	height: 100%;
	width: 100%;
	display: block;
	overflow: visible;
}

#center{
	visibility: hidden;
}
js
gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

const down = 'M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z';
const center = 'M0-0.3C0-0.3,464,0,1139,0s1139-0.3,1139-0.3V683H0V-0.3z';

ScrollTrigger.create({
  trigger: '.footer',
  start: 'top bottom',
  toggleActions: 'play pause resume reverse',
  onEnter: self => {
    const velocity = self.getVelocity();
    const variation = velocity / 10000;

    gsap.fromTo('#bouncy-path', {
      morphSVG: down
    }, {
      duration: 2, 
      morphSVG: center, 
      ease: `elastic.out(${1 + variation}, ${1 - variation})`, 
      overwrite: 'true'
    });
  }
});

