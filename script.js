const nav = document.querySelector('.nav');
document.querySelector('.menu-toggle').addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const tabs = document.querySelectorAll('.package-tab');
const panels = document.querySelectorAll('.package-panel');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.package;
    tabs.forEach(t => t.classList.toggle('active', t === tab));
    panels.forEach(panel => panel.classList.toggle('active', panel.id === `package-${target}`));
  });
});

const addResult = document.getElementById('addonResult');
const addonText = {
  "1":"Tambahan 1 goodie bag dapat digunakan untuk kebutuhan khusus seperti speaker, guest, atau panitia.",
  "5":"Tambahan +5 goodie bag cocok untuk menambah value package tanpa mengubah kebutuhan utama event.",
  "10":"Tambahan +10 goodie bag cocok untuk event dengan jumlah peserta atau kebutuhan hadiah yang lebih besar.",
  "custom":"Custom quantity dapat dibicarakan berdasarkan jumlah peserta, merchandise, budget, dan konsep event."
};
document.querySelectorAll('.addon-option').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.addon-option').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    addResult.textContent = addonText[btn.dataset.add];
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('collabForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const message = `Halo RFT Tenant,%0A%0ASaya ${form.get('name')} dari ${form.get('event')}.%0AJumlah peserta: ${form.get('participants')} orang.%0AKebutuhan: ${form.get('need')}.%0ACatatan: ${form.get('notes') || '-'}%0A%0ASaya ingin berdiskusi mengenai sponsorship/collaboration.`;
  const url = `https://wa.me/+6285806872208?text=${message}`;
  document.getElementById('formStatus').innerHTML = `Form siap dikirim. <a href="${url}" target="_blank" rel="noopener" style="text-decoration:underline">Klik di sini untuk membuka WhatsApp →</a>`;
});