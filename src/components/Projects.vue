//Projects.vue
<template>
  <section id="projects" class="projects-section" data-aos="fade-up">
    <h2>Projects</h2>
    <div class="projects-container">
      <div
          class="project-card"
          v-for="project in projectsList"
          :key="project.title"
          data-aos="fade-up"
      >
        <div class="card-header">
          <h3>{{ project.title }}</h3>
          <span class="date">{{ project.duration }}</span>
        </div>
        <p class="project-description">{{ project.description }}</p>
        <div class="project-links">
          <a
              v-if="project.liveDemo"
              :href="project.liveDemo"
              target="_blank"
              class="project-btn"
          >
            {{ project.buttonText }}
          </a>
          <a :href="project.repo" target="_blank" class="project-btn">
            GitHub Repo
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Projects',
  data() {
    return {
      projectsList: [
        {
          title: 'Calendify – A Group Calendar App',
          duration: 'Oct 2024 – Jan 2025',
          description: 'A collaborative event scheduling app using Vue.js and Azure. Features include user authentication, event management, dynamic calendar views, and real-time notifications.',
          liveDemo: 'https://sarveshmina.github.io/CAD-gwc-frontend/',
          repo: 'https://github.com/SarveshMina/CAD-gwc-frontend',
          buttonText: 'Live Demo'
        },
        {
          title: 'Cube Runner 3D',
          duration: 'Apr 2022 – Oct 2022',
          description: 'An endless 3D runner game built with Unity and C#. Features procedural level generation, adaptive AI difficulty, and smooth performance optimizations.',
          liveDemo: 'https://sarveshmina.github.io/games/cube_runner_3d/',
          repo: 'https://github.com/SarveshMina/Cube_Runner_3D',
          buttonText: 'Play Game'
        },
        {
          title: 'Runway Redeclaration Tool',
          duration: 'Oct 2023 – March 2023',
          description: 'Developed a tool to modernize aviation safety protocols. Implemented TODA and ASDA calculations for flight safety, designed a user-friendly interface, and integrated mathematical models for accurate predictions.',
          liveDemo: '/downloads/RunwayRedeclaration.jar',
          repo: 'https://github.com/bryanvullo/RunwayRedeclaration',
          buttonText: 'Download JAR'
        },
        {
          title: 'TetrECS – A Tetris-Based Game',
          duration: 'Jan 2025 – Present',
          description: 'A fast-paced Java-based Tetris game with improved mechanics. Originally a university coursework project, now enhanced with new features and multiplayer support under development.',
          liveDemo: 'https://sarveshmina.github.io/TetrECS/',
          repo: 'https://github.com/SarveshMina/TetrECS',
          buttonText: 'Play Now'
        }
      ]
    }
  }
}
</script>

<style scoped>
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
  font-family: 'Source Code Pro', monospace;
}

/* Responsive Grid */
.projects-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  justify-items: center;
  max-width: 1000px;
  margin: 0 auto;
}

/* Updated to use var(--card-bg-color) */
.project-card {
  background-color: var(--card-bg-color);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 1.2rem;
  width: 100%;
  max-width: 380px;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
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
  font-family: 'Source Code Pro', monospace;
  color: var(--primary-color);
}

.project-card .date {
  font-size: 0.85rem;
  color: var(--accent-color);
  font-family: 'Source Code Pro', monospace;
}

/* Description */
.project-description {
  margin: 0.5rem 0;
  font-size: 1rem;
  line-height: 1.5;
  font-family: 'Source Code Pro', monospace;
}

/* Project Links */
.project-links {
  display: flex;
  gap: 0.8rem;
  margin-top: auto;
}

.project-btn {
  flex: 1;
  text-align: center;
  background-color: var(--link-color);
  color: var(--background-color);
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 1rem;
  transition: background 0.3s ease, transform 0.2s ease;
  font-family: 'Source Code Pro', monospace;
}

.project-btn:hover {
  background-color: var(--link-hover-color);
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 768px) {
  .projects-container {
    grid-template-columns: 1fr;
  }
}
</style>
