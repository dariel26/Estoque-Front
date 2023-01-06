import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Alert from "../filters/alert/Alert";
import Logged from "../filters/logged/Logged";
import ChangePassword from "../views/ChangePassword";
import ConfirmEmail from "../views/ConfirmEmail";
import CreateUser from "../views/CreateUser";
import ForgotPassword from "../views/ForgotPassword";
import Home from "../views/Home";
import InactiveAccount from "../views/InactiveAccount";
import Login from "../views/Login";

const routesUnlogged = [
    { path: "/create-user", element: <CreateUser /> },
    { path: "/confirm-email/:token", element: <ConfirmEmail /> },
    { path: "/inactive-account", element: <InactiveAccount /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/change-password/:token", element: <ChangePassword /> },
    { path: "/login", element: <Login /> },
];

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {routesUnlogged.map((nav, index) => (
                    <Route path={nav.path} key={index} element=
                        {
                            <Alert>
                                {nav.element}
                            </Alert>
                        } />
                ))}

                <Route path="/home" element={<Alert><Logged><Home /></Logged></Alert>} >
                    <Route path="estoque" element={<div>Estoque</div>} />
                    <Route index element={<Navigate replace to="estoque" />} />
                </Route>
                <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}