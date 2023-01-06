import { useEffect } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { FaClipboardList, FaChartLine } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

export default function Menu(props) {

    useEffect(() => {
        const footer = document.getElementById("my-menu-footer");
        const body = document.getElementById("my-menu-body");

        const height = footer.getBoundingClientRect().height;
        body.style.height = `calc(100% - ${props.isClosed ? "50px" : "150px"} - ${height}px)`;
    }, [props])

    return (
        <div className="d-flex flex-column bg-menu-dark-light w-100 h-100">
            <div className="d-flex w-100 bg-menu-dark-dark"
                style={props.isClosed ? { height: "50px", transition: "height 300ms" } : { height: "150px", transition: "height 300ms" }}>
                <img src={process.env.PUBLIC_URL + "/logo512.png"} alt="logo"
                    className="w-100 h-100" style={{ objectFit: "scale-down" }} />
            </div>
            <div className="d-flex flex-column w-100" id="my-menu-body" style={{ transition: "height 300ms" }}>
                <div className="d-flex w-100 ps-2 align-items-center" id="my-left-title"
                    style={props.isClosed ? { height: "0px", transition: "height 300ms" } : { height: "30px", flexShrink: 0, transition: "height 300ms" }}>
                    <span className="fw-bold text-light"
                        style={props.isClosed ? { display: "none" } : {}}>
                        Menu
                    </span>
                </div>
                {
                    navs.map((nav, index) => (
                        <NavLink to={nav.path} id="my-left-nav"
                            className={({ isActive }) => isActive ? "my-menu d-flex w-100 bg-menu-light text-menu-active" : "my-menu d-flex w-100 text-light"}
                            key={index} style={{ height: "50px", textDecoration: "none" }}>
                            <div className="d-flex h-100 justify-content-center align-items-center" style={{ width: "50px" }}>
                                {nav.icon}
                            </div>
                            <div className="d-flex h-100 align-items-center"
                                style={props.isClosed ? { width: "0px", transition: "width 300ms" } : { width: "calc(100% - 50px)", transition: "width 300ms" }}>
                                <span style={props.isClosed ? { display: "none" } : {}}>{nav.name}</span>
                            </div>
                        </NavLink>
                    ))
                }
            </div>
            <div className="d-flex w-100 bg-menu-dark-dark" id="my-menu-footer"
                style={{ height: "max-content" }}>
                {
                    buttons.map((button, index) => (
                        <button key={index} className="btn d-flex p-0 w-100" id="my-left-button"
                            style={{ height: "50px", borderRadius: "0px", border: "none" }}>
                            <div className="d-flex h-100 justify-content-center align-items-center text-light" style={{ width: "50px" }}>
                                {button.icon}
                            </div>
                            <div className="d-flex h-100 align-items-center"
                                style={props.isClosed ? { width: "0px", transition: "width 300ms" } : { width: "calc(100% - 50px)", transition: "width 300ms" }}>
                                <span className="text-light" style={props.isClosed ? { display: "none" } : {}}>{button.name}</span>
                            </div>
                        </button>
                    ))
                }
            </div>
        </div>
    );
}

const navs = [{ name: "Estoque", path: "estoque", icon: <FaClipboardList size={18} /> }, { name: "Dashboard", path: "dashboard", icon: <FaChartLine size={18} /> }];
const buttons = [{ name: "Perfil", path: "/perfil", icon: <BsPersonCircle size={18} /> }];