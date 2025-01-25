<!-- src/components/Footer.vue -->
<template>
  <footer>
    <div class="footer-container">
      <div class="footer-left">
        <h2 class="footer-title">Sarvesh Mina</h2>
        <p>Crafting software solutions with passion.</p>
      </div>

      <div class="footer-right">
        <h3>Connect with me</h3>
        <div class="social-icons">
          <a href="mailto:minasarvesh@gmail.com" target="_blank" title="Email">
            <font-awesome-icon :icon="['fas', 'envelope']" />
          </a>
          <a href="https://github.com/SarveshMina" target="_blank" title="GitHub">
            <font-awesome-icon :icon="['fab', 'github']" />
          </a>
          <a href="https://linkedin.com/in/sarvesh-mina/" target="_blank" title="LinkedIn">
            <font-awesome-icon :icon="['fab', 'linkedin']" />
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2025 Sarvesh Mina. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
/* Footer Container */
footer {
  background: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  padding: 2rem;
  text-align: center;
  color: var(--text-color);
  transition: background-color 0.5s ease, color 0.5s ease;
}

/* Footer Layout */
.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

/* Left Side */
.footer-left {
  text-align: left;
  max-width: 400px;
}

.footer-title {
  font-size: 1.8rem;
  font-family: 'Source Code Pro', monospace;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

/* Right Side */
.footer-right {
  text-align: right;
}

.footer-right h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-family: 'Roboto', sans-serif;
}

/* Social Icons */
.social-icons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.social-icons a {
  font-size: 1.8rem;
  color: var(--primary-color);
  transition: transform 0.3s ease, color 0.3s ease;
}

.social-icons a:hover {
  transform: scale(1.2);
  color: var(--link-hover-color);
}

/* Footer Bottom */
.footer-bottom {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--accent-color);
}

/* Responsive */
@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .footer-left,
  .footer-right {
    text-align: center;
  }

  .social-icons {
    justify-content: center;
  }
}
</style>
