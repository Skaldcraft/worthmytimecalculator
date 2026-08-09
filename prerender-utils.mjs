export function stripPrerenderedGtmLoader(html, containerId) {
	const escapedContainerId = containerId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const serializedLoader = new RegExp(
		`<script\\b[^>]*\\bsrc=["']https:\\/\\/www\\.googletagmanager\\.com\\/gtm\\.js\\?id=${escapedContainerId}(?:&[^"']*)?["'][^>]*>\\s*<\\/script>`,
		'gi',
	);

	return html.replace(serializedLoader, '');
}

function removeFirstBanner(html) {
	const openTag = html.match(/<div\b[^>]*\bclass=["'][^"']*ptu-wrap[^"']*["'][^>]*>/i);
	if (!openTag) return html;

	const start = openTag.index;
	let depth = 0;
	const tagPattern = /<\/?div\b[^>]*>/gi;
	tagPattern.lastIndex = openTag.index + openTag[0].length;
	let match;
	let end = -1;

	while ((match = tagPattern.exec(html))) {
		if (match[0].charAt(1) === '/') {
			depth -= 1;
			if (depth === 0) {
				end = match.index + match[0].length;
				break;
			}
		} else {
			depth += 1;
		}
	}

	if (end === -1) return html;
	return html.slice(0, start) + html.slice(end);
}

export function stripPrerenderedCookieBanner(html) {
	let out = html.replace(
		/<style\b[^>]*\bid=["']ptu-cookies-style["'][^>]*>[\s\S]*?<\/style>/gi,
		'',
	);
	while (out.includes('ptu-wrap')) {
		const next = removeFirstBanner(out);
		if (next === out) break;
		out = next;
	}
	return out;
}
