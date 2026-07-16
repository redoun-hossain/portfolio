/* =============================================================
   PORTFOLIO WEBSITE - main.js
   Author: Redoun Hossain
   This file handles all JavaScript for the entire website.
   It is safe to use on pages that don't have every element —
   it always checks if an element exists before using it.
   ============================================================= */


/* =============================================================
   1. FOOTER YEAR
   Automatically updates the year in the footer.
   ============================================================= */
(function setFooterYear() {
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();


/* =============================================================
   2. MOBILE HAMBURGER MENU
   Opens and closes the mobile navigation menu.
   ============================================================= */
(function initHamburger() {
  var hamburger = document.getElementById('hamburger');
  var navMenu   = document.getElementById('nav-menu');

  // If neither element exists on this page, stop here
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', function () {
    // Toggle "open" class on both elements
    var isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    // Update aria attribute for accessibility
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when a nav link is clicked (useful on mobile)
  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside of it
  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
})();


/* =============================================================
   3. PROJECT "VIEW DETAILS" OPEN / CLOSE
   Used on: portfolio.html
   When the user clicks "View Details", the matching detail panel
   slides open on the same page. Clicking "Close" or clicking
   the button again hides it.
   ============================================================= */
(function initProjectDetails() {
  // All "View Details" buttons
  var viewButtons = document.querySelectorAll('.view-details-btn');

  // All detail panels
  var detailPanels = document.querySelectorAll('.project-detail');

  // If none found, stop
  if (!viewButtons.length || !detailPanels.length) return;

  // Close all detail panels
  window.closeAllDetailPanels = function () {
    detailPanels.forEach(function (panel) {
      panel.classList.remove('active');
    });
  };

  // "View Details" button click
  viewButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-target'); // e.g. "detail-n8n-1"
      var targetPanel = document.getElementById(targetId);

      if (!targetPanel) return;

      var isAlreadyOpen = targetPanel.classList.contains('active');

      // Close all panels first
      closeAllDetailPanels();

      // If it was not already open, open it
      if (!isAlreadyOpen) {
        targetPanel.classList.add('active');
        // Smooth scroll to the detail panel
        setTimeout(function () {
          targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    });
  });

  // "Close" button click inside each panel
  var closeButtons = document.querySelectorAll('.detail-close');
  closeButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = btn.closest('.project-detail');
      if (panel) {
        panel.classList.remove('active');
        // Scroll back up to the projects grid
        var grid = document.querySelector('.projects-grid');
        if (grid) {
          grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
})();


/* =============================================================
   5. LEGAL PAGE TABS
   Used on: legal.html
   Switches between "Privacy Policy" and "Terms & Conditions" tabs.
   Also reads ?tab=terms from URL to open terms directly.
   ============================================================= */
(function initLegalTabs() {
  var legalTabBtns     = document.querySelectorAll('.legal-tabs .tab-btn');
  var legalTabContents = document.querySelectorAll('.legal-content');

  // If no legal tabs found on this page, stop
  if (!legalTabBtns.length || !legalTabContents.length) return;

  function activateLegalTab(targetTabId) {
    legalTabBtns.forEach(function (btn) {
      var isActive = (btn.getAttribute('data-tab') === targetTabId);
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    legalTabContents.forEach(function (content) {
      var isActive = (content.id === 'tab-' + targetTabId);
      content.classList.toggle('active', isActive);
    });
  }

  legalTabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activateLegalTab(btn.getAttribute('data-tab'));
    });
  });

  // Check URL ?tab=terms
  var urlParams = new URLSearchParams(window.location.search);
  var legalTab  = urlParams.get('tab');
  if (legalTab === 'terms') {
    activateLegalTab('terms');
  }
})();


/* =============================================================
   6. BACK TO TOP BUTTON
   Shows a "↑" button when the user scrolls down 300px.
   Clicking it smoothly scrolls back to the top of the page.
   ============================================================= */
(function initBackToTop() {
  var btn = document.getElementById('backToTop');
  if (!btn) return;

  // Show / hide based on scroll position
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  // Scroll to top when clicked
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* =============================================================
   7. SMOOTH SCROLL FOR ANCHOR LINKS
   Makes clicking on in-page anchor links (#section) scroll
   smoothly instead of jumping instantly.
   ============================================================= */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (targetId === '#') return; // skip empty anchors

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();


/* =============================================================
   8. CONTACT FORM VALIDATION
   Used on: contact.html
   Validates required fields before submission.
   Shows friendly error messages inline.
   ============================================================= */
(function initContactForm() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  // Helper: show error on a field
  function showError(fieldId, message) {
    var field = document.getElementById(fieldId);
    var error = document.getElementById(fieldId + '-error');
    if (field)  field.classList.add('error');
    if (error)  error.textContent = message;
  }

  // Helper: clear error on a field
  function clearError(fieldId) {
    var field = document.getElementById(fieldId);
    var error = document.getElementById(fieldId + '-error');
    if (field)  field.classList.remove('error');
    if (error)  error.textContent = '';
  }

  // Clear errors when user types/changes
  ['name', 'email', 'service', 'message'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', function () { clearError(id); });
      el.addEventListener('change', function () { clearError(id); });
    }
  });

  // On form submit
  form.addEventListener('submit', function (e) {
    var valid = true;

    // Validate Name
    var name = document.getElementById('name');
    if (name && name.value.trim().length < 2) {
      showError('name', 'Please enter your name (at least 2 characters).');
      valid = false;
    } else {
      clearError('name');
    }

    // Validate Email
    var email = document.getElementById('email');
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email.value.trim())) {
      showError('email', 'Please enter a valid email address.');
      valid = false;
    } else {
      clearError('email');
    }

    // Validate Service dropdown
    var service = document.getElementById('service');
    if (service && !service.value) {
      showError('service', 'Please select a service.');
      valid = false;
    } else {
      clearError('service');
    }

    // Validate Message
    var message = document.getElementById('message');
    if (message && message.value.trim().length < 10) {
      showError('message', 'Please describe your project (at least 10 characters).');
      valid = false;
    } else {
      clearError('message');
    }

    // If any field failed validation, prevent form submission
    if (!valid) {
      e.preventDefault();
      // Scroll to first error
      var firstError = form.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    // If valid, form submits normally to FormSubmit.co
  });

  // Show success message if redirected back with ?success=true
  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('success') === 'true') {
    var successEl = document.getElementById('formSuccess');
    if (successEl) {
      successEl.style.display = 'block';
      successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
})();


/* =============================================================
   9. ACTIVE NAV LINK HIGHLIGHT
   Automatically adds "active" class to the nav link that
   matches the current page URL.
   ============================================================= */
(function setActiveNavLink() {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-menu a').forEach(function (link) {
    var href = link.getAttribute('href');
    // Remove query strings from href for comparison
    var linkPage = href ? href.split('?')[0].split('/').pop() : '';

    if (linkPage === currentPage) {
      // Remove active from all first
      document.querySelectorAll('.nav-menu a').forEach(function (l) {
        if (!l.classList.contains('nav-hire')) {
          l.classList.remove('active');
        }
      });
      if (!link.classList.contains('nav-hire')) {
        link.classList.add('active');
      }
    }
  });
})();


/* =============================================================
   10. OPTIONAL DEVICE PREVIEW TOOL
   Keep js/device-preview.js for testing. Delete that one file
   before publishing to hide the preview tool everywhere.
   ============================================================= */
(function loadOptionalDevicePreview() {
  if (window.top !== window.self) return;

  var currentScript = document.currentScript;
  if (!currentScript || !currentScript.src) return;

  var previewScript = document.createElement('script');
  previewScript.src = new URL('device-preview.js', currentScript.src).href;
  previewScript.defer = true;
  previewScript.onerror = function () {
    previewScript.remove();
  };
  document.head.appendChild(previewScript);
})();
