const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.classList.add("animated");
    }
  });
}, observerOptions);

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  // Scroll animations
  const animateElements = document.querySelectorAll(".animate-on-scroll");
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });

  // Hero initial fade
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(30px)";
    heroContent.style.transition = "all 1s ease 0.2s";
    setTimeout(() => {
      heroContent.style.opacity = "1";
      heroContent.style.transform = "translateY(0)";
    }, 200);
  }

  // Mobile menu toggle
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navList = document.querySelector(".nav-list");
  if (mobileBtn && navList) {
    mobileBtn.addEventListener("click", () => {
      mobileBtn.classList.toggle("active");
      navList.classList.toggle("active");
    });

    // Close on link click
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileBtn.classList.remove("active");
        navList.classList.remove("active");
      });
    });
  }

  // Navbar scroll effect (dark theme compatible)
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.scrollY > 100) {
      header.style.background = "rgba(27, 28, 34, 0.98)";
      header.style.boxShadow = "0 8px 32px rgba(126, 123, 138, 0.2)";
    } else {
      header.style.background = "rgba(27, 28, 34, 0.95)";
      header.style.boxShadow = "0 4px 20px rgba(126, 123, 138, 0.12)";
    }
  });
});

// Smooth scroll
document.querySelectorAll('a[href^=\"#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Search filter (for offers page)
const searchInput = document.getElementById("search");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll(".card").forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(term) ? "block" : "none";
    });
  });
}

// Form feedback
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector(
      'button[type="submit"], .btn[type="submit"]',
    );
    if (btn) {
      const original = btn.textContent;
      btn.textContent = "Enviado! ✅";
      btn.disabled = true;
      btn.style.opacity = "0.7";
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.opacity = "1";
        form.reset();
      }, 2500);
    }
  });
});

// Close mobile menu on resize
window.addEventListener("resize", () => {
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navList = document.querySelector(".nav-list");
  if (window.innerWidth > 992) {
    mobileBtn?.classList.remove("active");
    navList?.classList.remove("active");
  }
});
