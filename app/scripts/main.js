/*global semantic */
'use strict';
// namespace
window.semantic = {
  handler: {}
};
// ready event
semantic.ready = function() {
  var
    $menu          = $('.right.menu'),
    $menuItems     = $menu.children('.item.pc'),
    $menuHeader    = $menu.children('.header').children('a'),
    $sectionHeaders      = $('h1.section'),
    $sideBar             = $('.ui.sidebar');
  // event handlers
  var handler = {
    activate: {
      previous: function() {
        var $section    = $menuItems.filter('.active');
        if($section.prev().size() > 0) {
          $section
            .removeClass('active')
            .prev('.item')
            .addClass('active');
        }
        // console.log('activate.previous');
      },
      section: function() {
        var
          $section       = $(this),
          index          = $sectionHeaders.index($section),
          $activeSection = $menuItems.eq(index);
        $menuItems
          .removeClass('active');
        $activeSection
          .addClass('active');
        // console.log('activate.section:' + index);
      }
    },
    scrollTo: function(event) {
      var
        id       = $(this).attr('href').replace('#', ''),
        $element = $('#'+id),
        position = $element.offset().top - 100;
      $element
        .addClass('active');
      $('html, body')
        .animate({
          scrollTop: position
        }, 500);
      location.hash = '#' + id;
      event.stopImmediatePropagation();
      event.preventDefault();
      return false;
    }
  };
  semantic.handler = handler;
  $menuItems.on('click', handler.scrollTo);
  $menuHeader.on('click', handler.scrollTo);
  $sideBar
    .sidebar('attach events', '#sidebar-toggle');
  $sectionHeaders
    .visibility({
      once: false,
      offset: 200,
      onTopPassed: handler.activate.section,
      onBottomPassed: handler.activate.section,
      onTopPassedReverse: handler.activate.previous
    });
    $('.standard.session.modal')
      .modal('attach events', '.session.title');
};
// attach ready event
$(document).ready(semantic.ready);
