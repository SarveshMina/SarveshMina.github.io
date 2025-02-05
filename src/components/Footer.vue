<!-- src/components/Footer.vue -->
<template>
  <footer>
    <div class="footer-container">
      <div class="footer-left">
        <h2 class="footer-title">Sarvesh Mina</h2>
        <p>To Be Software Engineer</p>
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
  name: "Footer"
};
</script>

<style scoped>
/* Footer overall style with dark gradient and subtle blur */
footer {
  background: linear-gradient(135deg, #1a1a1a, #333333);
  backdrop-filter: blur(5px);
  padding: 2rem 1rem;
  color: #f1f1f1;
  transition: background 0.5s ease, color 0.5s ease;
  font-family: 'Source Code Pro', monospace;
}

/* Footer Container */
.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* Left Side */
.footer-left {
  flex: 1;
  min-width: 250px;
  text-align: left;
}

.footer-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;

}

/* Right Side */
.footer-right {
  flex: 1;
  min-width: 250px;
  text-align: right;
}

.footer-right h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

/* Social Icons */
.social-icons {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  align-items: center;
}

.social-icons a {
  font-size: 1.8rem;
  color: var(--primary-color);
  transition: transform 0.3s ease, color 0.3s ease;
}

.social-icons a:hover {
  transform: scale(1.2);
  color: var(--primary-color);
}

/* Footer Bottom */
.footer-bottom {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

/* Responsive Adjustments */
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
