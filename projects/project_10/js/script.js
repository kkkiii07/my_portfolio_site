"use strict";

//-----------------------------------------------------------------------------
$(function () {
    $(".header_trigger").click(function () {
        $(this).toggleClass("active");
        $(".gnav_container").toggleClass("active");
        $("body").toggleClass("active");
    });
    $(".gnav_link").click(function () {
        $(".header_trigger").toggleClass("active");
        $(".gnav_container").toggleClass("active");
        $("body").toggleClass("active");
    });
});



//ページトップ-----------------------------------------------------------------------------
$(function () {
    var btn = $('.pagetop');

    $(window).on('load scroll', function () {
        if ($(this).scrollTop() > 500) {
            btn.addClass('active');
        } else {
            btn.removeClass('active');
        }
    });
    btn.on('click', function () {
        $('body,html').animate({
            scrollTop: 0
        });
    });
});


//-----------------------------------------------------------------------------
$(function () {
    var btn = $('.floating');

    $(window).on('load scroll', function () {
        if ($(this).scrollTop() > 500) {
            btn.addClass('active');
        } else {
            btn.removeClass('active');
        }
    });
});


//モーダル-----------------------------------------------------------------------------
$(function () {
    var $modal = $('.modal');
    var $inner = $('.modal_inner');
    var $btn = $('.modalBtn');
    var $close = $('.modalClose');

    var $win = $(window);
    var $wrapper = $('.modal_wrapper');
    var scrollPosition;
    var scrollPositionLocked;

    // スクロール位置を取得
    $win.on('scroll load', function (event) {
        scrollPosition = $win.scrollTop();
    });

    // モーダルを開く処理
    $btn.on('click', function (event) {
        event.preventDefault();
        var _modalIndex = $(this).attr('data-modalIndex') || null;
        // モーダル以外を固定
        scrollPositionLocked = scrollPosition;
        $wrapper.addClass('is-locked');
        $("body").addClass('is-locked');
        $wrapper.css({ top: -scrollPosition });
        if (_modalIndex) {
            $modal.filter('[data-modalIndex="' + _modalIndex + '"]').addClass('is-active');
        } else {
            $modal.addClass('is-active');
        }
    });

    // モーダルを閉じる処理
    $close.add($modal).on('click', function (event) {
        event.preventDefault();
        // モーダル以外を固定解除
        $wrapper.removeClass('is-locked');
        $win.scrollTop(scrollPositionLocked);
        $modal.removeClass('is-active');
        $("body").removeClass('is-locked');
    });


    // コンテンツクリック時に閉じないようにする処理
    $inner.on('click', function (event) {
        event.stopPropagation();
    });

    $('.md_Anchor').on('click', function () {
        $('.modal').removeClass('is-active');
        $("body").removeClass('is-locked');
        var speed = 0;
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $('body,html').animate({ scrollTop: position }, speed, 'swing');
        return false;
    });

});



//-----------------------------------------------------------------------------

