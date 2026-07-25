import { defaultLang, translations, type Lang } from './translations';

export function getLangFromUrl(url: URL): Lang {
	const langParam = url.searchParams.get('lang');
	if (langParam && (langParam === 'zh' || langParam === 'en')) {
		return langParam;
	}
	return defaultLang;
}

export function useTranslations(lang: Lang) {
	return function t(key: keyof (typeof translations)[Lang]): string {
		return translations[lang][key] || translations[defaultLang][key] || String(key);
	};
}

export function getAlternativeLangPath(currentLang: Lang, currentPath: string): string {
	const targetLang: Lang = currentLang === 'zh' ? 'en' : 'zh';
	const url = new URL(currentPath, 'http://localhost');
	url.searchParams.set('lang', targetLang);
	return url.pathname + url.search + url.hash;
}
