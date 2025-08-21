'use strict';

const targets = document.querySelectorAll('.target'); // すべての<img>要素を選択

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
  threshold: 0.2, // 20%表示されたときにコールバックを呼び出す
  rootMargin: '0px 0px -100px', // ビューポートの下に100pxのマージンを設定
};

const observer = new IntersectionObserver(callback, options); // IntersectionObserverのインスタンスを作成

targets.forEach(target => {
  observer.observe(target); // 各<img>要素を監視
});




