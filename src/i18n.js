import tr from "./language/tr.js";
import en from "./language/en.js";
const translations = { tr, en };
let currentLang = localStorage.getItem("lang") || "tr";
export function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    window.dispatchEvent(new CustomEvent("language-changed", { detail: lang }));
  }
}
export function getCurrentLang() {
  return currentLang;
}
export function t(key, lang = currentLang) {
  return translations[lang]?.[key] || key;
}
