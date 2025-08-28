// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: 'https://lucascid.github.io/aplicacion-gastos',
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Quita cualquier línea que diga "base: '/aplicacion-gastos/'" o similar
})
