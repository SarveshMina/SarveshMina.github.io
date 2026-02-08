<template>
  <section id="contact">
    <h2>Contact</h2>
    <div class="contact-container">
      <div class="contact-info">
        <div class="info-card glass"><p><strong>Email:</strong> <a href="mailto:minasarvesh@gmail.com">minasarvesh@gmail.com</a></p></div>
        <div class="info-card glass"><p><strong>GitHub:</strong> <a href="https://github.com/SarveshMina" target="_blank">github.com/SarveshMina</a></p></div>
        <div class="info-card glass"><p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/sarvesh-mina/" target="_blank">linkedin.com/in/sarvesh-mina</a></p></div>
        <div class="info-card glass"><p><strong>Portfolio:</strong> <a href="https://sarveshmina.github.io/" target="_blank">sarveshmina.github.io</a></p></div>
      </div>
      <form class="contact-form glass" @submit.prevent="handleSubmit">
        <input type="text" v-model="name" placeholder="Your Name" required>
        <input type="email" v-model="email" placeholder="Your Email" required>
        <textarea v-model="message" placeholder="Your Message" required></textarea>
        <button type="submit" :disabled="isSubmitting" class="send-btn">{{ sendStatus }}</button>
        <p v-if="successMessage" class="success-msg">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
      </form>
    </div>
  </section>
</template>

<script>
import emailjs from 'emailjs-com'

export default {
  name: 'Contact',
  data() {
    return {
      name: '',
      email: '',
      message: '',
      isSubmitting: false,
      sendStatus: 'Send',
      successMessage: '',
      errorMessage: '',
    }
  },
  methods: {
    async handleSubmit() {
      this.isSubmitting = true
      this.sendStatus = 'Sending...'
      this.successMessage = ''
      this.errorMessage = ''

      try {
        await emailjs.send(
          'service_g9ab3u3',
          'template_13qgfs8',
          { name: this.name, email: this.email, message: this.message },
          'dg2uWBU9TaygUdL1d'
        )
        this.successMessage = 'Your message has been sent successfully!'
        this.sendStatus = 'Sent!'
        this.name = ''
        this.email = ''
        this.message = ''
        setTimeout(() => { this.sendStatus = 'Send' }, 2000)
      } catch (error) {
        this.errorMessage = 'There was an error sending your message. Please try again.'
        console.error('EmailJS Error:', error)
        this.sendStatus = 'Send'
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>

<style scoped>
.contact-container{display:flex;gap:2rem;max-width:1000px;margin:0 auto;flex-wrap:wrap;justify-content:center}
.contact-info{flex:1;min-width:250px;display:flex;flex-direction:column;gap:1rem}
.info-card{padding:1rem 1.5rem}
.info-card a{color:var(--text);text-decoration:none;transition:color .3s}
.info-card a:hover{color:var(--text-dim)}
.contact-form{flex:1;min-width:300px;padding:2rem;display:flex;flex-direction:column;gap:1rem}
.contact-form input,.contact-form textarea{
  background:var(--input-bg);border:1px solid var(--input-border);border-radius:14px;
  padding:.8rem 1rem;color:var(--text);font-family:'DM Sans',sans-serif;
  font-size:.9rem;outline:none;transition:border-color .3s;
}
.contact-form input::placeholder,.contact-form textarea::placeholder{color:var(--text-dim)}
.contact-form input:focus,.contact-form textarea:focus{border-color:var(--input-focus)}
.contact-form textarea{resize:vertical;min-height:120px}
.send-btn{
  align-self:flex-end;padding:.6rem 2rem;border-radius:25px;
  border:1.5px solid var(--btn-border);background:var(--btn-bg);color:var(--text);
  font-family:'DM Sans',sans-serif;font-size:.9rem;font-weight:700;
  cursor:pointer;transition:all .3s;
}
.send-btn:hover{background:var(--btn-hover-bg);border-color:var(--text)}
.success-msg{color:#4caf50;font-size:.85rem;text-align:right}
.error-msg{color:#ff6347;font-size:.85rem;text-align:right}

@media(max-width:768px){
  .contact-container{flex-direction:column}
}
</style>
