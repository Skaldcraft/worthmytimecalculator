import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

function nonBlockingCSS() {
  return {
    name: 'non-blocking-css',
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/,
        `<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel='stylesheet'">\n\t\t<noscript><link rel="stylesheet" crossorigin href="$1"></noscript>`
      );
    },
  };
}

export default defineConfig({
	plugins: [react(), nonBlockingCSS()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
