//lazysizes
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.expand = 1000;

// スライド
jQuery(window).on('load', function () {

	// Swiper
	var swiper = new Swiper('.section02 .swiper', {
		loop: false, // 無限ループを無効化
		speed: 500,
		pagination: {
			el: '.section02 .swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.section02 .swiper-button-next',
			prevEl: '.section02 .swiper-button-prev',
		},
		slidesPerView: 'auto',
		centeredSlides: true,
		noSwiping: true,
		on: {
			init: function () {
				// 初期化時にボタンの状態を確認
				const prevButton = document.querySelector('.section02 .swiper-button-prev');
				prevButton.style.display = 'none'; // 最初のスライドでは完全非表示
			},
			slideChange: function () {
				// 現在のスライドインデックスを取得
				const activeIndex = this.activeIndex;
				const totalSlides = this.slides.length;
	
				// ボタン要素を取得
				const nextButton = document.querySelector('.section02 .swiper-button-next');
				const prevButton = document.querySelector('.section02 .swiper-button-prev');
	
				// ボタンの表示/非表示を切り替え
				if (activeIndex === 0) {
					prevButton.style.display = 'none'; // 最初のスライドでは完全非表示
				} else {
					prevButton.style.display = ''; // それ以外は表示
				}
	
				if (activeIndex === totalSlides - 1) {
					nextButton.style.display = 'none'; // 最後のスライドでは完全非表示
				} else {
					nextButton.style.display = ''; // それ以外は表示
				}
			}
		}
	});
});

//smoothscroll
jQuery(function () {
	jQuery('a[href^="#"]').click(function () {
		var speed = 500;
		var href = jQuery(this).attr("href");
		var target = jQuery(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		jQuery("html, body").animate({ scrollTop: position }, speed, "swing");
		return false;
	});
});

// 追従バナー

document.addEventListener('scroll', function () {
	const target = document.querySelector('#js-fadeInOut');
	const btn = document.querySelector('.button_fixed');
	const rect = target.getBoundingClientRect();
	const windowWidth = window.innerWidth;
	const isMobile = windowWidth <= 750 || /iPhone|Android.+Mobile/.test(navigator.userAgent);

	if (isMobile) {
		// スマホの時の挙動
		if (rect.top <= 1000 && rect.bottom >= 0) {
			btn.classList.add('on');
		} else {
			btn.classList.remove('on');
		}
	} else {
		// PCやタブレットの時の挙動
		if (rect.top <= 2000 && rect.bottom >= 0) {
			btn.classList.add('on');
		} else {
			btn.classList.remove('on');
		}
	}
});



// アコーディオン
$(document).ready(function () {
	// もっと見るボタンがクリックされた時
	$('#open-btn').on('click', function () {
		// 「もっと見る」ボタンを非表示にする
		$(this).addClass('hide');

		// アコーディオンを開く
		$('#accordion').stop().slideDown(1500);

		// 「閉じるマーク」の表示
		$('#close-btn').show(); // 閉じるマークを表示
	});

	// 閉じるマークがクリックされた時
	$('#close-btn').on('click', function () {

		// アコーディオンを閉じる
		$('#accordion').stop().slideUp(400);

		// 元の「もっと見る」位置までスクロール
		$('html, body').animate({
			scrollTop: $('.accordion_area').offset().top
		}, 0);

		// 「閉じるマーク」を隠す
		$('#close-btn').hide(); // 閉じるマークを隠す

		// 「もっと見る」ボタンを再表示
		$('#open-btn').removeClass('hide').addClass('show');
	});
});



















