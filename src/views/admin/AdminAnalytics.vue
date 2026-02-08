<template>
  <div class="admin-analytics">
    <div class="page-header">
      <h1>Analytics</h1>
      <button @click="refresh" class="refresh-btn" :disabled="loading">
        <i class="fas fa-sync-alt" :class="{ 'fa-spin': loading }"></i> Refresh
      </button>
    </div>

    <!-- Firebase setup banner -->
    <div v-if="needsSetup" class="setup-banner">
      <i class="fas fa-exclamation-triangle"></i>
      <div>
        <strong>Firebase not configured.</strong> Analytics requires a Firebase project.
        <ol>
          <li>Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noopener">Firebase Console</a> and create a free project</li>
          <li>Add a Web app and create a Firestore Database (test mode)</li>
          <li>Copy your config into <code>src/firebase.js</code></li>
        </ol>
      </div>
    </div>

    <p v-if="error && !needsSetup" class="error-msg">{{ error }}</p>

    <!-- Overview Stats -->
    <div class="stats-grid">
      <div class="stat-card highlight">
        <div class="stat-icon"><i class="fas fa-eye"></i></div>
        <div class="stat-info">
          <span class="stat-number">{{ pageViews }}</span>
          <span class="stat-label">Total Page Views</span>
        </div>
      </div>
      <div class="stat-card highlight">
        <div class="stat-icon visitors"><i class="fas fa-users"></i></div>
        <div class="stat-info">
          <span class="stat-number">{{ uniqueVisitors }}</span>
          <span class="stat-label">Unique Visitors</span>
        </div>
      </div>
    </div>

    <!-- Section Views -->
    <section class="panel">
      <h2><i class="fas fa-layer-group"></i> Section Views</h2>
      <p class="panel-desc">How many visitors scrolled to each section of your portfolio.</p>
      <div class="bar-chart">
        <div
          v-for="section in sectionData"
          :key="section.name"
          class="bar-row"
        >
          <span class="bar-label">{{ section.label }}</span>
          <div class="bar-track">
            <div
              class="bar-fill"
              :style="{ width: section.percent + '%' }"
            ></div>
          </div>
          <span class="bar-value">{{ section.count }}</span>
        </div>
      </div>
    </section>

    <!-- Project Interactions -->
    <section class="panel">
      <h2><i class="fas fa-project-diagram"></i> Project Interactions</h2>
      <p class="panel-desc">What visitors clicked on for each project.</p>
      <div class="project-table-wrapper">
        <table class="project-table">
          <thead>
            <tr>
              <th>Project</th>
              <th><i class="fas fa-expand"></i> Details Viewed</th>
              <th><i class="fas fa-external-link-alt"></i> Demo Clicks</th>
              <th><i class="fas fa-code"></i> Source Clicks</th>
              <th><i class="fas fa-play"></i> Video Plays</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in projectData" :key="p.slug">
              <td class="project-name">{{ p.title }}</td>
              <td>{{ p.view }}</td>
              <td>{{ p.demo }}</td>
              <td>{{ p.source }}</td>
              <td>{{ p.video }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Recent Activity -->
    <section class="panel">
      <h2><i class="fas fa-clock"></i> Recent Activity</h2>
      <div v-if="events.length" class="activity-list">
        <div v-for="event in events" :key="event.id" class="activity-item">
          <div class="activity-icon">
            <i :class="eventIcon(event.type)"></i>
          </div>
          <div class="activity-details">
            <span class="activity-desc">{{ eventDescription(event) }}</span>
            <span class="activity-time">{{ formatTime(event.timestamp) }}</span>
          </div>
        </div>
      </div>
      <p v-else class="empty-state">No recent activity recorded yet.</p>
    </section>
  </div>
</template>

<script>
import { getCounters, getRecentEvents } from '../../composables/useAnalytics'
import { getProjects } from '../../composables/usePortfolioData'

export default {
  name: 'AdminAnalytics',
  data() {
    return {
      counters: null,
      events: [],
      loading: false,
      error: '',
      needsSetup: false,
      projects: [],
    }
  },
  computed: {
    pageViews() {
      return this.counters?.pageViews || 0
    },
    uniqueVisitors() {
      return this.counters?.uniqueVisitors || 0
    },
    sectionData() {
      const sections = this.counters?.sections || {}
      const sectionMap = {
        summary: 'Hero / Summary',
        skills: 'Skills',
        'education-experience': 'Education & Experience',
        projects: 'Projects',
        contact: 'Contact',
      }
      const items = Object.entries(sectionMap).map(([key, label]) => ({
        name: key,
        label,
        count: sections[key] || 0,
      }))
      const max = Math.max(...items.map(i => i.count), 1)
      return items.map(i => ({ ...i, percent: (i.count / max) * 100 }))
    },
    projectData() {
      const actions = this.counters?.projectActions || {}
      return this.projects.map(p => ({
        slug: p.slug,
        title: p.title,
        view: actions[`${p.slug}_view`] || 0,
        demo: actions[`${p.slug}_demo`] || 0,
        source: actions[`${p.slug}_source`] || 0,
        video: actions[`${p.slug}_video`] || 0,
      }))
    },
  },
  async created() {
    this.projects = getProjects()
    await this.refresh()
  },
  methods: {
    async refresh() {
      this.loading = true
      this.error = ''
      this.needsSetup = false
      try {
        const [counters, events] = await Promise.all([
          getCounters(),
          getRecentEvents(30),
        ])
        this.counters = counters
        this.events = events
      } catch (e) {
        const msg = e?.message || ''
        if (msg.includes('YOUR_') || msg.includes('invalid') || msg.includes('API key')) {
          this.needsSetup = true
        } else {
          this.error = 'Failed to load analytics: ' + msg
        }
      } finally {
        this.loading = false
      }
    },
    eventIcon(type) {
      const icons = {
        page_view: 'fas fa-eye',
        section_view: 'fas fa-layer-group',
        project_action: 'fas fa-mouse-pointer',
      }
      return icons[type] || 'fas fa-circle'
    },
    eventDescription(event) {
      if (event.type === 'page_view') return 'Someone visited your portfolio'
      if (event.type === 'section_view') {
        const labels = {
          summary: 'Hero / Summary',
          skills: 'Skills',
          'education-experience': 'Education & Experience',
          projects: 'Projects',
          contact: 'Contact',
        }
        return `Viewed section: ${labels[event.section] || event.section}`
      }
      if (event.type === 'project_action') {
        const actionLabels = { view: 'viewed details', demo: 'clicked demo', source: 'clicked source code', video: 'watched video' }
        return `${event.project}: ${actionLabels[event.action] || event.action}`
      }
      return event.type
    },
    formatTime(timestamp) {
      if (!timestamp) return ''
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
      const now = new Date()
      const diff = now - date
      if (diff < 60000) return 'Just now'
      if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
      if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
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

.refresh-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--card-bg-color);
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 6px;
  color: var(--text-color);
  font-family: 'Source Code Pro', monospace;
  font-size: 0.85rem;
  cursor: pointer;
  transition: border-color 0.2s;
}

.refresh-btn:hover:not(:disabled) { border-color: #6c63ff; }
.refresh-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* Setup Banner */
.setup-banner {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: rgba(243, 156, 18, 0.1);
  border: 1px solid rgba(243, 156, 18, 0.3);
  border-radius: 10px;
  padding: 1.2rem 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  font-size: 0.9rem;
  line-height: 1.6;
}

.setup-banner > i {
  color: #f39c12;
  font-size: 1.3rem;
  margin-top: 0.15rem;
}

.setup-banner ol {
  margin: 0.5rem 0 0 1.2rem;
  padding: 0;
}

.setup-banner li {
  margin-bottom: 0.3rem;
}

.setup-banner a {
  color: #6c63ff;
  text-decoration: underline;
}

.setup-banner code {
  background: rgba(128, 128, 128, 0.15);
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  font-size: 0.85rem;
}

.error-msg {
  background: rgba(231, 76, 60, 0.15);
  color: #e74c3c;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
}

.stat-card.highlight { border-left: 4px solid #6c63ff; }

.stat-icon {
  font-size: 1.8rem;
  color: #6c63ff;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(108, 99, 255, 0.1);
  border-radius: 10px;
}

.stat-icon.visitors { color: #27ae60; background: rgba(39, 174, 96, 0.1); }

.stat-info { display: flex; flex-direction: column; }
.stat-number { font-size: 2rem; font-weight: 700; color: var(--primary-color); }
.stat-label { font-size: 0.85rem; color: var(--accent-color); }

/* Panels */
.panel {
  background: var(--card-bg-color);
  border: 1px solid rgba(128, 128, 128, 0.15);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.panel h2 {
  font-size: 1.3rem;
  color: var(--primary-color);
  margin: 0 0 0.3rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.panel-desc {
  color: var(--accent-color);
  font-size: 0.8rem;
  margin: 0 0 1.2rem 0;
}

/* Bar Chart */
.bar-chart { display: flex; flex-direction: column; gap: 0.8rem; }

.bar-row {
  display: grid;
  grid-template-columns: 180px 1fr 50px;
  align-items: center;
  gap: 0.75rem;
}

.bar-label {
  font-size: 0.85rem;
  color: var(--text-color);
  text-align: right;
}

.bar-track {
  height: 28px;
  background: rgba(128, 128, 128, 0.1);
  border-radius: 6px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #6c63ff, #9b59b6);
  border-radius: 6px;
  transition: width 0.6s ease;
  min-width: 4px;
}

.bar-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary-color);
}

/* Project Table */
.project-table-wrapper {
  overflow-x: auto;
}

.project-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.project-table th {
  text-align: left;
  padding: 0.7rem 0.8rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--accent-color);
  border-bottom: 2px solid rgba(128, 128, 128, 0.15);
}

.project-table th i {
  margin-right: 0.3rem;
}

.project-table td {
  padding: 0.8rem 0.8rem;
  border-bottom: 1px solid rgba(128, 128, 128, 0.08);
  color: var(--text-color);
}

.project-table td:not(.project-name) {
  text-align: center;
  font-weight: 600;
  font-size: 1.05rem;
}

.project-name { font-weight: 500; }

.project-table tbody tr:hover {
  background: rgba(108, 99, 255, 0.04);
}

/* Activity List */
.activity-list {
  max-height: 400px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0;
  border-bottom: 1px solid rgba(128, 128, 128, 0.08);
}

.activity-item:last-child { border-bottom: none; }

.activity-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(108, 99, 255, 0.1);
  border-radius: 6px;
  color: #6c63ff;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.activity-details {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.activity-desc {
  font-size: 0.85rem;
  color: var(--text-color);
}

.activity-time {
  font-size: 0.75rem;
  color: var(--accent-color);
}

.empty-state {
  color: var(--accent-color);
  font-size: 0.9rem;
  text-align: center;
  padding: 2rem 0;
}

@media (max-width: 600px) {
  .bar-row {
    grid-template-columns: 100px 1fr 40px;
  }
  .bar-label { font-size: 0.75rem; }
}
</style>
