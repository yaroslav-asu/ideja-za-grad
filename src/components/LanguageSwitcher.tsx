import {useTranslation} from "react-i18next";

const LanguageSwitcher = () => {
    const {i18n} = useTranslation();
    return (
        <select
            className="language_switcher"
            onChange={e => {
                i18n.changeLanguage(e.target.value)
            }}
            value={i18n.language}
        >
            <option value="en">English 🇺🇸</option>
            <option value="ru">Русский 🇷🇺</option>
            <option value="rs">Srpski 🇷🇸</option>
        </select>
    )
}

export default LanguageSwitcher;