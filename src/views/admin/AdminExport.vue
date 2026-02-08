<template>
  <div class="admin-export">
    <h1>Export / Import Data</h1>

    <section class="section-block">
      <h2><i class="fas fa-download"></i> Export</h2>
      <p class="desc">Download all portfolio content as a JSON file.</p>
      <div class="export-actions">
        <button @click="downloadExport" class="action-btn primary">
          <i class="fas fa-file-download"></i> Download JSON
        </button>
        <button @click="copyToClipboard" class="action-btn secondary">
          <i class="fas fa-copy"></i> {{ copied ? 'Copied!' : 'Copy to Clipboard' }}
        </button>
      </div>
    </section>

    <section class="section-block">
      <h2><i class="fas fa-upload"></i> Import</h2>
      <p class="desc">Upload a previously exported JSON file to restore content.</p>
      <div class="import-area">
        <input type="file" accept=".json" @change="handleFileUpload" ref="fileInput" class="file-input" id="import-file" />
        <label for="import-file" class="file-label">
          <i class="fas fa-cloud-upload-alt"></i> Choose JSON file
        </label>
        <span v-if="fileName" class="file-name">{{ fileName }}</span>
      </div>
      <button v-if="importData" @click="confirmImport" class="action-btn primary" style="margin-top: 1rem;">
        <i class="fas fa-file-import"></i> Import Data
      </button>
      <p v-if="importMsg" :class="['msg', importSuccess ? 'success' : 'error']">{{ importMsg }}</p>
    </section>

    <section class="section-block">
      <h2><i class="fas fa-eye"></i> Preview</h2>
      <pre class="json-preview">{{ previewJson }}</pre>
    </section>
  </div>
</template>

<script>
import { exportAll, importAll } from '../../composables/usePortfolioData'

export default {
  name: 'AdminExport',
  data() {
    return {
      copied: false,
      fileName: '',
      importData: null,
      importMsg: '',
      importSuccess: false,
      previewJson: '',
    }
  },
  created() {
    this.previewJson = exportAll()
  },
  methods: {
    downloadExport() {
      const json = exportAll()
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'portfolio-data.json'
      a.click()
      URL.revokeObjectURL(url)
    },
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(exportAll())
        this.copied = true
        setTimeout(() => { this.copied = false }, 2000)
      } catch {
        this.copied = false
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (!file) return
      this.fileName = file.name
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          JSON.parse(e.target.result)
          this.importData = e.target.result
          this.importMsg = ''
        } catch {
          this.importMsg = 'Invalid JSON file.'
          this.importSuccess = false
          this.importData = null
        }
      }
      reader.readAsText(file)
    },
    confirmImport() {
      if (!confirm('Import this data? It will overwrite your current content.')) return
      try {
        importAll(this.importData)
        this.importMsg = 'Data imported successfully.'
        this.importSuccess = true
        this.previewJson = exportAll()
        this.importData = null
        this.fileName = ''
      } catch {
        this.importMsg = 'Failed to import data.'
        this.importSuccess = false
      }
    },
  },
}
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.section-block {
  margin-bottom: 2.5rem;
}

.section-block h2 {
  font-size: 1.4rem;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.desc {
  color: var(--accent-color);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.export-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.9rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.action-btn:hover { opacity: 0.85; }

.action-btn.primary {
  background: #6c63ff;
  color: #fff;
}

.action-btn.secondary {
  background: transparent;
  border: 1px solid #6c63ff;
  color: #6c63ff;
}

.import-area {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.file-input {
  display: none;
}

.file-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border: 2px dashed rgba(128, 128, 128, 0.3);
  border-radius: 8px;
  color: var(--text-color);
  cursor: pointer;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.file-label:hover {
  border-color: #6c63ff;
}

.file-name {
  font-size: 0.85rem;
  color: var(--accent-color);
}

.msg {
  margin-top: 0.75rem;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
}

.msg.success {
  background: rgba(46, 204, 113, 0.15);
  color: #27ae60;
}

.msg.error {
  background: rgba(231, 76, 60, 0.15);
  color: #e74c3c;
}

.json-preview {
  background: #1a1a2e;
  color: #a8d8a8;
  padding: 1.5rem;
  border-radius: 8px;
  font-size: 0.8rem;
  max-height: 400px;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
}
</style>
