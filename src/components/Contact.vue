<!-- src/components/Contact.vue -->
<template>
  <section id="contact" class="contact-section" data-aos="fade-up">
    <h2>Contact</h2>
    <div class="contact-container">
      <div class="contact-info" data-aos="fade-right">
        <p><strong>Email:</strong> <a href="mailto:minasarvesh@gmail.com">minasarvesh@gmail.com</a></p>
        <p><strong>GitHub:</strong> <a href="https://github.com/SarveshMina" target="_blank">github.com/SarveshMina</a></p>
        <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/sarvesh-mina/" target="_blank">linkedin.com/in/sarvesh-mina</a></p>
        <p><strong>Portfolio:</strong> <a href="https://sarveshmina.github.io/" target="_blank">sarveshmina.github.io</a></p>
      </div>
      <form @submit.prevent="handleSubmit" class="contact-form" data-aos="fade-left">
        <input type="text" v-model="name" placeholder="Your Name" required />
        <input type="email" v-model="email" placeholder="Your Email" required />
        <textarea v-model="message" placeholder="Your Message" required></textarea>
        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Sending...' : 'Send Message' }}
        </button>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </section>
</template>

<script>
import emailjs from 'emailjs-com';

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
      this.isSubmitting = true;
      this.successMessage = '';
      this.errorMessage = '';

      const templateParams = {
        name: this.name,
        email: this.email,
        message: this.message
      };

      try {
        await emailjs.send(
            "service_3qhnot8",  // Replace with your EmailJS Service ID
            "template_13qgfs8", // Replace with your EmailJS Template ID
            templateParams,
            "dg2uWBU9TaygUdL1d"      // Replace with your EmailJS User ID
        );

        this.successMessage = 'Your message has been sent successfully!';
        this.name = '';
        this.email = '';
        this.message = '';
      } catch (error) {
        this.errorMessage = 'There was an error sending your message. Please try again.';
        console.error(error);
      } finally {
        this.isSubmitting = false;
      }
    }
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

.contact-info {
  flex: 1;
  min-width: 250px;
  color: var(--text-color);
}

.contact-info p {
  font-size: 1.1rem;
  margin: 0.5rem 0;
  font-family: 'Roboto', sans-serif;
}

.contact-info a {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.3s;
}

.contact-info a:hover {
  color: var(--link-hover-color);
}

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
  font-family: 'Roboto', sans-serif;
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
  font-family: 'Roboto', sans-serif;
}

.contact-form button:disabled {
  background-color: rgba(0, 0, 0, 0.3);
  cursor: not-allowed;
}

.contact-form button:hover:not(:disabled) {
  background-color: var(--button-hover-bg-color);
  color: var(--button-text-color);
}

.success-message {
  color: var(--accent-color);
  font-weight: bold;
  margin-top: 1rem;
  font-family: 'Roboto', sans-serif;
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
