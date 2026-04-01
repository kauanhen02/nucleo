/* ============================================================
   NÚCLEO FACILITIES — main.js
   ============================================================ */

/* ── Navegação SPA ── */
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => a.classList.remove('active'));

  const pageEl = document.getElementById('page-' + page);
  if (!pageEl) return;
  pageEl.classList.add('active');

  const navEl  = document.getElementById('nav-'  + page);
  const mnavEl = document.getElementById('mnav-' + page);
  if (navEl)  navEl.classList.add('active');
  if (mnavEl) mnavEl.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Menu mobile ── */
function toggleMenu() {
  const menu   = document.getElementById('mobile-menu');
  const btn    = document.getElementById('hamburger');
  const isOpen = menu.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

/* ── Formulário de Contato — Web3Forms ── */
(function () {
  'use strict';

  function maskPhone(input) {
    input.addEventListener('input', function () {
      let v = this.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 10)      v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      else if (v.length > 6)  v = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
      else if (v.length > 2)  v = v.replace(/^(\d{2})(\d+)$/, '($1) $2');
      else if (v.length > 0)  v = v.replace(/^(\d+)$/, '($1');
      this.value = v;
    });
  }

  function validateField(el) {
    const group = el.closest('.form-group');
    const errEl = group && group.querySelector('.field-error');
    let msg = '';

    if (!el.value.trim()) {
      msg = 'Este campo é obrigatório.';
    } else if (el.type === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) msg = 'Informe um e-mail válido.';
    } else if (el.name === 'phone') {
      if (el.value.replace(/\D/g, '').length < 10) msg = 'Informe um telefone válido.';
    }

    if (errEl) { errEl.textContent = msg; errEl.style.display = msg ? 'block' : 'none'; }
    if (group) { group.classList.toggle('field-invalid', !!msg); }
    return !msg;
  }

  function initForm() {
    const form = document.getElementById('contato-form');
    if (!form) return;

    const phoneInput = form.querySelector('[name="phone"]');
    if (phoneInput) maskPhone(phoneInput);

    form.querySelectorAll('input:not([type=hidden]), textarea').forEach(el => {
      el.addEventListener('blur',  () => validateField(el));
      el.addEventListener('input', () => {
        const g = el.closest('.form-group');
        if (g && g.classList.contains('field-invalid')) validateField(el);
      });
    });

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const fields   = [...form.querySelectorAll('input:not([type=hidden]), textarea')];
      const allValid = fields.every(f => validateField(f));
      if (!allValid) { form.querySelector('.field-invalid input, .field-invalid textarea').focus(); return; }

      if (form.querySelector('[name="_honey"]').value) return;

      const btn     = form.querySelector('.btn-enviar');
      const success = document.getElementById('form-success');
      const errBox  = document.getElementById('form-error');

      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> Enviando...';
      if (errBox) errBox.style.display = 'none';

      try {
        const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) });
        const json = await res.json();

        if (json.success) {
          form.reset();
          form.style.display = 'none';
          if (success) success.style.display = 'flex';
        } else {
          throw new Error(json.message || 'Erro.');
        }
      } catch {
        if (errBox) {
          errBox.textContent = 'Não foi possível enviar a mensagem. Por favor, tente novamente ou entre em contato por WhatsApp.';
          errBox.style.display = 'block';
        }
        btn.disabled = false;
        btn.innerHTML = 'Enviar mensagem';
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initForm);
  else initForm();
})();

/* ── Carrossel de Serviços ── */
(function () {
  'use strict';

  function initCarousel() {
    const track    = document.getElementById('srvCarouselTrack');
    const dotsWrap = document.getElementById('srvCarouselDots');
    if (!track || !dotsWrap) return;

    const slides     = track.querySelectorAll('.srv-carousel-slide');
    const total      = slides.length;
    let current      = 0;
    let visibleCount = getVisible();
    let autoTimer    = null;

    function getVisible() {
      if (window.innerWidth <= 600) return 1;
      if (window.innerWidth <= 900) return 2;
      return 3;
    }

    // Criar dots
    dotsWrap.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'srv-carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }

    function goTo(index) {
      const maxIndex = total - visibleCount;
      current = Math.max(0, Math.min(index, maxIndex));
      const slideW = slides[0].getBoundingClientRect().width || (track.parentElement.offsetWidth / visibleCount);
      track.style.transform = 'translateX(-' + (current * slideW) + 'px)';
      dotsWrap.querySelectorAll('.srv-carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    function next() { goTo(current + 1 >= total - visibleCount + 1 ? 0 : current + 1); }
    function prev() { goTo(current - 1 < 0 ? total - visibleCount : current - 1); }

    document.querySelector('.srv-carousel-prev').addEventListener('click', () => { prev(); resetAuto(); });
    document.querySelector('.srv-carousel-next').addEventListener('click', () => { next(); resetAuto(); });

    function startAuto() { autoTimer = setInterval(next, 4500); }
    function resetAuto()  { clearInterval(autoTimer); startAuto(); }

    // Touch/swipe
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend',   e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); resetAuto(); }
    });

    window.addEventListener('resize', () => {
      visibleCount = getVisible();
      goTo(current);
    });

    startAuto();
    goTo(0);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCarousel);
  else initCarousel();
})();
