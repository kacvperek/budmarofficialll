/* ========================
   HAMBURGER / MOBILE DRAWER
======================== */
const hamburger = document.getElementById("hamburger");
const mobileDrawer = document.getElementById("mobileDrawer");
const mobileOverlay = document.getElementById("mobileOverlay");
const drawerClose = document.getElementById("drawerClose");
const drawerLinks = document.querySelectorAll(".drawer-link, .drawer-cta");

function openDrawer() {
  mobileDrawer.classList.add("open");
  mobileOverlay.classList.add("active");
  hamburger.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  mobileDrawer.classList.remove("open");
  mobileOverlay.classList.remove("active");
  hamburger.classList.remove("open");
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", () => {
  if (mobileDrawer.classList.contains("open")) {
    closeDrawer();
  } else {
    openDrawer();
  }
});

drawerClose.addEventListener("click", closeDrawer);
mobileOverlay.addEventListener("click", closeDrawer);

drawerLinks.forEach(link => {
  link.addEventListener("click", closeDrawer);
});

/* ========================
   MEDIA SLIDER
======================== */
const mediaItems = document.querySelectorAll(".media-item");
const nextBtn = document.getElementById("nextMedia");
const prevBtn = document.getElementById("prevMedia");
const dotsContainer = document.getElementById("mediaDots");

let current = 0;
let auto;

// CREATE DOTS
mediaItems.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "media-dot" + (i === 0 ? " active" : "");
  dot.addEventListener("click", () => {
    showSlide(i);
    resetAuto();
  });
  dotsContainer.appendChild(dot);
});

function updateDots() {
  document.querySelectorAll(".media-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === current);
  });
}

function showSlide(index) {
  mediaItems.forEach(item => {
    item.classList.remove("active");
    const video = item.querySelector("video");
    if (video) video.pause();
  });

  current = index;
  mediaItems[current].classList.add("active");
  updateDots();

  const activeVideo = mediaItems[current].querySelector("video");
  if (activeVideo) activeVideo.play();
}

function nextSlide() {
  current = (current + 1) % mediaItems.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + mediaItems.length) % mediaItems.length;
  showSlide(current);
}

function startAuto() {
  auto = setInterval(nextSlide, 4500);
}

function resetAuto() {
  clearInterval(auto);
  startAuto();
}

nextBtn.addEventListener("click", () => { nextSlide(); resetAuto(); });
prevBtn.addEventListener("click", () => { prevSlide(); resetAuto(); });

// SWIPE SUPPORT
let touchStartX = 0;
const sliderEl = document.querySelector(".media-slider");

sliderEl.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

sliderEl.addEventListener("touchend", e => {
  const diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 40) {
    if (diff > 0) { nextSlide(); } else { prevSlide(); }
    resetAuto();
  }
}, { passive: true });

startAuto();

/* ========================
   STATS COUNTER ANIMATION
======================== */
function animateCounter(el, target) {
  let count = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(timer);
    }
    el.textContent = count;
  }, 25);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute("data-target"));
      animateCounter(el, target);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".stat-number").forEach(el => {
  statsObserver.observe(el);
});

/* ========================
   FAQ ACCORDION
======================== */
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains("open");

    // Close all
    document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));

    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add("open");
    }
  });
});

/* ========================
   SMOOTH SCROLL OFFSET (dla fixed header)
======================== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});
