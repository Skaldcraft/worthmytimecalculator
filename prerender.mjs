import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import Prerenderer from '@prerenderer/prerenderer';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const distDir = path.resolve(__dirname, 'dist');

const prerenderer = new Prerenderer({
	staticDir: distDir,
	routes: [
		'/',
		'/en',
		'/es',
		'/en/legal-notice',
		'/es/aviso-legal',
		'/en/privacy-policy',
		'/es/politica-privacidad',
		'/en/cookie-policy',
		'/es/politica-cookies',
	],
	renderer: new PuppeteerRenderer({
		maxConcurrentRoutes: 4,
		renderAfterTime: 5000,
		skipThirdPartyRequests: true,
		headless: true,
	}),
});

try {
	await prerenderer.initialize();
	const renderedRoutes = await prerenderer.renderRoutes(prerenderer.options.routes);
	for (const route of renderedRoutes) {
		const outputPath = path.join(distDir, route.route, 'index.html');
		fs.mkdirSync(path.dirname(outputPath), { recursive: true });
		fs.writeFileSync(outputPath, route.html, 'utf-8');
		console.log(`  ✓ ${route.route}`);
	}
	await prerenderer.destroy();
	console.log(`\nPrerendered ${renderedRoutes.length} routes.`);
} catch (err) {
	console.error('Prerendering failed:', err);
	process.exit(1);
}
