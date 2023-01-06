import { useContext, useState } from "react";
import { BsKeyFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { AlertContext, paramsAlert } from "../filters/alert/Alert";
import BackgroundCenter from "../layouts/BackgroundCenter";
import { Api } from "../service/api";

export default function Login() {
    const [showPass, setShowPass] = useState(false);
    const [loginParams, setLoginParams] = useState({});

    const navigate = useNavigate();
    const alertContext = useContext(AlertContext);

    const handleClick = (e) => {
        e.preventDefault();
        Api.login(loginParams)
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                navigate("/home", { replace: true });
            })
            .catch((err) => {
                if (err.response) {
                    const { nonExistentEmail, incorrectPassword, isNotActive } = err.response.data;
                    alertContext.addDangerAlert(paramsAlert({ danger: true, nonExistentEmail, incorrectPassword, isNotActive }));
                    console.log(err.response.data);
                }
            })
    }

    return (
        <BackgroundCenter>
            <div className="d-flex flex-column rounded w-100 border p-2 align-items-center"
                style={{ backgroundColor: "var(--bs-white)", margin: "auto", height: "255px" }}>
                <h5 style={{ color: "var(--primary-color)" }}>
                    Relizar Login
                </h5>
                <form className="d-flex flex-column w-100 ps-2 pe-2">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            <IoMdMail color="var(--secondary-color)" />
                        </span>
                        <input type="text" className="form-control"
                            onChange={(e) => setLoginParams({ ...loginParams, login: e.target.value })}
                            placeholder="E-mail cadastrado" aria-label="E-mail" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-2">
                        <span className="input-group-text" id="basic-addon1">
                            <BsKeyFill color="var(--secondary-color)" />
                        </span>
                        <input type={showPass ? "text" : "password"} className="form-control"
                            onChange={(e) => setLoginParams({ ...loginParams, password: e.target.value })}
                            placeholder="Password" aria-label="E-mail" aria-describedby="basic-addon1" />
                    </div>
                    <div className="mb-2 form-check">
                        <input type="checkbox" className="form-check-input" id="check"
                            onChange={() => setShowPass(!showPass)} />
                        <label className="form-check-label" htmlFor="check">Mostrar senha</label>
                    </div>
                    <Link className="mb-1" style={{ textDecoration: "none" }} to="/create-user"> Criar uma conta </Link>
                    <button type="submit" className="btn btn-primary text-white"
                        onClick={handleClick}>Entrar</button>
                </form>
            </div>
        </BackgroundCenter>
    );
}