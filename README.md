# Glass Portfolio Template

A modern, minimalistic portfolio website built with Vue 3 and Vite. Features a frosted glass UI aesthetic with dark/light mode, smooth animations, and full responsive design.

## Features

- **Frosted Glass Design** — Translucent cards with subtle borders and glow effects
- **Dark / Light Mode** — Toggle with preferences saved to localStorage
- **Responsive** — Optimized for desktop, iPad Pro, iPad, iPad Mini, phones, and small phones
- **Expandable Project Cards** — Click to reveal details, videos, and skill chips with staggered animations
- **Reactive Hover Effects** — Sibling cards dim when one is hovered using CSS `:has()`
- **Mouse Glow Follower** — Smooth cursor-tracking ambient glow (desktop only)
- **Contact Form** — Integrated with EmailJS for sending messages
- **Analytics** — Optional Firebase Firestore analytics for page views and project interactions
- **GitHub Pages Ready** — SPA routing with 404.html redirect handler
- **Vue Router** — History mode routing with admin panel support

## Quick Start

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Install dependencies
npm install

# Start dev server
npm run dev
```

## Customization

### 1. Personal Info

Edit the following files to replace with your own content:

- **`src/components/Summary.vue`** — Your name, bio, profile image, social links
- **`src/components/Header.vue`** — Name in the logo, CV link
- **`src/components/Footer.vue`** — Name, tagline, social links

### 2. Projects, Skills, Education & Experience

All content data lives in **`src/data/defaults.js`**. Edit the arrays:

- `defaultProjects` — Your projects with title, description, skills, links, videos
- `defaultSkills` — Skill categories with icons (uses Font Awesome class arrays like `['fab', 'java']`)
- `defaultEducation` — Your degrees and institutions
- `defaultExperience` — Your work experience

### 3. Contact Form (EmailJS)

The contact form uses [EmailJS](https://www.emailjs.com/). Update these values in `src/components/Contact.vue`:

```js
await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  { name, email, message },
  'YOUR_PUBLIC_KEY'
)
```

### 4. Analytics (Optional)

To enable Firebase analytics:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Copy `src/firebase.example.js` to `src/firebase.js`
3. Fill in your Firebase config values

```bash
cp src/firebase.example.js src/firebase.js
```

If you don't need analytics, the app will still work — failed analytics calls are caught silently.

### 5. Assets

- **Profile image** — Replace `public/imgs/profile.jpg`
- **CV/Resume** — Replace `public/SarveshMina.pdf` with your own PDF
- **Project videos** — Add to `public/vids/`
- **Favicon** — Replace `public/main.png`

### 6. Colors & Theme

All colors are CSS custom properties in **`src/style.css`**:

```css
:root {
  --bg: #f5f5f5;
  --text: #111;
  --glass-bg: rgba(255, 255, 255, .45);
  /* ... */
}

body.dark-mode {
  --bg: #0a0a0a;
  --text: #eee;
  --glass-bg: rgba(255, 255, 255, .06);
  /* ... */
}
```

## Deploying to GitHub Pages

```bash
# Build and deploy
npm run deploy
```

Or set up GitHub Actions for automatic deployment on push.

Make sure your repo settings have GitHub Pages source set to the `gh-pages` branch.

## Tech Stack

- [Vue 3](https://vuejs.org/) + [Vue Router 4](https://router.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Font Awesome](https://fontawesome.com/)
- [EmailJS](https://www.emailjs.com/)
- [Firebase](https://firebase.google.com/) (optional analytics)

## Project Structure

```
src/
├── components/       # Vue components (Header, Summary, Skills, etc.)
├── composables/      # Reusable logic (analytics, auth, data)
├── data/             # Default content data (defaults.js)
├── router/           # Vue Router config
├── views/            # Page views (Portfolio, Admin)
├── style.css         # Global styles and CSS variables
├── main.js           # App entry point
└── firebase.example.js  # Firebase config template
```

## License

MIT
