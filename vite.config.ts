import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import * as fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  build: {
    outDir: './docs'
  },
  base: './',
  server: {
    port: 8080,
    // port: 443,
    host: "127.0.0.1",
    // hmr: {
    //     host: 'EpiWaveTest.local',
    //     port: 443,
    // },
    // https: {
    //   key: fs.readFileSync('./.cert/localhost-key.pem'),
    //   cert: fs.readFileSync('./.cert/localhost.pem'),
    // },
  },
})
