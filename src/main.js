// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css' // Import global styles

// Import Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Import Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';

// Import specific icons
import {
    faJs, faPython, faJava, faGit, faReact, faVuejs, faDocker, faAws,
    faHtml5, faCss3Alt, faGithub, faLinkedin
} from '@fortawesome/free-brands-svg-icons'

import { faDatabase, faCode, faCloud, faTools, faLaptopCode } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';

// Add missing icons to the library
library.add(
    faJs, faPython, faJava, faGit, faReact, faVuejs, faDocker, faAws,
    faHtml5, faCss3Alt, faDatabase, faCode, faCloud, faTools,
    faLaptopCode, faEnvelope, faGlobe, faGithub, faLinkedin
)

const app = createApp(App)
app.use(router)

// Register FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
