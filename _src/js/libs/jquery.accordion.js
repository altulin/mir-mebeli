!(function (t, n, e, a) {
  const i = "accordion";
  const o = {
    transitionSpeed: 300,
    transitionEasing: "ease",
    controlElement: "[data-control]",
    contentElement: "[data-content]",
    groupElement: "[data-accordion-group]",
    singleOpen: !0,
  };
  function s(n, e) {
    (this.element = n),
      (this.options = t.extend({}, o, e)),
      (this._defaults = o),
      (this._name = i),
      this.init();
  }
  (s.prototype.init = function () {
    let a;
    let i;
    let o;
    let s;
    const r = this.options;
    const c = t(this.element);
    const d = c.find(`> ${r.controlElement}`);
    const h = c.find(`> ${r.contentElement}`);
    const l = c.parents("[data-accordion]").length > 0;
    const f = { "max-height": 0, overflow: "hidden" };
    const m = (function () {
      const t = (e.body || e.documentElement).style;
      let n = "transition";
      if (typeof t[n] === "string") return !0;
      const a = ["Moz", "webkit", "Webkit", "Khtml", "O", "ms"];
      n = "Transition";
      for (let i = 0; i < a.length; i++)
        if (typeof t[a[i] + n] === "string") return !0;
      return !1;
    })();
    function g(t, n) {
      n
        ? h.css({ "-webkit-transition": "", transition: "" })
        : h.css({
            "-webkit-transition": `max-height ${r.transitionSpeed}ms ${r.transitionEasing}`,
            transition: `max-height ${r.transitionSpeed}ms ${r.transitionEasing}`,
          });
    }
    function u(n) {
      let e = 0;
      n.children().each(function () {
        e += t(this).outerHeight(!0);
      }),
        n.data("oHeight", e);
    }
    function p(n, e, a, i) {
      let o;
      const s = n.filter(".open").find("> [data-content]");
      let c = s.find("[data-accordion].open > [data-content]");
      r.singleOpen ||
        (c = c.not(
          e.siblings("[data-accordion].open").find("> [data-content]")
        )),
        (o = s.add(c)),
        n.hasClass("open") &&
          o.each(function () {
            const n = t(this).data("oHeight");
            switch (i) {
              case "+":
                t(this).data("oHeight", n + a);
                break;
              case "-":
                t(this).data("oHeight", n - a);
                break;
              default:
                throw "updateParentHeight method needs an operation";
            }
            t(this).css("max-height", t(this).data("oHeight"));
          });
    }
    function v(t) {
      if (t.hasClass("open")) {
        const n = t.find("> [data-content]");
        const e = n.find("[data-accordion].open > [data-content]");
        const a = n.add(e);
        u(a), a.css("max-height", a.data("oHeight"));
      }
    }
    function E(t, n) {
      if ((t.trigger("accordion.close"), m)) {
        if (l) p(t.parents("[data-accordion]"), t, n.data("oHeight"), "-");
        n.css(f), t.removeClass("open");
      } else
        n.css("max-height", n.data("oHeight")),
          n.animate(f, r.transitionSpeed),
          t.removeClass("open");
    }
    function H(t, e) {
      if ((t.trigger("accordion.open"), m)) {
        if ((g(), l))
          p(t.parents("[data-accordion]"), t, e.data("oHeight"), "+");
        (a = function () {
          e.css("max-height", e.data("oHeight"));
        }),
          n.requestAnimationFrame
            ? requestAnimationFrame(a)
            : n.webkitRequestAnimationFrame
            ? webkitRequestAnimationFrame(a)
            : n.mozRequestAnimationFrame
            ? mozRequestAnimationFrame(a)
            : setTimeout(a, 1e3 / 60),
          t.addClass("open");
      } else
        e.animate(
          { "max-height": e.data("oHeight") },
          r.transitionSpeed,
          function () {
            e.css({ "max-height": "none" });
          }
        ),
          t.addClass("open");
      let a;
    }
    function x() {
      const n = !!r.singleOpen && c.parents(r.groupElement).length > 0;
      u(h),
        n &&
          (function (n) {
            n.closest(r.groupElement);
            const e = n.siblings("[data-accordion]").filter(".open");
            const a = e.find("[data-accordion]").filter(".open");
            const i = e.add(a);
            i.each(function () {
              const n = t(this);
              const e = n.find(r.contentElement);
              E(n, e);
            }),
              i.removeClass("open");
          })(c),
        c.hasClass("open") ? E(c, h) : H(c, h);
    }
    h.each(function () {
      const n = t(this);
      n.css("max-height") != 0 &&
        (n.closest("[data-accordion]").hasClass("open")
          ? (g(), u(n), n.css("max-height", n.data("oHeight")))
          : n.css({ "max-height": 0, overflow: "hidden" }));
    }),
      c.attr("data-accordion") ||
        (c.attr("data-accordion", ""),
        c.find(r.controlElement).attr("data-control", ""),
        c.find(r.contentElement).attr("data-content", "")),
      d.on("click", x),
      d.on("accordion.toggle", function () {
        if (r.singleOpen && d.length > 1) return !1;
        x();
      }),
      d.on("accordion.refresh", function () {
        v(c);
      }),
      t(n).on(
        "resize",
        ((a = function () {
          v(c);
        }),
        function () {
          const t = this;
          const n = arguments;
          s ? clearTimeout(s) : o && a.apply(t, n),
            (s = setTimeout(function () {
              o || a.apply(t, n), (s = null);
            }, i || 100));
        })
      );
  }),
    (t.fn[i] = function (n) {
      return this.each(function () {
        t.data(this, `plugin_${i}`) ||
          t.data(this, `plugin_${i}`, new s(this, n));
      });
    });
})(jQuery, window, document);
