import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Api } from "../../service/api";

export default function Logged(props) {
    const [isLogged, setIsLogged] = useState(false);
    const [invalidToken, setInvalidToken] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        Api.ping(token)
            .then(() => {
                setIsLogged(true);
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401) {
                        setInvalidToken(true);
                    }
                }
            })
    }, []);

    return isLogged
        ? props.children
        : invalidToken
            ? navigate("/login", { replace: true })
            : <div>Redirect...</div>
}