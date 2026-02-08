<!-- src/components/BackToTop.vue -->
<template>
  <transition name="fade">
    <button
        v-if="isVisible"
        class="back-to-top"
        @click="scrollToTop"
        aria-label="Back to Top"
    >
      <i class="fas fa-chevron-up"></i>
    </button>
  </transition>
</template>

<script>
export default {
  name: "BackToTop",
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    handleScroll() {
      this.isVisible = window.scrollY > 300;
    },
    scrollToTop() {
      const start = window.scrollY;
      const duration = 600; // Smooth scroll duration (ms)
      const startTime = performance.now();

      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      const scrollStep = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, start * (1 - easeOutCubic(progress)));

        if (elapsed < duration) {
          requestAnimationFrame(scrollStep);
        }
      };

      requestAnimationFrame(scrollStep);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.fade-enter-active,.fade-leave-active{transition:opacity .4s ease}
.fade-enter-from,.fade-leave-to{opacity:0}

.back-to-top{
  position:fixed;bottom:1.5rem;right:1.5rem;
  width:42px;height:42px;border-radius:50%;
  background:var(--btn-bg);border:1.5px solid var(--btn-border);
  color:var(--text);font-size:1rem;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;backdrop-filter:blur(10px);
  transition:all .3s;z-index:100;
  box-shadow:var(--glass-shadow);
}
.back-to-top:hover{background:var(--btn-hover-bg);border-color:var(--text);transform:scale(1.1)}
.back-to-top:active{transform:scale(.95)}

@media(max-width:768px){
  .back-to-top{bottom:1.2rem;right:1.2rem;width:38px;height:38px;font-size:.9rem}
}
@media(max-width:480px){
  .back-to-top{bottom:1rem;right:1rem;width:36px;height:36px;font-size:.85rem}
}
</style>
