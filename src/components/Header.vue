<template>
  <header>
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
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      activeSection: '',
      isDarkMode: false,
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
    handleScroll() {
      const sections = document.querySelectorAll('section')
      const scrollPos = window.scrollY + 120
      sections.forEach(section => {
        if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
          this.activeSection = section.getAttribute('id')
        }
      })
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    if (localStorage.getItem('darkMode') === 'true') {
      this.isDarkMode = true
      document.body.classList.add('dark-mode')
    }
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped>
header{
  position:fixed;top:0;width:100%;z-index:1000;padding:1rem 2rem;
  background:var(--header-bg);backdrop-filter:blur(30px) saturate(180%);
  -webkit-backdrop-filter:blur(30px) saturate(180%);
  border-bottom:1px solid var(--header-border);transition:all .5s;
}
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

@media(max-width:768px){
  nav ul{display:none}
}
</style>
