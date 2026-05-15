/* ============================================================
   Ice & Tao — Wedding Invitation
   Behaviors:
     0. Envelope intro (click to open, then fade)
     1. Scroll reveal (IntersectionObserver on [data-reveal])
     2. Countdown timer to 2026-06-27 07:09 Asia/Bangkok
     3. Video section autoplay when scrolled into view
     4. Audio consent popup (after envelope opens) + floating mute toggle
     5. Gallery lightbox (click to view full size)
     6. Petal particles drifting across the screen (slow + subtle)
   ============================================================ */


/* ---------- 4. VIDEO AUTOPLAY ON SCROLL ---------- */
(function setupVideoAutoplay() {
  const video = document.querySelector('[data-video-section]');
  if (!video) return;

  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduce) return;

  // muted + playsinline are already in the HTML — required for mobile autoplay
  const tryPlay = () => video.play().catch(() => {});

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) tryPlay();
          else video.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(video);
  } else {
    tryPlay();
  }
})();


/* ---------- 0. ENVELOPE INTRO ---------- */
(function setupEnvelope() {
  const screen = document.querySelector('[data-envelope-screen]');
  const opener = document.querySelector('[data-envelope-open]');
  if (!screen || !opener) {
    document.body.classList.remove('is-sealed');
    return;
  }

  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ANIM_MS = prefersReduce ? 320 : 2000;

  let opened = false;

  function open() {
    if (opened) return;
    opened = true;

    screen.classList.add('is-opening');

    window.setTimeout(() => {
      screen.classList.add('is-open');
      window.setTimeout(() => {
        if (screen.parentNode) screen.parentNode.removeChild(screen);
        document.body.classList.remove('is-sealed');
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle && typeof heroTitle.focus === 'function') {
          heroTitle.setAttribute('tabindex', '-1');
          heroTitle.focus({ preventScroll: true });
        }
      }, 700);
    }, ANIM_MS);
  }

  opener.addEventListener('click', open);
  screen.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  });
})();


/* ---------- 1. SCROLL REVEAL ---------- */
(function setupScrollReveal() {
  const reveals = document.querySelectorAll('[data-reveal]');
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || prefersReduce) {
    reveals.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  reveals.forEach((el) => io.observe(el));
})();


/* ---------- 2. COUNTDOWN TIMER ----------
   Target: 2026-06-27 07:09:00 Asia/Bangkok (+07:00).
   Updates every second. Stops at zero; shows passed-message after.
   ----------------------------------------------------------- */
