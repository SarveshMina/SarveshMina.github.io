<!-- src/components/Projects.vue -->
<template>
  <section id="projects" class="projects-section">
    <h2>Projects</h2>
    <!-- Project Cards -->
    <div class="projects-container">
      <div
          class="project-card"
          v-for="(project, index) in projectsList"
          :key="project.title"
      >
        <div class="card-header">
          <h3>{{ project.title }}</h3>
          <span class="date">{{ project.duration }}</span>
        </div>
        <p class="project-description">{{ project.description }}</p>
        <div class="project-links">
          <!-- Live Demo Button (if available) -->
          <a
              v-if="project.liveDemo"
              :href="project.liveDemo"
              target="_blank"
              class="project-btn"
              rel="noopener noreferrer"
          >
            {{ project.buttonText }}
          </a>
          <!-- Source Code Button (if available) -->
          <a
              v-if="project.repo"
              :href="project.repo"
              target="_blank"
              class="project-btn"
              rel="noopener noreferrer"
          >
            Source Code
          </a>
          <!-- View Details Button -->
          <button
              class="project-btn"
              @click="openModal(project, index)"
              ref="viewButtons"
          >
            View Details
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <transition name="modal">
      <div
          v-if="isModalOpen"
          class="modal-overlay"
          @click.self="closeModal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
      >
        <div class="modal-content" ref="modalContent">
          <!-- Close Button -->
          <button
              class="close-button"
              @click="closeModal"
              aria-label="Close Modal"
              ref="closeButton"
          >
            &times;
          </button>

          <!-- Video Preview -->
          <div class="video-container">
            <video
                v-if="selectedProject.video"
                :src="selectedProject.video"
                controls
                muted
                autoplay
                loop
            ></video>
          </div>

          <!-- Project Details -->
          <h2 id="modal-title">{{ selectedProject.title }}</h2>
          <p class="modal-description">{{ selectedProject.details }}</p>

          <!-- Skills Used as Cards -->
          <h3>Skills Used:</h3>
          <div class="skills-cards-container">
            <div class="skill-card" v-for="skill in selectedProject.skills" :key="skill">
              <i :class="getSkillIcon(skill)" class="skill-icon"></i>
              <span class="skill-name">{{ skill }}</span>
            </div>
          </div>

          <!-- Additional Project Links (Live Demo & Source Code) -->
          <div class="modal-links" v-if="selectedProject.liveDemo || selectedProject.repo">
            <a
                v-if="selectedProject.liveDemo"
                :href="selectedProject.liveDemo"
                class="modal-btn"
                target="_blank"
                rel="noopener noreferrer"
            >
              Live Demo
            </a>
            <a
                v-if="selectedProject.repo"
                :href="selectedProject.repo"
                class="modal-btn"
                target="_blank"
                rel="noopener noreferrer"
            >
              Source Code
            </a>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "Projects",
  data() {
    return {
      projectsList: [
        {
          title: "Calendify – A Group Calendar App",
          duration: "Oct 2024 – Jan 2025",
          description:
              "A collaborative event scheduling app using Vue.js and Azure. Features include user authentication, event management, dynamic calendar views, and real-time notifications.",
          details:
              "Calendify is designed to streamline group scheduling by providing a seamless interface for creating, managing, and sharing events. It integrates with various calendar services and offers real-time updates to ensure all participants are on the same page.",
          skills: [
            "Vue.js",
            "Azure",
            "JavaScript",
            "CSS",
            "HTML",
            "Authentication",
            "Real-time Notifications",
          ],
          video: "/vids/Calendify.mp4",
          liveDemo: "https://sarveshmina.github.io/CAD-gwc-frontend/",
          repo: "https://github.com/SarveshMina/CAD-gwc-frontend",
          buttonText: "Live Demo",
        },
        {
          title: "Cube Runner 3D",
          duration: "Apr 2022 – Oct 2022",
          description:
              "An endless 3D runner game built with Unity and C#. Features procedural level generation, adaptive AI difficulty, and smooth performance optimizations.",
          details:
              "Cube Runner 3D offers an immersive gaming experience where players navigate through dynamically generated levels. The game adapts to the player’s skill level, ensuring a challenging yet enjoyable experience.",
          skills: [
            "Unity",
            "C#",
            "Procedural Generation",
            "AI",
            "Game Optimization",
          ],
          video: "/vids/CubeRunner3D.mp4",
          liveDemo: "https://sarveshmina.github.io/games/cube_runner_3d/",
          repo: "https://github.com/SarveshMina/Cube_Runner_3D",
          buttonText: "Play Game",
        },
        {
          title: "Runway Redeclaration Tool",
          duration: "Oct 2023 – March 2023",
          description:
              "Developed a tool to modernize aviation safety protocols. Implemented TODA and ASDA calculations for flight safety, designed a user-friendly interface, and integrated mathematical models for accurate predictions.",
          details:
              "The Runway Redeclaration Tool enhances aviation safety by providing precise calculations for Takeoff Distance Available (TODA) and Accelerate-Stop Distance Available (ASDA). Its intuitive interface allows users to input various parameters and obtain accurate safety assessments.",
          skills: [
            "Java",
            "Mathematical Modeling",
            "UI/UX Design",
            "Safety Protocols",
          ],
          video: "/vids/RunwayRedeclaration.mp4",
          liveDemo: "/downloads/RunwayRedeclaration.jar",
          repo: "https://github.com/bryanvullo/RunwayRedeclaration",
          buttonText: "Download JAR",
        },
        {
          title: "TetrECS – A Tetris-Based Game",
          duration: "Jan 2025 – Present",
          description:
              "A fast-paced Java-based Tetris game with improved mechanics. Originally a university coursework project, now enhanced with new features and multiplayer support under development.",
          details:
              "TetrECS brings a fresh twist to the classic Tetris game by introducing enhanced mechanics and multiplayer capabilities. Players can compete in real-time, collaborate on levels, and enjoy an optimized gaming experience.",
          skills: [
            "Java",
            "Game Development",
            "Multiplayer Integration",
            "JavaFX",
          ],
          video: "/vids/TetrECS.mp4",
          liveDemo: "/downloads/TetrECS.jar",
          repo: "https://github.com/SarveshMina/TetrECS",
          buttonText: "Download JAR",
        },
      ],
      isModalOpen: false,
      selectedProject: null,
      lastFocusedElement: null,
    };
  },
  methods: {
    openModal(project, index) {
      this.selectedProject = project;
      this.isModalOpen = true;
      this.lastFocusedElement = this.$refs.viewButtons[index];
      this.$nextTick(() => {
        // Focus the close button after modal opens
        this.$refs.closeButton.focus();
      });
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedProject = null;
      document.body.style.overflow = ""; // Restore background scrolling

      // Return focus to the last focused element
      if (this.lastFocusedElement) {
        this.lastFocusedElement.focus();
      }
    },
    handleKeyDown(event) {
      if (event.key === "Escape" && this.isModalOpen) {
        this.closeModal();
      }
      if (event.key === "Tab" && this.isModalOpen) {
        this.trapFocus(event);
      }
    },
    trapFocus(event) {
      const focusableElements = this.$refs.modalContent.querySelectorAll(
          "a[href], button:not([disabled]), textarea, input, select, video"
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // If Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // If Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    },
    getSkillIcon(skill) {
      const skillIconMap = {
        "Vue.js": "fab fa-vuejs",
        Azure: "fab fa-microsoft",
        JavaScript: "fab fa-js-square",
        CSS: "fab fa-css3-alt",
        HTML: "fab fa-html5",
        Authentication: "fas fa-user-shield",
        "Real-time Notifications": "fas fa-bell",
        Unity: "fab fa-unity",
        "Procedural Generation": "fas fa-cogs",
        AI: "fas fa-robot",
        "Game Optimization": "fas fa-tachometer-alt",
        Java: "fab fa-java",
        "Mathematical Modeling": "fas fa-calculator",
        "UI/UX Design": "fas fa-paint-brush",
        "Safety Protocols": "fas fa-shield-alt",
        "Game Development": "fas fa-gamepad",
        "Multiplayer Integration": "fas fa-users",
        JavaFX: "fas fa-laptop-code",
      };

      return skillIconMap[skill] || "fas fa-star"; // Default icon if not found
    },
  },
  mounted() {
    // Animate project cards using GSAP
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: ".projects-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Add event listener for keydown
    window.addEventListener("keydown", this.handleKeyDown);
  },
  beforeUnmount() {
    // Remove event listener for keydown
    window.removeEventListener("keydown", this.handleKeyDown);

    // Ensure that if the component is destroyed, scrolling is restored
    if (this.isModalOpen) {
      document.body.style.overflow = "";
    }
  },
};
</script>

<style scoped>
/* Projects Section */
.projects-section {
  padding: 3rem 1.5rem;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.5s ease, color 0.5s ease;
}

.projects-section h2 {
  text-align: center;
  font-size: 2.3rem;
  margin-bottom: 1.5rem;
  font-family: "Source Code Pro", monospace;
}

/* Projects Grid */
.projects-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  justify-items: center;
  max-width: 1000px;
  margin: 0 auto;
}

