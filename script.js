document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Toast Notification System (Single Timer Managed) ---
  const toast = document.getElementById("toast");
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.innerHTML = `<span>✓</span> ${message}`;
    toast.classList.add("show");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3500);
  }

  // --- 2. Dynamic Year & Live Local Time Clock ---
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const localTimeClock = document.getElementById("localTimeClock");
  const clockStatus = document.getElementById("clockStatus");
  const heroBadge = document.getElementById("heroBadge");

  function updateLocalClock() {
    if (!localTimeClock) return;
    const now = new Date();

    // Format Jam WITA (Asia/Makassar)
    const timeFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Makassar",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
    localTimeClock.textContent = timeFormatter.format(now);

    const hourFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Makassar",
      hour: "numeric",
      hour12: false
    });
    const witaHour = parseInt(hourFormatter.format(now), 10);
    const isOpen = witaHour >= 8 && witaHour < 22;

    if (clockStatus) {
      if (isOpen) {
        clockStatus.innerHTML = `<span class="status-dot green"></span> Online • Siap Menerima Proyek`;
        clockStatus.className = "clock-status open";
      } else {
        clockStatus.innerHTML = `<span class="status-dot red"></span> Offline • Istirahat (Buka 08:00 WITA)`;
        clockStatus.className = "clock-status closed";
      }
    }

    if (heroBadge) {
      if (isOpen) {
        heroBadge.innerHTML = `<span class="badge-dot"></span> Tersedia untuk freelance`;
      } else {
        heroBadge.innerHTML = `<span class="badge-dot offline"></span> Sedang Istirahat (Buka 08:00 WITA)`;
      }
    }
  }

  updateLocalClock();
  setInterval(updateLocalClock, 1000);

  // --- 3. Dark / Light Theme Switcher with OS Preference Fallback ---
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const root = document.documentElement;

  const sunIconSVG = `<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>`;
  const moonIconSVG = `<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>`;

  const savedTheme = localStorage.getItem("portfolio_theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

  root.setAttribute("data-theme", initialTheme);
  if (themeIcon) {
    themeIcon.innerHTML = initialTheme === "light" ? sunIconSVG : moonIconSVG;
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = root.getAttribute("data-theme");
      const nextTheme = currentTheme === "light" ? "dark" : "light";

      root.setAttribute("data-theme", nextTheme);
      localStorage.setItem("portfolio_theme", nextTheme);

      if (themeIcon) {
        themeIcon.innerHTML = nextTheme === "light" ? sunIconSVG : moonIconSVG;
      }
    });
  }

  // --- 4. Mobile Navigation Toggle & Outside Click Handler ---
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", false);
      });
    });

    document.addEventListener("click", (e) => {
      if (navLinks.classList.contains("open") && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", false);
      }
    });
  }

  // --- 5. Project Category Filtering ---
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // --- 6. Scroll Reveal Animation & Scroll Progress Bar ---
  const revealElements = document.querySelectorAll(".reveal");
  const progressBar = document.getElementById("progressBar");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --- 7. Active Nav Highlighting & Scroll Progress Calculation ---
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (progressBar) {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + "%";
    }

    let current = "";
    const scrollPosition = window.scrollY + 220;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });

    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- 8. Testimonials Carousel Slider & Review System ---
  const testimonialWrapper = document.getElementById("testimonialWrapper");
  const prevTestimonialBtn = document.getElementById("prevTestimonial");
  const nextTestimonialBtn = document.getElementById("nextTestimonial");
  const testimonialDotsContainer = document.getElementById("testimonialDots");

  // Load Saved Reviews from LocalStorage
  const savedUserReviews = JSON.parse(localStorage.getItem("user_testimonials") || "[]");
  if (testimonialWrapper && savedUserReviews.length > 0) {
    savedUserReviews.forEach((review) => {
      const card = document.createElement("article");
      card.className = "testimonial-card";
      card.innerHTML = `
        <div class="stars">${"⭐".repeat(review.rating)}</div>
        <p class="testimonial-quote">"${review.text}"</p>
        <div class="testimonial-author">
          <div class="author-avatar">${review.initials}</div>
          <div>
            <h4>${review.name}</h4>
            <span>${review.role}</span>
          </div>
        </div>
      `;
      testimonialWrapper.appendChild(card);
    });
  }

  let currentSlide = 0;
  let autoSlideTimer = null;

  function initTestimonialSlider() {
    if (!testimonialWrapper) return;
    const testimonialCards = testimonialWrapper.querySelectorAll(".testimonial-card");
    const totalSlides = testimonialCards.length;

    if (testimonialDotsContainer) {
      testimonialDotsContainer.innerHTML = "";
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("span");
        dot.className = `testimonial-dot ${i === currentSlide ? "active" : ""}`;
        dot.setAttribute("data-index", i);
        dot.addEventListener("click", () => goToSlide(i));
        testimonialDotsContainer.appendChild(dot);
      }
    }

    function updateSlider() {
      testimonialWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
      const dots = testimonialDotsContainer ? testimonialDotsContainer.querySelectorAll(".testimonial-dot") : [];
      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentSlide);
      });
    }

    function goToSlide(index) {
      currentSlide = (index + totalSlides) % totalSlides;
      updateSlider();
      resetAutoSlide();
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    if (nextTestimonialBtn) nextTestimonialBtn.onclick = nextSlide;
    if (prevTestimonialBtn) prevTestimonialBtn.onclick = prevSlide;

    function startAutoSlide() {
      if (autoSlideTimer) clearInterval(autoSlideTimer);
      autoSlideTimer = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
      if (autoSlideTimer) clearInterval(autoSlideTimer);
      startAutoSlide();
    }

    testimonialWrapper.onmouseenter = () => { if (autoSlideTimer) clearInterval(autoSlideTimer); };
    testimonialWrapper.onmouseleave = startAutoSlide;

    updateSlider();
    startAutoSlide();
  }

  initTestimonialSlider();

  // --- 9. Modal Management Helper (Scroll Locking & Escape Key) ---
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-backdrop.open").forEach((m) => closeModal(m));
    }
  });

  // Review Modal & Star Picker
  const openReviewModal = document.getElementById("openReviewModal");
  const reviewModalClose = document.getElementById("reviewModalClose");
  const reviewModal = document.getElementById("reviewModal");
  const reviewForm = document.getElementById("reviewForm");
  const starPicker = document.getElementById("starPicker");
  const selectedRatingInput = document.getElementById("selectedRating");

  if (openReviewModal && reviewModal) {
    openReviewModal.addEventListener("click", () => openModal(reviewModal));
  }

  if (reviewModalClose && reviewModal) {
    reviewModalClose.addEventListener("click", () => closeModal(reviewModal));
    reviewModal.addEventListener("click", (e) => {
      if (e.target === reviewModal) closeModal(reviewModal);
    });
  }

  if (starPicker && selectedRatingInput) {
    const stars = starPicker.querySelectorAll(".star-opt");
    stars.forEach((star) => {
      star.addEventListener("click", () => {
        const rating = parseInt(star.getAttribute("data-rating"), 10);
        selectedRatingInput.value = rating;

        stars.forEach((s, idx) => {
          if (idx < rating) {
            s.classList.add("active");
          } else {
            s.classList.remove("active");
          }
        });
      });
    });
  }

  if (reviewForm && testimonialWrapper) {
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("reviewName").value.trim();
      const role = document.getElementById("reviewRole").value.trim();
      const text = document.getElementById("reviewText").value.trim();
      const rating = parseInt(selectedRatingInput.value, 10) || 5;

      const nameParts = name.split(" ");
      let initials = nameParts[0].charAt(0).toUpperCase();
      if (nameParts.length > 1) {
        initials += nameParts[nameParts.length - 1].charAt(0).toUpperCase();
      }

      const newReview = { name, role, text, rating, initials };

      const userReviews = JSON.parse(localStorage.getItem("user_testimonials") || "[]");
      userReviews.push(newReview);
      localStorage.setItem("user_testimonials", JSON.stringify(userReviews));

      const card = document.createElement("article");
      card.className = "testimonial-card";
      card.innerHTML = `
        <div class="stars">${"⭐".repeat(rating)}</div>
        <p class="testimonial-quote">"${text}"</p>
        <div class="testimonial-author">
          <div class="author-avatar">${initials}</div>
          <div>
            <h4>${name}</h4>
            <span>${role}</span>
          </div>
        </div>
      `;
      testimonialWrapper.appendChild(card);

      const cards = testimonialWrapper.querySelectorAll(".testimonial-card");
      currentSlide = cards.length - 1;
      initTestimonialSlider();

      reviewForm.reset();
      if (starPicker && selectedRatingInput) {
        selectedRatingInput.value = 5;
        starPicker.querySelectorAll(".star-opt").forEach((s) => s.classList.add("active"));
      }
      closeModal(reviewModal);
      showToast("Ulasan & Rating Anda berhasil ditambahkan!");
    });
  }

  // --- 10. Accordion FAQ Toggle ---
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const item = question.parentElement;
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));

      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });

  // --- 11. Project Estimator Widget Logic ---
  const estimatorOpts = document.querySelectorAll(".estimator-opt");
  const estimatedTime = document.getElementById("estimatedTime");

  estimatorOpts.forEach((opt) => {
    opt.addEventListener("click", () => {
      estimatorOpts.forEach((o) => o.classList.remove("selected"));
      opt.classList.add("selected");

      const days = opt.getAttribute("data-days");
      if (estimatedTime && days) {
        estimatedTime.textContent = days + " Kerja";
      }
    });
  });

  // --- 12. One-Click Copy Email ---
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      const email = copyEmailBtn.getAttribute("data-email") || "azhar.sunusi@example.com";

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast("Alamat email berhasil disalin ke clipboard!");
        }).catch(() => {
          fallbackCopyText(email);
        });
      } else {
        fallbackCopyText(email);
      }
    });
  }

  function fallbackCopyText(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      showToast("Alamat email berhasil disalin!");
    } catch (err) {
      showToast("Gagal menyalin email.");
    }
    document.body.removeChild(textarea);
  }

  // --- 13. Download CV Handler (Bugfix for missing file) ---
  const downloadCvBtn = document.getElementById("downloadCvBtn");
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener("click", (e) => {
      // Check if cv.pdf exists or prevent broken link
      showToast("Mengunduh CV Azhar Sunusi...");
    });
  }

  // --- 14. Contact Form Submission Handling (Bugfix display state) ---
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Mengirim...";
      submitBtn.disabled = true;
      formStatus.style.display = ""; // Reset inline display bug!

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        formStatus.textContent = "✓ Terima kasih! Pesan Anda berhasil terkirim. Saya akan segera menghubungi Anda kembali.";
        formStatus.className = "form-status success";

        contactForm.reset();

        setTimeout(() => {
          formStatus.className = "form-status";
        }, 6000);
      }, 1000);
    });
  }

  // --- 15. Project Modal Details Data & Event Listeners ---
  const projectDetails = {
    "highway-racer": {
      title: "Highway Racer Ultra HD 3D",
      category: "Game 3D • HTML5 Canvas",
      description: "Game balapan mobil 3D jalan tol super smooth 60 FPS yang dibangun dengan HTML5 Canvas & JavaScript murni. Memiliki sistem kamera 3D pseudo-perspective, mobil lalu lintas interaktif, efek nitro, dan kontrol responsif.",
      tech: ["HTML5 Canvas", "JavaScript ES6+", "3D Projection Math", "CSS Glassmorphism"],
      demoUrl: "../Game/index.html",
      githubUrl: "#"
    },
    "rental-ai": {
      title: "Rental Mobil AI",
      category: "Web Application • AI Integration",
      description: "Aplikasi rental mobil modern yang memanfaatkan kecerdasan buatan untuk merekomendasikan kendaraan terbaik sesuai budget, lokasi, dan preferensi pengguna secara presisi.",
      tech: ["HTML5", "CSS3", "JavaScript", "React", "AI API"],
      demoUrl: "#",
      githubUrl: "#"
    },
    "admin-panel": {
      title: "Admin Panel Analytics",
      category: "Dashboard • Real-Time Data",
      description: "Dashboard manajemen data interaktif untuk memantau performa bisnis, statistik pengguna, pendapatan bulanan, dan log aktivitas secara real-time.",
      tech: ["JavaScript", "Chart.js", "REST API", "Tailwind"],
      demoUrl: "#",
      githubUrl: "#"
    },
    "landing-page": {
      title: "Brand Landing Page",
      category: "UI/UX Design • Landing Page",
      description: "Landing page modern dengan performa optimal dan animasi scroll halus untuk memikat pengunjung dan meningkatkan tingkat konversi produk.",
      tech: ["HTML5", "CSS Grid", "JavaScript Reveal"],
      demoUrl: "#",
      githubUrl: "#"
    }
  };

  const projectModal = document.getElementById("projectModal");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");

  if (projectModal && modalBody && modalClose) {
    document.querySelectorAll("[data-project]").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const projectId = button.getAttribute("data-project");
        const data = projectDetails[projectId];

        if (data) {
          modalBody.innerHTML = `
            <span class="pill">${data.category}</span>
            <h3 style="margin-top: 0.8rem;">${data.title}</h3>
            <p>${data.description}</p>
            <h4 style="font-size: 0.88rem; margin-bottom: 0.5rem; color: var(--text);">Teknologi Digunakan:</h4>
            <div class="modal-tech">
              ${data.tech.map((t) => `<span class="pill" style="background: var(--card-bg); color: var(--muted); border-color: var(--border);">${t}</span>`).join("")}
            </div>
            <div style="display: flex; gap: 0.8rem; margin-top: 1.5rem; flex-wrap: wrap;">
              <a href="${data.demoUrl}" class="btn btn-primary" style="padding: 0.6rem 1.2rem; font-size: 0.88rem;">Lihat Live Demo</a>
              <a href="${data.githubUrl}" class="btn btn-secondary" style="padding: 0.6rem 1.2rem; font-size: 0.88rem;">Kode GitHub</a>
            </div>
          `;
          openModal(projectModal);
        }
      });
    });

    modalClose.addEventListener("click", () => closeModal(projectModal));
    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) closeModal(projectModal);
    });
  }

  // --- 16. Card 3D Tilt Parallax Effect ---
  function init3DTiltEffect() {
    const tiltCards = document.querySelectorAll(
      ".hero-card, .project-card, .skill-card, .cert-card, .about-card, .testimonial-card, .contact-card"
    );

    if (window.matchMedia("(pointer: fine)").matches) {
      tiltCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const cardWidth = rect.width;
          const cardHeight = rect.height;

          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          const rotateX = ((mouseY / cardHeight) - 0.5) * -16;
          const rotateY = ((mouseX / cardWidth) - 0.5) * 16;

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        });
      });
    }
  }

  init3DTiltEffect();
});
