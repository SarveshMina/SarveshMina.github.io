<!-- src/components/EducationExperience.vue -->
<template>
  <section id="education-experience" class="edu-exp-section">
    <h2 class="section-heading">Education & Experience</h2>

    <!-- Education Section -->
    <div class="edu-container">
      <h3 class="section-title">
        <font-awesome-icon icon="graduation-cap" class="section-icon" />
        Education
      </h3>
      <div class="edu-exp-container">
        <div
            class="education-card"
            v-for="edu in educationList"
            :key="edu.degree"
        >
          <div class="edu-header">
            <h3>{{ edu.degree }}</h3>
            <span class="date">{{ edu.duration }}</span>
          </div>
          <p class="institution">{{ edu.institution }}</p>
          <p v-if="edu.grade"><strong>Expected Grade:</strong> {{ edu.grade }}</p>
          <p v-if="edu.modules"><strong>Current Modules:</strong> {{ edu.modules }}</p>
          <p v-if="edu.grades"><strong>Grades:</strong> {{ edu.grades }}</p>
        </div>
      </div>
    </div>

    <!-- Experience Section -->
    <div class="exp-container">
      <h3 class="section-title">
        <font-awesome-icon icon="briefcase" class="section-icon" />
        Experience
      </h3>
      <div class="edu-exp-container">
        <div
            class="experience-card"
            v-for="exp in experienceList"
            :key="exp.title"
        >
          <div class="card-header">
            <h3>{{ exp.title }}</h3>
            <span class="date">{{ exp.duration }}</span>
          </div>
          <p class="company"><strong>{{ exp.company }}</strong> | {{ exp.location }}</p>
          <div class="experience-details">
            <p v-for="(point, index) in exp.points" :key="index">
              {{ point }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "EducationExperience",
  data() {
    return {
      educationList: [
        {
          degree: "MEng Computer Science with Year in Industry",
          institution: "University of Southampton",
          duration: "September 2022 – June 2027",
          grade: "Expected 1:1",
          modules:
              "Machine Learning Technologies, Cloud Application Development, Research Project, Engineering Management, Computational Biology and Security of Cyber Physical Systems.",
        },
        {
          degree: "A-Levels",
          institution: "Podar International School, Aurangabad, India",
          duration: "2019 – 2020",
          grades: "Mathematics (A), Computer Science (A), Physics (A)",
        },
      ],
      experienceList: [
        {
          title: "Tech Manager",
          company: "Google Developer Group Southampton",
          location: "Southampton, UK",
          duration: "October 2024 – Present",
          points: [
            "Organized workshops on Google technologies.",
            "Hosted talks and panels with industry experts.",
            "Led a team to run technical operations smoothly.",
            "Maintained the society's digital infrastructure.",
          ],
        },
        {
          title: "Head of Education",
          company: "Artificial Intelligence Society Southampton",
          location: "Southampton, UK",
          duration: "July 2023 – September 2024",
          points: [
            "Led AI and coding workshops for students.",
            "Coached hackathon teams, boosting their confidence.",
            "Expanded educational offerings, increasing attendance.",
            "Delivered presentations on AI and programming.",
            "Engaged with industry professionals for mentorship.",
          ],
        },
        {
          title: "Head of Technology",
          company: "Fish on Toast",
          location: "Southampton, UK",
          duration: "September 2024 – Present",
          points: [
            "Managed website operations and provided technical support.",
            "Collaborated with teams to enhance user experience.",
          ],
        },
        {
          title: "Virtual Support Ambassador",
          company: "University of Southampton",
          location: "Southampton, UK",
          duration: "September 2024 – Present",
          points: [
            "Managed CRM communications and Gecko system integrations.",
            "Provided troubleshooting support and coordinated with admissions teams.",
          ],
        },
      ],
    };
  },
  mounted() {
    // Animate education cards on scroll
    gsap.from(".education-card", {
      scrollTrigger: {
        trigger: ".edu-container",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
    });

    // Animate experience cards on scroll
    gsap.from(".experience-card", {
      scrollTrigger: {
        trigger: ".exp-container",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
    });
  },
};
</script>

<style scoped>
/* Base Section Styles */
.edu-exp-section {
  padding: 4rem 2rem;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.5s ease, color 0.5s ease;
}

/* Section Headings */
.section-heading {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-family: "Source Code Pro", monospace;
  font-weight: 700;
}

/* Section Titles */
.edu-container,
.exp-container {
  margin-bottom: 2rem;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 600;
  justify-content: center;
}

.section-icon {
  font-size: 1.8rem;
  color: var(--primary-color);
}

/* Grid Layout for Cards */
.edu-exp-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 1rem;
  justify-items: center;
  max-width: 1100px;
  margin: 0 auto;
}

/* Card Base Styles */
.education-card,
.experience-card {
  position: relative;
  overflow: hidden;
  background: var(--card-bg-color);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: left;
  width: 100%;
  max-width: 500px;
  z-index: 1;
}

/* Pseudo-element for fill animation (glow effect) */
.education-card::after,
.experience-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: var(--primary-color);
  opacity: 0;
  transform: skewX(-20deg);
  transition: left 0.5s ease, opacity 0.5s ease;
  z-index: -1;
}

