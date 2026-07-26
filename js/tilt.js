/* Lightweight 3D tilt-on-hover, no dependencies.
   Usage: add data-tilt to any element. Optional data-tilt-max (degrees, default 8). */
(function () {
  function initTilt(el) {
    var max = parseFloat(el.getAttribute('data-tilt-max')) || 8;
    el.style.transformStyle = 'preserve-3d';
    el.style.willChange = 'transform';
    el.style.transition = 'transform .15s ease-out';

    el.addEventListener('mousemove', function (e) {
      var rect = el.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width;
      var y = (e.clientY - rect.top) / rect.height;
      var rotateY = (x - 0.5) * max * 2;
      var rotateX = (0.5 - y) * max * 2;
      el.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02,1.02,1.02)';
    });

    el.addEventListener('mouseleave', function () {
      el.style.transition = 'transform .4s cubic-bezier(.03,.98,.52,.99)';
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    });

    el.addEventListener('mouseenter', function () {
      el.style.transition = 'transform .15s ease-out';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
    var els = document.querySelectorAll('[data-tilt]');
    for (var i = 0; i < els.length; i++) initTilt(els[i]);
  });
})();
