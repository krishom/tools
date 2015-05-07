(function() {
  if (window.location.href.indexOf('safeway.com') < 0) {
    window.location.replace('http://www.safeway.com/ShopStores/Justforu-Coupons.page');
  } else {
    var delay = 0;
    var scrollToElement = function(el) {
      var curLeft = curTop = 0;
      if (el.offsetParent) {
        do {
          curLeft += el.offsetLeft;
          curTop += el.offsetTop;
        } while (el = el.offsetParent);
      }
      window.scrollTo && window.scrollTo(curLeft, curTop - 150);
    };
    var scrollToBottom = function() {
      window.scrollTo && window.scrollTo(0, document.body.offsetHeight);
      window.setTimeout(function() {
        window.scrollBy && window.scrollBy(0, -1)
      }, 100);
      window.setTimeout(clickAllActive, 1000);
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
      delay = 0;
      if (clickActive('.lt-add-offer-gallery', getSelf) +
          clickActive('.lt-add-offer-link', getParent) +
          clickActive('.lt-button-primary', getParent) > 0) {
        window.setTimeout(scrollToBottom, delay);
      }
    };
    clickAllActive();
  }
})()
