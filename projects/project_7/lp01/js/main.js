// パラメーター引継ぎ
var prm;

function retrieveGETqs() {
  var query = window.location.search.substring(1);
  /* 引数がない時は処理しない */
  if (!query) return false;
  return query;
}

$(function () {
  //リンク先を取得
  var target_url = $('.url').attr("href");
  //パラメータを取得
  var str = retrieveGETqs();
  prm = decodeURIComponent(str);
  if (prm) {
    //target_urlに'？'を含む場合
    if (target_url.indexOf('?') != -1) {
      //追加パラメータの先頭文字列を'&'に置換
      $('a.url').attr('href', target_url + '&' + prm);
    } else {
      $('a.url').attr('href', target_url + '?' + prm);
    }
  }
});



// FAQアコーディオン

$(document).ready(function() {
  $(".faq-question").on("click", function() {
    $(this).toggleClass("active"); // 開閉状態を記録
    $(this).next(".faq-answer").slideToggle(); // クリックした答えを開閉
  });
});

// 最下部アコーディオン

$(document).ready(function () {
  // 初期状態
  $('.accordion_text').hide(); // 最初は非表示
  $('.close-btn').hide(); // 閉じるボタンも非表示

  // もっと見るボタンがクリックされた時
  $('.show-more').on('click', function () {
    $(this).addClass('hide'); // 「もっと見る」ボタンを非表示（スペースは維持）
    $('.button_bottom').addClass('hide'); // 追加した要素を非表示
    $('.accordion_text').stop().slideDown(1500).css('display', 'block'); // アコーディオンを開く
    $('.close-btn').fadeIn(); // 閉じるボタンをフェードインで表示
  });

  // 閉じるボタンがクリックされた時
  $('.close-btn').on('click', function () {
    $('.accordion_text').stop().slideUp(400, function () {
      // アコーディオンが閉じた後にスクロール
      $('html, body').animate({
        scrollTop: $('.show-more').offset().top
      }, 300);
    });

    $('.close-btn').fadeOut(); // 閉じるボタンをフェードアウトで隠す
    $('.show-more').removeClass('hide'); // もっと見るボタンを再表示
    $('.button_bottom').removeClass('hide'); // 追加した要素も再表示
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



