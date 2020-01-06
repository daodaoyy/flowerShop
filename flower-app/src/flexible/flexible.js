(function() {
  let dpr = window.devicePixelRatio;
  let meta = document.createElement("meta");
  let scale = 1 / dpr;
  meta.setAttribute("name", "viewport");
  meta.setAttribute(
    "content",
    "width=device-width, user-scalable=no, initial-scale=" +
      scale +
      ", maximum-scale=" +
      scale +
      ", minimum-scale=" +
      scale
  );
  document.getElementsByTagName("head")[0].appendChild(meta);
  // 动态设置的缩放大小会影响布局视口的尺寸
  function resize() {
    let deviceWidth = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = deviceWidth / 10 + "px";
  }
  resize();
  window.onresize = resize;
})();
