<template>
  <section class="hero" id="summary">
    <div class="hero-container">
      <img src="/imgs/profile.jpg" alt="Sarvesh Mina" class="profile-image" @error="$event.target.style.background='var(--glass-bg)'">
      <div class="hero-text">
        <h2>Welcome to My Portfolio</h2>
        <p>Ambitious and dedicated Computer Science student with a strong foundation in Cloud Technologies, Game Development, and Frontend Development. Passionate about leveraging technology to solve real-world challenges and advance innovation in software development and AI.</p>
      </div>
    </div>
    <div class="socials-section">
      <h3>Explore my socials</h3>
      <div class="social-icons">
        <a href="mailto:minasarvesh@gmail.com"><i class="fas fa-envelope"></i></a>
        <a href="https://github.com/SarveshMina" target="_blank"><i class="fab fa-github"></i></a>
        <a href="https://linkedin.com/in/sarvesh-mina/" target="_blank"><i class="fab fa-linkedin"></i></a>
      </div>
      <a :href="cvUrl" target="_blank" class="cv-button-hero">View My CV</a>
    </div>
    <div class="scroll-down" v-if="showArrow" @click="scrollToSkills">
      <i class="fas fa-chevron-down"></i>
      <span>Scroll Down</span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Summary',
  data() {
    return {
      showArrow: true,
      cvUrl: '/SarveshMina.pdf',
    }
  },
  methods: {
    scrollToSkills() {
      const el = document.getElementById('skills')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    },
    handleScroll() {
      this.showArrow = window.scrollY < 80
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped>
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:6rem 2rem 2rem;text-align:center;gap:0;position:relative}
.hero-container{display:flex;align-items:center;justify-content:center;max-width:1200px;gap:3.5rem;margin-bottom:1.5rem;width:100%;padding:0 2rem}
.profile-image{
  width:240px;height:240px;object-fit:cover;border-radius:50%;
  border:4px solid var(--glass-border);box-shadow:var(--glass-shadow);
  transition:transform .3s;
}
.profile-image:hover{transform:scale(1.05)}
.hero-text{text-align:left;max-width:650px}
.hero-text h2{font-size:3rem;margin-bottom:.8rem}
.hero-text p{font-size:1.1rem;line-height:1.7;color:var(--text-dim)}

.socials-section{text-align:center;margin-top:1.5rem}
.socials-section h3{font-size:1.5rem;margin-bottom:.8rem}
.social-icons{display:flex;gap:1.5rem;justify-content:center;margin-bottom:1.2rem}
.social-icons a{color:var(--text);font-size:2rem;transition:all .3s}
.social-icons a:hover{color:var(--text-dim);transform:scale(1.2)}
.cv-button-hero{
  display:inline-block;padding:.75rem 2rem;border:1.5px solid var(--btn-border);
  border-radius:30px;color:var(--text);text-decoration:none;font-weight:700;
  transition:all .3s;background:var(--btn-bg);backdrop-filter:blur(10px);
}
.cv-button-hero:hover{background:var(--btn-hover-bg);border-color:var(--text);transform:scale(1.03)}

.scroll-down{
  position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);
  cursor:pointer;color:var(--text-dim);display:flex;flex-direction:column;align-items:center;
  animation:bounce 2s infinite;z-index:100;
  transition:opacity .4s ease,visibility .4s ease;
}
.scroll-down i{font-size:1.5rem}
.scroll-down span{font-size:.8rem;margin-top:.3rem}
@keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)}}

/* Tablet / iPad Pro (max 1194px) */
@media(max-width:1194px){
  .hero-container{gap:2.5rem;padding:0 1.5rem}
  .hero-text h2{font-size:2.5rem}
  .profile-image{width:200px;height:200px}
}

/* iPad Air / iPad (max 1024px) */
@media(max-width:1024px){
  .hero-container{gap:2rem}
  .hero-text h2{font-size:2.3rem}
  .profile-image{width:180px;height:180px}
  .hero-text p{font-size:1rem}
}

/* iPad Mini / small tablets (max 834px) */
@media(max-width:834px){
  .hero{padding:6rem 1.5rem 2rem;min-height:100vh;min-height:100dvh}
  .hero-container{flex-direction:column;text-align:center;gap:1.5rem;padding:0 1rem}
  .hero-text{text-align:center;max-width:100%}
  .hero-text h2{font-size:2rem}
  .hero-text p{font-size:.95rem}
  .profile-image{width:160px;height:160px}
}

/* Phones (max 768px) */
@media(max-width:768px){
  .hero{padding:5rem 1.2rem 2rem;min-height:100vh;min-height:100dvh}
  .hero-container{gap:1.2rem;padding:0}
  .hero-text h2{font-size:1.8rem}
  .hero-text p{font-size:.9rem;line-height:1.6}
  .profile-image{width:140px;height:140px}
  .socials-section{margin-top:1rem}
  .socials-section h3{font-size:1.1rem;margin-bottom:.5rem}
  .social-icons{gap:1.2rem;margin-bottom:.8rem}
  .social-icons a{font-size:1.5rem}
  .cv-button-hero{padding:.55rem 1.4rem;font-size:.85rem}
  /* Scroll down: absolute within hero so it sits at the bottom of the viewport */
  .scroll-down{position:absolute;bottom:1.5rem;left:50%;transform:translateX(-50%);
    animation:bounceMobile 2s infinite}
}
@keyframes bounceMobile{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)}}

/* Small phones (max 480px) */
@media(max-width:480px){
  .hero{padding:4.5rem 1rem 1.5rem;min-height:100vh;min-height:100dvh}
  .hero-text h2{font-size:1.6rem}
  .hero-text p{font-size:.85rem}
  .profile-image{width:120px;height:120px;border-width:3px}
  .socials-section h3{font-size:1rem}
  .social-icons a{font-size:1.3rem}
  .social-icons{gap:1rem}
  .cv-button-hero{padding:.5rem 1.2rem;font-size:.8rem}
}

/* Very small phones (max 360px) */
@media(max-width:360px){
  .hero{padding:4rem .8rem 1.5rem;min-height:100vh;min-height:100dvh}
  .hero-text h2{font-size:1.4rem}
  .hero-text p{font-size:.82rem}
  .profile-image{width:100px;height:100px}
}
</style>
