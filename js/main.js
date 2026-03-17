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
  
  // Quote wizard handling
  var wizardForm = document.getElementById('quoteWizard');
  if(wizardForm){
    var steps = Array.from(wizardForm.querySelectorAll('.wizard-step'));
    var indicators = document.querySelectorAll('.step-indicator');
    var current = 0;

    function showStep(index){
      steps.forEach(function(s,i){
        s.hidden = i!==index;
      });
      indicators.forEach(function(ind,i){
        ind.classList.toggle('active', i===index);
      });
      current = index;
    }

    // next/back buttons
    wizardForm.addEventListener('click', function(e){
      if(e.target.classList.contains('next-btn')){
        e.preventDefault();
        // simple validation: check required inputs in the visible step
        var visible = steps[current];
        var required = Array.from(visible.querySelectorAll('[required]'));
        var valid = required.every(function(inp){ return inp.value && inp.value.trim()!==''; });
        if(!valid){
          // highlight and stop
          required.forEach(function(r){ r.style.outline = r.value? '' : '2px solid #f39c12'; });
          return;
        }
        if(current < steps.length-1) showStep(current+1);
      }
      if(e.target.classList.contains('back-btn')){
        e.preventDefault();
        if(current>0) showStep(current-1);
      }
    });

    // submit handling
    wizardForm.addEventListener('submit', function(e){
      e.preventDefault();
      alert('Thanks — your request has been received (demo).');
      wizardForm.reset();
      showStep(0);
    });

    showStep(0);
  }

  // Equipment selection: toggle .selected on the label when a radio changes
  var equipmentRadios = document.querySelectorAll('#quoteWizard input[name="equipment"]');
  if(equipmentRadios.length){
    equipmentRadios.forEach(function(radio){
      var label = radio.closest('label');
      // on init, mark if checked
      if(radio.checked && label) label.classList.add('selected');
      radio.addEventListener('change', function(){
        // remove selected from all labels in the same form
        equipmentRadios.forEach(function(r){
          var l = r.closest('label'); if(l) l.classList.toggle('selected', r.checked);
        });
      });
      // allow clicking label to select (already native) but also keyboard focus
      if(label){
        label.addEventListener('keydown', function(e){ if(e.key==='Enter' || e.key===' ') { radio.checked = true; radio.dispatchEvent(new Event('change')); e.preventDefault(); }});
      }
    });
  }

  // Header behavior: keep header fixed and compute body padding
  var header = document.querySelector('.site-header');
  if(header){
    function setBodyPadding(){
      // ensure page content sits below the fixed header
      document.body.style.paddingTop = header.offsetHeight + 'px';
    }
    // set padding on load and after a short delay (fonts/images)
    setBodyPadding();
    setTimeout(setBodyPadding, 120);
    window.addEventListener('resize', setBodyPadding);

    // shrink on scroll toggles visual class only; do not change body padding
    function onScroll(){
      if(window.scrollY>80){
        header.classList.add('shrink');
      } else {
        header.classList.remove('shrink');
      }
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    // initial state
    onScroll();
  }
});
