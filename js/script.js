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

// Keep desktop side nav visible at all times without overriding mobile positioning.
function syncSideNavLayoutState() {
  if (!sideNav) {
    return;
  }

  if (window.matchMedia("(min-width: 1024px)").matches) {
    gsap.set(sideNav, { opacity: 1, x: 0 });
  } else {
    gsap.set(sideNav, { opacity: 1, clearProps: "x" });
  }
}

syncSideNavLayoutState();

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

gsap.to("#portfolio .portfolio-card", {
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
  syncSideNavLayoutState();
});

(function initPortfolioSwiper() {
  const portfolioSlider = document.querySelector("#portfolio-slider");
  const dotsWrap = document.getElementById("portfolio-scroll-dots");

  if (typeof Swiper === "undefined" || !portfolioSlider) {
    return;
  }

  const portfolioSwiper = new Swiper("#portfolio-slider", {
    loop: false,
    grabCursor: true,
    spaceBetween: 24,
    navigation: {
      nextEl: "#portfolio-scroll-next",
      prevEl: "#portfolio-scroll-prev"
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 }
    }
  });

  if (!dotsWrap) {
    return;
  }

  const totalSlides = portfolioSwiper.slides.length;
  const dots = [];

  function setActiveDot(activeIndex) {
    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
      dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
    });
  }

  function getProgressForDot(index) {
    if (totalSlides <= 1) {
      return 0;
    }
    return index / (totalSlides - 1);
  }

  dotsWrap.innerHTML = "";
  for (let index = 0; index < totalSlides; index += 1) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "portfolio-scroll-dot";
    dot.setAttribute("aria-label", `Go to portfolio card ${index + 1}`);
    dot.addEventListener("click", () => {
      portfolioSwiper.setProgress(getProgressForDot(index), 400);
      setActiveDot(index);
    });
    dotsWrap.appendChild(dot);
    dots.push(dot);
  }

  setActiveDot(0);

  portfolioSwiper.on("progress", () => {
    const progressIndex = Math.round(portfolioSwiper.progress * Math.max(1, totalSlides - 1));
    const clampedIndex = Math.max(0, Math.min(totalSlides - 1, progressIndex));
    setActiveDot(clampedIndex);
  });
})();

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

// Portfolio lightbox for enlarged preview (images + videos).
(function initPortfolioLightbox() {
  const imageTriggers = Array.from(document.querySelectorAll(".portfolio-image-trigger"));
  const videoTriggers = Array.from(document.querySelectorAll(".portfolio-video-trigger"));
  const lightbox = document.getElementById("portfolio-lightbox");
  const lightboxImage = document.getElementById("portfolio-lightbox-image");
  const lightboxIframe = document.getElementById("portfolio-lightbox-iframe");
  const lightboxVideo = document.getElementById("portfolio-lightbox-video");
  const closeButton = document.getElementById("portfolio-lightbox-close");
  const backdrop = lightbox ? lightbox.querySelector("[data-lightbox-close]") : null;

  if (!lightbox || !closeButton || !backdrop) {
    return;
  }

  let activeTrigger = null;

  function hideAllMedia() {
    if (lightboxImage) { lightboxImage.hidden = true; lightboxImage.src = ""; }
    if (lightboxIframe) { lightboxIframe.hidden = true; lightboxIframe.src = ""; }
    if (lightboxVideo) { lightboxVideo.hidden = true; lightboxVideo.pause(); lightboxVideo.src = ""; }
  }

  function closeLightbox() {
    hideAllMedia();
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    if (activeTrigger) activeTrigger.focus();
  }

  function openImageLightbox(trigger) {
    const sourceImage = trigger.querySelector("img");
    if (!sourceImage) return;
    activeTrigger = trigger;
    hideAllMedia();
    lightboxImage.src = sourceImage.src;
    lightboxImage.alt = sourceImage.alt;
    lightboxImage.hidden = false;
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  }

  function openVideoLightbox(trigger) {
    const src = trigger.getAttribute("data-video-src");
    const title = trigger.getAttribute("data-video-title") || "Portfolio video";
    if (!src) return;
    activeTrigger = trigger;
    hideAllMedia();

    const isYouTubeOrExternal = /^https?:\/\//.test(src) && !src.match(/\.(mp4|webm|ogg)(\?|$)/i);

    if (isYouTubeOrExternal) {
      // Append autoplay for YouTube embeds
      const autoSrc = src.includes("?") ? src + "&autoplay=1" : src + "?autoplay=1";
      lightboxIframe.src = autoSrc;
      lightboxIframe.title = title;
      lightboxIframe.hidden = false;
    } else {
      lightboxVideo.src = src;
      lightboxVideo.hidden = false;
      lightboxVideo.play().catch(() => {});
    }

    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  }

  imageTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openImageLightbox(trigger));
  });

  videoTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openVideoLightbox(trigger));
  });

  closeButton.addEventListener("click", closeLightbox);
  backdrop.addEventListener("click", closeLightbox);

   document.addEventListener("keydown", (event) => {
     if (!lightbox.hidden && event.key === "Escape") {
       closeLightbox();
     }
   });
})();

