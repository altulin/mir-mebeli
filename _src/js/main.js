// import addEventResize from "./modules/resize";

// addEventResize();
console.log("dfgdfg");
console.log($(".slimmenu"));

$(".slimmenu").slimmenu({
  resizeWidth: "767",
  initiallyVisible: false,
  collapserTitle: "Main Menu",
  animSpeed: "medium",
  easingEffect: null,
  indentChildren: false,
  childrenIndenter: "&nbsp;",
  expandIcon: "<i>&#9660;</i>",
  collapseIcon: "<i>&#9650;</i>",
});
