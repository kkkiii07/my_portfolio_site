'use strict';

// 追従バナー
document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries) => {
        for (const e of entries) {
            let btn = document.getElementsByClassName('fix_btn');
            if (e.isIntersecting) {
                btn[0].classList.add('on');
                console.log(entries);
            } else {
                btn[0].classList.remove('on')
            }
        }
    });
    observer.observe(document.getElementById('js-fadeInOut'));
});

// スワイパー
const swiper = new Swiper('.swiper', {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});