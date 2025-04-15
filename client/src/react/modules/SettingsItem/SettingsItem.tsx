import {FC} from "react"
import "./settings_item.scss"
type SettingsItemProps = {
    title: string;
    subtitle: string;
    content: React.ReactNode;
}

const SettingsItem : FC<SettingsItemProps>  = ({title, subtitle, content}) => {
    return (
        <div className="settings-item">
            <div className="settings-item__text">
                <p className="settings-title">{title}</p>
                <p className="settings-subtitle">{subtitle}</p>
            </div>
            <div className="settings-item__content">
                {content}
            </div>
        </div>
    )
}

export default SettingsItem;