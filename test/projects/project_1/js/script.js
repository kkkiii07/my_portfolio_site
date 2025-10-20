$(function () {
  
  // スムーススクロールアニメーション
  let isAnimating = false;

  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    if (isAnimating) return;
    isAnimating = true;

    const windowWidth = window.innerWidth;
    const isSp = windowWidth < 768;

    const speed = 1000;
    const href = $(this).attr('href');
    const target = $(href == '#' || href == '' ? 'html' : href);
    const position = isSp ? target.offset().top : target.offset().top - 65;

    $('body, html').animate(
      { scrollTop: position },
      {
        duration: speed, easing: 'easeOutCirc', complete: function () {
          isAnimating = false;
        }
      }
    );
  });

  // フロートボタンの表示・非表示
  const $floatBtn = $('.js-float-cv-btn');
  const $target = $('#cv-area');

  $(window).on('scroll', function () {
    const targetOffset = $target.offset().top;
    const viewHeight = $(this).height();
    const scrollY = $(this).scrollTop();

    if (scrollY < targetOffset - viewHeight) {
      $floatBtn.addClass('is-active');
    } else {
      $floatBtn.removeClass('is-active');
    }
  });
});