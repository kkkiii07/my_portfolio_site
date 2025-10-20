$(function () {
  const swiperInstances = {};
  let swiperInitialized = false;

  $('.question-block').each(function () {
    const $block = $(this);
    const $buttons = $block.find('.btn-group button');
    const $imageItems = $block.find('.image-group img');
    const questionId = $block.data('question');

    $buttons.on('click', function () {
      const choice = $(this).data('choice');

      // ボタン状態切り替え
      $buttons.removeClass('active');
      $(this).addClass('active');

      // 理由テキストを表示
      $block.find('.reason-text').fadeIn();

      // 対応する画像のみ表示
      $imageItems.hide();
      $imageItems.filter('[data-choice="' + choice + '"]').fadeIn();

      // ラベル画像切り替え
      $buttons.each(function () {
        const $btn = $(this);
        const c = $btn.data('choice');
        const $img = $btn.find('.label-icon');
        if ($img.length) {
          $img.attr(
            'src',
            './image/' + c + ($btn.hasClass('active') ? '_active' : '_normal') + '.png'
          );
        }
      });

      // ここがポイント！スライダーは全部表示する
      $('.swiper-wrapper-box').show();

      // Swiper初期化は初回のみ
      if (!swiperInitialized) {
        swiperInitialized = true;
        $('.js-mySwiper').each(function (index, el) {
          const $el = $(el);
          const choice = $el.closest('.swiper-wrapper-box').data('choice');
          if (!swiperInstances[choice]) {
            swiperInstances[choice] = new Swiper(el, {
              loop: true,
              slidesPerView: 1,
              spaceBetween: 0,
              pagination: {
                el: el.querySelector('.swiper-pagination'),
                clickable: true,
              },
              navigation: {
                nextEl: el.querySelector('.swiper-button-next'),
                prevEl: el.querySelector('.swiper-button-prev'),
              },
              autoplay: false,
            });
          }
        });
      }

      // 「次へ」ボタン表示 & 有効化
      const $nextBtn = $('.btn-next[data-target="' + (questionId + 1) + '"]');
      if ($nextBtn.length) {
        $nextBtn.prop('disabled', false).fadeIn();
      }

      // 2問目ならCV表示
      if (questionId === 2) {
        $('#cv-area').fadeIn();
        $('.lp-full-content').fadeIn();
      }
    });
  });

  // 「次へ」ボタンクリック処理
  $('.btn-next').on('click', function () {
    const target = $(this).data('target');
    if (target === 'end') {
      $('#cv-area').fadeIn();
      $('.lp-full-content').fadeIn();
    } else {
      $('.question-block[data-question="' + target + '"]').fadeIn();
    }
    $(this).closest('.next-btn-box').hide();
  });
});
