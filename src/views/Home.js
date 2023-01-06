import MenuLayout from "../layouts/menu/MenuLayout";
import { MdLogout, MdHistory } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";
import { SiWikidata } from "react-icons/si";
import { AiOutlineAreaChart } from "react-icons/ai";
import { Api } from "../service/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AlertContext, paramsAlert } from "../filters/alert/Alert";

export default function Home() {
    const navigate = useNavigate();
    const alertController = useContext(AlertContext);

    return <MenuLayout
        navs={[
            {
                name: "Registrar Venda",
                path: "register-sale",
                icon: <TbReportMoney size={20} />
            },
            {
                name: "Produtos",
                path: "products",
                icon: <SiWikidata size={20} />
            },
            {
                name: "Histórico",
                path: "historic",
                icon: <MdHistory size={20} />
            },
            {
                name: "Resultados",
                path: "results",
                icon: <AiOutlineAreaChart size={20} />
            },
        ]}
        actions={[
            {
                name: "Logout",
                onClick: (e) => {
                    e.preventDefault();
                    const token = localStorage.getItem("token");
                    Api.logout(token)
                        .then(() => {
                            navigate("/login", { replace: true });
                            alertController.addSuccessAlert(paramsAlert({ success: true, home: true }))
                        })
                        .catch((err) => {
                            console.log(err);
                            alertController.addDangerAlert(paramsAlert({ danger: true }))
                        })
                },
                icon: <MdLogout size={20} />
            }
        ]} />
}