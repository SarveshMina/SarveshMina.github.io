<template>
  <footer>
    <div class="footer-container">
      <div class="footer-left">
        <h2>Sarvesh Mina</h2>
        <p>To Be Software Engineer</p>
      </div>
      <div class="footer-right">
        <h3>Connect with me</h3>
        <div class="footer-social">
          <a href="mailto:minasarvesh@gmail.com"><i class="fas fa-envelope"></i></a>
          <a href="https://github.com/SarveshMina" target="_blank"><i class="fab fa-github"></i></a>
          <a href="https://linkedin.com/in/sarvesh-mina/" target="_blank"><i class="fab fa-linkedin"></i></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 Sarvesh Mina. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default { name: 'Footer' }
</script>

<style scoped>
footer{padding:2rem;background:var(--footer-bg);border-top:1px solid var(--glass-border);transition:all .5s}
.footer-container{display:flex;justify-content:space-between;align-items:center;max-width:1200px;margin:0 auto;flex-wrap:wrap;gap:1rem;padding-bottom:1rem;border-bottom:1px solid var(--glass-border)}
.footer-left h2{font-size:1.8rem;margin-bottom:.3rem}
.footer-left p{color:var(--text-dim);font-size:.9rem}
.footer-right h3{font-size:1.3rem;margin-bottom:.5rem;text-align:right}
.footer-social{display:flex;gap:1rem;justify-content:flex-end}
.footer-social a{color:var(--text);font-size:1.5rem;transition:all .3s}
.footer-social a:hover{color:var(--text-dim);transform:scale(1.2)}
.footer-bottom{text-align:center;margin-top:1rem;color:var(--text-dim);font-size:.8rem}

/* iPad Mini (max 834px) */
@media(max-width:834px){
  .footer-container{flex-direction:column;text-align:center}
  .footer-right{text-align:center}
  .footer-right h3{text-align:center}
  .footer-social{justify-content:center}
}

/* Phones (max 768px) */
@media(max-width:768px){
  .footer-left h2{font-size:1.3rem}
  .footer-right h3{font-size:1rem}
}

/* Small phones (max 480px) */
@media(max-width:480px){
  .footer-left h2{font-size:1.2rem}
  .footer-left p{font-size:.8rem}
  .footer-bottom p{font-size:.75rem}
}
</style>
