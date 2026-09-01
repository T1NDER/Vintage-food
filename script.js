document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM загружен, скрипт работает");

  // Данные для карточек меню
  const cardData = {
    burgers: {
      title: "Бургеры",
      description:
        "Сочные бургеры с натуральной говядиной, свежими овощами и фирменным соусом. Готовим на гриле с любовью к деталям.",
      price: "от 350 ₽",
    },
    chicken: {
      title: "Блюда из курицы",
      description:
        "Хрустящая курица в фирменной панировке, крылышки BBQ, нежные стрипсы. Подаём с картофелем фри и соусом на выбор.",
      price: "от 280 ₽",
    },
    hot: {
      title: "Горячие блюда",
      description:
        "Стейки из мраморной говядины, свиные рёбрышки в медовом соусе, горячие сэндвичи. Всё готовится на открытом огне.",
      price: "от 450 ₽",
    },
    snacks: {
      title: "Закуски",
      description:
        "Золотистые наггетсы, хрустящие луковые кольца, сырные палочки с томатным соусом. Идеальное дополнение к основному блюду.",
      price: "от 180 ₽",
    },
    salads: {
      title: "Салаты",
      description:
        "Свежие салаты с сезонными овощами, заправками на выбор. Лёгкие, полезные и вкусные.",
      price: "от 250 ₽",
    },
    desserts: {
      title: "Десерты",
      description:
        "Нью-Йорк чизкейк, фруктовые тарты, домашнее мороженое. Сладкое завершение вашего обеда.",
      price: "от 220 ₽",
    },
  };

  // ===== МОДАЛЬНОЕ ОКНО КАРТОЧКИ =====
  const cardModal = document.getElementById("cardModal");

  if (!cardModal) {
    console.error("Модальное окно карточки не найдено!");
    return;
  }

  const cardOverlay = cardModal.querySelector(".modal__overlay");
  const cardClose = cardModal.querySelector(".modal__close");
  const cardImg = cardModal.querySelector(".modal__img");
  const cardTitle = cardModal.querySelector(".modal__title");
  const cardDescription = cardModal.querySelector(".modal__description");
  const cardPrice = cardModal.querySelector(".modal__price");
  const cardBtn = cardModal.querySelector(".modal__btn");

  const cards = document.querySelectorAll(".menu-section__card");
  console.log("Найдено карточек:", cards.length);

  cards.forEach((card) => {
    card.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const cardKey = this.getAttribute("data-card");
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

      cardModal.classList.add("modal--active");
      document.body.style.overflow = "hidden";
    });
  });

  function closeCardModal() {
    cardModal.classList.remove("modal--active");
    document.body.style.overflow = "";
  }

  if (cardOverlay) {
    cardOverlay.addEventListener("click", closeCardModal);
  }

  if (cardClose) {
    cardClose.addEventListener("click", closeCardModal);
  }

  if (cardBtn) {
    cardBtn.addEventListener("click", function () {
      const title = cardTitle.textContent;
      alert(`"${title}" добавлен в корзину!`);
      closeCardModal();
    });
  }

  // ===== МОДАЛЬНОЕ ОКНО БЛАГОДАРНОСТИ =====
  const thankYouModal = document.getElementById("thankYouModal");
  const thankYouOverlay = thankYouModal
    ? thankYouModal.querySelector(".modal__overlay")
    : null;
  const thankYouClose = thankYouModal
    ? thankYouModal.querySelector(".modal__close")
    : null;
  const thankYouBtn = thankYouModal
    ? thankYouModal.querySelector(".modal__thankyou-btn")
    : null;

  function openThankYouModal() {
    if (thankYouModal) {
      thankYouModal.classList.add("modal--active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeThankYouModal() {
    if (thankYouModal) {
      thankYouModal.classList.remove("modal--active");
      document.body.style.overflow = "";
    }
  }

  if (thankYouOverlay)
    thankYouOverlay.addEventListener("click", closeThankYouModal);
  if (thankYouClose)
    thankYouClose.addEventListener("click", closeThankYouModal);
  if (thankYouBtn) thankYouBtn.addEventListener("click", closeThankYouModal);

  // ===== ОБРАБОТКА ФОРМЫ ЗАКАЗА =====
  const orderForm = document.getElementById("orderForm");

  if (orderForm) {
    orderForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("orderName").value.trim();
      const phone = document.getElementById("orderPhone").value.trim();
      const address = document.getElementById("orderAddress").value.trim();

      if (name && phone && address) {
        openThankYouModal();
        orderForm.reset();
      } else {
        alert("Пожалуйста, заполните все обязательные поля");
      }
    });
  }

  // Маска для телефона
  const phoneInput = document.getElementById("orderPhone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length > 0) {
        if (value[0] === "7" || value[0] === "8") {
          value = value.substring(1);
        }
        let formatted = "+7";
        if (value.length > 0) formatted += " (" + value.substring(0, 3);
        if (value.length >= 3) formatted += ") " + value.substring(3, 6);
        if (value.length >= 6) formatted += "-" + value.substring(6, 8);
        if (value.length >= 8) formatted += "-" + value.substring(8, 10);
        e.target.value = formatted;
      }
    });
  }

  // ===== КНОПКА "ЗАКАЗАТЬ" В HERO =====
  const heroOrderBtn = document.getElementById("heroOrderBtn");
  if (heroOrderBtn) {
    heroOrderBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const orderSection = document.getElementById("order");
      if (orderSection) {
        orderSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  // ===== БУРГЕР-МЕНЮ =====
  const burgerBtn = document.querySelector(".header__burger-btn");
  const mobileNav = document.querySelector(".header__mobile-nav");
  const mobileOverlay = document.querySelector(".header__mobile-overlay");
  const mobileLinks = document.querySelectorAll(".header__mobile-link");
  const body = document.body;

  if (burgerBtn && mobileNav) {
    burgerBtn.addEventListener("click", function () {
      this.classList.toggle("header__burger-btn--active");
      mobileNav.classList.toggle("header__mobile-nav--active");
      if (mobileOverlay)
        mobileOverlay.classList.toggle("header__mobile-overlay--active");

      if (mobileNav.classList.contains("header__mobile-nav--active")) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "";
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          e.preventDefault();
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }

        burgerBtn.classList.remove("header__burger-btn--active");
        mobileNav.classList.remove("header__mobile-nav--active");
        if (mobileOverlay)
          mobileOverlay.classList.remove("header__mobile-overlay--active");
        body.style.overflow = "";
      });
    });

    if (mobileOverlay) {
      mobileOverlay.addEventListener("click", function () {
        burgerBtn.classList.remove("header__burger-btn--active");
        mobileNav.classList.remove("header__mobile-nav--active");
        mobileOverlay.classList.remove("header__mobile-overlay--active");
        body.style.overflow = "";
      });
    }
  }

  // ===== ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ (с throttle для производительности) =====
  const menuLinks = document.querySelectorAll(".header__link[data-section]");
  const mobileMenuLinks = document.querySelectorAll(
    ".header__mobile-link[data-section]",
  );
  const sections = document.querySelectorAll("section[id], header[id]");

  let scrollTimeout;
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

  // Throttled scroll handler
  window.addEventListener("scroll", function () {
    if (!isScrolling) {
      window.requestAnimationFrame(function () {
        updateActiveMenu();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });

  // Initial call
  updateActiveMenu();

  // Плавный скролл для десктопного меню
  const desktopNavLinks = document.querySelectorAll(
    ".header__link[data-section]",
  );

  desktopNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Закрытие по Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (cardModal && cardModal.classList.contains("modal--active"))
        closeCardModal();
      if (thankYouModal && thankYouModal.classList.contains("modal--active"))
        closeThankYouModal();
      if (
        burgerBtn &&
        mobileNav &&
        mobileNav.classList.contains("header__mobile-nav--active")
      ) {
        burgerBtn.classList.remove("header__burger-btn--active");
        mobileNav.classList.remove("header__mobile-nav--active");
        if (mobileOverlay)
          mobileOverlay.classList.remove("header__mobile-overlay--active");
        body.style.overflow = "";
      }
    }
  });
});
