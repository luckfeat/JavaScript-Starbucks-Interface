$('.gnb_nav_inner > ul > li > h2 > a').bind('mouseover focus', function (e) {
  $('.gnb_nav_inner > ul > li > h2 > a').removeClass('on');
  $('.gnb_sub_wrap').hide();

  $(this).addClass('on');
  $(this).parent().next().stop(true, true).slideDown();

  e.preventDefault();
});

$('.gnb_nav_inner').bind('mouseleave', function () {
  $('.gnb_nav_inner > ul > li > h2 > a').removeClass('on');
  $('.gnb_sub_wrap').slideUp();
});

$('.sdown_gnb_nav_inner > ul > li > h2 > a').bind(
  'mouseover focus',
  function (e) {
    $('.sdown_gnb_nav_inner > ul > li > h2 > a').removeClass('on');
    $('.gnb_sub_wrap').hide();

    $(this).addClass('on');
    $(this).parent().next().stop(true, true).slideDown();

    e.preventDefault();
  }
);

$('.sdown_gnb_nav_inner').bind('mouseleave', function () {
  $('.sdown_gnb_nav_inner > ul > li > h2 > a').removeClass('on');
  $('.gnb_sub_wrap').slideUp();
});

$('.sub_gnb_nav_inner > ul > li > h2 > a').bind(
  'mouseover focus',
  function (e) {
    $('.sub_gnb_nav_inner > ul > li > h2 > a').removeClass('on');
    $('.gnb_sub_wrap').hide();

    $(this).addClass('on');
    $(this).parent().next().stop(true, true).slideDown();

    e.preventDefault();
  }
);

$('.sub_gnb_nav_inner').bind('mouseleave', function () {
  $('.sub_gnb_nav_inner > ul > li > h2 > a').removeClass('on');
  $('.gnb_sub_wrap').slideUp();
});
