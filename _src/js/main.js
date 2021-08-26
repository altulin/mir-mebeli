const windowWidth = window.innerWidth;
let infoSwiper;

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
      spaceBetween: 50,

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

const getInfoSlider = () => {
  const slider = $(".slider-info__container");

  if (check(slider)) {
    infoSwiper = new Swiper(".slider-info__container", {
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
    });
  }
};

const getInteriorSlider = () => {
  const slider = $(".slider-interior__container");
  const current = $(".interior-controls__current");
  const sum = $(".interior-controls__sum");

  if (check(slider) && check(current) && check(sum)) {
    const swiper = new Swiper(".slider-interior__container", {
      spaceBetween: 50,

      pagination: {
        el: ".interior-controls__pagination",
        bulletClass: "slider__bullet",
        clickable: true,
      },

      navigation: {
        nextEl: ".interior-controls__next",
        prevEl: ".interior-controls__prev",
      },
      on: {
        afterInit(e) {
          current.text(e.activeIndex + 1);
          sum.text(e.slides.length);
        },
        slideChange(e) {
          current.text(e.activeIndex + 1);
          infoSwiper.slideTo(e.activeIndex);
        },
      },
    });
  }
};

const getExamleSlider = () => {
  const slider = $(".example-slider");
  const items = $(".example-decor__item");
  let swiper;

  const changeSlade = (e) => {
    $(items).on("click", (evt) => {
      evt.preventDefault();
      $(items).removeClass("example-decor__item--current");
      swiper.slideTo(evt.target.dataset.slider_num);
    });
  };

  if (check(slider)) {
    swiper = new Swiper(".example-slider", {
      spaceBetween: 50,

      navigation: {
        nextEl: ".example-slider__next",
        prevEl: ".example-slider__prev",
      },
      on: {
        afterInit(e) {
          $(items[e.activeIndex]).addClass("example-decor__item--current");
          changeSlade(e);
        },
        slideChange(e) {
          $(items).removeClass("example-decor__item--current");
          $(items[e.activeIndex]).addClass("example-decor__item--current");
        },
      },
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
  getInfoSlider();
  getInteriorSlider();
  getExamleSlider();
});
