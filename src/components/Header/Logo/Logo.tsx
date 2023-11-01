import "./Logo.scss"

const Logo = () => {
    return (
        <a href={"/"} className="logo">
            <img src="/assets/logo.png" alt="logo" className={"logo_image"}/>
        </a>
    )
}
export default Logo;