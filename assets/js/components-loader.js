(function () {
    async function loadComponent(id, file) {
      const el = document.getElementById(id)
      if (!el) return
  
      try {
        const res = await fetch(`./components/${file}`)
        if (!res.ok) throw new Error(file)
        el.innerHTML = await res.text()
      } catch (e) {
        console.warn(`Component not loaded: ${file}`)
      }
    }
  
    if (!window.pageComponents) return
  
    window.pageComponents.forEach(c => loadComponent(c.id, c.file))
  })()
  

  (function () {
    function scrollToHash() {
      const hash = window.location.hash;
      if (!hash) return;

      const target = document.querySelector(hash);
      if (!target) {
        // on réessaie un peu plus tard (composants pas encore chargés)
        setTimeout(scrollToHash, 100);
        return;
      }

      target.scrollIntoView({ behavior: 'smooth' });
    }

    window.addEventListener('load', scrollToHash);
  })();