/* Project Card Base Styles */
.project-card {
  background-color: var(--card-bg-color);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 1.2rem;
  width: 100%;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* Pseudo-element for fill animation (rainbow glow effect) */
.project-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: var(--primary-color);
  opacity: 0;
  transform: skewX(-20deg);
  transition: left 0.5s ease, opacity 0.5s ease;
  z-index: -1;
}

/* On hover, slide in the fill and trigger rainbow glow */
.project-card:hover::after {
  left: 0;
  opacity: 0.15;
}

.project-card:hover {
  transform: translateY(-4px);
  animation: rainbowGlow 3s infinite;
}

/* Apply rainbow text glow to inner text elements on hover */
.project-card:hover h3,
.project-card:hover p,
.project-card:hover span,
.project-card:hover a,
.project-card:hover button {
  animation: rainbowTextGlow 3s infinite;
}

/* Rainbow Glow Keyframes */
@keyframes rainbowGlow {
  0% { box-shadow: 0 0 10px red; }
  14% { box-shadow: 0 0 12px orange; }
  28% { box-shadow: 0 0 14px yellow; }
  42% { box-shadow: 0 0 16px green; }
  56% { box-shadow: 0 0 18px blue; }
  70% { box-shadow: 0 0 16px indigo; }
  84% { box-shadow: 0 0 14px violet; }
  100% { box-shadow: 0 0 12px red; }
}

