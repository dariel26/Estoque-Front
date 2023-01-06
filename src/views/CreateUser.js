import { useContext, useState } from "react";
import { BsPersonFill, BsKeyFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import { AlertContext, paramsAlert } from "../filters/alert/Alert";
import BackgroundCenter from "../layouts/BackgroundCenter";
import { Api } from "../service/api";

export default function CreateUser() {
    const [showPass, setShowPass] = useState(false);
    const [userParams, setUserParams] = useState({});

    const alertContext = useContext(AlertContext);

    const handleClick = (e) => {
        e.preventDefault();
        Api.addUser({ ...userParams, link: process.env.REACT_APP_URL + "/confirm-email" })
            .then(() => {
                document.getElementById("my-form").reset();
                alertContext.addSuccessAlert(paramsAlert({ success: true, createUser: true }));
            })
            .catch((err) => {
                alertContext.addDangerAlert(paramsAlert());
                console.log(err);
            })
    }

    return (
        <BackgroundCenter>
            <div className="d-flex flex-column rounded w-100 h-100 border p-2 align-items-center"
                style={{ backgroundColor: "var(--bs-white)", margin: "auto" }}>
                <h5 style={{ color: "var(--primary-color)" }}>
                    Criar Usuário
                </h5>
                <form className="d-flex flex-column w-100 ps-2 pe-2" id="my-form">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            <BsPersonFill color="var(--secondary-color)" />
                        </span>
                        <input type="text" className="form-control"
                            onChange={(e) => setUserParams({ ...userParams, name: e.target.value })}
                            placeholder="Nome" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            <IoMdMail color="var(--secondary-color)" />
                        </span>
                        <input type="text" className="form-control"
                            onChange={(e) => setUserParams({ ...userParams, email: e.target.value })}
                            placeholder="E-mail" aria-label="E-mail" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-2">
                        <span className="input-group-text" id="basic-addon1">
                            <BsKeyFill color="var(--secondary-color)" />
                        </span>
                        <input type={showPass ? "text" : "password"} className="form-control"
                            onChange={(e) => setUserParams({ ...userParams, password: e.target.value })}
                            placeholder="Password" aria-label="E-mail" aria-describedby="basic-addon1" />
                    </div>
                    <div className="mb-2 form-check">
                        <input type="checkbox" className="form-check-input" id="check"
                            onChange={() => setShowPass(!showPass)} />
                        <label className="form-check-label" htmlFor="check">Mostrar senha</label>
                    </div>
                    <Link className="mb-1" style={{ textDecoration: "none" }} to="/login"> Já possuo uma conta </Link>
                    <button type="submit" className="btn btn-primary text-white"
                        onClick={handleClick}>Criar</button>
                </form>
            </div>
        </BackgroundCenter>
    );
}