fetch("/header.html")
  .then(response => {
    if (!response.ok) {
      throw new Error("Header load failed");
    }

    return response.text();
  })

  .then(html => {

    document.querySelectorAll(".site-header-content").forEach(container => {
      container.innerHTML = html;
    });

    initArchiveSearch();
  })

  .catch(error => {
    console.error(error);
  });

function initArchiveSearch() {
  const records = {
    "pr-c-001": "/characters/alexandre.html",
    "pr-c-002": "/characters/audrey.html",
    "pr-c-003": "/characters/armel.html",
    "pr-c-004": "/characters/lucien.html",
    "pr-c-005": "/characters/henri.html",
    "pr-c-006": "/characters/blaise.html",
    "pr-c-007": "/characters/kurt.html",
    "pr-c-008": "/characters/clement.html",
    "pr-c-009": "/characters/benoit.html",
    "pr-c-010": "/characters/varvara.html",
    "pr-c-011": "/characters/maurice.html",
    "pr-c-012": "/characters/karim.html",
    "pr-c-013": "/characters/seraphine.html",
    "pr-c-014": "/characters/florian.html",
    "pr-c-015": "/characters/gaspard.html",
    "pr-c-016": "/characters/klara.html",
    "pr-c-017": "/characters/oscar.html",
    "pr-c-018": "/characters/olivier.html",
    "pr-c-019": "/characters/saul.html",
    "pr-c-020": "/characters/noemie.html",
    "pr-c-021": "/characters/renaud.html",
    "pr-c-000": "/characters/albert.html",
    "pr-c-404": "/characters/AS.html",
    "pr-x-001": "/characters/genevieve.html",
    "pr-x-002": "/characters/j.html",
    "pr-x-003": "/characters/louis.html",
    "pr-x-004": "/characters/isaie.html",
    "pr-x-005": "/characters/zafir.html",
    "pr-x-006": "/characters/hilda.html",
    "pr-a-001": "/characters/angelico.html",
    "pr-a-002": "/characters/marguerite.html",
    "pr-a-003": "/characters/aline.html",
    "pr-a-004": "/characters/bastien.html",
  };

  document.querySelectorAll(".archive-search").forEach(input => {

    const searchArea = input.closest(".header-search");
    const status = searchArea?.querySelector(".search-status");

    input.addEventListener("keydown", function(event) {

      if (event.key !== "Enter") return;

      const originalQuery = input.value.trim();

      if (!originalQuery) return;

      const keyword = originalQuery.toLowerCase();

      if (records[keyword]) {
        window.location.href = records[keyword];
        return;
      }

      const recordPattern = /^(?=.*\d)[A-Za-z0-9/_-]+$/;

      if (recordPattern.test(originalQuery)) {

        showStatus(status, "NO RECORD FOUND");

        return;
      }

      window.location.href =
        "/search.html?q=" + encodeURIComponent(originalQuery);

    });

  });

}

function showStatus(element, message) {

  if (!element) return;

  element.textContent = message;

  setTimeout(() => {
    element.textContent = "";
  }, 2000);

}