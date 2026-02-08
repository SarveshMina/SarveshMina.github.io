<template>
  <div class="admin-projects">
    <div class="page-header">
      <h1>Manage Projects</h1>
      <button @click="addProject" class="add-btn">
        <i class="fas fa-plus"></i> Add Project
      </button>
    </div>

    <p v-if="saved" class="save-msg">Changes saved successfully.</p>

    <div class="project-list">
      <div v-for="(project, index) in projects" :key="index" class="editor-card" :class="{ inactive: !project.active }">
        <div class="card-top">
          <div class="card-top-left">
            <div class="order-controls">
              <button @click="moveUp(index)" :disabled="index === 0" class="order-btn" title="Move up">
                <i class="fas fa-chevron-up"></i>
              </button>
              <button @click="moveDown(index)" :disabled="index === projects.length - 1" class="order-btn" title="Move down">
                <i class="fas fa-chevron-down"></i>
              </button>
            </div>
            <h3>{{ project.title || 'New Project' }}</h3>
          </div>
          <div class="card-top-right">
            <button @click="project.active = !project.active" class="toggle-btn" :class="{ active: project.active }" :title="project.active ? 'Active — click to hide' : 'Hidden — click to show'">
              <i :class="project.active ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
              {{ project.active ? 'Active' : 'Hidden' }}
            </button>
            <button @click="removeProject(index)" class="delete-btn" title="Delete">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Title</label>
            <input v-model="project.title" placeholder="Project title" />
          </div>
          <div class="form-group">
            <label>Slug</label>
            <input v-model="project.slug" placeholder="project-slug" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Duration</label>
            <input v-model="project.duration" placeholder="e.g. Oct 2024 - Jan 2025" />
          </div>
          <div class="form-group">
            <label>Button Text</label>
            <input v-model="project.buttonText" placeholder="e.g. Live Demo" />
          </div>
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea v-model="project.description" rows="2" placeholder="Short description"></textarea>
        </div>

        <div class="form-group">
          <label>Details</label>
          <textarea v-model="project.details" rows="3" placeholder="Detailed description for modal"></textarea>
        </div>

        <div class="form-group">
          <label>Skills (comma-separated)</label>
          <input :value="project.skills.join(', ')" @input="updateSkills(index, $event.target.value)" placeholder="Vue.js, JavaScript, CSS" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Video URL</label>
            <input v-model="project.video" placeholder="/vids/project.mp4" />
          </div>
          <div class="form-group">
            <label>Live Demo URL</label>
            <input v-model="project.liveDemo" placeholder="https://..." />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Repo URL</label>
            <input v-model="project.repo" placeholder="https://github.com/..." />
          </div>
          <div class="form-group">
            <label>Frontend Repo</label>
            <input v-model="project.repoFrontend" placeholder="Optional" />
          </div>
        </div>

        <div class="form-group">
          <label>Backend Repo</label>
          <input v-model="project.repoBackend" placeholder="Optional" />
        </div>
      </div>
    </div>

    <div class="form-actions">
      <button @click="saveChanges" class="save-btn">
        <i class="fas fa-save"></i> Save Changes
      </button>
      <button @click="resetDefaults" class="reset-btn">
        <i class="fas fa-undo"></i> Reset to Defaults
      </button>
    </div>
  </div>
</template>

<script>
import { getAllProjects, saveProjects, defaultProjects } from '../../composables/usePortfolioData'

export default {
  name: 'AdminProjects',
  data() {
    return {
      projects: [],
      saved: false,
    }
  },
  created() {
    this.projects = getAllProjects()
  },
  methods: {
    moveUp(idx) {
      if (idx <= 0) return
      const item = this.projects.splice(idx, 1)[0]
      this.projects.splice(idx - 1, 0, item)
      this.reindex()
    },
    moveDown(idx) {
      if (idx >= this.projects.length - 1) return
      const item = this.projects.splice(idx, 1)[0]
      this.projects.splice(idx + 1, 0, item)
      this.reindex()
    },
    reindex() {
      this.projects.forEach((item, i) => { item.order = i })
    },
    addProject() {
      this.projects.push({
        active: true,
        order: this.projects.length,
        slug: '',
        title: '',
        duration: '',
        description: '',
        details: '',
        skills: [],
        video: '',
        liveDemo: '',
        repo: '',
        repoFrontend: '',
        repoBackend: '',
        buttonText: 'Live Demo',
      })
    },
    removeProject(index) {
      if (confirm('Delete this project?')) {
        this.projects.splice(index, 1)
        this.reindex()
      }
    },
    updateSkills(index, value) {
      this.projects[index].skills = value.split(',').map(s => s.trim()).filter(Boolean)
    },
    saveChanges() {
      this.reindex()
      saveProjects(this.projects)
      this.saved = true
      setTimeout(() => { this.saved = false }, 3000)
    },
    resetDefaults() {
      if (confirm('Reset projects to defaults? Your edits will be lost.')) {
        this.projects = JSON.parse(JSON.stringify(defaultProjects))
        saveProjects(this.projects)
      }
    },
  },
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-header h1 {
  font-size: 2rem;
  color: var(--primary-color);
  margin: 0;
}

.add-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: #6c63ff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.9rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.add-btn:hover { opacity: 0.85; }

.save-msg {
  background: rgba(46, 204, 113, 0.15);
  color: #27ae60;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.editor-card {
  background: var(--card-bg-color);
  border: 1px solid rgba(128, 128, 128, 0.15);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: opacity 0.3s;
}

.editor-card.inactive {
  opacity: 0.5;
  border-style: dashed;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.5rem;
}

.card-top-left {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  min-width: 0;
}

.card-top-left h3 {
  margin: 0;
  font-size: 1.3rem;
  color: var(--primary-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-top-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.order-controls {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.order-btn {
  background: none;
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 4px;
  color: var(--text-color, #333);
  font-size: 0.65rem;
  cursor: pointer;
  padding: 0.15rem 0.35rem;
  line-height: 1;
  transition: all 0.2s;
}

.order-btn:hover:not(:disabled) {
  background: #6c63ff;
  color: #fff;
  border-color: #6c63ff;
}

.order-btn:disabled {
  opacity: 0.25;
  cursor: default;
}

.toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #e74c3c;
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.toggle-btn.active {
  border-color: #27ae60;
  background: rgba(46, 204, 113, 0.1);
  color: #27ae60;
}

.delete-btn {
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.4rem;
  transition: opacity 0.2s;
}

.delete-btn:hover { opacity: 0.7; }

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.3rem;
  font-size: 0.8rem;
  color: var(--accent-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: 'Source Code Pro', monospace;
  background: var(--background-color);
  color: var(--text-color);
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #6c63ff;
}

.form-group textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.save-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.5rem;
  background: #27ae60;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.95rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.save-btn:hover { opacity: 0.85; }

.reset-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.5rem;
  background: none;
  border: 1px solid #e74c3c;
  color: #e74c3c;
  border-radius: 6px;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;
}

.reset-btn:hover { background: rgba(231, 76, 60, 0.1); }

@media (max-width: 600px) {
  .form-row { grid-template-columns: 1fr; }
  .card-top { flex-wrap: wrap; }
}
</style>
