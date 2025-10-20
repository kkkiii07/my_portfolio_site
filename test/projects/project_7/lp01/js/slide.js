function initSwiper() {
    const isPC = window.matchMedia("(min-width: 768px)").matches; // 768px以上ならPC

    const swiperConfig = {
        slidesPerView: 1,
        spaceBetween: 10,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true,
            dragSize: 100,
        },
    };

    // PC表示なら navigation を追加
    if (isPC) {
        swiperConfig.navigation = {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        };
    }

    return new Swiper(".mySwiper", swiperConfig);
}

let swiper = initSwiper();

// 画面サイズが変わったら再設定
window.addEventListener("resize", () => {
    swiper.destroy(true, true); // Swiperを削除
    swiper = initSwiper(); // 再初期化
});



