const windowWidth = window.innerWidth;

const reload = () => {
  window.onresize = function () {
    window.location.reload();
  };
};

const check = (element) => {
  if (element.length > 0) {
    return true;
  }
  return false;
};

const getAccordionNav = () => {
  const accordionNav = $(".nav__item--down");

  if (check(accordionNav) && windowWidth <= 1000)
    $(".nav__item--down").accordion({
      transitionSpeed: 400,
    });
};

const getDropDown = () => {
  const itemDown = $(".nav__item--down");
  const classActive = "nav__item--down-active";

  const addClass = () => {
    itemDown.addClass(classActive);
  };

  const removeClass = () => {
    itemDown.removeClass(classActive);
  };

  if (check(itemDown) && windowWidth > 1000) {
    itemDown.on("mouseover", () => {
      addClass();
    });

    itemDown.on("mouseleave", () => {
      removeClass();
    });
  }
};

const getMenuMobile = () => {
  const navMenu = document.querySelector(".header__nav");

  if (navMenu !== null && windowWidth <= 1000) {
    const linkOpen = $(".header__link--open");
    const linkClose = $(".header__link--close");

    const menuMobile = new MmenuLight(navMenu);

    const drawer = menuMobile.offcanvas();

    linkOpen.on("click", (e) => {
      e.preventDefault();
      drawer.open();
    });

    linkClose.on("click", (e) => {
      e.preventDefault();
      drawer.close();
    });
  }
};

const createModal = (modal) => {
  modal.modal({
    fadeDuration: 200,
  });
};

const getConsultationModal = () => {
  const modal = $("#modal-consultation");
  const link = $(".open-modal-consultation");

  if (check(modal)) {
    link.on("click", () => {
      createModal(modal);
    });
  }
};

const getSuccessModal = () => {
  const modal = $("#modal-success");

  if (check(modal)) {
    createModal(modal);
  }
};

const sendFormConsultation = () => {
  const form = $(".form-consultation");

  if (check(form)) {
    form.on("submit", (e) => {
      const data = $(this).serialize();

      e.preventDefault();
      $.ajax({
        url: "https://httpbin.org/anything",
        method: "post",
        dataType: "json",
        data,
        success(data) {
          getSuccessModal();
        },
      });
    });
  }
};

const getInputMask = () => {
  const input = $(".mask");

  if (check(input)) {
    input.inputmask({ mask: "+7 (999) 999-9999" });
  }
};

const getConsultationSlider = () => {
  const slider = $(".slider__left");

  if (check(slider)) {
    const swiper = new Swiper(".slider__left", {
      // Optional parameters
      // direction: "vertical",
      loop: true,
      // preloadImages: false,
      // lazy: true,

      // If we need pagination
      pagination: {
        // el: ".swiper-pagination",
      },

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // And if we need scrollbar
      scrollbar: {
        // el: ".swiper-scrollbar",
      },
    });
  }
};

$(function () {
  reload();
  getAccordionNav();
  getDropDown();
  getMenuMobile();
  getConsultationModal();
  sendFormConsultation();
  getInputMask();
  getConsultationSlider();
});
