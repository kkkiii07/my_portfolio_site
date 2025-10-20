"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector('.video-wrapper');
  const thumb = wrapper.querySelector('.video-thumb');
  const playerContainer = wrapper.querySelector('.video-player');

  function playVideo() {
    thumb.style.display = 'none';
    playerContainer.innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/BRrkPIO5c9M?autoplay=1&mute=1" 
        frameborder="0" 
        allow="autoplay; encrypted-media" 
        allowfullscreen
        style="width: 100%; height: 100%;">
      </iframe>
    `;
    playerContainer.style.display = 'block';
  }

  wrapper.addEventListener('pointerdown', playVideo);
});
