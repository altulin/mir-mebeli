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
    link.on("click", (e) => {
      e.preventDefault();
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
          form.find(".reset").val("");
        },
      });
    });
  }
};

const sendFormRecord = () => {
  const form = $(".record-form");

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
          form.find(".reset").val("");
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
      loop: true,

      pagination: {
        el: ".slider__pagination",
        bulletClass: "slider__bullet",
        clickable: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
};

const getProjectsSlider = () => {
  const slider = $(".projects-slider");

  if (check(slider)) {
    const swiper = new Swiper(".projects-slider", {
      loop: true,

      pagination: {
        el: ".projects__pagination",
        bulletClass: "slider__bullet",
        clickable: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: ".projectsr__next",
        prevEl: ".projects__prev",
      },
      spaceBetween: 10,
    });
  }
};

$(function () {
  // reload();
  getAccordionNav();
  getDropDown();
  getMenuMobile();
  getConsultationModal();
  sendFormConsultation();
  sendFormRecord();
  getInputMask();
  getConsultationSlider();
  getProjectsSlider();
});
