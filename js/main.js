// Minimal JS: handle forms locally (no backend)
document.addEventListener('submit', function(e){
  const form = e.target;
  if(form.id==='contactForm' || form.id==='quoteForm' || form.classList.contains('upload-form')){
    e.preventDefault();
    alert('Thanks! This demo site does not send emails.');
    form.reset();
  }
});
