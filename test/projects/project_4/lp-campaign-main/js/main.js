//lazysizes
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.expand = 1000;

jQuery(function() {

	//  voice_popup
	jQuery('.lp_voice ul.voice_list li').click(function(){
		jQuery('.voice_popup .voice_cnt').hide();
		var active = jQuery(this).attr('class');
		if( active == 'voice_cpt01' ) {
			jQuery('.voice_popup .voice_cnt01').show();
		} else if( active == 'voice_cpt02' ) {
			jQuery('.voice_popup .voice_cnt02').show();
		} else if( active == 'voice_cpt03' ) {
			jQuery('.voice_popup .voice_cnt03').show();
		}
		jQuery('.voice_popup').fadeIn();
	});
	jQuery('.lp_voice .popup-close, .lp_voice .popup_cover').click(function(){
		jQuery(this).parents('.voice_popup').fadeOut();
	});
}); //jQuery(function())

jQuery(window).on('load', function(){
	//swiper
	var swiper = new Swiper('.lp_point01 .swiper', {
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
			nextEl: '.lp_point01 .swiper-next',
			prevEl: '.lp_point01 .swiper-prev',
		},
		slidesPerView: 'auto',
		centeredSlides: true,
		noSwiping: true,
	});

}); //onload

//smoothscroll
jQuery(function(){
	jQuery('a[href^="#"]').click(function(){
		var speed = 500;
		var href= jQuery(this).attr("href");
		var target = jQuery(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		jQuery("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
});