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
      <div class="stat-card" :class="weekChange >= 0 ? 'stat-up' : 'stat-down'">
        <div class="stat-icon week"><i class="fas fa-calendar-week"></i></div>
        <div class="stat-info">
          <span class="stat-number">{{ thisWeekViews }}</span>
          <span class="stat-label">This Week</span>
          <span class="stat-change" v-if="lastWeekViews > 0">
            <i :class="weekChange >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
            {{ Math.abs(weekChange) }}% vs last week ({{ lastWeekViews }})
          </span>
          <span class="stat-change neutral" v-else>Last week: {{ lastWeekViews }}</span>
        </div>
      </div>
      <div class="stat-card" :class="monthChange >= 0 ? 'stat-up' : 'stat-down'">
        <div class="stat-icon month"><i class="fas fa-calendar-alt"></i></div>
        <div class="stat-info">
          <span class="stat-number">{{ thisMonthViews }}</span>
          <span class="stat-label">This Month</span>
          <span class="stat-change" v-if="lastMonthViews > 0">
            <i :class="monthChange >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
            {{ Math.abs(monthChange) }}% vs last month ({{ lastMonthViews }})
          </span>
          <span class="stat-change neutral" v-else>Last month: {{ lastMonthViews }}</span>
        </div>
      </div>
    </div>

    <!-- Views Over Time Chart -->
    <section class="panel">
      <div class="panel-header">
        <h2><i class="fas fa-chart-line"></i> Views Over Time</h2>
        <div class="tab-group">
          <button
            v-for="tab in timeTabs"
            :key="tab.key"
            class="tab-btn"
            :class="{ active: activeTimeTab === tab.key }"
            @click="activeTimeTab = tab.key; renderViewsChart()"
          >{{ tab.label }}</button>
        </div>
      </div>
      <div class="chart-container">
        <canvas ref="viewsChart"></canvas>
      </div>
    </section>

    <!-- Section Views -->
    <section class="panel">
      <h2><i class="fas fa-layer-group"></i> Section Views</h2>
      <p class="panel-desc">How many visitors scrolled to each section of your portfolio.</p>
      <div class="chart-container chart-short">
        <canvas ref="sectionsChart"></canvas>
      </div>
    </section>

    <!-- Project Interactions -->
    <section class="panel">
      <h2><i class="fas fa-project-diagram"></i> Project Interactions</h2>
      <p class="panel-desc">What visitors clicked on for each project.</p>
      <div class="chart-container">
        <canvas ref="projectsChart"></canvas>
      </div>
      <div class="project-table-wrapper">
        <table class="project-table">
          <thead>
            <tr>
              <th>Project</th>
              <th><i class="fas fa-expand"></i> Details</th>
              <th><i class="fas fa-external-link-alt"></i> Demo</th>
              <th><i class="fas fa-code"></i> Source</th>
              <th><i class="fas fa-play"></i> Video</th>
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

    <!-- Activity by Hour -->
    <section class="panel">
      <h2><i class="fas fa-clock"></i> Activity by Hour</h2>
      <p class="panel-desc">When your visitors are most active (UTC).</p>
      <div class="chart-container chart-short">
        <canvas ref="hourChart"></canvas>
      </div>
    </section>

    <!-- Recent Activity -->
    <section class="panel">
      <h2><i class="fas fa-stream"></i> Recent Activity</h2>
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
import { Chart, registerables } from 'chart.js'
import { getCounters, getRecentEvents, getAllEvents } from '../../composables/useAnalytics'
import { getProjects } from '../../composables/usePortfolioData'

Chart.register(...registerables)

