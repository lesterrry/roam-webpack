import './index.scss'

import gsap from 'gsap'

const windowImg = document.getElementById('image-swap');

if (windowImg) {
  const srcs = windowImg ? windowImg.getAttribute('data-images').split(',') : null;

  function changeSrc() {
    const index = Math.floor(gsap.getProperty(this, 'progress') * srcs.length);
    if (index < srcs.length) {
      windowImg.src = srcs[index];
    }
  }

  const animate = () => {
    gsap.to({}, {
      duration: 2,
      onUpdate: changeSrc,
      onComplete: animate
    });
  }

  animate()
}
