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
      <button class="hamburger" @click="sidebarOpen = true">
        <i class="fas fa-bars"></i>
      </button>
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
    }
  },
  methods: {
    handleLogout() {
      logout()
      this.$router.push({ name: 'AdminLogin' })
    },
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
  background: #1a1a2e;
  color: #e0e0e0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 100;
  transition: transform 0.3s ease;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.3rem;
  color: #fff;
}

.sidebar-close {
  display: none;
  background: none;
  border: none;
  color: #e0e0e0;
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
  color: #b0b0b0;
  text-decoration: none;
  font-size: 0.95rem;
  transition: background 0.2s, color 0.2s;
  border-left: 3px solid transparent;
}

.sidebar-nav a:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.sidebar-nav a.active {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-left-color: #6c63ff;
}

.sidebar-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #b0b0b0;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  transition: color 0.2s;
}

.back-link:hover {
  color: #fff;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.15);
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

.hamburger {
  display: none;
  background: none;
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--text-color);
  margin-bottom: 1rem;
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

  .hamburger {
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
