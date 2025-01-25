<template>
  <section id="skills" class="skills-section" data-aos="fade-up">
    <h2>Skills</h2>
    <div class="skills-container">
      <div class="skill-category" v-for="category in skillsList" :key="category.name" data-aos="zoom-in">
        <div class="skill-header">
          <h3>{{ category.name }}</h3>
        </div>
        <div class="skills-grid">
          <a
              :href="skill.url"
              target="_blank"
              rel="noopener noreferrer"
              class="skill-item"
              v-for="skill in category.skills"
              :key="skill.name"
              @mouseover="showTooltip(skill.name, $event)"
              @mouseleave="hideTooltip"
          >
            <font-awesome-icon :icon="skill.icon" size="3x" class="skill-icon" />
            <p class="skill-name">{{ skill.name }}</p>
          </a>
        </div>
      </div>
    </div>

    <!-- Tooltip for Hover Effects -->
    <div v-if="tooltip.visible" class="tooltip" :style="{ top: tooltip.y + 'px', left: tooltip.x + 'px' }">
      {{ tooltip.text }}
    </div>
  </section>
</template>

<script>
export default {
  name: 'Skills',
  data() {
    return {
      tooltip: {
        visible: false,
        text: '',
        x: 0,
        y: 0
      },
      skillsList: [
        {
          name: 'Programming Languages',
          skills: [
            { name: 'Java', icon: ['fab', 'java'], url: 'https://www.java.com/' },
            { name: 'Python', icon: ['fab', 'python'], url: 'https://www.python.org/' },
            { name: 'C++', icon: ['fas', 'code'], url: 'https://isocpp.org/' } // Corrected C++ icon
          ]
        },
        {
          name: 'Frontend Development',
          skills: [
            { name: 'HTML5', icon: ['fab', 'html5'], url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' }, // HTML5 added
            { name: 'CSS3', icon: ['fab', 'css3-alt'], url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' }, // CSS3 added
            { name: 'JavaScript', icon: ['fab', 'js'], url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
            { name: 'TypeScript', icon: ['fab', 'js'], url: 'https://www.typescriptlang.org/' },
            { name: 'Vue.js', icon: ['fab', 'vuejs'], url: 'https://vuejs.org/' },
            { name: 'React', icon: ['fab', 'react'], url: 'https://reactjs.org/' }
          ]
        },
        {
          name: 'DevOps & Tools',
          skills: [
            { name: 'Git', icon: ['fab', 'git'], url: 'https://git-scm.com/' }, // Git icon added
            { name: 'GitHub', icon: ['fab', 'github'], url: 'https://github.com/' },
            { name: 'Docker', icon: ['fab', 'docker'], url: 'https://www.docker.com/' },
            { name: 'AWS', icon: ['fab', 'aws'], url: 'https://aws.amazon.com/' },
            { name: 'VS Code', icon: ['fas', 'laptop-code'], url: 'https://code.visualstudio.com/' } // VS Code added
          ]
        }
      ]
    };
  },
  methods: {
    showTooltip(text, event) {
      this.tooltip.text = text;
      this.tooltip.x = event.clientX + 15;
      this.tooltip.y = event.clientY + 15;
      this.tooltip.visible = true;
    },
    hideTooltip() {
      this.tooltip.visible = false;
    }
  }
};
</script>


<style scoped>
/* Section Styling */
.skills-section {
  padding: 4rem 2rem;
  background-color: var(--background-color);
  color: var(--text-color);
  text-align: center;
  transition: background-color 0.5s ease, color 0.5s ease;
}

/* Skills Container */
.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  justify-items: center;
}

/* Skill Category */
.skill-category {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 1.5rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.skill-category:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.skill-header h3 {
  margin: 0 0 1rem 0;
  font-size: 1.6rem;
  color: var(--primary-color);
  font-family: 'Source Code Pro', monospace;
}

/* Skills Grid */
.skills-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

/* Skill Item */
.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.02);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s, background-color 0.3s;
}

.skill-item:hover {
  transform: scale(1.1);
  background-color: rgba(0, 0, 0, 0.05);
}

/* Skill Icon */
.skill-icon {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

/* Skill Name */
.skill-name {
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  transition: color 0.3s;
}

.skill-item:hover .skill-name {
  color: var(--link-hover-color);
}

/* Tooltip */
.tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
}

/* Responsive */
@media (max-width: 768px) {
  .skills-container {
    grid-template-columns: 1fr;
  }
  .skill-name {
    font-size: 0.9rem;
  }
}
</style>
