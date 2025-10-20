$(document).ready(function () {
  var $form = $('form#mato_form');

  // 🔹ページ読み込み時に sessionStorage からデータを復元
  var savedData = sessionStorage.getItem('firstFormData');
  if (savedData) {
    JSON.parse(savedData).forEach(({ name, value }) => {
      $(`[name="${name}"]`).val(value);
    });
  }

  $("#startBtn").on("click", function () {
    var selections = [
      { id: "#sl_1", message: "「選択1」：必須項目です。" },
      { id: "#sl_2", message: "「選択2」：必須項目です。" },
      { id: "#sl_3", message: "「選択3」：必須項目です。" },
      { id: "#sl_4", message: "「選択4」：必須項目です。" }
    ];

    $(".err_box_1").hide().find("p").remove();
    let hasError = false;

    selections.forEach(({ id, message }) => {
      if (!$(id).val()) {
        $(".err_box_1").append(`<p>${message}</p>`).show();
        hasError = true;
      }
    });

    if (hasError) {
      $("html, body").animate({ scrollTop: $(".err_box_1").offset().top });
      return false;
    }

    // ✅ バリデーション通過後に storeResult を呼び出す
    storeResult();

    // 🔹 フォームデータ保存
    var formData = $form.serializeArray();

    // 🔹 診断結果を計算
    var diagnosis = analyzeThanks();

    // ✅ セッション保存
    sessionStorage.setItem('firstFormData', JSON.stringify(formData));
    sessionStorage.setItem('thanks_message', diagnosis);

    // 🔽 Googleシート送信用データ作成
    var sendData = {};
    formData.forEach((field) => {
      sendData[field.name] = field.value;
    });
    sendData["診断結果"] = diagnosis.replace(/(<([^>]+)>)/ig, "").replace("※１", "");

    // 🔽 GoogleフォームのWebApp URL
    const url = 'https://script.google.com/macros/s/AKfycbwzr1jpe5T1BxCqvKtm1LOLXkbtXdhlckltrj2C4q3ukYeVmwrOi36ZQ1UBHdnRJbqRKg/exec';

    // 🔹 スプレッドシートに送信
    // 🔸 遷移を即時に実行
    var currentParams = window.location.search;
    // ▼納品用
    window.location.href = "/hasan/lp01/question/index.html" + currentParams;
    // ▼ローカル確認用
    // window.location.href = "/dist/hasan/lp01/question/index.html" + currentParams;
  });
});


function analyzeThanks() {

  var ra_2Val = $("#sl_2").val();
  // console.log(ra_2Val); // 期待する値が出力されるか確認
  var ra_3Val = $("#sl_3").val();
  // console.log(ra_3Val); // 期待する値が出力されるか確認
  var ra_4Val = $("#sl_4").val();
  // console.log(ra_4Val); // 期待する値が出力されるか確認


  var str = "";
  var response1 = "<p class='top_text'>あなた様の場合借金を最大</p><p class='price'><span class='money'>○○</span>円</p><br><p>減額</p>できる可能性、<br>もしくは<br><p class='price price_second'>借金総額を<span class='money'>0</span>円</p><br>にできる可能性があります。<p class='kigou'>※１</p>";
  var response2 = "<p class='top_text'>あなた様の場合借金を最大</p><p class='price'><span class='money'>○○</span>円</p><br><p>減額</p>できる可能性があります。<p class='kigou'>※１</p>";
  var response3 = "<p class='top_text'>あなた様の場合</p><p class='price'>借金総額を<span class='money'>0</span>円</p><br>にできる可能性があります。<p class='kigou'>※１</p>";

  switch (ra_4Val) {
    case "20万円以下":
      if (ra_2Val === "支払うことはできている" && ra_3Val === "平成18年以降") {
        str = response2.replace("○○", "91,500");
      } else {
        str = response1.replace("○○", "91,500");
      }
      break;

    case "21~50万円":
      if (ra_2Val === "支払うことはできている" && ra_3Val === "平成18年以降") {
        str = response2.replace("○○", "228,750");
      } else {
        str = response1.replace("○○", "228,750");
      }
      break;

    case "51~150万円":
      if (ra_2Val === "支払うことはできている" && ra_3Val === "平成18年以降") {
        str = response2.replace("○○", "686,250");
      } else {
        str = response1.replace("○○", "686,250");
      }
      break;

    case "151~250万円":
      if (ra_2Val === "支払うことはできている" && ra_3Val === "平成18年以降") {
        str = response2.replace("○○", "1,143,750");
      } else {
        str = response1.replace("○○", "1,143,750");
      }
      break;

    case "251万円以上":

    default: str = response3;
  }
  return str;
}


$(document).ready(function () {

  // セレクトボックスの選択時にstoreResultを呼び出す
  $("select").on("change", function () {
    storeResult();
  });
});


function storeResult() {
  var str = analyzeThanks();
  var resultValue = str.replace(/(<([^>]+)>)/ig, "").replace("※１", "");
  $("#resultCal").val(resultValue);
  // console.log("resultCalの値:", resultValue);

  if (typeof (Storage) !== "undefined") {
    sessionStorage.setItem("thanks_message", str);
  } else {
    alert("予期せぬエラーが発生しました。再度お試しください。");
  }
}