<template>
  <div class="admin-education">
    <h1>Manage Education & Experience</h1>
    <p v-if="saved" class="save-msg">Changes saved successfully.</p>

    <!-- Education Section -->
    <section class="section-block">
      <div class="section-header">
        <h2><i class="fas fa-graduation-cap"></i> Education</h2>
        <button @click="addEducation" class="add-btn">
          <i class="fas fa-plus"></i> Add
        </button>
      </div>

      <div v-for="(edu, idx) in education" :key="'edu-'+idx" class="editor-card">
        <div class="card-top">
          <h3>{{ edu.degree || 'New Entry' }}</h3>
          <button @click="removeEducation(idx)" class="delete-btn"><i class="fas fa-trash"></i></button>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Degree / Qualification</label>
            <input v-model="edu.degree" placeholder="e.g. MEng Computer Science" />
          </div>
          <div class="form-group">
            <label>Institution</label>
            <input v-model="edu.institution" placeholder="University name" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Duration</label>
            <input v-model="edu.duration" placeholder="e.g. 2022 - 2027" />
          </div>
          <div class="form-group">
            <label>Grade</label>
            <input v-model="edu.grade" placeholder="Optional" />
          </div>
        </div>
        <div class="form-group">
          <label>Modules</label>
          <textarea v-model="edu.modules" rows="2" placeholder="Optional - list of modules"></textarea>
        </div>
        <div class="form-group">
          <label>Grades (e.g. A-Levels)</label>
          <input v-model="edu.grades" placeholder="Optional" />
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section class="section-block">
      <div class="section-header">
        <h2><i class="fas fa-briefcase"></i> Experience</h2>
        <button @click="addExperience" class="add-btn">
          <i class="fas fa-plus"></i> Add
        </button>
      </div>

      <div v-for="(exp, idx) in experience" :key="'exp-'+idx" class="editor-card">
        <div class="card-top">
          <h3>{{ exp.title || 'New Entry' }}</h3>
          <button @click="removeExperience(idx)" class="delete-btn"><i class="fas fa-trash"></i></button>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Job Title</label>
            <input v-model="exp.title" placeholder="e.g. Tech Manager" />
          </div>
          <div class="form-group">
            <label>Company</label>
            <input v-model="exp.company" placeholder="Company name" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Location</label>
            <input v-model="exp.location" placeholder="e.g. Southampton, UK" />
          </div>
          <div class="form-group">
            <label>Duration</label>
            <input v-model="exp.duration" placeholder="e.g. Oct 2024 - Present" />
          </div>
        </div>
        <div class="form-group">
          <label>Key Points</label>
          <div v-for="(point, pIdx) in exp.points" :key="pIdx" class="point-row">
            <input v-model="exp.points[pIdx]" placeholder="Achievement or responsibility" />
            <button @click="exp.points.splice(pIdx, 1)" class="delete-btn small"><i class="fas fa-times"></i></button>
          </div>
          <button @click="exp.points.push('')" class="add-point-btn">
            <i class="fas fa-plus"></i> Add Point
          </button>
        </div>
      </div>
    </section>

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
import {
  getEducation, getExperience,
  saveEducation, saveExperience,
  defaultEducation, defaultExperience
} from '../../composables/usePortfolioData'

export default {
  name: 'AdminEducation',
  data() {
    return {
      education: [],
      experience: [],
      saved: false,
    }
  },
  created() {
    this.education = getEducation()
    this.experience = getExperience()
  },
  methods: {
    addEducation() {
      this.education.push({ degree: '', institution: '', duration: '', grade: '', modules: '', grades: '' })
    },
    removeEducation(idx) {
      if (confirm('Delete this education entry?')) {
        this.education.splice(idx, 1)
      }
    },
    addExperience() {
      this.experience.push({ title: '', company: '', location: '', duration: '', points: [''] })
    },
    removeExperience(idx) {
      if (confirm('Delete this experience entry?')) {
        this.experience.splice(idx, 1)
      }
    },
    saveChanges() {
      saveEducation(this.education)
      saveExperience(this.experience)
      this.saved = true
      setTimeout(() => { this.saved = false }, 3000)
    },
    resetDefaults() {
      if (confirm('Reset education & experience to defaults?')) {
        this.education = JSON.parse(JSON.stringify(defaultEducation))
        this.experience = JSON.parse(JSON.stringify(defaultExperience))
        saveEducation(this.education)
        saveExperience(this.experience)
      }
    },
  },
}
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.save-msg {
  background: rgba(46, 204, 113, 0.15);
  color: #27ae60;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.section-block {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-header h2 {
  font-size: 1.5rem;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
}

.add-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  background: #6c63ff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.85rem;
  cursor: pointer;
}

.add-btn:hover { opacity: 0.85; }

.editor-card {
  background: var(--card-bg-color);
  border: 1px solid rgba(128, 128, 128, 0.15);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-top h3 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--primary-color);
}

.delete-btn {
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.3rem;
}

.delete-btn.small {
  font-size: 0.85rem;
}

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
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
  color: var(--accent-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.55rem;
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: 'Source Code Pro', monospace;
  background: var(--background-color);
  color: var(--text-color);
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #6c63ff;
}

.form-group textarea { resize: vertical; }

.point-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
}

.point-row input { flex: 1; }

.add-point-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.35rem 0.7rem;
  background: transparent;
  color: #6c63ff;
  border: 1px dashed #6c63ff;
  border-radius: 4px;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.8rem;
  cursor: pointer;
}

.form-actions {
  display: flex;
  gap: 1rem;
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
}

.reset-btn:hover { background: rgba(231, 76, 60, 0.1); }

@media (max-width: 600px) {
  .form-row { grid-template-columns: 1fr; }
}
</style>
