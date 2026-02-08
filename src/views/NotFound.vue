<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1 class="error-code">404</h1>
      <p class="error-message">Page not found</p>
      <p class="error-desc">The page you're looking for doesn't exist or has been moved.</p>
      <div class="actions">
        <router-link to="/" class="home-btn">
          <i class="fas fa-home"></i> Go Home
        </router-link>
        <button @click="$router.back()" class="back-btn">
          <i class="fas fa-arrow-left"></i> Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  mounted() {
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode')
    }
  },
}
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Sans', sans-serif;
  padding: 2rem;
}

.not-found-content {
  text-align: center;
  max-width: 480px;
}

.error-code {
  font-size: 8rem;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(135deg, #6c63ff, #9b59b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.error-message {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.75rem;
}

.error-desc {
  font-size: 1rem;
  color: var(--text-dim);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.home-btn,
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
}

.home-btn {
  background: #6c63ff;
  color: #fff;
  border: none;
}

.home-btn:hover {
  background: #5a52d5;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(108, 99, 255, 0.3);
}

.back-btn {
  background: var(--glass-bg);
  color: var(--text);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(10px);
}

.back-btn:hover {
  background: var(--glass-hover-bg);
  transform: translateY(-2px);
}

@media (max-width: 480px) {
  .error-code { font-size: 5rem; }
  .error-message { font-size: 1.3rem; }
  .error-desc { font-size: 0.9rem; }
}
</style>
