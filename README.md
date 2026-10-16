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

`index.md` is the training landing page. Its `title`, `description`, and `tags` become the card on the Trainings page. Leave `docs/trainings/index.md` unchanged. Use the category name as the tag, and put `tags` on this page only, so the catalog lists the training once. The Trainings page builds its filters from those tags.

```yaml
---
title: Training title
description: One sentence for the catalog card.
tags:
  - Category name
---
```

Add a lesson table on that page, with a relative link to each lesson file.

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
