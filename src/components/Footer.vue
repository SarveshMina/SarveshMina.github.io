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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'Footer',
  mounted() {
    // Animate footer-left
    gsap.from(".footer-left", {
      scrollTrigger: {
        trigger: "footer",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

    // Animate footer-right
    gsap.from(".footer-right", {
      scrollTrigger: {
        trigger: "footer",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });

    // Animate social icons
    gsap.from(".social-icons a", {
      scrollTrigger: {
        trigger: ".social-icons",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out",
    });
  }
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
  font-family: 'Source Code Pro', monospace;
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
