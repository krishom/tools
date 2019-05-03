(function() {
  var url = 'www.safeway.com/justforu/coupons-deals.html';
  if (window.location.href.indexOf(url) < 0) {
    window.location.replace('https://' + url);
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
    document.querySelectorAll('.load-more').forEach((e) => e.click());
    window.scrollTo && window.scrollTo(0, document.body.offsetHeight);
    window.setTimeout(function() {
      window.scrollBy && window.scrollBy(0, -1);
    }, 100);
    window.setTimeout(clickAllActive, 2000);
  };
  var findActive = function(selector) {
    var count = 0;
    var links = [...document.querySelectorAll(selector)].filter((link) => link.id.indexOf('clipped') === -1);
    for (var i = 0, link; link = links[i++];) {
      if (getComputedStyle(link).display != 'none') {
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
    if (findActive('.grid-coupon-btn') > 0) {
      clickNext();
    }
  };
  scrollToBottom();
})();