export default {
  name: 'AdminAnalytics',
  data() {
    return {
      counters: null,
      events: [],
      allEvents: [],
      loading: false,
      error: '',
      needsSetup: false,
      projects: [],
      activeTimeTab: '7d',
      timeTabs: [
        { key: '7d', label: '7 Days' },
        { key: '30d', label: '30 Days' },
        { key: '12m', label: '12 Months' },
      ],
      charts: {},
    }
  },
  computed: {
    pageViews() {
      return this.counters?.pageViews || 0
    },
    uniqueVisitors() {
      return this.counters?.uniqueVisitors || 0
    },
    thisWeekViews() {
      return this.countEventsSince(0, 7)
    },
    lastWeekViews() {
      return this.countEventsSince(7, 14)
    },
    weekChange() {
      if (this.lastWeekViews === 0) return 0
      return Math.round(((this.thisWeekViews - this.lastWeekViews) / this.lastWeekViews) * 100)
    },
    thisMonthViews() {
      return this.countEventsSince(0, 30)
    },
    lastMonthViews() {
      return this.countEventsSince(30, 60)
    },
    monthChange() {
      if (this.lastMonthViews === 0) return 0
      return Math.round(((this.thisMonthViews - this.lastMonthViews) / this.lastMonthViews) * 100)
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
      return Object.entries(sectionMap).map(([key, label]) => ({
        name: key,
        label,
        count: sections[key] || 0,
      }))
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
  beforeUnmount() {
    Object.values(this.charts).forEach(c => c.destroy())
  },
  methods: {
    countEventsSince(daysAgo, daysBack) {
      const now = new Date()
      const from = new Date(now)
      from.setDate(from.getDate() - daysBack)
      const to = new Date(now)
      to.setDate(to.getDate() - daysAgo)
      return this.allEvents.filter(e => {
        if (!e.date) return false
        return e.date >= from && e.date <= to && e.type === 'page_view'
      }).length
    },
    async refresh() {
      this.loading = true
      this.error = ''
      this.needsSetup = false
      try {
        const [counters, events, allEvents] = await Promise.all([
          getCounters(),
          getRecentEvents(30),
          getAllEvents(),
        ])
        this.counters = counters
        this.events = events
        this.allEvents = allEvents
        this.$nextTick(() => this.renderAllCharts())
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
    renderAllCharts() {
      this.renderViewsChart()
      this.renderSectionsChart()
      this.renderProjectsChart()
      this.renderHourChart()
    },
    getChartColors() {
      const root = getComputedStyle(document.documentElement)
      const textColor = root.getPropertyValue('--text-color').trim() || '#e0e0e0'
      const gridColor = 'rgba(128, 128, 128, 0.15)'
      return { textColor, gridColor }
    },
    destroyChart(name) {
      if (this.charts[name]) {
        this.charts[name].destroy()
        delete this.charts[name]
      }
    },
    renderViewsChart() {
      this.destroyChart('views')
      const canvas = this.$refs.viewsChart
      if (!canvas) return
      const { textColor, gridColor } = this.getChartColors()
      const now = new Date()
      let labels = []
      let data = []

      if (this.activeTimeTab === '7d') {
        for (let i = 6; i >= 0; i--) {
          const d = new Date(now)
          d.setDate(d.getDate() - i)
          const dayStr = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' })
          labels.push(dayStr)
          data.push(this.allEvents.filter(e => {
            if (!e.date || e.type !== 'page_view') return false
            return e.date.toDateString() === d.toDateString()
          }).length)
        }
      } else if (this.activeTimeTab === '30d') {
        for (let i = 29; i >= 0; i--) {
          const d = new Date(now)
          d.setDate(d.getDate() - i)
          labels.push(d.getDate().toString())
          data.push(this.allEvents.filter(e => {
            if (!e.date || e.type !== 'page_view') return false
            return e.date.toDateString() === d.toDateString()
          }).length)
        }
      } else {
        for (let i = 11; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
          labels.push(d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }))
          data.push(this.allEvents.filter(e => {
            if (!e.date || e.type !== 'page_view') return false
            return e.date.getMonth() === d.getMonth() && e.date.getFullYear() === d.getFullYear()
          }).length)
        }
      }

      this.charts.views = new Chart(canvas, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Page Views',
            data,
            borderColor: '#6c63ff',
            backgroundColor: 'rgba(108, 99, 255, 0.1)',
            fill: true,
            tension: 0.3,
            pointRadius: 3,
            pointBackgroundColor: '#6c63ff',
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: textColor, maxRotation: 45 }, grid: { color: gridColor } },
            y: { beginAtZero: true, ticks: { color: textColor, stepSize: 1 }, grid: { color: gridColor } },
          },
        },
      })
    },
    renderSectionsChart() {
      this.destroyChart('sections')
      const canvas = this.$refs.sectionsChart
      if (!canvas) return
      const { textColor, gridColor } = this.getChartColors()

      this.charts.sections = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: this.sectionData.map(s => s.label),
          datasets: [{
            label: 'Views',
            data: this.sectionData.map(s => s.count),
            backgroundColor: [
              'rgba(108, 99, 255, 0.7)',
              'rgba(155, 89, 182, 0.7)',
              'rgba(52, 152, 219, 0.7)',
              'rgba(46, 204, 113, 0.7)',
              'rgba(241, 196, 15, 0.7)',
            ],
            borderRadius: 6,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          plugins: { legend: { display: false } },
          scales: {
            x: { beginAtZero: true, ticks: { color: textColor, stepSize: 1 }, grid: { color: gridColor } },
            y: { ticks: { color: textColor }, grid: { display: false } },
          },
        },
      })
    },
    renderProjectsChart() {
      this.destroyChart('projects')
      const canvas = this.$refs.projectsChart
      if (!canvas) return
      const { textColor, gridColor } = this.getChartColors()

      this.charts.projects = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: this.projectData.map(p => p.title.length > 20 ? p.title.slice(0, 18) + '...' : p.title),
          datasets: [
            { label: 'Details', data: this.projectData.map(p => p.view), backgroundColor: 'rgba(108, 99, 255, 0.7)', borderRadius: 4 },
            { label: 'Demo', data: this.projectData.map(p => p.demo), backgroundColor: 'rgba(46, 204, 113, 0.7)', borderRadius: 4 },
            { label: 'Source', data: this.projectData.map(p => p.source), backgroundColor: 'rgba(52, 152, 219, 0.7)', borderRadius: 4 },
            { label: 'Video', data: this.projectData.map(p => p.video), backgroundColor: 'rgba(241, 196, 15, 0.7)', borderRadius: 4 },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: textColor, boxWidth: 12, padding: 12 },
            },
          },
          scales: {
            x: { ticks: { color: textColor }, grid: { display: false } },
            y: { beginAtZero: true, ticks: { color: textColor, stepSize: 1 }, grid: { color: gridColor } },
          },
        },
      })
    },
    renderHourChart() {
      this.destroyChart('hour')
      const canvas = this.$refs.hourChart
      if (!canvas) return
      const { textColor, gridColor } = this.getChartColors()
      const hourCounts = new Array(24).fill(0)
      this.allEvents.forEach(e => {
        if (e.date) hourCounts[e.date.getUTCHours()]++
      })

      this.charts.hour = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: hourCounts.map((_, i) => `${i.toString().padStart(2, '0')}:00`),
          datasets: [{
            label: 'Events',
            data: hourCounts,
            backgroundColor: 'rgba(108, 99, 255, 0.5)',
            borderColor: '#6c63ff',
            borderWidth: 1,
            borderRadius: 3,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: textColor, maxRotation: 45, font: { size: 10 } }, grid: { display: false } },
            y: { beginAtZero: true, ticks: { color: textColor, stepSize: 1 }, grid: { color: gridColor } },
          },
        },
      })
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