(function setupCountdown() {
  const root = document.querySelector('[data-countdown]');
  if (!root) return;

  const elDays    = root.querySelector('[data-cd-days]');
  const elHours   = root.querySelector('[data-cd-hours]');
  const elMinutes = root.querySelector('[data-cd-minutes]');
  const elSeconds = root.querySelector('[data-cd-seconds]');
  const passed    = document.querySelector('[data-countdown-passed]');

  // Asia/Bangkok is UTC+7 (no DST). 07:09 ICT = 00:09 UTC.
  const TARGET_MS = Date.UTC(2026, 5, 27, 0, 9, 0); // months are 0-indexed: 5 = June

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  let firstRun = true;
  const ANIM_MS = 380;

  function makeSlot(ch) {
    const slot = document.createElement('span');
    slot.className = 'countdown__slot';
    const digit = document.createElement('span');
    digit.className = 'countdown__digit';
    digit.textContent = ch;
    slot.appendChild(digit);
    return slot;
  }

  /**
   * Set a countdown value with per-digit animation.
   * Each digit position is its own slot. When the value changes:
   *   - Only the digit positions whose character changed will animate.
   *   - Example: 51 → 52 animates only the "1" → "2" slot.
   *              59 → 00 animates both slots.
   * If the digit count itself changes (e.g. 100 → 99), the structure
   * is rebuilt and every visible digit animates in.
   * On first paint we skip animation and set values immediately.
   */
  function setVal(container, val) {
    if (!container) return;
    const newStr = String(val);
    const slots = Array.from(container.querySelectorAll('.countdown__slot'));

    // First paint OR digit count changed → rebuild structure
    if (firstRun || slots.length !== newStr.length) {
      container.textContent = '';
      for (const ch of newStr) {
        const slot = makeSlot(ch);
        container.appendChild(slot);
        if (!firstRun) {
          const digit = slot.querySelector('.countdown__digit');
          digit.classList.add('countdown__digit--in');
          window.setTimeout(() => digit.classList.remove('countdown__digit--in'), ANIM_MS);
        }
      }
      return;
    }

    // Same digit count → diff position-by-position, animate only changed slots
    for (let i = 0; i < newStr.length; i++) {
      const slot = slots[i];
      const current = slot.querySelector('.countdown__digit:not(.countdown__digit--out)');
      const newChar = newStr[i];
      if (current && current.textContent === newChar) continue;

      if (current) {
        current.classList.add('countdown__digit--out');
        const stale = current;
        window.setTimeout(() => {
          if (stale.parentNode) stale.parentNode.removeChild(stale);
        }, ANIM_MS);
      }

      const incoming = document.createElement('span');
      incoming.className = 'countdown__digit countdown__digit--in';
      incoming.textContent = newChar;
      slot.appendChild(incoming);
      window.setTimeout(() => incoming.classList.remove('countdown__digit--in'), ANIM_MS);
    }
  }

  function tick() {
    const now = Date.now();
    const diff = TARGET_MS - now;

    if (diff <= 0) {
      setVal(elDays, '0');
      setVal(elHours, '00');
      setVal(elMinutes, '00');
      setVal(elSeconds, '00');
      if (passed) passed.hidden = false;
      firstRun = false;
      return false;
    }

    const sec = Math.floor(diff / 1000);
    const days = Math.floor(sec / 86400);
    const hours = Math.floor((sec % 86400) / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;

    setVal(elDays,    String(days));
    setVal(elHours,   pad(hours));
    setVal(elMinutes, pad(minutes));
    setVal(elSeconds, pad(seconds));
    firstRun = false;
    return true;
  }

  if (tick()) {
    const interval = window.setInterval(() => {
      if (!tick()) window.clearInterval(interval);
    }, 1000);
  }
})();


/* ---------- 5. AUDIO CONSENT POPUP + FLOATING TOGGLE ---------- */
(function setupAudioConsent() {
  const audio = document.querySelector('[data-bg-audio]');
  const modal = document.querySelector('[data-consent-modal]');
  const yesBtns = document.querySelectorAll('[data-consent-yes]');
  const noBtns = document.querySelectorAll('[data-consent-no]');
  const toggle = document.querySelector('[data-audio-toggle]');

  if (!audio || !modal) return;

  let playing = false;

  audio.volume = 0.4;

  function showModal() {
    modal.hidden = false;
    void modal.offsetWidth;
    modal.classList.add('is-visible');
  }

  function hideModal() {
    modal.classList.remove('is-visible');
    window.setTimeout(() => { modal.hidden = true; }, 360);
  }

  function setToggleState(state) {
    if (!toggle) return;
    toggle.hidden = false;
    toggle.dataset.state = state;
    toggle.setAttribute('aria-pressed', state === 'playing' ? 'true' : 'false');
    toggle.setAttribute(
      'aria-label',
      state === 'playing' ? 'Pause ambient music' : 'Play ambient music'
    );
  }

  yesBtns.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await audio.play();
        playing = true;
        setToggleState('playing');
      } catch (err) {
        setToggleState('paused');
      }
      hideModal();
    });
  });

  noBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setToggleState('paused');
      hideModal();
    });
  });

  // Floating toggle: user can mute/unmute any time after consent is dismissed
  if (toggle) {
    toggle.addEventListener('click', async () => {
      try {
        if (playing) {
          audio.pause();
          playing = false;
          setToggleState('paused');
        } else {
          await audio.play();
          playing = true;
          setToggleState('playing');
        }
      } catch (err) {
        // Silent: keep current state
      }
    });
  }

  // Pause when tab is hidden, resume when shown (only if it was playing)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && playing) {
      audio.pause();
    } else if (!document.hidden && playing) {
      audio.play().catch(() => {});
    }
  });

  // Trigger the consent popup once the envelope has finished opening.
  // The envelope script removes the `is-sealed` class from <body> when done.
  function maybeShow() {
    if (!document.body.classList.contains('is-sealed')) {
      window.setTimeout(showModal, 500);
      return true;
    }
    return false;
  }

  if (!maybeShow()) {
    const observer = new MutationObserver(() => {
      if (maybeShow()) observer.disconnect();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }
})();


