import BackgroundCenter from "../layouts/BackgroundCenter";
import { IoMdMail } from "react-icons/io";
import { Api } from "../service/api";
import { useContext, useState } from "react";
import { AlertContext, paramsAlert } from "../filters/alert/Alert";

export default function ForgotPassword() {
    const [email, setEmail] = useState(undefined);
    const alertController = useContext(AlertContext);

    const handleClick = (e) => {
        e.preventDefault();
        Api.changePassword(email, process.env.REACT_APP_URL + "/change-password")
            .then(() => {
                alertController.addSuccessAlert(paramsAlert({ success: true, forgotPassword: true }));
                document.getElementById("my-form").reset();
            })
            .catch((err) => {
                if (err.response) {
                    const { nonExistentEmail } = err.response.data;
                    alertController.addDangerAlert(paramsAlert(
                        {
                            danger: true,
                            nonExistentEmail,
                        }
                    ))
                }
            })
    }

    return (
        <BackgroundCenter>
            <div className="d-flex flex-column w-75 p-3 justify-content-end bg-white rounded border align-items-center"
                style={{ height: "max-content" }}>
                <h5 className="text-center">Digite seu E-mail</h5>
                <form className="d-flex flex-column justify-content-center" id="my-form">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            <IoMdMail color="var(--secondary-color)" />
                        </span>
                        <input type="text" className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail" aria-label="E-mail" aria-describedby="basic-addon1" />
                    </div>
                    <button type="submit" className="btn btn-primary text-white"
                        onClick={handleClick}>Enviar</button>
                </form>
            </div>
        </BackgroundCenter>
    );
}