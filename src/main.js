// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import './style.css' // Import global styles

// Import AOS and its styles
import AOS from 'aos'
import 'aos/dist/aos.css'

// Import Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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

// Register FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon)

// Initialize AOS
app.mixin({
    mounted() {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true, // Whether animation should happen only once
        })
    }
})

// Mount the app
app.mount('#app')
