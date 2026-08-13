document.addEventListener("DOMContentLoaded", () => {

  const gallery = document.querySelector("#gallery");
  const modal = document.querySelector("#modal");
  const modalContent = document.querySelector("#modalContent");

  const items = [
    {
      type: "image",
      src: "assets/photos/photo-1.jpg",
      caption: "Eng chiroyli xotiralardan biri ✨"
    },
    {
      type: "image",
      src: "assets/photos/photo-2.jpg",
      caption: "Senga atalgan kichkina xotira 🤍"
    },
    {
      type: "image",
      src: "assets/photos/photo-3.jpg",
      caption: "Tabassuming doim yo'qolmasin 😊"
    },
    {
      type: "image",
      src: "assets/photos/photo-4.jpg",
      caption: "Yana bir go'zal xotira ✨"
    },
    {
      type: "image",
      src: "assets/photos/photo-5.jpg",
      caption: "Bugungi kun esda qolsin 🤍"
    },
    {
      type: "image",
      src: "assets/photos/photo-6.jpg",
      caption: "Sevinch uchun esdalik 📸🤍"
    }
  ];

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text || "";
    return div.innerHTML;
  }

  function loadMedia() {
    if (!gallery) return;

    gallery.innerHTML = "";

    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "card";

      card.innerHTML = `
        <img
          src="${item.src}"
          alt="Sevinch uchun xotira"
          loading="lazy"
        >
        <div class="caption">
          ${escapeHtml(item.caption)}
        </div>
      `;

      card.addEventListener("click", () => openItem(item));

      gallery.appendChild(card);
    });
  }

  function openItem(item) {
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
      <img src="${item.src}" alt="Xotira">
      <p>${escapeHtml(item.caption)}</p>
    `;

    modal.classList.add("open");
  }

  const closeModal = document.querySelector("#closeModal");

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.classList.remove("open");
    });
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.remove("open");
      }
    });
  }

  const refreshButton = document.querySelector("#refresh");

  if (refreshButton) {
    refreshButton.addEventListener("click", loadMedia);
  }

  const openGiftButton = document.querySelector("#openGift");

  if (openGiftButton) {
    openGiftButton.addEventListener("click", () => {
      const experience = document.querySelector("#experience");

      if (experience) {
        experience.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  }

  const celebrateButton = document.querySelector("#celebrate");

  if (celebrateButton) {
    celebrateButton.addEventListener("click", () => {

      const wish = document.querySelector("#wish");

      if (wish) {
        wish.textContent =
          "Tug'ilgan kuning muborak, Sevinch! 🎉🤍";
      }

      for (let i = 0; i < 80; i++) {
        const confetti = document.createElement("i");

        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDelay = Math.random() * 0.7 + "s";

        document.body.appendChild(confetti);

        setTimeout(() => {
          confetti.remove();
        }, 3500);
      }
    });
  }

  loadMedia();

});
