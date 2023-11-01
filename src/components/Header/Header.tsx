import React from "react";
import Logo from "./Logo/Logo";
import './Header.scss'
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const Header = () => {
    return (
        <header className={"header"}>
            <div className="header_part header_part__left">
                <Logo/>
            </div>
            <div className="header_part header_part__right">
                <LanguageSwitcher/>
            </div>
        </header>
    )
}
export default Header