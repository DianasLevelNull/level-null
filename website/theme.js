(function(){
  const link = document.getElementById('theme-stylesheet');
  const toggle = document.getElementById('mode-toggle');
  if(!link || !toggle) return;

  // Derzeitiger href (wie in HTML gesetzt). Das ist der "defaultHref" für diese Seite.
  const defaultHref = link.getAttribute('href');

  // Berechne Funstyle-Href relativ zum defaultHref:
  function computeFunHref(href){
    // Wenn href beginnt mit 'website/' (root index nutzt 'website/styles.css')
    if(href.startsWith('website/')){
      return 'funstyle.css'; // root funstyle liegt im Projekt-Root
    }
    // Wenn href enthält '../' (z.B. '../styles.css' in pages), dann gehe eine Ebene weiter nach oben
    const upMatches = href.match(/^(\.\.\/)*/);
    const ups = upMatches && upMatches[0] ? (upMatches[0].match(/\.\.\//g) || []).length : 0;
    // wir müssen eine Ebene mehr hoch, um zum Projektroot zu gelangen
    return '../'.repeat(ups + 1) + 'funstyle.css';
  }

  const funHref = computeFunHref(defaultHref);

  // Apply saved theme on load
  try{
    const saved = localStorage.getItem('theme-href');
    if(saved){
      // saved is the href string we previously set; apply only if it matches expected patterns
      link.setAttribute('href', saved);
      toggle.setAttribute('aria-pressed', saved === funHref ? 'true' : 'false');
    }
  }catch(e){/* ignore */}

  // Toggle handler
  toggle.addEventListener('click', function(e){
    e.preventDefault();
    const current = link.getAttribute('href');
    const newHref = current === funHref ? defaultHref : funHref;
    link.setAttribute('href', newHref);
    try{ localStorage.setItem('theme-href', newHref); }catch(e){}
    toggle.setAttribute('aria-pressed', newHref === funHref ? 'true' : 'false');
  });
})();
