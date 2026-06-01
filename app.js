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
    } else {
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


  // ===== CHECKOUT MODAL SYSTEM =====
  (function () {
    var modal = document.getElementById("checkout-modal");
    var closeBtn = document.getElementById("checkout-close");
    var successCloseBtn = document.getElementById("btn-success-close");
    
    var stepForm = document.getElementById("checkout-step-form");
    var stepSuccess = document.getElementById("checkout-step-success");
    
    var planNameEls = document.querySelectorAll("#checkout-plan-name, #checkout-summary-item, #success-plan-name");
    var planPriceEl = document.getElementById("checkout-summary-price");
    
    var tabs = document.querySelectorAll(".checkout-tab");
    var panels = document.querySelectorAll(".checkout-panel");
    
    var copyBtn = document.getElementById("btn-copy-pix");
    var pixInput = document.getElementById("pix-key-input");
    var pixSubmitBtn = document.getElementById("btn-submit-pix");
    
    var cardForm = document.getElementById("card-checkout-form");
    var visualCard = document.getElementById("visual-card");
    
    // Form Inputs
    var cardNumInput = document.getElementById("card-number");
    var cardNameInput = document.getElementById("card-name");
    var cardExpInput = document.getElementById("card-expiry");
    var cardCvvInput = document.getElementById("card-cvv");
    
    // Display elements on credit card
    var displayNum = document.getElementById("display-number");
    var displayName = document.getElementById("display-name");
    var displayExp = document.getElementById("display-expiry");
    var displayCvv = document.getElementById("display-cvv");

    if (!modal) return;

    // Open checkout modal on trigger click
    document.querySelectorAll(".checkout-trigger").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var planName = trigger.getAttribute("data-plan");
        var planPrice = trigger.getAttribute("data-price");
        
        // Populate plan details
        planNameEls.forEach(function (el) {
          el.textContent = planName;
        });
        if (planPriceEl) {
          planPriceEl.textContent = "R$ " + planPrice;
        }
        
        // Reset states
        stepForm.removeAttribute("hidden");
        stepSuccess.setAttribute("hidden", "");
        modal.classList.add("is-active");
        modal.setAttribute("aria-hidden", "false");
        
        // Set default active tab (Pix)
        setActiveTab("tab-pix");
      });
    });

    // Close Modal
    function closeModal() {
      modal.classList.remove("is-active");
      modal.setAttribute("aria-hidden", "true");
      if (cardForm) cardForm.reset();
      resetCardDisplay();
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (successCloseBtn) successCloseBtn.addEventListener("click", closeModal);
    
    // Close on overlay click
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Tab Switching Logic
    function setActiveTab(tabId) {
      tabs.forEach(function (tab) {
        var isActive = tab.id === tabId;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", isActive ? "true" : "false");
      });
      
      var panelId = tabId === "tab-pix" ? "panel-pix" : "panel-card";
      panels.forEach(function (panel) {
        var isTarget = panel.id === panelId;
        panel.classList.toggle("is-active", isTarget);
        if (isTarget) {
          panel.removeAttribute("hidden");
        } else {
          panel.setAttribute("hidden", "");
        }
      });
      
      // Flip back card if we switch tabs
      if (visualCard) visualCard.classList.remove("flipped");
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        setActiveTab(tab.id);
      });
    });

    // Copy Pix key
    if (copyBtn && pixInput) {
      copyBtn.addEventListener("click", function () {
        pixInput.select();
        pixInput.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(pixInput.value).then(function () {
          var originalText = copyBtn.textContent;
          copyBtn.textContent = "Copiado!";
          copyBtn.style.background = "#4bb543";
          setTimeout(function () {
            copyBtn.textContent = originalText;
            copyBtn.style.background = "";
          }, 1500);
        });
      });
    }

    // Success transition
    function triggerSuccess() {
      stepForm.setAttribute("hidden", "");
      stepSuccess.removeAttribute("hidden");
    }

    // Pix Submit simulation
    if (pixSubmitBtn) {
      pixSubmitBtn.addEventListener("click", function () {
        var originalText = pixSubmitBtn.textContent;
        pixSubmitBtn.textContent = "Confirmando pagamento...";
        pixSubmitBtn.disabled = true;
        setTimeout(function () {
          pixSubmitBtn.textContent = originalText;
          pixSubmitBtn.disabled = false;
          triggerSuccess();
        }, 1500);
      });
    }

    // Credit Card Visual Interactive Form
    if (cardNumInput) {
      cardNumInput.addEventListener("input", function (e) {
        var value = e.target.value.replace(/\D/g, "");
        // Add spaces every 4 digits
        var formatted = value.match(/.{1,4}/g);
        e.target.value = formatted ? formatted.join(" ") : "";
        displayNum.textContent = e.target.value || "•••• •••• •••• ••••";
      });
    }

    if (cardNameInput) {
      cardNameInput.addEventListener("input", function (e) {
        displayName.textContent = e.target.value.toUpperCase() || "NOME COMPLETO";
      });
    }

    if (cardExpInput) {
      cardExpInput.addEventListener("input", function (e) {
        var value = e.target.value.replace(/\D/g, "");
        if (value.length > 2) {
          e.target.value = value.substring(0, 2) + "/" + value.substring(2, 4);
        } else {
          e.target.value = value;
        }
        displayExp.textContent = e.target.value || "MM/AA";
      });
    }

    if (cardCvvInput) {
      cardCvvInput.addEventListener("input", function (e) {
        var value = e.target.value.replace(/\D/g, "");
        e.target.value = value;
        displayCvv.textContent = value || "•••";
      });
      
      // Flip card to CVV back on focus
      cardCvvInput.addEventListener("focus", function () {
        if (visualCard) visualCard.classList.add("flipped");
      });
      
      cardCvvInput.addEventListener("blur", function () {
        if (visualCard) visualCard.classList.remove("flipped");
      });
    }

    function resetCardDisplay() {
      if (displayNum) displayNum.textContent = "•••• •••• •••• ••••";
      if (displayName) displayName.textContent = "NOME COMPLETO";
      if (displayExp) displayExp.textContent = "MM/AA";
      if (displayCvv) displayCvv.textContent = "•••";
      if (visualCard) visualCard.classList.remove("flipped");
    }

    // Card submit simulation
    if (cardForm) {
      cardForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var submitBtn = document.getElementById("btn-submit-card");
        var originalText = submitBtn ? submitBtn.textContent : "";
        if (submitBtn) {
          submitBtn.textContent = "Processando pagamento...";
          submitBtn.disabled = true;
        }
        setTimeout(function () {
          if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }
          triggerSuccess();
        }, 1800);
      });
    }
  })();


  // ===== SCROLL REVEAL =====
  (function () {
    var reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;

    var observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.12
    };

    var observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Stop observing once animated
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  })();

})();