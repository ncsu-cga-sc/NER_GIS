/* Filter the training cards written in trainings/index.md. */
(function () {
  var list = document.getElementById("training-cards");
  var filters = document.getElementById("training-filters");
  if (!list || !filters) return;

  var cards = Array.prototype.slice.call(list.querySelectorAll(":scope > li.training-card"));
  var tags = [];

  function cardTags(card) {
    return (card.getAttribute("data-tags") || "").split(",").map(function (tag) {
      return tag.trim();
    }).filter(Boolean);
  }

  cards.forEach(function (card) {
    cardTags(card).forEach(function (tag) {
      if (tags.indexOf(tag) === -1) tags.push(tag);
    });
    Array.prototype.forEach.call(card.querySelectorAll(".training-card-tags .md-tag"), function (button) {
      button.addEventListener("click", function () {
        select(button.getAttribute("data-tag") || button.textContent.trim());
      });
    });
  });
  tags.sort(function (a, b) { return a.localeCompare(b); });

  // Screen-reader message when the filter changes the list
  var status = document.createElement("p");
  status.className = "sc-sr-only";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  filters.parentNode.insertBefore(status, filters.nextSibling);

  var empty = document.createElement("li");
  empty.className = "training-card-empty";
  empty.textContent = "No trainings with this tag.";
  empty.style.display = "none";
  list.appendChild(empty);

  function slug(name) {
    return "tag:" + name.normalize("NFC").trim().toLowerCase().replace(/[^\w\- ]/g, "").replace(/ /g, "-");
  }

  function render(active) {
    var shown = 0;
    cards.forEach(function (card) {
      var visible = !active || cardTags(card).indexOf(active) !== -1;
      card.style.display = visible ? "" : "none";
      if (visible) shown++;
    });
    empty.style.display = shown ? "none" : "";
    var real = cards.filter(function (card) { return cardTags(card).length; }).length;
    var count = cards.filter(function (card) {
      return card.style.display !== "none" && cardTags(card).length;
    }).length;
    status.textContent = active
      ? count + (count === 1 ? " training" : " trainings") + " shown for tag " + active + "."
      : "Showing all " + real + (real === 1 ? " training." : " trainings.");
  }

  function select(tag) {
    Array.prototype.forEach.call(filters.querySelectorAll("button"), function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-tag") === tag ? "true" : "false");
    });
    if (tag) {
      history.replaceState(null, "", "#" + slug(tag));
    } else {
      history.replaceState(null, "", location.pathname + location.search);
    }
    render(tag);
  }

  function addFilter(tag, label) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "md-tag";
    button.setAttribute("data-tag", tag);
    button.textContent = label;
    if (tag) button.id = slug(tag);
    button.addEventListener("click", function () { select(tag); });
    filters.appendChild(button);
  }

  addFilter("", "All");
  tags.forEach(function (tag) { addFilter(tag, tag); });
  filters.hidden = false;

  var fromHash = decodeURIComponent(location.hash.replace(/^#/, ""));
  var match = tags.filter(function (tag) { return slug(tag) === fromHash; })[0] || "";
  select(match);
})();
