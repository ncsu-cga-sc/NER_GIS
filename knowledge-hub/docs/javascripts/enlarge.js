/*
 * Pictures with the hub-zoom class open in a box on this page. The box stays smaller than
 * the window. A GIF is loaded fresh after the box is shown so it animates;
 * the browser's dialog box freezes GIF frames.
 * Escape, the corner button, or a click outside the box dismisses it.
 */
(function () {
  var root = document.createElement("div");
  root.className = "hub-enlarge-root";
  root.hidden = true;

  var box = document.createElement("div");
  box.className = "hub-enlarge";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Enlarged picture");

  var picture = document.createElement("img");
  picture.alt = "";

  var close = document.createElement("button");
  close.type = "button";
  close.setAttribute("aria-label", "Close");
  close.textContent = "\u00d7";

  box.appendChild(picture);
  box.appendChild(close);
  root.appendChild(box);
  document.body.appendChild(root);

  var opener = null;

  function dismiss() {
    root.hidden = true;
    picture.removeAttribute("src");
    if (opener) opener.focus();
    opener = null;
  }

  close.addEventListener("click", dismiss);

  root.addEventListener("click", function (event) {
    if (event.target === root) dismiss();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !root.hidden) {
      event.preventDefault();
      dismiss();
    }
  });

  function markZoom() {
    var pictures = document.querySelectorAll(".md-content img.hub-zoom");
    for (var i = 0; i < pictures.length; i++) {
      var img = pictures[i];
      if (img.closest(".hub-zoom-frame")) continue;
      var frame = document.createElement("span");
      frame.className = "hub-zoom-frame";
      img.parentNode.insertBefore(frame, img);
      frame.appendChild(img);
    }
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(markZoom);
  } else {
    document.addEventListener("DOMContentLoaded", markZoom);
  }

  document.addEventListener("click", function (event) {
    var thumb = event.target.closest("img.hub-zoom");
    if (!thumb) return;
    event.preventDefault();

    var href = thumb.currentSrc || thumb.src;
    var isGif = /\.gif(?:$|[?#])/i.test(href);
    var src = href;
    if (isGif) {
      src += (href.indexOf("?") === -1 ? "?" : "&") + "play=" + Date.now();
    }

    opener = thumb;
    picture.alt = thumb.alt;
    picture.removeAttribute("src");
    root.hidden = false;
    close.focus();
    picture.src = src;
  });
})();
