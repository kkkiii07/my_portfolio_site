"use strict";

// Swiper 1: 自動再生
const swiperAuto = new Swiper(".swiper-auto", {
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-auto .swiper-pagination",
    clickable: true,
  },
});

// Swiper 2: フェード切替 + ループ + ナビゲーション
const swiperFade = new Swiper(".swiper-fade", {
  effect: "fade",
  loop: true,
  fadeEffect: { crossFade: true },
  navigation: {
    nextEl: ".swiper-fade .swiper-button-next",
    prevEl: ".swiper-fade .swiper-button-prev",
  },
  pagination: {
    el: ".swiper-fade .swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2600,
    disableOnInteraction: false,
  },
  // autoplay: false,
  speed: 1500,
});
