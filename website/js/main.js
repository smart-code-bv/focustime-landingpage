// Site chrome. Deliberately minimal — the page should work without any of this.

// The header sits transparent over the hero and turns solid once you scroll past it.
// A sentinel element is cheaper and smoother than a scroll listener.
(function initHeader() {
  const header = document.getElementById('site-header');
  const sentinel = document.getElementById('hero-sentinel');
  if (!header || !sentinel || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      header.classList.toggle('is-solid', scrolledPast);
    },
    { threshold: 0 }
  );

  observer.observe(sentinel);
})();
