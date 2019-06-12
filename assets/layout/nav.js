/*********************************************************
  Nav
*********************************************************/

(function($) {
  'use strict';

  // Nav setup
  // Append nav markup
  $('.sub-menu').prepend('<li class="sub-menu__back"><a><i class="fal fa-long-arrow-left"></i> Back</a></li></div>');

  // Global variables
  var trigger = $('.nav-toggle');
  var parent = $('.nav-mobile li.menu-item-has-children');
  var child = $('.nav-mobile li.menu-item-has-children:has(ul)').find('ul > li');
  // sub menus (ul)
  var lvl1_menu = $('.nav-mobile ul:first-child');
  var lvl2_menu = $('.nav-mobile ul:first-child > li > a + ul');
  var lvl3_menu = $('.nav-mobile ul:first-child > li > a + ul > li > a + ul');
  // sub menu link items (li a)
  var lvl1_links = $('.nav-mobile ul:first-child > li > a');
  var lvl2_links = $('.nav-mobile ul:first-child > li > a + ul > li > a');
  var lvl3_links = $('.nav-mobile ul:first-child > li > a + ul > li > a + ul > li > a');

  // Add nav classes for easier css selection 
  lvl1_menu.addClass('lvl-1-menu');
  lvl2_menu.addClass('lvl-2-menu');
  lvl3_menu.addClass('lvl-3-menu');
  lvl1_links.addClass('lvl-1');
  lvl2_links.addClass('lvl-2');
  lvl3_links.addClass('lvl-3');

  function navToggle() {
    $('body').toggleClass('nav-open');
    $('.nav-mobile').toggleClass('nav-open');
    $('.nav-toggle').toggleClass('active');
    $('.lvl-1-menu').toggleClass('active');
  }

  function navClose() {
    $('body').removeClass('nav-open');
    $('.nav-mobile').removeClass('nav-open');
    $('.nav-toggle').removeClass('active');
    $('.lvl-1-menu').removeClass('active');
  }


  // Detect click on nav-toggle and open
  trigger.click(function(e) {
    navToggle();
    // Detect click outside of nav-mobile, when open, and close nav
    $('.nav-open-overlay').click(function () {
      navClose();
    });
    // Detect click on esc key, when open, and close nav
    $(document).on('keyup',function(e) {
      if (e.keyCode == 27) {
         navClose();
      }
    });
  
  });

  // On click of parent item (lvl 1)
  parent.append('<i class="nav-mobile__chevron fal fa-chevron-right">');
  parent.on('click', function(e) {
    e.preventDefault();
    $(this).find(' > .sub-menu').toggleClass('active');
    //var parent_title = $(e.target).text();
    trigger.click(function() {
      $('.sub-menu').removeClass('active');
    });

    // On click of back arrow within parent
    var back = $('.sub-menu__back a');
    back.on('click', function(e) {
      e.preventDefault();
      $(e.target).closest('.sub-menu').removeClass('active');
    });
    
  });

  // On click of child item (lvl 2 & beyond)
  child.on('click', function(e) {
    e.stopPropagation();
  })
  


})(jQuery);