import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  //--mode production
  mode: "development"
  //default
  ,publicDir: "public"
  ,server:{host: "0.0.0.0", port: 5173}
  ,preview: {open: "firefox", https: true, strictPort: true, port: 80}
  ,build : {
    target: ['chrome57', 'firefox57', 'node12', 'safari11']
    ,manifest: true
    ,outDir: "build"

  }
})
