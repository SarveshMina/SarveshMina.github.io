<!-- src/components/Contact.vue -->
<template>
  <section id="contact" class="contact-section">
    <h2>Contact</h2>
    <div class="contact-container">
      <!-- Contact Info -->
      <div class="contact-info">
        <div class="info-card">
          <p>
            <strong>Email:</strong>
            <a href="mailto:minasarvesh@gmail.com">minasarvesh@gmail.com</a>
          </p>
        </div>
        <div class="info-card">
          <p>
            <strong>GitHub:</strong>
            <a href="https://github.com/SarveshMina" target="_blank">
              github.com/SarveshMina</a>
          </p>
        </div>
        <div class="info-card">
          <p>
            <strong>LinkedIn:</strong>
            <a href="https://linkedin.com/in/sarvesh-mina/" target="_blank">
              linkedin.com/in/sarvesh-mina</a>
          </p>
        </div>
        <div class="info-card">
          <p>
            <strong>Portfolio:</strong>
            <a href="https://sarveshmina.github.io/" target="_blank">
              sarveshmina.github.io</a>
          </p>
        </div>
      </div>

      <!-- Contact Form -->
      <form @submit.prevent="handleSubmit" class="contact-form">
        <input
            type="text"
            v-model="name"
            placeholder="Your Name"
            required
        />
        <input
            type="email"
            v-model="email"
            placeholder="Your Email"
            required
        />
        <textarea
            v-model="message"
            placeholder="Your Message"
            required
        ></textarea>

        <!-- Submit Button & Feedback Container -->
        <div class="submit-container">
          <button type="submit" :disabled="isSubmitting" class="send-button">
            {{ sendStatus }}
          </button>
          <div class="feedback-container">
            <p v-if="successMessage" class="success-message">
              {{ successMessage }}
            </p>
            <p v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </p>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "emailjs-com";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "Contact",
  data() {
    return {
      name: "",
      email: "",
      message: "",
      isSubmitting: false,
      sendStatus: "Send", // Button text state
      successMessage: "",
      errorMessage: ""
    };
  },
  methods: {
    async handleSubmit() {
      this.isSubmitting = true;
      this.sendStatus = "Sending...";
      this.successMessage = "";
      this.errorMessage = "";

      const templateParams = {
        name: this.name,
        email: this.email,
        message: this.message,
      };

      try {
        await emailjs.send(
            "service_g9ab3u3",   // Replace with your EmailJS Service ID
            "template_13qgfs8",  // Replace with your EmailJS Template ID
            templateParams,
            "dg2uWBU9TaygUdL1d"   // Replace with your EmailJS Public Key (User ID)
        );
        this.successMessage = "Your message has been sent successfully!";
        this.sendStatus = "Sent!";
        // Clear form fields
        this.name = "";
        this.email = "";
        this.message = "";
        // After 2 seconds, revert back to default button text
        setTimeout(() => {
          this.sendStatus = "Send";
        }, 2000);
      } catch (error) {
        this.errorMessage = "There was an error sending your message. Please try again.";
        console.error("EmailJS Error:", error);
        this.sendStatus = "Send";
      } finally {
        this.isSubmitting = false;
      }
    }
  },
  mounted() {
    gsap.from(".contact-info p", {
      scrollTrigger: {
        trigger: ".contact-info",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      x: -50,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    gsap.from(
        ".contact-form input, .contact-form textarea, .contact-form button",
        {
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
    );
  }
};
</script>

<style scoped>
/* Base Section Background with Gradient */
.contact-section {
  padding: 4rem 2rem;
  color: var(--text-color);
  transition: background 0.5s ease, color 0.5s ease;
}

/* Dark Mode for the entire Contact Section */
body.dark-mode .contact-section {
  color: #f1f1f1;
}

.contact-section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-family: "Source Code Pro", monospace;
}

/* Contact Container Layout */
.contact-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}

/* Glassmorphism for Contact Info Cards */
.contact-info {
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}

.info-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  padding: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.contact-info p {
  font-size: 1.1rem;
  margin: 0.5rem 0;
  font-family: "Source Code Pro", monospace;
}

.contact-info a {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.3s;
}

.contact-info a:hover {
  color: var(--link-hover-color);
}

/* Dark Mode for Contact Info Cards */
body.dark-mode .info-card {
  background: rgba(40, 40, 40, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

/* Glassmorphism for Contact Form */
.contact-form {
  flex: 1;
  min-width: 300px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px) saturate(180%);
  -webkit-backdrop-filter: blur(8px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

/* Dark Mode for Contact Form */
body.dark-mode .contact-form {
  background: rgba(40, 40, 40, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

/* Input and Textarea Styles */
.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 1rem;
  background-color: transparent;
  color: var(--text-color);
  font-family: "Source Code Pro", monospace;
  transition: border-color 0.3s ease;
  margin-bottom: 1rem;
  box-sizing: border-box;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: var(--primary-color);
  outline: none;
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: #777;
}

.contact-form textarea {
  resize: vertical;
  height: 150px;
}

/* Submit Button & Feedback Container */
.submit-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-height: 3rem; /* Reserve space for feedback */
}

.feedback-container {
  min-height: 3rem;
  width: 100%;
  margin-top: 0.5rem;
  text-align: right;
}

/* Send Message Button styled like CV Button with animated gradient */
.send-button {
  display: inline-block;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  border: 2px solid var(--primary-color);
  border-radius: 25px;
  background: transparent;
  color: var(--primary-color);
  font-size: 1rem;
  font-family: "Source Code Pro", monospace;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s, transform 0.3s;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.send-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet);
  background-size: 400%;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease;
  z-index: -1;
  opacity: 0.8;
}

.send-button:hover::before {
  transform: scaleX(1);
}

.send-button:hover {
  transform: scale(1.02);
}

/* Aesthetic Feedback Messages */
.success-message {
  background: rgba(76, 175, 80, 0.2);
  border: 1px solid #4caf50;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  color: #4caf50;
  font-family: "Source Code Pro", monospace;
  margin-top: 0.5rem;
  text-align: right;
  animation: fadeIn 0.5s ease-out;
}

.error-message {
  background: rgba(255, 99, 71, 0.2);
  border: 1px solid #ff6347;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  color: #ff6347;
  font-family: "Roboto", sans-serif;
  margin-top: 0.5rem;
  text-align: right;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .contact-container {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .contact-info,
  .contact-form {
    width: 100%;
    max-width: 500px;
  }

  .contact-info {
    text-align: center;
  }

  .submit-container {
    align-items: center;
    text-align: center;
  }
}
</style>
