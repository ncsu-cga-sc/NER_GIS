/*
 * Starts the right sidebar ("Table of contents") at the same height as the first thing
 * after the page title (usually the first paragraph). It still sticks to the top of the
 * window when you scroll down. (The 400px height limit and scroll bar are in extra.css.)
 * Runs on first load, after every page change (instant navigation), and when the window is resized.
 */
(function () {
  function alignToc() {
    var side = document.querySelector(".md-sidebar--secondary");
    if (!side) return;

    side.style.marginTop = "0px";
    if (side.offsetParent === null) return;

    var inner = document.querySelector(".md-content__inner");
    var h1 = inner && inner.querySelector("h1");
    var target = h1 && h1.nextElementSibling;
    if (!target) return;

    var offset = target.getBoundingClientRect().top - side.getBoundingClientRect().top;
    if (offset > 0) side.style.marginTop = Math.round(offset) + "px";
  }

  function schedule() {
    alignToc();
    // Images and fonts can change the layout after the first pass
    setTimeout(alignToc, 300);
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(schedule);
  } else {
    document.addEventListener("DOMContentLoaded", schedule);
  }
  window.addEventListener("load", alignToc);
  window.addEventListener("resize", alignToc);
})();
