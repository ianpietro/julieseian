(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var menuBtn = document.querySelector(".menu-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", function () {
      var open = mobileNav.hasAttribute("hidden");
      if (open) {
        mobileNav.removeAttribute("hidden");
        menuBtn.setAttribute("aria-expanded", "true");
      } else {
        mobileNav.setAttribute("hidden", "");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileNav.setAttribute("hidden", "");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  var tabs = document.querySelectorAll(".plan-tab");
  var panelPacotes = document.getElementById("panel-pacotes");
  var panelB2b = document.getElementById("panel-b2b");

  function setPlanPanel(panelId) {
    tabs.forEach(function (tab) {
      var id = tab.getAttribute("data-panel");
      var active = id === panelId;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    if (panelPacotes && panelB2b) {
      var showPacotes = panelId === "pacotes";
      panelPacotes.classList.toggle("is-active", showPacotes);
      panelPacotes.toggleAttribute("hidden", !showPacotes);
      panelB2b.classList.toggle("is-active", !showPacotes);
      panelB2b.toggleAttribute("hidden", showPacotes);
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var panel = tab.getAttribute("data-panel");
      if (panel) setPlanPanel(panel);
    });
  });

  function openB2bFromHash() {
    if (window.location.hash === "#b2b") {
      setPlanPanel("b2b");
    }
  }

  window.addEventListener("hashchange", openB2bFromHash);
  openB2bFromHash();

  document.querySelectorAll('a[href="#b2b"]').forEach(function (link) {
    link.addEventListener("click", function () {
      window.requestAnimationFrame(function () {
        setPlanPanel("b2b");
      });
    });
  });

  var form = document.querySelector(".lead-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var prev = btn ? btn.textContent : "";
      if (btn) {
        btn.textContent = "Enviado (demo)";
        btn.disabled = true;
      }
      window.setTimeout(function () {
        if (btn) {
          btn.textContent = prev;
          btn.disabled = false;
        }
        form.reset();
      }, 2200);
    });
  }
})();
