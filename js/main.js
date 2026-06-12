/* ==========================================================================
   DYNAMIC EXPRESS SOLUTIONS — main.js (Vanilla JS, no dependencies)
   Features: mobile nav, sticky-header UX, contact-form validation,
             scroll-reveal animations, back-to-top, dynamic year.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- 1. Mobile navigation toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    // Close menu after choosing a link (mobile UX)
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- 2. Contact form validation + simulated submit ---------- */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  function setInvalid(field, invalid) {
    field.classList.toggle("invalid", invalid);
  }

  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var requiredFields = form.querySelectorAll("[required]");
      var firstInvalid = null;

      requiredFields.forEach(function (field) {
        var empty = !field.value || !field.value.trim();
        setInvalid(field, empty);
        if (empty && !firstInvalid) firstInvalid = field;
      });

      // Basic phone sanity check (Ghana-friendly: digits, +, spaces, dashes; >= 9 digits)
      var phone = form.querySelector("#phone");
      if (phone && phone.value.trim()) {
        var digits = phone.value.replace(/\D/g, "");
        var phoneOk = digits.length >= 9 && /^[+\d][\d\s\-()]*$/.test(phone.value.trim());
        setInvalid(phone, !phoneOk);
        if (!phoneOk && !firstInvalid) firstInvalid = phone;
      }

      // Optional email — validate only if provided
      var email = form.querySelector("#email");
      if (email && email.value.trim()) {
        var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());
        setInvalid(email, !emailOk);
        if (!emailOk && !firstInvalid) firstInvalid = email;
      }

      if (firstInvalid) {
        status.textContent = "⚠️ Please fill in the highlighted fields correctly.";
        status.className = "form-status err";
        firstInvalid.focus();
        return;
      }

      /* Front-end only: simulate a successful submission.
         In production, replace this block with a fetch() POST to your
         backend endpoint or a form service (e.g. Formspree). */
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = "Sending…";

      setTimeout(function () {
        status.textContent =
          "✅ Thank you! Your request has been received. Our team will contact you shortly.";
        status.className = "form-status ok";
        form.reset();
        btn.disabled = false;
        btn.textContent = "Send Request 🚀";
      }, 900);
    });

    // Clear error styling as the user types
    form.addEventListener("input", function (e) {
      if (e.target.classList.contains("invalid") && e.target.value.trim()) {
        e.target.classList.remove("invalid");
      }
    });
  }

  /* ---------- 3. Scroll-reveal animations (IntersectionObserver) ---------- */
  var revealTargets = document.querySelectorAll(
    ".gallery-card, .service-card, .why-card, .location-card, .contact-form, .contact-info, .work-gallery-item"
  );

  if ("IntersectionObserver" in window) {
    revealTargets.forEach(function (el) { el.classList.add("reveal"); });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- 4. Back-to-top button ---------- */
  var backToTop = document.getElementById("backToTop");
  if (backToTop) {
    var onScroll = function () {
      backToTop.classList.toggle("show", window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 5. Dynamic copyright year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 6. Work Gallery & Lightbox Logic ---------- */
  var workGalleryData = [
    {
      id: "des_gal_1",
      category: "pest",
      title: "Warehouse Fumigation",
      desc: "Large-scale grain and storage stack gas fumigation under heavy plastic sheeting in Tema.",
      image: "images/fumigation-warehouse.jpg",
      alt: "Large industrial warehouse bags wrapped in protective sheets for gas fumigation"
    },
    {
      id: "des_gal_2",
      category: "clean",
      title: "Kitchen Deep Sanitization",
      desc: "Professional kitchen cleaning, grease removal, and surface sanitation in Tema.",
      image: "https://i.pinimg.com/736x/4c/51/ea/4c51ea02f045a9bc15fc7d504b70700d.jpg",
      alt: "Professional cleaning staff scrubbing industrial kitchen surfaces"
    },
    {
      id: "des_gal_3",
      category: "sofa",
      title: "Sofa & Upholstery Cleaning",
      desc: "Extraction cleaning process restoring premium fabric sofa set in Kumasi.",
      image: "https://i.pinimg.com/736x/6c/70/4b/6c704ba0a00fe47d03c1932ce861a5f7.jpg",
      alt: "Deep extraction vacuum cleaner washing sofa upholstery fabrics"
    },
    {
      id: "des_gal_4",
      category: "post",
      title: "Post-Construction Handover",
      desc: "Final detailed dust-removal and window polishing of a luxury villa before client handover.",
      image: "https://i.pinimg.com/1200x/b8/d7/6a/b8d76a8d11519892fbda111047606273.jpg",
      alt: "Sleek and sparkling clean modern apartment living room after cleanup"
    },
    {
      id: "des_gal_5",
      category: "pest",
      title: "Residential Termite Treatment",
      desc: "Preventative soil barriers and foundation wood treatment at a residence.",
      image: "https://i.pinimg.com/236x/11/87/d3/1187d3f06334c5df1a675280aba9ce95.jpg",
      alt: "Fumigation treatment spray being applied to wood structures"
    },
    {
      id: "des_gal_6",
      category: "clean",
      title: "Corporate Office Cleaning",
      desc: "Disinfection of office desks, floor waxing, and sanitation of shared workspaces.",
      image: "https://i.pinimg.com/1200x/af/8e/ea/af8eea5349adca240c9cd70974571d2e.jpg",
      alt: "Sanitary worker clean desk in empty modern corporate office room"
    },
    {
      id: "des_gal_7",
      category: "pest",
      title: "Cockroach Eradication",
      desc: "Locating and eradicating cockroach nesting grounds inside residential kitchen cabinets in Accra.",
      image: "images/pest-cockroach-cabinet.jpg",
      alt: "Cockroaches infesting kitchen cabinets before treatment"
    },

    /* ---- Added locally uploaded gallery images (DO NOT REPLACE EXISTING) ---- */
    {
      id: "des_gal_8",
      category: "pest",
      title: "Pest Control Photo 1",
      desc: "Recent pest control work captured in our service gallery.",
      image: "images/1.jpg",
      alt: "Dynamic Express Solutions pest control service photo 1"
    },
    {
      id: "des_gal_9",
      category: "clean",
      title: "Cleaning Photo 2",
      desc: "Recent professional cleaning work captured in our service gallery.",
      image: "images/2.jpg",
      alt: "Dynamic Express Solutions cleaning service photo 2"
    },
    {
      id: "des_gal_10",
      category: "sofa",
      title: "Sofa & Upholstery Photo 3",
      desc: "Recent sofa/upholstery cleaning work captured in our service gallery.",
      image: "images/3.jpg",
      alt: "Dynamic Express Solutions sofa and upholstery cleaning photo 3"
    },
    {
      id: "des_gal_11",
      category: "post",
      title: "Post-Construction Photo 4",
      desc: "Recent post-construction cleaning work captured in our service gallery.",
      image: "images/4.jpg",
      alt: "Dynamic Express Solutions post-construction cleaning photo 4"
    },
    {
      id: "des_gal_12",
      category: "pest",
      title: "Pest Control Photo 5",
      desc: "Recent pest control work captured in our service gallery.",
      image: "images/5.jpg",
      alt: "Dynamic Express Solutions pest control service photo 5"
    },
    {
      id: "des_gal_13",
      category: "clean",
      title: "Cleaning Photo 6",
      desc: "Recent professional cleaning work captured in our service gallery.",
      image: "images/6.jpg",
      alt: "Dynamic Express Solutions cleaning service photo 6"
    },
    {
      id: "des_gal_14",
      category: "post",
      title: "Post-Construction Photo 7",
      desc: "Recent post-construction cleaning work captured in our service gallery.",
      image: "images/7.jpg",
      alt: "Dynamic Express Solutions post-construction cleaning photo 7"
    }
  ];

  var currentFilteredWork = workGalleryData.slice();
  var activeWorkLightboxIndex = 0;

  function renderWorkGalleryGrid(filter) {
    var grid = document.getElementById("workGalleryGrid");
    if (!grid) return;

    grid.innerHTML = "";
    currentFilteredWork = workGalleryData.filter(function (item) {
      return filter === "all" || item.category === filter;
    });

    currentFilteredWork.forEach(function (item, index) {
      var itemHTML =
        '<div class="work-gallery-item" data-category="' + item.category + '" onclick="openWorkLightbox(' + index + ')">' +
        '  <img src="' + item.image + '" alt="' + item.alt + '" loading="lazy" decoding="async">' +
        '  <div class="work-gallery-item-overlay">' +
        '    <span class="work-gallery-item-tag">' + getCategoryLabel(item.category) + '</span>' +
        '    <h3 class="work-gallery-item-title">' + item.title + '</h3>' +
        '    <p class="work-gallery-item-desc">' + item.desc + '</p>' +
        '  </div>' +
        '</div>';
      grid.insertAdjacentHTML("beforeend", itemHTML);
    });

    // Handle scroll-reveal list update dynamically
    var items = grid.querySelectorAll(".work-gallery-item");
    items.forEach(function (item, idx) {
      setTimeout(function () {
        item.classList.add("visible");
      }, idx * 40);
    });
  }

  function getCategoryLabel(cat) {
    if (cat === "pest") return "Pest Control";
    if (cat === "clean") return "Deep Clean";
    if (cat === "sofa") return "Sofa & Upholstery";
    if (cat === "post") return "Post-Construction";
    return "Work";
  }

  function initWorkGallery() {
    renderWorkGalleryGrid("all");

    // Category Tabs click listeners
    var tabs = document.querySelectorAll(".gallery-tab");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        var filter = tab.getAttribute("data-gallery-filter");
        renderWorkGalleryGrid(filter);
      });
    });

    // Lightbox modal buttons click listeners
    var lightboxClose = document.getElementById("lightboxClose");
    var lightboxPrev = document.getElementById("lightboxPrev");
    var lightboxNext = document.getElementById("lightboxNext");

    if (lightboxClose) lightboxClose.addEventListener("click", closeWorkLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener("click", prevWorkLightboxImage);
    if (lightboxNext) lightboxNext.addEventListener("click", nextWorkLightboxImage);

    var lightboxModal = document.getElementById("lightboxModal");
    if (lightboxModal) {
      lightboxModal.addEventListener("click", function (e) {
        if (e.target.id === "lightboxModal" || e.target.classList.contains("lightbox-content-wrapper")) {
          closeWorkLightbox();
        }
      });
    }

    // Keyboard controls
    document.addEventListener("keydown", function (e) {
      if (!lightboxModal || !lightboxModal.classList.contains("active")) return;
      if (e.key === "Escape") closeWorkLightbox();
      if (e.key === "ArrowLeft") prevWorkLightboxImage();
      if (e.key === "ArrowRight") nextWorkLightboxImage();
    });
  }

  window.openWorkLightbox = function (index) {
    activeWorkLightboxIndex = index;
    var modal = document.getElementById("lightboxModal");
    var img = document.getElementById("lightboxImg");
    var caption = document.getElementById("lightboxCaption");

    var item = currentFilteredWork[index];
    if (!item || !modal || !img || !caption) return;

    img.src = item.image;
    img.alt = item.alt;
    caption.innerHTML = "<strong>" + item.title + "</strong> — " + item.desc;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // disable scroll
  };

  function closeWorkLightbox() {
    var modal = document.getElementById("lightboxModal");
    if (modal) {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = ""; // enable scroll
  }

  function prevWorkLightboxImage() {
    var prevIndex = activeWorkLightboxIndex - 1;
    if (prevIndex < 0) prevIndex = currentFilteredWork.length - 1;
    window.openWorkLightbox(prevIndex);
  }

  function nextWorkLightboxImage() {
    var nextIndex = activeWorkLightboxIndex + 1;
    if (nextIndex >= currentFilteredWork.length) nextIndex = 0;
    window.openWorkLightbox(nextIndex);
  }

  initWorkGallery();
})();
