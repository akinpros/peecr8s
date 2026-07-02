// PeeCr8s — custom cursor: lime dot + trailing ring (matches dark/lime theme)
(function () {
  // skip only on true touch-only devices (no hover capability)
  try { if (window.matchMedia('(hover: none)').matches) return; } catch (e) {}

  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  var style = document.createElement('style');
  style.textContent =
    'html.pc-cursor, html.pc-cursor *{cursor:none!important}' +
    '.pc-dot,.pc-ring{position:fixed;top:0;left:0;pointer-events:none;z-index:2147483647;' +
      'transform:translate(-50%,-50%);will-change:transform}' +
    '.pc-dot{width:8px;height:8px;border-radius:50%;background:#c9f31d;' +
      'box-shadow:0 0 10px rgba(201,243,29,.8);transition:width .2s,height .2s,opacity .3s}' +
    '.pc-ring{width:38px;height:38px;border-radius:50%;border:1.5px solid rgba(201,243,29,.6);' +
      'transition:width .25s ease,height .25s ease,border-color .25s ease,background-color .25s ease,opacity .3s}' +
    '.pc-hover .pc-ring{width:64px;height:64px;border-color:#c9f31d;background:rgba(201,243,29,.08)}' +
    '.pc-hover .pc-dot{width:4px;height:4px}' +
    '.pc-down .pc-ring{width:30px;height:30px}' +
    '.pc-hidden .pc-dot,.pc-hidden .pc-ring{opacity:0}';
  document.head.appendChild(style);

  var dot = document.createElement('div');  dot.className = 'pc-dot';
  var ring = document.createElement('div'); ring.className = 'pc-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);
  document.documentElement.classList.add('pc-cursor', 'pc-hidden');

  var mx = -100, my = -100, rx = -100, ry = -100, shown = false;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
    if (reduce) ring.style.transform = dot.style.transform;
    if (!shown) { shown = true; document.documentElement.classList.remove('pc-hidden'); }
  }, { passive: true });

  document.addEventListener('mouseleave', function () {
    document.documentElement.classList.add('pc-hidden');
  });
  document.addEventListener('mouseenter', function () {
    if (shown) document.documentElement.classList.remove('pc-hidden');
  });

  document.addEventListener('mousedown', function () { document.documentElement.classList.add('pc-down'); });
  document.addEventListener('mouseup',   function () { document.documentElement.classList.remove('pc-down'); });

  if (!reduce) {
    (function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
  }

  var sel = 'a,button,input,textarea,select,label,.work-card,.service-row,.btn-circle,.social-link,.skill-tag,.nav-cta,.hamburger';
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest && e.target.closest(sel)) document.documentElement.classList.add('pc-hover');
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest && e.target.closest(sel)) document.documentElement.classList.remove('pc-hover');
  });
})();
