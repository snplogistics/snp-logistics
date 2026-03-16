// Minimal JS: handle forms locally (no backend)
document.addEventListener('submit', function(e){
  const form = e.target;
  if(form.id==='contactForm' || form.id==='quoteForm' || form.classList.contains('upload-form')){
    e.preventDefault();
    alert('Thanks! This demo site does not send emails.');
    form.reset();
  }
});

// Smooth scroll / reveal contact section when clicking nav Contact link on homepage
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('a[href="contact.html"]').forEach(function(link){
    link.addEventListener('click', function(e){
      // only intercept when on the homepage
      if(window.location.pathname.endsWith('/index.html') || window.location.pathname==='/' || window.location.pathname.endsWith('index.html')){
        e.preventDefault();
        var target = document.getElementById('contact-section');
        if(target){
          // ensure section is visible then smooth scroll
          target.scrollIntoView({behavior:'smooth',block:'start'});
          // update history so users can link/share
          history.replaceState(null,'',window.location.pathname + '#contact');
        }
      }
    });
  });
});
