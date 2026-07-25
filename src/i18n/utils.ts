import { defaultLang, translations, type Lang } from './translations';

export function getLangFromUrl(url: URL): Lang {
	const [, lang] = url.pathname.split('/');
	if (lang in translations) return lang as Lang;
	return defaultLang;
}

export function useTranslations(lang: Lang) {
	return function t(key: keyof (typeof translations)[Lang]): string {
		return translations[lang][key] || translations[defaultLang][key] || key;
	};
}

export function getTranslatedPath(lang: Lang, path: string): string {
	const base = import.meta.env.BASE_URL || '';
	const cleanPath = path.replace(/^\//, '');
	if (lang === defaultLang) {
		return `${base}/${cleanPath}`;
	}
	return `${base}/${lang}/${cleanPath}`;
}

export function getAlternativeLangPath(currentLang: Lang, currentPath: string): string {
	const targetLang = currentLang === 'en' ? 'zh' : 'en';
	const base = import.meta.env.BASE_URL || '';
	const pathWithoutBase = currentPath.replace(base, '');
	const parts = pathWithoutBase.split('/').filter(Boolean);
	if (parts.length > 0 && (parts[0] === 'en' || parts[0] === 'zh')) {
		parts.shift();
	}
	const rest = parts.join('/');
	if (targetLang === defaultLang) {
		return rest ? `${base}/${rest}` : `${base}/`;
	}
	return rest ? `${base}/${targetLang}/${rest}` : `${base}/${targetLang}`;
}