/* ---------- 6. GALLERY LIGHTBOX ---------- */
(function setupLightbox() {
  const lightbox = document.querySelector('[data-lightbox]');
  if (!lightbox) return;

  const imgEl    = lightbox.querySelector('[data-lightbox-img]');
  const captionEl = lightbox.querySelector('[data-lightbox-caption]');
  const counterEl = lightbox.querySelector('[data-lightbox-counter]');
  const closeBtn = lightbox.querySelector('[data-lightbox-close]');
  const prevBtn  = lightbox.querySelector('[data-lightbox-prev]');
  const nextBtn  = lightbox.querySelector('[data-lightbox-next]');

  const items = Array.from(document.querySelectorAll('.gallery__item'));
  if (items.length === 0) return;

  let currentIdx = -1;
  let lastFocused = null;

  // Map -800 / -1200 / -2400 → biggest available (-2400 by convention)
  function biggestVariant(src) {
    return src.replace(/-(800|1080|1200)\.webp$/i, '-2400.webp');
  }

  function open(idx) {
    if (idx < 0 || idx >= items.length) return;
    currentIdx = idx;
    const figure = items[idx];
    const inner  = figure.querySelector('img');
    if (!inner) return;

    lastFocused = document.activeElement;

    imgEl.src = biggestVariant(inner.src);
    imgEl.alt = inner.alt || '';
    captionEl.textContent = inner.alt || '';
    counterEl.textContent = `${idx + 1} / ${items.length}`;

    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    void lightbox.offsetWidth;
    lightbox.classList.add('is-visible');

    // Move focus into the modal for keyboard users
    window.setTimeout(() => closeBtn?.focus(), 0);
  }

  function close() {
    lightbox.classList.remove('is-visible');
    document.body.style.overflow = '';
    window.setTimeout(() => {
      lightbox.hidden = true;
      imgEl.removeAttribute('src');
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus({ preventScroll: true });
      }
    }, 300);
    currentIdx = -1;
  }

  function prev() {
    if (currentIdx < 0) return;
    open((currentIdx - 1 + items.length) % items.length);
  }
  function next() {
    if (currentIdx < 0) return;
    open((currentIdx + 1) % items.length);
  }

  items.forEach((fig, i) => {
    fig.setAttribute('role', 'button');
    fig.setAttribute('tabindex', '0');
    fig.setAttribute('aria-label', `View photo ${i + 1} of ${items.length}`);
    fig.addEventListener('click', () => open(i));
    fig.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(i);
      }
    });
  });

  closeBtn?.addEventListener('click', close);
  prevBtn?.addEventListener('click', (e) => { e.stopPropagation(); prev(); });
  nextBtn?.addEventListener('click', (e) => { e.stopPropagation(); next(); });

  // Backdrop click (anywhere except the image + buttons)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox__figure')) {
      close();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
  });

  // Basic swipe gesture on touch
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 60) return;
    if (dx > 0) prev(); else next();
  }, { passive: true });
})();


/* ---------- 7. PETAL PARTICLES ---------- */
(function setupPetals() {
  const root = document.querySelector('[data-petals]');
  if (!root) return;

  // Respect reduced-motion preference (also hidden in CSS, but skip JS too)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const MAX_ON_SCREEN = 12;     // max concurrent petals
  const MIN_DELAY_MS  = 1000;  // min delay between spawns
  const MAX_DELAY_MS  = 5500;  // max delay between spawns
  let active = 0;
  let timer = null;

  function rand(min, max) { return min + Math.random() * (max - min); }

  function spawn() {
    if (active >= MAX_ON_SCREEN || document.hidden) return;

    const petal = document.createElement('span');
    petal.className = 'petal';

    const startX     = rand(-2, 100);              // vw
    const drift      = rand(-140, 140);            // px horizontal drift
    const dur        = rand(14, 26);               // fall duration (s)
    const size       = rand(12, 22);               // px
    const rotStart   = rand(0, 360);               // deg
    const rotEnd     = rotStart + rand(360, 1080); // 1–3 rotations
    const opacity    = rand(0.35, 0.65);

    petal.style.left = `${startX}vw`;
    petal.style.width = petal.style.height = `${size}px`;
    petal.style.setProperty('--drift', `${drift}px`);
    petal.style.setProperty('--fall-dur', `${dur}s`);
    petal.style.setProperty('--rot-start', `${rotStart}deg`);
    petal.style.setProperty('--rot-end', `${rotEnd}deg`);
    petal.style.setProperty('--peak-opacity', String(opacity));

    root.appendChild(petal);
    active++;

    petal.addEventListener('animationend', () => {
      petal.remove();
      active--;
    });
  }

  function tick() {
    spawn();
    timer = window.setTimeout(tick, rand(MIN_DELAY_MS, MAX_DELAY_MS));
  }

  // Start petals once the envelope has finished opening.
  function maybeStart() {
    if (!document.body.classList.contains('is-sealed')) {
      window.setTimeout(tick, 1500);
      return true;
    }
    return false;
  }

  if (!maybeStart()) {
    const observer = new MutationObserver(() => {
      if (maybeStart()) observer.disconnect();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  // Pause spawning when tab is hidden (battery friendly)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (timer) { clearTimeout(timer); timer = null; }
    } else if (!timer && !document.body.classList.contains('is-sealed')) {
      tick();
    }
  });
})();


