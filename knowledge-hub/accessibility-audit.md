# Section 508 / WCAG 2.0 AA Audit: Geospatial Knowledge Hub

First audit: Oct 21, 2026. Fixes applied and re-checked the same day. Scope: the built site (`mkdocs build`), `docs/assets/css/extra.css`, and the JavaScript in `docs/javascripts/`. This file is outside `docs/`, so it is not published.

Section 508 (the 2018 refresh) requires WCAG 2.0 Level A and AA. Items marked *WCAG 2.1+* or *Best practice* are not strictly required by 508 but are worth keeping.

How this was checked: an automated script over the built HTML, a read of the CSS and JS, computed contrast ratios, a visual check of the images, and a keyboard test of the quiz in the browser. **Screen reader:** the author ran NVDA over one module page. **Not tested yet:** NVDA on the self-check quiz (planned), JAWS and VoiceOver, real 400% browser zoom and a real phone (the 320px layout was checked in a simulated window), Windows High Contrast mode.

Legend: `[x]` complies, `[ ]` open.

---

## 1. Page structure

- [x] **Page language is set** (`<html lang="en">`). WCAG 3.1.1.
- [x] **Every page has a unique title.** WCAG 2.4.2.
- [x] **Exactly one H1 per page.** WCAG 1.3.1.
- [x] **Skip-to-content link, landmarks, no duplicate IDs, zoom allowed.** WCAG 2.4.1, 1.3.1, 4.1.1, 1.4.4.
- [x] **Heading levels do not skip.** *Fixed.* Module 2 had H2 jumping to H4 in three places; they are now H3.
- [x] **Module numbers match the sidebar.** *Fixed.* The H1s, section numbers (for example 5.1, 5.2.3) and cross-references now follow the sidebar order: 4 Same Place, 5 Corrections, 6 Hard Places, 7 Planning for Post-Processing.
  - Cross-references that pointed at a specific section now point at the right target. For example, "fixed solution" refers to 5.3 (Float vs. Fixed).

## 2. Text size and headings

- [x] **Body text is 16px** with a 24 to 26px line height.
- [x] **Heading sizes step down in order:** H1 48px, H2 40px, H3 32px, H4 24px on wide screens; 36, 30, 24 and 20px on small screens.
- [x] **No text under 14px in the interface or learning content.** *Fixed.* Sizes were raised as follows:

  | Element | Before | Now |
  |---|---|---|
  | Quiz explanation text | 12.8px | 16px |
  | Quiz question | 14.4px | 16px |
  | Quiz "Explanation" label, counter, buttons, option letters | 10.4 to 12px | 14px |
  | Figure and video captions, "click to enlarge", step badges, dates | 12.8px | 14px |
  | Topic tags | 11.2px | 14px |
  | Left sidebar navigation | 13px | 14px |

  Why 14px: WCAG sets no fixed minimum, so this is a readability recommendation. 16px is used where the text is learning content.
- [x] **Text sizes use relative units.** *Fixed.* WCAG 1.4.4 (best practice).
  - **What was wrong:** body, headings, sidebars and table text were set in `px`, so a larger default font size in the reader's browser settings was ignored. (Browser zoom already worked.)
  - **What changed:** all `font-size` and `line-height` values in `extra.css` are now in `rem`. The root size is held at Material's normal 125%, so at the browser's default size nothing looks different (body 16px, H1 48px, H2 40px, H3 32px, tables and sidebars 14px), on every screen width.
  - **Checked:** at 1280, 1920 and 2200px the sizes are identical to before. With the browser default font size raised from 16px to 24px, the text grew by 1.5 times and the page still did not scroll sideways.
  - **Side effect:** Material's own text (header, menus) no longer grows on very wide screens (over 1600px), because the root size is no longer raised there.

## 3. Images and non-text content

- [x] **Every `<img>` has an `alt` attribute.**
- [x] **Decorative images use empty alt** (the 4 placeholder cards, and the card image on the Trainings page, whose link is hidden from assistive technology because the title link next to it goes to the same place).
- [x] **Alt text describes the content.** *Fixed.* `fig-1-1` (the six constellations), `fig-2-1-1`, `fig-2-1-2`, `fig-2-1-3`, `fig-6-1` and `fig-6-2` now describe what is shown and what the labels say.
- [x] **No flashing or animated GIFs.** WCAG 2.3.1.

## 4. Video (Able Player)

- [x] **Captions** (WebVTT) for both videos. WCAG 1.2.2.
- [x] **Captions are accurate.** Confirmed by the author: the narration matches the VTT files. The stray `[music]` artifacts were removed earlier.
- [x] **Full text transcript** below each video. WCAG 1.2.1, 1.2.3.
- [x] **Audio description.** Confirmed by the author: the narration explains what is shown, so no separate description track is needed. WCAG 1.2.5.
- [x] **Keyboard-operable player, no autoplay.** WCAG 2.1.1, 1.4.2.

## 5. Color and contrast (WCAG 1.4.3 needs 4.5:1 for text)

| Pair | Ratio | Result |
|---|---|---|
| Light: body text `#4a4a4a` on white | 8.86:1 | pass |
| Light: link / header `#4051b5` on white | 6.86:1 | pass |
| Light: muted text `#6b6b6b` on white | 5.33:1 | pass |
| Light: figure captions on white | 4.61:1 | pass |
| Dark: body, muted, link on `#1e2129` | 10.0, 6.1, 9.4:1 | pass |
| Quiz correct / wrong badges (white on green / red) | 5.13, 5.62:1 | pass |
| Quiz option badge hover or focus, dark mode | was 1.70:1, now dark text on mint (about 9:1) | pass (fixed) |
| Quiz "Next" / "Previous" button hover, dark mode | was 1.70:1, now dark text on mint | pass (fixed) |
| Quiz options after answering (dimmed) | was about 2.7:1; now 4.96:1 (light) and 6.9:1 (dark) | pass (fixed) |
| Number badges, white on orange `#b45309` | 5.02:1 | pass |

