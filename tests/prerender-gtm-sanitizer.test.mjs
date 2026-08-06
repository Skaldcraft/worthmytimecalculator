import assert from 'node:assert/strict';
import test from 'node:test';
import { stripPrerenderedGtmLoader } from '../prerender-utils.mjs';

const containerId = 'GTM-MDQJ9WPB';
const generatedLoader = `<script async="" src="https://www.googletagmanager.com/gtm.js?id=${containerId}"></script>`;
const canonicalSnippet = `<script>(function(w,d,s,l,i){/* standard GTM loader */})(window,document,'script','dataLayer','${containerId}');</script>`;

test('removes the GTM script serialized by prerendering while preserving the canonical GTM snippet', () => {
  const renderedHtml = `<!doctype html><head>${generatedLoader}<script>window.dataLayer = window.dataLayer || [];</script>${canonicalSnippet}</head>`;

  const sanitizedHtml = stripPrerenderedGtmLoader(renderedHtml, containerId);

  assert.equal(sanitizedHtml.includes(generatedLoader), false);
  assert.equal(sanitizedHtml.includes(canonicalSnippet), true);
});

test('does not remove unrelated scripts', () => {
  const unrelatedScript = '<script src="/assets/index.js"></script>';

  assert.equal(stripPrerenderedGtmLoader(unrelatedScript, containerId), unrelatedScript);
});
