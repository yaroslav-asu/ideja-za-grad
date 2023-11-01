import React from "react";
import Logo from "./Logo/Logo";
import './Header.scss'

const Header = () => {
    return (
        <header className={"header"}>
            <Logo/>
        </header>
    )
}
export default Header