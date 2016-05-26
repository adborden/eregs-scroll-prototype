/* assets/js/index.js
 *
 * Add  your custom javascript here. This file is only loaded on the home page
 * unless you add a `javascript` property to your page's front matter.
 **/

(function () {
  var $ = window.jQuery;

  // The trigger for the sticky behavior is scrolling past the sticky leader,
  // marked by `.js-sticky-header--leader`, of which there should be only one.
  //
  // Multiple elements can be labeled `.js-sticky-header` to get this behavior.
  // Some css might be necessary to get the fixed postioning right, including
  // z-index in some cases.
  //
  // It's not so simple as changing position from static to fixed. The static
  // elements must hold their place in the dom and fixed removes them from the
  // flow. Instead, we use a [clone approach][css-tricks-persistent-header],
  // where the fixed elements are cloned from the static ones and are hidden
  // until the sticky behavior is triggered.
  // [css-tricks-persistent-header]: https://css-tricks.com/persistent-headers/
  //
  // We don't bother to hide the original static elements. If you've layered
  // things right, the fixed elements will lay on-top of the static ones,
  // hiding them. This assumes your elements don't have a transparent
  // background.
  $('.js-sticky-header').each(function () {
    var stickyHeader = $(this);
    stickyHeader
      .before(stickyHeader.clone())
      .addClass('js-sticky-header--stuck');
  });

  var scrollTarget = $('.js-sticky-header--leader').offset().top;
  checkScrollTarget(scrollTarget);

  $(window).scroll(function () {
    return checkScrollTarget(scrollTarget);
  });


  // Setup sidebar expand/collapse toggle
  $('.expand-toggle').click(sidebarToggle);

  // Initialize sidebar collapsed on small screens
  if ($(window).innerWidth() < 600) {
    sidebarToggle();
  }

  // Checks the viewport scroll offset, enables/disables the sticky trigger
  // appropriately.
  function checkScrollTarget (scrollTarget) {
    var scrollTop = $(window).scrollTop();

    if (scrollTop > scrollTarget) {
      $('body').addClass('js-sticky-header--enable');
    } else {
      $('body').removeClass('js-sticky-header--enable');
    }
  }


  // Toggles state of sidebar
  function sidebarToggle () {
    $('body').toggleClass('js-sidebar-collapse--enable');
  }
})();