/* Rainbow Text Glow Keyframes */
@keyframes rainbowTextGlow {
  0% { text-shadow: 0 0 8px red; }
  14% { text-shadow: 0 0 8px orange; }
  28% { text-shadow: 0 0 8px yellow; }
  42% { text-shadow: 0 0 8px green; }
  56% { text-shadow: 0 0 8px blue; }
  70% { text-shadow: 0 0 8px indigo; }
  84% { text-shadow: 0 0 8px violet; }
  100% { text-shadow: 0 0 8px red; }
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.project-card h3 {
  margin: 0;
  font-size: 1.5rem;
  font-family: "Source Code Pro", monospace;
  color: var(--primary-color);
}

.project-card .date {
  font-size: 0.85rem;
  color: var(--accent-color);
  font-family: "Source Code Pro", monospace;
}

/* Description */
.project-description {
  margin: 0.5rem 0;
  font-size: 1rem;
  line-height: 1.5;
  font-family: "Source Code Pro", monospace;
}

/* Project Links */
.project-links {
  display: flex;
  gap: 0.8rem;
  margin-top: auto;
}

/* Buttons (Card) */
.project-btn {
  position: relative;
  display: inline-block;
  overflow: hidden;
  flex: 1;
  text-align: center;
  background-color: var(--link-color);
  color: var(--background-color);
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 1rem;
  transition: transform 0.2s ease, color 0.3s ease;
  font-family: "Source Code Pro", monospace;
  cursor: pointer;
  border: none;
}

/* Pseudo-element for animated gradient fill on buttons */
.project-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet);
  background-size: 400%;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease;
  z-index: -1;
  opacity: 0.8;
}

