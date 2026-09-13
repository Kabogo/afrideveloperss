const menuButton=document.querySelector('.menu-btn');
const navLinks=document.querySelector('.nav-links');
menuButton.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
navLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navLinks.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
document.querySelector('#year').textContent=new Date().getFullYear();

const header=document.querySelector('.nav-wrap');
const progress=document.querySelector('.scroll-progress span');
const backToTop=document.querySelector('.back-to-top');
const updateScroll=()=>{
  const y=window.scrollY;
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.transform=`scaleX(${max?y/max:0})`;
  header.classList.toggle('scrolled',y>24);
  backToTop.classList.toggle('visible',y>600);
};
window.addEventListener('scroll',updateScroll,{passive:true});
updateScroll();
backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const revealItems=document.querySelectorAll('.section-head,.service-grid article,.pricing-card,.care-pricing,.extended-pricing,.product-card,.client-card,.outcomes>div,.steps article,.metric-panel,.footer-intro');
revealItems.forEach((item,index)=>{item.classList.add('reveal');item.style.setProperty('--delay',`${(index%4)*70}ms`);});
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -30px'});
  revealItems.forEach(item=>observer.observe(item));
}else{revealItems.forEach(item=>item.classList.add('revealed'));}

const finePointer=window.matchMedia('(pointer:fine)');
document.querySelectorAll('.product-card,.service-grid article,.pricing-card,.care-pricing,.extended-pricing').forEach(card=>{
  card.addEventListener('pointermove',event=>{if(finePointer.matches){const r=card.getBoundingClientRect();card.style.setProperty('--mx',`${event.clientX-r.left}px`);card.style.setProperty('--my',`${event.clientY-r.top}px`);}});
});

const sectionLinks=[...document.querySelectorAll('.nav-links a[href^="#"]')];
const trackedSections=sectionLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window&&trackedSections.length){
  const navObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){sectionLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`));}});
  },{rootMargin:'-30% 0px -62%',threshold:0});
  trackedSections.forEach(section=>navObserver.observe(section));
}

const hero=document.querySelector('.hero');
const heroVisual=document.querySelector('.hero-visual');
if(hero&&heroVisual){
  hero.addEventListener('pointermove',event=>{
    if(!finePointer.matches||window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
    const x=(event.clientX/window.innerWidth-.5);
    const y=(event.clientY/window.innerHeight-.5);
    hero.style.setProperty('--hero-x',`${x*18}px`);
    hero.style.setProperty('--hero-y',`${y*14}px`);
    heroVisual.style.transform=`translate3d(${x*12}px,${y*9}px,0)`;
  });
  hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--hero-x','0px');hero.style.setProperty('--hero-y','0px');heroVisual.style.transform='';});
}
