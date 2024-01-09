import React from "react";
import Logo from "./Logo/Logo";
import './Header.scss'
import LanguageSwitcher from "../LanguageSwitcher";
import {useTranslation} from "react-i18next";

const Header = (props: { openHowToPopup: Function }) => {
    const {t} = useTranslation()

    return (
        <header className={"header"}>
            <div className="header_part header_part__left">
                <Logo/>
            </div>
            <div className="header_part header_part__right">
                <a className="markers_data" href={`${process.env.REACT_APP_API_URL}markers`} target="_blank">{t("markersData")}</a>
                <button className={"how_to_button"}
                        onClick={() => props.openHowToPopup()}>{t("howToUse.howToUse")}</button>
                <LanguageSwitcher/>
            </div>
        </header>
    )
}
export default Header