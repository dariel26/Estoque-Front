import { FaClipboardList, FaChartLine } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

export default function FixedMenu() {

    return (
        <div className="d-flex flex-column bg-menu-dark-light w-100 h-100">
            <div className="d-flex w-100 bg-menu-dark-dark"
                style={{ height: "100px" }}>
                <img src={process.env.PUBLIC_URL + "/logo512.png"} alt="logo"
                    className="w-100 h-100" style={{ objectFit: "scale-down" }} />
            </div>
            <div className="d-flex flex-column w-100">
                <div className="d-flex w-100 ps-2 align-items-center"
                    style={{ height: "30px", flexShrink: 0 }}>
                    <span className="fw-bold text-light">
                        Menu
                    </span>
                </div>
                {
                    navs.map((nav, index) => (
                        <NavLink to={nav.path}
                            className={({ isActive }) => isActive ? "my-menu d-flex w-100 bg-menu-light text-menu-active" : "my-menu d-flex w-100 text-light"}
                            key={index} style={{ height: "50px", textDecoration: "none" }}>
                            <div className="d-flex h-100 justify-content-center align-items-center" style={{ width: "50px" }}>
                                {nav.icon}
                            </div>
                            <div className="d-flex h-100 align-items-center"
                                style={{ width: "calc(100% - 50px)", transition: "width 300ms" }}>
                                <span>{nav.name}</span>
                            </div>
                        </NavLink>
                    ))
                }
            </div>
        </div>
    );
}

const navs = [{ name: "Estoque", path: "estoque", icon: <FaClipboardList size={18} /> }, { name: "Dashboard", path: "dashboard", icon: <FaChartLine size={18} /> }];