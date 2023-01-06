import jwtDecode from "jwt-decode";
import { useContext, useState } from "react";
import { BsKeyFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { AlertContext, paramsAlert } from "../filters/alert/Alert";
import BackgroundCenter from "../layouts/BackgroundCenter";
import { Api } from "../service/api";

export default function ChangePassword() {
    const [showPass, setShowPass] = useState(false);
    const [password, setPassword] = useState({});

    const params = useParams();
    const navigate = useNavigate();
    const alertContext = useContext(AlertContext);

    const handleClick = (e) => {
        e.preventDefault();
        const userId = jwtDecode(params.token).id;
        Api.updateUser({ password }, params.token, userId)
            .then(() => {
                alertContext.addSuccessAlert(paramsAlert({ success: true, changePassword: true }));
                navigate('/login', { replace: true });
            })
            .catch((err) => {
                if (err.response) {
                    const { nonExistentEmail } = err.response.data;
                    alertContext.addDangerAlert(paramsAlert({ danger: true, nonExistentEmail }))
                }
                console.log(err);
            })
    }

    return (
        <BackgroundCenter>
            <div className="d-flex flex-column rounded w-100 h-100 border p-2 align-items-center"
                style={{ backgroundColor: "var(--bs-white)", margin: "auto" }}>
                <h5 style={{ color: "var(--primary-color)" }}>
                    Alterar Senha
                </h5>
                <form className="d-flex flex-column w-100 ps-2 pe-2" id="my-form">
                    <div className="input-group mb-2">
                        <span className="input-group-text" id="basic-addon1">
                            <BsKeyFill color="var(--secondary-color)" />
                        </span>
                        <input type={showPass ? "text" : "password"} className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nova Senha" aria-label="E-mail" aria-describedby="basic-addon1" />
                    </div>
                    <div className="mb-2 form-check">
                        <input type="checkbox" className="form-check-input" id="check"
                            onChange={() => setShowPass(!showPass)} />
                        <label className="form-check-label" htmlFor="check">Mostrar senha</label>
                    </div>
                    <button type="submit" className="btn btn-primary text-white"
                        onClick={handleClick}>Alterar</button>
                </form>
            </div>
        </BackgroundCenter>
    );
}