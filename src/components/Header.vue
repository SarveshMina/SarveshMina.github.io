<template>
  <header :class="{'menu-open': mobileMenuOpen}">
    <div class="navbar">
      <div class="logo"><h1><a href="#">Sarvesh Mina</a></h1></div>
      <nav>
        <ul>
          <li><a href="#summary" @click.prevent="smoothScroll('summary')" :class="{active:activeSection==='summary'}">Summary</a></li>
          <li><a href="#skills" @click.prevent="smoothScroll('skills')" :class="{active:activeSection==='skills'}">Skills</a></li>
          <li><a href="#education-experience" @click.prevent="smoothScroll('education-experience')" :class="{active:activeSection==='education-experience'}">Education & Experience</a></li>
          <li><a href="#projects" @click.prevent="smoothScroll('projects')" :class="{active:activeSection==='projects'}">Projects</a></li>
          <li><a href="#contact" @click.prevent="smoothScroll('contact')" :class="{active:activeSection==='contact'}">Contact</a></li>
          <li>
            <button class="dark-toggle" @click="toggleDarkMode" aria-label="Toggle Dark Mode">
              <i class="fas fa-adjust"></i>
            </button>
          </li>
          <li><a :href="cvUrl" target="_blank" class="cv-btn">View My CV</a></li>
        </ul>
      </nav>
      <div class="mobile-header-actions">
        <button class="dark-toggle" @click="toggleDarkMode" aria-label="Toggle Dark Mode">
          <i class="fas fa-adjust"></i>
        </button>
        <button class="burger" :class="{open: mobileMenuOpen}" @click="toggleMobileMenu" aria-label="Menu">
          <i :class="mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Menu Overlay -->
  <div class="mobile-menu" :class="{open: mobileMenuOpen}" @click.self="closeMobileMenu">
    <ul>
      <li><a href="#summary" @click.prevent="mobileNav('summary')">Summary</a></li>
      <li><a href="#skills" @click.prevent="mobileNav('skills')">Skills</a></li>
      <li><a href="#education-experience" @click.prevent="mobileNav('education-experience')">Education & Experience</a></li>
      <li><a href="#projects" @click.prevent="mobileNav('projects')">Projects</a></li>
      <li><a href="#contact" @click.prevent="mobileNav('contact')">Contact</a></li>
    </ul>
    <a :href="cvUrl" target="_blank" class="cv-btn">View My CV</a>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      activeSection: '',
      isDarkMode: false,
      mobileMenuOpen: false,
      cvUrl: '/SarveshMina.pdf',
    }
  },
  methods: {
    smoothScroll(sectionId) {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      document.body.classList.toggle('dark-mode', this.isDarkMode)
      localStorage.setItem('darkMode', this.isDarkMode ? 'true' : 'false')
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
      document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : ''
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
      document.body.style.overflow = ''
    },
    mobileNav(sectionId) {
      this.closeMobileMenu()
      this.smoothScroll(sectionId)
    },
    handleScroll() {
      const sections = document.querySelectorAll('section')
      const scrollPos = window.scrollY + 120
      sections.forEach(section => {
        if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
          this.activeSection = section.getAttribute('id')
        }
      })
    },
    handleKeyDown(e) {
      if (e.key === 'Escape' && this.mobileMenuOpen) {
        this.closeMobileMenu()
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('keydown', this.handleKeyDown)
    if (localStorage.getItem('darkMode') === 'true') {
      this.isDarkMode = true
      document.body.classList.add('dark-mode')
    }
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('keydown', this.handleKeyDown)
  },
}
</script>

