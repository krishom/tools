(function() {
  var url = 'safeway.com/ShopStores/Justforu-Coupons.page';
  if (window.location.href.indexOf(url) < 0) {
    window.location.replace('http://' + url);
    return;
  }
  var toClick = [];
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
      window.scrollBy && window.scrollBy(0, -1);
    }, 100);
    window.setTimeout(clickAllActive, 2000);
  };
  var getSelf = function(el) {
    return el;
  };
  var getParent = function(el) {
    return el.parentNode;
  };
  var findActive = function(selector, getter) {
    var count = 0;
    var links = document.querySelectorAll(selector);
    for (var i = 0, link; link = links[i++];) {
      if (getComputedStyle(getter(link)).display != 'none') {
        toClick.push(link);
        count++;
      }
    }
    return count;
  };
  var clickNext = function() {
    var el = toClick.shift();
    if (el) {
      scrollToElement(el);
      el.click();
    }
    if (toClick.length > 0) {
      window.setTimeout(clickNext, 500);
    } else {
      scrollToBottom();
    }
  };
  var clickAllActive = function() {
    if (findActive('.lt-add-offer-gallery', getSelf) +
        findActive('.lt-add-offer-link', getParent) +
        findActive('.lt-button-primary', getParent) > 0) {
      clickNext();
    }
  };
  scrollToBottom();
})();