// Service card modal for clickable service information.
(function initServiceModal() {
   const serviceCards = Array.from(document.querySelectorAll(".service-card-trigger"));
   const modal = document.getElementById("service-modal");
   const modalTitle = document.getElementById("service-modal-title");
   const modalText = document.getElementById("service-modal-text");
   const closeButton = document.getElementById("service-modal-close");
   const backdrop = modal ? modal.querySelector("[data-service-modal-close]") : null;

   if (!modal || !closeButton || !backdrop) {
     return;
   }

   // Service card expanded content
   const serviceContent = {
     "service-card-1": {
       title: "Logo Creation",
       text: "Your logo is the absolute foundation of your brand's visual identity, and it needs to be memorable, scalable, and instantly recognizable.\n\n We don't just draw pretty graphics; we engineer strategic, premium logo systems built to command attention in any environment. Whether you need a sleek minimalist monogram or a bold, aggressive emblem, we craft visual hooks that communicate your brand's authority the second someone sees it.\n\n• Unique Concepts\nTailored design directions based on your specific industry and target audience.\n• Versatile Systems\nPrimary logos, secondary marks, and simplified icons so your brand looks perfect on everything from a giant billboard to a tiny browser favicon.\n• Industry-Standard Files\n\nYou receive fully scalable vector files (.SVG, .EPS) and high-res digital formats (.PNG, .JPG) ready for immediate use."
     },
     "service-card-2": {
       title: "Photo Editing",
       text: "Professional retouching, color grading, and cinematic enhancement tailored to your vision.\n\nWe specialize in:\n• Beauty and portrait retouching\n• Product photography enhancement\n• Color grading and LUT creation\n• Campaign image optimization\n• Batch processing for consistency\n\nEvery edit maintains your subject's authenticity while achieving a polished, professional look."
     },
     "service-card-3": {
       title: "Brand Identity",
       text: "A complete visual system that keeps your brand instantly recognizable across every touchpoint.\n\nWe develop:\n• Custom typography pairings\n• Cohesive color palettes\n• Visual guidelines and patterns\n• Icon systems\n• Accessibility-first design\n\nOur brand identities are designed to scale from social media to billboards while maintaining their visual integrity."
     },
     "service-card-4": {
       title: "Social Visuals",
       text: "Scroll-stopping post designs, ad creatives, and story templates optimized for maximum engagement.\n\nWe create:\n• Platform-specific dimensions\n• Branded social templates\n• Campaign-ready ad creatives\n• Story sticker designs\n• Carousel post sequences\n\nEach visual is crafted to stand out in crowded feeds while maintaining your brand's cinematic aesthetic."
     }
   };

   let activeTrigger = null;

   function closeModal() {
     modal.hidden = true;
     modal.setAttribute("aria-hidden", "true");
     document.body.classList.remove("service-modal-open");
     if (activeTrigger) activeTrigger.focus();
   }

   function openModal(trigger) {
     const cardId = trigger.id;
     const content = serviceContent[cardId];

     if (!content) return;

     activeTrigger = trigger;
     modalTitle.textContent = content.title;
     modalText.textContent = content.text;
     modal.hidden = false;
     modal.setAttribute("aria-hidden", "false");
     document.body.classList.add("service-modal-open");
     closeButton.focus();
   }

   serviceCards.forEach((card) => {
     card.addEventListener("click", () => openModal(card));
     card.addEventListener("keydown", (event) => {
       if (event.key === "Enter" || event.key === " ") {
         event.preventDefault();
         openModal(card);
       }
     });
   });

   closeButton.addEventListener("click", closeModal);
   backdrop.addEventListener("click", closeModal);

   document.addEventListener("keydown", (event) => {
     if (!modal.hidden && event.key === "Escape") {
       closeModal();
     }
   });
})();

