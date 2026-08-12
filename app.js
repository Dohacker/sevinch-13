const gallery=document.querySelector("#gallery");
const modal=document.querySelector("#modal");
const modalContent=document.querySelector("#modalContent");

async function loadMedia(){
  gallery.innerHTML='<div class="soft">Xotiralar yuklanmoqda…</div>';
  try{
    const items=await fetch("/api/media",{cache:"no-store"}).then(r=>r.json());
    gallery.innerHTML="";
    items.forEach(item=>{
      const card=document.createElement("article");card.className="card";
      const media=item.type==="video"
        ? `<video src="${item.src}" muted playsinline preload="metadata"></video><span class="play">▶</span>`
        : `<img src="${item.src}" alt="Sevinch uchun xotira" loading="lazy">`;
      card.innerHTML=media+`<div class="caption">${escapeHtml(item.caption||"Xotira ✨")}</div>`;
      card.onclick=()=>openItem(item);
      gallery.appendChild(card);
    });
  }catch{gallery.innerHTML="<p>Galereyani yuklashda xatolik yuz berdi.</p>"}
}
function escapeHtml(s){const d=document.createElement("div");d.textContent=s;return d.innerHTML}
function openItem(item){
  modalContent.innerHTML=item.type==="video"
    ? `<video src="${item.src}" controls autoplay playsinline></video>`
    : `<img src="${item.src}" alt="Xotira"><p>${escapeHtml(item.caption||"")}</p>`;
  modal.classList.add("open");
}
document.querySelector("#closeModal").onclick=()=>modal.classList.remove("open");
modal.onclick=e=>{if(e.target===modal)modal.classList.remove("open")}
document.querySelector("#refresh").onclick=loadMedia;
document.querySelector("#openGift").onclick=()=>document.querySelector("#experience").scrollIntoView({behavior:"smooth"});
document.querySelector("#celebrate").onclick=()=>{
  document.querySelector("#wish").textContent="Tug'ilgan kuning muborak, Sevinch! 🎉🤍";
  for(let i=0;i<80;i++){const c=document.createElement("i");c.className="confetti";c.style.left=Math.random()*100+"vw";c.style.animationDelay=Math.random()*.7+"s";c.style.transform=`rotate(${Math.random()*360}deg)`;document.body.appendChild(c);setTimeout(()=>c.remove(),3500)}
};
loadMedia();