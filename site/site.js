/* =========================================================
   Three Cities Social — shared page behaviors.
   Everything is gated on element presence, so any page can
   include this file and only pick up what it uses.
   ========================================================= */
(function () {
  'use strict';

  /* Newsletter signups post to the same Apps Script web app as the
     membership form. It records every field it receives and emails
     the team on each submission. */
  var GSCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxxYxqizKYnKEKIdQv3JmsL4tK9-S2HbgS5BhrjCeB7p_u8nq_pZd95-CxxtsvAPRW-Kg/exec';

  var reducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Email capture: any form marked data-signup ---------- */
  function wireSignup(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.querySelector('input[name="email"]');
      if (!email || !email.value || email.value.indexOf('@') < 1) {
        if (email) email.focus();
        return;
      }
      var data = new FormData(form);
      data.append('form_name', form.getAttribute('data-signup-name') || 'Guest List Signup');
      data.append('page', form.getAttribute('data-signup-page') || document.title);
      var btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      fetch(GSCRIPT_URL, { method: 'POST', mode: 'no-cors', body: data })
        .catch(function () { /* no-cors always resolves opaque; ignore */ })
        .then(function () {
          form.classList.add('is-done');
          try { localStorage.setItem('tcs_subscribed', '1'); } catch (err) {}
        });
    });
  }
  document.querySelectorAll('form[data-signup]').forEach(wireSignup);

  /* ---------- Hero headline: masked word-by-word rise ---------- */
  var split = document.querySelector('.js-split');
  if (split && !reducedMotion) {
    var delay = 0;
    function splitNode(node, parent) {
      if (node.nodeType === 3) {
        var frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(function (piece) {
          if (!piece.length) return;
          if (/^\s+$/.test(piece)) { frag.appendChild(document.createTextNode(' ')); return; }
          var w = document.createElement('span');
          w.className = 'w';
          var inner = document.createElement('span');
          inner.className = 'w-in';
          inner.style.setProperty('--wd', delay + 'ms');
          inner.textContent = piece;
          delay += 70;
          w.appendChild(inner);
          frag.appendChild(w);
        });
        parent.replaceChild(frag, node);
      } else if (node.nodeType === 1) {
        Array.prototype.slice.call(node.childNodes).forEach(function (child) {
          splitNode(child, node);
        });
      }
    }
    Array.prototype.slice.call(split.childNodes).forEach(function (child) {
      splitNode(child, split);
    });
  }

  /* ---------- Parallax drift on full-bleed photography ---------- */
  var parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !reducedMotion) {
    var ticking = false;
    function parallax() {
      parallaxEls.forEach(function (el) {
        var rect = el.parentElement.getBoundingClientRect();
        var vh = window.innerHeight;
        if (rect.bottom < 0 || rect.top > vh) return;
        var progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        var depth = parseFloat(el.getAttribute('data-parallax')) || 0.12;
        el.style.transform = 'translateY(' + (progress * depth * -100).toFixed(2) + 'px) scale(1.12)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
    }, { passive: true });
    parallax();
  }


  /* ---------- Capture modal: one soft invitation per visitor ---------- */
  var modal = document.getElementById('capture-modal');
  if (modal) {
    var SEEN_KEY = 'tcs_capture_seen';
    var TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;
    var shown = false;

    function alreadyHandled() {
      try {
        if (localStorage.getItem('tcs_subscribed')) return true;
        var seen = parseInt(localStorage.getItem(SEEN_KEY) || '0', 10);
        return seen && (Date.now() - seen) < TWO_WEEKS;
      } catch (err) { return false; }
    }

    function openModal() {
      if (shown || alreadyHandled()) return;
      shown = true;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      try { localStorage.setItem(SEEN_KEY, String(Date.now())); } catch (err) {}
    }
    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    modal.querySelectorAll('[data-capture-close]').forEach(function (el) {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
    var modalForm = modal.querySelector('form[data-signup]');
    if (modalForm) {
      modalForm.addEventListener('submit', function () {
        setTimeout(closeModal, 2200);
      });
    }

    if (!alreadyHandled()) {
      var timer = setTimeout(openModal, 22000);
      var scrollTrigger = function () {
        var scrolled = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
        if (scrolled > 0.45) {
          clearTimeout(timer);
          window.removeEventListener('scroll', scrollTrigger);
          openModal();
        }
      };
      window.addEventListener('scroll', scrollTrigger, { passive: true });
    }
  }
})();
