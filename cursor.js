// PeeCr8s — premium trailing cursor (accent ring that lags behind the native pointer)
(function () {
  var mq = window.matchMedia;
  // skip on touch devices and for users who prefer reduced motion
  if (mq && mq('(pointer: coarse)').matches) return;
  if (mq && mq('(prefers-reduced-motion: reduce)').matches) return;

  var style = document.createElement('style');
  style.textContent =
    '.pc-ring{position:fixed;top:0;left:0;width:30px;height:30px;border:1.5px solid rgba(201,243,29,.45);' +
    'border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);' +
    'will-change:transform;transition:width .25s ease,height .25s ease,border-color .25s ease,' +
    'background-color .25s ease,opacity .3s ease}' +
    '.pc-ring.pc-hover{width:52px;height:52px;border-color:#c9f31d;background-color:rgba(201,243,29,.10)}' +
    '.pc-ring.pc-hide{opacity:0}';
  document.head.appendChild(style);

  var ring = document.createElement('div');
  ring.className = 'pc-ring pc-hide';
  document.body.appendChild(ring);

  var mx = window.innerWidth / 2, my = window.innerHeight / 2;
  var rx = mx, ry = my, started = false;

  window.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    if (!started) { started = true; ring.classList.remove('pc-hide'); }
  }, { passive: true });

  window.addEventListener('mouseout', function (e) {
    if (!e.relatedTarget) ring.classList.add('pc-hide');
  });

  function loop() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  var sel = 'a,button,input,textarea,select,.work-card,.service-row,.btn-circle,.social-link,.skill-tag,.nav-cta';
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest && e.target.closest(sel)) ring.classList.add('pc-hover');
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest && e.target.closest(sel)) ring.classList.remove('pc-hover');
  });
})();
