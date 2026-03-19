// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "uz",

    backend: {
      loadPath: "/locals/{{lng}}.json",
    },

    debug: true,                           // ← konsolda batafsil ma'lumot chiqadi
    interpolation: { escapeValue: false },

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  })
  .then(() => {
    console.log("i18next muvaffaqiyatli ishga tushdi");
  })
  .catch(err => {
    console.error("i18next xatosi:", err);
  });

export default i18n;