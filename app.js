document.addEventListener("DOMContentLoaded", () => {

  const gallery = document.querySelector("#gallery");
  const modal = document.querySelector("#modal");
  const modalContent = document.querySelector("#modalContent");

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
      caption: "Yana bir go'zal xotira ✨"
    },
    {
      type: "image",
      src: "./assets/photos/photo-5.jpg",
      caption: "Bugungi kun esda qolsin 🤍"
    },
    {
      type: "image",
      src: "./assets/photos/photo-6.jpg",
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

      card.addEventListener("click", () => {
        openItem(item);
      });

      gallery.appendChild(card);

    });

  }


  function openItem(item) {

    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
      <img src="${item.src}" alt="Xotira">

      <p>
        ${escapeHtml(item.caption)}
      </p>
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

    refreshButton.addEventListener("click", () => {
      loadMedia();
    });

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

      if (!wish) return;

      const message = `Sevinch...

Balki hozir bu gaplarni o'qiyotganda shunchaki telefonga qarab turgandirsan.

Balki tabassum qilarsan.

Balki: "Doston buncha narsani qayerdan topdi ekan?" deb o'ylarsan.

Lekin bu sahifadagi har bir yozuv, har bir rasm va har bir kichkina detal senga atalgan.

Chunki bugun oddiy kun emas.

Bugun dunyoga Sevinch degan inson kelgan kun. 🤍

Men hozir Toshkent viloyati, Yangiyo'l tumanidaman.

Sen esa Qashqadaryo viloyati, Qarshi shahridasan.

Xaritaga qarasang, oramizda ancha masofa bor.

Bir tuman...

Boshqa bir shahar...

Oramizda yo'llar, shaharlar va kilometrlar bor.

Men senga tug'ilgan kuningda oddiy sovg'ani qo'lingga tutqaza olmadim.

Yoninga borib, ko'zlaringga qarab:

"Tug'ilgan kuning muborak bo'lsin"

deb ayta olmadim.

Lekin shunda bir narsani tushundim...

Masofa odamlarni bir-biridan uzoqlashtirishi mumkin.

Ammo agar inson boshqa bir insonni chin dildan qadrlasa, masofa uning xotirasidan joy olib qo'ya olmaydi.

Ba'zan odam yoningda turib ham juda uzoq bo'lishi mumkin.

Ba'zan esa yuzlab kilometr narida bo'lgan inson qalbingga juda yaqin bo'ladi.

Menimcha, xaritadagi masofa bilan qalblar orasidagi masofa bir xil narsa emas.

Xaritada Yangiyo'l va Qarshi orasida yo'l bor.

Lekin qalblar orasidagi masofani hech qanday xarita o'lchay olmaydi. 🤍

Shuning uchun men bugun senga oddiy xabar yuborish bilan cheklanib qolishni xohlamadim.

Senga esda qoladigan bir narsa qoldirmoqchi bo'ldim.

Shu kichkina dunyoni.

Bir kun kelib, balki ancha yillar o'tib, tasodifan shu sahifani yana ocharsan.

Shunda bugun...

13 yoshga to'lgan kuning...

va bu sahifani kimdir aynan sen uchun tayyorlagani esingga tushadi.

Balki o'shanda sen kattaroq bo'lasan.

Hayoting o'zgaradi.

Atrofingdagi odamlar o'zgaradi.

Maktab tugaydi.

Yangi orzular paydo bo'ladi.

Bugungi kun esa uzoqdagi bir xotiraga aylanadi.

Lekin men xohlaymanki, shu xotira ichida bir kichkina joyda mana bu sovg'a ham qolsin.

Va bir kuni:

"Voy... men 13 yoshga to'lganimda, Doston menga shunaqa sovg'a qilgan ekan..."

deb eslab, hech bo'lmasa bir marta tabassum qilarsan.

Chunki eng qimmat sovg'alar har doim ham pul bilan o'lchanmaydi.

Ba'zida eng qimmat sovg'a — kimdir sen uchun vaqt ajratgani.

Seni eslagani.

Seni xursand qilish uchun harakat qilgani.

Va yuragidan chiqqan bir narsani senga bag'ishlaganidir.

Bu sayt shunchaki HTML, CSS va JavaScript emas.

Bu yerda kodlar bor, albatta.

Lekin bu kodlarning orasida yana boshqa narsa ham bor.

Xotira.

E'tibor.

Va sen bugun yolg'iz emasligingni eslatib turadigan kichkina bir sovg'a.

Bugun sen 13 yoshga to'lding, Sevinch.

Oldinda hali juda ko'p kunlar bor.

Juda ko'p kulgilar.

Juda ko'p yangi xotiralar.

Ba'zan hayot juda chiroyli bo'ladi.

Ba'zan esa hammasi o'ylagandek bo'lmasligi ham mumkin.

Lekin qaysi kun bo'lishidan qat'i nazar, o'zingni asrashni unutma.

Orzularingni yo'qotma.

Doim o'zingni qadrlashni unutma.

Va hech qachon o'zingni qadrsiz deb o'ylama.

Chunki sen o'ylaganingdan ham ko'proq qadrli insonsan.

Bugun men Toshkent viloyati, Yangiyo'l tumanidaman.

Sen Qashqadaryo viloyati, Qarshi shahridasan.

Xaritada qaralsa, oramizda kilometrlar bor.

Lekin men bitta narsaga ishonaman.

Agar inson boshqa bir insonni chin dildan qadrlasa...

ba'zan eng uzoq masofa ham shunchaki yo'l bo'lib qoladi.

Yangiyo'l
      ↓
   kilometrlar
      ↓
     yo'llar
      ↓
     shaharlar
      ↓
    Qarshi

Mana shu — xaritadagi masofa.

Lekin...

qalblar orasidagi masofani kilometr bilan o'lchab bo'lmaydi. 🤍

Shuning uchun bugun senga aytmoqchi bo'lgan eng muhim gapim shu:

Qayerda bo'lishingdan qat'i nazar...

bugungi kuningni unutma.

13 yoshingni unutma.

Shu sahifani unutma.

Va bir kun uzoq vaqt o'tib yana shu yerga qaytsang...

bilginki, Toshkent viloyati, Yangiyo'l tumanida turib, Qarshi shahridagi bir qizning tug'ilgan kuni esda qolishi uchun qo'lidan kelganicha harakat qilgan bir do'sting bo'lgan.

Tug'ilgan kuning muborak bo'lsin, Sevinch. 🎂🤍

13 yoshing baxtli xotiralar bilan to'lsin.

Doim kulib yur.

O'zingni asra.

Va eng muhimi...

qalbingdagi yaxshilikni hech qachon yo'qotma.

Xaritada masofa bor.

Lekin qalbda emas. 🤍

Tug'ilgan kuning muborak, Sevinch.

— Doston ✨`;

      wish.innerHTML = "";

      celebrateButton.disabled = true;
      celebrateButton.textContent = "O'qib bo'lguncha kut... 🤍";

      let index = 0;

      const timer = setInterval(() => {

        const character = message[index];

        if (character === "\n") {
          wish.innerHTML += "<br>";
        } else {
          wish.innerHTML += escapeHtml(character);
        }

        index++;

        if (index >= message.length) {

          clearInterval(timer);

          celebrateButton.textContent = "Yana bir bor o'qish 🤍";
          celebrateButton.disabled = false;

        }

      }, 12);


      for (let i = 0; i < 100; i++) {

        const confetti = document.createElement("i");

        confetti.className = "confetti";

        confetti.style.left =
          Math.random() * 100 + "vw";

        confetti.style.animationDelay =
          Math.random() * 0.7 + "s";

        document.body.appendChild(confetti);

        setTimeout(() => {
          confetti.remove();
        }, 3500);

      }

    });

  }


  loadMedia();

});