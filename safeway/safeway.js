(function() {
  if (window.location.href.indexOf('safeway.com') < 0) {
    window.location.replace('http://www.safeway.com/ShopStores/Justforu-Coupons.page');
  } else {
    var delay = 0;
    var scrollToElement = function(el) {
      var curleft = curtop = 0;
      if (el.offsetParent) {
        do {
          curleft += el.offsetLeft;
          curtop += el.offsetTop;
        } while (el = el.offsetParent);
      }
      window.scrollTo && window.scrollTo(curleft, curtop - 150);
    };
    var getClickFn = function(el) {
      return function() {
        scrollToElement(el);
        el.click();
      }
    };
    var getSelf = function(el) {
      return el;
    };
    var getParent = function(el) {
      return el.parentNode;
    };
    var clickActive = function(selector, getter) {
      var links = document.querySelectorAll(selector);
      var count = 0;
      for (var i = 0, link; link = links[i++];) {
        if (getComputedStyle(getter(link)).display != 'none') {
          ++count;
          window.setTimeout(getClickFn(link), delay);
          delay += 1000;
        }
      }
      return count;
    };
    var clickAllActive = function() {
      if (clickActive('.lt-add-offer-gallery', getSelf) +
          clickActive('.lt-add-offer-link', getParent) +
          clickActive('.lt-button-primary', getParent) > 0) {
        window.setTimeout(clickAllActive, delay);
        delay += 1000;
      }
    };
    clickAllActive();
  }
})()
