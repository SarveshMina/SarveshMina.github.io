<template>
  <section id="projects">
    <h2>Projects</h2>
    <div class="projects-container" :class="{'has-expanded': expandedIndex !== null}" ref="projectsGrid">
      <div
        class="project-card glass"
        v-for="(project, index) in projectsList"
        :key="project.slug"
        :class="{expanded: expandedIndex === index}"
      >
        <button class="expand-close" @click="collapseCard">&times;</button>
        <div class="card-header">
          <h3>{{ project.title }}</h3>
          <span class="date">{{ project.duration }}</span>
        </div>
        <p class="project-description">{{ project.description }}</p>
        <div class="project-links" v-if="expandedIndex !== index">
          <a
            v-if="project.liveDemo"
            :href="project.liveDemo"
            target="_blank"
            class="project-btn"
            rel="noopener noreferrer"
            @click="trackAction(project.slug, 'demo')"
          >{{ project.buttonText || 'Live Demo' }}</a>
          <a
            v-if="project.repo"
            :href="project.repo"
            target="_blank"
            class="project-btn"
            rel="noopener noreferrer"
            @click="trackAction(project.slug, 'source')"
          >Source Code</a>
          <button
            class="project-btn"
            @click="expandCard(index)"
          >View Details</button>
        </div>
        <div class="project-expand">
          <div>
            <p class="expand-details">{{ project.details }}</p>
            <video
              v-if="project.video"
              class="expand-video"
              :src="project.video"
              controls
              muted
              loop
              :ref="'video-' + index"
              @play="trackAction(project.slug, 'video')"
            ></video>
            <p class="expand-skills-label">Skills Used:</p>
            <div class="expand-skills" :ref="'skills-' + index">
              <span
                class="expand-skill-chip"
                v-for="skill in project.skills"
                :key="skill"
              ><i :class="getSkillIcon(skill)"></i>{{ skill }}</span>
            </div>
            <div class="expand-links">
              <a
                v-if="project.liveDemo"
                :href="project.liveDemo"
                target="_blank"
                class="project-btn"
                rel="noopener noreferrer"
                @click="trackAction(project.slug, 'demo')"
              >{{ project.buttonText || 'Live Demo' }}</a>
              <a
                v-if="project.repoFrontend"
                :href="project.repoFrontend"
                target="_blank"
                class="project-btn"
                rel="noopener noreferrer"
              >Frontend Source</a>
              <a
                v-if="project.repoBackend"
                :href="project.repoBackend"
                target="_blank"
                class="project-btn"
                rel="noopener noreferrer"
              >Backend Source</a>
              <a
                v-else-if="project.repo"
                :href="project.repo"
                target="_blank"
                class="project-btn"
                rel="noopener noreferrer"
                @click="trackAction(project.slug, 'source')"
              >Source Code</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getProjects } from '../composables/usePortfolioData'
import { trackProjectAction } from '../composables/useAnalytics'

