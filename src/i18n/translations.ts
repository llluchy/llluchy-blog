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

		'skill.frontend': 'Frontend',
		'skill.backend': 'Backend',
		'skill.devops': 'DevOps & Tools',
		'skill.design': 'Design & Others',

		'blog.readMore': 'Read More',
		'blog.backToList': '← Back to all posts',
		'blog.publishedOn': 'Published on',
		'blog.updatedOn': 'Updated on',
		'blog.noPosts': 'No posts yet, check back soon!',

		'about.intro': "Hello! I'm a developer who loves turning ideas into reality through code.",
		'about.passion':
			'Beyond coding, I enjoy exploring new technologies, contributing to open source, and sharing knowledge through writing.',
		'about.hobbies': "When I'm not coding, you'll find me reading tech blogs, experimenting with new frameworks, or enjoying a good cup of coffee.",

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

		'skill.frontend': '前端开发',
		'skill.backend': '后端开发',
		'skill.devops': 'DevOps & 工具',
		'skill.design': '设计 & 其他',

		'blog.readMore': '阅读全文',
		'blog.backToList': '← 返回文章列表',
		'blog.publishedOn': '发布于',
		'blog.updatedOn': '更新于',
		'blog.noPosts': '暂无文章，敬请期待！',

		'about.intro': '你好！我是一名热爱用代码将想法变为现实的开发者。',
		'about.passion':
			'除了编程，我还喜欢探索新技术、参与开源项目，并通过写作分享知识。',
		'about.hobbies': '不写代码的时候，你可以在技术博客、新框架实验室或者咖啡馆找到我。',

		'footer.rights': '保留所有权利。',
		'footer.builtWith': '使用 Astro 构建',

		'lang.switch': '切换语言',
	},
};

export type Lang = keyof typeof translations;
