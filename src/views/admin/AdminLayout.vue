<template>
  <div class="admin-layout">
    <aside class="admin-sidebar" :class="{ open: sidebarOpen }">
      <div class="sidebar-header">
        <h2>Admin Panel</h2>
        <button class="sidebar-close" @click="sidebarOpen = false">&times;</button>
      </div>
      <nav class="sidebar-nav">
        <router-link to="/admin/dashboard" active-class="active" @click="sidebarOpen = false">
          <i class="fas fa-tachometer-alt"></i> Dashboard
        </router-link>
        <router-link to="/admin/projects" active-class="active" @click="sidebarOpen = false">
          <i class="fas fa-project-diagram"></i> Projects
        </router-link>
        <router-link to="/admin/skills" active-class="active" @click="sidebarOpen = false">
          <i class="fas fa-code"></i> Skills
        </router-link>
        <router-link to="/admin/education" active-class="active" @click="sidebarOpen = false">
          <i class="fas fa-graduation-cap"></i> Education & Experience
        </router-link>
        <router-link to="/admin/analytics" active-class="active" @click="sidebarOpen = false">
          <i class="fas fa-chart-bar"></i> Analytics
        </router-link>
        <router-link to="/admin/export" active-class="active" @click="sidebarOpen = false">
          <i class="fas fa-file-export"></i> Export / Import
        </router-link>
      </nav>
      <div class="sidebar-footer">
        <button @click="toggleTheme" class="theme-toggle-btn">
          <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
          {{ isDark ? 'Light Mode' : 'Dark Mode' }}
        </button>
        <router-link to="/" class="back-link">
          <i class="fas fa-arrow-left"></i> Back to Portfolio
        </router-link>
        <button @click="handleLogout" class="logout-btn">
          <i class="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </aside>
    <div class="admin-overlay" v-if="sidebarOpen" @click="sidebarOpen = false"></div>
    <main class="admin-content">
      <div class="content-top-bar">
        <button class="hamburger" @click="sidebarOpen = true">
          <i class="fas fa-bars"></i>
        </button>
        <button @click="toggleTheme" class="theme-toggle-compact">
          <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
      </div>
      <router-view />
    </main>
  </div>
</template>

<script>
import { logout } from '../../composables/useAuth'

export default {
  name: 'AdminLayout',
  data() {
    return {
      sidebarOpen: false,
      isDark: false,
    }
  },
  methods: {
    handleLogout() {
      logout()
      this.$router.push({ name: 'AdminLogin' })
    },
    toggleTheme() {
      this.isDark = !this.isDark
      document.body.classList.toggle('dark-mode', this.isDark)
      localStorage.setItem('darkMode', this.isDark ? 'true' : 'false')
    },
  },
  mounted() {
    this.isDark = localStorage.getItem('darkMode') === 'true'
    document.body.classList.toggle('dark-mode', this.isDark)
  },
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  font-family: 'Source Code Pro', monospace;
  background-color: var(--background-color);
  color: var(--text-color);
}

.admin-sidebar {
  width: 260px;
  background: var(--sidebar-bg);
  color: var(--sidebar-text);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 100;
  transition: transform 0.3s ease, background 0.3s ease;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--sidebar-border);
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.3rem;
  color: var(--sidebar-text-active);
}

.sidebar-close {
  display: none;
  background: none;
  border: none;
  color: var(--sidebar-text);
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.5rem;
  color: var(--sidebar-text);
  text-decoration: none;
  font-size: 0.95rem;
  transition: background 0.2s, color 0.2s;
  border-left: 3px solid transparent;
}

.sidebar-nav a:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--sidebar-text-active);
}

.sidebar-nav a.active {
  background: rgba(255, 255, 255, 0.1);
  color: var(--sidebar-text-active);
  border-left-color: #6c63ff;
}

.sidebar-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--sidebar-border);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.theme-toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 1px solid var(--sidebar-border);
  color: var(--sidebar-text);
  padding: 0.6rem;
  border-radius: 6px;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.theme-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--sidebar-text-active);
}

.theme-toggle-btn i {
  font-size: 1rem;
  width: 18px;
  text-align: center;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--sidebar-text);
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--sidebar-text-active);
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 1px solid rgba(231, 76, 60, 0.25);
  color: #e74c3c;
  padding: 0.6rem;
  border-radius: 6px;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: rgba(231, 76, 60, 0.1);
}

.admin-content {
  flex: 1;
  margin-left: 260px;
  padding: 2rem;
  min-height: 100vh;
}

.content-top-bar {
  display: none;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.hamburger {
  display: none;
  background: none;
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--text-color);
}

.theme-toggle-compact {
  display: none;
  background: var(--card-bg-color);
  border: 1px solid rgba(128, 128, 128, 0.25);
  border-radius: 50%;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.3s;
}

.theme-toggle-compact:hover {
  border-color: #6c63ff;
  transform: rotate(180deg);
}

.admin-overlay {
  display: none;
}

@media (max-width: 768px) {
  .admin-sidebar {
    transform: translateX(-100%);
  }

  .admin-sidebar.open {
    transform: translateX(0);
  }

  .sidebar-close {
    display: block;
  }

  .admin-content {
    margin-left: 0;
  }

  .content-top-bar {
    display: flex;
  }

  .hamburger {
    display: inline-flex;
  }

  .theme-toggle-compact {
    display: inline-flex;
  }

  .admin-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
}
</style>
