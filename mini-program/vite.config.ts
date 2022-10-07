import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';
import copy from 'rollup-plugin-copy';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    copy({
      targets: [
        {
          src: 'src/cloudfunctions/**/*',
          dest: `dist/${
            process.env.NODE_ENV === 'production' ? 'build' : 'dev'
          }/${process.env.UNI_PLATFORM}/cloudfunctions`,
        },
      ],
    }),
    uni(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
