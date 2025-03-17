import { FC } from "react";
import { IoIosClose } from "react-icons/io";
import "./modal.scss";

type ModalProps = {
    title: string
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    width?: string;
    height?: string;
}

const Modal : FC<ModalProps> = ({title, isOpen, onClose, children, width, height}) => {
    return (
        <div
            onClick={e => (e.target as HTMLDivElement).classList.contains("modal") && onClose()} 
            className={"modal " + (isOpen ? "modal-open" : "")}>
            <div style={{width, minHeight: height}} className="modal__wrapper">
                <button onClick={onClose} className="modal__close"><IoIosClose size={30}/></button>
                <div className="modal__header">
                    <span>{title}</span>
                </div>
                <div className="modal__content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;