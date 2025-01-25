<template>
  <section id="education-experience" class="edu-exp-section" data-aos="fade-up">
    <h2 class="section-heading">Education & Experience</h2>

    <div class="edu-exp-container">
      <!-- Education Section -->
      <div class="education-section">
        <h3 class="section-title">
          <font-awesome-icon icon="graduation-cap" class="section-icon" />
          Education
        </h3>
        <div class="education-card" v-for="edu in educationList" :key="edu.degree" data-aos="fade-in">
          <div class="edu-header">
            <h4>{{ edu.degree }}</h4>
            <span class="date">{{ edu.duration }}</span>
          </div>
          <p class="institution">{{ edu.institution }}</p>
          <p v-if="edu.grade"><strong>Expected Grade:</strong> {{ edu.grade }}</p>
          <p v-if="edu.modules"><strong>Current Modules:</strong> {{ edu.modules }}</p>
          <p v-if="edu.grades"><strong>Grades:</strong> {{ edu.grades }}</p>
        </div>
      </div>

      <!-- Experience Section -->
      <div class="experience-section">
        <h3 class="section-title">
          <font-awesome-icon icon="briefcase" class="section-icon" />
          Experience
        </h3>
        <div class="experience-container">
          <div class="experience-card" v-for="exp in experienceList" :key="exp.title" data-aos="fade-up">
            <div class="card-header">
              <h4>{{ exp.title }}</h4>
              <h5>{{ exp.company }} | {{ exp.location }}</h5>
              <span class="date">{{ exp.duration }}</span>
            </div>
            <div class="experience-details">
              <p v-for="(point, index) in exp.points" :key="index">{{ point }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "EducationExperience",
  data() {
    return {
      educationList: [
        {
          degree: "MEng Computer Science with Year in Industry",
          institution: "University of Southampton",
          duration: "August 2022 – June 2027",
          grade: "Expected 1:1",
          modules: "Machine Learning Technologies, Cloud Application Development, Research Project, Engineering Management",
        },
        {
          degree: "A-Levels",
          institution: "Podar International School, Aurangabad, India",
          duration: "2019 – 2020",
          grades: "Mathematics (A), Computer Science (A), Physics (A)"
        }
      ],
      experienceList: [
        {
          title: "Tech Manager",
          company: "Google Developer Group, University of Southampton",
          location: "Southampton, UK",
          duration: "October 2024 – Present",
          points: [
            "Organized workshops and hands-on sessions on Google Cloud and AI.",
            "Hosted panel discussions with industry experts.",
            "Managed a team for tech operations and event execution.",
            "Maintained the digital infrastructure of the society.",
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
        }
      ],
    };
  },
};
</script>

<style scoped>
/* Section Styles */
.edu-exp-section {
  padding: 3rem 2rem;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.5s ease, color 0.5s ease;
}

/* Centering the main heading */
.section-heading {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-family: "Source Code Pro", monospace;
  font-weight: 700;
}

/* Grid Layout */
.edu-exp-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .edu-exp-container {
    grid-template-columns: 1fr;
  }
}

/* Section Titles */
.section-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 600;
  text-align: center;
  justify-content: center;
}

.section-icon {
  font-size: 1.8rem;
  color: var(--primary-color);
}

/* Education & Experience Card Styles */
.education-card,
.experience-card {
  background: rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: left;
}

.education-card:hover,
.experience-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Education Card Headers */
.edu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date {
  font-size: 0.9rem;
  color: var(--accent-color);
}

.institution {
  font-size: 1.2rem;
  font-weight: 600;
}

/* Experience Card Headers */
.card-header h4 {
  font-size: 1.5rem;
}

.card-header h5 {
  font-size: 1.1rem;
  color: var(--secondary-color);
}

/* Experience Details */
.experience-details p {
  margin: 0.3rem 0;
  font-size: 1rem;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 768px) {
  .edu-exp-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .education-card,
  .experience-card {
    padding: 1.2rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .card-header h4 {
    font-size: 1.3rem;
  }

  .card-header h5 {
    font-size: 1rem;
  }
}
</style>
