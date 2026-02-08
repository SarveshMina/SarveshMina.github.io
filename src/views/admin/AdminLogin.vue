<template>
  <div class="login-page">
    <div class="login-card">
      <h1>Admin Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="Enter admin password"
            autocomplete="current-password"
            :disabled="loading"
          />
        </div>
        <p v-if="error" class="error-msg">{{ error }}</p>
        <button type="submit" class="login-btn" :disabled="loading">
          {{ loading ? 'Verifying...' : 'Login' }}
        </button>
      </form>
      <router-link to="/" class="back-link">Back to Portfolio</router-link>
    </div>
  </div>
</template>

<script>
import { verifyPassword, login } from '../../composables/useAuth'

export default {
  name: 'AdminLogin',
  data() {
    return {
      password: '',
      error: '',
      loading: false,
    }
  },
  methods: {
    async handleLogin() {
      this.error = ''
      this.loading = true
      try {
        const valid = await verifyPassword(this.password)
        if (valid) {
          login()
          this.$router.push({ name: 'AdminDashboard' })
        } else {
          this.error = 'Invalid password. Please try again.'
        }
      } catch {
        this.error = 'An error occurred. Please try again.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
  font-family: 'Source Code Pro', monospace;
  padding: 1rem;
}

.login-card {
  background: var(--card-bg-color);
  border: 1px solid rgba(128, 128, 128, 0.2);
  border-radius: 12px;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.login-card h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  color: var(--primary-color);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-color);
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 6px;
  font-size: 1rem;
  font-family: 'Source Code Pro', monospace;
  background: var(--background-color);
  color: var(--text-color);
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--link-color);
}

.error-msg {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  text-align: center;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--link-color);
  color: var(--background-color);
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-family: 'Source Code Pro', monospace;
  cursor: pointer;
  transition: opacity 0.3s;
}

.login-btn:hover:not(:disabled) {
  opacity: 0.85;
}

.login-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.back-link {
  display: block;
  text-align: center;
  margin-top: 1.5rem;
  color: var(--accent-color);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.back-link:hover {
  color: var(--link-hover-color);
}
</style>