.project-btn:hover::before {
  transform: scaleX(1);
}

.project-btn:hover {
  transform: scale(1.05);
}

/* Modal Overlay with Blur */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Semi-transparent overlay with blur effect */
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 1rem;
  overflow-y: auto;
}

/* Modal Content - Glassmorphism Style */
.modal-content {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
}

/* Scale-in Animation for Modal */
.modal-enter-active {
  animation: scaleIn 0.3s forwards;
}

@keyframes scaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Dark Mode Adjustment */
body.dark-mode .modal-content {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Light Mode Adjustment */
body:not(.dark-mode) .modal-content {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

/* Minimalistic Scrollbar for Modal */
.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: transparent;
}

.modal-content::-webkit-scrollbar-thumb {
  background-color: var(--accent-color);
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background-color: var(--primary-color);
}

/* Close Button */
.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--text-color);
  z-index: 10;
}

/* Video Container */
.video-container {
  width: 100%;
  margin-bottom: 1rem;
}

.video-container video {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

/* Skills Cards Container */
.skills-cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
}

/* Skill Card */
.skill-card {
  background-color: var(--card-bg-color);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Skill Icon */
.skill-icon {
  font-size: 1.8rem;
  color: var(--primary-color);
}

/* Skill Name */
.skill-name {
  font-size: 1rem;
  font-family: "Source Code Pro", monospace;
  color: var(--text-color);
}

/* Additional Links in Modal */
.modal-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1.5rem;
}

.modal-btn {
  background-color: var(--link-color);
  color: var(--background-color);
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 1rem;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.2s ease;
  font-family: "Source Code Pro", monospace;
  cursor: pointer;
  border: none;
}

.modal-btn:hover {
  background-color: var(--link-hover-color);
  transform: scale(1.05);
}

/* Modal Animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
  .projects-container {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }

  .project-card {
    max-width: 100%;
  }

  .modal-content {
    max-width: 90%;
    padding: 1.5rem;
  }

  .skill-icon {
    font-size: 1.5rem;
  }
}

/* Focus Styles */
.project-btn:focus,
.close-button:focus,
.skill-icon:focus,
.modal-btn:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* NEW: Rainbow Glow Effect for Project Cards */
.project-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: var(--primary-color);
  opacity: 0;
  transform: skewX(-20deg);
  transition: left 0.5s ease, opacity 0.5s ease;
  z-index: -1;
}

.project-card:hover::after {
  left: 0;
  opacity: 0.15;
}

.project-card:hover {
  transform: translateY(-4px);
  animation: rainbowGlow 3s infinite;
}

.project-card:hover h3,
.project-card:hover p,
.project-card:hover span,
.project-card:hover a,
.project-card:hover button {
  animation: rainbowTextGlow 3s infinite;
}

@keyframes rainbowGlow {
  0% { box-shadow: 0 0 10px red; }
  14% { box-shadow: 0 0 12px orange; }
  28% { box-shadow: 0 0 14px yellow; }
  42% { box-shadow: 0 0 16px green; }
  56% { box-shadow: 0 0 18px blue; }
  70% { box-shadow: 0 0 16px indigo; }
  84% { box-shadow: 0 0 14px violet; }
  100% { box-shadow: 0 0 12px red; }
}

@keyframes rainbowTextGlow {
  0% { text-shadow: 0 0 8px red; }
  14% { text-shadow: 0 0 8px orange; }
  28% { text-shadow: 0 0 8px yellow; }
  42% { text-shadow: 0 0 8px green; }
  56% { text-shadow: 0 0 8px blue; }
  70% { text-shadow: 0 0 8px indigo; }
  84% { text-shadow: 0 0 8px violet; }
  100% { text-shadow: 0 0 8px red; }
}
</style>