export default {
  name: 'Projects',
  data() {
    return {
      projectsList: getProjects(),
      expandedIndex: null,
    }
  },
  methods: {
    trackAction(slug, action) {
      trackProjectAction(slug, action)
    },
    expandCard(index) {
      this.expandedIndex = index
      trackProjectAction(this.projectsList[index].slug, 'view')

      this.$nextTick(() => {
        // Stagger skill chips popping in
        const skillsRef = this.$refs['skills-' + index]
        const skillsEl = Array.isArray(skillsRef) ? skillsRef[0] : skillsRef
        if (skillsEl) {
          const chips = skillsEl.querySelectorAll('.expand-skill-chip')
          chips.forEach((chip, i) => {
            chip.style.opacity = '0'
            chip.style.transform = 'translateY(10px) scale(.8)'
            setTimeout(() => {
              chip.style.transition = 'opacity .3s ease,transform .3s ease'
              chip.style.opacity = '1'
              chip.style.transform = 'translateY(0) scale(1)'
            }, 350 + (i * 60))
          })
        }

        // Auto-play video
        const videoRef = this.$refs['video-' + index]
        const videoEl = Array.isArray(videoRef) ? videoRef[0] : videoRef
        if (videoEl) {
          setTimeout(() => videoEl.play().catch(() => {}), 200)
        }

        // Smooth scroll into view
        const cards = this.$refs.projectsGrid.querySelectorAll('.project-card')
        if (cards[index]) {
          setTimeout(() => cards[index].scrollIntoView({ behavior: 'smooth', block: 'center' }), 150)
        }
      })
    },
    collapseCard() {
      if (this.expandedIndex === null) return
      const index = this.expandedIndex

      // Pause video
      const videoRef = this.$refs['video-' + index]
      const videoEl = Array.isArray(videoRef) ? videoRef[0] : videoRef
      if (videoEl) {
        videoEl.pause()
        videoEl.currentTime = 0
      }

      // Reset chip styles
      const skillsRef = this.$refs['skills-' + index]
      const skillsEl = Array.isArray(skillsRef) ? skillsRef[0] : skillsRef
      if (skillsEl) {
        skillsEl.querySelectorAll('.expand-skill-chip').forEach(chip => {
          chip.style.opacity = ''
          chip.style.transform = ''
          chip.style.transition = ''
        })
      }

      this.expandedIndex = null
    },
    handleKeyDown(e) {
      if (e.key === 'Escape' && this.expandedIndex !== null) {
        this.collapseCard()
      }
    },
    getSkillIcon(skill) {
      const map = {
        'Vue.js': 'fab fa-vuejs',
        Azure: 'fab fa-microsoft',
        JavaScript: 'fab fa-js-square',
        CSS: 'fab fa-css3-alt',
        HTML: 'fab fa-html5',
        Authentication: 'fas fa-user-shield',
        'Real-time Notifications': 'fas fa-bell',
        Unity: 'fab fa-unity',
        'C#': 'fas fa-code',
        'Procedural Generation': 'fas fa-cogs',
        AI: 'fas fa-robot',
        'Game Optimization': 'fas fa-tachometer-alt',
        Java: 'fab fa-java',
        'Mathematical Modeling': 'fas fa-calculator',
        'UI/UX Design': 'fas fa-paint-brush',
        'Safety Protocols': 'fas fa-shield-alt',
        'Game Development': 'fas fa-gamepad',
        'Multiplayer Integration': 'fas fa-users',
        JavaFX: 'fas fa-laptop-code',
      }
      return map[skill] || 'fas fa-star'
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown)

    // Check URL hash for ?project=someSlug (auto-open)
    const hash = window.location.hash
    if (hash.includes('?')) {
      const queryString = hash.split('?')[1]
      const params = new URLSearchParams(queryString)
      const projectSlug = params.get('project')
      if (projectSlug) {
        const idx = this.projectsList.findIndex(
          p => p.slug.toLowerCase() === projectSlug.toLowerCase()
        )
        if (idx !== -1) {
          this.expandCard(idx)
        }
      }
    }
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  },
}
</script>

<style scoped>
/* Projects container */
.projects-container{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:1.5rem;
  max-width:1000px;margin:0 auto;position:relative;
}
.projects-container.has-expanded{grid-template-columns:1fr}

.project-card{padding:1.5rem;display:flex;flex-direction:column;cursor:default}
.project-card h3{font-size:1.3rem;margin-bottom:.3rem}
.project-card .date{display:block;margin-bottom:.8rem}
.project-description{font-size:.9rem;line-height:1.6;color:var(--text-dim);margin-bottom:1rem;flex:1}
.project-links{display:flex;gap:.6rem;flex-wrap:wrap}
.project-btn{
  padding:.5rem 1.2rem;border-radius:25px;font-family:'DM Sans',sans-serif;
  font-size:.85rem;font-weight:600;cursor:pointer;text-decoration:none;transition:all .3s;
  border:1.5px solid var(--btn-border);background:var(--btn-bg);color:var(--text);
}
.project-btn:hover{background:var(--btn-hover-bg);border-color:var(--text);transform:scale(1.03)}

/* Hidden details inside each card */
.project-expand{
  display:grid;grid-template-rows:0fr;
  opacity:0;margin-top:0;
  transition:grid-template-rows .6s cubic-bezier(.4,0,.2,1),opacity .4s ease,margin .4s ease;
}
.project-expand>div{overflow:hidden}
.project-card.expanded .project-expand{
  grid-template-rows:1fr;opacity:1;margin-top:1.5rem;
}

