'use strict';

// 文字アニメーション
$(window).on('scroll load', function () {
    var scrollTop = $(window).scrollTop();
    var appearenceBuffer = 30;
    var windowBottom = scrollTop + $(window).height() - appearenceBuffer;

    $('.js-scrollin:not(.active)').each(function () {
        var offset = $(this).offset().top;
        var height = $(this).outerHeight();
        if (offset + height >= scrollTop && offset <= windowBottom) {
            $(this).addClass('active');
            $(this).closest('.topik_content_title').addClass('active');
        }
    });
});

$(function () {
    const delay = 120;

    // .scrollin-wrapper を対象に
    $('.scrollin-wrapper').each(function () {
        let cumulativeDelay = 0;

        const $lines = $(this).find('.js-scrollin').sort(function (a, b) {
            const aLine = parseInt($(a).attr('class').match(/line(\d+)/)?.[1] || 0);
            const bLine = parseInt($(b).attr('class').match(/line(\d+)/)?.[1] || 0);
            return aLine - bLine;
        });

        $lines.each(function () {
            const $this = $(this);
            const str = $this.text();
            let html = '';

            for (let i = 0; i < str.length; i++) {
                html += '<span style="transition-delay:' + (i * delay + cumulativeDelay) + 'ms;">' + str[i] + '</span>';
            }

            cumulativeDelay += str.length * delay + 120;
            $this.html(html);
        });
    });
});



// ふわっと表示
const targets = document.querySelectorAll('.target');

function callback(entries, obs) {
  console.log(entries); // entriesはIntersectionObserverEntryオブジェクトの配列

  entries.forEach(entry => {
    if (!entry.isIntersecting) { // 監視対象がビューポート内にない場合
      return; // 処理をスキップ
    }
    entry.target.classList.add('appear'); // ビューポート内に入った場合、'appear'クラスを追加
    obs.unobserve(entry.target); // 監視を停止
  });
}

const options = {
  threshold: 0.1, // 10%表示されたときにコールバックを呼び出す
  rootMargin: '0px 0px -100px', // ビューポートの下に100pxのマージンを設定
};

const observer = new IntersectionObserver(callback, options); // IntersectionObserverのインスタンスを作成

targets.forEach(target => {
  observer.observe(target);
});