- [x] **Text and link contrast passes in light and dark mode.**
- [x] **Links are not identified by color alone** (dashed underline). WCAG 1.4.1.
- [x] **Right and wrong answers do not rely on color alone** (✓ and ✕ icons plus text for screen readers).
- [x] **Orange vs. blue number badges** on Module 2 are decorative. The group headings and the table already say which errors are in the air and which are at the antenna.

## 6. Keyboard and focus

- [x] **Visible focus indicator on every control.** *Fixed.* Quiz options, quiz buttons, tag buttons and the enlarge dialog's close button now show a 3px outline on keyboard focus. The old `outline: none` rules were removed.
- [x] **Quiz is fully keyboard operable:** Tab into the answers, arrow keys move between them, Enter or Space chooses.
- [x] **Buttons and filters are real `<button>` elements** with names; the tag filter uses `aria-pressed`.
- [x] **Click-to-enlarge images are keyboard accessible.** *Fixed. Now used on all 9 content images.* WCAG 2.1.1, 2.4.3, 4.1.2.
  - **What was wrong:** `.hub-zoom` images could only be opened with a mouse, and focus was not kept inside the enlarged box.
  - **What changed:** each `.hub-zoom` image is wrapped in a real button. It is reached with Tab, opened with Enter or Space, announced as "Click to enlarge: (picture description)", and shows a focus outline. While the box is open, Tab stays on the Close button and focus cannot wander to the page behind it. Escape or Close returns focus to the picture's button.
  - **Checked in a browser:** the button takes focus, opening moves focus to Close, Tab and an outside focus attempt both return to Close, and Escape puts focus back on the picture's button.
  - **Description and caption:** the enlarged picture keeps the same alt text as the page, and the box is announced with that description when it opens. The page's visible caption is shown under the enlarged picture too. Captions are not required by WCAG for a picture that has alt text, so this is a courtesy for sighted readers.

## 7. Tables and forms

- [x] **Wide tables reflow at 320px (400% zoom).** *Fixed.* WCAG 1.4.10.
  - **What was wrong:** the page itself scrolled sideways, and some tables had no way to reach hidden columns by keyboard. A rule that forced the first column onto one line also made the one-column "Why it matters" boxes about 1,800px wide.
  - **What changed:** data tables with several columns scroll inside their own box. The box can be focused and scrolled with the arrow keys, and is announced as "Table, scrolls sideways. Section: ...". A line above the table says "Scroll sideways to see all columns →". Cells are tighter on small screens, with a minimum column width so words don't wrap one per line. The quiz buttons now wrap instead of pushing the page wider.
  - **Checked at 320px and 900px:** no page scrolls sideways at either width, and at 900px no table needs scrolling. Tables that fit show no hint and are not focusable.
- [x] **Enlarged (full-screen) video at 400% zoom.** *Fixed and confirmed by the author in a real browser.* WCAG 1.4.10. On a very short screen the video keeps its full picture, the controls sit right below it, and the captions and time line follow below (vertical scroll only).

- [x] **No empty header cells.** *Fixed.* The six "WHY IT MATTERS" boxes are now one-column tables with a real header. The empty top-left cells in Module 1 and Module 2 tables now read "Feature" and "#".
- [x] **Column headers have `scope="col"`.** *Fixed for every table*, by a build step in `hooks.py`, so new tables get it automatically.
- [x] **No forms, no time limits, nothing moving or flashing.**

## 8. Dynamic content and assistive technology

- [x] **Quiz is announced to screen readers.** *Fixed in code, waiting for the NVDA check.* *Fixed.* Each question is a labelled group with `radio` answers (`aria-checked`). Choosing an answer reads "Correct" or "Incorrect, the correct answer is X" plus the explanation through a live region. The chosen and correct options get hidden text such as "(your answer, incorrect)". I verified the roles, keyboard handling and announcement text in the browser. **Open: NVDA test of the quiz is planned** (the author has tested a module page with NVDA, not the quiz yet).
- [x] **Training filter changes are announced** ("1 training shown for tag GNSS.").
- [x] **No duplicate adjacent links** on the Trainings cards.
- [x] **Respects "reduce motion".** `prefers-reduced-motion` turns off the small quiz and hover animations.

## Summary

| Area | Passed | Open |
|---|---|---|
| Structure | 6 | 0 |
| Text and headings | 4 | 0 |
| Images | 4 | 0 |
| Video | 5 | 0 |
| Color | 4 | 0 |
| Keyboard and focus | 4 | 0 |
| Tables | 3 | 0 |
| Dynamic content | 3 | 1 (waiting for the NVDA quiz check) |

## Left open

| Item | Status | Next step |
|---|---|---|
| NVDA on a module page | Done by the author | None |
| NVDA on the self-check quiz | Planned | Check that each question is read as a group, that arrow keys move between answers, and that "Correct" or "Incorrect" and the explanation are announced after choosing |
| 320px layout (what 400% zoom gives) | Checked in a simulated 320px window: no page scrolls sideways. The author also tried the full-screen video at real 400% zoom. | Optional: one more pass over the quiz page at 400% zoom |
| Windows High Contrast | Not tested | Check once before launch |
| Relative font units (`px` to `rem`) | Done. Sizes look the same at the default browser setting and grow with a larger one. | Look over the site once on a large monitor |
| Click-to-enlarge images | Keyboard accessible and now on all 9 content images. Tested in a browser, not with a screen reader. | Try one image with NVDA (Tab to it, Enter to open, Escape to close) |
