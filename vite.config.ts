import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: './src/index.ts', // 打包入口
      name: 'MuLib',
      // the proper extensions will be added
      fileName: 'index',
    },
    outDir: 'lib', // 默认为 dist
  },
});
