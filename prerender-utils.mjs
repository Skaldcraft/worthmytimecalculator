export function stripPrerenderedGtmLoader(html, containerId) {
	const escapedContainerId = containerId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const serializedLoader = new RegExp(
		`<script\\b[^>]*\\bsrc=["']https:\\/\\/www\\.googletagmanager\\.com\\/gtm\\.js\\?id=${escapedContainerId}(?:&[^"']*)?["'][^>]*>\\s*<\\/script>`,
		'gi',
	);

	return html.replace(serializedLoader, '');
}
