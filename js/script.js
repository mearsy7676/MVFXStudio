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

// Navbar appears once user leaves hero.
ScrollTrigger.create({
  trigger: "#home",
  start: "bottom top",
  onEnter: () => gsap.to("#navbar", { opacity: 1, duration: 0.35, ease: "power2.out" }),
  onLeaveBack: () => gsap.to("#navbar", { opacity: 0, duration: 0.35, ease: "power2.out" })
});

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

gsap.to("#service-card-1, #service-card-2, #service-card-3, #service-card-4", {
  scrollTrigger: { trigger: "#services", start: "top 66%" },
  opacity: 1,
  y: -8,
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

