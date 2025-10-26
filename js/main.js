// Portfolio JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Navigation functionality
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollToTopBtn = document.getElementById("scrollToTop");

  // Mobile navigation toggle
  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Show/hide scroll to top button
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }
  });

  // Scroll to top functionality
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Active navigation link highlighting
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const correspondingNavLink = document.querySelector(
        `.nav-link[href="#${sectionId}"]`
      );

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // Remove active class from all nav links
        navLinks.forEach((link) => link.classList.remove("active"));
        // Add active class to current section's nav link
        if (correspondingNavLink) {
          correspondingNavLink.classList.add("active");
        }
      }
    });
  }

  // Update active nav link on scroll
  window.addEventListener("scroll", updateActiveNavLink);

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".skill-category, .highlight, .timeline-item, .project-card, .contact-item"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
  });

  // Typing animation for hero title
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  // Start typing animation after page load
  setTimeout(() => {
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle) {
      const originalText = heroTitle.textContent;
      typeWriter(heroTitle, originalText, 80);
    }
  }, 500);

  // Enhanced project card interactions
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Skill tag hover effects
  const skillTags = document.querySelectorAll(".skill-tag");
  skillTags.forEach((tag) => {
    tag.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)";
      this.style.boxShadow = "0 4px 15px rgba(37, 99, 235, 0.3)";
    });

    tag.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.boxShadow = "none";
    });
  });

  // Timeline item stagger animation
  const timelineItems = document.querySelectorAll(".timeline-item");
  const timelineObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
          }, index * 200);
        }
      });
    },
    { threshold: 0.3 }
  );

  timelineItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform =
      index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)";
    item.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    timelineObserver.observe(item);
  });

  // Contact form interactions (if you add a form later)
  const contactButtons = document.querySelectorAll(
    ".contact-item, .cta-buttons .btn"
  );
  contactButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(37, 99, 235, 0.3);
                border-radius: 50%;
                transform: scale(0);
                pointer-events: none;
                animation: ripple 0.6s linear;
            `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);

  // Enhanced navigation highlighting with progress indicator
  function createProgressBar() {
    const progressBar = document.createElement("div");
    progressBar.id = "reading-progress";
    progressBar.style.cssText = `
            position: fixed;
            top: 80px;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #2563eb, #f59e0b);
            z-index: 1001;
            transition: width 0.3s ease;
        `;
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", function () {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + "%";
    });
  }

  createProgressBar();

  // Lazy loading for images (if you add images later)
  function lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  lazyLoadImages();

  // Performance optimization: debounce scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply debouncing to scroll-heavy functions
  const debouncedScrollHandler = debounce(function () {
    updateActiveNavLink();
  }, 10);

  window.addEventListener("scroll", debouncedScrollHandler);

  // Keyboard navigation support
  document.addEventListener("keydown", function (e) {
    // Navigate with arrow keys
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const sections = Array.from(document.querySelectorAll("section[id]"));
      const currentSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom > 100;
      });

      if (currentSection) {
        const currentIndex = sections.indexOf(currentSection);
        let targetIndex;

        if (e.key === "ArrowDown") {
          targetIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else {
          targetIndex = Math.max(currentIndex - 1, 0);
        }

        const targetSection = sections[targetIndex];
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  });

  // Theme switcher (for future dark mode implementation)
  function initThemeSwitcher() {
    const themeToggle = document.createElement("button");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = "theme-toggle";
    themeToggle.style.cssText = `
            position: fixed;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: var(--primary-color);
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px var(--shadow-color);
            transition: all 0.3s ease;
            z-index: 999;
            opacity: 0.8;
        `;

    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-theme");
      const icon = this.querySelector("i");
      icon.className = document.body.classList.contains("dark-theme")
        ? "fas fa-sun"
        : "fas fa-moon";
    });

    document.body.appendChild(themeToggle);
  }

  // Initialize theme switcher (uncomment when you implement dark theme CSS)
  // initThemeSwitcher();

  // Console message for developers
  console.log(
    "%c👋 Hello Developer!",
    "color: #2563eb; font-size: 18px; font-weight: bold;"
  );
  console.log(
    "%cThis portfolio was built with modern web technologies.",
    "color: #64748b; font-size: 14px;"
  );
  console.log(
    "%cInterested in the code? Check out the source!",
    "color: #64748b; font-size: 14px;"
  );
});

// Utility functions
const utils = {
  // Smooth scroll to element
  scrollToElement(elementId, offset = 80) {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Throttle function calls
  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Get random number between min and max
  randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};

// Export utils for external use
window.portfolioUtils = utils;
