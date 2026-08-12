const gallery = document.querySelector("#gallery");
const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modalContent");

/*
  RASMLARNI SHU YERGA QO'SHASAN

  assets/photos papkasiga rasmlarni joylashtir.

  Masalan:
  assets/photos/photo1.jpg
  assets/photos/photo2.jpg
*/

const items = [
  {
    type: "image",
    src: "./assets/photos/photo-1.jpg",
    caption: "Eng chiroyli xotiralardan biri ✨"
  },
  {
    type: "image",
    src: "./assets/photos/photo-2.jpg",
    caption: "Senga atalgan kichkina xotira 🤍"
  },
  {
    type: "image",
    src: "./assets/photos/photo-3.jpg",
    caption: "Tabassuming doim yo'qolmasin 😊"
  },
  {
    type: "image",
    src: "./assets/photos/photo-4.jpg",
    caption: "Doimo baxtli yasha 😊"
  },
  {
    type: "image",
    src: "./assets/photos/photo-5.jpg",
    caption: "Men uchun muhumsan 🤍"
  },
  {
    type: "image",
    src: "./assets/photos/photo-6.jpg",
    caption: "Nima yozishni bilmadim 🤍"

  // VIDEO QO'SHISH KERAK BO'LSA:
  /*
  ,
  {
    type: "video",
    src: "./assets/photos/video1.mp4",
    caption: "Unutilmas lahza 🎥"
  }
  */
];


function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}


function loadMedia() {

  if (!gallery) return;

  gallery.innerHTML = "";

  if (items.length === 0) {
    gallery.innerHTML = `
      <div class="soft">
        Hali xotiralar qo'shilmagan 📸
      </div>
    `;
    return;
  }

  items.forEach(item => {

    const card = document.createElement("article");
    card.className = "card";

    let media;

    if (item.type === "video") {

      media = `
        <video
          src="${item.src}"
          muted
          playsinline
          preload="metadata"
        ></video>

        <span class="play">▶</span>
      `;

    } else {

      media = `
        <img
          src="${item.src}"
          alt="Sevinch uchun xotira"
          loading="lazy"
        >
      `;
    }


    card.innerHTML = `
      ${media}

      <div class="caption">
        ${escapeHtml(item.caption || "Xotira ✨")}
      </div>
    `;


    card.addEventListener("click", () => {
      openItem(item);
    });


    gallery.appendChild(card);

  });

}


function openItem(item) {

  if (item.type === "video") {

    modalContent.innerHTML = `
      <video
        src="${item.src}"
        controls
        autoplay
        playsinline
      ></video>

      <p>
        ${escapeHtml(item.caption || "")}
      </p>
    `;

  } else {

    modalContent.innerHTML = `
      <img
        src="${item.src}"
        alt="Xotira"
      >

      <p>
        ${escapeHtml(item.caption || "")}
      </p>
    `;
  }


  modal.classList.add("open");

}


document.querySelector("#closeModal").onclick = () => {
  modal.classList.remove("open");
};


modal.onclick = event => {

  if (event.target === modal) {
    modal.classList.remove("open");
  }

};


document.querySelector("#refresh").onclick = () => {

  loadMedia();

};


document.querySelector("#openGift").onclick = () => {

  document
    .querySelector("#experience")
    .scrollIntoView({
      behavior: "smooth"
    });

};


document.querySelector("#celebrate").onclick = () => {

  document.querySelector("#wish").textContent =
    "Tug'ilgan kuning muborak, Sevinch! 🎉🤍";


  for (let i = 0; i < 80; i++) {

    const confetti = document.createElement("i");

    confetti.className = "confetti";

    confetti.style.left =
      Math.random() * 100 + "vw";

    confetti.style.animationDelay =
      Math.random() * 0.7 + "s";

    confetti.style.transform =
      `rotate(${Math.random() * 360}deg)`;


    document.body.appendChild(confetti);


    setTimeout(() => {
      confetti.remove();
    }, 3500);

  }

};


loadMedia();
