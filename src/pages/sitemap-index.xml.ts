import { getCollection } from 'astro:content';
import { SITE_URL } from '../consts';

export async function GET() {
	const posts = await getCollection('blog');

	// 静态页面及其优先级
	const staticPages = [
		{ path: '', priority: 1.0 },
		{ path: 'blog', priority: 1.0 },
		{ path: 'projects', priority: 1.0 },
		{ path: 'about', priority: 1.0 },
	];

	// 博客文章页面
	const blogPages = posts.map((post) => ({
		path: `blog/${post.id}`,
		priority: 0.75,
	}));

	const allPages = [...staticPages, ...blogPages];

	// 生成 URL 列表（包含 ?lang=en 变体）
	const urls = allPages.flatMap((page) => {
		const path = encodeURIComponent(page.path).replace(/%2F/g, '/');
		const base = path ? `${SITE_URL}/${path}` : SITE_URL;
		return [
			{ loc: `${base}/`, priority: page.priority },
			{ loc: `${base}/?lang=en`, priority: page.priority * 0.78 },
		];
	});

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <priority>${u.priority.toFixed(2)}</priority>
  </url>`).join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
}
