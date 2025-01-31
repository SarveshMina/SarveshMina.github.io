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

    <!-- Scroll Down Indicator (Shown only if showArrow is true) -->
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
  name: 'LandingPage',
  data() {
    return {
      showModal: false,
      lastFocusedElement: null,
      showArrow: true, // Whether to show the "Scroll Down" indicator
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
      document.body.style.overflow = 'hidden';
      this.lastFocusedElement = document.activeElement;
      this.$nextTick(() => {
        this.$refs.closeButton.focus();
      });
    },
    closeModal() {
      this.showModal = false;
      document.body.style.overflow = '';
      if (this.lastFocusedElement) {
        this.lastFocusedElement.focus();
      }
    },
    handleKeyDown(event) {
      if (event.key === 'Escape' && this.showModal) {
        this.closeModal();
      }
    },

    // Smoothly scroll to next section (e.g., #education-experience)
    scrollDown() {
      const nextSection = document.getElementById('education-experience');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    },

    // Hide arrow once user scrolls beyond a threshold (e.g., 100px)
    handleScroll() {
      this.showArrow = window.scrollY < 100;
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('scroll', this.handleScroll);

    // Existing GSAP Animations (now handled by directive)
    /*
    gsap.from(".profile-image", {
      scrollTrigger: {
        trigger: ".landing-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".text-container h2", {
      scrollTrigger: {
        trigger: ".text-container h2",
        start: "top 90%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
    });

    gsap.from(".text-container p", {
      scrollTrigger: {
        trigger: ".text-container p",
        start: "top 90%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.4,
      ease: "power3.out",
    });

    gsap.to(".scroll-down", {
      y: 10,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 0.8,
    });
    */
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('scroll', this.handleScroll);
    document.body.style.overflow = '';
  },
};
</script>

<style scoped>
.landing-section {
  height: 100vh;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
  color: var(--text-color);
  text-align: center;
  padding: 2rem;
  border-bottom: 4px solid var(--accent-color);
  position: relative;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
  gap: 3rem;
}

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

.text-container {
  flex: 2;
  text-align: left;
}

.text-container h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-family: 'Source Code Pro', monospace;
}

.text-container p {
  max-width: 600px;
  font-size: 1.2rem;
  line-height: 1.6;
  font-family: 'Source Code Pro', monospace;
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
  font-size: 2rem; /* Adjust arrow size */
}

.scroll-text {
  margin-top: 0.3rem;
  font-size: 0.9rem;
  font-family: 'Source Code Pro', monospace;
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
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes zoomIn {
  from { transform: scale(0.8); }
  to { transform: scale(1); }
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .modal-content {
    width: 500px;
    height: 500px;
  }
}

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
  }

  .text-container p {
    font-size: 1rem;
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
</style>
