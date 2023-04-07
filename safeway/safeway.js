(function() {
  var url = '/foru/coupons-deals.html';
  if (window.location.href.indexOf(url) < 0) {
    window.location.replace('https://www.safeway.com' + url);
    return;
  }
  var clicked = {};
  var skipped = {};
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
  var clickAllActive = function() {
    if (findActive() > skipCount()) {
      clickNext();
    }
  };
  var skipCount = function() {
    return Object.keys(skipped).length;
  }
  var loadMore = function() {
    console.warn('loadMore', toClick);
    document.querySelectorAll('.load-more').forEach(el => {
      scrollToElement(el);
      el.click();
    });
    window.setTimeout(clickAllActive, 2000);
  };
  var findActive = function() {
    var count = 0;
    document.querySelectorAll('.grid-coupon-btn').forEach(el => {
      if (getComputedStyle(el).display != 'none') {
        toClick.push(el);
        count++;
      }
    })
    console.warn('findActive', count, toClick);
    return count;
  };
  var clickNext = function() {
    var el = toClick.shift();
    if (el) {
      if (clicked[el.id]) {
        skipped[el.id] = true;
      } else {
        console.warn('click', el);
        scrollToElement(el);
        el.click()
        clicked[el.id] = true;
      }
    }
    document.querySelectorAll('.btn-modal').forEach(el => (el.innerText == 'Close') && el.click())
    if (toClick.length > skipCount()) {
      window.setTimeout(clickNext, 500);
    } else {
      loadMore();
    }
  };
  loadMore();
})();
