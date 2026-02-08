<template>
  <div>
    <Header />
    <main>
      <Summary />
      <Skills />
      <EducationExperience />
      <Projects />
      <Contact />
    </main>
    <Footer />
    <BackToTop />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Summary from '../components/Summary.vue'
import Skills from '../components/Skills.vue'
import EducationExperience from '../components/EducationExperience.vue'
import Projects from '../components/Projects.vue'
import Contact from '../components/Contact.vue'
import BackToTop from '../components/BackToTop.vue'
import { trackPageView, createSectionObserver } from '../composables/useAnalytics'

export default {
  name: 'PortfolioView',
  components: {
    Header,
    Footer,
    Summary,
    Skills,
    EducationExperience,
    Projects,
    Contact,
    BackToTop,
  },
  data() {
    return {
      sectionObserver: null,
    }
  },
  mounted() {
    trackPageView()

    this.sectionObserver = createSectionObserver()
    if (this.sectionObserver) {
      const sections = document.querySelectorAll('#summary, #skills, #education-experience, #projects, #contact')
      sections.forEach(el => this.sectionObserver.observe(el))
    }
  },
  beforeUnmount() {
    if (this.sectionObserver) {
      this.sectionObserver.disconnect()
    }
  },
}
</script>
