//lazysizes
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.expand = 1000;

// スライド
jQuery(window).on('load', function () {

	// Swiper
	var swiper = new Swiper('.fv .swiper', {
		loop: true,
		slidesPerView: '1.85',
		centeredSlides: true, // スライドを中央揃え
		speed: 10000, // 滑らかにするための速度設定
		allowTouchMove: true, // タッチ操作を有効に
		autoplay: {
			delay: 0, // 連続動作のために若干の遅延を設定
			disableOnInteraction: false,
		},
		spaceBetween: 24, // スライド間の余白を設定
		loopAdditionalSlides: 2,
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

	// ビューポート上端から500pxの位置でトリガー
	if (rect.top <= 500 && rect.bottom > 0) {
		btn.classList.add('on');
	} else {
		btn.classList.remove('on');
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



















