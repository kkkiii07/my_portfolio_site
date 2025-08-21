$('section').not('.main_lp').hide();  // .main_lp 以外のすべてのセクションを非表示にする

// 最初はすべての .enquete_fv_ex を非表示にする
// $('.enquete_mock_fv_top').hide();
// $('.enquete_fv_ex').hide();

function initAction () {
    
    // 次の .enquete_mock_fv を表示し、その後に続く form を表示する
    var $nextSection = $('.enquete_mock_fv').first();
    var $nextForm = $nextSection.next('form');
    
    $nextSection.show();  // 次の .enquete_mock_fv を表示する
    $nextForm.show();     // その後の form を表示する
    
    // form 内の最初の section を表示する
    $nextForm.find('section').first().show();

    // クリックされたlabelの親の親の親 (closest .fv) を取得
    var parent = $('.enquete_mock_fv');
    // 親要素内の .enquete_fv_ex.k1 を表示する
    // parent.find('.enquete_fv_ex.ex1').show();
};

var currentIndex = 0;

$('label').click(function() {
    if ($(this).hasClass('disabled_label')) {
        return;
    }
    // 全ての .enquete_fv_ex を非表示にする
    $('.enquete_fv_ex').hide();
    $(this).closest('section').hide();
    
    $('body, html').animate({
        scrollTop: 0
    }, 500);

    // 表示するインデックスを更新
    currentIndex = (currentIndex + 1) % $('.enquete_fv_ex').length;

    // 現在のインデックスに対応する .enquete_fv_ex を表示する
    $('.enquete_fv_ex').eq(currentIndex).show();
    $(this).closest('section').next('section').show();
});

initAction()