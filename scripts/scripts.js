// Load external HTML files into the corresponding sections
function loadSection(sectionId, url, callback) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.getElementById(sectionId).innerHTML = data;
      if (typeof callback === "function") callback();
    })
    .catch(error => console.error(`Error loading ${sectionId}:`, error));
}

// Vis kun én sektion ad gangen og opdater navigation
function showSection(id) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
    section.style.display = 'none';
  });

  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    target.style.display = 'block';
  }

  document.querySelectorAll('.nav-link[data-section]').forEach(link => {
    link.classList.remove('active');
  });

  const matchingLink = document.querySelector(`.nav-link[data-section="${id}"]`);
  if (matchingLink) {
    matchingLink.classList.add('active');
  }
}

// Load sektioner
loadSection('dokumenter', 'dokumenter.html');
loadSection('hvem-er-vi', 'hvem-er-vi.html');
loadSection('vores-arbejde', 'vores-arbejde.html');
loadSection('for-beboere', 'for-beboere.html', function () {
  renderHouses();
  initMailchimpForm();
  if (typeof renderCalendarFromXLSX === "function") {
    renderCalendarFromXLSX();
  }
  enableZoomPanOnMap();
});
loadSection('forslag', 'forslag.html');

// Når vedtægter er loadet, så initialiser tabs korrekt
loadSection('vedtaegter', 'vedtaegter.html', function () {
  // Vent lidt på DOM-render (nødvendigt i nogle browsere)
  setTimeout(() => {
    // Tilføj event listeners til tabs
    const triggerTabList = document.querySelectorAll('#bylawsTab button');
    triggerTabList.forEach(triggerEl => {
      triggerEl.addEventListener('click', event => {
        const tabTrigger = new bootstrap.Tab(triggerEl);
        tabTrigger.show();
      });
    });

    // Vælg aktiv tab (Digitaliseret)
    const digitalTabBtn = document.getElementById('digitaliseret-tab');
    if (digitalTabBtn) {
      const digitalTab = new bootstrap.Tab(digitalTabBtn);
      digitalTab.show();
    }
  }, 0); // Kører efter DOM er opdateret
});

// Vis forside som udgangspunkt
document.addEventListener("DOMContentLoaded", function () {
  showSection('forside');
  const navbarCollapse = document.getElementById("navbarNav");
  const navLinks = navbarCollapse.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      // Luk kun hvis burger-menuen er synlig (uanset skærmbredde)
      const toggler = document.querySelector('.navbar-toggler');
      const isVisible = window.getComputedStyle(toggler).display !== "none";

      if (isVisible) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
});
