import {
  defaultProjects,
  defaultSkills,
  defaultEducation,
  defaultExperience,
} from '../data/defaults'

const STORAGE_KEYS = {
  projects: 'portfolio_projects',
  skills: 'portfolio_skills',
  education: 'portfolio_education',
  experience: 'portfolio_experience',
}

function getWithFallback(key, defaults) {
  try {
    const stored = localStorage.getItem(key)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(defaults) ? Array.isArray(parsed) : typeof parsed === 'object') {
        return parsed
      }
    }
  } catch (e) {
    console.warn(`Failed to parse localStorage key "${key}":`, e)
  }
  return JSON.parse(JSON.stringify(defaults))
}

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function getProjects() { return getWithFallback(STORAGE_KEYS.projects, defaultProjects) }
export function getSkills() { return getWithFallback(STORAGE_KEYS.skills, defaultSkills) }
export function getEducation() { return getWithFallback(STORAGE_KEYS.education, defaultEducation) }
export function getExperience() { return getWithFallback(STORAGE_KEYS.experience, defaultExperience) }

export function saveProjects(data) { save(STORAGE_KEYS.projects, data) }
export function saveSkills(data) { save(STORAGE_KEYS.skills, data) }
export function saveEducation(data) { save(STORAGE_KEYS.education, data) }
export function saveExperience(data) { save(STORAGE_KEYS.experience, data) }

export function resetAll() {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key))
}

export function exportAll() {
  return JSON.stringify({
    projects: getProjects(),
    skills: getSkills(),
    education: getEducation(),
    experience: getExperience(),
    exportedAt: new Date().toISOString()
  }, null, 2)
}

export function importAll(jsonString) {
  const data = JSON.parse(jsonString)
  if (data.projects) saveProjects(data.projects)
  if (data.skills) saveSkills(data.skills)
  if (data.education) saveEducation(data.education)
  if (data.experience) saveExperience(data.experience)
}

export { STORAGE_KEYS, defaultProjects, defaultSkills, defaultEducation, defaultExperience }
