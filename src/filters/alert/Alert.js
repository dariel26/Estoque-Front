import { createContext, useState } from "react";
import { GrClose } from "react-icons/gr";
import "./Alert.css";

export const AlertContext = createContext();

export default function Alert(props) {
    const [alerts, setAlerts] = useState([]);
    const [counter, setCounter] = useState(1000);

    const removeLastAlert = () => {
        if (alerts.length > 0) {
            alerts.pop();
            setAlerts([...alerts]);
            setCounter(counter);
        }
    }

    const setTime = (time, index) => {
        if (time) {
            setTimeout(() => {
                const alert = document.getElementById(`alert${index}`);
                if (alert) {
                    alert.remove();
                }
            }, time)
        }
    }

    const addSuccessAlert = (params) => {
        const { title, message, linkMessage, link, time } = params;
        alerts.push({
            index: counter,
            child: <div className="alert alert-success my-alert position-fixed me-2 mt-2" role="alert"
                key={counter} id={"alert" + counter}
                style={{ zIndex: counter }}>
                <button className="position-absolute btn btn-link end-0 top-0 mt-2 me-2"
                    onClick={removeLastAlert}>
                    <GrClose />
                </button>
                <h4 className="alert-heading">{title}</h4>
                <p>{message} <a className="text-success" href={link}>{linkMessage}</a></p>

            </div>
        });
        setAlerts([...alerts]);
        setTime(time, counter);
        setCounter(counter + 1);
    }
    const addDangerAlert = (params) => {
        const { title, message, linkMessage, link, time } = params;
        alerts.push({
            index: counter,
            child: <div className="alert alert-danger my-alert position-fixed me-2 mt-2" role="alert"
                key={counter} id={"alert" + counter}
                style={{ zIndex: counter }}>
                <button className="position-absolute btn btn-link end-0 top-0 mt-2 me-2"
                    onClick={removeLastAlert}>
                    <GrClose />
                </button>
                <h4 className="alert-heading">{title}</h4>
                <p>{message} <a className="text-danger" href={link}>{linkMessage}</a></p>
            </div>
        })
        setAlerts([...alerts]);
        setTime(time, counter)
        setCounter(counter + 1);
    }

    return (
        <AlertContext.Provider value={{ addSuccessAlert, addDangerAlert }}>
            {
                alerts.map((alert) => (alert.child))
            }
            {props.children}
        </AlertContext.Provider>
    );
}

export function paramsAlert(config = {
    success: false,
    danger: false,
    nonExistentEmail: false,
    nonExistentUser: false,
    incorrectPassword: false,
    isNotActive: false,
    inactiveAccount: false,
    forgotPassword: false,
    createUser: false,
    confirmEmail: false,
    changePassword: false,
}) {
    const {
        success,
        danger,
        nonExistentEmail,
        nonExistentUser,
        incorrectPassword,
        isNotActive,
        inactiveAccount,
        forgotPassword,
        createUser,
        confirmEmail,
        changePassword,
    } = config;

    if (success) {
        return changePassword
            ? { title: "Senha Alterada", message: "Sua senha foi alterada com sucesso", time: 1500 }
            : confirmEmail
                ? { title: "Conta Ativada", message: "Sua conta foi ativada com sucesso", time: 1500 }
                : createUser
                    ? { title: "Usuário Criado", message: "Foi enviado um e-mail para ativar sua conta" }
                    : forgotPassword
                        ? { title: "E-mail Enviado", message: "Foi enviado um e-mail para trocar sua senha" }
                        : inactiveAccount
                            ? { title: "E-mail Enviado", message: "Foi enviado um e-mail para ativar sua conta" }
                            : undefined;
    } else if (danger) {
        return nonExistentEmail
            ? { title: "E-mail Inexistente", message: "O e-mail colcoado não existe no banco de dados", time: 2000 }
            : nonExistentUser
                ? { title: "Usuário Inexsistente", message: "O e-mail colocado não corresponde a nenhum usuário", time: 2000 }
                : incorrectPassword
                    ? { title: "Senha Inválida", linkMessage: "Clique aqui para criar uma nova senha", link: '/forgot-password', time: 4500 }
                    : isNotActive
                        ? { title: "Conta Inativa", linkMessage: "Clique aqui para ativar sua conta", link: "/inactive-account", time: 4500 }
                        : { title: "Problema no Servidor", message: "Algo deu errado no servidor, se persistir contate-nos" }
    }
}