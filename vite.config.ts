import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// CHANGE this to your repository name (the folder name of the repo on GitHub)
const repoName = 'vivi-wordcloud'

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [react()]
})
