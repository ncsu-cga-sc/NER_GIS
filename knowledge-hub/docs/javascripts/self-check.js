/*
 * Self-check quizzes.
 * Accessibility: each question is a labelled radio group, answers can be chosen with the
 * keyboard (arrow keys move, Enter or Space picks), and the result and explanation are
 * announced to screen readers through a live region. Correct and wrong answers also show
 * text for screen readers, not only a color and a check or cross.
 */
document$.subscribe(function () {
    document.querySelectorAll(".self-check").forEach(function (box, boxIndex) {
      if (box.dataset.ready) return;
      box.dataset.ready = "1";

      const cards = box.querySelectorAll(":scope > .sc-card");
      let i = 0, score = 0;

      // Screen-reader announcements for results and explanations
      const live = document.createElement("div");
      live.className = "sc-sr-only";
      live.setAttribute("role", "status");
      live.setAttribute("aria-live", "polite");
      live.setAttribute("aria-atomic", "true");
      box.appendChild(live);

      function announce(text) {
        live.textContent = "";
        // A short delay makes screen readers treat it as a new message
        setTimeout(function () { live.textContent = text; }, 50);
      }

      cards.forEach(function (card, cardIndex) {
        const answer = card.dataset.answer;
        const opts = Array.prototype.slice.call(card.querySelectorAll(".sc-options li"));
        const list = card.querySelector(".sc-options");
        const question = card.querySelector(":scope > p");
        const explain = card.querySelector(".sc-explain");
        if (explain) explain.hidden = true;

        // Tie the question to its answers
        const qid = "sc-q-" + boxIndex + "-" + cardIndex;
        if (question) question.id = qid;
        card.setAttribute("role", "group");
        if (question) card.setAttribute("aria-labelledby", qid);
        if (list) {
          list.setAttribute("role", "radiogroup");
          if (question) list.setAttribute("aria-labelledby", qid);
        }

        function focusOption(n) {
          opts.forEach(function (o, k) { o.tabIndex = k === n ? 0 : -1; });
          opts[n].focus();
        }

        function addNote(li, text) {
          const note = document.createElement("span");
          note.className = "sc-sr-only";
          note.textContent = " (" + text + ")";
          li.appendChild(note);
        }

        opts.forEach(function (li, k) {
          li.tabIndex = k === 0 ? 0 : -1;
          li.setAttribute("role", "radio");
          li.setAttribute("aria-checked", "false");

          function pick() {
            if (card.dataset.done) return;
            card.dataset.done = "1";
            const ok = li.dataset.key === answer;
            if (ok) score++;
            li.setAttribute("aria-checked", "true");
            li.classList.add(ok ? "sc-right" : "sc-wrong");
            addNote(li, ok ? "your answer, correct" : "your answer, incorrect");
            opts.forEach(function (o) {
              if (o.dataset.key === answer) {
                o.classList.add("sc-right");
                if (o !== li) addNote(o, "correct answer");
              }
            });
            if (explain) explain.hidden = false;
            update();
            announce(
              (ok ? "Correct. " : "Incorrect. The correct answer is " + answer + ". ") +
              (explain ? "Explanation: " + explain.textContent.trim() : "")
            );
          }

          li.onclick = pick;
          li.onkeydown = function (e) {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault(); pick();
            } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
              e.preventDefault(); focusOption((k + 1) % opts.length);
            } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
              e.preventDefault(); focusOption((k - 1 + opts.length) % opts.length);
            }
          };
        });
      });

      const nav = document.createElement("div");
      nav.className = "sc-nav";
      nav.innerHTML =
        '<button type="button" class="sc-btn sc-prev" aria-label="Previous question">← Previous</button>' +
        '<span class="sc-count" role="status" aria-live="polite"></span>' +
        '<button type="button" class="sc-btn sc-next" aria-label="Next question">Next →</button>';
      box.appendChild(nav);

      const prev = nav.querySelector(".sc-prev");
      const next = nav.querySelector(".sc-next");
      const count = nav.querySelector(".sc-count");

      function update() {
        cards.forEach(function (c, k) { c.hidden = k !== i; });
        count.textContent =
          "Question " + (i + 1) + " of " + cards.length + " · Score: " + score;
        prev.disabled = i === 0;
        next.disabled = i === cards.length - 1;
      }

      prev.onclick = function () { i--; update(); };
      next.onclick = function () { i++; update(); };
      update();
    });
  });
