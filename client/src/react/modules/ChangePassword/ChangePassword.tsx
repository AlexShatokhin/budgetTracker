import { useState } from "react";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { useChangePasswordMutation } from "../../api/modules/authorizationApi";
import "./change_password.scss";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isChangingSuccess, setIsChangingSuccess] = useState<boolean>(false);
    const [data] = useChangePasswordMutation();

    const handleSubmit = () => {
        if(newPassword !== repeatPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        if(newPassword.length < 6) {
            setErrorMessage("Password must be at least 6 characters long");
            return;
        }

        data({oldPassword, newPassword}).unwrap()
            .then(e => {setIsChangingSuccess(true); setOldPassword(""); setNewPassword(""); setRepeatPassword(""); setErrorMessage(e.message)})
            .catch((e: {status: number, data: {message: string}}) => {setIsChangingSuccess(false); setErrorMessage(e.data.message)});
    }

    const handleInputChange = (value: string, callback: (value: string) => void) => {
        setErrorMessage("");
        setIsChangingSuccess(false);
        callback(value);
    }

    return (
        <>
            <Input 
                type="password" 
                placeholder="Current password"
                width="100%"
                height="50px"
                value={oldPassword}
                onChange={(e) => handleInputChange(e.target.value, setOldPassword)}
                className="settings-input"/>
            <Input
                type="password" 
                placeholder="New password"
                width="100%"
                height="50px"
                value={newPassword}
                onChange={(e) => handleInputChange(e.target.value, setNewPassword)}
                className="settings-input"/>
            <Input
                type="password" 
                placeholder="Repeat new password"
                width="100%"
                height="50px"
                value={repeatPassword}
                onChange={(e) => handleInputChange(e.target.value, setRepeatPassword)}
                className="settings-input"/>
            <Button
                onClick={handleSubmit}
                title="Change password"/>
                <div className={"password-message " + (isChangingSuccess ? "success-message" : "error-message")}>
                    {errorMessage}
                </div>
        </>
    )
}

export default ChangePassword;