'use strict';


$(function() {
//モーダルウィンドウ
  $("main").append("<div id='glay_layer'></div><div id='over_layer'></div>");
  $("#glay_layer").click(function() {
    $(this).hide();
    $("#over_layer").hide();
  });

  $("a.modal").click(function() {
    $("#glay_layer").show();
    $("#over_layer").show().html("<img src="+$(this).attr("href")+">");
    return false;
  });

});
