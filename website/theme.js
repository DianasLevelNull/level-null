(function(){
  const defaultHref = 'website/styles.css';
  const funHref = 'website/funstyle.css';
  const link = document.getElementById('theme-stylesheet');
  function setTheme(href){
    if(link) link.setAttribute('href', href);
    try{ localStorage.setItem('theme', href); }catch(e){}
  }
  // On load, apply saved theme (if any)
  try{
    const saved = localStorage.getItem('theme');
    if(saved && link) link.setAttribute('href', saved);
  }catch(e){}

  // Attach toggle if present
  const toggle = document.getElementById('mode-toggle');
  if(toggle){
    toggle.addEventListener('click', function(e){
      e.preventDefault();
      const current = link ? link.getAttribute('href') : defaultHref;
      setTheme(current === funHref ? defaultHref : funHref);
    });
  }
})();
