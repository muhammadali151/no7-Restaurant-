/* No. 7 — interactions */
(function () {
  "use strict";

  /* mobile nav */
  var burger = document.querySelector(".burger");
  var links = document.querySelector(".menu-links");
  if (burger && links) {
    burger.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  /* nav shadow on scroll */
  var nav = document.querySelector(".nav");
  if (nav) {
    window.addEventListener("scroll", function () {
      nav.style.boxShadow = window.scrollY > 20 ? "0 10px 30px -20px rgba(28,26,23,.5)" : "none";
    });
  }

  /* scroll reveal */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* count-up stats */
  function countUp(el) {
    var target = +el.dataset.count;
    var suffix = el.dataset.suffix || "";
    var dur = 1600, start = performance.now();
    function step(now) {
      var p = Math.min((now - start) / dur, 1);
      var val = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      el.textContent = val.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var statObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { countUp(e.target); statObs.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll("[data-count]").forEach(function (el) { statObs.observe(el); });

  /* menu tabs */
  var tabs = document.querySelectorAll(".menu-tabs button");
  var panels = document.querySelectorAll(".menu-panel");
  tabs.forEach(function (btn) {
    btn.addEventListener("click", function () {
      tabs.forEach(function (b) { b.classList.remove("active"); });
      panels.forEach(function (p) { p.classList.remove("active"); });
      btn.classList.add("active");
      var panel = document.getElementById(btn.dataset.tab);
      if (panel) panel.classList.add("active");
    });
  });

  /* reservation form (front-end demo) */
  var form = document.querySelector("#resvForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = document.querySelector("#resvMsg");
      var name = form.querySelector("[name=name]").value || "there";
      var date = form.querySelector("[name=date]").value;
      var time = form.querySelector("[name=time]").value;
      msg.innerHTML = "Thank you, <b>" + name + "</b>. We've received your request for <b>" +
        (date || "your chosen date") + "</b> at <b>" + (time || "your chosen time") +
        "</b>. Our team will confirm by email shortly.";
      msg.classList.add("show");
      form.reset();
      msg.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* newsletter demo */
  var news = document.querySelector("#newsForm");
  if (news) {
    news.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = news.querySelector("input");
      input.value = "";
      input.placeholder = "Welcome to the table — check your inbox!";
    });
  }

  /* footer year */
  var y = document.querySelector("#year");
  if (y) y.textContent = new Date().getFullYear();

  /* set min date on reservation */
  var dateInput = document.querySelector("input[name=date]");
  if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];
})();
