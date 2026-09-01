import { cardData } from "./cardData.js";

document.addEventListener("DOMContentLoaded", function () {
  
    function closeMobileMenu() {
    const burgerBtn = document.querySelector(".header__burger-btn");
    const mobileNav = document.querySelector(".header__mobile-nav");
    const mobileOverlay = document.querySelector(".header__mobile-overlay");

    if (burgerBtn) burgerBtn.classList.remove("header__burger-btn--active");
    if (mobileNav) mobileNav.classList.remove("header__mobile-nav--active");
    if (mobileOverlay)
      mobileOverlay.classList.remove("header__mobile-overlay--active");
    document.body.style.overflow = "";
  }

  function openModal(modal) {
    closeMobileMenu();
    document.body.style.overflow = "";

    setTimeout(() => {
      modal.classList.add("modal--active");
      document.body.style.overflow = "hidden";
    }, 100);
  }

  function closeModal(modal) {
    modal.classList.remove("modal--active");
    document.body.style.overflow = "";
  }

  const cardModal = document.getElementById("cardModal");

  if (cardModal) {
    const cardOverlay = cardModal.querySelector(".modal__overlay");
    const cardClose = cardModal.querySelector(".modal__close");
    const cardImg = cardModal.querySelector(".modal__img");
    const cardTitle = cardModal.querySelector(".modal__title");
    const cardDescription = cardModal.querySelector(".modal__description");
    const cardPrice = cardModal.querySelector(".modal__price");
    const cardBtn = cardModal.querySelector(".modal__btn");

    const cards = document.querySelectorAll(".menu-section__card");
    console.log("Найдено карточек:", cards.length);
    console.log("Данные карточек:", cardData);

    cards.forEach((card, index) => {
      console.log("Добавляем обработчик на карточку", index);

      card.addEventListener("pointerup", function (event) {
        console.log("Pointerup по карточке!");
        event.preventDefault();
        event.stopPropagation();

        const cardKey = this.getAttribute("data-card");
        console.log("Ключ карточки:", cardKey);

        const data = cardData[cardKey];

        if (!data) {
          console.error("Данные для карточки не найдены:", cardKey);
          return;
        }

        const imgElement = this.querySelector(".menu-section__card-img");
        const imgSrc = imgElement ? imgElement.src : "";

        cardImg.src = imgSrc;
        cardImg.alt = data.title;
        cardTitle.textContent = data.title;
        cardDescription.textContent = data.description;
        cardPrice.textContent = data.price;

        openModal(cardModal);
        console.log("Модальное окно открыто");
      });

      card.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
      });
    });

    if (cardOverlay) {
      cardOverlay.addEventListener("click", function () {
        closeModal(cardModal);
      });
    }

    if (cardClose) {
      cardClose.addEventListener("click", function () {
        closeModal(cardModal);
      });
    }

    if (cardBtn) {
      cardBtn.addEventListener("click", function () {
        const title = cardTitle.textContent;
        alert(`"${title}" добавлен в корзину!`);
        closeModal(cardModal);
      });
    }
  } else {
    console.error("Модальное окно карточки НЕ НАЙДЕНО!");
  }

  const thankYouModal = document.getElementById("thankYouModal");

  if (thankYouModal) {
    const thankYouOverlay = thankYouModal.querySelector(".modal__overlay");
    const thankYouClose = thankYouModal.querySelector(".modal__close");
    const thankYouBtn = thankYouModal.querySelector(".modal__thankyou-btn");

    function openThankYouModal() {
      openModal(thankYouModal);
      console.log("Окно благодарности открыто");
    }

    function closeThankYouModal() {
      closeModal(thankYouModal);
      console.log("Окно благодарности закрыто");
    }

    if (thankYouOverlay)
      thankYouOverlay.addEventListener("click", closeThankYouModal);
    if (thankYouClose)
      thankYouClose.addEventListener("click", closeThankYouModal);
    if (thankYouBtn) thankYouBtn.addEventListener("click", closeThankYouModal);

    const orderForm = document.getElementById("orderForm");

    if (orderForm) {
      orderForm.addEventListener("submit", function (event) {
        console.log("Форма отправлена!");
        event.preventDefault();

        const name = document.getElementById("orderName").value.trim();
        const phone = document.getElementById("orderPhone").value.trim();
        const address = document.getElementById("orderAddress").value.trim();

        console.log("Данные формы:", { name, phone, address });

        if (name && phone && address) {
          openThankYouModal();
          orderForm.reset();
          console.log("Форма очищена");
        } else {
          alert("Пожалуйста, заполните все обязательные поля");
        }
      });
    } else {
      console.error("Форма заказа НЕ НАЙДЕНА!");
    }

    const phoneInput = document.getElementById("orderPhone");
        if (phoneInput) {
        phoneInput.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, "");
            
            if (value.length > 0) {
                if (value[0] === "7" || value[0] === "8") {
                    value = value.substring(1);
                }

                value = value.substring(0, 10);
                
                const match = value.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
                
                if (match) {
                    let formatted = "+7";
                    if (match[1]) formatted += " (" + match[1];
                    if (match[2]) formatted += ") " + match[2];
                    if (match[3]) formatted += "-" + match[3];
                    if (match[4]) formatted += "-" + match[4];
                    e.target.value = formatted;
                }
            }
        });
    }
  } else {
    console.error("Модальное окно НЕ НАЙДЕНО!");
  }

  const heroOrderBtn = document.getElementById("heroOrderBtn");

  if (heroOrderBtn) {
    heroOrderBtn.addEventListener("pointerup", function (e) {
      console.log(' Pointerup по кнопке "Заказать"!');
      e.preventDefault();

      closeMobileMenu();

      const orderSection = document.getElementById("order");

      if (orderSection) {
        setTimeout(() => {
          orderSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          console.log("Скролл к секции заказа");
        }, 300);
      } else {
        console.error(" Секция заказа НЕ НАЙДЕНА!");
      }
    });

    heroOrderBtn.addEventListener("click", function (e) {
      e.preventDefault();
    });
  } else {
    console.error('Кнопка "Заказать" НЕ НАЙДЕНА!');
  }

  const burgerBtn = document.querySelector(".header__burger-btn");
  const mobileNav = document.querySelector(".header__mobile-nav");
  const mobileOverlay = document.querySelector(".header__mobile-overlay");
  const mobileLinks = document.querySelectorAll(".header__mobile-link");
  const body = document.body;

  if (burgerBtn && mobileNav) {
    console.log("Бургер меню найдено");

    burgerBtn.addEventListener("click", function () {
      console.log("Клик по бургер кнопке");
      this.classList.toggle("header__burger-btn--active");
      mobileNav.classList.toggle("header__mobile-nav--active");
      if (mobileOverlay)
        mobileOverlay.classList.toggle("header__mobile-overlay--active");

      if (mobileNav.classList.contains("header__mobile-nav--active")) {
        body.style.overflow = "hidden";
        console.log("Меню открыто");
      } else {
        body.style.overflow = "";
        console.log("Меню закрыто");
      }
    });

    mobileLinks.forEach((link, index) => {
      console.log("Добавляем обработчик на ссылку меню", index);
      link.addEventListener("click", function (e) {
        console.log(" Клик по ссылке меню:", this.getAttribute("href"));

        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          e.preventDefault();

          closeMobileMenu();

          setTimeout(() => {
            targetSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            console.log("Скролл к секции:", targetId);
          }, 300);
        }
      });
    });

    if (mobileOverlay) {
      mobileOverlay.addEventListener("click", function () {
        console.log("Клик по оверлею - закрываем меню");
        closeMobileMenu();
      });
    }
  } else {
    console.error("Бургер меню НЕ НАЙДЕНО!");
  }

  const menuLinks = document.querySelectorAll(".header__link[data-section]");
  const mobileMenuLinks = document.querySelectorAll(
    ".header__mobile-link[data-section]",
  );
  const sections = document.querySelectorAll("section[id], header[id]");
  let isScrolling = false;

  function updateActiveMenu() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        menuLinks.forEach((link) => {
          link.classList.remove("header__link--active");
          if (link.getAttribute("data-section") === sectionId) {
            link.classList.add("header__link--active");
          }
        });

        mobileMenuLinks.forEach((link) => {
          link.classList.remove("header__mobile-link--active");
          if (link.getAttribute("data-section") === sectionId) {
            link.classList.add("header__mobile-link--active");
          }
        });
      }
    });

    isScrolling = false;
  }

  window.addEventListener("scroll", function () {
    if (!isScrolling) {
      window.requestAnimationFrame(function () {
        updateActiveMenu();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });

  updateActiveMenu();

  window.addEventListener("resize", function () {
    updateActiveMenu();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (cardModal && cardModal.classList.contains("modal--active")) {
        closeModal(cardModal);
      }
      if (thankYouModal && thankYouModal.classList.contains("modal--active")) {
        closeModal(thankYouModal);
      }
      if (
        mobileNav &&
        mobileNav.classList.contains("header__mobile-nav--active")
      ) {
        closeMobileMenu();
      }
    }
  });
});
