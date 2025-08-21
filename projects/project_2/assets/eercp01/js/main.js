//追従ボタン
const areaElm = document.querySelector(".target-area");
const fixedElm = document.querySelector("#js-fixed");
const options = {
  threshold: 0
};
const onScreen = (entries) => {
  if (entries[0].isIntersecting) {
    fixedElm.classList.add('is-shown');
  }
  else if (!entries[0].isIntersecting) {
    fixedElm.classList.remove('is-shown');
  }
}

const observer = new IntersectionObserver(onScreen, options);
observer.observe(areaElm);

// アコーディオン
$(document).ready(function () {
  $(".accordion-header").on("click", function () {
    var container = $(this).closest(".accordion-container");
    container.toggleClass("open");
    container.find(".accordion-content").stop().slideToggle(300);
  });
});








