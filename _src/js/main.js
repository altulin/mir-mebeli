const windowWidth = window.innerWidth;
let infoSwiper;

const actualYear = () => {
  const year = new Date().getFullYear();

  if (document.querySelector("[data-actual-year]")) {
    document.querySelector("[data-actual-year]").textContent = year;
  }
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
    const menuLink = $(".menu-link");
    const subMenuLink = $(".sub-list__link");

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

    menuLink.on("click", (e) => {
      e.preventDefault();
      drawer.close();
    });

    subMenuLink.on("click", (e) => {
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
    input.inputmask({
      // mask: "+7 (999) 999-9999",
      regex: "\\+7\\([0-79]{1}[0-9]{2}\\)\\-[0-9]{3}\\-[0-9]{4}",
      keepStatic: true,
    });
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
      loop: true,
      effect: "fade",
      allowTouchMove: false,
      initialSlide: 0,
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
      loop: true,
      spaceBetween: 50,
      initialSlide: 0,

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
          current.text(e.realIndex + 1);
          sum.text(e.slides.length - 2);
        },
        slideChange(e) {
          current.text(e.realIndex + 1);
        },
      },
      controller: {
        control: infoSwiper,
      },
    });
  }
};

const getExamleSlider = () => {
  const slider = $(".example-slider");
  const items = $(".example-decor__item");
  const current = $(".example-slider__index-current");
  const sum = $(".example-slider__index-sum");
  let swiper;

  const changeSlade = (e) => {
    $(items).on("click", (evt) => {
      evt.preventDefault();
      swiper.slideToLoop(Number(evt.target.dataset.slider_num));
    });
  };

  if (check(slider)) {
    swiper = new Swiper(".example-slider", {
      spaceBetween: 50,
      loop: true,
      autoHeight: true,

      navigation: {
        nextEl: ".example-slider__next",
        prevEl: ".example-slider__prev",
      },
      on: {
        afterInit(e) {
          $(items[e.realIndex]).addClass("example-decor__item--current");
          changeSlade(e);
          current.text(e.realIndex + 1);
          sum.text(e.slides.length - 2);
        },
        slideChange(e) {
          $(items).removeClass("example-decor__item--current");
          $(items[e.realIndex]).addClass("example-decor__item--current");
          current.text(e.realIndex + 1);
        },
      },
    });
  }
};

function initBasketMap() {
  const myMap = new ymaps.Map("map", {
    center: [52.27747, 104.30572],
    zoom: 16,
    controls: [],
  });

  const placemarkMir = new ymaps.Placemark(
    [52.27707, 104.30592],

    {
      balloonContent: getBallon("mir"),
      maxWidth: 300,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "./img/svg/mark-map.svg",
      iconImageSize: [51, 73],
      iconImageOffset: [-25, -73],
      // hideIconOnBalloonOpen: false,
    }
  );
  const placemarkEtalon = new ymaps.Placemark(
    [52.277654, 104.306738],
    {
      balloonContent: getBallon("etalon"),
    },
    {
      iconLayout: "default#image",
      iconImageHref: "./img/svg/mark-map.svg",
      iconImageSize: [51, 73],
      iconImageOffset: [-25, -73],
      // hideIconOnBalloonOpen: false,
    }
  );

  myMap.geoObjects.add(placemarkMir);
  myMap.geoObjects.add(placemarkEtalon);

  // myMap.behaviors.disable("scrollZoom");
}

const createMap = () => {
  const map = $("#map");
  if (check(map)) {
    ymaps.ready(initBasketMap);
  }
};

const marks = new Map([
  [
    "mir",
    [
      "Салон «Мир мебели»",
      "Партизанская, 56",
      "пн - сб  10:00 - 20:00,  вс 11:00 - 19:00",
    ],
  ],
  [
    "etalon",
    [
      "МЦ Эталон",
      "Партизанская, 63., 2 этаж",
      "пн - сб 10:00 - 19:00, вс 11:00 - 19:00",
    ],
  ],
]);

const getBallon = (name) => {
  return `<div class="addresses__item">
    <h3>${marks.get(name)[0]}</h3>
    <p>${marks.get(name)[1]}</p>
    <p>${marks.get(name)[2]}</p>
  </div>`;
};

const scrollToTop = () => {
  const link = $(".up__link");
  const top = $("body,html");

  if (check(link)) {
    link.on("click", (e) => {
      e.preventDefault();
      top.animate(
        {
          scrollTop: 0,
        },
        800
      );
    });
  }
};

const getAnchor = () => {
  const anchorLink = $(".anchor");

  if (check(anchorLink)) {
    anchorLink.on("click", (e) => {
      e.preventDefault();
      console.log(e.target);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($(e.target).attr("href")).offset().top,
          },
          800
        );
    });
  }
};

const reload = () => {
  window.onresize = function () {
    window.location.reload();
  };
};

const scrollFunction = () => {
  const btnUp = $(".footer__up");
  const footerHeight = $(".main-footer");
  const bottom = footerHeight.height() - btnUp.offset().right;

  if (check(btnUp)) {
    window.onscroll = () => {
      const scrollBottom =
        document.documentElement.scrollHeight -
        document.documentElement.scrollTop -
        document.documentElement.clientHeight;
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        btnUp.addClass("up--visually");
      } else {
        btnUp.removeClass("up--visually");
      }

      if (scrollBottom < footerHeight.height()) {
        btnUp.addClass("up--position");

        btnUp.css({ top: `50px` });
      } else {
        btnUp.removeClass("up--position");
        btnUp.css({ top: `auto` });
      }
    };
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
  createMap();
  actualYear();
  scrollToTop();
  getAnchor();
  scrollFunction();
});
