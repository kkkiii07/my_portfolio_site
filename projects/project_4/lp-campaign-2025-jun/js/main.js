//lazysizes
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.expand = 1000;

// スライド
jQuery(window).on('load', function () {
	// Swiper 1
	var swiper1 = new Swiper('.lp_point01 .swiper', {
		loop: true,
		speed: 500,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.lp_point01 .swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.lp_point01 .swiper-button-next',
			prevEl: '.lp_point01 .swiper-button-prev',
		},
		slidesPerView: 'auto',
		centeredSlides: true,
		noSwiping: true,
	});

	// Swiper 2
	var swiper2 = new Swiper('.lp_voice .swiper', {
		loop: true,
		slidesPerView: '1',
		speed: 15000, // 滑らかにするための速度設定
		allowTouchMove: true, // タッチ操作を有効に
		autoplay: {
			delay: 0, // 連続動作のために若干の遅延を設定
			disableOnInteraction: false,
		},
		freeMode: true,
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
document.addEventListener('DOMContentLoaded', function () {
	const observer = new IntersectionObserver((entries) => {
		for (const e of entries) {
			let btn = document.getElementsByClassName('button_fixed');
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

// モーダル
window.onload = function () {
	// モーダル1とマスクの要素を取得
	const open1 = document.querySelector('#js-open1');
	const close1 = document.querySelector('#js-close1');
	const modal1 = document.querySelector('#js-modal1');

	// モーダル2の要素を取得
	const open2 = document.querySelector('#js-open2');
	const close2 = document.querySelector('#js-close2');
	const modal2 = document.querySelector('#js-modal2');

	// 共通のマスク要素を取得
	const mask = document.querySelector('#js-mask');

	// モーダルを開く処理（モーダル1）
	const openModal1 = () => {
		modal1.classList.remove('hidden');
		mask.classList.remove('hidden');
		close1.classList.remove('hidden');

		// スクロールを無効化
		document.body.style.overflow = 'hidden';
		document.documentElement.style.overflow = 'hidden';
	};

	// モーダルを開く処理（モーダル2）
	const openModal2 = () => {
		modal2.classList.remove('hidden');
		mask.classList.remove('hidden');
		close2.classList.remove('hidden');

		// スクロールを無効化
		document.body.style.overflow = 'hidden';
		document.documentElement.style.overflow = 'hidden';
	};

	// open ボタンにイベントリスナーを追加（モーダル1）
	open1.addEventListener('click', openModal1);
	open1.addEventListener('touchstart', (e) => {
		e.preventDefault();
		openModal1();
	});

	// open ボタンにイベントリスナーを追加（モーダル2）
	open2.addEventListener('click', openModal2);
	open2.addEventListener('touchstart', (e) => {
		e.preventDefault();
		openModal2();
	});

	// close ボタンにイベントリスナーを追加（モーダル1）
	const closeModal1 = () => {
		modal1.classList.add('hidden');
		mask.classList.add('hidden');
		close1.classList.add('hidden');

		// スクロールを有効化
		document.body.style.overflow = '';
		document.documentElement.style.overflow = '';
	};

	close1.addEventListener('click', closeModal1);
	close1.addEventListener('touchstart', (e) => {
		e.preventDefault();
		closeModal1();
	});

	// close ボタンにイベントリスナーを追加（モーダル2）
	const closeModal2 = () => {
		modal2.classList.add('hidden');
		mask.classList.add('hidden');
		close2.classList.add('hidden');

		// スクロールを有効化
		document.body.style.overflow = '';
		document.documentElement.style.overflow = '';
	};

	close2.addEventListener('click', closeModal2);
	close2.addEventListener('touchstart', (e) => {
		e.preventDefault();
		closeModal2();
	});

	// マスクをクリックしたときの処理（共通）
	mask.addEventListener('click', function () {
		if (!modal1.classList.contains('hidden')) {
			closeModal1();
		} else if (!modal2.classList.contains('hidden')) {
			closeModal2();
		}
	});

	mask.addEventListener('touchstart', function () {
		if (!modal1.classList.contains('hidden')) {
			closeModal1();
		} else if (!modal2.classList.contains('hidden')) {
			closeModal2();
		}
	});

	document.getElementById('js-open1').addEventListener('click', function () {
		document.body.classList.add('modal-open');
	});

	document.getElementById('js-close1').addEventListener('click', function () {
		document.body.classList.remove('modal-open');
	});

	// モーダルのz-indexを設定する関数
	function setModalZIndex(modalToShow, modalToHide) {
		const showModal = document.querySelector(modalToShow);
		if (showModal) {
			showModal.style.zIndex = '1600';
		}

		const hideModal = document.querySelector(modalToHide);
		if (hideModal) {
			hideModal.style.zIndex = ''; // z-indexを削除
		}
	}

	// ボタンのクリックイベントとタッチイベントを設定
	document.getElementById('js-open1').addEventListener('click', function () {
		setModalZIndex('#js-modal1', '#js-modal2');
	});
	document.getElementById('js-open1').addEventListener('touchstart', function () {
		setModalZIndex('#js-modal1', '#js-modal2');
	});

	document.getElementById('js-open2').addEventListener('click', function () {
		setModalZIndex('#js-modal2', '#js-modal1');
	});
	document.getElementById('js-open2').addEventListener('touchstart', function () {
		setModalZIndex('#js-modal2', '#js-modal1');
	});
};


// アコーディオン
jQuery(function () {
    $(".area dt").on("click", function () {
        const $accordionContent = $(this).siblings("dd");

        // アコーディオンの開閉
        $accordionContent.slideToggle(500, function () {
            // アコーディオン全体の高さに合わせてCSS変数を更新
            const height = $(this).parent().height();
            $(this).parent().css("--accordion-height", height + "px");
        });

        // `dt`要素に `open` クラスをトグル
        $(this).toggleClass("open");

        // `.dt_right`要素に `list-show` クラスをトグル
        $(this).find('.dt_right').toggleClass('list-show');
    });
});



















