<template>
  <section id="education-experience">
    <h2>Education & Experience</h2>
    <h3 class="section-title"><i class="fas fa-graduation-cap"></i> Education</h3>
    <div class="edu-exp-container">
      <div class="glass edu-card" v-for="edu in educationList" :key="edu.degree">
        <div class="card-header">
          <h3>{{ edu.degree }}</h3>
          <span class="date">{{ edu.duration }}</span>
        </div>
        <p class="institution">{{ edu.institution }}</p>
        <div class="card-details">
          <p v-if="edu.grade"><strong>Expected Grade:</strong> {{ edu.grade }}</p>
          <p v-if="edu.modules"><strong>Modules:</strong> {{ edu.modules }}</p>
          <p v-if="edu.grades"><strong>Grades:</strong> {{ edu.grades }}</p>
        </div>
      </div>
    </div>
    <h3 class="section-title" style="margin-top:3rem"><i class="fas fa-briefcase"></i> Experience</h3>
    <div class="edu-exp-container">
      <div class="glass exp-card" v-for="exp in experienceList" :key="exp.title">
        <div class="card-header">
          <h3>{{ exp.title }}</h3>
          <span class="date">{{ exp.duration }}</span>
        </div>
        <p class="company"><strong>{{ exp.company }}</strong> | {{ exp.location }}</p>
        <div class="card-details">
          <p v-for="(point, i) in exp.points" :key="i">{{ point }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getEducation, getExperience } from '../composables/usePortfolioData'

export default {
  name: 'EducationExperience',
  data() {
    return {
      educationList: getEducation(),
      experienceList: getExperience(),
    }
  },
}
</script>

<style scoped>
.edu-exp-container{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:1.5rem;max-width:1100px;margin:0 auto}
.edu-card,.exp-card{padding:2rem}
.card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem;flex-wrap:wrap;gap:.5rem}
.card-header h3{font-size:1.3rem}
.date{font-size:.85rem;color:var(--text-dim)}
.institution,.company{font-size:1rem;font-weight:600;margin-bottom:.4rem}
.card-details p{margin:.4rem 0;font-size:.9rem;color:var(--text-dim);line-height:1.6}

/* iPad Air / iPad (max 1024px) */
@media(max-width:1024px){
  .edu-exp-container{grid-template-columns:repeat(2,1fr);gap:1.2rem}
}

/* iPad Mini (max 834px) */
@media(max-width:834px){
  .edu-exp-container{grid-template-columns:1fr}
}

/* Phones (max 768px) */
@media(max-width:768px){
  .edu-card,.exp-card{padding:1.3rem}
  .card-header{flex-direction:column;align-items:flex-start;gap:.2rem}
  .card-header h3{font-size:1.05rem}
  .date{font-size:.8rem}
  .institution,.company{font-size:.88rem}
  .card-details p{font-size:.85rem}
}

/* Small phones (max 480px) */
@media(max-width:480px){
  .edu-card,.exp-card{padding:1rem;border-radius:14px}
  .card-header h3{font-size:1rem}
  .institution,.company{font-size:.85rem}
}
</style>
