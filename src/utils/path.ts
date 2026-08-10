// 统一的路径拼接工具，避免 BASE_URL + '/xxx' 出现 //xxx 的协议相对 URL
// 用法：
//   withBase()                      -> 根路径（首页）
//   withBase('/blog')               -> /blog
//   withBase('blog', 'post-id')     -> /blog/post-id
//   withBase('/blog', 'post-id/')   -> /blog/post-id/（保留末尾斜杠）
export function withBase(...segments: string[]): string {
	const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
	if (segments.length === 0) return base || '/';
	const path = segments.map((s) => s.replace(/^\/+/, '').replace(/\/+$/, '')).filter(Boolean).join('/');
	const trailing = segments[segments.length - 1]?.endsWith('/') ? '/' : '';
	return path ? `${base}/${path}${trailing}` : base || '/';
}
