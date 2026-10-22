/*
 * Pictures with the hub-zoom class open in a box on this page. The box stays smaller than
 * the window. A GIF is loaded fresh after the box is shown so it animates;
 * the browser's dialog box freezes GIF frames.
 * Escape, the corner button, or a click outside the box dismisses it.
 *
 * Keyboard and screen readers: each picture is wrapped in a real <button>, so it can be reached
 * with Tab and opened with Enter or Space. While the box is open, Tab stays inside it (the close
 * button is its only control), and closing it returns focus to the picture's button.
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
  picture.id = "hub-enlarge-picture";

  // The visible caption from the page, when the picture has one.
  var caption = document.createElement("p");
  caption.className = "hub-enlarge-caption";
  caption.hidden = true;

  // Screen readers hear the picture's description (its alt text) as soon as the box opens.
  box.setAttribute("aria-describedby", picture.id);

  var close = document.createElement("button");
  close.type = "button";
  close.setAttribute("aria-label", "Close");
  close.textContent = "\u00d7";

  box.appendChild(picture);
  box.appendChild(caption);
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
    if (root.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      dismiss();
    } else if (event.key === "Tab") {
      // Focus trap: the close button is the only control in the box.
      event.preventDefault();
      close.focus();
    }
  });

  // If focus ever lands outside the open box (for example a click on the page behind it),
  // bring it back.
  document.addEventListener("focusin", function (event) {
    if (!root.hidden && !root.contains(event.target)) close.focus();
  });

  // The caption is the italic text on the line right after the picture (same paragraph), or the
  // paragraph after the picture's paragraph when that one is marked { .figure-caption } or is
  // a line of italic text only. These are the caption styles used on the pages.
  function findCaption(frame) {
    var block = frame.parentNode;
    if (!block) return "";
    var sibling = frame.nextElementSibling;
    while (sibling) {
      if (sibling.tagName === "EM") return sibling.textContent.trim();
      sibling = sibling.nextElementSibling;
    }
    var next = block.nextElementSibling;
    if (!next || next.tagName !== "P") return "";
    var text = next.textContent.trim();
    var onlyItalic =
      next.children.length === 1 &&
      next.firstElementChild.tagName === "EM" &&
      next.firstElementChild.textContent.trim() === text;
    return next.classList.contains("figure-caption") || onlyItalic ? text : "";
  }

  function markZoom() {
    var pictures = document.querySelectorAll(".md-content img.hub-zoom");
    for (var i = 0; i < pictures.length; i++) {
      var img = pictures[i];
      if (img.closest(".hub-zoom-frame")) continue;
      var frame = document.createElement("button");
      frame.type = "button";
      frame.className = "hub-zoom-frame";
      frame.setAttribute("aria-haspopup", "dialog");
      frame.setAttribute(
        "aria-label",
        img.alt ? "Click to enlarge: " + img.alt : "Click to enlarge picture"
      );
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
    var frame = event.target.closest(".hub-zoom-frame");
    var thumb = frame && frame.querySelector("img.hub-zoom");
    if (!thumb) return;
    event.preventDefault();

    var href = thumb.currentSrc || thumb.src;
    var isGif = /\.gif(?:$|[?#])/i.test(href);
    var src = href;
    if (isGif) {
      src += (href.indexOf("?") === -1 ? "?" : "&") + "play=" + Date.now();
    }

    opener = frame;
    picture.alt = thumb.alt;
    var text = findCaption(frame);
    caption.textContent = text;
    caption.hidden = !text;
    box.classList.toggle("hub-enlarge-has-caption", !!text);
    picture.removeAttribute("src");
    root.hidden = false;
    close.focus();
    picture.src = src;
  });
})();
