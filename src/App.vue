<!-- src/App.vue -->
<template>
  <div id="app">
    <router-view />
    <div class="mouse-glow" ref="mouseGlow"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      glowX: 0,
      glowY: 0,
      curX: 0,
      curY: 0,
      animId: null,
    }
  },
  methods: {
    onMouseMove(e) {
      this.curX = e.clientX
      this.curY = e.clientY
      const glow = this.$refs.mouseGlow
      if (glow && !glow.classList.contains('visible')) {
        glow.classList.add('visible')
      }
    },
    onMouseLeave() {
      const glow = this.$refs.mouseGlow
      if (glow) glow.classList.remove('visible')
    },
    animateGlow() {
      this.glowX += (this.curX - this.glowX) * 0.15
      this.glowY += (this.curY - this.glowY) * 0.15
      const glow = this.$refs.mouseGlow
      if (glow) {
        glow.style.left = this.glowX + 'px'
        glow.style.top = this.glowY + 'px'
      }
      this.animId = requestAnimationFrame(this.animateGlow)
    },
  },
  mounted() {
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseleave', this.onMouseLeave)
    this.animateGlow()
  },
  beforeUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseleave', this.onMouseLeave)
    if (this.animId) cancelAnimationFrame(this.animId)
  },
}
</script>