/* On hover, slide in the fill and add glow */
.education-card:hover::after,
.experience-card:hover::after {
  left: 0;
  opacity: 0.15;
}

.education-card:hover,
.experience-card:hover {
  transform: translateY(-5px);
  /* Rainbow pulsating glow effect */
  animation: rainbowGlow 3s infinite;
}

/* Rainbow Glow Keyframes */
@keyframes rainbowGlow {
  0% {
    box-shadow: 0 0 10px red;
  }
  14% {
    box-shadow: 0 0 12px orange;
  }
  28% {
    box-shadow: 0 0 14px yellow;
  }
  42% {
    box-shadow: 0 0 16px green;
  }
  56% {
    box-shadow: 0 0 18px blue;
  }
  70% {
    box-shadow: 0 0 16px indigo;
  }
  84% {
    box-shadow: 0 0 14px violet;
  }
  100% {
    box-shadow: 0 0 12px red;
  }
}

/* Rainbow Text Glow on Hover for Cards */
.education-card:hover h3,
.education-card:hover p,
.education-card:hover span,
.experience-card:hover h3,
.experience-card:hover p,
.experience-card:hover span {
  /* Animate text shadow with a rainbow effect */
  animation: rainbowTextGlow 3s infinite;
}

@keyframes rainbowTextGlow {
  0% {
    text-shadow: 0 0 8px red;
  }
  14% {
    text-shadow: 0 0 8px orange;
  }
  28% {
    text-shadow: 0 0 8px yellow;
  }
  42% {
    text-shadow: 0 0 8px green;
  }
  56% {
    text-shadow: 0 0 8px blue;
  }
  70% {
    text-shadow: 0 0 8px indigo;
  }
  84% {
    text-shadow: 0 0 8px violet;
  }
  100% {
    text-shadow: 0 0 8px red;
  }
}

/* Card Header Styles */
.edu-header,
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.edu-header h3,
.card-header h3 {
  font-size: 1.6rem;
  margin-bottom: 0.3rem;
}

.date {
  font-size: 0.9rem;
  color: var(--accent-color);
}

/* Institution & Company Styling */
.institution {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.company {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-top: 0.2rem;
}

.card-header h5 {
  font-size: 1.1rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

/* Experience Details */
.experience-details p {
  margin: 0.5rem 0;
  font-size: 1rem;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .edu-exp-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .edu-exp-container {
    grid-template-columns: 1fr;
  }
  .education-card,
  .experience-card {
    padding: 1.8rem;
    max-width: 100%;
  }
  .section-title {
    font-size: 1.8rem;
  }
  .card-header h3 {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  .edu-exp-container {
    grid-template-columns: 1fr;
  }
  .education-card,
  .experience-card {
    padding: 1.5rem;
  }
}

/* Dark Mode Adjustments */
body.dark-mode .edu-exp-section {
  background-color: var(--background-color);
  color: var(--text-color);
}
</style>
