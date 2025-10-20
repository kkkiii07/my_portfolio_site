function loadCustomScript(url, callback) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      };
    };
  } else {
    script.onload = function () {
      callback();
    };
  };
  document.getElementsByTagName('head')[0].appendChild(script);
}
$.fn.serializeObject = function () {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function () {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};


$(document).ready(function () {
  $("#source_url").val(window.location.href);

  $('.item_3 .btn_next').on('click', function (event) {
    event.preventDefault(); // フォーム送信を防止

    var ipt_2 = $('#phone').val();
    var ipt_3 = $('#name').val();
    var sl_6 = $('#sl_6').val();

    if (ipt_2 && ipt_3 && sl_6) {

      // ✅ 第二ページの送信直前に analyzeThanks を再計算
      var resultText = sessionStorage.getItem("thanks_message"); // 儲かる例：<p class='...'>〜</p>
      if (resultText) {
        var resultValue = resultText.replace(/(<([^>]+)>)/ig, "").replace("※１", "");
        $('#resultCal').val(resultValue);
      }

      $('.item_3 .btn_next').html("計算中..").attr("disabled", "disabled").css('opacity', '.8');
      $('.err_box_3').css('display', 'none');

      var $form = $('form#mato_form');
      var url = 'https://script.google.com/macros/s/AKfycbwzr1jpe5T1BxCqvKtm1LOLXkbtXdhlckltrj2C4q3ukYeVmwrOi36ZQ1UBHdnRJbqRKg/exec';

      // 電話番号の空白削除
      $("#phone").val("'" + $("#phone").val().replaceAll(" ", ""));

      // 前のページのデータ取得
      var firstFormData = sessionStorage.getItem('firstFormData');
      firstFormData = firstFormData ? JSON.parse(firstFormData) : [];

      // 現在のフォームのデータ取得
      var secondFormData = $form.serializeArray();

      // 両方のデータを結合
      var combinedData = firstFormData.concat(secondFormData);

      // 送信データをオブジェクト化
      var sendData = {};
      $.each(combinedData, function (index, field) {
        sendData[field.name] = field.value;
      });

      // フォーム送信
      $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: sendData,
        success: function (data, status, xhr) {
          $('.item_3').css({ 'opacity': '0', 'height': '0' });
          $('.item_3 .btn_next').html("次へ").removeAttr("disabled");
          window.location.replace("thanks.html");
        },
        error: function () {
          $('.err_box_3').css('display', 'block');
        }
      });

    } else {
      $('.err_box_3').css('display', 'block').empty();
      if (!ipt_2) $('.err_box_3').append('<p>「電話番号」：必須項目です。</p>');
      if (!ipt_3) $('.err_box_3').append('<p>「お名前」：必須項目です。</p>');
      if (!sl_6) $('.err_box_3').append('<p>「雇用形態」：必須項目です。</p>');

      var st = $('.err_box_3').offset().top;
      $('html, body').animate({ scrollTop: st });
    }
  });
});



// ------------------------------------------------

// コンソール確認用（納品する際は削除）
function storeResult() {
  var str = analyzeThanks();
  var resultValue = str.replace(/(<([^>]+)>)/ig, "").replace("※１", "");
  $("#resultCal").val(resultValue);
  console.log("resultCalの値:", resultValue);

  if (typeof (Storage) !== "undefined") {
    sessionStorage.setItem("thanks_message", str);
  } else {
    alert("予期せぬエラーが発生しました。再度お試しください。");
  }
}

// コンソール確認用（納品する際は削除）
$(document).ready(function () {
  $("input[type='radio']").on("change", function () {
    if ($(this)) {
      console.log("選択されています");
    } else {
      console.log("選択されていません");
    }
  });
});
