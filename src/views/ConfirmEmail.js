import BackgroundCenter from "../layouts/BackgroundCenter";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Api } from "../service/api";
import { AlertContext, paramsAlert } from "../filters/alert/Alert";
import { useContext } from "react";

export default function ConfirmEmail() {

    const params = useParams();
    const navigate = useNavigate();
    const alertContext = useContext(AlertContext);

    const handleClick = (e) => {
        e.preventDefault();
        const userId = jwtDecode(params.token).id;
        Api.updateUser({ active: true }, params.token, userId)
            .then(() => {
                alertContext.addSuccessAlert(paramsAlert({ success: true, confirmEmail: true }));
                navigate('/login', { replace: true });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <BackgroundCenter>
            <div className="d-flex flex-column w-75 p-3 justify-content-end bg-white rounded border align-items-center"
                style={{ height: "150px" }}>
                <MdOutlineMarkEmailRead className="mb-3 text-success" size={60} />
                <button type="submit" className="btn btn-primary text-white"
                    onClick={handleClick}>Confirmar</button>
            </div>
        </BackgroundCenter>
    );
}