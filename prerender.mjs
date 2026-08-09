import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import Prerenderer from '@prerenderer/prerenderer';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';
import { stripPrerenderedCookieBanner, stripPrerenderedGtmLoader } from './prerender-utils.mjs';

const gtmContainerId = 'GTM-MDQJ9WPB';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const distDir = path.resolve(__dirname, 'dist');

function resolvePuppeteerExecutablePath() {
	const envCandidates = [
		process.env.PUPPETEER_EXECUTABLE_PATH,
		process.env.CHROME_PATH,
		process.env.GOOGLE_CHROME_BIN,
	].filter(Boolean);

	const platformCandidates = process.platform === 'win32'
		? [
			`${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
			`${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`,
			`${process.env['ProgramFiles(x86)']}\\Google\\Chrome\\Application\\chrome.exe`,
			`${process.env.ProgramFiles}\\Microsoft\\Edge\\Application\\msedge.exe`,
			`${process.env['ProgramFiles(x86)']}\\Microsoft\\Edge\\Application\\msedge.exe`,
		]
		: [];

	const candidates = [...envCandidates, ...platformCandidates]
		.filter((candidate) => typeof candidate === 'string' && candidate.trim().length > 0);

	for (const executablePath of candidates) {
		if (fs.existsSync(executablePath)) {
			return executablePath;
		}
	}

	return null;
}

const executablePath = resolvePuppeteerExecutablePath();
const rendererOptions = {
	maxConcurrentRoutes: 4,
	renderAfterTime: 5000,
	skipThirdPartyRequests: true,
	headless: true,
	args: [
		'--no-proxy-server',
		'--proxy-server=direct://',
		'--proxy-bypass-list=*',
	],
	...(executablePath ? { executablePath } : {}),
};

if (executablePath) {
	console.log(`Using browser executable: ${executablePath}`);
}

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
	renderer: new PuppeteerRenderer(rendererOptions),
});

function isRecoverablePrerenderError(err) {
	const message = String(err?.message || err || '');
	return (
		message.includes('net::ERR_ADDRESS_INVALID') ||
		message.includes('net::ERR_CONNECTION_REFUSED') ||
		message.includes('spawn UNKNOWN')
	);
}

function writeFallbackRoutes(routes) {
	const baseIndexPath = path.join(distDir, 'index.html');
	const baseHtml = fs.readFileSync(baseIndexPath, 'utf-8');
	for (const route of routes) {
		const outputPath = path.join(distDir, route, 'index.html');
		fs.mkdirSync(path.dirname(outputPath), { recursive: true });
		const sanitized = stripPrerenderedCookieBanner(stripPrerenderedGtmLoader(baseHtml, gtmContainerId));
		fs.writeFileSync(outputPath, sanitized, 'utf-8');
		console.log(`  ~ fallback ${route}`);
	}
}

try {
	await prerenderer.initialize();
	const renderedRoutes = await prerenderer.renderRoutes(prerenderer.options.routes);
	for (const route of renderedRoutes) {
		const outputPath = path.join(distDir, route.route, 'index.html');
		fs.mkdirSync(path.dirname(outputPath), { recursive: true });
		const sanitized = stripPrerenderedCookieBanner(stripPrerenderedGtmLoader(route.html, gtmContainerId));
		fs.writeFileSync(outputPath, sanitized, 'utf-8');
		console.log(`  ✓ ${route.route}`);
	}
	await prerenderer.destroy();
	console.log(`\nPrerendered ${renderedRoutes.length} routes.`);
} catch (err) {
	if (isRecoverablePrerenderError(err)) {
		console.warn('Prerendering failed with a recoverable browser runtime error. Using static fallback generation.');
		console.warn(String(err?.message || err));
		writeFallbackRoutes(prerenderer.options.routes);
		console.log(`\nFallback-generated ${prerenderer.options.routes.length} routes.`);
		process.exit(0);
	}

	console.error('Prerendering failed:', err);
	process.exit(1);
}
