// ---------- Officer data (rendered on the Home page only) ----------
const officers = [
  { name: "Caleb Molina", role: "Co-President", color: "#E85C8A", photo: "assets/caleb-molina.png" },
  { name: "Max H", role: "Co-President", color: "#C43F6C", defaultAvatar: true },
  { name: "Sharanya Nallajerla", role: "Vice President", color: "#6E8C64", photo: "assets/sharanya-nallajerla.jpeg" },
  { name: "Vivian Wu", role: "Vice President", color: "#6E8C64", photo: "assets/vivian-wu.jpeg" },
  { name: "Shresta Bethi", role: "Events & Campaign Coordinator", color: "#F2B84B" },
  { name: "Sai Viswanath Rajendranath Prabhu", role: "Director of Volunteering & Head of Web Development", color: "#2E1B2E", photo: "assets/sai-viswanath-rajendranath-prabhu.png" },
  { name: "Grace Molina", role: "Social Media & Content Creation Officer", color: "#E85C8A", photo: "assets/grace-molina.jpeg" },
  { name: "Adwita Nambiar", role: "Assistant Director of Content Creation", color: "#C43F6C" },
];

function initials(name){
  return name.split(" ").filter(Boolean).slice(0,2).map(w => w[0]).join("").toUpperCase();
}

const grid = document.getElementById("officerGrid");
if (grid) {
  officers.forEach(o => {
    const div = document.createElement("div");
    div.className = "officer";
    div.innerHTML = `
      <div class="avatar${o.defaultAvatar ? " default-avatar" : ""}" style="background:${o.defaultAvatar ? "" : o.color}">${o.photo ? `<img src="${o.photo}" alt="${o.name}">` : o.defaultAvatar ? `<svg viewBox="0 0 56 56" aria-label="Default profile avatar" role="img"><circle cx="28" cy="21" r="10" fill="#A39AA3"/><path d="M10 51c1.8-11 9.2-17 18-17s16.2 6 18 17" fill="#A39AA3"/></svg>` : initials(o.name)}</div>
      <h4>${o.name}</h4>
      <div class="role">${o.role}</div>
    `;
    grid.appendChild(div);
  });
}

// ---------- Mobile nav toggle ----------
const pillnav = document.getElementById("pillnav");
const navToggle = document.getElementById("navToggle");
if (pillnav && navToggle) {
  navToggle.addEventListener("click", () => {
    const open = pillnav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

// ---------- Pulse divider animation ----------
const pulseEls = document.querySelectorAll("[data-pulse]");
if (pulseEls.length) {
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      });
    }, { threshold: 0.4 });
    pulseEls.forEach(el => obs.observe(el));
  } else {
    pulseEls.forEach(el => el.classList.add("in-view"));
  }
}

// ---------- Form handling (Formspree) ----------
// Each form's `action` attribute points at a Formspree endpoint
// (https://formspree.io/f/YOUR_FORM_ID). Replace the placeholder IDs in
// contact.html and submit.html with your real Formspree endpoints.
function wireForm(formId, confirmId, errorId){
  const form = document.getElementById(formId);
  const confirm = document.getElementById(confirmId);
  const error = errorId ? document.getElementById(errorId) : null;
  if (!form || !confirm) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (error) error.classList.remove("show");

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        confirm.classList.add("show");
        form.reset();
        setTimeout(() => confirm.classList.remove("show"), 6000);
      } else if (error) {
        error.classList.add("show");
      }
    } catch (err) {
      if (error) error.classList.add("show");
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}
wireForm("articleForm", "articleConfirm", "articleError");
wireForm("contactForm", "contactConfirm", "contactError");
