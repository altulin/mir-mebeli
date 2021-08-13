const windowWidth = window.innerWidth;

const reload = () => {
  window.onresize = function () {
    window.location.reload();
  };
};

const getAccordionNav = () => {
  const accordionNav = $(".nav__item--down");

  if (accordionNav.length > 0 && windowWidth <= 1000)
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

  if (itemDown.length > 0 && windowWidth > 1000) {
    itemDown.on("mouseover", () => {
      addClass();
    });

    itemDown.on("mouseleave", () => {
      removeClass();
    });
  }
};

const getMenuMobile = () => {
  // const menu = $(".header__nav");
  const navMenu = document.querySelector(".header__nav");
  console.log(windowWidth);

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

reload();
getAccordionNav();
getDropDown();
getMenuMobile();
