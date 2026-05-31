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

  document.querySelectorAll('[data-target-tab]').forEach(function (el) {
    el.addEventListener("click", function () {
      var tab = el.getAttribute("data-target-tab");
      if (tab) {
        window.requestAnimationFrame(function () {
          setPlanPanel(tab);
        });
      }
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

  // ===== Clippings Carousel =====
  (function () {
    var slides = document.querySelectorAll(".clip-slide");
    var dots   = document.querySelectorAll(".clip-dot");
    var btnPrev = document.querySelector(".clip-prev");
    var btnNext = document.querySelector(".clip-next");
    if (!slides.length) return;

    var current = 0;
    var autoTimer;

    function goTo(idx) {
      slides[current].classList.remove("active");
      dots[current].classList.remove("active");
      current = (idx + slides.length) % slides.length;
      slides[current].classList.add("active");
      dots[current].classList.add("active");
    }

    function startAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(function () { goTo(current + 1); }, 9000);
    }

    if (btnPrev) btnPrev.addEventListener("click", function () { goTo(current - 1); startAuto(); });
    if (btnNext) btnNext.addEventListener("click", function () { goTo(current + 1); startAuto(); });

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        goTo(parseInt(dot.getAttribute("data-index"), 10));
        startAuto();
      });
    });

    startAuto();
  })();

  // ===== Playlists Interactive Switcher =====
  (function () {
    var playlistTabs = document.querySelectorAll(".playlist-selector-tab");
    var frontPhoneImg = document.querySelector(".phone-front .phone-screenshot-img");
    var backPhoneImg = document.querySelector(".phone-back .phone-screenshot-img");
    if (!playlistTabs.length || !frontPhoneImg || !backPhoneImg) return;

    playlistTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        playlistTabs.forEach(function (t) {
          t.classList.remove("is-active");
        });
        tab.classList.add("is-active");

        var playlistIndex = tab.getAttribute("data-playlist");

        frontPhoneImg.style.opacity = "0";

        setTimeout(function () {
          frontPhoneImg.onload = function () {
            frontPhoneImg.style.opacity = "1";
          };
          frontPhoneImg.src = "assets/playlist_print_" + playlistIndex + ".png";
        }, 200);

        var nextIndex = (parseInt(playlistIndex, 10) % 7) + 1;
        backPhoneImg.style.opacity = "0";
        setTimeout(function () {
          backPhoneImg.onload = function () {
            backPhoneImg.style.opacity = "1";
          };
          backPhoneImg.src = "assets/playlist_print_" + nextIndex + ".png";
        }, 250);
      });
    });
  })();

})();

