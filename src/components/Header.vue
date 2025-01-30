<!-- src/components/Header.vue -->
<template>
  <header>
    <nav class="navbar">
      <div class="logo">
        <h1><a href="#">Sarvesh Mina</a></h1>
      </div>
      <ul :class="{ 'nav-active': navActive }" ref="navMenu">
        <!-- Close button for mobile -->
        <li class="close-btn" v-if="navActive">
          <button @click="closeNav">✖</button>
        </li>
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
        <!-- Dark Mode Toggle Button -->
        <li>
          <button class="dark-mode-toggle" @click="toggleDarkMode">
            {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
          </button>
        </li>
        <li>
          <a :href="cvUrl" target="_blank" class="cv-button">📄 View My CV</a>
        </li>
      </ul>
      <!-- Burger Menu for Mobile -->
      <div
          class="burger"
          @click="toggleNav"
          ref="burgerMenu"
          :aria-expanded="navActive"
          aria-label="Toggle navigation"
      >
        <div :class="{ 'line1': navActive }"></div>
        <div :class="{ 'line2': navActive }"></div>
        <div :class="{ 'line3': navActive }"></div>
      </div>
    </nav>
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
    };
  },
  methods: {
    toggleNav(event) {
      event.stopPropagation(); // Prevent outside click from closing immediately
      this.navActive = !this.navActive;
      document.body.classList.toggle("nav-open", this.navActive);
    },
    closeNav() {
      this.navActive = false;
      document.body.classList.remove("nav-open");
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
          !this.$refs.burgerMenu.contains(event.target)
      ) {
        this.closeNav();
      }
    },
    toggleDarkMode() {
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
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    document.addEventListener("click", this.handleOutsideClick);

    // Check for stored dark mode preference
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode === 'true') {
      this.isDarkMode = true;
      document.body.classList.add("dark-mode");
    }

    // GSAP Animations for Header without ScrollTrigger
    // Animate navigation links
    gsap.from("header .navbar ul li", {
      opacity: 0,
      y: -20,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out",
    });

    // Animate logo
    gsap.from("header .logo h1", {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "power3.out",
    });

    // Animate burger menu
    gsap.from("header .burger", {
      opacity: 0,
      x: 50,
      duration: 1,
      ease: "power3.out",
    });
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document.removeEventListener("click", this.handleOutsideClick);
  },
};
</script>

<style scoped>
/* Enable Smooth Scrolling for the entire page */
html {
  scroll-behavior: smooth;
}

/* Global Reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--secondary-color);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  color: var(--text-color);
  transition: background-color 0.5s ease, color 0.5s ease;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  font-family: 'Source Code Pro', monospace;
  margin: 0 auto;
}

/* Logo */
.logo h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  font-family: "Source Code Pro", monospace;
}

.logo a {
  text-decoration: none;
  color: var(--text-color);
}

/* Navigation Links */
ul {
  list-style: none;
  display: flex;
  gap: 2rem;
}

ul li a {
  color: var(--link-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  position: relative;
  transition: color 0.3s ease-in-out;
}

/* Active Section Highlight */
ul li a.active {
  font-weight: bold;
  color: var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
}

/* View My CV Button */
.cv-button {
  background-color: var(--button-bg-color);
  color: var(--button-text-color);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  font-family: "Source Code Pro", monospace;
  text-decoration: none;
}

.cv-button:hover {
  background-color: var(--button-hover-bg-color);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  ul {
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    background-color: var(--background-color);
    flex-direction: column;
    align-items: center;
    width: 60%;
    transform: translateX(100%);
    transition: transform 0.5s ease-in-out;
    padding-top: 5rem;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  }

  ul.nav-active {
    transform: translateX(0);
  }

  .burger {
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }

  ul li {
    margin: 1.5rem 0;
  }

  /* Close Button */
  .close-btn {
    position: absolute;
    top: 10px;
    right: 20px;
  }

  .close-btn button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-color);
  }
}

/* Toggle Button for Dark Mode */
.dark-mode-toggle {
  background: none;
  border: 2px solid var(--link-color);
  border-radius: 20px;
  color: var(--link-color);
  padding: 0.3rem 0.8rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-size: 0.9rem;
  font-family: 'Source Code Pro', monospace;
}

.dark-mode-toggle:hover {
  background-color: var(--link-hover-color);
  color: var(--background-color);
}

/* Smooth transitions for background changes */
body, header, footer, section, .skill-category, .project-item, .education-item {
  transition: background-color 0.5s ease, color 0.5s ease;
}
</style>