.setup-banner > i { color: #f39c12; font-size: 1.3rem; margin-top: 0.15rem; }
.setup-banner ol { margin: 0.5rem 0 0 1.2rem; padding: 0; }
.setup-banner li { margin-bottom: 0.3rem; }
.setup-banner a { color: #6c63ff; text-decoration: underline; }
.setup-banner code { background: rgba(128, 128, 128, 0.15); padding: 0.15rem 0.4rem; border-radius: 3px; font-size: 0.85rem; }

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
  gap: 1.2rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--card-bg-color);
  border: 1px solid rgba(128, 128, 128, 0.15);
  border-radius: 10px;
  padding: 1.3rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-card.highlight { border-left: 4px solid #6c63ff; }
.stat-card.stat-up { border-left: 4px solid #27ae60; }
.stat-card.stat-down { border-left: 4px solid #e74c3c; }

.stat-icon {
  font-size: 1.6rem;
  color: #6c63ff;
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(108, 99, 255, 0.1);
  border-radius: 10px;
  flex-shrink: 0;
}

.stat-icon.visitors { color: #27ae60; background: rgba(39, 174, 96, 0.1); }
.stat-icon.week { color: #3498db; background: rgba(52, 152, 219, 0.1); }
.stat-icon.month { color: #9b59b6; background: rgba(155, 89, 182, 0.1); }

.stat-info { display: flex; flex-direction: column; }
.stat-number { font-size: 1.8rem; font-weight: 700; color: var(--primary-color); line-height: 1.1; }
.stat-label { font-size: 0.8rem; color: var(--accent-color); margin-top: 0.15rem; }

.stat-change {
  font-size: 0.72rem;
  margin-top: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.stat-up .stat-change { color: #27ae60; }
.stat-down .stat-change { color: #e74c3c; }
.stat-change.neutral { color: var(--accent-color); }

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

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.panel-header h2 { margin-bottom: 0; }

.panel-desc {
  color: var(--accent-color);
  font-size: 0.8rem;
  margin: 0 0 1.2rem 0;
}

/* Tab Group */
.tab-group {
  display: flex;
  gap: 0;
  border: 1px solid rgba(128, 128, 128, 0.25);
  border-radius: 6px;
  overflow: hidden;
}

.tab-btn {
  padding: 0.35rem 0.8rem;
  background: transparent;
  border: none;
  color: var(--accent-color);
  font-family: 'Source Code Pro', monospace;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:not(:last-child) { border-right: 1px solid rgba(128, 128, 128, 0.25); }
.tab-btn.active { background: #6c63ff; color: #fff; }
.tab-btn:hover:not(.active) { background: rgba(108, 99, 255, 0.1); }

/* Chart */
.chart-container {
  position: relative;
  height: 280px;
  margin-bottom: 1rem;
}

.chart-container.chart-short {
  height: 220px;
}

/* Project Table */
.project-table-wrapper { overflow-x: auto; }

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

.project-table th i { margin-right: 0.3rem; }

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
.project-table tbody tr:hover { background: rgba(108, 99, 255, 0.04); }

/* Activity List */
.activity-list { max-height: 400px; overflow-y: auto; }

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

.activity-details { display: flex; flex-direction: column; min-width: 0; }
.activity-desc { font-size: 0.85rem; color: var(--text-color); }
.activity-time { font-size: 0.75rem; color: var(--accent-color); }

.empty-state {
  color: var(--accent-color);
  font-size: 0.9rem;
  text-align: center;
  padding: 2rem 0;
}

@media (max-width: 600px) {
  .stats-grid { grid-template-columns: 1fr; }
  .panel-header { flex-direction: column; align-items: flex-start; }
  .chart-container { height: 220px; }
  .chart-container.chart-short { height: 180px; }
}
</style>
