import assert from 'node:assert/strict';
import test from 'node:test';
import { stripPrerenderedCookieBanner } from '../prerender-utils.mjs';

const serializedBanner = `<div class="ptu-wrap" role="dialog" aria-modal="false" aria-labelledby="ptu-title"><h2 class="ptu-title" id="ptu-title">Uso de cookies</h2><p class="ptu-msg">Utilizamos cookies propias y de terceros.</p><div class="ptu-actions"><button type="button" class="ptu-btn ptu-btn--primary" data-act="reject">Rechazar todas</button><button type="button" class="ptu-btn ptu-btn--primary" data-act="accept">Aceptar todas</button><button type="button" class="ptu-btn ptu-btn--link" data-act="settings">Configurar</button></div></div>`;

test('removes the cookie banner div serialized by prerendering', () => {
  const html = `<!doctype html><body><div id="root"></div>${serializedBanner}</body>`;
  const sanitized = stripPrerenderedCookieBanner(html);

  assert.equal(sanitized.includes('ptu-wrap'), false);
  assert.equal(sanitized.includes('Aceptar todas'), false);
  assert.equal(sanitized.includes('<div id="root"></div>'), true);
});

test('removes the injected cookie banner stylesheet', () => {
  const style = '<style id="ptu-cookies-style">.ptu-wrap{position:fixed}</style>';
  const sanitized = stripPrerenderedCookieBanner(`<head>${style}</head><body></body>`);

  assert.equal(sanitized.includes('ptu-cookies-style'), false);
  assert.equal(sanitized.includes('<head></head>'), true);
});

test('leaves html unchanged when no banner was serialized', () => {
  const html = '<!doctype html><body><div id="root"></div><style>body{color:red}</style></body>';
  assert.equal(stripPrerenderedCookieBanner(html), html);
});

test('removes the banner even when it contains nested divs', () => {
  const nested = `<body>${serializedBanner}<div>contenido</div></body>`;
  const sanitized = stripPrerenderedCookieBanner(nested);

  assert.equal(sanitized.includes('ptu-wrap'), false);
  assert.equal(sanitized.includes('<div>contenido</div>'), true);
});
