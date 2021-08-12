// import addEventResize from "./modules/resize";

// addEventResize();

const reload = () => {
  window.onresize = function () {
    window.location.reload();
  };
};

const getAccordionNav = () => {
  const windowWidth = window.innerWidth;
  const accordionNav = $(".nav__item--down");

  if (accordionNav.length > 0 && windowWidth <= 1200)
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

  if (itemDown.length > 0) {
    itemDown.on("mouseover", () => {
      addClass();
    });

    itemDown.on("mouseleave", () => {
      removeClass();
    });
  }
};

reload();
getAccordionNav();
getDropDown();
