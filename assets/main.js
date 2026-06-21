/* ===== ROBOT UPRISING — Portfolio interactions ===== */
(function () {
  "use strict";

  /* ---- Game launch (lazy-load iframe) ---- */
  var gameModal = document.getElementById("gameModal");
  var gameStage = document.getElementById("gameStage");
  var playStage = document.getElementById("playStage");
  var playPlaceholder = document.getElementById("playPlaceholder");
  var GAME_URL = "game/index.html";

  function buildGameFrame() {
    var f = document.createElement("iframe");
    f.src = GAME_URL;
    f.title = "ROBOT UPRISING";
    f.allow = "fullscreen; autoplay; gamepad";
    f.allowFullscreen = true;
    return f;
  }

  // Open in fullscreen modal
  function openGameModal() {
    if (!gameStage.querySelector("iframe")) {
      gameStage.appendChild(buildGameFrame());
    }
    gameModal.classList.add("open");
    gameModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeGameModal() {
    gameModal.classList.remove("open");
    gameModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Full-screen modal launch (hero + play section)
  document.querySelectorAll("[data-play-modal]").forEach(function (btn) {
    btn.addEventListener("click", openGameModal);
  });

  // Inline launch: mount the game directly inside the Play section stage
  document.querySelectorAll("[data-play-inline]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (playPlaceholder && playPlaceholder.parentNode) playPlaceholder.remove();
      if (!playStage.querySelector("iframe")) playStage.appendChild(buildGameFrame());
    });
  });

  document.querySelectorAll("[data-close-game]").forEach(function (b) {
    b.addEventListener("click", closeGameModal);
  });

  var gameFs = document.getElementById("gameFs");
  if (gameFs) {
    gameFs.addEventListener("click", function () {
      var el = gameStage;
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    });
  }

  /* ---- PDF viewer ---- */
  var pdfModal = document.getElementById("pdfModal");
  var pdfFrame = document.getElementById("pdfFrame");
  var pdfTitle = document.getElementById("pdfTitle");
  var pdfOpen = document.getElementById("pdfOpen");

  document.querySelectorAll("[data-pdf]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var url = btn.getAttribute("data-pdf");
      pdfFrame.src = url;
      pdfOpen.href = url;
      pdfTitle.textContent = btn.getAttribute("data-title") || "문서";
      pdfModal.classList.add("open");
      pdfModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });
  document.querySelectorAll("[data-close-pdf]").forEach(function (b) {
    b.addEventListener("click", function () {
      pdfModal.classList.remove("open");
      pdfModal.setAttribute("aria-hidden", "true");
      pdfFrame.src = "";
      document.body.style.overflow = "";
    });
  });

  /* ---- Lightbox gallery ---- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  document.querySelectorAll(".shot").forEach(function (fig) {
    fig.addEventListener("click", function () {
      lbImg.src = fig.getAttribute("data-full");
      lbImg.alt = fig.querySelector("img").alt;
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
    });
  });
  document.querySelectorAll("[data-close-lb]").forEach(function (b) {
    b.addEventListener("click", function () {
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
    });
  });
  lb.addEventListener("click", function (e) {
    if (e.target === lb) {
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
    }
  });

  /* ---- Esc closes any overlay ---- */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (gameModal.classList.contains("open")) closeGameModal();
    if (pdfModal.classList.contains("open")) {
      pdfModal.classList.remove("open");
      pdfFrame.src = "";
      document.body.style.overflow = "";
    }
    if (lb.classList.contains("open")) lb.classList.remove("open");
  });

  /* ---- YouTube embeds: set data-yt="VIDEO_ID" to activate ---- */
  document.querySelectorAll(".video-embed").forEach(function (box) {
    var id = box.getAttribute("data-yt");
    if (!id || id.indexOf("REPLACE_") === 0) return; // placeholder, keep poster
    var f = document.createElement("iframe");
    f.src = "https://www.youtube.com/embed/" + id;
    f.title = "YouTube video";
    f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    f.allowFullscreen = true;
    box.innerHTML = "";
    box.appendChild(f);
  });

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll(".section, .hero-card");
  revealEls.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Count-up stats ---- */
  var counted = false;
  function runCounts() {
    if (counted) return;
    counted = true;
    document.querySelectorAll(".stat-num").forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var start = 0, dur = 1100, t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        el.textContent = Math.floor(start + (target - start) * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  var statsHost = document.querySelector(".stats");
  if (statsHost && "IntersectionObserver" in window) {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { runCounts(); io2.disconnect(); } });
    }, { threshold: 0.4 });
    io2.observe(statsHost);
  } else { runCounts(); }
})();
