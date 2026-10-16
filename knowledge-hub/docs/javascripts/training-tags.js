/* Build the Trainings cards from tagged pages and filter them by tag. */
(function () {
  var sources = Array.prototype.slice.call(document.querySelectorAll(".training-card-source"));
  var list = document.getElementById("training-cards");
  var filters = document.getElementById("training-filters");
  if (!sources.length || !list || !filters) return;

  var byUrl = new Map();
  sources.forEach(function (source) {
    var url = source.getAttribute("data-url");
    var tag = source.getAttribute("data-tag");
    var item = byUrl.get(url);
    if (!item) {
      item = {
        url: url,
        title: source.getAttribute("data-title") || "",
        description: source.getAttribute("data-description") || "",
        tags: []
      };
      byUrl.set(url, item);
    }
    if (tag && item.tags.indexOf(tag) === -1) item.tags.push(tag);
    source.remove();
  });

  var items = Array.from(byUrl.values()).sort(function (a, b) {
    return a.title.localeCompare(b.title);
  });
  var tags = Array.from(new Set(items.reduce(function (all, item) {
    return all.concat(item.tags);
  }, []))).sort(function (a, b) {
    return a.localeCompare(b);
  });

  function slug(name) {
    return "tag:" + name.normalize("NFC").trim().toLowerCase().replace(/[^\w\- ]/g, "").replace(/ /g, "-");
  }

  function render(active) {
    list.textContent = "";
    var visible = active ? items.filter(function (item) { return item.tags.indexOf(active) !== -1; }) : items;
    visible.forEach(function (item) {
      var li = document.createElement("li");
      li.className = "training-card";

      var title = document.createElement("p");
      var strong = document.createElement("strong");
      var link = document.createElement("a");
      link.href = item.url;
      link.textContent = item.title;
      strong.appendChild(link);
      title.appendChild(strong);

      var tagRow = document.createElement("p");
      tagRow.className = "training-card-tags";
      item.tags.forEach(function (tag) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "md-tag";
        button.textContent = tag;
        button.addEventListener("click", function () { select(tag); });
        tagRow.appendChild(button);
      });

      li.appendChild(title);
      if (item.description) {
        var rule = document.createElement("hr");
        var description = document.createElement("p");
        description.textContent = item.description;
        li.appendChild(rule);
        li.appendChild(description);
      }
      li.appendChild(tagRow);
      list.appendChild(li);
    });

    if (!visible.length) {
      var empty = document.createElement("li");
      empty.className = "training-card-empty";
      empty.textContent = "No trainings with this tag.";
      list.appendChild(empty);
    }
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
