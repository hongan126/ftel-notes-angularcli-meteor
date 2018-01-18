$('.note-card').ready(function() {
  setTimeout(function() {
    $('.note-card').addClass('loaded');
  }, 700);

  //Adjustments for codepen
  if ($(this).innerWidth() < 1330) {
    $('.note-card').css({
      'top': '35vh'
    });
  } else if ($(this).innerWidth() > 1331) {
    $('.note-card').css({
      'top': '24vh'
    });
  } else {
    $('.note-card').css({
      'top': '24vh'
    });
  }
});
