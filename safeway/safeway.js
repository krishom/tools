(() => {
  const url = "/foru/coupons-deals.html";
  if (window.location.href.indexOf(url) < 0) {
    window.location.replace("https://www.safeway.com" + url);
    return;
  }
  const scrollAndClick = (el) => {
    el.scrollIntoView();
    el.dispatchEvent(new Event("click"));
  };
  const clickIfVisible = (query) => {
    [...document.querySelectorAll(query)].forEach((el) => {
      if (el.offsetHeight > 0) {
        el.click();
      }
    });
  };
  const loadMore = () => clickIfVisible(".btn.load-more");
  const clipAll = () => {
    loadMore();
    const interval = 333;
    const buttons = document
      .querySelector("coupon-grid")
      .querySelectorAll(".btn-primary");
    if (buttons.length > 0) {
      let delay = 0;
      buttons.forEach((btn) =>
        setTimeout(
          () => {
            scrollAndClick(btn);
            clickIfVisible("button.close");
            clickIfVisible("button.btn.btn-default.btn-modal");
          },
          (delay += interval)
        )
      );
      setTimeout(clipAll, delay + interval);
    }
  };
  loadMore();
  setTimeout(clipAll, 1000);
  clickIfVisible(`div[aria-label='Close']`);
  clickIfVisible(`div[aria-label='Close Notification']`);
})();
