export const languages = {
	en: 'English',
	zh: '中文',
};

export const defaultLang = 'zh';

export const translations = {
	en: {
		'nav.home': 'Home',
		'nav.blog': 'Blog',
		'nav.about': 'About',
		'nav.projects': 'Projects',

		'hero.greeting': "Hi, I'm",
		'hero.name': 'llluchy',
		'hero.title': 'Full-Stack Developer & Tech Enthusiast',
		'hero.description':
			'5+ years of full-stack experience. Passionate about exploring new technologies, building tools that improve efficiency, and delivering quality end-to-end solutions.',
		'hero.cta.projects': 'View My Work',
		'hero.cta.blog': 'Read My Blog',

		'section.about': 'About Me',
		'section.about.subtitle': 'A quick introduction',
		'section.skills': 'Skills & Tech Stack',
		'section.skills.subtitle': 'Tools I work with daily',
		'section.projects': 'Featured Projects',
		'section.projects.subtitle': 'Things I have built',
		'section.blog': 'Latest Articles',
		'section.blog.subtitle': 'Thoughts and insights',
		'section.timeline': 'My Journey',
		'section.timeline.subtitle': 'Key milestones',

		'blog.readMore': 'Read More',
		'blog.backToList': '← Back to all posts',
		'blog.publishedOn': 'Published on',
		'blog.updatedOn': 'Updated on',
		'blog.noPosts': 'No posts yet, check back soon!',
		'blog.allCategories': 'All',
		'blog.category.tech': 'Tech',
		'blog.category.life': 'Life',
		'blog.category.guide': 'Guide',
		'blog.category.general': 'General',

		'about.hobbies': 'Hobbies & Interests',
		'about.hobbies.subtitle': 'Things I enjoy beyond coding',
		'about.contact': 'Get In Touch',
		'about.contact.subtitle': 'Open to interesting conversations and opportunities',
		'about.email': 'Email',

		'projects.title': 'Projects',
		'projects.subtitle': 'Things I have built',
		'projects.viewOnGithub': 'View on GitHub',

		'footer.rights': 'All rights reserved.',
		'footer.builtWith': 'Built with Astro',

		'lang.switch': 'Switch Language',
	},
	zh: {
		'nav.home': '首页',
		'nav.blog': '博客',
		'nav.about': '关于我',
		'nav.projects': '作品',

		'hero.greeting': '你好，我是',
		'hero.name': 'llluchy',
		'hero.title': '全栈开发者 & 技术爱好者',
		'hero.description':
			'5年以上全栈开发经验。热爱探索新技术、构建效率工具，独立负责从需求到部署的完整交付流程。',
		'hero.cta.projects': '查看作品',
		'hero.cta.blog': '阅读博客',

		'section.about': '关于我',
		'section.about.subtitle': '简单的自我介绍',
		'section.skills': '技能 & 技术栈',
		'section.skills.subtitle': '我每天使用的工具',
		'section.projects': '精选项目',
		'section.projects.subtitle': '我构建的一些作品',
		'section.blog': '最新文章',
		'section.blog.subtitle': '思考与见解',
		'section.timeline': '成长历程',
		'section.timeline.subtitle': '重要里程碑',

		'blog.readMore': '阅读全文',
		'blog.backToList': '← 返回文章列表',
		'blog.publishedOn': '发布于',
		'blog.updatedOn': '更新于',
		'blog.noPosts': '暂无文章，敬请期待！',
		'blog.allCategories': '全部',
		'blog.category.tech': '技术',
		'blog.category.life': '生活',
		'blog.category.guide': '指南',
		'blog.category.general': '综合',

		'about.hobbies': '爱好 & 兴趣',
		'about.hobbies.subtitle': '编程之外我喜欢做的事',
		'about.contact': '联系我',
		'about.contact.subtitle': '欢迎有趣的交流和合作机会',
		'about.email': '邮箱',

		'projects.title': '作品',
		'projects.subtitle': '我构建的一些作品',
		'projects.viewOnGithub': '在 GitHub 上查看',

		'footer.rights': '保留所有权利。',
		'footer.builtWith': '使用 Astro 构建',

		'lang.switch': '切换语言',
	},
};

export type Lang = keyof typeof translations;