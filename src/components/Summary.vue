<!-- src/components/LandingPage.vue -->
<template>
  <section id="summary" class="landing-section">
    <div class="container">
      <div class="image-container">
        <img
            src="/imgs/profile.jpg"
            alt="Sarvesh Mina"
            class="profile-image"
            @click="openModal"
            tabindex="0"
            @keydown.enter="openModal"
            aria-label="Open Image Preview"
            v-scroll-up
        />
      </div>
      <div class="text-container" v-scroll-up>
        <h2>Welcome to My Portfolio</h2>
        <p>
          Ambitious and dedicated Computer Science student with a strong foundation in Cloud Technologies,
          Game Development, and Frontend Development. Passionate about leveraging technology to solve real-world
          challenges and advance innovation in software development and AI.
        </p>
      </div>
    </div>

    <!-- Socials and CV Button Section (center-aligned) -->
    <div class="socials-cv-section" v-scroll-up>
      <h3>Explore my socials</h3>
      <div class="social-icons">
        <a href="mailto:minasarvesh@gmail.com" target="_blank" title="Email">
          <font-awesome-icon :icon="['fas', 'envelope']" />
        </a>
        <a href="https://github.com/SarveshMina" target="_blank" title="GitHub">
          <font-awesome-icon :icon="['fab', 'github']" />
        </a>
        <a href="https://linkedin.com/in/sarvesh-mina/" target="_blank" title="LinkedIn">
          <font-awesome-icon :icon="['fab', 'linkedin']" />
        </a>
      </div>
      <div class="cv-button-container">
        <a :href="cvUrl" target="_blank" class="cv-button">View My CV</a>
      </div>
    </div>

    <!-- Scroll Down Indicator (placed after socials & CV button) -->
    <div class="scroll-down" v-if="showArrow" @click="scrollDown" v-scroll-up>
      <font-awesome-icon icon="chevron-down" class="arrow-icon" />
      <span class="scroll-text">Scroll Down</span>
    </div>

    <!-- Modal for Image Preview -->
    <div
        v-if="showModal"
        class="modal-overlay"
        @click.self="closeModal"
        aria-modal="true"
        role="dialog"
        aria-labelledby="modal-title"
    >
      <div class="modal-content" v-scroll-up>
        <span
            class="close-icon"
            @click="closeModal"
            aria-label="Close Modal"
            tabindex="0"
            @keydown.enter="closeModal"
            ref="closeButton"
        >
          &times;
        </span>
        <img
            src="/imgs/profile.jpg"
            alt="Sarvesh Mina"
            class="modal-image"
            id="modal-title"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "LandingPage",
  data() {
    return {
      showModal: false,
      lastFocusedElement: null,
      showArrow: true, // Whether to show the "Scroll Down" indicator
      cvUrl: "/SarveshMina.pdf", // Same as in your Header component
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
      document.body.style.overflow = "hidden";
      this.lastFocusedElement = document.activeElement;
      this.$nextTick(() => {
        this.$refs.closeButton.focus();
      });
    },
    closeModal() {
      this.showModal = false;
      document.body.style.overflow = "";
      if (this.lastFocusedElement) {
        this.lastFocusedElement.focus();
      }
    },
    handleKeyDown(event) {
      if (event.key === "Escape" && this.showModal) {
        this.closeModal();
      }
    },
    // Smoothly scroll to the next section (e.g., #education-experience)
    scrollDown() {
      const nextSection = document.getElementById("education-experience");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    },
    // Hide arrow once user scrolls beyond a threshold (e.g., 100px)
    handleScroll() {
      this.showArrow = window.scrollY < 100;
    },
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("scroll", this.handleScroll);
    document.body.style.overflow = "";
  },
};
</script>

<style scoped>
/* Base Styles */
.landing-section {
  height: 100vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
  color: var(--text-color);
  text-align: center;
  padding: 2rem;
  border-bottom: 4px solid var(--accent-color);
  position: relative;
  margin-top: 100px; /* Push landing section down to accommodate fixed header */
}

