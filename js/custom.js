jQuery(document).ready(function($) {

  /*--------------------------------------
                Custom Carousel
  --------------------------------------*/
  $('.custom-carousel').each(function() {
    var carousel = $(this);

    //-----Custom Carousel Function-----\\
    function customCarousel() {
      var ul = carousel.find('ul');
      var li = carousel.find('li');
      var width = carousel.width();
      var height = width/3;

      li.each(function() {
        $(this).width(width-20);
        $(this).height(height);
      });

      var amount = li.size();
      var totalWidth = width*amount;

      ul.width(totalWidth).height(height+20);

      //-----position for li before li.active-----\\
      var active = carousel.find('li.active');
      var index = active.index();

      while(index > 0) {
        li.each(function() {
          var counterNeg = index*-1;

          active.siblings().eq(active.index()+counterNeg).css('left', (width*counterNeg)+counterNeg);
          index--;
        });
      }

      //-----position for li after li.active-----\\
      var counterPos = 0;
      var counterClassPos = 1;

      li.each(function() {
        active.siblings().eq(active.index()+counterPos).css('left', (width*counterClassPos)+counterClassPos);
        counterPos++;
        counterClassPos++;
      });
    } //end: Custom Carousel Function

    customCarousel(); //call the function



    //-----Pagination-----\\
    var pagination = carousel.find('.cc-pagination');
    var countLi = carousel.find('li').size();

    while(countLi > 1) {
      pagination.append('<span></span>');
      countLi--;
    }

    pagination.find('span').click(function() {
      var position = $(this).index();
      position = position +1;
      var cssPosition = ':nth-child('+position+')';
      thisUl = $(this).parent('.cc-pagination').siblings('ul');
      var targetLi = 'li'+cssPosition;

      thisUl.find('.active').removeClass('active');
      thisUl.find(targetLi).addClass('active');
      $(this).siblings('.active').removeClass('active');
      $(this).addClass('active');

      customCarousel();
    });



    //-----Prev Button-----\\
    var watchIndex;
    var watchAmount;
    var thisUl;
    var thisPagination;

    carousel.find('.prev').click(function() {
      thisUl = $(this).parent('.cc-control').siblings('ul');
      thisPagination = $(this).parent('.cc-control').siblings('.cc-pagination');
      watchIndex = thisUl.find('.active').index();

      if(watchIndex != 0) {
        thisUl.find('.active').removeClass('active').prev().addClass('active');
        thisPagination.find('.active').removeClass('active').prev().addClass('active');
        customCarousel();
      } else {
        thisUl.find('li:first-child').removeClass('active');
        thisUl.find('li:last-child').addClass('active');
        thisPagination.find('.active').removeClass('active');
        thisPagination.find('span:last-child').addClass('active');
        customCarousel();
      }
    });



    //-----Next Button-----\\
    carousel.find('.next').click(function() {
      thisUl = $(this).parent('.cc-control').siblings('ul');
      thisPagination = $(this).parent('.cc-control').siblings('.cc-pagination');
      watchIndex = thisUl.find('.active').index();
      watchAmount = thisUl.find('li').size();

      if((watchIndex+1) != watchAmount) {
        thisUl.find('.active').removeClass('active').next().addClass('active');
        thisPagination.find('.active').removeClass('active').next().addClass('active');
        customCarousel();
      } else {
        thisUl.find('li:last-child').removeClass('active');
        thisUl.find('li:first-child').addClass('active');
        thisPagination.find('.active').removeClass('active');
        thisPagination.find('span:first-child').addClass('active');
        customCarousel();
      }
    });



    //-----responsive-----\\
    $(window).resize(function() {
      customCarousel();
    });

  }); // end: Custom Carousel

}); // end: jQuery(document).ready