<!-- src/App.vue -->
<template>
  <div id="app">
    <Header />
    <main>
      <Summary />
      <EducationExperience />
      <Skills />
      <Projects />
      <Contact />
    </main>
    <Footer />
    <BackToTop />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Summary from './components/Summary.vue'
import EducationExperience from './components/EducationExperience.vue'
import Skills from './components/Skills.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import BackToTop from './components/BackToTop.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Summary,
    EducationExperience,
    Skills,
    Projects,
    Contact,
    BackToTop
  }
}
</script>

<style>
/* Global styles can remain here */
</style>