/* Staggered reveal of inner content */
.expand-details,.expand-video,.expand-skills-label,.expand-skills,.expand-links{
  opacity:0;transform:translateY(20px);
  transition:opacity .4s ease,transform .4s ease;
}
.project-card.expanded .expand-details{opacity:1;transform:translateY(0);transition-delay:.15s}
.project-card.expanded .expand-video{opacity:1;transform:translateY(0);transition-delay:.25s}
.project-card.expanded .expand-skills-label{opacity:1;transform:translateY(0);transition-delay:.3s}
.project-card.expanded .expand-skills{opacity:1;transform:translateY(0);transition-delay:.35s}
.project-card.expanded .expand-links{opacity:1;transform:translateY(0);transition-delay:.45s}

.expand-video{width:100%;border-radius:14px;margin-bottom:1rem}
.expand-details{font-size:.9rem;line-height:1.7;color:var(--text-dim);margin-bottom:1rem}
.expand-skills-label{font-size:.85rem;font-weight:700;margin-bottom:.5rem}
.expand-skills{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1.2rem}
.expand-skill-chip{
  display:inline-flex;align-items:center;gap:.4rem;padding:.35rem .9rem;border-radius:50px;
  font-size:.8rem;font-weight:500;color:var(--text);
  background:var(--glass-bg);border:1px solid var(--glass-border);
  transition:all .3s;
}
.expand-skill-chip i{font-size:.85rem;opacity:.6}
.expand-skill-chip:hover{background:var(--btn-hover-bg);border-color:var(--text);transform:translateY(-3px) scale(1.05)}
.expand-links{display:flex;flex-wrap:wrap;gap:.6rem}

/* Close button inside expanded card */
.expand-close{
  display:none;position:absolute;top:1rem;right:1.2rem;
  background:var(--btn-bg);border:1.5px solid var(--btn-border);
  width:36px;height:36px;border-radius:50%;cursor:pointer;
  font-size:1.3rem;color:var(--text);font-family:inherit;
  align-items:center;justify-content:center;z-index:5;
  opacity:0;transform:scale(.5) rotate(-90deg);
  transition:opacity .3s ease,transform .3s ease,background .3s,border-color .3s;
}
.expand-close:hover{background:var(--btn-hover-bg);border-color:var(--text);transform:scale(1.1) rotate(0deg)}
.project-card.expanded .expand-close{display:flex;animation:closeIn .4s .2s ease forwards}
@keyframes closeIn{to{opacity:1;transform:scale(1) rotate(0deg)}}

/* Expanded card grows */
.project-card.expanded{
  grid-column:1/-1;
  transform:none !important;opacity:1 !important;filter:none !important;
  box-shadow:var(--glow-shadow);border-color:var(--glow-border);
  animation:cardPop .5s cubic-bezier(.4,0,.2,1) forwards;
}
@keyframes cardPop{
  0%{box-shadow:var(--glass-shadow)}
  50%{transform:scale(1.01) !important}
  100%{transform:scale(1) !important;box-shadow:var(--glow-shadow)}
}

/* Siblings shrink when one is expanded */
.projects-container.has-expanded .project-card:not(.expanded){
  opacity:.2;transform:scale(.88);pointer-events:none;
  transition:all .5s cubic-bezier(.4,0,.2,1);
}

/* iPad Air / iPad (max 1024px) */
@media(max-width:1024px){
  .projects-container{grid-template-columns:repeat(2,1fr);gap:1.2rem}
  /* Don't fade siblings on tablets/mobile */
  .projects-container.has-expanded .project-card:not(.expanded){
    opacity:1;transform:none;pointer-events:auto;
  }
}

/* iPad Mini (max 834px) */
@media(max-width:834px){
  .projects-container{grid-template-columns:1fr}
}

/* Phones (max 768px) */
@media(max-width:768px){
  .project-card{padding:1.2rem}
  .project-card h3{font-size:1.05rem}
  .project-description{font-size:.85rem}
  .project-links{gap:.4rem}
  .project-btn{padding:.4rem .9rem;font-size:.8rem}
  .expand-close{width:32px;height:32px;font-size:1.1rem;top:.8rem;right:.8rem}
}

/* Small phones (max 480px) */
@media(max-width:480px){
  .project-card{padding:1rem;border-radius:14px}
  .project-card h3{font-size:1rem}
  .project-description{font-size:.82rem}
  .project-btn{padding:.35rem .8rem;font-size:.78rem}
}
</style>
