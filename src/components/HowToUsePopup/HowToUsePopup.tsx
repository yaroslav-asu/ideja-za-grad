import CloseIcon from '@mui/icons-material/Close';
import "./HowToUsePopup.scss"
import {useTranslation} from "react-i18next";

const HowToUsePopup = (props: { closePopup: Function }) => {
    const {t} = useTranslation()

    return (
        <div className={"how_to_use_popup"}>
            <button className={"close_button"} onClick={() => props.closePopup(false)}><CloseIcon/></button>
            <ol>
                <li>{t("howToUse.stages.1")}</li>
                <li>{t("howToUse.stages.2")}</li>
                <li>{t("howToUse.stages.3")}</li>
            </ol>
        </div>
    )
}
export default HowToUsePopup