<!-- src/components/Contact.vue -->
<template>
  <section id="contact" class="contact-section">
    <h2>Contact</h2>
    <div class="contact-container">
      <!-- Contact Info -->
      <div class="contact-info">
        <p><strong>Email:</strong>
          <a href="mailto:minasarvesh@gmail.com">minasarvesh@gmail.com</a>
        </p>
        <p><strong>GitHub:</strong>
          <a href="https://github.com/SarveshMina" target="_blank">github.com/SarveshMina</a>
        </p>
        <p><strong>LinkedIn:</strong>
          <a href="https://linkedin.com/in/sarvesh-mina/" target="_blank">linkedin.com/in/sarvesh-mina</a>
        </p>
        <p><strong>Portfolio:</strong>
          <a href="https://sarveshmina.github.io/" target="_blank">sarveshmina.github.io</a>
        </p>
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

        <!-- Submit Button -->
        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Sending...' : 'Send Message' }}
        </button>

        <!-- Success / Error Feedback -->
        <p v-if="successMessage" class="success-message">
          {{ successMessage }}
        </p>
        <p v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </section>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from 'emailjs-com';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'Contact',
  data() {
    return {
      name: '',
      email: '',
      message: '',
      isSubmitting: false,
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleSubmit() {
      // Clear old messages
      this.isSubmitting = true;
      this.successMessage = '';
      this.errorMessage = '';

      // The params that EmailJS uses in your template
      const templateParams = {
        name: this.name,
        email: this.email,
        message: this.message,
        // OPTIONAL: If you want to pass your own receiving email:
        // to_email: 'minasarvesh@gmail.com',
      };

      try {
        // Make sure you have these EXACT strings in your EmailJS account:
        await emailjs.send(
            'service_g9ab3u3',   // Replace with your EmailJS Service ID
            'template_13qgfs8', // Replace with your EmailJS Template ID
            templateParams,
            'dg2uWBU9TaygUdL1d' // Replace with your EmailJS Public Key (User ID)
        );

        // Show success feedback
        this.successMessage = 'Your message has been sent successfully!';

        // Clear form fields
        this.name = '';
        this.email = '';
        this.message = '';
      } catch (error) {
        // Show error feedback
        this.errorMessage = 'There was an error sending your message. Please try again.';
        console.error('EmailJS Error:', error);
      } finally {
        // Re-enable the submit button
        this.isSubmitting = false;
      }
    }
  },
  mounted() {
    // Animate contact info
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

    // Animate contact form
    gsap.from(".contact-form input, .contact-form textarea, .contact-form button", {
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
    });
  }
};
</script>

<style scoped>
.contact-section {
  padding: 4rem 2rem;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.5s ease, color 0.5s ease;
}

.contact-section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-family: 'Source Code Pro', monospace;
}

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

/* Contact Info */
.contact-info {
  flex: 1;
  min-width: 250px;
  color: var(--text-color);
}

.contact-info p {
  font-size: 1.1rem;
  margin: 0.5rem 0;
  font-family: 'Source Code Pro', monospace;
}

.contact-info a {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.3s;
}

.contact-info a:hover {
  color: var(--link-hover-color);
}

/* Contact Form */
.contact-form {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-form input,
.contact-form textarea {
  padding: 0.75rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 1rem;
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: 'Source Code Pro', monospace;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: #777;
}

.contact-form textarea {
  resize: vertical;
  height: 150px;
}

/* Submit Button */
.contact-form button {
  align-self: flex-start;
  background-color: var(--button-bg-color);
  color: var(--button-text-color);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  font-family: 'Source Code Pro', monospace;
}

.contact-form button:disabled {
  background-color: rgba(0, 0, 0, 0.3);
  cursor: not-allowed;
}

.contact-form button:hover:not(:disabled) {
  background-color: var(--button-hover-bg-color);
  color: var(--button-text-color);
}

/* Feedback Messages */
.success-message {
  color: var(--accent-color);
  font-weight: bold;
  margin-top: 1rem;
  font-family: 'Source Code Pro', monospace;
}

.error-message {
  color: #ff6347; /* Tomato color for errors */
  font-weight: bold;
  margin-top: 1rem;
  font-family: 'Roboto', sans-serif;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-container {
    flex-direction: column;
  }

  .contact-info {
    text-align: center;
  }

  .contact-form button {
    width: 100%;
  }
}
</style>
