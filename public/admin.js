let password=sessionStorage.getItem("sevinch-admin")||"";
const login=document.querySelector("#login"),panel=document.querySelector("#panel"),status=document.querySelector("#status");
function headers(){return {"x-admin-password":password}}
function enter(){password=document.querySelector("#password").value;sessionStorage.setItem("sevinch-admin",password);login.hidden=true;panel.hidden=false;load()}
document.querySelector("#loginBtn").onclick=enter;
if(password){login.hidden=true;panel.hidden=false}
async function load(){
 const list=document.querySelector("#list");const items=await fetch("/api/media").then(r=>r.json());list.innerHTML="";
 items.forEach(i=>{const d=document.createElement("div");d.className="item";d.innerHTML=(i.type==="video"?`<video src="${i.src}"></video>`:`<img src="${i.src}">`)+`<span>${i.caption||"Xotira"}</span><button>O'chirish</button>`;d.querySelector("button").onclick=async()=>{if(!confirm("O'chirilsinmi?"))return;let r=await fetch("/api/media/"+i.id,{method:"DELETE",headers:headers()});if(r.ok)load();else alert("Parol noto'g'ri yoki ruxsat yo'q")};list.appendChild(d)})
}
document.querySelector("#uploadForm").onsubmit=async e=>{e.preventDefault();status.textContent="Yuklanmoqda…";const fd=new FormData();fd.append("media",document.querySelector("#media").files[0]);fd.append("caption",document.querySelector("#caption").value);let r=await fetch("/api/upload",{method:"POST",headers:headers(),body:fd});let x=await r.json();if(r.ok){status.textContent="✅ Qo'shildi!";e.target.reset();load()}else status.textContent="❌ "+(x.error||"Xatolik")};
load();