<style scoped>
header{
  position:fixed;top:0;width:100%;z-index:1000;padding:1rem 2rem;
  background:var(--header-bg);backdrop-filter:blur(30px) saturate(180%);
  -webkit-backdrop-filter:blur(30px) saturate(180%);
  border-bottom:1px solid var(--header-border);transition:all .5s;
  border-color:var(--header-border);
}
header.menu-open{border-color:transparent}
.navbar{display:flex;justify-content:space-between;align-items:center;max-width:1200px;margin:0 auto}
.logo h1{font-size:1.8rem;font-weight:700}
.logo a{text-decoration:none;color:var(--text);transition:color .5s}
nav ul{list-style:none;display:flex;gap:1.5rem;align-items:center}
nav ul li a{
  color:var(--text-dim);text-decoration:none;font-weight:500;font-size:.9rem;
  padding:.4rem .8rem;border-radius:20px;transition:all .3s;
}
nav ul li a:hover,nav ul li a.active{color:var(--text);background:var(--glass-bg)}

.dark-toggle{
  background:var(--btn-bg);border:1.5px solid var(--btn-border);border-radius:50%;
  width:38px;height:38px;display:flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:1rem;color:var(--text);transition:all .3s;
  backdrop-filter:blur(10px);font-family:inherit;
}
.dark-toggle:hover{background:var(--btn-hover-bg);transform:rotate(180deg)}

.cv-btn{
  padding:.5rem 1.2rem;border:1.5px solid var(--btn-border);border-radius:25px;
  color:var(--text);text-decoration:none;font-weight:600;font-size:.85rem;
  transition:all .3s;background:var(--btn-bg);backdrop-filter:blur(10px);
}
.cv-btn:hover{background:var(--btn-hover-bg);border-color:var(--text)}

/* Mobile header actions */
.mobile-header-actions{display:none;align-items:center;gap:.6rem}
.burger{
  background:var(--btn-bg);border:1.5px solid var(--btn-border);border-radius:12px;
  width:42px;height:42px;cursor:pointer;color:var(--text);font-size:1.2rem;
  display:flex;align-items:center;justify-content:center;transition:all .3s;
  backdrop-filter:blur(10px);font-family:inherit;
}
.burger:hover{background:var(--btn-hover-bg)}
.burger i{transition:transform .3s ease}
.burger.open i{transform:rotate(90deg)}

/* Mobile menu overlay */
.mobile-menu{
  position:fixed;top:0;left:0;width:100%;height:100%;z-index:999;
  background:rgba(245,245,245,.3);backdrop-filter:blur(20px) saturate(180%);
  -webkit-backdrop-filter:blur(20px) saturate(180%);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;
  opacity:0;visibility:hidden;pointer-events:none;
  transition:opacity .35s ease,visibility .35s ease;
}
.mobile-menu.open{opacity:1;visibility:visible;pointer-events:auto}
.mobile-menu ul{list-style:none;display:flex;flex-direction:column;align-items:center;gap:.8rem;padding:0;margin:0}
.mobile-menu ul li a{
  color:var(--text);text-decoration:none;font-size:1.3rem;font-weight:600;
  padding:.8rem 2.5rem;border-radius:16px;display:block;transition:all .3s;
}
.mobile-menu ul li a:hover{background:var(--glass-bg);transform:scale(1.05)}
.mobile-menu .cv-btn{margin-top:2rem}

/* Tablet+ (max 1024px): show burger, hide desktop nav */
@media(max-width:1024px){
  nav ul{display:none}
  .mobile-header-actions{display:flex}
}

/* iPad Mini (max 834px) */
@media(max-width:834px){
  header{padding:.8rem 1.5rem}
  .logo h1{font-size:1.5rem}
}

/* Phones (max 768px) */
@media(max-width:768px){
  header{padding:.8rem 1.2rem}
  .logo h1{font-size:1.4rem}
}

/* Small phones (max 480px) */
@media(max-width:480px){
  header{padding:.7rem 1rem}
  .logo h1{font-size:1.25rem}
}

/* Very small phones (max 360px) */
@media(max-width:360px){
  .mobile-menu ul li a{font-size:1.1rem;padding:.7rem 2rem}
}
</style>
