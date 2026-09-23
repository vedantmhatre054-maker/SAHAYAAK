export const SUPPORTED_LANGUAGES = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
  },
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
  },
  {
    code: "mr",
    name: "Marathi",
    nativeName: "मराठी",
  },
  {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
  },
  {
    code: "ur",
    name: "Urdu",
    nativeName: "اردو",
  },
  {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
  },
  {
    code: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
  },
  {
    code: "ml",
    name: "Malayalam",
    nativeName: "മലയാളം",
  },
  {
    code: "or",
    name: "Odia",
    nativeName: "ଓଡ଼ିଆ",
  },
  {
    code: "pa",
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
  },
  {
    code: "as",
    name: "Assamese",
    nativeName: "অসমীয়া",
  },
  {
    code: "ma",
    name: "Maithili",
    nativeName: "मैथिली",
  },
  {
    code: "sa",
    name: "Sanskrit",
    nativeName: "संस्कृतम्",
  },
  {
    code: "kok",
    name: "Konkani",
    nativeName: "कोंकणी",
  },
  {
    code: "ne",
    name: "Nepali",
    nativeName: "नेपाली",
  },
  {
    code: "doi",
    name: "Dogri",
    nativeName: "डोगरी",
  },
  {
    code: "mni",
    name: "Manipuri",
    nativeName: "মৈতৈলোন্",
  },
  {
    code: "brx",
    name: "Bodo",
    nativeName: "बड़ो",
  },
  {
    code: "ks",
    name: "Kashmiri",
    nativeName: "کٲشُر",
  },
  {
    code: "sd",
    name: "Sindhi",
    nativeName: "سنڌي",
  },
] as const;

export type LanguageCode =
  (typeof SUPPORTED_LANGUAGES)[number]["code"];

export const DEFAULT_LANGUAGE: LanguageCode = "en";

export function isSupportedLanguage(
  value: string | null | undefined,
): value is LanguageCode {
  return SUPPORTED_LANGUAGES.some(
    (language) => language.code === value,
  );
}

export function getLanguageByCode(
  code: LanguageCode,
) {
  return SUPPORTED_LANGUAGES.find(
    (language) => language.code === code,
  );
}

export function getLanguageCodeByName(
  name: string | null | undefined,
): LanguageCode {
  const language = SUPPORTED_LANGUAGES.find(
    (item) => item.name === name,
  );

  return language?.code ?? DEFAULT_LANGUAGE;
}