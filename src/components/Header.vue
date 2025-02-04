<!-- Header.vue -->
<template>
  <header>
    <nav class="navbar">
      <div class="logo">
        <h1><a href="#">Sarvesh Mina</a></h1>
      </div>

      <!-- ====================== NAVBAR LINKS =========================== -->
      <ul :class="{ 'nav-active': navActive }" ref="navMenu">
        <li>
          <a
              href="#summary"
              @click="smoothScroll($event, 'summary')"
              :class="{ active: activeSection === 'summary' }"
          >
            Summary
          </a>
        </li>
        <li>
          <a
              href="#skills"
              @click="smoothScroll($event, 'skills')"
              :class="{ active: activeSection === 'skills' }"
          >
            Skills
          </a>
        </li>
        <li>
          <a
              href="#education-experience"
              @click="smoothScroll($event, 'education-experience')"
              :class="{ active: activeSection === 'education-experience' }"
          >
            Education & Experience
          </a>
        </li>
        <li>
          <a
              href="#projects"
              @click="smoothScroll($event, 'projects')"
              :class="{ active: activeSection === 'projects' }"
          >
            Projects
          </a>
        </li>
        <li>
          <a
              href="#contact"
              @click="smoothScroll($event, 'contact')"
              :class="{ active: activeSection === 'contact' }"
          >
            Contact
          </a>
        </li>

        <!-- Dark Mode Toggle (Desktop only) -->
        <li class="dark-mode-toggle-container desktop-toggle">
          <button
              class="dark-mode-toggle"
              @click="toggleDarkMode"
              :class="{ rotating: isToggling }"
              @animationend="isToggling = false"
              aria-label="Toggle Dark Mode"
          >
            <img
                v-if="!isDarkMode"
                src="/imgs/light_mode.svg"
                alt="Light Mode"
                class="toggle-icon"
            />
            <img
                v-else
                src="/imgs/dark_mode.svg"
                alt="Dark Mode"
                class="toggle-icon"
            />
          </button>
        </li>

        <!-- CV Button (Desktop) -->
        <li>
          <a :href="cvUrl" target="_blank" class="cv-button">📄 View My CV</a>
        </li>
      </ul>
      <!-- ====================== END NAVBAR LINKS ======================= -->

      <!-- ====================== MOBILE CONTROLS ======================= -->
      <div class="mobile-controls">
        <!-- Dark Mode Toggle (Mobile only) -->
        <div class="dark-mode-toggle-container mobile-toggle">
          <button
              class="dark-mode-toggle"
              @click="toggleDarkMode"
              :class="{ rotating: isToggling }"
              @animationend="isToggling = false"
              aria-label="Toggle Dark Mode"
          >
            <img
                v-if="!isDarkMode"
                src="/imgs/light_mode.svg"
                alt="Light Mode"
                class="toggle-icon"
            />
            <img
                v-else
                src="/imgs/dark_mode.svg"
                alt="Dark Mode"
                class="toggle-icon"
            />
          </button>
        </div>

        <!-- Burger Menu -->
        <div
            class="burger"
            @click="toggleNav"
            ref="burgerMenu"
            :aria-expanded="navActive"
            aria-label="Toggle navigation"
            :class="{ hidden: navActive }"
        >
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="line3"></div>
        </div>
      </div>
      <!-- ====================== END MOBILE CONTROLS =================== -->
    </nav>

    <!-- ============ Menu Overlay ============ -->
    <div
        v-show="navActive"
        class="menu-overlay"
        ref="menuOverlay"
        role="dialog"
        aria-modal="true"
    >
      <!-- Close Button -->
      <button
          class="close-button"
          @click="closeNav"
          aria-label="Close Menu"
          ref="closeButton"
      >
        ✖
      </button>
      <!-- Menu Buttons -->
      <div class="menu-buttons" ref="menuButtons">
        <a
            href="#summary"
            @click="smoothScroll($event, 'summary')"
            class="menu-button"
            :class="{ active: activeSection === 'summary' }"
            ref="menuButton1"
        >
          Summary
        </a>
        <a
            href="#skills"
            @click="smoothScroll($event, 'skills')"
            class="menu-button"
            :class="{ active: activeSection === 'skills' }"
            ref="menuButton2"
        >
          Skils
        </a>
        <a
            href="#education-experience"
            @click="smoothScroll($event, 'education-experience')"
            class="menu-button"
            :class="{ active: activeSection === 'education-experience' }"
            ref="menuButton3"
        >
          Education & Experience
        </a>
        <a
            href="#projects"
            @click="smoothScroll($event, 'projects')"
            class="menu-button"
            :class="{ active: activeSection === 'projects' }"
            ref="menuButton4"
        >
          Projects
        </a>
        <a
            href="#contact"
            @click="smoothScroll($event, 'contact')"
            class="menu-button"
            :class="{ active: activeSection === 'contact' }"
            ref="menuButton5"
        >
          Contact
        </a>
      </div>
      <!-- Mobile CV Button -->
      <div class="mobile-cv-container">
        <a :href="cvUrl" target="_blank" class="cv-button">📄 View My CV</a>
      </div>
    </div>

    <!-- Background Blur Overlay -->
    <div
        v-show="navActive"
        class="background-blur"
        @click="closeNav"
        ref="backgroundBlur"
    ></div>
  </header>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "Header",
  data() {
    return {
      navActive: false,
      cvUrl: `/SarveshMina.pdf`,
      activeSection: "",
      isDarkMode: false, // Tracks current mode
      isToggling: false, // Tracks if toggling animation is active
      focusTrapHandler: null, // For accessibility focus trapping
    };
  },
  methods: {
    toggleNav(event) {
      event.stopPropagation(); // Prevent outside click from closing immediately
      this.navActive = !this.navActive;
      document.body.classList.toggle("nav-open", this.navActive);

      if (this.navActive) {
        this.animateMenuButtons();
      } else {
        this.reverseMenuButtons();
      }
    },
    closeNav() {
      this.navActive = false;
      document.body.classList.remove("nav-open");
      this.reverseMenuButtons();
    },
    handleScroll() {
      const sections = document.querySelectorAll("section");
      let scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        if (
            section.offsetTop <= scrollPosition &&
            section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          this.activeSection = section.getAttribute("id");
        }
      });
    },
    smoothScroll(event, sectionId) {
      event.preventDefault();
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        this.closeNav(); // Close mobile nav after clicking
      }
    },
    handleOutsideClick(event) {
      if (
          this.navActive &&
          this.$refs.navMenu &&
          !this.$refs.navMenu.contains(event.target) &&
          this.$refs.burgerMenu !== event.target &&
          !this.$refs.burgerMenu.contains(event.target) &&
          this.$refs.menuOverlay !== event.target &&
          !this.$refs.menuOverlay.contains(event.target)
      ) {
        this.closeNav();
      }
    },
    toggleDarkMode() {
      // Start toggling animation
      this.isToggling = true;

      // Flip isDarkMode
      this.isDarkMode = !this.isDarkMode;

      // Add or remove the .dark-mode class on <body>
      if (this.isDarkMode) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "true"); // Persist preference
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "false"); // Persist preference
      }
    },
    animateMenuButtons() {
      // Activate menu overlay for pointer events
      this.$refs.menuOverlay.classList.add("active");
      this.$refs.backgroundBlur.classList.add("active");

      // Start trapping focus for accessibility
      this.startFocusTrap();

      // Create a GSAP timeline
      const tl = gsap.timeline();

      // Animate Background Blur fading in
      tl.to(this.$refs.backgroundBlur, {
        opacity: 1,
        duration: 0.1,
        ease: "power3.out",
      });

      // Animate Menu Overlay sliding in from the top
      tl.to(
          this.$refs.menuOverlay,
          {
            y: 0,
            opacity: 1,
            duration: 0.1,
            ease: "power3.out",
          },
          "-=0.2"
      );

      // Animate Close Button
      tl.fromTo(
          this.$refs.closeButton,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.25, ease: "power3.out" }
      );

      // Animate Each Menu Button with a bounce effect
      tl.fromTo(
          this.$refs.menuButtons.children,
          { opacity: 0, y: -30, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.1,
            stagger: 0.05,
            ease: "bounce.out",
          }
      ).then(() => {
        this.$refs.menuButton1.focus();
      });
    },
    reverseMenuButtons() {
      const tl = gsap.timeline();

      tl.to(this.$refs.menuButtons.children, {
        opacity: 0,
        y: -30,
        scale: 0.8,
        duration: 0.1,
        stagger: 0.05,
        ease: "power3.in",
      });

      tl.to(this.$refs.closeButton, {
        opacity: 0,
        scale: 0,
        duration: 0.1,
        ease: "power3.in",
      });

      tl.to(
          this.$refs.menuOverlay,
          {
            y: -100,
            opacity: 0,
            duration: 0.3,
            ease: "power3.in",
          },
          "-=0.3"
      );

      tl.to(
          this.$refs.backgroundBlur,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power3.in",
          },
          "-=0.3"
      );

      tl.then(() => {
        this.$refs.menuOverlay.classList.remove("active");
        this.$refs.backgroundBlur.classList.remove("active");
        this.stopFocusTrap();
        this.$refs.burgerMenu.focus();
      });
    },
    handleKeyDown(event) {
      if (event.key === "Escape" && this.navActive) {
        this.closeNav();
      }
    },
    startFocusTrap() {
      const focusableElements = this.$refs.menuOverlay.querySelectorAll("a, button");
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTab = (e) => {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener("keydown", handleTab);
      this.focusTrapHandler = handleTab;
    },
    stopFocusTrap() {
      document.removeEventListener("keydown", this.focusTrapHandler);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    document.addEventListener("click", this.handleOutsideClick);
    document.addEventListener("keydown", this.handleKeyDown);

    const storedMode = localStorage.getItem("darkMode");
    if (storedMode === "true") {
      this.isDarkMode = true;
      document.body.classList.add("dark-mode");
    }

    gsap.from("header .navbar ul li:not(.dark-mode-toggle-container):not(.close-button)", {
      opacity: 0,
      y: -20,
      duration: 0.1,
      stagger: 0.05,
      ease: "power3.out",
    });

    gsap.from("header .logo h1", {
      opacity: 0,
      x: -50,
      duration: 0.1,
      ease: "power3.out",
    });

    gsap.from("header .burger", {
      opacity: 0,
      x: 50,
      duration: 0.1,
      ease: "power3.out",
    });
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document.removeEventListener("click", this.handleOutsideClick);
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keydown", this.focusTrapHandler);
  },
};
</script>

