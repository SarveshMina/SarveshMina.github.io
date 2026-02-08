<template>
  <div class="admin-skills">
    <div class="page-header">
      <h1>Manage Skills</h1>
      <button @click="addCategory" class="add-btn">
        <i class="fas fa-plus"></i> Add Category
      </button>
    </div>

    <p v-if="saved" class="save-msg">Changes saved successfully.</p>

    <div class="category-list">
      <div v-for="(category, catIdx) in skills" :key="catIdx" class="editor-card">
        <div class="card-top">
          <div class="form-group inline">
            <label>Category Name</label>
            <input v-model="category.name" placeholder="e.g. Programming Languages" />
          </div>
          <button @click="removeCategory(catIdx)" class="delete-btn" title="Delete category">
            <i class="fas fa-trash"></i>
          </button>
        </div>

        <div class="skills-list">
          <div v-for="(skill, skillIdx) in category.skills" :key="skillIdx" class="skill-row">
            <div class="form-group">
              <label>Name</label>
              <input v-model="skill.name" placeholder="Skill name" />
            </div>
            <div class="form-group">
              <label>Icon (e.g. fab,java)</label>
              <input :value="skill.icon.join(',')" @input="updateIcon(catIdx, skillIdx, $event.target.value)" placeholder="fab,java" />
            </div>
            <div class="form-group">
              <label>URL</label>
              <input v-model="skill.url" placeholder="https://..." />
            </div>
            <button @click="removeSkill(catIdx, skillIdx)" class="delete-btn small" title="Remove skill">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <button @click="addSkill(catIdx)" class="add-skill-btn">
          <i class="fas fa-plus"></i> Add Skill
        </button>
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
import { getSkills, saveSkills, defaultSkills } from '../../composables/usePortfolioData'

export default {
  name: 'AdminSkills',
  data() {
    return {
      skills: [],
      saved: false,
    }
  },
  created() {
    this.skills = getSkills()
  },
  methods: {
    addCategory() {
      this.skills.push({ name: '', skills: [] })
    },
    removeCategory(idx) {
      if (confirm('Delete this category and all its skills?')) {
        this.skills.splice(idx, 1)
      }
    },
    addSkill(catIdx) {
      this.skills[catIdx].skills.push({ name: '', icon: ['fas', 'code'], url: '' })
    },
    removeSkill(catIdx, skillIdx) {
      this.skills[catIdx].skills.splice(skillIdx, 1)
    },
    updateIcon(catIdx, skillIdx, value) {
      this.skills[catIdx].skills[skillIdx].icon = value.split(',').map(s => s.trim())
    },
    saveChanges() {
      saveSkills(this.skills)
      this.saved = true
      setTimeout(() => { this.saved = false }, 3000)
    },
    resetDefaults() {
      if (confirm('Reset skills to defaults?')) {
        this.skills = JSON.parse(JSON.stringify(defaultSkills))
        saveSkills(this.skills)
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

.add-btn, .add-skill-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.9rem;
  background: #6c63ff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.85rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.add-btn:hover, .add-skill-btn:hover { opacity: 0.85; }

.add-skill-btn {
  background: transparent;
  color: #6c63ff;
  border: 1px dashed #6c63ff;
  margin-top: 0.5rem;
}

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
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1rem;
  gap: 1rem;
}

.card-top .form-group.inline {
  flex: 1;
  margin-bottom: 0;
}

.delete-btn {
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.4rem;
}

.delete-btn.small {
  font-size: 0.85rem;
  align-self: flex-end;
  margin-bottom: 1rem;
}

.skill-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr auto;
  gap: 0.75rem;
  align-items: end;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(128, 128, 128, 0.08);
}

.form-group {
  margin-bottom: 0.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
  color: var(--accent-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 6px;
  font-size: 0.85rem;
  font-family: 'Source Code Pro', monospace;
  background: var(--background-color);
  color: var(--text-color);
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #6c63ff;
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

@media (max-width: 700px) {
  .skill-row {
    grid-template-columns: 1fr;
  }
}
</style>
