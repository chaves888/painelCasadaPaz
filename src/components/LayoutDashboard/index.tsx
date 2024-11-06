import { ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { IToken } from "../../interfaces/token";
import { validaPermissao } from "../../services/token";
import './layoutdashboard.css';

interface IProps {
    children: ReactNode;
}

export const LayoutDashboard = (props: IProps) => {
    const [token, setToken] = useState<IToken>();
    const navigate = useNavigate();

    useEffect(() => {
        let lsToken = localStorage.getItem('americanos.token');

        if (typeof lsToken === 'string') {
            const token: IToken = JSON.parse(lsToken);
            setToken(token);
        }
    }, []); // Adiciona dependências vazias para executar apenas uma vez

    const handleLogout = () => {
        localStorage.removeItem('americanos.token');
        setToken(undefined);
        navigate('/');
    };

    return (
        <>
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
                    Atualização do Site
                </a>
                <button
                    className="navbar-toggler position-absolute d-md-none collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="w-100"></div>
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <a className="nav-link px-3" href="#" onClick={handleLogout}>Sair</a>
                    </div>
                </div>
            </header>

            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column">
                                <li className="nav-item" key="dashboard">
                                    <Link className="nav-link" to="/dashboard">
                                        Dashboard
                                    </Link>
                                </li>
                                    <li className="nav-item" key="usuarios">
                                        <Link className="nav-link" to="/usuarios">
                                            Usuários
                                        </Link>
                                    </li>
                                <li className="nav-item" key="premios">
                                    <Link className="nav-link" to="/voluntarios">
                                        Voluntários
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    );
};