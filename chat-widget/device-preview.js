/**
 * ============================================================
 * DEVICE PREVIEW TOOL (Development Only)
 * Preview your website in different device sizes.
 * Delete this file before going live.
 * ============================================================
 */
(function initDevicePreview() {
  // Check if preview is disabled in config
  if (typeof CHAT_CONFIG !== 'undefined' && CHAT_CONFIG.PREVIEW_ENABLED === false) return;

  // Stop if already inside an iframe, or if launcher already exists
  if (window.top !== window.self || document.getElementById('device-preview-launcher')) return;

  var presets = {
    desktop: { label: 'Desktop', width: 1200 },
    tablet: { label: 'Tablet', width: 768 },
    mobile: { label: 'Mobile', width: 390 }
  };

  // Inject styles
  var style = document.createElement('style');
  style.textContent = [
    '#device-preview-launcher{position:fixed;left:18px;bottom:18px;z-index:99998;border:0;border-radius:999px;background:#1d4ed8;color:#fff;padding:12px 16px;font:700 14px/1 system-ui,sans-serif;box-shadow:0 10px 24px rgba(15,23,42,.28);cursor:pointer;}',
    '#device-preview-modal{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;padding:24px;background:rgba(15,23,42,.78);}',
    '#device-preview-modal.is-open{display:flex;}',
    '.device-preview-panel{width:min(1280px,100%);height:min(860px,100%);display:flex;flex-direction:column;overflow:hidden;border-radius:16px;background:#0f172a;box-shadow:0 25px 70px rgba(0,0,0,.45);}',
    '.device-preview-toolbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:12px;background:#172033;color:#e2e8f0;font:600 14px/1 system-ui,sans-serif;}',
    '.device-preview-toolbar strong{margin-right:auto;}',
    '.device-preview-toolbar button{border:1px solid #475569;border-radius:7px;background:#243047;color:#e2e8f0;padding:8px 11px;font:inherit;cursor:pointer;}',
    '.device-preview-toolbar button:hover,.device-preview-toolbar button.is-active{background:#2563eb;border-color:#60a5fa;color:#fff;}',
    '.device-preview-stage{flex:1;min-height:0;display:flex;justify-content:center;align-items:flex-start;overflow:auto;padding:22px;background:#334155;}',
    '.device-preview-frame{height:100%;min-height:520px;border:0;background:#fff;box-shadow:0 10px 30px rgba(0,0,0,.35);}',
    '@media(max-width:600px){#device-preview-launcher{left:12px;bottom:12px;}.device-preview-toolbar strong{width:100%;}.device-preview-stage{padding:12px;}.device-preview-frame{min-height:440px;}}'
  ].join('');
  document.head.appendChild(style);

  // Create launcher button
  var launcher = document.createElement('button');
  launcher.id = 'device-preview-launcher';
  launcher.type = 'button';
  launcher.textContent = '\u{1F4F1} Preview';
  launcher.setAttribute('aria-label', 'Open device preview');

  // Create modal
  var modal = document.createElement('div');
  modal.id = 'device-preview-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Device preview');
  modal.innerHTML =
    '<div class="device-preview-panel">' +
      '<div class="device-preview-toolbar">' +
        '<strong>Device Preview</strong>' +
        '<button type="button" data-device="desktop">Desktop</button>' +
        '<button type="button" data-device="tablet">Tablet</button>' +
        '<button type="button" data-device="mobile">Mobile</button>' +
        '<button type="button" data-device="close">Close</button>' +
      '</div>' +
      '<div class="device-preview-stage"><iframe class="device-preview-frame" title="Website device preview"></iframe></div>' +
    '</div>';

  document.body.appendChild(launcher);
  document.body.appendChild(modal);

  var frame = modal.querySelector('.device-preview-frame');
  var buttons = modal.querySelectorAll('[data-device]');

  function showPreset(name) {
    var preset = presets[name];
    if (!preset) return;
    frame.style.width = preset.width + 'px';
    frame.src = window.location.href;
    buttons.forEach(function (button) {
      button.classList.toggle('is-active', button.getAttribute('data-device') === name);
    });
  }

  launcher.addEventListener('click', function () {
    modal.classList.add('is-open');
    showPreset('mobile');
  });

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var device = button.getAttribute('data-device');
      if (device === 'close') {
        modal.classList.remove('is-open');
        frame.src = 'about:blank';
      } else {
        showPreset(device);
      }
    });
  });

  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.classList.remove('is-open');
      frame.src = 'about:blank';
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      modal.classList.remove('is-open');
      frame.src = 'about:blank';
    }
  });
})();
