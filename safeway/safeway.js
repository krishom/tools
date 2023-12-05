(function () {
  function clipAll() {
    const interval = 200
    const buttons = document.querySelectorAll(".grid-coupon-btn")
    if (buttons.length > 0) {
      document.querySelector(".btn.load-more").dispatchEvent(new Event("click"))
      let delay = 0;
      buttons.forEach((btn) =>
        setTimeout(
          () => btn.dispatchEvent(new Event("click")),
          (delay += interval)
        )
      )
      setTimeout(clipAll, delay + interval)
    }
  }
  clipAll()
})()
