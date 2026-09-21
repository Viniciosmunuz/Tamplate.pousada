// animations.js — recrie aqui as animações descritas em referencia/animations.md
// Política: ver STARTER.md §4. GSAP é local (./gsap.min.js), nunca CDN.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.registerPlugin(ScrollTrigger);

  // Exemplo — substitua pelos seletores reais do projeto:
  // gsap.from('#hero h1', { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out' });
  // gsap.utils.toArray('.reveal').forEach((el) => {
  //   gsap.from(el, { y: 32, opacity: 0, duration: 0.7, ease: 'power2.out',
  //     scrollTrigger: { trigger: el, start: 'top 85%' } });
  // });
}
