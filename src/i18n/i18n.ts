import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"
import en from "./locales/en/translation.json"
import ru from "./locales/ru/translation.json"
import rs from "./locales/rs/translation.json"


i18next.use(initReactI18next).use(LanguageDetector).init({
    debug: true,
    lng: "en",
    fallbackLng: "en",
    direction: {
        order: ['cookie']
    },
    cache: ['cookie'],
    interpolation: {
        escapeValue: false
    },
    resources: {
        en: {
            translation: en
        },
        ru: {
            translation: ru
        },
        rs: {
            translation: rs
        }
    },
})
console.log(i18next)
export default i18next;