/*! smooth-scroll v16.1.0 | (c) 2019 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
!(function (e, t) { "function" == typeof define && define.amd ? define([], (function () { return t(e) })) : "object" == typeof exports ? module.exports = t(e) : e.SmoothScroll = t(e) })("undefined" != typeof global ? global : "undefined" != typeof window ? window : this, (function (C) { "use strict"; var L = { ignore: "[data-scroll-ignore]", header: null, topOnEmptyHash: !0, speed: 500, speedAsDuration: !1, durationMax: null, durationMin: null, clip: !0, offset: 0, easing: "easeInOutCubic", customEasing: null, updateURL: !0, popstate: !0, emitEvents: !0 }, H = function () { var n = {}; return Array.prototype.forEach.call(arguments, (function (e) { for (var t in e) { if (!e.hasOwnProperty(t)) return; n[t] = e[t] } })), n }, r = function (e) { "#" === e.charAt(0) && (e = e.substr(1)); for (var t, n = String(e), o = n.length, a = -1, r = "", i = n.charCodeAt(0); ++a < o;) { if (0 === (t = n.charCodeAt(a))) throw new InvalidCharacterError("Invalid character: the input contains U+0000."); 1 <= t && t <= 31 || 127 == t || 0 === a && 48 <= t && t <= 57 || 1 === a && 48 <= t && t <= 57 && 45 === i ? r += "\\" + t.toString(16) + " " : r += 128 <= t || 45 === t || 95 === t || 48 <= t && t <= 57 || 65 <= t && t <= 90 || 97 <= t && t <= 122 ? n.charAt(a) : "\\" + n.charAt(a) } return "#" + r }, q = function () { return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) }, x = function (e) { return e ? (t = e, parseInt(C.getComputedStyle(t).height, 10) + e.offsetTop) : 0; var t }, Q = function (e, t, n, o) { if (t.emitEvents && "function" == typeof C.CustomEvent) { var a = new CustomEvent(e, { bubbles: !0, detail: { anchor: n, toggle: o } }); document.dispatchEvent(a) } }; return function (o, e) { var M, a, I, A, w = {}; w.cancelScroll = function (e) { cancelAnimationFrame(A), A = null, e || Q("scrollCancel", M) }, w.animateScroll = function (i, s, e) { w.cancelScroll(); var c = H(M || L, e || {}), u = "[object Number]" === Object.prototype.toString.call(i), t = u || !i.tagName ? null : i; if (u || t) { var l = C.pageYOffset; c.header && !I && (I = document.querySelector(c.header)); var n, o, a, d, r, f, m, h, p = x(I), g = u ? i : (function (e, t, n, o) { var a = 0; if (e.offsetParent) for (; a += e.offsetTop, e = e.offsetParent;); return a = Math.max(a - t - n, 0), o && (a = Math.min(a, q() - C.innerHeight)), a })(t, p, parseInt("function" == typeof c.offset ? c.offset(i, s) : c.offset, 10), c.clip), y = g - l, v = q(), S = 0, E = (n = y, a = (o = c).speedAsDuration ? o.speed : Math.abs(n / 1e3 * o.speed), o.durationMax && a > o.durationMax ? o.durationMax : o.durationMin && a < o.durationMin ? o.durationMin : parseInt(a, 10)), b = function (e, t) { var n, o, a, r = C.pageYOffset; if (e == t || r == t || (l < t && C.innerHeight + r) >= v) return w.cancelScroll(!0), o = t, a = u, 0 === (n = i) && document.body.focus(), a || (n.focus(), document.activeElement !== n && (n.setAttribute("tabindex", "-1"), n.focus(), n.style.outline = "none"), C.scrollTo(0, o)), Q("scrollStop", c, i, s), !(A = d = null) }, O = function (e) { var t, n, o; d || (d = e), S += e - d, f = l + y * (n = r = 1 < (r = 0 === E ? 0 : S / E) ? 1 : r, "easeInQuad" === (t = c).easing && (o = n * n), "easeOutQuad" === t.easing && (o = n * (2 - n)), "easeInOutQuad" === t.easing && (o = n < .5 ? 2 * n * n : (4 - 2 * n) * n - 1), "easeInCubic" === t.easing && (o = n * n * n), "easeOutCubic" === t.easing && (o = --n * n * n + 1), "easeInOutCubic" === t.easing && (o = n < .5 ? 4 * n * n * n : (n - 1) * (2 * n - 2) * (2 * n - 2) + 1), "easeInQuart" === t.easing && (o = n * n * n * n), "easeOutQuart" === t.easing && (o = 1 - --n * n * n * n), "easeInOutQuart" === t.easing && (o = n < .5 ? 8 * n * n * n * n : 1 - 8 * --n * n * n * n), "easeInQuint" === t.easing && (o = n * n * n * n * n), "easeOutQuint" === t.easing && (o = 1 + --n * n * n * n * n), "easeInOutQuint" === t.easing && (o = n < .5 ? 16 * n * n * n * n * n : 1 + 16 * --n * n * n * n * n), t.customEasing && (o = t.customEasing(n)), o || n), C.scrollTo(0, Math.floor(f)), b(f, g) || (A = C.requestAnimationFrame(O), d = e) }; 0 === C.pageYOffset && C.scrollTo(0, 0), m = i, h = c, u || history.pushState && h.updateURL && history.pushState({ smoothScroll: JSON.stringify(h), anchor: m.id }, document.title, m === document.documentElement ? "#top" : "#" + m.id), "matchMedia" in C && C.matchMedia("(prefers-reduced-motion)").matches ? C.scrollTo(0, Math.floor(g)) : (Q("scrollStart", c, i, s), w.cancelScroll(!0), C.requestAnimationFrame(O)) } }; var t = function (e) { if (!e.defaultPrevented && !(0 !== e.button || e.metaKey || e.ctrlKey || e.shiftKey) && "closest" in e.target && (a = e.target.closest(o)) && "a" === a.tagName.toLowerCase() && !e.target.closest(M.ignore) && a.hostname === C.location.hostname && a.pathname === C.location.pathname && /#/.test(a.href)) { var t, n = r(a.hash); if ("#" === n) { if (!M.topOnEmptyHash) return; t = document.documentElement } else t = document.querySelector(n); (t = t || "#top" !== n ? t : document.documentElement) && (e.preventDefault(), (function (e) { if (history.replaceState && e.updateURL && !history.state) { var t = C.location.hash; t = t || "", history.replaceState({ smoothScroll: JSON.stringify(e), anchor: t || C.pageYOffset }, document.title, t || C.location.href) } })(M), w.animateScroll(t, a)) } }, n = function (e) { if (null !== history.state && history.state.smoothScroll && history.state.smoothScroll === JSON.stringify(M)) { var t = history.state.anchor; "string" == typeof t && t && !(t = document.querySelector(r(history.state.anchor))) || w.animateScroll(t, null, { updateURL: !1 }) } }; w.destroy = function () { M && (document.removeEventListener("click", t, !1), C.removeEventListener("popstate", n, !1), w.cancelScroll(), A = I = a = M = null) }; return (function () { if (!("querySelector" in document && "addEventListener" in C && "requestAnimationFrame" in C && "closest" in C.Element.prototype)) throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs."; w.destroy(), M = H(L, e || {}), I = M.header ? document.querySelector(M.header) : null, document.addEventListener("click", t, !1), M.updateURL && M.popstate && C.addEventListener("popstate", n, !1) })(), w } }));

var scroll = new SmoothScroll('a[href*="#"]', {
    speedAsDuration: true,
    speed: 1000,
    easing: 'easeInOutQuint'
});



//-----------------------------------------------------------------------------
// $(function () {
//     const swiper = new Swiper(".swiper_professor", {
//         spaceBetween: 0,
//         slidesPerView: 2.18,
//         breakpoints: {
//             768: {
//                 slidesPerView: 3,
//             },
//         },
//         centeredSlides: true,
//         disableOnInteraction: false,
//         loop: true,
//         autoplay: {
//             delay: 3000,
//         },
//         navigation: {
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//         },
//         pagination: {
//             el: '.swiper-pagination', // ページネーション要素のクラス
//             clickable: true, // クリックによるスライド切り替えを有効にする
//             type: 'bullets' // 'bullets'（デフォルト） | 'fraction' | 'progressbar'
//         },
//     });
//     swiper.autoplay.stop(); //画面に現れるまでswiperを停止
//     $(window).on('scroll', function () {
//         let position = $('.swiper_professor').offset().top - $(window).innerHeight() + 0,
//             scrollTop = $(window).scrollTop();
//         if (scrollTop > position) {
//             swiper.autoplay.start(); //画面に現れたらswiperを開始
//         } else {
//             swiper.autoplay.stop(); // 画面外にスクロールしたらswiperを停止
//         }
//     });
// });

//-----------------------------------------------------------------------------

AOS.init({
    once: false,
    offset: 100,
    duration: 0,
    delay: 0,
});

//-----------------------------------------------------------------------------
if ($.cookie('cookie') != 'first') {
    $(function () {
        $.cookie('cookie', 'first', { expires: 1, path: '/' });
        $(".opening_container, .kv_txt01, .kv_txt02").addClass("first");
    });
}

//-----------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const scrollIndicator = document.querySelector(".scroll-indicator");
    const section01 = document.querySelector(".section01");

    window.addEventListener("scroll", function () {
        const rect = section01.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;

        // 「下から20%手前」= 上から80% を通過したら非表示に
        const triggerPoint = sectionHeight * 0.8;

        // sectionのトップが -80%以上スクロールされたら非表示に
        const shouldHide = sectionTop < -triggerPoint;

        scrollIndicator.classList.toggle("hidden", shouldHide);
    });
});

//-----------------------------------------------------------------------------

// PCのみ別タブで開く（SPは同タブで開く）
if (window.innerWidth > 750) {
    document.querySelectorAll('.js-new-tab').forEach(link => {
        link.setAttribute('target', '_blank');
    });
}