/* Increase top margin for mobile view */
@media (max-width: 768px) {
  .landing-section {
    margin-top: 150px; /* Adjust value as needed */
  }
}

/* Container for image and introductory text */
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
  gap: 3rem;
}

/* Image Styling */
.image-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.profile-image {
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid var(--accent-color);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.profile-image:hover,
.profile-image:focus {
  transform: scale(1.05);
  outline: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Introductory Text */
.text-container {
  flex: 2;
  text-align: center;
}

.text-container h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  margin-left: 1.5rem;
  font-family: "Source Code Pro", monospace;
  text-align: left;
}

.text-container p {
  max-width: 600px;
  font-size: 1.2rem;
  line-height: 1.6;
  font-family: "Source Code Pro", monospace;
  text-align: center;
}

/* Socials and CV Button Section */
.socials-cv-section {
  margin: 2rem 0;
  text-align: center;
}

.socials-cv-section h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  margin-left: 15rem;
  font-family: "Source Code Pro", monospace;
  text-align: center;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  font-size: 2rem;
  margin-bottom: 2rem;
  margin-left: 16rem;
}

.social-icons a {
  color: var(--primary-color);
  transition: transform 0.3s, color 0.3s;
}

.social-icons a:hover {
  transform: scale(1.2);
  color: var(--link-hover-color);
}

.cv-button-container {
  margin-top: 1rem;
  margin-left: 15rem;
}

.cv-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--primary-color);
  border-radius: 25px;
  background: transparent;
  color: var(--primary-color);
  font-size: 1rem;
  font-family: "Source Code Pro", monospace;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s;
}

body.dark-mode .cv-button:hover {
  color: black;
}

.cv-button:hover {
  background-color: var(--primary-color);
  color: #fff;
  transform: scale(1.05);
  box-shadow: 0 0 8px var(--primary-color);
}

/* Scroll-Down Arrow + Text */
.scroll-down {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  color: var(--text-color);
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
}

.scroll-down .arrow-icon {
  font-size: 2rem;
}

.scroll-text {
  margin-top: 0.3rem;
  font-size: 0.9rem;
  font-family: "Source Code Pro", monospace;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.3s;
}

.modal-content {
  position: relative;
  width: 500px;
  height: 500px;
  max-width: 90%;
  max-height: 90%;
}

.modal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  animation: zoomIn 0.3s;
}

.close-icon {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: var(--secondary-color);
  color: var(--text-color);
  width: 25px;
  height: 25px;
  border-radius: 50%;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s, color 0.3s;
}

.close-icon:hover,
.close-icon:focus {
  background-color: var(--accent-color);
  color: var(--background-color);
  outline: none;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes zoomIn {
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    text-align: center;
  }

  .text-container {
    text-align: center;
  }

  .profile-image {
    width: 180px;
    height: 180px;
  }

  .text-container h2 {
    font-size: 2rem;
    margin-left: 0;
    text-align: center;
  }

  .text-container p {
    font-size: 1rem;
  }

  /* Remove extra left margins for mobile */
  .socials-cv-section h3 {
    margin-left: 0;
    font-size: 1.6rem;
  }
  .social-icons {
    margin-left: 0;
  }
  .cv-button-container {
    margin-left: 0;
  }

  .modal-content {
    width: 350px;
    height: 350px;
  }

  .close-icon {
    top: -8px;
    right: -8px;
    width: 20px;
    height: 20px;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .modal-content {
    width: 300px;
    height: 300px;
  }

  .modal-image {
    border-radius: 8px;
  }

  .close-icon {
    top: -6px;
    right: -6px;
    width: 18px;
    height: 18px;
    font-size: 0.7rem;
  }
}

/* Dark Mode Adjustments */
body.dark-mode .landing-section {
  background-color: var(--background-color);
  color: var(--text-color);
}
</style>
