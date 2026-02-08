<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p class="welcome">Welcome back, Admin.</p>

    <div class="stats-grid">
      <router-link to="/admin/projects" class="stat-card">
        <div class="stat-icon"><i class="fas fa-project-diagram"></i></div>
        <div class="stat-info">
          <span class="stat-number">{{ projectCount }}</span>
          <span class="stat-label">Projects</span>
        </div>
      </router-link>

      <router-link to="/admin/skills" class="stat-card">
        <div class="stat-icon"><i class="fas fa-code"></i></div>
        <div class="stat-info">
          <span class="stat-number">{{ skillCategoryCount }}</span>
          <span class="stat-label">Skill Categories</span>
        </div>
      </router-link>

      <router-link to="/admin/education" class="stat-card">
        <div class="stat-icon"><i class="fas fa-graduation-cap"></i></div>
        <div class="stat-info">
          <span class="stat-number">{{ educationCount }}</span>
          <span class="stat-label">Education</span>
        </div>
      </router-link>

      <router-link to="/admin/education" class="stat-card">
        <div class="stat-icon"><i class="fas fa-briefcase"></i></div>
        <div class="stat-info">
          <span class="stat-number">{{ experienceCount }}</span>
          <span class="stat-label">Experience</span>
        </div>
      </router-link>
    </div>

    <div class="actions">
      <button @click="confirmReset" class="reset-btn">
        <i class="fas fa-undo"></i> Reset All to Defaults
      </button>
    </div>
  </div>
</template>

<script>
import { getProjects, getSkills, getEducation, getExperience, resetAll } from '../../composables/usePortfolioData'

export default {
  name: 'AdminDashboard',
  data() {
    return {
      projectCount: 0,
      skillCategoryCount: 0,
      educationCount: 0,
      experienceCount: 0,
    }
  },
  created() {
    this.loadStats()
  },
  methods: {
    loadStats() {
      this.projectCount = getProjects().length
      this.skillCategoryCount = getSkills().length
      this.educationCount = getEducation().length
      this.experienceCount = getExperience().length
    },
    confirmReset() {
      if (confirm('Are you sure you want to reset all content to defaults? This cannot be undone.')) {
        resetAll()
        this.loadStats()
      }
    },
  },
}
</script>

<style scoped>
.dashboard h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.welcome {
  color: var(--accent-color);
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--card-bg-color);
  border: 1px solid rgba(128, 128, 128, 0.15);
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: var(--text-color);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  font-size: 2rem;
  color: #6c63ff;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(108, 99, 255, 0.1);
  border-radius: 10px;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 0.85rem;
  color: var(--accent-color);
}

.actions {
  margin-top: 1rem;
}

.reset-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.2rem;
  background: none;
  border: 1px solid #e74c3c;
  color: #e74c3c;
  border-radius: 6px;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
}

.reset-btn:hover {
  background: rgba(231, 76, 60, 0.1);
}
</style>
