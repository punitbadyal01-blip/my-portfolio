/* Restrained, pointer-driven depth for the studio project panels. */
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const grid=document.getElementById('projects-grid');
 const reset=card=>{card.style.removeProperty('--rx');card.style.removeProperty('--ry');};
 grid.addEventListener('pointermove',event=>{
  if(reduced.matches || event.pointerType==='touch')return;
  const card=event.target.closest('.project-card');if(!card)return;
  const rect=card.getBoundingClientRect();
  card.style.setProperty('--rx',`${-((event.clientY-rect.top)/rect.height-.5)*3}deg`);
  card.style.setProperty('--ry',`${((event.clientX-rect.left)/rect.width-.5)*3}deg`);
 });
 grid.addEventListener('pointerout',event=>{const card=event.target.closest('.project-card');if(card&&!card.contains(event.relatedTarget))reset(card);});
 reduced.addEventListener('change',()=>grid.querySelectorAll('.project-card').forEach(reset));
})();
