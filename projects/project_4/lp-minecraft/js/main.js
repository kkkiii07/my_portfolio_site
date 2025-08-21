//lazysizes
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.expand = 1000;

// スライド
jQuery(window).on('load', function () {
	// Swiper 1
	var swiper1 = new Swiper('.lp_feature .swiper', {
		loop: true,
		speed: 500,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.lp_feature .swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.lp_feature .swiper-button-next',
			prevEl: '.lp_feature .swiper-button-prev',
		},
		slidesPerView: 1.2,
		centeredSlides: true,
		noSwiping: true,
	});

	// Swiper 2
	var swiper2 = new Swiper('.lp_next .swiper', {
		loop: true,
		speed: 500,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: '.lp_next .swiper-button-next',
			prevEl: '.lp_next .swiper-button-prev',
		},
		slidesPerView: 1.45,
		centeredSlides: true,
		noSwiping: true,
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

jQuery(function () {
	// アコーディオン
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

	//accordion
	$('.accordion .accordion-label').click(function () {
		$(this).next('.accordion-content').slideToggle();
		$(this).find(".accordion-content").toggleClass('open');
		$(this).find(".icon--accordion").toggleClass('open');
	});


	// video
	let video = document.getElementsByClassName('js-video');

	const videoObserver = new IntersectionObserver((entries) => {
		for (const e of entries) {
			if (e.isIntersecting) {
				e.target.play();
			} else {
				e.target.pause();
			}
		}
	});
	videoObserver.observe(video[0]);

	// rotate
	let rotateTarget = document.getElementsByClassName('js-rotateTarget');
	const maxRotation = 720;

	const rotateObserver = new IntersectionObserver((entries) => {
		for (const e of entries) {
			if (e.isIntersecting) {
				const boundOnScroll = onScroll.bind(null, e.target);
				e.target.boundOnScroll = boundOnScroll;
				window.addEventListener('scroll', boundOnScroll);
			} else {
				if (e.target.boundOnScroll) {
					window.removeEventListener('scroll', e.target.boundOnScroll);
				}
			}
		}
	});

	// Observe all rotate targets
	for (let i = 0; i < rotateTarget.length; i++) {
		rotateObserver.observe(rotateTarget[i]);
	}

	function onScroll(target) {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		const viewportHeight = window.innerHeight;
		const elementTop = target.getBoundingClientRect().top + scrollTop;
		const scrollFraction = (scrollTop - elementTop + viewportHeight) / viewportHeight;
		const rotation = scrollFraction * maxRotation; // maxRotation
		target.style.transform = `rotate(${rotation}deg)`;
	}
});


