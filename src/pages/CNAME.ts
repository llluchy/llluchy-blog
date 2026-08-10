import { SITE_URL } from '../consts';

// 从 SITE_URL 中提取域名，用于 GitHub Pages 自定义域名绑定
// 例如：https://www.llluchy.cn -> www.llluchy.cn
export async function GET() {
	const hostname = new URL(SITE_URL).hostname;
	return new Response(hostname, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
}
