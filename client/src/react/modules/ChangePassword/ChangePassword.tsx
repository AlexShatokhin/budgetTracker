import { useState } from "react";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    return (
        <>
            <Input 
                type="password" 
                placeholder="Current password"
                width="100%"
                height="50px"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="settings-input"/>
            <Input
                type="password" 
                placeholder="New password"
                width="100%"
                height="50px"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="settings-input"/>
            <Input
                type="password" 
                placeholder="Repeat new password"
                width="100%"
                height="50px"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="settings-input"/>
            <Button
                title="Change password"/>
        </>
    )
}

export default ChangePassword;