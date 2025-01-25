<!-- src/components/Summary.vue -->
<template>
  <section id="summary" class="summary-section" data-aos="fade-up">
    <h2>Summary</h2>
    <p>
      Ambitious and dedicated Computer Science student with a strong foundation in AI education, software engineering, and technical society leadership. Proficient in game development, collaborative project management, and driving community engagement. Passionate about leveraging technology to solve real-world challenges and advance innovation in AI and software development.
    </p>
  </section>
</template>

<script>
export default {
  name: 'Summary'
}
</script>

<style scoped>
.summary-section {
  padding: 4rem 2rem;
  background-color: var(--background-color);
  color: var(--text-color);
  text-align: center;
  position: relative;
  border-bottom: 4px solid var(--accent-color);
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: background-color 0.5s ease, color 0.5s ease;
}

.summary-section > * {
  position: relative;
  z-index: 1;
}

.summary-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-family: 'Source Code Pro', monospace;
}

.summary-section p {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  font-size: 1.2rem;
  font-family: 'Roboto', sans-serif;
}

/* Responsive */
@media (max-width: 768px) {
  .summary-section {
    padding: 3rem 1rem;
  }

  .summary-section h2 {
    font-size: 2rem;
  }

  .summary-section p {
    font-size: 1rem;
  }
}
</style>
