gsap.registerPlugin(ScrollTrigger);

// Hero entrance animation.
gsap.timeline({ delay: 0.4 })
  .to("#light-streak", { opacity: 1, duration: 0.25 })
  .fromTo("#light-streak", { x: "-100%" }, { x: "100%", duration: 1.1, ease: "power2.out" })
  .to("#logo", { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" }, "-=0.5")
  .to("#hero-kicker", { opacity: 1, y: -6, duration: 0.6, ease: "power2.out" }, "-=0.45")
  .to("#tagline", { opacity: 1, y: -10, duration: 0.9, ease: "power2.out" }, "-=0.35")
  .to("#hero-subtitle", { opacity: 1, y: -8, duration: 0.9, ease: "power2.out" }, "-=0.55")
  .to("#hero-cta", { opacity: 1, y: -4, duration: 0.8, ease: "power2.out" }, "-=0.45");

// Floating side navigation reveal and behavior.
const sideNav = document.getElementById("side-nav");
const sideNavToggle = document.getElementById("side-nav-toggle");
const sectionLinks = Array.from(document.querySelectorAll("[data-section-link]"));

// Keep desktop side nav visible at all times.
gsap.set("#side-nav", { opacity: 1, x: 0 });

function setActiveLink(sectionId) {
  sectionLinks.forEach((link) => {
    const isActive = link.getAttribute("data-section-link") === sectionId;
    link.classList.toggle("active", isActive);
  });
}

["home", "services", "portfolio", "process", "contact"].forEach((sectionId) => {
  ScrollTrigger.create({
    trigger: `#${sectionId}`,
    start: "top 45%",
    end: "bottom 45%",
    onEnter: () => setActiveLink(sectionId),
    onEnterBack: () => setActiveLink(sectionId)
  });
});

if (sideNavToggle && sideNav) {
  sideNavToggle.addEventListener("click", () => {
    const isOpen = sideNav.classList.toggle("side-nav-open");
    sideNavToggle.setAttribute("aria-expanded", String(isOpen));
    sideNavToggle.textContent = isOpen ? "Close" : "Menu";
  });

  sectionLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 1023px)").matches) {
        sideNav.classList.remove("side-nav-open");
        sideNavToggle.setAttribute("aria-expanded", "false");
        sideNavToggle.textContent = "Menu";
      }
    });
  });
}

// About section.
gsap.from("#divider-about", {
  scrollTrigger: { trigger: "#about", start: "top 80%" },
  width: 0,
  opacity: 0,
  duration: 0.9,
  ease: "power2.out"
});

gsap.to("#about-title", {
  scrollTrigger: { trigger: "#about", start: "top 75%" },
  opacity: 1,
  y: -8,
  duration: 0.9,
  ease: "power2.out"
});

gsap.to("#about-text", {
  scrollTrigger: { trigger: "#about", start: "top 70%" },
  opacity: 1,
  y: -8,
  duration: 1,
  ease: "power2.out"
});

// Services section.
gsap.to("#services-title-wrap", {
  scrollTrigger: { trigger: "#services", start: "top 78%" },
  opacity: 1,
  y: -10,
  duration: 0.9,
  ease: "power2.out"
});

gsap.from("#services .card-item", {
  scrollTrigger: { trigger: "#services", start: "top 66%" },
  opacity: 0,
  y: 10,
  duration: 0.8,
  stagger: 0.12,
  ease: "power2.out"
});

// Portfolio section.
gsap.to("#portfolio-title", {
  scrollTrigger: { trigger: "#portfolio", start: "top 78%" },
  opacity: 1,
  y: -8,
  duration: 0.9,
  ease: "power2.out"
});

gsap.to("#portfolio-copy", {
  scrollTrigger: { trigger: "#portfolio", start: "top 74%" },
  opacity: 1,
  y: -6,
  duration: 0.9,
  ease: "power2.out"
});

gsap.to("#portfolio-card-1, #portfolio-card-2, #portfolio-card-3", {
  scrollTrigger: { trigger: "#portfolio", start: "top 66%" },
  opacity: 1,
  y: -8,
  duration: 0.8,
  stagger: 0.12,
  ease: "power2.out"
});

// Process section.
gsap.to("#process-title", {
  scrollTrigger: { trigger: "#process", start: "top 80%" },
  opacity: 1,
  y: -8,
  duration: 0.9,
  ease: "power2.out"
});

gsap.to("#process-step-1, #process-step-2, #process-step-3", {
  scrollTrigger: { trigger: "#process", start: "top 70%" },
  opacity: 1,
  y: -8,
  duration: 0.8,
  stagger: 0.14,
  ease: "power2.out"
});

// Contact section.
gsap.to("#contact-panel", {
  scrollTrigger: { trigger: "#contact", start: "top 75%" },
  opacity: 1,
  y: -8,
  duration: 0.9,
  ease: "power2.out"
});

gsap.to("#contact-title", {
  scrollTrigger: { trigger: "#contact", start: "top 72%" },
  opacity: 1,
  y: -8,
  duration: 0.9,
  ease: "power2.out"
});

gsap.to("#contact-text", {
  scrollTrigger: { trigger: "#contact", start: "top 68%" },
  opacity: 1,
  y: -8,
  duration: 0.9,
  ease: "power2.out"
});

gsap.to("#contact-actions", {
  scrollTrigger: { trigger: "#contact", start: "top 64%" },
  opacity: 1,
  y: -6,
  duration: 0.9,
  ease: "power2.out"
});

// Footer reveal.
gsap.to("#footer-brand, #footer-copy", {
  scrollTrigger: { trigger: "footer", start: "top 85%" },
  opacity: 1,
  y: -4,
  duration: 0.8,
  stagger: 0.08,
  ease: "power2.out"
});

// Particle background effect.
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 18000));
  for (let i = 0; i < count; i += 1) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.8 + 0.4,
      speed: Math.random() * 0.35 + 0.08,
      alpha: Math.random() * 0.45 + 0.1
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.y -= particle.speed;
    if (particle.y < -2) {
      particle.y = canvas.height + 2;
      particle.x = Math.random() * canvas.width;
    }

    ctx.fillStyle = `rgba(56, 189, 248, ${particle.alpha})`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

resizeCanvas();
createParticles();
animateParticles();

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

if (typeof Swiper !== "undefined" && document.querySelector("#services .slider-wrapper")) {
  // Services slider from the attached Swiper layout.
  new Swiper("#services .slider-wrapper", {
    loop: true,
    grabCursor: true,
    spaceBetween: 24,
    pagination: {
      el: "#services .swiper-pagination",
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
      nextEl: "#services .swiper-button-next",
      prevEl: "#services .swiper-button-prev"
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 }
    }
  });
}
// ===== True Typing & Deleting Animation Logic (With Colors!) =====
const typedTextSpan = document.querySelector(".sec-text");
const cursorSpan = document.querySelector(".cursor");

if (typedTextSpan) {
  // Array holding both the words and their specific colors
  const textArray = [
    { word: "Creative", color: "#ef4444" },       // Red
    { word: "Design", color: "#22c55e" }, // Green
    { word: "Branding", color: "#3b82f6" }    // Blue
  ];

  const typingDelay = 150;
  const erasingDelay = 100;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    // Change the text color right before we start typing a new word
    if (charIndex === 0) {
      typedTextSpan.style.color = textArray[textArrayIndex].color;
    }

    if (charIndex < textArray[textArrayIndex].word.length) {
      typedTextSpan.textContent += textArray[textArrayIndex].word.charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].word.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 500);
    }
  }

  setTimeout(type, 1500);
}
