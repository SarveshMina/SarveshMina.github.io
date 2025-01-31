<!-- src/components/BackToTop.vue -->
<template>
  <transition name="fade">
    <button
        v-if="isVisible"
        class="back-to-top"
        @click="scrollToTop"
        aria-label="Back to Top"
        v-scroll-up
    >
      ⬆
    </button>
  </transition>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "BackToTop",
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    handleScroll() {
      this.isVisible = window.scrollY > 300;
    },
    scrollToTop() {
      const start = window.scrollY;
      const duration = 600; // Smooth scroll duration (ms)
      const startTime = performance.now();

      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      const scrollStep = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, start * (1 - easeOutCubic(progress)));

        if (elapsed < duration) {
          requestAnimationFrame(scrollStep);
        }
      };

      requestAnimationFrame(scrollStep);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);

    // Existing GSAP Animations (now handled by directive)
    /*
    gsap.from(".back-to-top", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".back-to-top",
        start: "top bottom", // When the button enters the viewport
        toggleActions: "play none none reverse",
      }
    });
    */
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
/* Fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Back to Top Button Styles */
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px; /* Equal width and height for a perfect circle */
  height: 50px;
  background: black;
  color: white;
  border: none;
  border-radius: 50%; /* Ensures it's a circle */
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  z-index: 1000;
}

/* Hover Animation */
.back-to-top:hover {
  background: #555;
  transform: scale(1.1);
}

/* Click Effect */
.back-to-top:active {
  transform: scale(0.9);
}

/* Mobile Optimization */
@media (max-width: 768px) {
  .back-to-top {
    bottom: 15px;
    right: 15px;
    width: 45px;
    height: 45px;
    font-size: 1.2rem;
  }
}
</style>
