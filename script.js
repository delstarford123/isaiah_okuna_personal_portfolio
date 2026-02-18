// Small interactive helpers for the portfolio
document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle && navToggle.addEventListener('click', () => navLinks.classList.toggle('show'));

function copyEmail(){
  const email = 'delstarford@example.com';
  if(navigator.clipboard){
    navigator.clipboard.writeText(email).then(() => {
      showStatus('Email copied to clipboard');
    });
  } else {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = email;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showStatus('Email copied to clipboard');
  }
}

function showStatus(msg){
  const el = document.getElementById('form-status');
  if(!el) return;
  el.textContent = msg;
  setTimeout(()=> el.textContent = '', 4500);
}

// Contact form handler: graceful local handling and mailto fallback.
// This avoids shipping a backend; swap in your API endpoint when available.
function handleContactSubmit(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if(!name || !email || !message){
    showStatus('Please complete all fields');
    return false;
  }

  // Attempt to open user's mail client with prefilled message as fallback
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  const mailto = `mailto:delstarford@example.com?subject=${subject}&body=${body}`;
  window.location.href = mailto;

  showStatus('Opening mail client to send message');
  return false;
}