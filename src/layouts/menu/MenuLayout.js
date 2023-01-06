import { createRef, useCallback, useEffect, useState } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { BsPersonCircle } from 'react-icons/bs';
import { IoMenu } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import FixedMenu from "./components/FixedMenu";
import Menu from "./components/Menu";
import "./MenuLayout.css";

export default function MenuLayout() {
    const [isClosed, setIsClosed] = useState(false);
    const [isClosedFixed, setIsClosedFixed] = useState(true);
    const wrapperRef = createRef();

    const handleClickOutside = useCallback((event) => {
        if (wrapperRef && !wrapperRef.current.contains(event.target) && isClosedFixed === false) {
            setIsClosedFixed(true);
        }
    }, [wrapperRef, isClosedFixed]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [handleClickOutside])

    const handleCloseLeftMenu = () => {
        const right = document.getElementById("my-right");
        const left = document.getElementById("my-left");
        if (isClosed) {
            left.style.width = "200px";
            right.style.width = "calc(100% - 200px)";
        } else {
            left.style.width = "50px";
            right.style.width = "calc(100% - 50px)";
        }
        setIsClosed(!isClosed);
    }

    const handleOpenFixedMenu = () => {
        setIsClosedFixed(false);
    }

    return (
        <div className="d-flex bg-light"
            style={{ height: "100vh", width: "100vw" }}>
            <div className="d-flex flex-column bg-menu-primary h-100" id="my-left"
                style={{ width: "200px", flexShrink: 0, transition: "width 300ms" }}>
                <div className="d-flex w-100" style={{ height: "calc(100% - 50px)" }}>
                    <Menu isClosed={isClosed} />
                </div>
                <button className="btn d-flex w-100 bg-menu-dark-dark p-0"
                    style={{ height: "50px", borderRadius: "0px", border: "none" }}
                    onClick={handleCloseLeftMenu}>
                    <div className="btn p-0 d-flex h-100 justify-content-center align-items-center" id="my-left-close"
                        style={isClosed ? { width: "0px", border: "none" } : { width: "calc(100% - 50px)", border: "none" }}>
                        <span style={isClosed ? { display: "none" } : {}}
                            className="text-light fw-bold text-nowrap"
                        >
                            Fechar Menu
                        </span>
                    </div>
                    <div className="d-flex h-100 text-light justify-content-center align-items-center"
                        id="my-left-icon" style={{ width: "50px" }}>
                        <FaAngleDoubleLeft size={20} />
                    </div>
                </button>
            </div>
            <div className="position-fixed h-100 bg-menu-dark" ref={wrapperRef} id="my-fixed-left"
                style={isClosedFixed
                    ? { display: "none", width: "200px", left: "-200px", transition: "left 300ms", zIndex: 100 }
                    : { display: "none", width: "200px", left: "0px", transition: "left 300ms", zIndex: 100 }}>
                <FixedMenu />
            </div>
            <div className="d-flex flex-column h-100" id="my-right"
                style={{ width: "calc(100% - 200px)", transition: "width 300ms" }}>
                <div className="d-flex bg-menu-primary w-100" id="my-top"
                    style={{ height: "0px", transition: "height 300ms" }}>
                    <button className="btn p-0 h-100 text-dark justify-content-center align-items-center"
                        id="my-top-close" style={{ display: "none", width: "50px", border: "none" }} onClick={handleOpenFixedMenu}>
                        <IoMenu size={29} />
                    </button>
                    <div className="justify-content-end h-100" id="my-top-button"
                        style={{ display: "none", width: "calc(100% - 50px)" }}>
                        {
                            buttons.map((button, index) => (
                                <button className="btn p-1 d-flex h-100 text-dark justify-content-center align-items-center"
                                    key={index} style={{ border: "none" }}>
                                    <span>{button.name}</span>
                                </button>
                            ))
                        }
                    </div>
                </div>
                <div className="d-flex w-100" id="my-bottom"
                    style={{ height: "100%" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

const buttons = [{ name: "Perfil", path: "/perfil", icon: <BsPersonCircle size={18} /> }, { name: "Perfil", path: "/perfil", icon: <BsPersonCircle size={18} /> }];