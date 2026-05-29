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
  var panelCombos = document.getElementById("panel-combos");

  function setPlanPanel(panelId) {
    tabs.forEach(function (tab) {
      var id = tab.getAttribute("data-panel");
      var active = id === panelId;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });

    var panels = {
      pacotes: panelPacotes,
      b2b: panelB2b,
      combos: panelCombos
    };

    Object.keys(panels).forEach(function (key) {
      var panel = panels[key];
      if (panel) {
        var active = key === panelId;
        panel.classList.toggle("is-active", active);
        if (active) {
          panel.removeAttribute("hidden");
        } else {
          panel.setAttribute("hidden", "");
        }
      }
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var panel = tab.getAttribute("data-panel");
      if (panel) setPlanPanel(panel);
    });
  });

  function openPanelFromHash() {
    var hash = window.location.hash;
    if (hash === "#b2b") {
      setPlanPanel("b2b");
    } else if (hash === "#combos") {
      setPlanPanel("combos");
    }
  }

  window.addEventListener("hashchange", openPanelFromHash);
  openPanelFromHash();

  document.querySelectorAll('a[href="#b2b"]').forEach(function (link) {
    link.addEventListener("click", function () {
      window.requestAnimationFrame(function () {
        setPlanPanel("b2b");
      });
    });
  });

  document.querySelectorAll('a[href="#combos"]').forEach(function (link) {
    link.addEventListener("click", function () {
      window.requestAnimationFrame(function () {
        setPlanPanel("combos");
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
