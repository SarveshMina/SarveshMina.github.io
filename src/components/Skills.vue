<template>
  <section id="skills">
    <h2>Skills</h2>
    <div class="skills-tiles">
      <div
        class="skill-tile"
        v-for="skill in allSkills"
        :key="skill.name"
      >
        <i :class="skill.iconClass"></i>
        <span>{{ skill.name }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import { getSkills } from '../composables/usePortfolioData'

export default {
  name: 'Skills',
  computed: {
    allSkills() {
      const categories = getSkills()
      const flat = []
      categories.forEach(cat => {
        cat.skills.forEach(skill => {
          flat.push({
            name: skill.name,
            iconClass: skill.icon[0] + ' fa-' + skill.icon[1],
            url: skill.url,
          })
        })
      })
      return flat
    },
  },
}
</script>

<style scoped>
.skills-tiles{display:flex;flex-wrap:wrap;gap:.7rem;justify-content:center;max-width:1000px;margin:0 auto}
.skill-tile{
  display:flex;align-items:center;gap:.6rem;padding:.7rem 1.2rem;border-radius:16px;
  background:var(--glass-bg);
  border:1px solid var(--glass-border);box-shadow:var(--glass-shadow);
  transition:all .4s cubic-bezier(.25,.8,.25,1);cursor:default;position:relative;overflow:hidden;
}
.skill-tile:hover{
  background:var(--glass-hover-bg);
  border-color:var(--glow-border);
  box-shadow:var(--glow-shadow);
  transform:translateY(-5px) scale(1.12);
}
.skill-tile i{font-size:1.4rem;opacity:.7;transition:opacity .3s}
.skill-tile:hover i{opacity:1}
.skill-tile span{font-size:.85rem;font-weight:500}
/* Reactive: siblings dim only when a tile is hovered */
.skills-tiles:has(.skill-tile:hover) .skill-tile:not(:hover){
  opacity:.45;transform:scale(.95);
}
.skills-tiles:has(.skill-tile:hover) .skill-tile:hover{
  opacity:1;transform:translateY(-5px) scale(1.12);
}

/* Phones (max 768px) */
@media(max-width:768px){
  .skills-tiles{gap:.5rem;padding:0 .5rem}
  .skill-tile{padding:.5rem .9rem;border-radius:12px}
  .skill-tile i{font-size:1.1rem}
  .skill-tile span{font-size:.8rem}
}

/* Small phones (max 480px) */
@media(max-width:480px){
  .skills-tiles{gap:.4rem}
  .skill-tile{padding:.45rem .7rem;border-radius:10px}
  .skill-tile i{font-size:1rem}
  .skill-tile span{font-size:.72rem}
}

/* Very small phones (max 360px) */
@media(max-width:360px){
  .skill-tile{padding:.4rem .6rem}
  .skill-tile span{font-size:.7rem}
}
</style>
