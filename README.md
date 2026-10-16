# NER_GIS

Geospatial Knowledge Hub: short, self-paced trainings published with [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

## Set up

Fork [nationalparkservice/NER_GIS](https://github.com/nationalparkservice/NER_GIS), then clone your fork:

```cmd
git clone https://github.com/<your-account>/NER_GIS.git
cd NER_GIS
git remote add upstream https://github.com/nationalparkservice/NER_GIS.git
```

`origin` is your fork. Push branches there and open a pull request into `nationalparkservice/NER_GIS`. A merged pull request on `main` publishes the site.

Then create the local preview environment:

```cmd
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
cd knowledge-hub
mkdocs serve --livereload
```

Open http://127.0.0.1:8000. Saving a file rebuilds the site and reloads the browser. `mkdocs serve` is only for local preview.

A developer does not run `mkdocs build` or `mkdocs gh-deploy`. Pushing to `main` runs `.github/workflows/deploy.yml`, which installs the packages and publishes the site to GitHub Pages.

## Add a training

Put the training in a category folder under `knowledge-hub/docs/trainings/`, such as `gnss`. When that folder is missing, add the category, then add the training contents.

### Add a category

Skip this step when the category folder is already there.

Create `knowledge-hub/docs/trainings/<category-slug>/index.md`:

```yaml
---
title: Category name
description: One sentence about this category.
hide:
  - toc
---
```

Under that front matter, add a heading, a short description, and an **Available trainings** section. `docs/trainings/gnss/index.md` is the pattern for a category that already has a training.

Add the category to `not_in_nav` in `knowledge-hub/mkdocs.yml` so the landing page stays published and stays out of the sidebar:

```yaml
not_in_nav: |
  trainings/<category-slug>/
```

### Add the training contents

Create the training folder:

```text
knowledge-hub/docs/trainings/<category>/<training-slug>/
  index.md
  01-first-lesson.md
  02-next-lesson.md
  img/
```

Keep figures in `img/` and link them from the lesson as `img/figure-name.png`.

`index.md` is the training landing page. Add its card in `docs/trainings/index.md` by copying an existing `<li class="training-card">`. In that copy, set the image `src`, both `href` values, the title text, the description, and `data-tags`. `data-tags` is the category name, and the same name is the tag button on the card. The Trainings page builds its filters from `data-tags`.

```html
<li class="training-card" data-tags="Category name">
<p class="training-card-image"><a href="<category>/<training-slug>/"><img src="img/<image-file>" alt="Training title"></a></p>
<p class="training-card-title"><strong><a href="<category>/<training-slug>/">Training title</a></strong></p>
<hr>
<p>One sentence for the card.</p>
<div class="training-card-footer">
<p class="training-card-tags"><button type="button" class="md-tag" data-tag="Category name">Category name</button></p>
<p class="training-card-date">Mon Year</p>
</div>
</li>
```

The training `index.md` still needs its own `title` for the page heading. Add a lesson table there, with a relative link to each lesson file.

Register the training in `knowledge-hub/mkdocs.yml` under `Trainings`, with `index.md` first and then each lesson:

```yaml
- Training title:
    - trainings/<category>/<training-slug>/index.md
    - 1. First lesson: trainings/<category>/<training-slug>/01-first-lesson.md
    - 2. Next lesson: trainings/<category>/<training-slug>/02-next-lesson.md
```

Add the training to the **Available trainings** list on `docs/trainings/<category>/index.md`.

When this is the first training in a new category, change the `not_in_nav` entry from the folder to the landing page file so the lessons stay in the sidebar:

```yaml
  trainings/<category>/index.md
```

Listing the whole folder hides the lessons along with the landing page.

To feature the training on the home page, update the links in `docs/index.md`.
