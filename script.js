const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('dasu-theme');
if (savedTheme === 'dark') root.dataset.theme = 'dark';
themeToggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? '' : 'dark';
  localStorage.setItem('dasu-theme', root.dataset.theme || 'light');
});

const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
  menuToggle.textContent = open ? '×' : '☰';
});
document.querySelectorAll('.mobile-menu a').forEach(link => link.addEventListener('click', () => {
  mobileMenu.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.textContent = '☰';
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
},{threshold:.14});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || entry.target.dataset.done) return;
    const target = Number(entry.target.dataset.counter); let current = 0;
    const duration = 1100; const start = performance.now();
    const step = now => { const progress = Math.min((now-start)/duration,1); current = Math.floor(target*(1-Math.pow(1-progress,3))); entry.target.textContent=current; if(progress<1) requestAnimationFrame(step); else {entry.target.textContent=target;entry.target.dataset.done='true';}};
    requestAnimationFrame(step);
  });
},{threshold:.5});
document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

const cases = {
  business:{title:'Business Insights Dashboard',challenge:'Performance data lived across multiple sources, making it difficult to quickly spot operational bottlenecks or compare KPIs.',approach:'Collected, cleaned, and analyzed the data, then designed a Power BI dashboard focused on the metrics decision-makers needed most.',result:'Created clearer KPI visibility and reduced reporting time by 25%.'},
  dig:{title:'Digital Insights Group Case Study',challenge:'The team needed a clearer way to evaluate performance and identify where pricing choices were limiting potential revenue.',approach:'Used Excel, Python, and Tableau to explore performance patterns, test pricing signals, and visualize the key opportunities.',result:'Produced recommendations tied to a projected 15% revenue improvement.'},
  lead:{title:'Lead & Market Research Project',challenge:'Potential client research and segment tracking were fragmented, slowing down prioritization and follow-up.',approach:'Built a structured pipeline tracker and automated reporting workflow using Excel and SQL-supported research processes.',result:'Improved the speed of market research and lead identification by 30%.'}
};
const modal=document.getElementById('caseModal');
document.querySelectorAll('.case-button').forEach(btn=>btn.addEventListener('click',()=>{const data=cases[btn.dataset.case];document.getElementById('modalTitle').textContent=data.title;document.getElementById('modalChallenge').textContent=data.challenge;document.getElementById('modalApproach').textContent=data.approach;document.getElementById('modalResult').textContent=data.result;modal.showModal();}));
document.querySelector('.modal-close').addEventListener('click',()=>modal.close());
modal.addEventListener('click', e=>{if(e.target===modal)modal.close();});

document.getElementById('year').textContent = new Date().getFullYear();
const glow=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';},{passive:true});