<style scoped>
/* CV Button Styling for Header (Same design as LandingPage's button but without scaling) */
.cv-button {
  display: inline-block;
  padding: 0.5rem 1rem; /* Adjust padding as needed to match header size */
  border: 2px solid var(--primary-color);
  border-radius: 25px;
  background: transparent;
  color: var(--primary-color);
  font-size: 1rem;
  font-family: "Source Code Pro", monospace;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
}

.cv-button:hover {
  background-color: var(--primary-color);
  color: #fff;
  box-shadow: 0 0 8px var(--primary-color);
  /* No scaling here to keep the button size the same */
}

body.dark-mode .cv-button:hover {
  color: black;
}

/* Mobile CV Button Container */
.mobile-cv-container {
  margin-top: 1rem;
  text-align: center;
}

/* ---------------------------------------------------------------------------
   NEW: Menu Overlay Button Styling
   Apply similar styling to the overlay menu buttons so they appear as rounded,
   bold, button-like links with a hover glow effect.
--------------------------------------------------------------------------- */
.menu-button {
  display: inline-block;
  padding: 0.5rem 1rem; /* Adjust padding as needed */
  border: 2px solid var(--primary-color);
  border-radius: 25px;
  background: var(--primary-color) ;
  color: var(--secondary-color);
  font-size: 1rem;
  font-family: "Source Code Pro", monospace;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
  margin: 0.5rem; /* Optional: adds spacing between menu buttons */
}

.menu-button:hover {
  background-color: var(--primary-color);
  color: #fff;
  box-shadow: 0 0 8px var(--primary-color);
  /* No scaling here */
}

/* (Other Header styles remain as before) */
</style>
