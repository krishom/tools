function scrollToElement(el) {
  var curleft = curtop = 0;
  if (el.offsetParent) {
    do {
      curleft += el.offsetLeft;
      curtop += el.offsetTop;
    } while (el = el.offsetParent);
  }
  window.scrollTo && window.scrollTo(curleft, curtop - 150);
}
function addOffers() {
  var ltAddOfferLinks = document.querySelectorAll('.lt-add-offer-link'), delay = 0;
  for (var i = 0, link; link = ltAddOfferLinks[i++];) {
    if (getComputedStyle(link.parentNode).display != 'none') {
      window.setTimeout(function(activeLink) {
        return function() {
          console.log(activeLink);
          scrollToElement(activeLink);
          activeLink.click();
        }
      }(link), delay);
      delay += 1000;
    }
  }
}
function displayAll() {
  var numPages = document.getElementsByClassName('lt-page-number-wrap')[0].getElementsByClassName('lt-page-number').length;
  if (numPages > 1) {
    var dropDown = document.getElementsByClassName('lt-page-size')[0];
    dropDown.value = -1;
    var changeEvent = document.createEvent("UIEvents");
    changeEvent.initUIEvent("change", true, true, window, 1);
    dropDown.dispatchEvent(changeEvent);
    window.setTimeout(displayAll, 500);
  } else {
    addOffers();
  }
}
displayAll();
